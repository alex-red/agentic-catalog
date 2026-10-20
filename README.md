# Agentic Rules

Agent guidance for Claude Code and Codex that is kept only when it measurably helps. Each component targets a failure observed in real projects and is compared against the host's default behavior before it ships.

**Status: experimental.** Two skills and three short rules, piloted on one project. See [the plan](PLAN.md) and the [pilot findings](evals/results/pilot-cha-floor-planner-2026-10.md).

## Install

This repository is a plugin marketplace for both hosts. Replace `OWNER/REPO` with its Git location once it is published.

```sh
# Claude Code
claude plugin marketplace add OWNER/REPO
claude plugin install agentic-rules@agentic-rules

# Codex
codex plugin marketplace add OWNER/REPO
codex plugin add agentic-rules@agentic-rules
```

In a Claude Code session: `/plugin install agentic-rules --marketplace OWNER/REPO`.

Rules are not part of the plugin. Copy them into `.claude/rules/` (Claude Code) or merge them into `AGENTS.md` (Codex). The [installation guide](docs/installation.md) covers rules, directory-copy installs, updates, and removal.

## Contents

- Skills: [retrospective](skills/retrospective/SKILL.md) (turn stumbling blocks into project guidance that actually loads), [systematic debugging](skills/systematic-debugging/SKILL.md)
- Rules: [scope and authority](rules/scope-and-authority.md), [focused changes](rules/focused-changes.md), [verification evidence](rules/verification-evidence.md)
- Profiles: [project upkeep](profiles/project-upkeep.yaml), [debugging](profiles/debugging.yaml)
- [Generated catalog](catalog/index.json)

## Develop

```sh
bun install
bun run check            # typecheck, lint, schema and resource validation, catalog freshness, tests
bun run plugin:validate  # needs the Claude Code CLI
bun run dev               # catalog browser with hot reload (Vite, 127.0.0.1)
```

After changing content, run `bun run catalog:build` and then `bun run check`. These commands do not run an agent.

To measure behavior, see [evaluation](docs/evaluation.md): `bun run eval:triggers` for this library's skill triggering, `bun run eval:skills` to test any project's own skills, and `bun run eval:run` for baseline-versus-treatment outcome runs. Both use model credits.

Read [CONTRIBUTING.md](CONTRIBUTING.md) before adding a component, and [decisions](docs/decisions.md) for why the library is shaped this way.

Original content is MIT licensed. Each skill includes its own license notice so it can travel independently.
