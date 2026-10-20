# Contributing to Agentic Rules

This repository authors portable guidance. Its `skills/` content is a product library, not a set of automatically active instructions for every contributor task.

- Keep skill names and trigger descriptions distinct. Load supporting resources only when relevant.
- Keep required skill resources inside the skill directory. Do not rely on consumer access to this checkout.
- Preserve standard `SKILL.md` frontmatter. Put structured library metadata in `component.yaml`.
- Treat source files as authoritative. Regenerate `catalog/index.json` with `bun run catalog:build` rather than editing it by hand.
- Run `bun run check` after changing content or validation code. For validator behavior, add tests that exercise malformed input or a meaningful invariant.
- Keep all new components experimental until linked evidence supports promotion. Never equate schema checks with behavioral evaluation.
- Preserve existing authorization and consumer project conventions. Do not activate hooks, tool connections, or extra workflows implicitly.
- Follow `PLAN.md` for scope. Add files that are usable now; avoid empty skill directories and profiles pointing to future components.

The `templates/AGENTS.md.tmpl` file is for consumers. This file governs work on the library itself.
