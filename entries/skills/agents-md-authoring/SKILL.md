---
name: agents-md-authoring
description: Write, audit, or prune a project's AGENTS.md or CLAUDE.md so it holds only what an agent cannot infer from the repository. Use when creating project instructions, when they have grown long, or when the agent keeps ignoring or repeating mistakes despite them. Not for writing skills or general documentation.
license: MIT
---

# Writing AGENTS.md

Always-loaded instructions cost context in every session, and measurements published in 2026 found that long or generic files lowered task success. Keep a line only if removing it would cause a mistake.

## Include

- Exact setup, build, test, lint, and single-test commands, with any required flags or environment.
- Conventions that differ from the language or framework defaults, with a pointer to an example.
- Gotchas that are not obvious: generated files, slow or flaky suites, services that must already be running.
- Boundaries: what needs approval, such as dependencies, migrations, secrets, or deploys.
- Repository etiquette that is enforced: branch, commit, and pull request format.

## Exclude

- Anything the agent can find by reading the code, such as file tours or API reference.
- Generic advice ("write clean code", "be careful").
- Facts that go stale, such as versions and owners.
- Long procedures needed only sometimes. Move them to a skill or a document, and link to it in one line.

## Structure

- Keep the root file short, under about 150 lines. In a monorepo, add a nested `AGENTS.md` per package; the nearest file wins.
- Scope path-specific rules with nested files, or with `.claude/rules/*.md` files that declare `paths:`.
- Claude Code reads `AGENTS.md` only when no `CLAUDE.md` exists. Otherwise put `@AGENTS.md` in `CLAUDE.md` so both hosts share one source.

## Audit an existing file

1. Read it alongside the repository and mark each line as a command, convention, gotcha, boundary, or etiquette rule, or as removable.
2. Check each command by running it, or flag it as unverified.
3. Propose removals and moves as a diff, and give one reason for each line. Apply only what the user approves.
4. Move a rule that must hold every time into a hook, permission rule, or CI check rather than stronger wording. Emphasize at most one or two lines.

## Maintain

When the agent repeats a mistake, add one specific line. When it behaves correctly without a line, delete the line. Review changes to instruction files like code, and confirm a change by watching the agent's behavior shift in a fresh session.
