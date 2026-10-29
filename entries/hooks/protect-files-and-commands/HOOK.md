# Protect files and block destructive commands

A PreToolUse guardrail that refuses edits to protected paths and recursive force deletes, and tells the agent why so it can change course. Pattern matching is easy to bypass. Use permission deny rules and the host sandbox as the real controls, and treat this hook as a clear, model-visible reason.

Adjust the protected list in [guard.sh](guard.sh) to match the project's policy.

Copy the complete [guard.sh](guard.sh) into the hook folder. The install command uses `.claude/hooks/protect-files-and-commands/guard.sh` or `.codex/hooks/protect-files-and-commands/guard.sh` and registers it through Bash; executable permission is not required for that command.

Register it in `.claude/settings.json`:

```json
{
  "hooks": {
    "PreToolUse": [
      { "matcher": "Edit|Write|Bash", "hooks": [{ "type": "command", "command": "bash", "args": ["${CLAUDE_PROJECT_DIR}/.claude/hooks/protect-files-and-commands/guard.sh"] }] }
    ]
  }
}
```

For Codex, register the same script under `PreToolUse` in `.codex/hooks.json` and trust it with `/hooks`. Test it once by asking the agent to edit `.env` in a scratch checkout.

The path list is deliberately a substring heuristic, not canonical path enforcement. It can overmatch, misses aliases and computed paths, and does not detect every equivalent shell command. Both the direct-edit list and patch-header list cover the same protected names; keep them aligned when customizing. Remove the handler to disable it. For specialized optional policies, see `config-guard`, `protect-tests`, `git-safety`, and `case-insensitive-guard`.
