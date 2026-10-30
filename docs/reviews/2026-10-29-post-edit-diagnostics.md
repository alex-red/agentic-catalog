# Run fast diagnostics after source edits: human-focused assessment

Reviewed 2026-10-29 (America/Edmonton) by Codex, an AI curator. Rubric: [human-v1](../ratings.md). This is one curator’s source-based judgment, not independent human calibration or a behavioral evaluation.

Developers working on this task: Type errors or lint diagnostics should reach the agent immediately after source edits, and the project has a fast read-only check. Declared hosts: claude-code, codex.

Comparison baseline and alternatives: format-after-edit normalizes style; this reports diagnostics without fixing files. stop-gate-checks checks completion. Avoid duplicate expensive checks across both gates.

Choose a genuinely fast checker; exit-2 feedback after an edit must not be mistaken for rollback.

## Inspection and provenance

Local catalog payload assessed by SHA-256. Exact file digests, source URLs, prior rating and inspection status are recorded under `post-edit-diagnostics` in the [assessment manifest](2026-10-29-catalog-assessment-sources.json). Linked source content was treated as data; no installer, upstream helper or integration was executed.

- [entries/hooks/post-edit-diagnostics/HOOK.md](../../entries/hooks/post-edit-diagnostics/HOOK.md) — read in full.
- [entries/hooks/post-edit-diagnostics/check.py](../../entries/hooks/post-edit-diagnostics/check.py) — read in full.
- [entries/hooks/post-edit-diagnostics/codex-hooks.example.json](../../entries/hooks/post-edit-diagnostics/codex-hooks.example.json) — read in full.
- [entries/hooks/post-edit-diagnostics/command.json](../../entries/hooks/post-edit-diagnostics/command.json) — read in full.
- [entries/hooks/post-edit-diagnostics/settings.example.json](../../entries/hooks/post-edit-diagnostics/settings.example.json) — read in full.

The grades cover the inspected core and relevant paths. Unread optional examples, adapters, licenses and conditional resources are not cleared by this assessment. Local or upstream tests were not run as behavioral evaluation.

## Grades

| Criterion | Grade (0–4) | Rationale |
| --- | ---: | --- |
| Practical value | 3 | Moves relevant diagnostics earlier than completion checks. |
| Dependability | 3 | Deadline and bounded output make failures visible. |
| Cognitive ease | 3 | One selected checker helps; per-edit waits can break flow. |
| Human control | 3 | No rollback; configured checker output can expose data. |
| Adoption cost | 3 | Needs Python, command configuration and installed checker. |
| Compatibility | 3 | Only documented extensions/edit routes are covered. |
| Upkeep | 3 | Host adapters and checker runtime must be kept current. |

Aggregate: **7.5/10**. Weights are provisional editorial choices. Expected developer benefit and burden are predictions from the artifact, not measured outcomes.

## Evidence and limits

Evidence remains **reviewed**. This pass adds no activation, installation or matched-outcome evidence. Existing records, where present, cover only the scope they describe. Host overlap is compared with the recorded catalog alternatives; this is not a fresh audit of every host release.

Previous curator notes, retained as history rather than newly verified facts: Claude Edit/Write paths and Codex apply_patch Add/Update/Move headers select one checker run. Codex paths resolve from event cwd, checker runs at installed project root. Argument arrays and a 20-second deadline; no edit rollback. Requires Python 3.9+ and installed tools. No host invocation evaluation.

## Disposition and next evidence

Keep for the stated use, subject to the limits below. No payload, installation policy, hooks or tool connections are changed by this rating.

A useful next trial would compare the intended task with the named baseline, recording completion, correction effort, interruptions, comprehension and retained human control. Revisit the grades after material source/host changes or consequential failures.
