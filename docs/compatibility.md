# Compatibility

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

Cloud surfaces, Windows, and other agents are outside the tested scope.
