# Cerberus RE Apple workbench: completed source assessment

Follow-up begun 2026-10-30; completed 2026-11-03 (America/Edmonton) by Codex, an AI curator. Rubric: [human-v1](../ratings.md). This is a provisional source judgment, not independent human calibration or behavioral evidence. Supersedes the [partial assessment](2026-10-29-cerberus-re.md) without rewriting its history.

## Context and comparison

Developers working on this task: Correlating Mach-O, Objective-C, Swift or XPC static findings with explicitly requested Apple runtime observations. Declared hosts: any.

Baseline: Comparison baseline and alternatives: ReVa supplies Ghidra database access and REA broader application investigation. This option specializes in Apple metadata and static/runtime joins. Native debugging alone does not maintain those correlations; generic handoff is optional and the upstream long-run-agent companion is not required for bounded use.

## Inspection and finding

Pinned revision: `3116c94de17386d18367ed14e55dd2c7d1c7fe14`. The [follow-up manifest](2026-10-30-assessment-completion-sources.json) records source URLs, SHA-256 digests, retrieved source ranges and prior unknowns under `cerberus-re`. Files downloaded outside those ranges are not claimed inspected. Source was treated as data; no upstream helper, installer or integration was executed.

Read the complete operating core, workflow/MCP references and dependency installer; traced MCP runtime/bridge approval, passthrough, subprocess/status classification, bridge client and Gadget launch/cleanup boundaries. The installer plans by default and uses argv without a shell. Dedicated runtime tools fail closed when elicitation fails, and destructive calls require an exact endpoint confirmation. Yet the generic command path defaults to allow: bootstrap is labeled read-oriented even though it overwrites config and installs the bridge. Name preapproval uses substring matching rather than exact identity. Status recovery accepts the first JSON value in mixed output and defaults successful unrecognized output to success; that is not schema-verified evidence. Output is captured unbounded before display truncation, and spawned targets inherit the host environment. Use isolated owned targets and verify evidence artifacts independently.

## Grades

| Criterion | Grade (0–4) | Rationale |
| --- | ---: | --- |
| Practical value | 3 | Apple static/runtime correlation fills a specialist analysis gap. |
| Dependability | 1 | A concrete gap in advertised installer enforcement and heuristic success classification limit the otherwise explicit static/runtime evidence workflow. |
| Cognitive ease | 2 | Durable reports help long tasks but add workspace and workflow concepts. |
| Human control | 3 | Documented runtime/write/destructive opt-ins offer clear decisions, not yet implementation verification. |
| Adoption cost | 1 | Ghidra, Java, Python and optional LLDB/Frida make setup substantial. |
| Compatibility | 2 | Portable CLI contrasts with macOS-specific runtime paths. |
| Upkeep | 2 | Multiple analysis backends and companion composition need upkeep. |

Aggregate: **5.3/10** · scoped blockers remain. Weights are provisional editorial choices. Completing a profile does not establish that its examples are correct or authorize its installation.

## Blockers and disposition

- **Generic MCP cerberus_run setup commands:** passthrough_policy permits bootstrap as read-oriented, but bootstrap writes configuration and installs the bridge. Require explicit setup scope and a corrected allowlist before using generic passthrough.

Disposition: **Refresh**. Apply setup/install restrictions to generic bootstrap commands as well as dedicated MCP tools.

## Evidence and limits

Evidence remains **reviewed**; existing evidence records retain their original scope. No installation, activation, live service accuracy, native binary correspondence or measured improvement over the baseline is claimed. The complete Java bridge, every LLDB/Frida/export backend, optional mission companion, immutable-evidence implementation and detached job subsystem were not fully audited. No installer, debugger, bridge, target or certification operation was run. Revisit after source/host changes, consequential failure or a matched trial recording correction effort, interruptions, comprehension and control.
