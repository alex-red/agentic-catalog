"""Scratch-process checks for shipped hooks; never enable a host integration."""
import concurrent.futures
import importlib.util
import io
import json
import os
from pathlib import Path
import re
import shutil
import subprocess
import sys
import tempfile
import unittest
from unittest import mock

ROOT = Path(__file__).resolve().parents[1]
HOOKS = ROOT / "entries/hooks"


def run_hook(name, script, event, **env):
    return subprocess.run(
        [sys.executable, str(HOOKS / name / script)],
        input=json.dumps(event), text=True, capture_output=True,
        env={**os.environ, "PYTHONDONTWRITEBYTECODE": "1", **env}, timeout=10,
    )


def load(name, filename):
    spec = importlib.util.spec_from_file_location(name.replace("-", "_"), HOOKS / name / filename)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


class HookScripts(unittest.TestCase):
    def codex_install(self, root, name, script):
        destination = root / ".codex/hooks" / name
        destination.mkdir(parents=True)
        shutil.copyfile(HOOKS / name / script, destination / script)
        return destination / script

    def test_codex_compact_note_uses_installed_project_not_session_subdirectory(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            script = self.codex_install(root, "compact-context", "restore.py")
            (root / ".codex/compact-context.md").write_text("CODEX_NOTE")
            (root / "nested").mkdir()
            event = {"hook_event_name": "SessionStart", "source": "compact", "cwd": str(root / "nested")}
            result = subprocess.run([sys.executable, str(script), "--harness", "codex"], input=json.dumps(event), text=True, capture_output=True)
            self.assertEqual(result.returncode, 0)
            self.assertIn("CODEX_NOTE", json.loads(result.stdout)["hookSpecificOutput"]["additionalContext"])
            (root / ".codex/compact-context.md").unlink()
            (root / ".claude").mkdir()
            (root / ".claude/compact-context.md").write_text("DO_NOT_LOAD_OTHER_HOST")
            absent = subprocess.run([sys.executable, str(script), "--harness", "codex"], input=json.dumps(event), text=True, capture_output=True)
            self.assertEqual(absent.stdout, "")

    def test_codex_patch_diagnostics_runs_once_for_source_paths_and_preserves_output(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            script = self.codex_install(root, "post-edit-diagnostics", "check.py")
            (root / "nested").mkdir()
            # Check from project root, not the event's nested cwd. No shell expansion.
            command = [sys.executable, "-c", "from pathlib import Path;import sys;Path('check-count').write_text('ran');print('CODEX_DIAGNOSTIC');sys.exit(3)"]
            script.with_name("command.json").write_text(json.dumps(command))
            event = {"tool_name": "apply_patch", "cwd": str(root / "nested"), "tool_input": {"command": "*** Begin Patch\n*** Add File: a space.ts\n+bad\n*** Update File: b.py\n@@\n-old\n+new\n*** End Patch"}}
            result = subprocess.run([sys.executable, str(script), "--harness", "codex"], input=json.dumps(event), text=True, capture_output=True, env={**os.environ, "AGENTIC_DIAGNOSTICS_ARGV": json.dumps(command)})
            self.assertEqual(result.returncode, 2)
            self.assertIn("CODEX_DIAGNOSTIC", result.stderr)
            self.assertTrue((root / "check-count").exists())
            (root / "check-count").unlink()
            # Deletions, non-source edits and paths escaping this checkout do not run it.
            for patch in ["*** Delete File: old.ts", "*** Add File: prose.md", "*** Add File: ../../outside.ts"]:
                event["tool_input"]["command"] = patch
                ignored = subprocess.run([sys.executable, str(script), "--harness", "codex"], input=json.dumps(event), text=True, capture_output=True)
                self.assertEqual(ignored.returncode, 0)
                self.assertFalse((root / "check-count").exists())

    def test_codex_budget_counts_canonical_spawn_tool_and_does_not_allow_permissions(self):
        with tempfile.TemporaryDirectory() as state:
            env = {"AGENTIC_HOOK_STATE_DIR": state, "AGENTIC_SPAWN_LIMIT": "1"}
            event = {"tool_name": "spawn_agent", "session_id": "same-id", "hook_event_name": "PreToolUse"}
            first = run_hook("subagent-budget", "budget.py", event, **env)
            second = run_hook("subagent-budget", "budget.py", event, **env)
            self.assertEqual(json.loads(first.stdout), {})
            self.assertEqual(json.loads(second.stdout)["hookSpecificOutput"]["permissionDecision"], "deny")
            # Identical IDs in different harnesses do not share reservations.
            event["tool_name"] = "Agent"
            claude = run_hook("subagent-budget", "budget.py", event, **env)
            self.assertEqual(json.loads(claude.stdout), {})
            self.assertEqual(len(list(Path(state).rglob("*.sqlite3"))), 2)

    def test_codex_prompt_check_uses_common_payload_and_omits_claude_only_config_fields(self):
        result = run_hook("prompt-secret-check", "check.py", {"hook_event_name": "UserPromptSubmit", "prompt": "-----BEGIN PRIVATE KEY-----", "turn_id": "turn"})
        self.assertEqual(result.returncode, 2)
        self.assertNotIn("-----BEGIN PRIVATE KEY-----", result.stdout + result.stderr)
        for name in ["compact-context", "post-edit-diagnostics", "subagent-budget", "prompt-secret-check"]:
            settings = json.loads((HOOKS / name / "codex-hooks.example.json").read_text())
            for groups in settings["hooks"].values():
                for group in groups:
                    for handler in group["hooks"]:
                        self.assertNotIn("onFailure", handler)
                        self.assertNotIn("args", handler)

    def test_prompt_rejection_does_not_echo_credentials(self):
        values = ["-----BEGIN OPENSSH PRIVATE KEY-----", "AKIA" + "Q" * 16, "ghp_" + "Z" * 36]
        for value in values:
            result = run_hook("prompt-secret-check", "check.py", {"prompt": "Please inspect " + value})
            self.assertEqual(result.returncode, 2)
            self.assertNotIn(value, result.stdout + result.stderr)
            self.assertIn("Prompt withheld", result.stderr)
        self.assertEqual(run_hook("prompt-secret-check", "check.py", {"prompt": "Use TOKEN_PLACEHOLDER"}).returncode, 0)
        self.assertEqual(run_hook("prompt-secret-check", "check.py", {}).returncode, 2)

    def test_budget_serializes_concurrent_reservations_and_keeps_sessions_separate(self):
        with tempfile.TemporaryDirectory() as state:
            def attempt(_):
                return run_hook("subagent-budget", "budget.py", {"tool_name": "Agent", "session_id": "../private-session"}, AGENTIC_HOOK_STATE_DIR=state, AGENTIC_SPAWN_LIMIT="5")
            with concurrent.futures.ThreadPoolExecutor(max_workers=12) as pool:
                results = list(pool.map(attempt, range(30)))
            self.assertTrue(all(r.returncode == 0 for r in results), [r.stderr for r in results])
            self.assertEqual(sum(json.loads(r.stdout) == {} for r in results), 5)
            self.assertEqual(sum(json.loads(r.stdout).get("hookSpecificOutput", {}).get("permissionDecision") == "deny" for r in results), 25)
            self.assertEqual(len(list(Path(state).glob("*.sqlite3"))), 1)
            other = run_hook("subagent-budget", "budget.py", {"tool_name": "Task", "session_id": "other"}, AGENTIC_HOOK_STATE_DIR=state, AGENTIC_SPAWN_LIMIT="5")
            self.assertEqual(json.loads(other.stdout), {})
            missing = run_hook("subagent-budget", "budget.py", {"tool_name": "Agent"}, AGENTIC_HOOK_STATE_DIR=state)
            self.assertEqual(missing.returncode, 2)
            invalid = run_hook("subagent-budget", "budget.py", {"tool_name": "Agent", "session_id": "other"}, AGENTIC_HOOK_STATE_DIR=state, AGENTIC_SPAWN_LIMIT="0")
            self.assertEqual(invalid.returncode, 2)

    def test_compact_note_rejects_oversize_and_escape_without_leaking_contents(self):
        with tempfile.TemporaryDirectory() as directory, tempfile.TemporaryDirectory() as outside:
            root = Path(directory)
            (root / ".claude").mkdir()
            note = root / ".claude/compact-context.md"
            event = {"source": "compact"}
            self.assertEqual(run_hook("compact-context", "restore.py", event, CLAUDE_PROJECT_DIR=directory).stdout, "")
            note.write_text("Verify the active plan.")
            good = run_hook("compact-context", "restore.py", event, CLAUDE_PROJECT_DIR=directory)
            self.assertIn("Verify the active plan.", json.loads(good.stdout)["hookSpecificOutput"]["additionalContext"])
            self.assertEqual(run_hook("compact-context", "restore.py", {"source": "startup"}, CLAUDE_PROJECT_DIR=directory).stdout, "")
            note.write_text("PRIVATE" * 1000)
            result = run_hook("compact-context", "restore.py", event, CLAUDE_PROJECT_DIR=directory)
            self.assertNotIn("PRIVATE", result.stdout + result.stderr)
            note.unlink()
            external = Path(outside) / "secret.md"
            external.write_text("OUTSIDE_PRIVATE")
            note.symlink_to(external)
            escaped = run_hook("compact-context", "restore.py", event, CLAUDE_PROJECT_DIR=directory)
            self.assertNotIn("OUTSIDE_PRIVATE", escaped.stdout + escaped.stderr)
            self.assertEqual(escaped.stdout, "")

    def test_diagnostics_reports_failure_without_mutating_source(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            source = root / "source with spaces.ts"
            source.write_text("original source")
            command = [sys.executable, "-c", "import sys;print('TYPE_FAILURE');sys.exit(3)"]
            result = run_hook("post-edit-diagnostics", "check.py", {"tool_name": "Write", "tool_input": {"file_path": str(source)}}, CLAUDE_PROJECT_DIR=directory, AGENTIC_DIAGNOSTICS_ARGV=json.dumps(command))
            self.assertEqual(result.returncode, 2)
            self.assertIn("TYPE_FAILURE", result.stderr)
            self.assertEqual(source.read_text(), "original source")
            bad = run_hook("post-edit-diagnostics", "check.py", {"tool_name": "Edit", "tool_input": {"file_path": str(source)}}, CLAUDE_PROJECT_DIR=directory, AGENTIC_DIAGNOSTICS_ARGV='"not an array"')
            self.assertEqual(bad.returncode, 2)

    def test_formatter_passes_only_explicit_paths_as_arguments(self):
        module = load("format-after-edit", "format.py")
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            names = ["a space.ts", "quote'$(not-a-command).ts", "-option.ts"]
            for name in names + ["unrelated.ts"]:
                (root / name).write_text("unformatted")
            event = {"cwd": directory, "tool_input": {"command": "*** Begin Patch\n" + "\n".join("*** Add File: " + n for n in names) + "\n*** End Patch"}}
            with mock.patch.dict(os.environ, {"CLAUDE_PROJECT_DIR": directory}), mock.patch.object(sys, "stdin", io.StringIO(json.dumps(event))), mock.patch.object(module.subprocess, "run") as called:
                module.main()
                arguments = called.call_args.args[0]
                self.assertEqual(arguments[-3:], [str((root / n).resolve()) for n in names])
                self.assertNotIn(str(root / "unrelated.ts"), arguments)
                self.assertIn("--", arguments)
                self.assertNotIn("shell", called.call_args.kwargs)

    def test_notification_uses_fixed_text_and_no_remote_transport(self):
        module = load("desktop-attention", "notify.py")
        event = {"notification_type": "permission_prompt", "message": "PRIVATE_PROMPT"}
        with mock.patch.object(sys, "platform", "darwin"), mock.patch.object(sys, "stdin", io.StringIO(json.dumps(event))), mock.patch.object(module.subprocess, "run") as called:
            module.main()
            self.assertEqual(called.call_args.args[0][0], "osascript")
            self.assertNotIn("PRIVATE_PROMPT", str(called.call_args))

    def test_stop_gate_sees_untracked_changes_and_bounds_retry(self):
        script = (HOOKS / "stop-gate-checks/stop-gate.sh").read_text()
        with tempfile.TemporaryDirectory() as directory:
            subprocess.run(["git", "init", "-q", directory], check=True)
            (Path(directory) / "new-source.py").write_text("untracked")
            result = subprocess.run(["bash", "-c", script], cwd=directory, env={**os.environ, "GATE": "false"}, input="{}", text=True, capture_output=True)
            self.assertEqual(result.returncode, 2)
            retry = subprocess.run(["bash", "-c", script], cwd=directory, env={**os.environ, "GATE": "false"}, input='{"stop_hook_active":true}', text=True, capture_output=True)
            self.assertEqual(retry.returncode, 0)
            self.assertEqual(json.loads(retry.stdout), {})

    def test_protected_patch_headers_cover_every_documented_name(self):
        script = (HOOKS / "protect-files-and-commands/guard.sh").read_text()
        for path in [".env", ".git/config", "package-lock.json", "pnpm-lock.yaml", "bun.lock"]:
            for header in ["*** Add File: ", "*** Move to: "]:
                event = {"tool_input": {"command": header + path}}
                result = subprocess.run(["bash", "-c", script], input=json.dumps(event), text=True, capture_output=True)
                self.assertEqual(result.returncode, 2, (path, header, result.stderr))


if __name__ == "__main__":
    unittest.main()
