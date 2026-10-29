# Block "done" until checks pass

A Stop hook that runs the project's fast gate when the agent tries to finish. If the gate fails, the hook blocks and returns the output, so the agent keeps fixing. It needs a fast gate, ideally under a minute, and the `stop_hook_active` guard, or it can loop and burn tokens.

Set `GATE` in [stop-gate.sh](stop-gate.sh) or the host environment to the project's real fast check.

Copy the complete [stop-gate.sh](stop-gate.sh) into the hook folder. The install command uses `.claude/hooks/stop-gate-checks/stop-gate.sh` or `.codex/hooks/stop-gate-checks/stop-gate.sh` and registers it through Bash; executable permission is not required for that command.

Register it in `.claude/settings.json` under `Stop`, with no matcher:

```json
{ "hooks": { "Stop": [{ "hooks": [{ "type": "command", "command": "bash", "args": ["${CLAUDE_PROJECT_DIR}/.claude/hooks/stop-gate-checks/stop-gate.sh"] }] }] } }
```

For Codex, register the same script under `Stop` in `.codex/hooks.json` and trust it with `/hooks`. Codex expects JSON on stdout when a Stop hook exits 0, which is why the script prints `{}`.

Do not use this hook where the gate needs a build or server the agent is not allowed to start.

This is a bounded reminder: after one blocked Stop the retry guard allows the turn to end even if the gate still fails. It observes the whole dirty tree, including pre-existing changes and untracked files, rather than establishing which changes belong to this turn. Do not install it in a shared worktree where another agent's changes would trigger unwanted checks. Requires Bash and jq. Remove its settings entry to disable it.
