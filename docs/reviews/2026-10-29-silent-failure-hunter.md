# Silent-failure hunter: human-focused assessment

Reviewed 2026-10-29 (America/Edmonton) by Codex, an AI curator. Rubric: [human-v1](../ratings.md). This is one curator’s source-based judgment, not independent human calibration or a behavioral evaluation.

Developers working on this task: A change adds try/catch, fallbacks, retries, or optional chaining, and you want errors surfaced rather than hidden. Declared hosts: claude-code, codex.

Comparison baseline and alternatives: General review commands catch some cases but do not specialize in them.

Use as a focused reviewer; its Bash tool permission does not enforce read-only execution.

## Inspection and provenance

Local catalog payload assessed by SHA-256. Exact file digests, source URLs, prior rating and inspection status are recorded under `silent-failure-hunter` in the [assessment manifest](2026-10-29-catalog-assessment-sources.json). Linked source content was treated as data; no installer, upstream helper or integration was executed.

- [entries/subagents/silent-failure-hunter/AGENT.md](../../entries/subagents/silent-failure-hunter/AGENT.md) — read in full.

The grades cover the inspected core and relevant paths. Unread optional examples, adapters, licenses and conditional resources are not cleared by this assessment. Local or upstream tests were not run as behavioral evaluation.

## Grades

| Criterion | Grade (0–4) | Rationale |
| --- | ---: | --- |
| Practical value | 3 | Focused error-path review complements generic review. |
| Dependability | 3 | Requires actionable failure paths and excludes style. |
| Cognitive ease | 3 | Narrow diff scope reduces reviewer noise. |
| Human control | 2 | No-edit instruction is prose; Bash can still mutate. |
| Adoption cost | 3 | Needs subagent registration and diff context. |
| Compatibility | 3 | Project logger and host adapter remain authoritative. |
| Upkeep | 4 | Small standalone review method. |

Aggregate: **7.3/10**. Weights are provisional editorial choices. Expected developer benefit and burden are predictions from the artifact, not measured outcomes.

## Evidence and limits

Evidence remains **reviewed**. This pass adds no activation, installation or matched-outcome evidence. Existing records, where present, cover only the scope they describe. Host overlap is compared with the recorded catalog alternatives; this is not a fresh audit of every host release.

Previous curator notes, retained as history rather than newly verified facts: Targets a failure agents often produce, defensive code that hides errors, which general reviewers underweight. Adapted rather than vendored because the upstream text names one project's logging and Sentry setup. It is limited to read-only tools.

## Disposition and next evidence

Keep for the stated use, subject to the limits below. No payload, installation policy, hooks or tool connections are changed by this rating.

A useful next trial would compare the intended task with the named baseline, recording completion, correction effort, interruptions, comprehension and retained human control. Revisit the grades after material source/host changes or consequential failures.
