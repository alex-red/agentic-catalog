# Installation

There are two things to install, and neither changes global agent settings, enables hooks, or starts a runtime on its own.

1. **The discovery skill** (`agentic-catalog`), which lets an agent search the catalog and install entries. It is optional: any agent can also read `llms.txt` directly.
2. **Individual entries**, chosen per project. The discovery skill installs them after approval, or you can copy them by hand.

The repository is expected at `https://github.com/alex-red/agentic-catalog` (from `package.json`). It is not published yet.

## The discovery skill

Through the plugin marketplace:

```sh
# Claude Code
claude plugin marketplace add alex-red/agentic-catalog
claude plugin install agentic-catalog@agentic-catalog

# Codex
codex plugin marketplace add alex-red/agentic-catalog
codex plugin add agentic-catalog@agentic-catalog
```

Or by directory copy, which pins the skill in the project's checkout:

```sh
cp -R /path/to/agentic-catalog/skills/agentic-catalog your-project/.claude/skills/   # Claude Code
cp -R /path/to/agentic-catalog/skills/agentic-catalog your-project/.agents/skills/   # Codex and other hosts
```

When installed as a plugin, the skill reads the catalog from the plugin's own copy. Otherwise it fetches `catalog/index.json` from the published URL.

Update with `claude plugin marketplace update` and then `claude plugin update agentic-catalog`, or with `codex plugin marketplace upgrade`. Remove with `claude plugin uninstall agentic-catalog` or `codex plugin remove agentic-catalog@agentic-catalog`.

## Entries by hand

The [install guide](../skills/agentic-catalog/references/install.md) gives the target location for every entry type and host. In short:

- **Skills:** copy `entries/skills/<id>/` without `entry.yaml` to `.claude/skills/<id>/` or `.agents/skills/<id>/`. Check first for a same-named skill.
- **Rules:** paste the body of `RULE.md` into `AGENTS.md` inside a marked block, or copy it to `.claude/rules/<id>.md`. `bun run rules:preview -- COLLECTION REVISION` prints the marked block for a collection's rules.
- **Workflows, hooks, and subagents:** follow the entry's `WORKFLOW.md`, `HOOK.md`, or `AGENT.md`. Review every hook command before enabling it.
- **Linked entries, MCP servers, and plugins:** use the entry's `install` steps and its pinned `source.revision`.

Use [the bootstrap template](../templates/AGENTS.md.tmpl) only when the project has no instruction file. Claude Code reads `AGENTS.md` only when no `CLAUDE.md` exists in the project or a parent directory. Otherwise add `@AGENTS.md` to `CLAUDE.md`, or use `.claude/rules/`.

## Check the installation

1. Start a fresh session in the project.
2. Confirm that rules loaded. In Claude Code, `/memory` lists the loaded instruction files.
3. Confirm that installed skills appear in the skill list, and invoke one on a realistic request.
4. Trigger each hook once on a harmless action.
5. Record the host version, model, operating system, and result in the [compatibility matrix](compatibility.md).
