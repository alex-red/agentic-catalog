# Ralph loop: human-focused assessment

Reviewed 2026-10-29 (America/Edmonton) by Codex, an AI curator. Rubric: [human-v1](../ratings.md). This is one curator’s source-based judgment, not independent human calibration or a behavioral evaluation.

Developers working on this task: You have clear specs and a strong test suite and want long, unattended greenfield or backlog work in a sandbox. Declared hosts: any.

Comparison baseline and alternatives: Claude Code /goal and /loop, Codex /goal, and the ralph-loop plugin for Claude Code.

Only for explicitly authorized sandboxed iteration with strong checks; no whole-loop outcome claim.

## Inspection and provenance

Local catalog payload assessed by SHA-256. Exact file digests, source URLs, prior rating and inspection status are recorded under `ralph-loop` in the [assessment manifest](2026-10-29-catalog-assessment-sources.json). Linked source content was treated as data; no installer, upstream helper or integration was executed.

- [entries/workflows/ralph-loop/WORKFLOW.md](../../entries/workflows/ralph-loop/WORKFLOW.md) — read in full.

The grades cover the inspected core and relevant paths. Unread optional examples, adapters, licenses and conditional resources are not cleared by this assessment. Local or upstream tests were not run as behavioral evaluation.

## Grades

| Criterion | Grade (0–4) | Rationale |
| --- | ---: | --- |
| Practical value | 3 | Fresh-session outer loop differs from in-session goals. |
| Dependability | 2 | Iteration cap helps; substring completion can stop prematurely. |
| Cognitive ease | 2 | Plan files reduce context drift but require supervision. |
| Human control | 2 | Repeated acceptEdits sessions and commits need careful scope. |
| Adoption cost | 2 | Multiple agent runs, tests and disposable checkouts cost money. |
| Compatibility | 2 | Requires prescribed files, shell and CLI behavior. |
| Upkeep | 3 | Host CLI flags and completion conventions can drift. |

Aggregate: **5.8/10**. Weights are provisional editorial choices. Expected developer benefit and burden are predictions from the artifact, not measured outcomes.

## Evidence and limits

Evidence remains **reviewed**. This pass adds no activation, installation or matched-outcome evidence. Existing records, where present, cover only the scope they describe. Host overlap is compared with the recorded catalog alternatives; this is not a fresh audit of every host release.

Previous curator notes, retained as history rather than newly verified facts: An influential, simple, host-neutral technique. It works only with strong tests and a cap, and it is risky on existing codebases. The built-in /goal and /loop commands now cover the in-session variant, so the value here is the fresh-context outer loop and the plan-file discipline.

## Disposition and next evidence

Keep for the stated use, subject to the limits below. No payload, installation policy, hooks or tool connections are changed by this rating.

A useful next trial would compare the intended task with the named baseline, recording completion, correction effort, interruptions, comprehension and retained human control. Revisit the grades after material source/host changes or consequential failures.
