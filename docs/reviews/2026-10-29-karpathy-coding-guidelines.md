# Karpathy-style coding guidelines: human-focused assessment

Reviewed 2026-10-29 (America/Edmonton) by Codex, an AI curator. Rubric: [human-v1](../ratings.md). This is one curator’s source-based judgment, not independent human calibration or a behavioral evaluation.

Developers working on this task: You want a recognized, drop-in baseline against over-engineering and drive-by edits. Declared hosts: any.

Comparison baseline and alternatives: Largely restated by host system prompts and by focused-changes.

A short alternative policy with substantial built-in overlap; keep linked packaging and avoid stacking duplicates.

## Inspection and provenance

Pinned upstream revision: `8462496b34419f20b32778610571ac723e91f94c`. Exact file digests, source URLs, prior rating and inspection status are recorded under `karpathy-coding-guidelines` in the [assessment manifest](2026-10-29-catalog-assessment-sources.json). Linked source content was treated as data; no installer, upstream helper or integration was executed.

- [CLAUDE.md](https://raw.githubusercontent.com/multica-ai/andrej-karpathy-skills/8462496b34419f20b32778610571ac723e91f94c/CLAUDE.md) — read in full.

The grades cover the inspected core and relevant paths. Unread optional examples, adapters, licenses and conditional resources are not cleared by this assessment. Local or upstream tests were not run as behavioral evaluation.

## Grades

| Criterion | Grade (0–4) | Rationale |
| --- | ---: | --- |
| Practical value | 2 | Mostly duplicates host scope and simplicity guidance. |
| Dependability | 3 | Concrete goal checks help but generic assertions are not outcomes. |
| Cognitive ease | 2 | Frequent stop-and-ask language can impede small tasks. |
| Human control | 4 | Protects unrelated work and defers to project instructions. |
| Adoption cost | 3 | One short file, but always-loaded context has a recurring cost. |
| Compatibility | 3 | Mergeable text with fixed stylistic preferences. |
| Upkeep | 3 | Stable prose; declared MIT lacks a shipped license file. |

Aggregate: **6.9/10**. Weights are provisional editorial choices. Expected developer benefit and burden are predictions from the artifact, not measured outcomes.

## Evidence and limits

Evidence remains **reviewed**. This pass adds no activation, installation or matched-outcome evidence. Existing records, where present, cover only the scope they describe. Host overlap is compared with the recorded catalog alternatives; this is not a fresh audit of every host release.

Previous curator notes, retained as history rather than newly verified facts: Very popular, short (about 65 lines), and concrete ("every changed line should trace to the request"). Host system prompts already push most of it, and it overlaps focused-changes. Linked, not vendored, because the repository declares MIT but ships no license file.

## Disposition and next evidence

Keep for the stated use, subject to the limits below. No payload, installation policy, hooks or tool connections are changed by this rating.

A useful next trial would compare the intended task with the named baseline, recording completion, correction effort, interruptions, comprehension and retained human control. Revisit the grades after material source/host changes or consequential failures.
