# Design refinement and variants (Impeccable): human-focused assessment

Reviewed 2026-10-29 (America/Edmonton) by Codex, an AI curator. Rubric: [human-v1](../ratings.md). This is one curator’s source-based judgment, not independent human calibration or a behavioral evaluation.

Developers working on this task: Explicitly trying a broad design-refinement workflow and accepting its engine setup, project artifacts and command-specific dependencies. Declared hosts: claude-code, codex.

Comparison baseline and alternatives: Overlaps frontend-design, ux-critique, webapp-testing and native browser tools. Adds coordinated refinement vocabulary and live variants. Prefer a focused command to loading several competing design systems. A clean detector is not proof of design quality.

Experimental suite; runtime behavior and data collection need inspection before recommendation.

## Inspection and provenance

Pinned upstream revision: `7510e233b228864606888d252abacf5e7148bf87`. Exact file digests, source URLs, prior rating and inspection status are recorded under `impeccable` in the [assessment manifest](2026-10-29-catalog-assessment-sources.json). Linked source content was treated as data; no installer, upstream helper or integration was executed.

- [.agents/skills/impeccable/SKILL.md](https://raw.githubusercontent.com/pbakaus/impeccable/7510e233b228864606888d252abacf5e7148bf87/.agents/skills/impeccable/SKILL.md) — read selected line ranges: lines 1–85.

The listed excerpts support partial judgments only. Unlisted runtime, required references and transitive dependencies are outside coverage; no aggregate is assigned.

## Grades

| Criterion | Grade (0–4) | Rationale |
| --- | ---: | --- |
| Practical value | 3 | A coordinated design critique and polish system can add more than generic prompting. |
| Dependability | Not graded | Downloaded launcher, engine and reference behavior are not audited. |
| Cognitive ease | 2 | Mandatory context launching and many commands introduce process overhead. |
| Human control | Not graded | Control cannot be graded without inspecting launcher mutations and telemetry behavior. |
| Adoption cost | 1 | Binary download and engine setup exceed a standalone skill install. |
| Compatibility | 2 | Manual-copy and plugin routes differ; host and runtime assumptions need care. |
| Upkeep | 2 | Engine, command and reference versions must remain coordinated. |

Aggregate: **incomplete — withheld**. Weights are provisional editorial choices. Expected developer benefit and burden are predictions from the artifact, not measured outcomes.

## Evidence and limits

Evidence remains **reviewed**. This pass adds no activation, installation or matched-outcome evidence. Existing records, where present, cover only the scope they describe. Host overlap is compared with the recorded catalog alternatives; this is not a fresh audit of every host release.

Previous curator notes, retained as history rather than newly verified facts: Experimental linked option requested after scouting. Entrypoint, craft/polish and launcher/context/telemetry sections reviewed; full engine, live mutation and all references remain unaudited. Default-on roll/choice telemetry; opt-out is not offline mode. Manual copy omits hooks and agents. No runtime trial.

Open inspection gaps:

- Inspect launcher/engine, required references, default telemetry and opt-out behavior before grading dependability or human control.

## Disposition and next evidence

Pending further inspection; retain with an incomplete profile. No payload, installation policy, hooks or tool connections are changed by this rating.

Resolve the named inspection gaps first. A useful next trial would compare the intended task with the named baseline, recording completion, correction effort, interruptions, comprehension and retained human control. Revisit the grades after material source/host changes or consequential failures.
