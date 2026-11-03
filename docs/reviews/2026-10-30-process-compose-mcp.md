# Process-compose dev stack control: completed source assessment

Follow-up begun 2026-10-30; completed 2026-11-03 (America/Edmonton) by Codex, an AI curator. Rubric: [human-v1](../ratings.md). This is a provisional source judgment, not independent human calibration or behavioral evidence. Supersedes the [partial assessment](2026-10-29-process-compose-mcp.md) without rewriting its history.

## Context and comparison

Developers working on this task: A project's dev stack runs under process-compose and agents keep starting duplicate servers, losing background logs, or guessing whether a service is ready. Declared hosts: any.

Baseline: Comparison baseline and alternatives: Host background shells (Claude Code run_in_background, Monitor, task lists) run commands within one session; this persists one named stack across sessions and agents, with readiness and searchable logs. portless gives the same apps stable URLs. Third-party process-compose MCP wrappers are superseded by this built-in server.

## Inspection and finding

Pinned revision: `6ffa74f462cd2fa4f8dc1ee63c70b793b298c858`. The [follow-up manifest](2026-10-30-assessment-completion-sources.json) records source URLs, SHA-256 digests, retrieved source ranges and prior unknowns under `process-compose-mcp`. Files downloaded outside those ranges are not claimed inspected. Source was treated as data; no upstream helper, installer or integration was executed.

Read every non-test file in src/mcp and the full MCP guide. Host/Origin allowlists and optional constant-time token comparison precede SSE dispatch; control tools remain opt-in. Per-process mutexes, timeout stop attempts and exit status reporting are explicit. shellQuote protects a standalone shell word, but the documented psql recipe adds its own quotes around the already-quoted substitution, exposing metacharacters in the resulting context. Resource reads themselves start configured processes and truncate logs, and invocation arguments are logged. The existing injection blocker remains.

## Grades

| Criterion | Grade (0–4) | Rationale |
| --- | ---: | --- |
| Practical value | 3 | Named persistent processes and structured logs add value beyond one-session background shells. |
| Dependability | 1 | MCP package and guide inspected. Explicit SSE controls, opt-in process tools and timeouts help, but nested quoting in the psql recipe remains injectable. Resource reads execute processes; arguments can enter logs. |
| Cognitive ease | 2 | Timeouts, exposure flags and transport distinctions increase configuration burden. |
| Human control | 2 | Control exposure is opt-in, but command interpolation and tokenless local access need careful configuration. |
| Adoption cost | 2 | Existing project stacks need MCP configuration and appropriate process lifecycle choices. |
| Compatibility | 3 | SSE and stdio clients differ; stdio may start a separate stack. |
| Upkeep | 2 | Transport, argument and process lifecycle behavior need ongoing checking. |

Aggregate: **5.4/10** · scoped blockers remain. Weights are provisional editorial choices. Completing a profile does not establish that its examples are correct or authorize its installation.

## Blockers and disposition

- **Shell-interpolated process tool arguments:** Earlier pinned-source review records injectable quoted placeholders in the documented psql example. Do not expose untrusted arguments through that recipe until escaping is verified and corrected.

Disposition: **Refresh**. Correct the quoted-command example and explicitly adopt required transport/mutation restrictions before connecting it.

## Evidence and limits

Evidence remains **reviewed**; existing evidence records retain their original scope. No installation, activation, live service accuracy, native binary correspondence or measured improvement over the baseline is claimed. Review covers the MCP package, not the complete process runner or MCP dependency implementation; no server was started. Revisit after source/host changes, consequential failure or a matched trial recording correction effort, interruptions, comprehension and control.
