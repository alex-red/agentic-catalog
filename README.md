# Agentic Catalog

[![Validate](https://github.com/alex-red/agentic-catalog/actions/workflows/validate.yml/badge.svg)](https://github.com/alex-red/agentic-catalog/actions/workflows/validate.yml)
[![Browse](https://img.shields.io/badge/browse-live%20catalog-58a6ff.svg)](https://alex-red.github.io/agentic-catalog/)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

A curated, rated catalog of agent guidance for coding agents: skills, rules, workflows and loops, hooks, subagents, MCP servers, and plugins. Claude Code and Codex are the primary hosts, and portable formats are preferred.

**Status: experimental.** 41 entries across seven types, plus four collections. Ratings are curator reviews unless an entry's evidence level says otherwise. See [the plan](PLAN.md).

**[Browse the catalog online](https://alex-red.github.io/agentic-catalog/)**: search, filter, and read every entry's rating, provenance, and source files.

## Use it from an agent

Point an agent at the catalog and say what you want:

> Grab some useful skills from the Agentic Catalog for this project.
>
> Look in the catalog for a self-improvement loop we can use.

Any agent can read the ranked index directly:

```text
https://raw.githubusercontent.com/alex-red/agentic-catalog/main/llms.txt
```

For a guided flow, install the `agentic-catalog` skill. It inspects the project, recommends a few entries with their scores and sources, and installs only what you approve. It is the only skill the plugin ships.

```sh
# Claude Code
claude plugin marketplace add alex-red/agentic-catalog
claude plugin install agentic-catalog@agentic-catalog

# Codex
codex plugin marketplace add alex-red/agentic-catalog
codex plugin add agentic-catalog@agentic-catalog
```

Or copy `skills/agentic-catalog/` into `.claude/skills/` or `.agents/skills/`.

## What an entry contains

Each entry lives in `entries/<type>s/<id>/` with an `entry.yaml` and, unless it is linked, the files to install:

- **Rating:** usefulness, quality, portability, and novelty (value beyond host built-ins), each from 1 to 5. The score is (2 × usefulness + quality + portability + novelty) / 5.
- **Evidence:** `reviewed` (read and judged), `used` (used in a real project), `tested` (trigger or load checks recorded), or `evaluated` (matched outcome runs).
- **Source:** `original`, `adapted` (with `inspiredBy` links), `vendored` (a pinned, unmodified upstream copy with its license), or `linked` (upstream only).
- **Tags, hosts, `useWhen`, `overlap`, and `related` entries**, for matching and comparison.

[Collections](collections/) group entries that work together: `starter`, `self-improvement`, `debugging`, and `project-upkeep`.

## Browse

- [Live catalog browser](https://alex-red.github.io/agentic-catalog/): search, sort, filter, and read entry sources.
- [llms.txt](llms.txt): the ranked list, one line per entry.
- [catalog/index.json](catalog/index.json): full metadata.
- `bun run dev`: the same browser locally.

## Develop

```sh
bun install
bun run check            # typecheck, lint, schema and resource validation, generated-file freshness, tests
bun run catalog:build    # regenerate catalog/index.json and llms.txt after changing entries
bun run plugin:validate  # needs the Claude Code CLI
bun run catalog:freshness  # network: report upstreams that moved past their pinned revision, and stale reviews
```

Read [CONTRIBUTING.md](CONTRIBUTING.md) before adding an entry or opening a pull request, and [decisions](docs/decisions.md) for why the catalog is shaped this way. The optional [evaluation harness](docs/evaluation.md) measures trigger and outcome behavior, which raises an entry's evidence level.

Original and adapted content is MIT licensed. Vendored entries keep their upstream licenses, shipped alongside them.
