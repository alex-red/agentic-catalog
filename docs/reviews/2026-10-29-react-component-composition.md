# React component composition: human-focused assessment

Reviewed 2026-10-29 (America/Edmonton) by Codex, an AI curator. Rubric: [human-v1](../ratings.md). This is one curator’s source-based judgment, not independent human calibration or a behavioral evaluation.

Developers working on this task: Designing or refactoring React APIs with interacting mode flags, duplicated state, tangled providers or behavior-sensitive component extraction. Declared hosts: any.

Comparison baseline and alternatives: react-best-practices supplies performance guidance and frontend-design supplies visual implementation. Native code review and React docs cover basic composition; this skill focuses on public contract and ownership changes that must preserve interaction and state identity.

Useful for difficult ownership/API changes; ordinary component edits rarely need the whole method.

## Inspection and provenance

Local catalog payload assessed by SHA-256. Exact file digests, source URLs, prior rating and inspection status are recorded under `react-component-composition` in the [assessment manifest](2026-10-29-catalog-assessment-sources.json). Linked source content was treated as data; no installer, upstream helper or integration was executed.

- [entries/skills/react-component-composition/SKILL.md](../../entries/skills/react-component-composition/SKILL.md) — read in full.

Other packaged or fetched files not inspected in this pass: `entries/skills/react-component-composition/LICENSE.txt`.

The grades cover the inspected core and relevant paths. Unread optional examples, adapters, licenses and conditional resources are not cleared by this assessment. Local or upstream tests were not run as behavioral evaluation.

## Grades

| Criterion | Grade (0–4) | Rationale |
| --- | ---: | --- |
| Practical value | 3 | Protects public contracts and state identity during refactors. |
| Dependability | 3 | Names controlled, provider, key and interaction failure cases. |
| Cognitive ease | 3 | Targets the problematic boundary without mandatory patterns. |
| Human control | 4 | Preserves callers, behavior and existing primitives. |
| Adoption cost | 3 | No runtime beyond the project and interaction tests. |
| Compatibility | 3 | Keeps React 18/19 and compiler choices explicit. |
| Upkeep | 3 | React API and server-boundary details need updating. |

Aggregate: **7.9/10**. Weights are provisional editorial choices. Expected developer benefit and burden are predictions from the artifact, not measured outcomes.

## Evidence and limits

Evidence remains **reviewed**. This pass adds no activation, installation or matched-outcome evidence. Existing records, where present, cover only the scope they describe. Host overlap is compared with the recorded catalog alternatives; this is not a fresh audit of every host release.

Previous curator notes, retained as history rather than newly verified facts: Independently written from official React contracts to complement existing performance guidance. Avoids mandatory context, blanket memoization and React 19-only defaults. Source reviewed; no representative behavioral or agent trigger evaluation.

## Disposition and next evidence

Keep for the stated use, subject to the limits below. No payload, installation policy, hooks or tool connections are changed by this rating.

A useful next trial would compare the intended task with the named baseline, recording completion, correction effort, interruptions, comprehension and retained human control. Revisit the grades after material source/host changes or consequential failures.
