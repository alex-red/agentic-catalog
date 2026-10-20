# Format after agent edits

Run the project's formatter on files the agent just edited, so formatting needs no instructions and no follow-up turns. Replace `prettier` with the project's formatter, and never install a formatter from the hook.

## Claude Code

Add to `.claude/settings.json` (requires `jq`):

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "jq -r '.tool_input.file_path // empty' | xargs -r npx --no-install prettier --write --ignore-unknown"
          }
        ]
      }
    ]
  }
}
```

## Codex

Codex's edit tool passes patch text rather than a file path, so format the changed files reported by Git instead. Add to `.codex/hooks.json`, then review and trust the hook with `/hooks`:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "git diff --name-only --diff-filter=AM | xargs -r npx --no-install prettier --write --ignore-unknown"
          }
        ]
      }
    ]
  }
}
```

## Notes

- The hook runs after every edit, so keep it fast.
- A formatter failure is reported to the agent but does not undo the edit.
- If the team already formats on save or in a pre-commit hook, this only adds formatting at agent time.
