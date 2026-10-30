# Improvement loop (house prompt): human-focused assessment

Reviewed 2026-10-29 (America/Edmonton) by Codex, an AI curator. Rubric: [human-v1](../ratings.md). This is one curator’s source-based judgment, not independent human calibration or a behavioral evaluation.

Developers working on this task: You want a deliberate, plan-first improvement pass after a piece of work, ending in tooling changes you approve and can verify. Declared hosts: any.

Comparison baseline and alternatives: The retrospective skill covers the same moment, with deeper guidance on where instructions load and on skill trigger checks, and it triggers on its own. This one is plan-first and focuses on tooling changes. Use one per session.

A deliberate tooling-improvement option; use one retrospective method per session and avoid ritual for minor fixes.

## Inspection and provenance

Local catalog payload assessed by SHA-256. Exact file digests, source URLs, prior rating and inspection status are recorded under `improvement-loop` in the [assessment manifest](2026-10-29-catalog-assessment-sources.json). Linked source content was treated as data; no installer, upstream helper or integration was executed.

- [entries/skills/improvement-loop/SKILL.md](../../entries/skills/improvement-loop/SKILL.md) — read in full.

Other packaged or fetched files not inspected in this pass: `entries/skills/improvement-loop/LICENSE.txt`.

The grades cover the inspected core and relevant paths. Unread optional examples, adapters, licenses and conditional resources are not cleared by this assessment. Local or upstream tests were not run as behavioral evaluation.

## Grades

| Criterion | Grade (0–4) | Rationale |
| --- | ---: | --- |
| Practical value | 3 | Turns observed friction into prioritized tooling changes. |
| Dependability | 3 | Done-when checks and before/after replay bound claims. |
| Cognitive ease | 3 | Root-cause tables help, but seven phases add ceremony. |
| Human control | 4 | Explicit invocation and plan approval protect scope. |
| Adoption cost | 2 | Implementation plus approval rounds can be expensive. |
| Compatibility | 3 | Reuses existing tools, but mandatory approval can duplicate workflow. |
| Upkeep | 4 | Self-contained method without a runtime. |

Aggregate: **7.8/10**. Weights are provisional editorial choices. Expected developer benefit and burden are predictions from the artifact, not measured outcomes.

## Evidence and limits

Evidence remains **reviewed**. This pass adds no activation, installation or matched-outcome evidence. Existing records, where present, cover only the scope they describe. Host overlap is compared with the recorded catalog alternatives; this is not a fresh audit of every host release.

Previous curator notes, retained as history rather than newly verified facts: Grew from the hand-pasted prompt that the retrospective skill also came from, expanded with root-cause classification, items with done-when checks, payoff-based prioritization, an approval gate before changes, and before/after verification. Its stance on tooling quality is distinctive. Unmeasured; it runs only when invoked, so it does not compete with retrospective for triggers.

## Disposition and next evidence

Keep for the stated use, subject to the limits below. No payload, installation policy, hooks or tool connections are changed by this rating.

A useful next trial would compare the intended task with the named baseline, recording completion, correction effort, interruptions, comprehension and retained human control. Revisit the grades after material source/host changes or consequential failures.
