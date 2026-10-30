# Domain vocabulary and decision records: human-focused assessment

Reviewed 2026-10-29 (America/Edmonton) by Codex, an AI curator. Rubric: [human-v1](../ratings.md). This is one curator’s source-based judgment, not independent human calibration or a behavioral evaluation.

Developers working on this task: Discussing ambiguous codebase terminology, maintaining a domain glossary, or recording the reasoning behind a consequential architecture decision. Declared hosts: any.

Comparison baseline and alternatives: Ordinary model behavior covers terminology clarification and drafting ADRs. grilling interviews design decisions, handoff preserves session context, and explore-plan-implement-review organizes implementation; none specifically maintains canonical domain language against the code. Check for an existing host or project glossary skill before installing another.

Useful where terminology drifts; prescribed files and immediate writes must yield to existing project practice.

## Inspection and provenance

Pinned upstream revision: `d80fa0f4ebe0c5714af0adf8670336065233ecc6`. Exact file digests, source URLs, prior rating and inspection status are recorded under `domain-modeling` in the [assessment manifest](2026-10-29-catalog-assessment-sources.json). Linked source content was treated as data; no installer, upstream helper or integration was executed.

- [entries/skills/domain-modeling/ADR-FORMAT.md](../../entries/skills/domain-modeling/ADR-FORMAT.md) — read in full.
- [entries/skills/domain-modeling/GLOSSARY-FORMAT.md](../../entries/skills/domain-modeling/GLOSSARY-FORMAT.md) — read in full.
- [entries/skills/domain-modeling/SKILL.md](../../entries/skills/domain-modeling/SKILL.md) — read in full.

Other packaged or fetched files not inspected in this pass: `entries/skills/domain-modeling/LICENSE.txt`, `entries/skills/domain-modeling/agents/openai.yaml`.

The grades cover the inspected core and relevant paths. Unread optional examples, adapters, licenses and conditional resources are not cleared by this assessment. Local or upstream tests were not run as behavioral evaluation.

## Grades

| Criterion | Grade (0–4) | Rationale |
| --- | ---: | --- |
| Practical value | 3 | Maintains terminology against code rather than drafting a glossary once. |
| Dependability | 3 | Concrete scenario checks and sparse ADR criteria. |
| Cognitive ease | 3 | Captures decisions immediately instead of reconstructing them. |
| Human control | 2 | Inline writes and prescribed paths need project authorization. |
| Adoption cost | 3 | A few text formats; no runtime. |
| Compatibility | 3 | Fixed glossary/ADR locations may conflict with conventions. |
| Upkeep | 4 | Small stable document formats with no tool dependency. |

Aggregate: **7.3/10**. Weights are provisional editorial choices. Expected developer benefit and burden are predictions from the artifact, not measured outcomes.

## Evidence and limits

Evidence remains **reviewed**. This pass adds no activation, installation or matched-outcome evidence. Existing records, where present, cover only the scope they describe. Host overlap is compared with the recorded catalog alternatives; this is not a fresh audit of every host release.

Previous curator notes, retained as history rather than newly verified facts: Small and complete, with concrete terminology checks and a useful threshold for offering ADRs. Ordinary models can already write glossaries and decision notes; the value is the ongoing discipline. It writes resolved terms inline and prescribes GLOSSARY.md and docs/adr/ conventions, which must yield to the consumer project's existing guidance. No trigger or outcome evaluation has been run.

## Disposition and next evidence

Keep for the stated use, subject to the limits below. No payload, installation policy, hooks or tool connections are changed by this rating.

A useful next trial would compare the intended task with the named baseline, recording completion, correction effort, interruptions, comprehension and retained human control. Revisit the grades after material source/host changes or consequential failures.
