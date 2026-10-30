# Limit subagent calls per session: human-focused assessment

Reviewed 2026-10-29 (America/Edmonton) by Codex, an AI curator. Rubric: [human-v1](../ratings.md). This is one curator’s source-based judgment, not independent human calibration or a behavioral evaluation.

Developers working on this task: A workflow needs a small explicit limit on subagent call attempts to prevent runaway fan-out. Declared hosts: claude-code, codex.

Comparison baseline and alternatives: Native concurrency/depth controls limit simultaneous agents; this limits total attempts for an event session ID. Does not authorize delegation or override existing approvals.

Counts admitted attempts, not tokens, concurrent agents or nested global fan-out; Codex host failures may proceed.

## Inspection and provenance

Local catalog payload assessed by SHA-256. Exact file digests, source URLs, prior rating and inspection status are recorded under `subagent-budget` in the [assessment manifest](2026-10-29-catalog-assessment-sources.json). Linked source content was treated as data; no installer, upstream helper or integration was executed.

- [entries/hooks/subagent-budget/HOOK.md](../../entries/hooks/subagent-budget/HOOK.md) — read in full.
- [entries/hooks/subagent-budget/budget.py](../../entries/hooks/subagent-budget/budget.py) — read in full.
- [entries/hooks/subagent-budget/codex-hooks.example.json](../../entries/hooks/subagent-budget/codex-hooks.example.json) — read in full.
- [entries/hooks/subagent-budget/settings.example.json](../../entries/hooks/subagent-budget/settings.example.json) — read in full.

The grades cover the inspected core and relevant paths. Unread optional examples, adapters, licenses and conditional resources are not cleared by this assessment. Local or upstream tests were not run as behavioral evaluation.

## Grades

| Criterion | Grade (0–4) | Rationale |
| --- | ---: | --- |
| Practical value | 3 | Adds total-attempt limits beyond concurrency controls. |
| Dependability | 3 | SQLite reservations serialize attempts; bypass paths remain. |
| Cognitive ease | 3 | Clear denial helps budgeting but failed attempts still consume quota. |
| Human control | 3 | Never grants ordinary approval or authorizes delegation. |
| Adoption cost | 2 | Persistent local SQLite state and explicit cleanup required. |
| Compatibility | 3 | Session IDs and host timeout contracts limit guarantees. |
| Upkeep | 3 | State lifecycle and local hook paths require upkeep. |

Aggregate: **7.3/10**. Weights are provisional editorial choices. Expected developer benefit and burden are predictions from the artifact, not measured outcomes.

## Evidence and limits

Evidence remains **reviewed**. This pass adds no activation, installation or matched-outcome evidence. Existing records, where present, cover only the scope they describe. Host overlap is compared with the recorded catalog alternatives; this is not a fresh audit of every host release.

Previous curator notes, retained as history rather than newly verified facts: Atomic SQLite attempt reservations for Claude Agent/Task and Codex spawn_agent. Keeps harness session-ID namespaces separate; later tool failure/denial still consumes a reservation. Codex errors/timeouts are not guaranteed fail-closed by the documented handler contract. No billing or global nested-agent guarantee.

## Disposition and next evidence

Keep for the stated use, subject to the limits below. No payload, installation policy, hooks or tool connections are changed by this rating.

A useful next trial would compare the intended task with the named baseline, recording completion, correction effort, interruptions, comprehension and retained human control. Revisit the grades after material source/host changes or consequential failures.
