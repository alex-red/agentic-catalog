# Plan

Updated: October 20, 2026
Status: experimental. The catalog has 32 entries across seven types and four collections. Ratings are curator reviews: two skills have recorded trigger results, and no entry has matched outcome evidence yet.

Decisions and their reasons live in [docs/decisions.md](docs/decisions.md). The previous plan, written for the measured-library phase, is in Git history (`93e99a5`).

## Product

Agentic Rules is a curated, rated catalog of the most useful agent guidance for coding agents: skills, rules, workflows and loops, hooks, subagents, MCP servers, and plugins. Claude Code and Codex are the primary hosts, and portable formats (Agent Skills, AGENTS.md, MCP) are preferred.

The goal is that a user can tell an agent "grab some useful skills from the catalog for this project" or "find a self-improvement loop in the catalog", and the agent can search, compare, recommend, and install entries with their source recorded.

Each entry records:

- **What it is and when to use it**: type, title, summary, `useWhen`, tags, hosts.
- **A rating**: four 1–5 axes (usefulness, quality, portability, novelty beyond host built-ins), a computed score, an evidence level (`reviewed`, `used`, `tested`, `evaluated`), and review notes.
- **Where it came from**: `original`, `adapted` (with `inspiredBy` links), `vendored` (a pinned upstream copy with its license), or `linked` (upstream only, pinned where possible).
- **Overlap and relations**: what hosts or other entries already cover, and related entries.

## How agents use it

- `llms.txt`: a ranked, one-line-per-entry index that can be read in a single fetch.
- `catalog/index.json`: full metadata for filtering.
- The `agentic-catalog` skill, which is the only skill the plugin ships. It reads the index, looks at the project, recommends a few entries, and installs only the approved ones.
- `bun run dev`: a local browser for people.

All three are generated from `entries/` and `collections/` and checked for freshness in CI.

## Curation rules

1. Prefer fit and quality over coverage. An entry must be the best available option for its job, or a clearly labelled alternative.
2. Rate novelty against host built-ins and default model behavior, and say what overlaps in `overlap`.
3. Read everything before vendoring. Vendor only permissive licenses, keep the upstream license file, pin the commit, and do not edit vendored files. Anything else is linked or adapted.
4. Evidence levels above `reviewed` need linked evidence files. Never describe a curator score as a measured result.
5. Hooks, MCP servers, and plugins are never installed implicitly; the discovery skill shows their configuration and asks first.
6. Re-review entries when upstream releases a major version, or at least every six months. Delete entries that a host built-in has made redundant.

## Inventory (October 2026)

| Type | Entries |
| --- | --- |
| Skills (14) | diagnosing-bugs, agents-md-authoring, verification-before-completion, grilling, react-best-practices (linked), retrospective, gh-fix-ci, security-threat-model, systematic-debugging, test-driven-development, webapp-testing, mcp-builder (linked), find-skills (linked), skill-creator (linked) |
| Rules (4) | verification-evidence, karpathy-coding-guidelines (linked), focused-changes, scope-and-authority |
| Workflows (4) | self-improvement-loop, explore-plan-implement-review, ralph-loop, revise-claude-md (linked) |
| Hooks (3) | format-after-edit, protect-files-and-commands, stop-gate-checks |
| Subagents (2) | silent-failure-hunter, pr-review-code-reviewer |
| MCP servers (2) | chrome-devtools-mcp, context7 |
| Plugins (3) | superpowers, compound-engineering, claude-reflect |

Collections: starter, self-improvement, debugging, project-upkeep.

Candidates that were considered and left out, with reasons, are in the research notes summarized in [decision 16](docs/decisions.md). Examples: skills that fetch unpinned remote instructions at runtime, unlicensed repositories, and generic reviewer personas.

## Next steps

1. **Publish.** Create the GitHub repository at the location in `package.json` (`ban-red/agentic-rules`), or change that one field and rebuild. Then fill in the README install line and tag `v0.1.0`.
2. **Use it end to end.** In a real project, ask an agent in each host to "grab useful skills from the catalog" and to "find a self-improvement loop". Record trigger behavior, recommendation quality, and install friction in `evals/results/`.
3. **Check the host-specific claims.** Codex hook files and trust, the Codex plugin manifest location (`.codex-plugin/plugin.json` versus the root `plugin.json` used here), and the install commands of linked plugins. Fix entries that are wrong.
4. **Raise evidence where it matters.** Run trigger checks for the discovery skill and the vendored skills, and run the prepared matched comparisons for the original entries when authorized. The harness is in `evals/`; it is optional for a catalog entry, not a release gate.
5. **Grow carefully.** Add entries from observed needs and from the considered-but-deferred list, such as improve-codebase-architecture and handoff from mattpocock/skills and Playwright MCP. Each new entry starts at `reviewed`.
6. **Automate freshness.** Add a script that reports upstream commits newer than each pinned revision, so re-reviews are scheduled rather than remembered.

## Release gate for v0.1

- `bun run check` and `bun run plugin:validate` pass.
- Every vendored entry was read in full and keeps its upstream license; every linked entry was re-checked within the last month.
- The discovery skill was used successfully from a fresh session in both hosts against the published URL.
- Known limitations are written down, and ratings are not described as measurements.

## Out of scope until evidence asks for it

A custom installer CLI, an MCP server for the catalog, a hosted website, automatic installation of hooks or MCP servers, and per-entry versioning beyond pinned upstream revisions.
