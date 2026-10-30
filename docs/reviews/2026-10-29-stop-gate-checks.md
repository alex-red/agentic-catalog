# Block "done" until checks pass: human-focused assessment

Reviewed 2026-10-29 (America/Edmonton) by Codex, an AI curator. Rubric: [human-v1](../ratings.md). This is one curator’s source-based judgment, not independent human calibration or a behavioral evaluation.

Developers working on this task: Agents end turns with failing checks, or unattended sessions must not finish red. Declared hosts: claude-code, codex.

Comparison baseline and alternatives: The /goal command in Claude Code and Codex; CI.

A bounded reminder, not an invariant that checks pass; whole-tree dirtiness is not turn ownership.

## Inspection and provenance

Local catalog payload assessed by SHA-256. Exact file digests, source URLs, prior rating and inspection status are recorded under `stop-gate-checks` in the [assessment manifest](2026-10-29-catalog-assessment-sources.json). Linked source content was treated as data; no installer, upstream helper or integration was executed.

- [entries/hooks/stop-gate-checks/HOOK.md](../../entries/hooks/stop-gate-checks/HOOK.md) — read in full.
- [entries/hooks/stop-gate-checks/codex-hooks.example.json](../../entries/hooks/stop-gate-checks/codex-hooks.example.json) — read in full.
- [entries/hooks/stop-gate-checks/settings.example.json](../../entries/hooks/stop-gate-checks/settings.example.json) — read in full.
- [entries/hooks/stop-gate-checks/stop-gate.sh](../../entries/hooks/stop-gate-checks/stop-gate.sh) — read in full.

The grades cover the inspected core and relevant paths. Unread optional examples, adapters, licenses and conditional resources are not cleared by this assessment. Local or upstream tests were not run as behavioral evaluation.

## Grades

| Criterion | Grade (0–4) | Rationale |
| --- | ---: | --- |
| Practical value | 2 | Adds one completion reminder beyond CI and native goals. |
| Dependability | 2 | Retry guard permits ending with failing checks. |
| Cognitive ease | 2 | Whole-tree checks can interrupt unrelated or shared work. |
| Human control | 3 | Disablement is simple; configured commands still execute. |
| Adoption cost | 2 | Requires a truly fast gate plus Bash/jq. |
| Compatibility | 3 | Unsafe fit for shared dirty trees and unauthorized build gates. |
| Upkeep | 3 | Small script but gate and host behavior need review. |

Aggregate: **5.8/10**. Weights are provisional editorial choices. Expected developer benefit and burden are predictions from the artifact, not measured outcomes.

## Evidence and limits

Evidence remains **reviewed**. This pass adds no activation, installation or matched-outcome evidence. Existing records, where present, cover only the scope they describe. Host overlap is compared with the recorded catalog alternatives; this is not a fresh audit of every host release.

Previous curator notes, retained as history rather than newly verified facts: Refreshed to detect untracked-only changes. The retry guard allows ending after one blocked Stop; this is a bounded reminder, not an invariant that checks always pass. Whole-tree dirtiness includes pre-existing changes. Scratch script checks do not establish host behavior.

## Disposition and next evidence

Keep for the stated use, subject to the limits below. No payload, installation policy, hooks or tool connections are changed by this rating.

A useful next trial would compare the intended task with the named baseline, recording completion, correction effort, interruptions, comprehension and retained human control. Revisit the grades after material source/host changes or consequential failures.
