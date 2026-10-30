# Chrome DevTools MCP: human-focused assessment

Reviewed 2026-10-29 (America/Edmonton) by Codex, an AI curator. Rubric: [human-v1](../ratings.md). This is one curator’s source-based judgment, not independent human calibration or a behavioral evaluation.

Developers working on this task: Agents change web UI and need to see the result, read console or network errors, or diagnose performance, especially in Codex or headless setups. Declared hosts: any.

Comparison baseline and alternatives: Claude Code's Chrome integration and built-in browser pane; Playwright MCP is an alternative, so install one of them.

Useful browser diagnostics; explicitly review data collection, profile isolation and overlap with installed tools.

## Inspection and provenance

Pinned upstream revision: `5463101120f94fc7c79d43c44c01a4ab57835279`. Exact file digests, source URLs, prior rating and inspection status are recorded under `chrome-devtools-mcp` in the [assessment manifest](2026-10-29-catalog-assessment-sources.json). Linked source content was treated as data; no installer, upstream helper or integration was executed.

- [README.md](https://raw.githubusercontent.com/ChromeDevTools/chrome-devtools-mcp/5463101120f94fc7c79d43c44c01a4ab57835279/README.md) — read selected line ranges: lines 1–85.

The listed excerpts support partial judgments only. Unlisted runtime, required references and transitive dependencies are outside coverage; no aggregate is assigned.

## Grades

| Criterion | Grade (0–4) | Rationale |
| --- | ---: | --- |
| Practical value | 3 | Performance traces and network/console inspection add value when host browser tools lack them. |
| Dependability | Not graded | Runtime, browser isolation and collection implementations are not audited. |
| Cognitive ease | 3 | Structured browser tools reduce manual inspection but enlarge the tool surface. |
| Human control | 2 | Pinned README documents default usage statistics, CrUX requests and update checks with separate opt-outs. |
| Adoption cost | 3 | Requires Node, npm and a supported Chrome installation. |
| Compatibility | 3 | Standard MCP transfers across clients, but Chrome support and host overlap vary. |
| Upkeep | 2 | Browser and server releases require compatibility upkeep. |

Aggregate: **incomplete — withheld**. Weights are provisional editorial choices. Expected developer benefit and burden are predictions from the artifact, not measured outcomes.

## Evidence and limits

Evidence remains **reviewed**. This pass adds no activation, installation or matched-outcome evidence. Existing records, where present, cover only the scope they describe. Host overlap is compared with the recorded catalog alternatives; this is not a fresh audit of every host release.

Previous curator notes, retained as history rather than newly verified facts: Official, Apache-2.0, and actively released. Claude Code already has a Chrome integration and a browser pane, so there the gain is performance traces, network inspection, and isolated headless runs. For Codex it fills a real gap. Use --isolated so the agent does not get a profile with personal sign-ins.

Open inspection gaps:

- Inspect runtime/tool contracts and isolation, telemetry and CrUX controls; no browser server was installed or exercised.

## Disposition and next evidence

Pending further inspection; retain with an incomplete profile. No payload, installation policy, hooks or tool connections are changed by this rating.

Resolve the named inspection gaps first. A useful next trial would compare the intended task with the named baseline, recording completion, correction effort, interruptions, comprehension and retained human control. Revisit the grades after material source/host changes or consequential failures.
