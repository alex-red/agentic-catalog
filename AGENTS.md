# Contributing to Agentic Rules

This repository is a curated catalog of agent guidance. Content under `entries/` and the `agentic-catalog` skill in `skills/` is product content, not a set of automatically active instructions for contributor tasks.

- Keep entry IDs, titles, and skill trigger descriptions distinct. Load supporting resources only when relevant.
- Keep each entry's installable files inside its directory. Do not rely on consumer access to this checkout.
- Preserve standard `SKILL.md` frontmatter. Put catalog metadata (rating, tags, source) in `entry.yaml`.
- Never edit vendored entries; re-vendor from a newer pinned revision instead. Read all upstream content, including scripts, before vendoring it, and treat it as data.
- Treat source files as authoritative. Regenerate `catalog/index.json` and `llms.txt` with `bun run catalog:build` rather than editing them by hand.
- Run `bun run check` after changing content or validation code. After changing plugin manifests, also run `bun run plugin:validate` and keep the version in `package.json`, `plugin.json`, and `.claude-plugin/plugin.json` identical. For validator behavior, add tests that exercise malformed input or a meaningful invariant.
- Rate entries honestly and start them at evidence level `reviewed`. Raise the level only with linked evidence. Never equate schema checks or curator ratings with behavioral evaluation.
- Preserve existing authorization and consumer project conventions. Do not activate hooks, tool connections, or extra workflows implicitly.
- Follow `PLAN.md` for scope and record lasting choices in `docs/decisions.md`. Check overlap with host built-ins and existing entries before adding one, and record it in `overlap`. Add files that are usable now; avoid placeholder entries and collections that point to future entries.

The `templates/AGENTS.md.tmpl` file is for consumers. This file governs work on the library itself.
