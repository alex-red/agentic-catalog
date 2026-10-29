#!/usr/bin/env python3
"""Run one explicitly configured, read-only fast check after a source edit."""
import argparse
import json
import os
from pathlib import Path
import subprocess
import sys
import tempfile


def main(argv=None):
    parser = argparse.ArgumentParser()
    parser.add_argument("--harness", choices=["claude-code", "codex"], default="claude-code")
    options = parser.parse_args(argv)
    event = json.load(sys.stdin)
    tool = event.get("tool_name")
    tool_input = event.get("tool_input", {})
    if options.harness == "codex":
        if tool != "apply_patch":
            return 0
        script = Path(__file__).resolve()
        if script.parents[2].name != ".codex":
            raise ValueError("expected a project-local .codex installation")
        root = script.parents[3]
        paths = []
        command_text = tool_input.get("command", "")
        if not isinstance(command_text, str):
            raise ValueError("invalid patch input")
        for line in command_text.splitlines():
            for prefix in ("*** Update File: ", "*** Add File: ", "*** Move to: "):
                if line.startswith(prefix):
                    paths.append(line[len(prefix):])
    else:
        if tool not in {"Edit", "Write"}:
            return 0
        root = Path(os.environ["CLAUDE_PROJECT_DIR"]).resolve()
        paths = [tool_input.get("file_path", "")]
    working = Path(event.get("cwd") or root).resolve()
    eligible = False
    for file_path in paths:
        if not isinstance(file_path, str) or not file_path:
            continue
        target = Path(file_path)
        target = (target if target.is_absolute() else working / target).resolve()
        if target.is_relative_to(root) and target.suffix in {".ts", ".tsx", ".js", ".jsx", ".py", ".go", ".rs"}:
            eligible = True
    if not eligible:
        return 0
    configured = os.environ.get("AGENTIC_DIAGNOSTICS_ARGV")
    command = json.loads(configured) if configured else json.loads(Path(__file__).with_name("command.json").read_text())
    if not isinstance(command, list) or not command or not all(isinstance(x, str) and x for x in command):
        raise ValueError("expected a command argument array")
    # Bound memory usage even when a checker prints a large diagnostic stream.
    with tempfile.TemporaryFile() as output:
        try:
            result = subprocess.run(command, cwd=root, stdout=output, stderr=subprocess.STDOUT, timeout=20)
        except subprocess.TimeoutExpired:
            print("Fast diagnostics exceeded 20 seconds; run the check explicitly.", file=sys.stderr)
            return 2
        if result.returncode:
            output.seek(0, 2)
            length = output.tell()
            output.seek(max(0, length - 6000))
            tail = output.read().decode("utf-8", errors="replace")
            print("Post-edit diagnostics failed. The edit already happened:\n" + tail, file=sys.stderr)
            return 2
    return 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except (KeyError, ValueError, AttributeError, TypeError, OSError):
        print("Post-edit diagnostics could not run; check the configured argument array and installed tools.", file=sys.stderr)
        sys.exit(2)
