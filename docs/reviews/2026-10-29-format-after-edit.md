# Format after agent edits: human-focused assessment

Reviewed 2026-10-29 (America/Edmonton) by Codex, an AI curator. Rubric: [human-v1](../ratings.md). This is one curator’s source-based judgment, not independent human calibration or a behavioral evaluation.

Developers working on this task: The project has a formatter, and agents leave style drift or spend turns fixing formatting. Declared hosts: claude-code, codex.

Comparison baseline and alternatives: Editor save hooks and pre-commit formatters overlap. This adds formatting immediately after supported agent edits; skip duplicate tooling when it already suffices.

Useful where formatter feedback is late; avoid duplicate editor/pre-commit work and test the actual client.

## Inspection and provenance

Local catalog payload assessed by SHA-256. Exact file digests, source URLs, prior rating and inspection status are recorded under `format-after-edit` in the [assessment manifest](2026-10-29-catalog-assessment-sources.json). Linked source content was treated as data; no installer, upstream helper or integration was executed.

- [entries/hooks/format-after-edit/HOOK.md](../../entries/hooks/format-after-edit/HOOK.md) — read in full.
- [entries/hooks/format-after-edit/codex-hooks.example.json](../../entries/hooks/format-after-edit/codex-hooks.example.json) — read in full.
- [entries/hooks/format-after-edit/format.py](../../entries/hooks/format-after-edit/format.py) — read in full.
- [entries/hooks/format-after-edit/settings.example.json](../../entries/hooks/format-after-edit/settings.example.json) — read in full.

The grades cover the inspected core and relevant paths. Unread optional examples, adapters, licenses and conditional resources are not cleared by this assessment. Local or upstream tests were not run as behavioral evaluation.

## Grades

| Criterion | Grade (0–4) | Rationale |
| --- | ---: | --- |
| Practical value | 3 | Closes formatting drift immediately after supported agent edits. |
| Dependability | 3 | Explicit paths and argument arrays avoid broad dirty-tree edits. |
| Cognitive ease | 3 | Automation saves turns but repeated formatting can distract. |
| Human control | 3 | Changes files after edits; failure has no rollback. |
| Adoption cost | 3 | Requires Python and a project-local formatter. |
| Compatibility | 3 | Configured root and edit-tool coverage need alignment. |
| Upkeep | 3 | Small adapter plus formatter/host version assumptions. |

Aggregate: **7.5/10**. Weights are provisional editorial choices. Expected developer benefit and burden are predictions from the artifact, not measured outcomes.

## Evidence and limits

Evidence remains **reviewed**. This pass adds no activation, installation or matched-outcome evidence. Existing records, where present, cover only the scope they describe. Host overlap is compared with the recorded catalog alternatives; this is not a fresh audit of every host release.

Previous curator notes, retained as history rather than newly verified facts: Independent Python implementation of the documented formatting pattern, refreshed for explicit path handling. Scratch checks cover spaces, quotes, leading dashes and new patch files. Requires a locally installed formatter. No host behavior or matched outcome evaluation.

## Disposition and next evidence

Keep for the stated use, subject to the limits below. No payload, installation policy, hooks or tool connections are changed by this rating.

A useful next trial would compare the intended task with the named baseline, recording completion, correction effort, interruptions, comprehension and retained human control. Revisit the grades after material source/host changes or consequential failures.
