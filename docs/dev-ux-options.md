# Dev UX tools

The catalog browser groups entries tagged `dev-ux` under **Dev UX**: the local development loop around agents, for the agent or for you. The Category filter combines with Type, Source, Host, Evidence and search. A topic category does not change an entry's install type or activate anything.

| Entry | Choose it for | Form | Who uses it |
| --- | --- | --- | --- |
| [portless](../entries/skills/portless/entry.yaml) | Stable `https://<name>.localhost` URLs instead of ports, per app and per worktree | Linked skill with optional MCP (experimental) | Agent |
| [process-compose-mcp](../entries/mcps/process-compose-mcp/entry.yaml) | One shared, named dev stack with process control, readiness and searchable logs | Linked MCP | Agent |
| [mise-mcp](../entries/mcps/mise-mcp/entry.yaml) | The project's declared tool versions, tasks and environment | Linked MCP | Agent |
| [worktrunk](../entries/plugins/worktrunk/entry.yaml) | Creating, merging and cleaning up worktrees for parallel sessions, with per-session status | Linked plugin | Both |
| [claude-hud](../entries/plugins/claude-hud/entry.yaml) | A Claude Code status line showing context, tools, subagents, todos and limits | Linked plugin | You |
| [ccusage](../entries/tools/ccusage/entry.yaml) | Usage and cost history across sessions, projects and agents | Linked tool | You |
| [webapp-testing](../entries/skills/webapp-testing/SKILL.md) | Driving a local web app with Playwright | Vendored skill | Agent |
| [chrome-devtools-mcp](../entries/mcps/chrome-devtools-mcp/entry.yaml) | Console, network and performance traces in Chrome | Linked MCP | Agent |
| [verification-evidence](../entries/rules/verification-evidence/RULE.md) | Checking a change where its effect appears | Rule | Agent |
| [post-edit-diagnostics](../entries/hooks/post-edit-diagnostics/HOOK.md) | Fast checker feedback after edits | Hook | Agent |
| [desktop-attention](../entries/hooks/desktop-attention/HOOK.md) | Local alerts when a session needs you | Hook | You |

## Choosing

- **Ports and URLs:** portless. Prefer its least-privilege setup (a high port, `--skip-trust`, `PORTLESS_SYNC_HOSTS=0`); the default 443 setup uses sudo, trusts a local CA and edits `/etc/hosts`.
- **Servers that outlive one session:** process-compose-mcp over SSE, attached to the instance you started. Its stdio mode starts a second copy of the project.
- **Toolchains and task commands:** mise-mcp, when the project already uses mise.
- **Parallel agents:** worktrunk. Its Claude Code plugin replaces built-in worktree creation and auto-approves entering existing worktrees; the skill alone avoids the hooks.
- **Your own visibility:** claude-hud for live session state, ccusage for history and cost. Both are optional and user-facing.

These combine: portless names the apps that process-compose runs, and worktrunk's worktrees each get their own portless subdomain. None of them is a default companion; install only what a project needs.

## Limits

Every new entry is linked and starts at evidence level `reviewed`. Source review covered each one's agent-facing surface at its pin. Large reference sets, native binaries (ccusage) and compiled output (claude-hud) were not fully reviewed. No integration or agent outcome was tested. See the [research report](research/2026-10-29-catalog-scout-3.md) and [decision 52](decisions.md) for details.
