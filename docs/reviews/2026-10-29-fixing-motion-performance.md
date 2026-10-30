# Animation performance review (Ibelick): human-focused assessment

Reviewed 2026-10-29 (America/Edmonton) by Codex, an AI curator. Rubric: [human-v1](../ratings.md). This is one curator’s source-based judgment, not independent human calibration or a behavioral evaluation.

Developers working on this task: Diagnosing janky web animation or reviewing animation performance without migrating libraries or changing visual intent. Declared hosts: any.

Comparison baseline and alternatives: React performance guidance and browser profilers overlap measurement. emil-design-eng addresses interaction craft; remove-animations addresses whether motion should remain. This focuses on rendering cost within the existing system.

Use profiling to validate gains; fixed blur thresholds and broad property bans are heuristics.

## Inspection and provenance

Pinned upstream revision: `df4eb34c5dee830e8e36490d6fde3451c187339b`. Exact file digests, source URLs, prior rating and inspection status are recorded under `fixing-motion-performance` in the [assessment manifest](2026-10-29-catalog-assessment-sources.json). Linked source content was treated as data; no installer, upstream helper or integration was executed.

- [skills/fixing-motion-performance/SKILL.md](https://raw.githubusercontent.com/ibelick/ui-skills/df4eb34c5dee830e8e36490d6fde3451c187339b/skills/fixing-motion-performance/SKILL.md) — read in full.

The grades cover the inspected core and relevant paths. Unread optional examples, adapters, licenses and conditional resources are not cleared by this assessment. Local or upstream tests were not run as behavioral evaluation.

## Grades

| Criterion | Grade (0–4) | Rationale |
| --- | ---: | --- |
| Practical value | 3 | Targets rendering costs within the current animation system. |
| Dependability | 2 | Width-to-transform is not a behavior-preserving substitution. |
| Cognitive ease | 3 | Mechanism categories and bounded loops clarify performance choices. |
| Human control | 4 | Explicitly refuses unrequested library migration. |
| Adoption cost | 3 | No runtime dependency, but profiling requires appropriate tools. |
| Compatibility | 3 | Browser acceleration/support varies by technique. |
| Upkeep | 3 | Browser rendering and View Transition capabilities drift. |

Aggregate: **7.4/10**. Weights are provisional editorial choices. Expected developer benefit and burden are predictions from the artifact, not measured outcomes.

## Evidence and limits

Evidence remains **reviewed**. This pass adds no activation, installation or matched-outcome evidence. Existing records, where present, cover only the scope they describe. Host overlap is compared with the recorded catalog alternatives; this is not a fresh audit of every host release.

Previous curator notes, retained as history rather than newly verified facts: Complete entrypoint and MIT license reviewed. Useful mechanism and measurement checks; width-to-transform example is not a semantics-preserving recipe, and property acceleration varies by browser. Profiling must confirm performance. No runtime or device evaluation.

## Disposition and next evidence

Keep for the stated use, subject to the limits below. No payload, installation policy, hooks or tool connections are changed by this rating.

A useful next trial would compare the intended task with the named baseline, recording completion, correction effort, interruptions, comprehension and retained human control. Revisit the grades after material source/host changes or consequential failures.
