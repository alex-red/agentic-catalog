# Format after agent edits

Run the project's installed formatter on explicit edited files. Requires Python 3.9+, Node/npm, and a project-local Prettier dependency. Adapt the subprocess argument array in [format.py](format.py) if the project uses another formatter; never install one from a hook.

## Claude Code

Copy [format.py](format.py) to `.claude/hooks/format-after-edit/format.py`, then merge into `.claude/settings.json`:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [{
          "type": "command",
          "command": "python3",
          "args": ["${CLAUDE_PROJECT_DIR}/.claude/hooks/format-after-edit/format.py"],
          "timeout": 25
        }]
      }
    ]
  }
}
```

## Codex

Copy the same script to `.codex/hooks/format-after-edit/format.py`, then merge into `.codex/hooks.json` and review/trust the handler in `/hooks`:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [{
          "type": "command",
          "command": "python3 .codex/hooks/format-after-edit/format.py",
          "timeout": 25
        }]
      }
    ]
  }
}
```

Use an absolute, correctly quoted script path if Codex's hook working directory can change. Codex's matcher aliases cover `apply_patch`. The script reads Update/Add/Move headers from `tool_input.command`, so new untracked files are included without formatting unrelated dirty files. Claude uses `tool_input.file_path`. Other edit routes, including arbitrary Bash writes, are outside coverage.

Paths are passed as process arguments, preserving spaces, quotes and leading dashes. Resolved paths outside the working root are rejected. The formatter runs from `CLAUDE_PROJECT_DIR`, or event `cwd` when that variable is absent; align that root with the project's formatter configuration.

This modifies files after an edit and may overlap editor/pre-commit formatting. A formatter failure reports feedback but does not undo the edit. Keep it fast, test a scratch filename with spaces, and remove the handler to disable it. No persistent state is created by the hook.
