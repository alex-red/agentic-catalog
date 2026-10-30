# Self-improvement loop: human-focused assessment

Reviewed 2026-10-29 (America/Edmonton) by Codex, an AI curator. Rubric: [human-v1](../ratings.md). This is one curator’s source-based judgment, not independent human calibration or a behavioral evaluation.

Developers working on this task: You want the agent to learn from each session and write the lessons back into the project without bloating its instructions. Declared hosts: any.

Comparison baseline and alternatives: Claude Code auto memory captures corrections, but it does not decide where a lesson belongs or prune.

Use selectively for repeat friction; related hooks remain explicit opt-in and fixed line counts are heuristics.

## Inspection and provenance

Local catalog payload assessed by SHA-256. Exact file digests, source URLs, prior rating and inspection status are recorded under `self-improvement-loop` in the [assessment manifest](2026-10-29-catalog-assessment-sources.json). Linked source content was treated as data; no installer, upstream helper or integration was executed.

- [entries/workflows/self-improvement-loop/WORKFLOW.md](../../entries/workflows/self-improvement-loop/WORKFLOW.md) — read in full.

The grades cover the inspected core and relevant paths. Unread optional examples, adapters, licenses and conditional resources are not cleared by this assessment. Local or upstream tests were not run as behavioral evaluation.

## Grades

| Criterion | Grade (0–4) | Rationale |
| --- | ---: | --- |
| Practical value | 3 | Connects capture, placement and later pruning. |
| Dependability | 3 | Loading checks are concrete; overall benefit is untested. |
| Cognitive ease | 2 | Every-session capture and fixed size thresholds can become ritual. |
| Human control | 3 | Mentions hooks but does not restate activation boundaries clearly. |
| Adoption cost | 2 | Fresh sessions and checks add recurring effort. |
| Compatibility | 3 | Equivalent tools allowed, but document conventions are prescribed. |
| Upkeep | 4 | Small standalone workflow with optional comparisons. |

Aggregate: **7.0/10**. Weights are provisional editorial choices. Expected developer benefit and burden are predictions from the artifact, not measured outcomes.

## Evidence and limits

Evidence remains **reviewed**. This pass adds no activation, installation or matched-outcome evidence. Existing records, where present, cover only the scope they describe. Host overlap is compared with the recorded catalog alternatives; this is not a fresh audit of every host release.

Previous curator notes, retained as history rather than newly verified facts: The placement table comes from a pilot finding here (decision 8). Skills fired reliably, but a fact needed after a change belongs in always-loaded text. The pruning step answers 2026 evidence that long context files reduce success. The loop as a whole has not been evaluated.

## Disposition and next evidence

Keep for the stated use, subject to the limits below. No payload, installation policy, hooks or tool connections are changed by this rating.

A useful next trial would compare the intended task with the named baseline, recording completion, correction effort, interruptions, comprehension and retained human control. Revisit the grades after material source/host changes or consequential failures.
