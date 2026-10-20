# Install targets by entry type

Use project-level locations unless the user asks for a personal (user-level) install. An entry's own `install` field overrides these defaults. Check the destination first; if something already exists there, show the difference and ask before replacing it.

| Type | Claude Code | Codex | Other hosts (`any`) |
| --- | --- | --- | --- |
| skill | `.claude/skills/<id>/` | `.agents/skills/<id>/` | The host's Agent Skills directory; `.agents/skills/<id>/` is the most widely read |
| rule | `.claude/rules/<id>.md`, or a marked block in `CLAUDE.md` | A marked block in `AGENTS.md` | A marked block in `AGENTS.md` |
| workflow | Follow `WORKFLOW.md`; it names the skills, rules, or scripts it needs | Same | Same |
| hook | `hooks` in `.claude/settings.json`; scripts in `.claude/hooks/` | `.codex/hooks.json` when the entry lists `codex`; the user trusts it with `/hooks` | Not portable |
| subagent | `.claude/agents/<id>.md` from `AGENT.md` | Only if the entry lists `codex` in `hosts`; follow its install notes | Not portable |
| mcp | `claude mcp add` with `--scope project` (writes `.mcp.json`) | `codex mcp add`, or `[mcp_servers.<id>]` in `.codex/config.toml` | The host's MCP configuration |
| plugin | `claude plugin marketplace add OWNER/REPO`, then `claude plugin install NAME@MARKETPLACE` | `codex plugin marketplace add OWNER/REPO`, then `codex plugin add NAME@MARKETPLACE` | Not portable |

## Notes

- **Skills:** copy the whole directory, including `references/`, scripts, and license files, but not `entry.yaml`. The directory name must equal the skill's `name`. Check for a same-named skill from another library first, because both can appear in the selector.
- **Rules:** the body of `RULE.md` is the text to install. Claude Code reads `AGENTS.md` only when no `CLAUDE.md` exists in the project or its parents. If the project has a `CLAUDE.md`, use `.claude/rules/` or add `@AGENTS.md` to `CLAUDE.md`. Keep always-loaded text short, since it costs context in every session.
- **Hooks:** a hook runs shell commands automatically. Show the full command and the events it fires on. Prefer project-level settings that are checked in, so the team can see them. Test it once on a harmless action.
- **MCP servers:** note any credentials the server needs, and never write secrets into checked-in files. Prefer read-only scopes.
- **Linked entries:** when the upstream offers an installer (`npx skills add OWNER/REPO --skill NAME`, a plugin marketplace, or `claude mcp add`), use it and pass the pinned revision if it supports one. Otherwise fetch the files at `source.revision` from `source.url`.
- **Updating:** compare the installed copy with the catalog's current files (`diff -ru`), and keep local edits.
- **Removing:** delete the copied files, the marked rule block, or the configuration entry. For plugins, run the host's uninstall command.
