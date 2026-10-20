# Agentic Rules

A small library of engineering rules, skills, and workflows for coding agents. Choose the guidance your project needs and keep the rest out of its context.

**Status: experimental scaffold.** The first published component is [systematic debugging](skills/ar-systematic-debugging/SKILL.md). Host discovery and behavioral effectiveness have not yet been evaluated. Codex and Claude Code are the first compatibility targets.

## Use the first skill

Follow the [manual installation guide](docs/installation.md) to copy the complete skill into a project and merge selected rules. The [debugging profile](profiles/debugging.yaml) lists the currently available pilot selection.

- [Scope and authority](rules/scope-and-authority.md)
- [Focused changes](rules/focused-changes.md)
- [Verification evidence](rules/verification-evidence.md)
- [Bug-fix workflow](workflows/README.md)
- [Generated catalog](catalog/index.json)

Skills are self-contained directories in the [Agent Skills format](https://agentskills.io/specification). Rules are source material to merge into project instructions; merely copying `rules/` does not activate them.

## Develop this library

Use Bun:

```sh
bun install
bun run check
```

After adding or updating catalog content:

```sh
bun run catalog:build
bun run check
```

These commands validate content and tooling. They do not launch an agent or establish that a skill improves outcomes.

See [CONTRIBUTING.md](CONTRIBUTING.md) for authoring contracts, [compatibility](docs/compatibility.md) for the host test matrix, and [evaluation](docs/evaluation.md) for behavioral checks.

## Roadmap

The [implementation plan](PLAN.md) describes the six-skill target and later profiles. This scaffold begins with a working debugging component. The `minimal` and `developer` profiles will be added when their selected skills exist. A custom installer and autonomous runner remain later decisions.

Original content is MIT licensed. Each skill includes its own license notice so it can travel independently.

## Browse the wiki

Run `bun run wiki:dev` to open a searchable, responsive catalog with component readers and reference guides. Run `bun run wiki:build` to generate a standalone static export in `dist/wiki/`. See the [wiki guide](wiki/README.md).
