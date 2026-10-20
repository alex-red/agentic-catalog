# Compatibility

This page records host checks of the plugin (which ships only the `agentic-catalog` discovery skill) and of the original entries. Install targets for every entry type are in the [install guide](../skills/agentic-catalog/references/install.md).

Status: **partially tested.** Claude Code sandbox trigger evaluations have been recorded for both library skills. The running-app fixture received a local check through Codex's built-in browser, but no headless host run or matched outcome has been completed. Marketplace installation, directory-copy installation, rules loading, and host agent behavior remain untested. Trigger results establish only sandbox activation behavior, not installation or effectiveness. [Local fixture checks](../evals/results/harness-checks-2026-10-20.md)

Record the host and model versions, OS, surface, and source revision for every observation. Link an evidence record before replacing "Not run".

| Check | Claude Code | Codex |
| --- | --- | --- |
| Manifest validation | Passed `claude plugin validate --strict` (2.1.301, 2026-10-20) | No validator; follows documented format |
| Marketplace install | Not run | Not run |
| Directory-copy install | Not run | Not run |
| Rules loaded (`.claude/rules/` or `AGENTS.md`) | Not run | Not run |
| Explicit skill invocation | Not run | Not run |
| Implicit trigger | Sandbox suite recorded: 44/45 checks across the two library skills ([results](../evals/results/triggers-2026-10-20.md)) | Not run |
| Matched outcome evaluation | Not run | Not run |
| Existing project instructions | Not run | Not run |
| Git worktree | Not run | Not run |

## Host notes (October 2026)

- **Claude Code:** plugins are declared by `.claude-plugin/plugin.json` and listed by `.claude-plugin/marketplace.json`. Project skills live in `.claude/skills/`, and project rules in `.claude/rules/`. `AGENTS.md` is read directly from 2.1.277 on, but only when no `CLAUDE.md` exists in the project or its parents. [Plugins](https://code.claude.com/docs/en/plugins/manifest-reference), [memory](https://code.claude.com/docs/en/memory), [skills](https://code.claude.com/docs/en/skills)
- **Codex:** the portable `plugin.json` sits at the plugin root, and the repository marketplace is `.agents/plugins/marketplace.json`. Project skills live in `.agents/skills/`, discovered from the working directory up to the repository root. `AGENTS.md` is layered from `~/.codex` and the repository. [Plugins](https://developers.openai.com/codex/plugins/build), [skills](https://learn.chatgpt.com/docs/build-skills), [AGENTS.md](https://learn.chatgpt.com/docs/agent-configuration/agents-md)
- Codex can also read `.claude-plugin/marketplace.json`, but its schema expects `policy` and `category`. Which file Codex prefers when both exist is unverified, so both are shipped.

- Checked against Codex documentation and source on 2026-10-20 (no install run yet): a root `plugin.json` is the preferred Codex manifest when it declares the agent-plugins.org `$schema`, which this repository's does. Codex otherwise falls back to `.codex-plugin/plugin.json`, then `.claude-plugin/plugin.json`. The marketplace at `.agents/plugins/marketplace.json` needs `policy.installation`, `policy.authentication`, and `category` on each entry; ours has them. Plugins install with `codex plugin add NAME@MARKETPLACE`. [Plugin build docs](https://developers.openai.com/plugins/build/plugins.md)
- Codex hooks live in `.codex/hooks.json` or `[hooks]` in `.codex/config.toml`. They load only for trusted projects, and each new or changed hook is skipped until trusted in `/hooks`. `Edit|Write` matchers also match `apply_patch`, whose patch text arrives in `tool_input.command`. A Stop hook must print JSON on exit 0. Custom agents are TOML files in `.codex/agents/`. [Hooks](https://learn.chatgpt.com/docs/hooks.md), [subagents](https://learn.chatgpt.com/docs/agent-configuration/subagents.md)

Cloud surfaces, Windows, and other agents are outside the tested scope.
