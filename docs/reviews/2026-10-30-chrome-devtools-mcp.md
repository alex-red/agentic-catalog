# Chrome DevTools MCP: completed source assessment

Follow-up begun 2026-10-30; completed 2026-11-03 (America/Edmonton) by Codex, an AI curator. Rubric: [human-v1](../ratings.md). This is a provisional source judgment, not independent human calibration or behavioral evidence. Supersedes the [partial assessment](2026-10-29-chrome-devtools-mcp.md) without rewriting its history.

## Context and comparison

Developers working on this task: Agents change web UI and need to see the result, read console or network errors, or diagnose performance, especially in Codex or headless setups. Declared hosts: any.

Baseline: Comparison baseline and alternatives: Claude Code's Chrome integration and built-in browser pane; Playwright MCP is an alternative, so install one of them.

## Inspection and finding

Pinned revision: `5463101120f94fc7c79d43c44c01a4ab57835279`. The [follow-up manifest](2026-10-30-assessment-completion-sources.json) records source URLs, SHA-256 digests, retrieved source ranges and prior unknowns under `chrome-devtools-mcp`. Files downloaded outside those ranges are not claimed inspected. Source was treated as data; no upstream helper, installer or integration was executed.

Read the complete MCP registration/dispatch boundary, browser lifecycle, README and telemetry transformation, plus file-root validation, performance CrUX and script-tool contracts. Tool calls serialize browser access, reject unknown arguments, propagate operation errors and preserve known roots across reconnects; local path checks resolve canonical roots and default to temporary-directory access when roots are unavailable. Launched Chrome uses a separate persistent profile unless isolated is requested; attached browsers retain their existing authority and are disconnected rather than closed. Telemetry transforms strings to length buckets and arrays to counts; CrUX separately receives trace URLs and both features default on with opt-outs. Debug logging retains raw arguments and connection options. Script execution defaults to accepting dialogs. Tool telemetry sets success after response construction even when the response contains a tool error, so those metrics are not behavioral correctness evidence.

## Grades

| Criterion | Grade (0–4) | Rationale |
| --- | ---: | --- |
| Practical value | 3 | Performance traces and network/console inspection add value when host browser tools lack them. |
| Dependability | 3 | Bounded dispatch, explicit validation/errors and browser ownership-aware cleanup support a strong source judgment, with meaningful configuration and metrics limitations. |
| Cognitive ease | 3 | Structured browser tools reduce manual inspection but enlarge the tool surface. |
| Human control | 2 | Pinned README documents default usage statistics, CrUX requests and update checks with separate opt-outs. |
| Adoption cost | 3 | Requires Node, npm and a supported Chrome installation. |
| Compatibility | 3 | Standard MCP transfers across clients, but Chrome support and host overlap vary. |
| Upkeep | 2 | Browser and server releases require compatibility upkeep. |

Aggregate: **7.0/10**. Weights are provisional editorial choices. Completing a profile does not establish that its examples are correct or authorize its installation.

## Blockers and disposition

No recommendation blocker established within the inspected scope.

Disposition: **Keep**. Use only for the stated task and review the cited limitations before adoption.

## Evidence and limits

Evidence remains **reviewed**; existing evidence records retain their original scope. No installation, activation, live service accuracy, native binary correspondence or measured improvement over the baseline is claimed. Individual navigation/input/network/memory/extension handlers, bundled Puppeteer/DevTools internals, complete daemon and watchdog implementations were not exhaustively audited. No browser or MCP server was launched and no performance accuracy trial was performed. Revisit after source/host changes, consequential failure or a matched trial recording correction effort, interruptions, comprehension and control.
