# Plan

Updated: October 28, 2026
Status: experimental. The catalog has 55 entries across seven types and four collections, including one experimental and one custom entry. Ratings are curator reviews: two skills have recorded trigger results, and no entry has matched outcome evidence yet.

Decisions and their reasons live in [docs/decisions.md](docs/decisions.md). The previous plan, written for the measured-library phase, is in Git history (`93e99a5`).

## Product

Agentic Catalog is a curated, rated catalog of the most useful agent guidance for coding agents: skills, rules, workflows and loops, hooks, subagents, MCP servers, and plugins. Claude Code and Codex are the primary hosts, and portable formats (Agent Skills, AGENTS.md, MCP) are preferred.

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
| Skills (24) | diagnosing-bugs, agents-md-authoring, verification-before-completion, grilling, handoff, domain-modeling, react-best-practices (linked), retrospective, gh-fix-ci, security-threat-model, secret-serialization, systematic-debugging, test-driven-development, property-based-testing (linked), variant-analysis (linked), webapp-testing, workers-best-practices, create-adaptable-composable, ponytail (experimental), improvement-loop (custom), mcp-builder (linked), find-skills (linked), skill-creator (linked), ux-critique (linked) |
| Rules (5) | verification-evidence, karpathy-coding-guidelines (linked), focused-changes, scope-and-authority, markdown-accessibility |
| Workflows (4) | self-improvement-loop, explore-plan-implement-review, ralph-loop, revise-claude-md (linked) |
| Hooks (15) | format-after-edit, protect-files-and-commands, stop-gate-checks, no-email-context, config-guard, config-watch, git-safety, protect-tests, case-insensitive-guard, context-hogs, desktop-attention, compact-context, post-edit-diagnostics, subagent-budget, prompt-secret-check |
| Subagents (2) | silent-failure-hunter, pr-review-code-reviewer |
| MCP servers (2) | chrome-devtools-mcp, context7 |
| Plugins (3) | superpowers, compound-engineering, claude-reflect |

Collections: starter, self-improvement, debugging, project-upkeep.

Candidates that were considered and left out, with reasons, are in the research notes summarized in [decision 16](docs/decisions.md). Examples: skills that fetch unpinned remote instructions at runtime, unlicensed repositories, and generic reviewer personas.

## Next steps

1. **Publish.** Create the GitHub repository at the location in `package.json` (`alex-red/agentic-catalog`), or change that one field and rebuild. Then fill in the README install line and tag `v0.1.0`.
2. **Use it end to end.** In a real project, ask an agent in each host to "grab useful skills from the catalog" and to "find a self-improvement loop". Record trigger behavior, recommendation quality, and install friction in `evals/results/`.
3. ~~**Check the host-specific claims.**~~ Done against Codex docs and source on 2026-10-20; see [compatibility](docs/compatibility.md). Install commands of third-party linked plugins remain upstream claims.
4. **Raise evidence where it matters.** First trigger pass recorded on Sonnet 5.5 ([results](evals/results/triggers-sonnet-2026-10-20.md)): the discovery skill passed 7/7, and `systematic-debugging` missed 2 of 4 activations. A rerun with fixtures in the workspace showed the misses are Sonnet solving small bugs directly; next, add a hard-bug trigger fixture. Then add cases for the vendored skills, and run the prepared matched comparisons for the original entries when authorized. The harness is in `evals/`; it is optional for a catalog entry, not a release gate.
5. **Grow carefully.** The first batch from the [October research queue](docs/research-2026-10.md) is in ([decision 20](docs/decisions.md)). Domain modeling and Markdown accessibility from the [October 27 scout](docs/research/2026-10-27-catalog-scout.md) are now admitted ([decision 28](docs/decisions.md)). Next review Actions security and sharp-edges; resolve the Durable Objects reference discrepancy and Terraform testing errors before considering those additions. Keep the earlier Supabase SQL, Node security rules, Django licensing, and Planning with Files runtime holds open. Interesting but unproven candidates can enter the experimental tier ([decision 21](docs/decisions.md)); every new entry still starts at `reviewed`.
6. ~~**Automate freshness.**~~ Done: `bun run catalog:freshness` reports pinned upstreams that have moved and reviews older than six months (`--strict` exits non-zero). On 2026-10-20 all vendored entries were current, and four linked repositories had moved by 1 to 9 commits.

## Release gate for v0.1

- `bun run check` and `bun run plugin:validate` pass.
- Every vendored entry was read in full and keeps its upstream license; every linked entry was re-checked within the last month.
- The discovery skill was used successfully from a fresh session in both hosts against the published URL.
- Known limitations are written down, and ratings are not described as measurements.

## Out of scope until evidence asks for it

A general-purpose installer CLI (the browser's generated scripts and explicitly selected hook setup helper are scoped exceptions; see [decisions 25 and 31](docs/decisions.md)), an MCP server for the catalog, a hosted website, implicit installation of hooks or MCP servers, and per-entry versioning beyond pinned upstream revisions.
