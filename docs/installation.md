# Installation

Installation is project-local or per user, as you choose. Nothing here changes global agent settings, enables hooks, or installs a runtime. Skills arrive through a plugin or a directory copy; rules are always a deliberate manual step.

This repository has no published Git remote yet. Replace `OWNER/REPO` below with its location, or use a local path to the checkout.

## Skills through the plugin marketplace (recommended)

Claude Code (2.1.275 or later):

```sh
claude plugin marketplace add OWNER/REPO
claude plugin install agentic-rules@agentic-rules
```

Inside a session, `/plugin install agentic-rules --marketplace OWNER/REPO` does both. Skills are then available as `/agentic-rules:systematic-debugging` and can also be selected automatically.

Codex:

```sh
codex plugin marketplace add OWNER/REPO
codex plugin add agentic-rules@agentic-rules
```

Start a new Codex session afterwards. To enable the plugin for one repository only, add this to its `.codex/config.toml`:

```toml
[plugins."agentic-rules@agentic-rules"]
enabled = true
```

Update with `claude plugin marketplace update` followed by `claude plugin update agentic-rules`, or with `codex plugin marketplace upgrade`. Remove with `claude plugin uninstall agentic-rules` or `codex plugin remove agentic-rules@agentic-rules`.

The Claude Code manifests pass `claude plugin validate --strict`. The Codex manifests follow the documented format but have not yet been installed in Codex. See [compatibility](compatibility.md).

## Skills by directory copy (fallback)

Use this when the project should carry the skill in its own checkout. Project skill directories are `.claude/skills/` for Claude Code and `.agents/skills/` for Codex.

```sh
ar_source=/absolute/path/to/agentic-rules
ar_destination=/absolute/path/to/your-project/.agents/skills/systematic-debugging

if [ -e "$ar_destination" ] || [ -L "$ar_destination" ]; then
  printf 'Already exists; inspect before updating: %s\n' "$ar_destination" >&2
else
  mkdir -p "$(dirname "$ar_destination")"
  cp -R "$ar_source/skills/systematic-debugging" "$ar_destination"
fi
```

Copy the whole directory, including references and `LICENSE.txt`. Check first for another skill with the same name. Some popular libraries also ship a `systematic-debugging` skill, and two same-named skills can both appear in the selector. To update, compare with `diff -ru` against the new source and keep local edits. To remove, delete the copied directory.

## Rules

Rules are plain Markdown. Copying the `rules/` folder of this repository does nothing on its own.

**Claude Code:** copy the selected rule files into the project's `.claude/rules/`. Claude Code loads them at session start, and their `id` and `description` frontmatter is ignored. Add a `paths` list to a rule's frontmatter to scope it to matching files.

```sh
mkdir -p your-project/.claude/rules
cp agentic-rules/rules/verification-evidence.md your-project/.claude/rules/
```

**Codex, or any host that reads `AGENTS.md`:** print a marked block and paste it into the project's existing `AGENTS.md`:

```sh
bun run rules:preview -- debugging "$(git -C /path/to/agentic-rules rev-parse --short HEAD)"
```

Use [the bootstrap template](../templates/AGENTS.md.tmpl) only when the project has no instruction file. Resolve contradictions with project-owned guidance explicitly. To remove the rules, delete the marked block or the copied rule files.

Claude Code reads `AGENTS.md` directly (2.1.277 or later), but only when there is no `CLAUDE.md` in the project or a parent directory. If the project has a `CLAUDE.md`, either add `@AGENTS.md` to it or use `.claude/rules/` as described above.

## Check the installation

1. Start a fresh session in the project.
2. Confirm the rules loaded. In Claude Code, `/memory` lists the loaded instruction files.
3. Confirm the skill is listed, and invoke it explicitly on a disposable reproduction.
4. Ask a plain-language debugging question and check whether the skill is selected.
5. Record host version, model, operating system, and the result in the [compatibility matrix](compatibility.md).
