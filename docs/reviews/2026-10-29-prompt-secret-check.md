# Catch recognizable credentials in prompts: human-focused assessment

Reviewed 2026-10-29 (America/Edmonton) by Codex, an AI curator. Rubric: [human-v1](../ratings.md). This is one curator’s source-based judgment, not independent human calibration or a behavioral evaluation.

Developers working on this task: Accidental credential pastes are a recurring risk before prompts reach the model. Declared hosts: claude-code, codex.

Comparison baseline and alternatives: no-email-context removes a host-injected identity block; this screens user submissions. Native DLP and secret scanners may provide broader coverage. Neither replaces credential isolation.

A narrow accidental-paste guard, not comprehensive DLP or erasure of local history.

## Inspection and provenance

Local catalog payload assessed by SHA-256. Exact file digests, source URLs, prior rating and inspection status are recorded under `prompt-secret-check` in the [assessment manifest](2026-10-29-catalog-assessment-sources.json). Linked source content was treated as data; no installer, upstream helper or integration was executed.

- [entries/hooks/prompt-secret-check/HOOK.md](../../entries/hooks/prompt-secret-check/HOOK.md) — read in full.
- [entries/hooks/prompt-secret-check/check.py](../../entries/hooks/prompt-secret-check/check.py) — read in full.
- [entries/hooks/prompt-secret-check/codex-hooks.example.json](../../entries/hooks/prompt-secret-check/codex-hooks.example.json) — read in full.
- [entries/hooks/prompt-secret-check/settings.example.json](../../entries/hooks/prompt-secret-check/settings.example.json) — read in full.

The grades cover the inspected core and relevant paths. Unread optional examples, adapters, licenses and conditional resources are not cleared by this assessment. Local or upstream tests were not run as behavioral evaluation.

## Grades

| Criterion | Grade (0–4) | Rationale |
| --- | ---: | --- |
| Practical value | 3 | Catches a few common credential pastes before submission. |
| Dependability | 2 | Narrow regex coverage and Codex startup failures limit assurance. |
| Cognitive ease | 3 | Category-only feedback is actionable but examples can false-positive. |
| Human control | 4 | No stored prompt, network call or automatic allow decision. |
| Adoption cost | 3 | Python plus explicit host-specific registration. |
| Compatibility | 3 | Cannot inspect attachments, history or auxiliary requests. |
| Upkeep | 3 | Recognizable token formats and host failure policy drift. |

Aggregate: **7.4/10**. Weights are provisional editorial choices. Expected developer benefit and burden are predictions from the artifact, not measured outcomes.

## Evidence and limits

Evidence remains **reviewed**. This pass adds no activation, installation or matched-outcome evidence. Existing records, where present, cover only the scope they describe. Host overlap is compared with the recorded catalog alternatives; this is not a fresh audit of every host release.

Previous curator notes, retained as history rather than newly verified facts: Shared UserPromptSubmit prompt field and exit-2 rejection for Claude/Codex. Recognizes only a few shapes; examples can trigger it and other secrets pass. Does not erase UI/history or screen files/auxiliary requests. Claude onFailure is omitted in Codex; host error/timeout behavior remains a limitation.

## Disposition and next evidence

Keep for the stated use, subject to the limits below. No payload, installation policy, hooks or tool connections are changed by this rating.

A useful next trial would compare the intended task with the named baseline, recording completion, correction effort, interruptions, comprehension and retained human control. Revisit the grades after material source/host changes or consequential failures.
