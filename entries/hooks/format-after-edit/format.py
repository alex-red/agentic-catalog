#!/usr/bin/env python3
"""Format explicit edited paths, including new apply_patch files; never Git-wide."""
import json
import os
from pathlib import Path
import subprocess
import sys


def main():
    event = json.load(sys.stdin)
    root = Path(os.environ.get("CLAUDE_PROJECT_DIR") or event["cwd"]).resolve()
    tool_input = event.get("tool_input", {})
    direct = tool_input.get("file_path")
    paths = [direct] if isinstance(direct, str) and direct else []
    command = tool_input.get("command", "")
    if not paths and isinstance(command, str):
        for line in command.splitlines():
            for prefix in ("*** Update File: ", "*** Add File: ", "*** Move to: "):
                if line.startswith(prefix):
                    paths.append(line[len(prefix):])
    selected = []
    for value in paths:
        target = Path(value)
        target = (target if target.is_absolute() else root / target).resolve()
        if not target.is_relative_to(root):
            raise ValueError("edited path escapes working root")
        if target.is_file() and str(target) not in selected:
            selected.append(str(target))
    if selected:
        subprocess.run(["npx", "--no-install", "prettier", "--write", "--ignore-unknown", "--", *selected], cwd=root, check=True, timeout=20)


if __name__ == "__main__":
    try:
        main()
    except (KeyError, ValueError, TypeError, AttributeError, OSError, subprocess.SubprocessError):
        print("Formatting failed; check the edited paths and locally installed Prettier.", file=sys.stderr)
        sys.exit(2)
