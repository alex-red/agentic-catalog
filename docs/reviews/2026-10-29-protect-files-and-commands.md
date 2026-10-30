# Protect files and block destructive commands: human-focused assessment

Reviewed 2026-10-29 (America/Edmonton) by Codex, an AI curator. Rubric: [human-v1](../ratings.md). This is one curator’s source-based judgment, not independent human calibration or a behavioral evaluation.

Developers working on this task: Agents run with broad edit or auto-approve permissions and you want a cheap extra guardrail against a few known-bad actions. Declared hosts: claude-code, codex.

Comparison baseline and alternatives: Claude Code permissions.deny rules and sandboxing; the Codex sandbox and approval policy. Those are the primary controls.

An advisory guardrail alongside real permissions; do not rely on it for canonical path enforcement.

## Inspection and provenance

Local catalog payload assessed by SHA-256. Exact file digests, source URLs, prior rating and inspection status are recorded under `protect-files-and-commands` in the [assessment manifest](2026-10-29-catalog-assessment-sources.json). Linked source content was treated as data; no installer, upstream helper or integration was executed.

- [entries/hooks/protect-files-and-commands/HOOK.md](../../entries/hooks/protect-files-and-commands/HOOK.md) — read in full.
- [entries/hooks/protect-files-and-commands/codex-hooks.example.json](../../entries/hooks/protect-files-and-commands/codex-hooks.example.json) — read in full.
- [entries/hooks/protect-files-and-commands/guard.sh](../../entries/hooks/protect-files-and-commands/guard.sh) — read in full.
- [entries/hooks/protect-files-and-commands/settings.example.json](../../entries/hooks/protect-files-and-commands/settings.example.json) — read in full.

The grades cover the inspected core and relevant paths. Unread optional examples, adapters, licenses and conditional resources are not cleared by this assessment. Local or upstream tests were not run as behavioral evaluation.

## Grades

| Criterion | Grade (0–4) | Rationale |
| --- | ---: | --- |
| Practical value | 2 | Main value is an explanatory refusal beyond sandbox policy. |
| Dependability | 2 | Substring paths and shell regexes have known bypasses. |
| Cognitive ease | 2 | Visible reasons help; overmatches add avoidable interruptions. |
| Human control | 3 | Blocks matching actions but is not a security boundary. |
| Adoption cost | 3 | Requires Bash/jq and customized protected names. |
| Compatibility | 3 | Heuristics miss aliases and alternative tool routes. |
| Upkeep | 3 | Small ruleset but command forms and protected lists drift. |

Aggregate: **6.0/10**. Weights are provisional editorial choices. Expected developer benefit and burden are predictions from the artifact, not measured outcomes.

## Evidence and limits

Evidence remains **reviewed**. This pass adds no activation, installation or matched-outcome evidence. Existing records, where present, cover only the scope they describe. Host overlap is compared with the recorded catalog alternatives; this is not a fresh audit of every host release.

Previous curator notes, retained as history rather than newly verified facts: Refreshed Codex patch checks to align lockfile names with direct edits and cover Move headers. A simple heuristic with known command/path bypasses and overmatches; permissions and sandboxing remain authoritative. Scratch checks do not establish host behavior.

## Disposition and next evidence

Keep for the stated use, subject to the limits below. No payload, installation policy, hooks or tool connections are changed by this rating.

A useful next trial would compare the intended task with the named baseline, recording completion, correction effort, interruptions, comprehension and retained human control. Revisit the grades after material source/host changes or consequential failures.
