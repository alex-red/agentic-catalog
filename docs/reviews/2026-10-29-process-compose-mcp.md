# Process-compose dev stack control: human-focused assessment

Reviewed 2026-10-29 (America/Edmonton) by Codex, an AI curator. Rubric: [human-v1](../ratings.md). This is one curator’s source-based judgment, not independent human calibration or a behavioral evaluation.

Developers working on this task: A project's dev stack runs under process-compose and agents keep starting duplicate servers, losing background logs, or guessing whether a service is ready. Declared hosts: any.

Comparison baseline and alternatives: Host background shells (Claude Code run_in_background, Monitor, task lists) run commands within one session; this persists one named stack across sessions and agents, with readiness and searchable logs. portless gives the same apps stable URLs. Third-party process-compose MCP wrappers are superseded by this built-in server.

Useful stack management with retained command-interpolation and transport concerns.

## Inspection and provenance

Pinned upstream revision: `6ffa74f462cd2fa4f8dc1ee63c70b793b298c858`. Exact file digests, source URLs, prior rating and inspection status are recorded under `process-compose-mcp` in the [assessment manifest](2026-10-29-catalog-assessment-sources.json). Linked source content was treated as data; no installer, upstream helper or integration was executed.

- [www/docs/mcp-server.md](https://raw.githubusercontent.com/F1bonacc1/process-compose/6ffa74f462cd2fa4f8dc1ee63c70b793b298c858/www/docs/mcp-server.md) — read selected line ranges: lines 1–85, 103–119, 265–281, 392–418, 441–465, 478–508.

Other packaged or fetched files not inspected in this pass: `src/mcp/control_tools.go`, `src/mcp/tools.go`, `src/mcp/sse_security.go`.

The listed excerpts support partial judgments only. Unlisted runtime, required references and transitive dependencies are outside coverage; no aggregate is assigned.

## Grades

| Criterion | Grade (0–4) | Rationale |
| --- | ---: | --- |
| Practical value | 3 | Named persistent processes and structured logs add value beyond one-session background shells. |
| Dependability | Not graded | Transport/runtime code and shell interpolation implementation are not audited anew. |
| Cognitive ease | 2 | Timeouts, exposure flags and transport distinctions increase configuration burden. |
| Human control | 2 | Control exposure is opt-in, but command interpolation and tokenless local access need careful configuration. |
| Adoption cost | 2 | Existing project stacks need MCP configuration and appropriate process lifecycle choices. |
| Compatibility | 3 | SSE and stdio clients differ; stdio may start a separate stack. |
| Upkeep | 2 | Transport, argument and process lifecycle behavior need ongoing checking. |

Aggregate: **incomplete — withheld** · scoped blocker(s) remain. Weights are provisional editorial choices. Expected developer benefit and burden are predictions from the artifact, not measured outcomes.

## Evidence and limits

Evidence remains **reviewed**. This pass adds no activation, installation or matched-outcome evidence. Existing records, where present, cover only the scope they describe. Host overlap is compared with the recorded catalog alternatives; this is not a fresh audit of every host release.

Previous curator notes, retained as history rather than newly verified facts: MCP server, transports, argument handling and SSE security reviewed at the pin. Nothing is exposed without an mcp_server block; control tools need expose_control_tools. SSE attaches to the running instance; stdio starts a separate copy of the whole project and exits on a port 8080 clash unless --no-server is passed. Process-as-tool substitutes @{arg} into shell commands, and a placeholder inside quotes, as in the docs' psql example, allows injection. SSE without PC_API_TOKEN is open to any local process. No agent outcome trial.

Open inspection gaps:

- Audit transport/control code and argument escaping; the previously recorded shell interpolation defect remains unresolved.

Scoped blockers:

- **Shell-interpolated process tool arguments:** Earlier pinned-source review records injectable quoted placeholders in the documented psql example. Do not expose untrusted arguments through that recipe until escaping is verified and corrected.

## Disposition and next evidence

Refresh affected paths; retain the entry with explicit blockers. No payload, installation policy, hooks or tool connections are changed by this rating.

Resolve the named inspection gaps first. Correct or independently verify the affected recipe/policy before using that path. A useful next trial would compare the intended task with the named baseline, recording completion, correction effort, interruptions, comprehension and retained human control. Revisit the grades after material source/host changes or consequential failures.
