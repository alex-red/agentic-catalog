# Cynthion USB protocol investigation: human-focused assessment

Reviewed 2026-10-29 (America/Edmonton) by Codex, an AI curator. Rubric: [human-v1](../ratings.md). This is one curator’s source-based judgment, not independent human calibration or a behavioral evaluation.

Developers working on this task: Reverse engineering a proprietary USB device protocol from contrasting captures, or preparing a bounded replay/emulation experiment. Declared hosts: any.

Comparison baseline and alternatives: Generic debugging and file tools lack USB-specific capture differencing and command inference. REA covers broader application artifacts; reverse-engineering supplies a general analysis method. This specialist option requires its decoder and is not a default dependency of other RE entries.

Useful USB specialist workflow; mandatory decoder and generator inspection is still outstanding.

## Inspection and provenance

Pinned upstream revision: `322192876442b066dd31690a190773c7f903d099`. Exact file digests, source URLs, prior rating and inspection status are recorded under `cynthion-reverse-engineer` in the [assessment manifest](2026-10-29-catalog-assessment-sources.json). Linked source content was treated as data; no installer, upstream helper or integration was executed.

- [plugins/hardware-lab/skills/cynthion-reverse-engineer/SKILL.md](https://raw.githubusercontent.com/curtisgalloway/public-skills/322192876442b066dd31690a190773c7f903d099/plugins/hardware-lab/skills/cynthion-reverse-engineer/SKILL.md) — read selected line ranges: lines 1–85.

The listed excerpts support partial judgments only. Unlisted runtime, required references and transitive dependencies are outside coverage; no aggregate is assigned.

## Grades

| Criterion | Grade (0–4) | Rationale |
| --- | ---: | --- |
| Practical value | 3 | USB capture contrasts and replay scaffolds add specialist structure. |
| Dependability | Not graded | Analysis helpers and the mandatory sibling decoder have not been audited in this pass. |
| Cognitive ease | 2 | Seven stages and per-stage review increase analyst effort. |
| Human control | 3 | Explicit capture choices and artifact reviews retain analyst direction, with repeated confirmation costs. |
| Adoption cost | 2 | Requires Cynthion hardware, decoder skill and several platform tools. |
| Compatibility | 2 | Decoder discovery supports several hosts but emulation requires platform-specific dependencies. |
| Upkeep | 2 | Hardware, decoder and Python helper versions must stay aligned. |

Aggregate: **incomplete — withheld**. Weights are provisional editorial choices. Expected developer benefit and burden are predictions from the artifact, not measured outcomes.

## Evidence and limits

Evidence remains **reviewed**. This pass adds no activation, installation or matched-outcome evidence. Existing records, where present, cover only the scope they describe. Host overlap is compared with the recorded catalog alternatives; this is not a fresh audit of every host release.

Previous curator notes, retained as history rather than newly verified facts: Complete entrypoint and sibling decoder loader read. Analysis/generator helpers and required decoder runtime are not fully audited. Two-capture ambiguity and fixed-length assumptions are disclosed upstream. No synthetic-helper run, hardware trial or agent outcome evaluation.

Open inspection gaps:

- Read entrypoint excerpts only; inspect remaining workflow, analysis/generator helpers and the required decoder before grading dependability.

## Disposition and next evidence

Pending further inspection; retain with an incomplete profile. No payload, installation policy, hooks or tool connections are changed by this rating.

Resolve the named inspection gaps first. A useful next trial would compare the intended task with the named baseline, recording completion, correction effort, interruptions, comprehension and retained human control. Revisit the grades after material source/host changes or consequential failures.
