# Systematic debugging: human-focused assessment

Reviewed 2026-10-29 (America/Edmonton) by Codex, an AI curator. Rubric: [human-v1](../ratings.md). This is one curator’s source-based judgment, not independent human calibration or a behavioral evaluation.

Developers working on this task: A bug, failing test, crash, or regression needs a diagnosed fix rather than a symptom patch. Declared hosts: any.

Comparison baseline and alternatives: Default model behavior covers most ordinary bugs. A same-named skill ships in obra/superpowers; install only one.

A lightweight debugging option; recorded trigger misses on small bugs do not prove worse outcomes.

## Inspection and provenance

Local catalog payload assessed by SHA-256. Exact file digests, source URLs, prior rating and inspection status are recorded under `systematic-debugging` in the [assessment manifest](2026-10-29-catalog-assessment-sources.json). Linked source content was treated as data; no installer, upstream helper or integration was executed.

- [entries/skills/systematic-debugging/SKILL.md](../../entries/skills/systematic-debugging/SKILL.md) — read in full.
- [entries/skills/systematic-debugging/references/difficult-reproductions.md](../../entries/skills/systematic-debugging/references/difficult-reproductions.md) — read in full.

Other packaged or fetched files not inspected in this pass: `entries/skills/systematic-debugging/LICENSE.txt`.

The grades cover the inspected core and relevant paths. Unread optional examples, adapters, licenses and conditional resources are not cleared by this assessment. Local or upstream tests were not run as behavioral evaluation.

## Grades

| Criterion | Grade (0–4) | Rationale |
| --- | ---: | --- |
| Practical value | 2 | General debugging largely overlaps native behavior. |
| Dependability | 3 | Hypotheses and exact reproduction checks keep claims bounded. |
| Cognitive ease | 3 | Proportional workflow avoids hard phase gates. |
| Human control | 4 | Preserves unrelated changes and existing permissions. |
| Adoption cost | 3 | Small text skill with optional diagnostic reference. |
| Compatibility | 3 | Uses the existing project environment and tools. |
| Upkeep | 4 | Stable method and short self-contained reference. |

Aggregate: **7.4/10**. Weights are provisional editorial choices. Expected developer benefit and burden are predictions from the artifact, not measured outcomes.

## Evidence and limits

Evidence remains **tested**. This pass adds no activation, installation or matched-outcome evidence. Existing records, where present, cover only the scope they describe. Host overlap is compared with the recorded catalog alternatives; this is not a fresh audit of every host release.

- [evals/results/triggers-2026-10-20.md](../../evals/results/triggers-2026-10-20.md)
- [evals/results/triggers-sonnet-2026-10-20.md](../../evals/results/triggers-sonnet-2026-10-20.md)

Previous curator notes, retained as history rather than newly verified facts: Clear and proportional. It triggered 29/30 in the Opus sandbox suite. On Sonnet 5.5 it fired for prompts framed as regressions or diagnosis, but not for plain find-and-fix requests on small bugs, which Sonnet solved directly. Current models already debug this way on most bugs, and a same-named superpowers skill covers similar ground, so the main value is on hard reproductions.

## Disposition and next evidence

Keep for the stated use, subject to the limits below. No payload, installation policy, hooks or tool connections are changed by this rating.

A useful next trial would compare the intended task with the named baseline, recording completion, correction effort, interruptions, comprehension and retained human control. Revisit the grades after material source/host changes or consequential failures.
