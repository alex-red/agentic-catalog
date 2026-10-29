#!/usr/bin/env python3
"""Restore an explicitly maintained, small context note after compaction."""
import argparse
import json
import os
from pathlib import Path
import sys


def main(argv=None):
    parser = argparse.ArgumentParser()
    parser.add_argument("--harness", choices=["claude-code", "codex"], default="claude-code")
    options = parser.parse_args(argv)
    event = json.load(sys.stdin)
    if event.get("source") != "compact":
        return
    if options.harness == "codex":
        # Project-local install: <root>/.codex/hooks/compact-context/restore.py.
        script = Path(__file__).resolve()
        if script.parents[2].name != ".codex":
            raise ValueError("expected a project-local .codex installation")
        root = script.parents[3]
        note = root / ".codex" / "compact-context.md"
    else:
        root = Path(os.environ["CLAUDE_PROJECT_DIR"]).resolve()
        note = root / ".claude" / "compact-context.md"
    resolved = note.resolve()
    if not resolved.is_relative_to(root):
        raise ValueError("context note escapes project")
    if not resolved.exists():
        return
    with resolved.open("rb") as handle:
        content = handle.read(6001)
    if len(content) > 6000:
        raise ValueError("context note exceeds 6000 bytes")
    text = content.decode("utf-8")
    print(json.dumps({"hookSpecificOutput": {
        "hookEventName": "SessionStart",
        "additionalContext": "Project-maintained compaction note (verify any task state against current files):\n" + text,
    }}))


if __name__ == "__main__":
    try:
        main()
    except (KeyError, ValueError, AttributeError, OSError):
        print("Compaction note was not loaded; check its path, size, and UTF-8 encoding.", file=sys.stderr)
