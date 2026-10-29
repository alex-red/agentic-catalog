"""Exercise hook setup in temporary consumer projects, without running hooks."""
import copy
import importlib.util
import json
import os
from pathlib import Path
import subprocess
import sys
import tempfile
import unittest
from unittest import mock

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location("install_hook", ROOT / "scripts/install-hook.py")
installer = importlib.util.module_from_spec(spec)
spec.loader.exec_module(installer)
ENTRIES = json.loads((ROOT / "catalog/index.json").read_text())["entries"]


class HookInstall(unittest.TestCase):
    def entry(self, name):
        return copy.deepcopy(next(e for e in ENTRIES if e["id"] == name))

    def fetch(self, path):
        return (ROOT / path).read_bytes()

    def test_command_discovers_project_root_from_a_subdirectory(self):
        with tempfile.TemporaryDirectory() as directory:
            project = Path(directory)
            subprocess.run(["git", "init", "-q", str(project)], check=True)
            nested = project / "nested"
            nested.mkdir()
            result = subprocess.run([sys.executable, str(ROOT / "scripts/install-hook.py"), "desktop-attention", "--host", "claude-code", "--checkout", str(ROOT)], cwd=nested, text=True, capture_output=True)
            self.assertEqual(result.returncode, 0, result.stderr)
            self.assertTrue((project / ".claude/hooks/desktop-attention/notify.py").exists())
            self.assertFalse((nested / ".claude").exists())

    def test_preserves_settings_and_rerun_is_byte_identical(self):
        with tempfile.TemporaryDirectory(prefix="hook project '$- ") as directory:
            project = Path(directory)
            settings = project / ".claude/settings.json"
            settings.parent.mkdir()
            before = {"permissions": {"deny": ["Bash(rm:*)"]}, "env": {"TEAM": "unchanged"}, "hooks": {"UserPromptSubmit": [{"hooks": [{"type": "command", "command": "custom-check"}]}]}}
            settings.write_text(json.dumps(before))
            entry = self.entry("prompt-secret-check")
            installer.install(entry, "claude-code", project, self.fetch)
            first = settings.read_bytes()
            merged = json.loads(first)
            self.assertEqual(merged["permissions"], before["permissions"])
            self.assertEqual(merged["env"], before["env"])
            self.assertEqual(merged["hooks"]["UserPromptSubmit"][0]["hooks"][0]["command"], "custom-check")
            self.assertEqual(len(merged["hooks"]["UserPromptSubmit"][0]["hooks"]), 2)
            self.assertTrue((project / ".claude/hooks/prompt-secret-check/check.py").exists())
            self.assertEqual((project / ".claude/hooks/prompt-secret-check/LICENSE.txt").read_bytes(), (ROOT / "LICENSE").read_bytes())
            self.assertEqual(len(list(settings.parent.glob("settings.json.agentic-backup-*"))), 1)
            installer.install(entry, "claude-code", project, self.fetch)
            self.assertEqual(settings.read_bytes(), first)
            self.assertEqual(len(list(settings.parent.glob("settings.json.agentic-backup-*"))), 1)
            self.assertFalse((settings.parent / ".agentic-hook-install.lock").exists())

    def test_existing_equivalent_registration_keeps_its_custom_timeout(self):
        with tempfile.TemporaryDirectory() as directory:
            project = Path(directory)
            settings = project / ".claude/settings.json"
            settings.parent.mkdir()
            command = "python3 .claude/hooks/prompt-secret-check/check.py"
            existing = {"hooks": {"UserPromptSubmit": [{"matcher": "", "hooks": [{"type": "command", "command": command, "timeout": 99}]}]}}
            original = json.dumps(existing).encode()
            settings.write_bytes(original)
            installer.install(self.entry("prompt-secret-check"), "claude-code", project, self.fetch)
            self.assertEqual(settings.read_bytes(), original)
            self.assertEqual(list(settings.parent.glob("*.agentic-backup-*")), [])

    def test_codex_config_is_separate_and_does_not_grant_trust(self):
        with tempfile.TemporaryDirectory(prefix="codex project '$ ") as directory:
            project = Path(directory)
            (project / ".claude").mkdir()
            claude = project / ".claude/settings.json"
            claude.write_text('{"keep":"claude"}')
            installer.install(self.entry("compact-context"), "codex", project, self.fetch)
            configuration = json.loads((project / ".codex/hooks.json").read_text())
            command = configuration["hooks"]["SessionStart"][0]["hooks"][0]["command"]
            import shlex
            argv = shlex.split(command)
            self.assertEqual(argv[1], str(project / ".codex/hooks/compact-context/restore.py"))
            self.assertEqual(argv[-2:], ["--harness", "codex"])
            self.assertNotIn("$(git", command)
            self.assertFalse((project / ".codex/config.toml").exists())
            self.assertEqual(claude.read_text(), '{"keep":"claude"}')

    def test_malformed_settings_and_conflicting_files_make_no_partial_install(self):
        for content in [b'{broken', b'{"hooks":[]}', b'{"hooks":{"Stop":"bad"}}']:
            with tempfile.TemporaryDirectory() as directory:
                project = Path(directory)
                settings = project / ".claude/settings.json"
                settings.parent.mkdir()
                settings.write_bytes(content)
                with self.assertRaises(ValueError):
                    installer.install(self.entry("prompt-secret-check"), "claude-code", project, self.fetch)
                self.assertEqual(settings.read_bytes(), content)
                self.assertFalse((project / ".claude/hooks").exists())
        with tempfile.TemporaryDirectory() as directory:
            project = Path(directory)
            path = project / ".claude/hooks/post-edit-diagnostics/command.json"
            path.parent.mkdir(parents=True)
            path.write_text('["my-custom-check"]')
            with self.assertRaisesRegex(ValueError, "existing hook file differs"):
                installer.install(self.entry("post-edit-diagnostics"), "claude-code", project, self.fetch)
            self.assertEqual(path.read_text(), '["my-custom-check"]')
            self.assertFalse(path.with_name("check.py").exists())
            self.assertFalse((project / ".claude/settings.json").exists())

    def test_failed_download_and_symlink_never_modify_consumer_files(self):
        with tempfile.TemporaryDirectory() as directory, tempfile.TemporaryDirectory() as outside:
            project = Path(directory)
            def failing(_):
                raise OSError("download failed")
            with self.assertRaises(OSError):
                installer.install(self.entry("prompt-secret-check"), "claude-code", project, failing)
            self.assertEqual(list(project.iterdir()), [])
            (project / ".claude").symlink_to(outside, target_is_directory=True)
            with self.assertRaisesRegex(ValueError, "symlink"):
                installer.install(self.entry("prompt-secret-check"), "claude-code", project, self.fetch)
            self.assertEqual(list(Path(outside).iterdir()), [])

    def test_linked_source_stays_pinned_and_commonjs_is_explicit(self):
        with tempfile.TemporaryDirectory() as directory:
            project = Path(directory)
            entry = self.entry("git-safety")
            seen = []
            def upstream(url):
                seen.append(url)
                if url.endswith("LICENSE"):
                    return b"MIT upstream license"
                if url.endswith("hooks.json"):
                    return json.dumps({"hooks": {"PreToolUse": [{"matcher": "Bash", "hooks": [{"type": "command", "command": 'node "${CLAUDE_PLUGIN_ROOT}/git-safety.js"'}]}]}}).encode()
                return b"// runtime not executed\n"
            with mock.patch.object(installer, "read_url", upstream):
                installer.install(entry, "claude-code", project, self.fetch)
            self.assertTrue(all('/' + entry['source']['revision'] + '/' in u for u in seen))
            self.assertEqual(json.loads((project / ".claude/hooks/git-safety/package.json").read_text())["type"], "commonjs")
            self.assertEqual((project / ".claude/hooks/git-safety/LICENSE.txt").read_text(), "MIT upstream license")

    def test_distinct_conditions_are_preserved_and_mods_are_not_misregistered(self):
        project = Path("/tmp/example")
        existing = {"hooks": {"PreToolUse": [{"matcher": "Bash", "if": "Bash(git:*)", "hooks": [{"type": "command", "command": "check"}]}]}}
        incoming = {"hooks": {"PreToolUse": [{"matcher": "Bash", "hooks": [{"type": "command", "command": "check"}]}]}}
        merged, added = installer.merge_settings(existing, incoming, project)
        self.assertEqual(added, 1)
        self.assertEqual(len(merged["hooks"]["PreToolUse"]), 2)
        with self.assertRaisesRegex(ValueError, "plugin/manual"):
            installer.resources(self.entry("no-email-context"), "claude-code", self.fetch, project)


if __name__ == "__main__":
    unittest.main()
