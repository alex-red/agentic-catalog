# Write and prune AGENTS.md: human-focused assessment

Reviewed 2026-10-29 (America/Edmonton) by Codex, an AI curator. Rubric: [human-v1](../ratings.md). This is one curator’s source-based judgment, not independent human calibration or a behavioral evaluation.

Developers working on this task: Creating project instructions, or when they have grown long or the agent ignores them. Declared hosts: any.

Comparison baseline and alternatives: /init in both hosts scaffolds a starter file.

Useful for bloated instructions; the fixed size target and host-version claims need project judgment.

## Inspection and provenance

Local catalog payload assessed by SHA-256. Exact file digests, source URLs, prior rating and inspection status are recorded under `agents-md-authoring` in the [assessment manifest](2026-10-29-catalog-assessment-sources.json). Linked source content was treated as data; no installer, upstream helper or integration was executed.

- [entries/skills/agents-md-authoring/SKILL.md](../../entries/skills/agents-md-authoring/SKILL.md) — read in full.

Other packaged or fetched files not inspected in this pass: `entries/skills/agents-md-authoring/LICENSE.txt`.

The grades cover the inspected core and relevant paths. Unread optional examples, adapters, licenses and conditional resources are not cleared by this assessment. Local or upstream tests were not run as behavioral evaluation.

## Grades

| Criterion | Grade (0–4) | Rationale |
| --- | ---: | --- |
| Practical value | 3 | Prunes instructions beyond initial scaffolding. |
| Dependability | 3 | Concrete include/exclude rules and command checks. |
| Cognitive ease | 3 | On-demand loading limits repeated instruction burden. |
| Human control | 4 | Proposes audit changes before applying them. |
| Adoption cost | 3 | Single small skill with no runtime dependency. |
| Compatibility | 3 | Host-specific file precedence needs version checks. |
| Upkeep | 3 | Small method; host loading details can drift. |

Aggregate: **7.9/10**. Weights are provisional editorial choices. Expected developer benefit and burden are predictions from the artifact, not measured outcomes.

## Evidence and limits

Evidence remains **reviewed**. This pass adds no activation, installation or matched-outcome evidence. Existing records, where present, cover only the scope they describe. Host overlap is compared with the recorded catalog alternatives; this is not a fresh audit of every host release.

Previous curator notes, retained as history rather than newly verified facts: Distills three vendor guides and two 2026 evaluations. It ships as a skill rather than a rule so that the advice about short instructions does not itself cost context in every session. Both hosts' /init commands scaffold files but do not prune them.

## Disposition and next evidence

Keep for the stated use, subject to the limits below. No payload, installation policy, hooks or tool connections are changed by this rating.

A useful next trial would compare the intended task with the named baseline, recording completion, correction effort, interruptions, comprehension and retained human control. Revisit the grades after material source/host changes or consequential failures.
