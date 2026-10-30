# Restore a small compaction note: human-focused assessment

Reviewed 2026-10-29 (America/Edmonton) by Codex, an AI curator. Rubric: [human-v1](../ratings.md). This is one curator’s source-based judgment, not independent human calibration or a behavioral evaluation.

Developers working on this task: Compaction repeatedly loses a few critical details that are not already covered by loaded project instructions. Declared hosts: claude-code, codex.

Comparison baseline and alternatives: CLAUDE.md, auto memory and compaction already preserve context. Use only for demonstrated gaps; handoff and retrospective provide broader state and instruction workflows.

Use only for observed compaction gaps; stale duplicated notes can worsen context quality.

## Inspection and provenance

Local catalog payload assessed by SHA-256. Exact file digests, source URLs, prior rating and inspection status are recorded under `compact-context` in the [assessment manifest](2026-10-29-catalog-assessment-sources.json). Linked source content was treated as data; no installer, upstream helper or integration was executed.

- [entries/hooks/compact-context/HOOK.md](../../entries/hooks/compact-context/HOOK.md) — read in full.
- [entries/hooks/compact-context/codex-hooks.example.json](../../entries/hooks/compact-context/codex-hooks.example.json) — read in full.
- [entries/hooks/compact-context/restore.py](../../entries/hooks/compact-context/restore.py) — read in full.
- [entries/hooks/compact-context/settings.example.json](../../entries/hooks/compact-context/settings.example.json) — read in full.

The grades cover the inspected core and relevant paths. Unread optional examples, adapters, licenses and conditional resources are not cleared by this assessment. Local or upstream tests were not run as behavioral evaluation.

## Grades

| Criterion | Grade (0–4) | Rationale |
| --- | ---: | --- |
| Practical value | 2 | Adds value only for demonstrated post-compaction loss. |
| Dependability | 2 | Bounds note size/path, but cannot ensure freshness or delivery. |
| Cognitive ease | 3 | Small note helps recall but creates another maintenance surface. |
| Human control | 3 | Read-only handler, explicit maintained context and simple disablement. |
| Adoption cost | 3 | Python and trusted project-local hook registration required. |
| Compatibility | 3 | Claude/Codex layouts and Git roots constrain use. |
| Upkeep | 3 | Note freshness and host event contracts require maintenance. |

Aggregate: **6.4/10**. Weights are provisional editorial choices. Expected developer benefit and burden are predictions from the artifact, not measured outcomes.

## Evidence and limits

Evidence remains **reviewed**. This pass adds no activation, installation or matched-outcome evidence. Existing records, where present, cover only the scope they describe. Host overlap is compared with the recorded catalog alternatives; this is not a fresh audit of every host release.

Previous curator notes, retained as history rather than newly verified facts: Claude reads CLAUDE_PROJECT_DIR; the Codex adapter infers the project from its .codex/hooks installation and reads .codex/compact-context.md. Bounded to 6000 UTF-8 bytes. Missing/oversize/outside-root notes are not loaded. Source-level fixtures only; host invocation remains unverified.

## Disposition and next evidence

Keep for the stated use, subject to the limits below. No payload, installation policy, hooks or tool connections are changed by this rating.

A useful next trial would compare the intended task with the named baseline, recording completion, correction effort, interruptions, comprehension and retained human control. Revisit the grades after material source/host changes or consequential failures.
