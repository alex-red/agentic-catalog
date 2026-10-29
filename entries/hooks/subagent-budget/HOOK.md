# Limit subagent calls per session

Bound the number of Claude `Agent`/legacy `Task` or Codex `spawn_agent` tool attempts sharing an event's `session_id`. This is a total-attempt limit rather than a simultaneous-agent limit. It does not authorize delegation that the user or project has prohibited.

## Claude Code install

Requires Python 3 with SQLite and Claude Code 2.1.295+ for the configured `onFailure: "block"` behavior. Copy [budget.py](budget.py) to `.claude/hooks/subagent-budget/budget.py` and merge [settings.example.json](settings.example.json) into `.claude/settings.json`. Keep the handler synchronous. The shipped config denies new calls when the handler fails or times out, in addition to the script's exit-2 error path.

The default limit is 20 admitted attempts per session ID. Optionally set `AGENTIC_SPAWN_LIMIT` to a positive integer up to 10000 in the host environment or the existing settings `env` map. It never emits `permissionDecision: "allow"`: below budget it returns `{}`, preserving ordinary permission checks. At budget it denies with a fixed reason.

SQLite serializes reservations so concurrent calls cannot all read an old count. Every admitted attempt consumes a reservation, including later permission denials, cancellation, or tool failure. Failed calls do not refund it. Retries with the same event session ID share the budget; subagents using different IDs do not. This is not a global fan-out limit or a token/cost budget.

## State and verification

One hashed-session SQLite file lives under `~/.local/state/agentic-catalog/subagent-budget/`, or under `AGENTIC_HOOK_STATE_DIR` if explicitly set. It records only a count; no prompt, task description or raw session ID is stored. Retain the files while a session may resume. A human may remove a session's file after it ends, or intentionally reset it while all hooks for that session are stopped. Removing live state resets the budget. There is no automatic cleanup or background task.

Review the command in `/hooks`, then test a limit of 1 in a scratch session that permits subagents. Confirm the second attempt is denied and regular host approvals still apply to the first. Disable by removing the handler; remove obsolete state separately. Writable state and agent hooks are not a tamper-proof billing boundary.

## Codex install

Copy the same [budget.py](budget.py) to `.codex/hooks/subagent-budget/budget.py`, merge [codex-hooks.example.json](codex-hooks.example.json) into `.codex/hooks.json`, and review/trust the project and exact handler with `/hooks`. Requires a local Git project and Python 3 with SQLite. The example matches `^spawn_agent$` on `PreToolUse`; Codex's `Agent` matcher alias still delivers the canonical `spawn_agent` input. `SubagentStart` is not a blocking substitute.

Codex reservations use a `codex/` subdirectory under the state root, keeping them separate from Claude ledgers even if raw session IDs coincide. The documented Codex payload uses the parent session ID for subagent hooks; the shared-ID limit covers events that actually pass through this local tool-hook path. Other sessions, specialized paths that bypass hooks, and other harnesses are outside the guarantee.

The script emits the same deny JSON or exit-2 error on Codex. **The Codex config does not claim Claude's `onFailure` behavior:** a host timeout or failure to start can proceed without a denial. Keep normal approvals and resource controls. Below the limit, `{}` preserves ordinary permission processing rather than granting approval. State-file cleanup and charged-attempt semantics are the same as above. See the [official tool coverage](https://learn.chatgpt.com/docs/hooks#tool-coverage).
