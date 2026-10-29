#!/usr/bin/env python3
"""Install one explicitly selected catalog hook; never execute the hook itself."""
import argparse
import copy
from datetime import datetime, timezone
import json
import os
from pathlib import Path, PurePosixPath
import re
import shlex
import subprocess
import sys
import tempfile
from urllib.request import urlopen


LINKED = {"config-guard", "config-watch", "git-safety", "protect-tests", "case-insensitive-guard", "context-hogs"}
RAW_ROOT = "https://raw.githubusercontent.com/alex-red/agentic-catalog"


def read_url(url):
    with urlopen(url, timeout=30) as response:
        return response.read()


def relative_path(value):
    path = PurePosixPath(value)
    if not value or path.is_absolute() or any(p in {"..", "."} for p in value.split("/")) or "\\" in value:
        raise ValueError("unsafe catalog resource path")
    return path


def safe_target(root, relative):
    path = root.joinpath(*relative_path(relative).parts)
    for parent in [path, *path.parents]:
        if parent == root:
            break
        if parent.is_symlink():
            raise ValueError("refusing a symlinked installation target: " + str(parent))
    return path


def command_identity(handler, project):
    if handler.get("type") != "command":
        return handler
    command = handler.get("command", "")
    if not isinstance(command, str):
        raise ValueError("invalid existing hook command")
    # Match equivalent shell/exec-form registrations without running a shell.
    command = command.replace('$(git rev-parse --show-toplevel)', str(project))
    command = command.replace('${CLAUDE_PROJECT_DIR}', str(project))
    try:
        words = shlex.split(command)
    except ValueError:
        return handler
    args = handler.get("args", [])
    if not isinstance(args, list) or not all(isinstance(a, str) for a in args):
        raise ValueError("invalid existing hook arguments")
    words += [a.replace('${CLAUDE_PROJECT_DIR}', str(project)) for a in args]
    # Resolve script paths, including equivalent ./relative registrations.
    words = [str((project / word).resolve()) if os.path.isabs(word) or word.startswith((".claude/", ".codex/", "./.claude/", "./.codex/")) else word for word in words]
    return {"type": "command", "argv": words, **{k: handler[k] for k in ("if", "async", "once") if k in handler}}


def validate_settings(settings):
    if not isinstance(settings, dict) or not isinstance(settings.get("hooks", {}), dict):
        raise ValueError("settings and hooks must be JSON objects")
    for groups in settings.get("hooks", {}).values():
        if not isinstance(groups, list):
            raise ValueError("hook event registrations must be arrays")
        for group in groups:
            if not isinstance(group, dict) or not isinstance(group.get("hooks"), list):
                raise ValueError("invalid hook matcher group")
            if not all(isinstance(h, dict) for h in group["hooks"]):
                raise ValueError("invalid hook handler")


def merge_settings(existing, registration, project):
    validate_settings(existing)
    validate_settings(registration)
    result = copy.deepcopy(existing)
    added = 0
    for event, incoming_groups in registration["hooks"].items():
        groups = result.setdefault("hooks", {}).setdefault(event, [])
        for incoming in incoming_groups:
            conditions = {k: v for k, v in incoming.items() if k != "hooks"}
            # Missing and empty matcher both mean all events in these examples.
            normalized = lambda d: {k: v for k, v in d.items() if not (k == "matcher" and v in ("", "*"))}
            matching = [g for g in groups if normalized({k: v for k, v in g.items() if k != "hooks"}) == normalized(conditions)]
            for handler in incoming["hooks"]:
                identity = command_identity(handler, project)
                if any(command_identity(h, project) == identity for g in matching for h in g["hooks"]):
                    continue
                if not matching:
                    group = {**conditions, "hooks": []}
                    groups.append(group)
                    matching.append(group)
                matching[0]["hooks"].append(copy.deepcopy(handler))
                added += 1
    return result, added


def resources(entry, host, fetch, destination):
    name = entry["id"]
    if host not in entry.get("hosts", []):
        raise ValueError("this entry does not support " + host)
    if entry["source"]["kind"] == "linked":
        source = entry["source"]
        if name not in LINKED or source.get("url") != "https://github.com/karanb192/claude-code-hooks" or source.get("path") != "plugins/" + name or not re.fullmatch(r"[0-9a-f]{40}", source.get("revision", "")):
            raise ValueError("this hook requires its documented plugin/manual installation")
        base = "https://raw.githubusercontent.com/karanb192/claude-code-hooks/" + source["revision"]
        get = lambda path: read_url(base + "/" + path)
        runtime = name + ".js"
        files = {
            runtime: get(source["path"] + "/" + runtime), "LICENSE.txt": get("LICENSE"),
            # Upstream uses require(); don't inherit a consumer's type: module.
            "package.json": b'{"private":true,"type":"commonjs"}\n',
        }
        if host == "claude-code":
            registration = json.loads(get(source["path"] + "/hooks/hooks.json"))
            for groups in registration["hooks"].values():
                for group in groups:
                    for handler in group["hooks"]:
                        if handler.get("command") != 'node "${CLAUDE_PLUGIN_ROOT}/' + runtime + '"':
                            raise ValueError("unrecognized pinned upstream hook command")
                        handler["command"] = "node " + shlex.quote(str(destination / runtime))
        else:
            registration = {"hooks": {"PreToolUse": [{"matcher": "^Bash$", "hooks": [{"type": "command", "command": "node " + shlex.quote(str(destination / runtime)), "timeout": 10}]}]}}
        return files, registration
    prefix = entry["path"] + "/"
    example = "settings.example.json" if host == "claude-code" else "codex-hooks.example.json"
    available = entry.get("files", [])
    if prefix + example not in available:
        raise ValueError("this hook has no installable registration for " + host)
    registration = json.loads(fetch(prefix + example))
    files = {}
    for path in available:
        if not path.startswith(prefix):
            raise ValueError("entry file escapes its directory")
        relative = path[len(prefix):]
        relative_path(relative)
        notice = PurePosixPath(relative).name.upper().startswith(("LICENSE", "NOTICE"))
        if notice or (relative.endswith((".py", ".sh", ".js", ".json")) and not relative.endswith(".example.json")):
            files[relative] = fetch(path)
    if entry["source"]["kind"] in {"original", "adapted"} and "LICENSE.txt" not in files:
        files["LICENSE.txt"] = fetch("LICENSE")
    if not files:
        raise ValueError("hook has no runtime files")
    for groups in registration["hooks"].values():
        for group in groups:
            for handler in group["hooks"]:
                if host == "claude-code":
                    handler["args"] = [a.replace('${CLAUDE_PROJECT_DIR}/.claude/hooks/' + name + '/', str(destination) + '/') for a in handler.get("args", [])]
                else:
                    for filename in files:
                        token = '"$(git rev-parse --show-toplevel)/.codex/hooks/' + name + '/' + filename + '"'
                        handler["command"] = handler["command"].replace(token, shlex.quote(str(destination / filename)))
    return files, registration


def atomic_write(path, content, mode=0o600):
    fd, temporary = tempfile.mkstemp(prefix=".agentic-hook-", dir=path.parent)
    try:
        with os.fdopen(fd, "wb") as handle:
            handle.write(content)
        os.chmod(temporary, mode)
        os.replace(temporary, path)
    finally:
        if os.path.exists(temporary):
            os.unlink(temporary)


def install(entry, host, project, fetch):
    folder = ".claude" if host == "claude-code" else ".codex"
    destination = safe_target(project, folder + "/hooks/" + entry["id"])
    settings_path = safe_target(project, folder + ("/settings.json" if host == "claude-code" else "/hooks.json"))
    files, registration = resources(entry, host, fetch, destination)
    validate_settings(registration)
    # Fetch everything before locking or modifying the consumer project.
    settings_path.parent.mkdir(parents=True, exist_ok=True)
    lock = settings_path.parent / ".agentic-hook-install.lock"
    descriptor = os.open(lock, os.O_CREAT | os.O_EXCL | os.O_WRONLY, 0o600)
    created = []
    try:
        previous = settings_path.read_bytes() if settings_path.exists() else None
        existing = json.loads(previous) if previous is not None else {}
        merged, added = merge_settings(existing, registration, project)
        targets = [(safe_target(project, folder + "/hooks/" + entry["id"] + "/" + name), content) for name, content in files.items()]
        for target, content in targets:
            if target.exists() and (not target.is_file() or target.read_bytes() != content):
                raise ValueError("existing hook file differs; preserve or reconcile it before reinstalling: " + str(target))
        for target, content in targets:
            if not target.exists():
                target.parent.mkdir(parents=True, exist_ok=True)
                atomic_write(target, content)
                created.append(target)
        if added:
            if previous is not None:
                stamp = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%S%fZ")
                backup = settings_path.with_name(settings_path.name + ".agentic-backup-" + stamp)
                atomic_write(backup, previous)
            atomic_write(settings_path, (json.dumps(merged, indent=2, ensure_ascii=False) + "\n").encode(), settings_path.stat().st_mode & 0o777 if previous is not None else 0o600)
        print(f"{entry['id']}: copied {len(created)} file(s); added {added} hook registration(s) in {settings_path}")
        if host == "codex":
            print("Review and trust the project and hook definition in /hooks; trust is not granted by this installer.")
        if entry['id'] == 'context-hogs':
            print("Standalone hook installed; the optional Claude leaderboard skill is not installed. Render with: node " + shlex.quote(str(destination / 'context-hogs.js')) + " --render")
    except Exception:
        for path in created:
            path.unlink(missing_ok=True)
        raise
    finally:
        os.close(descriptor)
        lock.unlink(missing_ok=True)


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("id")
    parser.add_argument("--host", choices=["claude-code", "codex"], required=True)
    parser.add_argument("--revision", default="main")
    parser.add_argument("--raw-base")
    parser.add_argument("--checkout", type=Path, help="Read catalog files from an existing local checkout")
    parser.add_argument("--project", type=Path, help="Consumer project root; defaults to Git root or cwd")
    options = parser.parse_args(argv)
    if not re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", options.id) or not re.fullmatch(r"main|[0-9a-f]{7,40}", options.revision):
        raise ValueError("invalid entry ID or catalog revision")
    if options.checkout:
        checkout = options.checkout.resolve()
        def fetch(path):
            source = checkout.joinpath(*relative_path(path).parts).resolve()
            if not source.is_relative_to(checkout):
                raise ValueError("catalog file escapes checkout")
            return source.read_bytes()
    else:
        base = options.raw_base or RAW_ROOT + "/" + options.revision
        fetch = lambda path: read_url(base.rstrip("/") + "/" + str(relative_path(path)))
    catalog = json.loads(fetch("catalog/index.json"))
    entry = next((e for e in catalog["entries"] if e["id"] == options.id and e["type"] == "hook"), None)
    if entry is None:
        raise ValueError("unknown hook entry")
    if options.project:
        project = options.project.resolve()
    else:
        git = subprocess.run(["git", "rev-parse", "--show-toplevel"], text=True, capture_output=True)
        project = Path(git.stdout.strip()).resolve() if git.returncode == 0 else Path.cwd().resolve()
    if not project.is_dir():
        raise ValueError("project directory does not exist")
    install(entry, options.host, project, fetch)


if __name__ == "__main__":
    try:
        main()
    except (ValueError, OSError, KeyError, TypeError) as error:
        print("Hook installation stopped: " + str(error), file=sys.stderr)
        sys.exit(1)
