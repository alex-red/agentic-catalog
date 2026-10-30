# Cerberus RE Apple workbench: human-focused assessment

Reviewed 2026-10-29 (America/Edmonton) by Codex, an AI curator. Rubric: [human-v1](../ratings.md). This is one curator’s source-based judgment, not independent human calibration or a behavioral evaluation.

Developers working on this task: Correlating Mach-O, Objective-C, Swift or XPC static findings with explicitly requested Apple runtime observations. Declared hosts: any.

Comparison baseline and alternatives: ReVa supplies Ghidra database access and REA broader application investigation. This option specializes in Apple metadata and static/runtime joins. Native debugging alone does not maintain those correlations; generic handoff is optional and the upstream long-run-agent companion is not required for bounded use.

Specialist Apple workbench with documented opt-ins and an unaudited runtime.

## Inspection and provenance

Pinned upstream revision: `3116c94de17386d18367ed14e55dd2c7d1c7fe14`. Exact file digests, source URLs, prior rating and inspection status are recorded under `cerberus-re` in the [assessment manifest](2026-10-29-catalog-assessment-sources.json). Linked source content was treated as data; no installer, upstream helper or integration was executed.

- [README.md](https://raw.githubusercontent.com/OwenPawl/cerberus-re-skill/3116c94de17386d18367ed14e55dd2c7d1c7fe14/README.md) — read selected line ranges: lines 1–85, 109–125, 171–187.

The listed excerpts support partial judgments only. Unlisted runtime, required references and transitive dependencies are outside coverage; no aggregate is assigned.

## Grades

| Criterion | Grade (0–4) | Rationale |
| --- | ---: | --- |
| Practical value | 3 | Apple static/runtime correlation fills a specialist analysis gap. |
| Dependability | Not graded | Runtime, bridge, helpers and agent-facing procedure are uninspected. |
| Cognitive ease | 2 | Durable reports help long tasks but add workspace and workflow concepts. |
| Human control | 3 | Documented runtime/write/destructive opt-ins offer clear decisions, not yet implementation verification. |
| Adoption cost | 1 | Ghidra, Java, Python and optional LLDB/Frida make setup substantial. |
| Compatibility | 2 | Portable CLI contrasts with macOS-specific runtime paths. |
| Upkeep | 2 | Multiple analysis backends and companion composition need upkeep. |

Aggregate: **incomplete — withheld**. Weights are provisional editorial choices. Expected developer benefit and burden are predictions from the artifact, not measured outcomes.

## Evidence and limits

Evidence remains **reviewed**. This pass adds no activation, installation or matched-outcome evidence. Existing records, where present, cover only the scope they describe. Host overlap is compared with the recorded catalog alternatives; this is not a fresh audit of every host release.

Previous curator notes, retained as history rather than newly verified facts: Root skill, installation/requirements sections and dependency manifest reviewed. Bridge, runtime helpers, references and benchmarks remain unaudited. Workspace conventions and optional companion composition add scope. No static/runtime integration trial or outcome evidence.

Open inspection gaps:

- Inspect agent-facing procedure, bridge, installer and runtime enforcement; documented controls are not verified behavior.

## Disposition and next evidence

Pending further inspection; retain with an incomplete profile. No payload, installation policy, hooks or tool connections are changed by this rating.

Resolve the named inspection gaps first. A useful next trial would compare the intended task with the named baseline, recording completion, correction effort, interruptions, comprehension and retained human control. Revisit the grades after material source/host changes or consequential failures.
