# Harness experiment loop: human-focused assessment

Reviewed 2026-10-29 (America/Edmonton) by Codex, an AI curator. Rubric: [human-v1](../ratings.md). This is one curator’s source-based judgment, not independent human calibration or a behavioral evaluation.

Developers working on this task: Deciding whether a change to agent guidance addresses an observed recurring failure before making that guidance persistent. Declared hosts: any.

Comparison baseline and alternatives: retrospective identifies lessons and placement; improvement-loop implements process fixes; self-improvement-loop already suggests comparisons. This workflow specifies isolation, candidate hypotheses, execution contrasts, composed replay and baseline retention. Host sessions and evaluation tools supply execution, not evidence that guidance helps. ralph-loop repeats product work toward completion instead of comparing harness changes.

Strong for guidance maintainers; cost and replayability make it excessive for ordinary product edits.

## Inspection and provenance

Local catalog payload assessed by SHA-256. Exact file digests, source URLs, prior rating and inspection status are recorded under `harness-experiment-loop` in the [assessment manifest](2026-10-29-catalog-assessment-sources.json). Linked source content was treated as data; no installer, upstream helper or integration was executed.

- [entries/workflows/harness-experiment-loop/WORKFLOW.md](../../entries/workflows/harness-experiment-loop/WORKFLOW.md) — read in full.

Other packaged or fetched files not inspected in this pass: `entries/workflows/harness-experiment-loop/LICENSE.txt`.

The grades cover the inspected core and relevant paths. Unread optional examples, adapters, licenses and conditional resources are not cleared by this assessment. Local or upstream tests were not run as behavioral evaluation.

## Grades

| Criterion | Grade (0–4) | Rationale |
| --- | ---: | --- |
| Practical value | 4 | Adds controlled baseline/candidate comparison beyond retrospection. |
| Dependability | 3 | Preserves confounders, failures, hidden boundaries and transfer limits. |
| Cognitive ease | 3 | Comparison structure is useful but operationally demanding. |
| Human control | 4 | Budgets, unchanged baseline and external-state boundaries are explicit. |
| Adoption cost | 2 | Full round requires four solver runs plus preparation. |
| Compatibility | 3 | Uses available runners without adding a framework. |
| Upkeep | 4 | Stable method with no executable dependency. |

Aggregate: **8.4/10**. Weights are provisional editorial choices. Expected developer benefit and burden are predictions from the artifact, not measured outcomes.

## Evidence and limits

Evidence remains **reviewed**. This pass adds no activation, installation or matched-outcome evidence. Existing records, where present, cover only the scope they describe. Host overlap is compared with the recorded catalog alternatives; this is not a fresh audit of every host release.

Previous curator notes, retained as history rather than newly verified facts: Focused procedure for guidance maintainers rather than routine feature work. Preserves baseline fallback, isolates solver context, records confounders and separates adoption from transfer. Requires replayable inputs and fresh sessions; a full round costs four solver runs plus editing and reflection. Source review and repository checks do not establish behavioral benefit. No matched outcome evaluation performed.

## Disposition and next evidence

Keep for the stated use, subject to the limits below. No payload, installation policy, hooks or tool connections are changed by this rating.

A useful next trial would compare the intended task with the named baseline, recording completion, correction effort, interruptions, comprehension and retained human control. Revisit the grades after material source/host changes or consequential failures.
