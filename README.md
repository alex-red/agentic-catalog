# Agentic Rules Catalog

A curated, rated catalog of agent guidance for coding agents: skills, rules, workflows and loops, hooks, subagents, MCP servers, and plugins. Claude Code and Codex are the primary hosts, and portable formats are preferred.

**Status: experimental.** 32 entries. Ratings are curator reviews unless an entry's evidence level says otherwise. See [the plan](PLAN.md).

## Use it from an agent

Point an agent at the catalog and say what you want:

> Grab some useful skills from the Agentic Rules catalog for this project.
>
> Look in the catalog for a self-improvement loop we can use.

Any agent can read the ranked index directly:

```text
https://raw.githubusercontent.com/ban-red/agentic-rules/main/llms.txt
```

For a guided flow, install the `agentic-catalog` skill. It inspects the project, recommends a few entries with their scores and sources, and installs only what you approve. It is the only skill the plugin ships.

```sh
# Claude Code
claude plugin marketplace add ban-red/agentic-rules
claude plugin install agentic-rules@agentic-rules

# Codex
codex plugin marketplace add ban-red/agentic-rules
codex plugin add agentic-rules@agentic-rules
```

Or copy `skills/agentic-catalog/` into `.claude/skills/` or `.agents/skills/`. The repository is not published yet; see the plan's next steps.

## What an entry contains

Each entry lives in `entries/<type>s/<id>/` with an `entry.yaml` and, unless it is linked, the files to install:

- **Rating:** usefulness, quality, portability, and novelty (value beyond host built-ins), each from 1 to 5. The score is (2 × usefulness + quality + portability + novelty) / 5.
- **Evidence:** `reviewed` (read and judged), `used` (used in a real project), `tested` (trigger or load checks recorded), or `evaluated` (matched outcome runs).
- **Source:** `original`, `adapted` (with `inspiredBy` links), `vendored` (a pinned, unmodified upstream copy with its license), or `linked` (upstream only).
- **Tags, hosts, `useWhen`, `overlap`, and `related` entries**, for matching and comparison.

[Collections](collections/) group entries that work together: `starter`, `self-improvement`, `debugging`, and `project-upkeep`.

## Browse

- [llms.txt](llms.txt): the ranked list, one line per entry.
- [catalog/index.json](catalog/index.json): full metadata.
- `bun run dev`: a local browser with filters and a source viewer.

## Develop

```sh
bun install
bun run check            # typecheck, lint, schema and resource validation, generated-file freshness, tests
bun run catalog:build    # regenerate catalog/index.json and llms.txt after changing entries
bun run plugin:validate  # needs the Claude Code CLI
```

Read [CONTRIBUTING.md](CONTRIBUTING.md) before adding an entry, and [decisions](docs/decisions.md) for why the catalog is shaped this way. The optional [evaluation harness](docs/evaluation.md) measures trigger and outcome behavior, which raises an entry's evidence level.

Original and adapted content is MIT licensed. Vendored entries keep their upstream licenses, shipped alongside them.
