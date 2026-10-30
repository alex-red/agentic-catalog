# Typography implementation review (Jakub Krehel): human-focused assessment

Reviewed 2026-10-29 (America/Edmonton) by Codex, an AI curator. Rubric: [human-v1](../ratings.md). This is one curator’s source-based judgment, not independent human calibration or a behavioral evaluation.

Developers working on this task: Fixing or reviewing typography implementation while preserving the project's typeface, styling system and accepted design decisions. Declared hosts: any.

Comparison baseline and alternatives: frontend-design chooses visual identity; this focuses on font and text-rendering implementation. ux-critique reviews broader usability. baseline-ui has brief typography rules but different constraints. Do not load both as competing global policies.

All six typography references inspected. Useful implementation detail; numeric floors and rendering preferences are not universal defects.

## Inspection and provenance

Pinned upstream revision: `1eb03d2b145df1c6cd84ab54a337600a2a379017`. Exact file digests, source URLs, prior rating and inspection status are recorded under `better-typography` in the [assessment manifest](2026-10-29-catalog-assessment-sources.json). Linked source content was treated as data; no installer, upstream helper or integration was executed.

- [skills/better-typography/SKILL.md](https://raw.githubusercontent.com/jakubkrehel/skills/1eb03d2b145df1c6cd84ab54a337600a2a379017/skills/better-typography/SKILL.md) — read in full.
- [skills/better-typography/css-cheat-sheet.md](https://raw.githubusercontent.com/jakubkrehel/skills/1eb03d2b145df1c6cd84ab54a337600a2a379017/skills/better-typography/css-cheat-sheet.md) — read in full.
- [skills/better-typography/choosing-fonts.md](https://raw.githubusercontent.com/jakubkrehel/skills/1eb03d2b145df1c6cd84ab54a337600a2a379017/skills/better-typography/choosing-fonts.md) — read in full.
- [skills/better-typography/variable-fonts-and-opentype.md](https://raw.githubusercontent.com/jakubkrehel/skills/1eb03d2b145df1c6cd84ab54a337600a2a379017/skills/better-typography/variable-fonts-and-opentype.md) — read in full.
- [skills/better-typography/spacing-and-sizing.md](https://raw.githubusercontent.com/jakubkrehel/skills/1eb03d2b145df1c6cd84ab54a337600a2a379017/skills/better-typography/spacing-and-sizing.md) — read in full.
- [skills/better-typography/wrapping-and-punctuation.md](https://raw.githubusercontent.com/jakubkrehel/skills/1eb03d2b145df1c6cd84ab54a337600a2a379017/skills/better-typography/wrapping-and-punctuation.md) — read in full.
- [skills/better-typography/details-and-accessibility.md](https://raw.githubusercontent.com/jakubkrehel/skills/1eb03d2b145df1c6cd84ab54a337600a2a379017/skills/better-typography/details-and-accessibility.md) — read in full.

The grades cover the inspected core and relevant paths. Unread optional examples, adapters, licenses and conditional resources are not cleared by this assessment. Local or upstream tests were not run as behavioral evaluation.

## Grades

| Criterion | Grade (0–4) | Rationale |
| --- | ---: | --- |
| Practical value | 3 | Adds text-rendering implementation detail beyond visual direction. |
| Dependability | 2 | Six references are concrete; fixed numeric findings and browser support claims need context. |
| Cognitive ease | 3 | Concrete before/after reporting helps; many rules increase review load. |
| Human control | 3 | Preserves styling system and avoids unsolicited typeface changes. |
| Adoption cost | 3 | Several references and browser/font checks are needed. |
| Compatibility | 3 | Sibling domain ownership and numeric policies limit standalone use. |
| Upkeep | 3 | Font/browser support and CSS properties change. |

Aggregate: **7.0/10**. Weights are provisional editorial choices. Expected developer benefit and burden are predictions from the artifact, not measured outcomes.

## Evidence and limits

Evidence remains **reviewed**. This pass adds no activation, installation or matched-outcome evidence. Existing records, where present, cover only the scope they describe. Host overlap is compared with the recorded catalog alternatives; this is not a fresh audit of every host release.

Previous curator notes, retained as history rather than newly verified facts: Entrypoint, all six local typography references and agent metadata reviewed. Detailed implementation guidance; numeric floors and some rendering advice remain opinionated or version-sensitive. Sibling domain ownership is disclosed. No font/browser matrix or matched outcome trial.

## Disposition and next evidence

Keep for the stated use, subject to the limits below. No payload, installation policy, hooks or tool connections are changed by this rating.

A useful next trial would compare the intended task with the named baseline, recording completion, correction effort, interruptions, comprehension and retained human control. Revisit the grades after material source/host changes or consequential failures.
