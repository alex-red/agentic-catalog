# Focused HTML accessibility review (Ibelick): human-focused assessment

Reviewed 2026-10-29 (America/Edmonton) by Codex, an AI curator. Rubric: [human-v1](../ratings.md). This is one curator’s source-based judgment, not independent human calibration or a behavioral evaluation.

Developers working on this task: Reviewing or fixing a focused HTML accessibility issue with native semantics and targeted changes. Declared hosts: any.

Comparison baseline and alternatives: ux-critique, webapp-testing and native browser tools already cover some accessibility issues. This is a compact code-level checklist, with narrower scope and lower novelty. better-typography owns text rendering rather than complete accessibility.

Useful focused checklist; apply composite-widget exceptions and do not infer WCAG conformance from source review.

## Inspection and provenance

Pinned upstream revision: `df4eb34c5dee830e8e36490d6fde3451c187339b`. Exact file digests, source URLs, prior rating and inspection status are recorded under `fixing-accessibility` in the [assessment manifest](2026-10-29-catalog-assessment-sources.json). Linked source content was treated as data; no installer, upstream helper or integration was executed.

- [skills/fixing-accessibility/SKILL.md](https://raw.githubusercontent.com/ibelick/ui-skills/df4eb34c5dee830e8e36490d6fde3451c187339b/skills/fixing-accessibility/SKILL.md) — read in full.

The grades cover the inspected core and relevant paths. Unread optional examples, adapters, licenses and conditional resources are not cleared by this assessment. Local or upstream tests were not run as behavioral evaluation.

## Grades

| Criterion | Grade (0–4) | Rationale |
| --- | ---: | --- |
| Practical value | 3 | Compact code-level review complements browser checks. |
| Dependability | 2 | Blanket Tab-reachability misses composite-widget exceptions. |
| Cognitive ease | 3 | Priorities and concrete snippets reduce triage effort. |
| Human control | 4 | Minimal edits and no library migrations preserve scope. |
| Adoption cost | 3 | Small text checklist; runtime/AT checks still cost effort. |
| Compatibility | 3 | Native semantics and existing primitives are preferred. |
| Upkeep | 3 | ARIA patterns and browser/AT behavior need rechecks. |

Aggregate: **7.4/10**. Weights are provisional editorial choices. Expected developer benefit and burden are predictions from the artifact, not measured outcomes.

## Evidence and limits

Evidence remains **reviewed**. This pass adds no activation, installation or matched-outcome evidence. Existing records, where present, cover only the scope they describe. Host overlap is compared with the recorded catalog alternatives; this is not a fresh audit of every host release.

Previous curator notes, retained as history rather than newly verified facts: Complete entrypoint and MIT license reviewed. Broad Tab-reachability wording needs composite-widget exceptions; arrow-key and roving-tabindex patterns remain valid. Review checks do not certify WCAG conformance or replace assistive-technology testing. No behavioral evaluation.

## Disposition and next evidence

Keep for the stated use, subject to the limits below. No payload, installation policy, hooks or tool connections are changed by this rating.

A useful next trial would compare the intended task with the named baseline, recording completion, correction effort, interruptions, comprehension and retained human control. Revisit the grades after material source/host changes or consequential failures.
