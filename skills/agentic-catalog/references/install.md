# Install targets by entry type

Use project-level locations unless the user asks for a personal (user-level) install. An entry's own `install` field overrides these defaults. Check the destination first; if something already exists there, show the difference and ask before replacing it.

| Type | Claude Code | Codex | Other hosts (`any`) |
| --- | --- | --- | --- |
| skill | `.claude/skills/<id>/` | `.agents/skills/<id>/` | The host's Agent Skills directory; `.agents/skills/<id>/` is the most widely read |
| rule | `.claude/rules/<id>.md`, or a marked block in `CLAUDE.md` | A marked block in `AGENTS.md` | A marked block in `AGENTS.md` |
| workflow | Follow `WORKFLOW.md`; it names the skills, rules, or scripts it needs | Same | Same |
| hook | `hooks` in `.claude/settings.json`; scripts in `.claude/hooks/` | `.codex/hooks.json` when the entry lists `codex`; the user trusts it with `/hooks` | Only an explicitly documented adapter; do not translate event names blindly |
| subagent | `.claude/agents/<id>.md` from `AGENT.md` | `.codex/agents/<id>.toml` with `name`, `description`, and `developer_instructions` (the `AGENT.md` body), when the entry lists `codex` | Not portable |
| mcp | `claude mcp add` with `--scope project` (writes `.mcp.json`) | `[mcp_servers.<id>]` in the project's `.codex/config.toml` (loaded for trusted projects); `codex mcp add` writes the user config instead | The host's MCP configuration |
| plugin | `claude plugin marketplace add OWNER/REPO`, then `claude plugin install NAME@MARKETPLACE` | `codex plugin marketplace add OWNER/REPO`, then `codex plugin add NAME@MARKETPLACE` | Not portable |

## Notes

- **Skills:** copy the whole directory, including `references/`, scripts, and license files, but not `entry.yaml`. The directory name must equal the skill's `name`. Check for a same-named skill from another library first, because both can appear in the selector.
- **Rules:** the body of `RULE.md` is the text to install. Claude Code reads `AGENTS.md` only when no `CLAUDE.md` exists in the project or its parents. If the project has a `CLAUDE.md`, use `.claude/rules/` or add `@AGENTS.md` to `CLAUDE.md`. Keep always-loaded text short, since it costs context in every session.
- **Hooks:** Codex loads project hooks only when the project is trusted, and skips each new or changed hook until the user trusts it in `/hooks`. A Codex `Stop` hook that exits 0 must print JSON (`{}`) or nothing else. A hook runs shell commands automatically. Show the full command and the events it fires on. Prefer project-level settings that are checked in, so the team can see them. Test it once on a harmless action.
- **Hook adapters:** copy the entry's complete runtime files and use its host-specific registration example. Claude `Edit` and Codex `apply_patch` do not share an input shape; matcher aliases do not convert it. Do not copy unsupported decision or failure-policy fields between hosts. Several Codex examples require the exact `.codex/hooks/<id>/` layout and a local Git root; keep those paths intact. A linked upstream hook may support direct-script registration without supporting the other host's plugin loader. Consult the entry's host list and install limitations before claiming portability.
- **Hook setup commands:** the catalog browser generates a project-local command for reviewed standalone hook routes. It downloads a helper and catalog files at the site's revision, copies runtime files into the selected host's hooks directory, and merges only missing handlers into settings. Review the command first. Existing settings and matching registrations are preserved; changed settings receive a backup, while conflicting files, malformed JSON and symlinked targets stop setup. The helper does not execute the hook, install dependencies or grant Codex trust. User-wide hooks and mods such as no-email keep their documented manual/plugin installation route.
- **MCP servers:** note any credentials the server needs, and never write secrets into checked-in files. Prefer read-only scopes.
- **Linked entries:** when the upstream offers an installer (`npx skills add OWNER/REPO --skill NAME`, a plugin marketplace, or `claude mcp add`), use it and pass the pinned revision if it supports one. Otherwise fetch the files at `source.revision` from `source.url`.
- **Updating:** compare the installed copy with the catalog's current files (`diff -ru`), and keep local edits.
- **Removing:** delete the copied files, the marked rule block, or the configuration entry. For plugins, run the host's uninstall command.
