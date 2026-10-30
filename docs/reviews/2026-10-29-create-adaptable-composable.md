# Adaptable Vue composables: human-focused assessment

Reviewed 2026-10-29 (America/Edmonton) by Codex, an AI curator. Rubric: [human-v1](../ratings.md). This is one curator’s source-based judgment, not independent human calibration or a behavioral evaluation.

Developers working on this task: Writing or refactoring a reusable Vue 3 composable whose inputs may be plain values, refs, or getters. Declared hosts: any.

Comparison baseline and alternatives: The Vue reactivity docs cover the same APIs, and host-installed Vue skills may include similar guidance. Check for those first.

Useful for library-style composables; often redundant with installed Vue guidance.

## Inspection and provenance

Pinned upstream revision: `3b0d2ce9fb473d27117670e75985b1cdffc46ff3`. Exact file digests, source URLs, prior rating and inspection status are recorded under `create-adaptable-composable` in the [assessment manifest](2026-10-29-catalog-assessment-sources.json). Linked source content was treated as data; no installer, upstream helper or integration was executed.

- [entries/skills/create-adaptable-composable/SKILL.md](../../entries/skills/create-adaptable-composable/SKILL.md) — read in full.

Other packaged or fetched files not inspected in this pass: `entries/skills/create-adaptable-composable/LICENSE.txt`.

The grades cover the inspected core and relevant paths. Unread optional examples, adapters, licenses and conditional resources are not cleared by this assessment. Local or upstream tests were not run as behavioral evaluation.

## Grades

| Criterion | Grade (0–4) | Rationale |
| --- | ---: | --- |
| Practical value | 3 | Targets callback/getter confusion in reusable composables. |
| Dependability | 3 | Examples distinguish writable and read-only normalization. |
| Cognitive ease | 3 | Small API policy reduces input-shape decisions. |
| Human control | 4 | No automatic setup or policy replacement. |
| Adoption cost | 3 | One short file; requires Vue API familiarity. |
| Compatibility | 3 | Narrow Vue-version and existing-skill fit. |
| Upkeep | 3 | Reactivity API assumptions need periodic checking. |

Aggregate: **7.9/10**. Weights are provisional editorial choices. Expected developer benefit and burden are predictions from the artifact, not measured outcomes.

## Evidence and limits

Evidence remains **reviewed**. This pass adds no activation, installation or matched-outcome evidence. Existing records, where present, cover only the scope they describe. Host overlap is compared with the recorded catalog alternatives; this is not a fresh audit of every host release.

Previous curator notes, retained as history rather than newly verified facts: Small, correct, and specific; the callback-versus-getter warning is the most useful line. Useful mainly for library-style composables. The same source's Vue testing skill was passed over because several examples are stale (the msw v1 API and Vitest's removed poolOptions).

## Disposition and next evidence

Keep for the stated use, subject to the limits below. No payload, installation policy, hooks or tool connections are changed by this rating.

A useful next trial would compare the intended task with the named baseline, recording completion, correction effort, interruptions, comprehension and retained human control. Revisit the grades after material source/host changes or consequential failures.
