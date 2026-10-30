# Local desktop attention alerts: human-focused assessment

Reviewed 2026-10-29 (America/Edmonton) by Codex, an AI curator. Rubric: [human-v1](../ratings.md). This is one curator’s source-based judgment, not independent human calibration or a behavioral evaluation.

Developers working on this task: You switch applications while agents work and miss permission or input prompts. Declared hosts: claude-code.

Comparison baseline and alternatives: Claude's UI already signals attention; this provides a local desktop alert. Skip it if native app notifications already suffice.

Skip when host notifications suffice; desktop permission and headless-session limits remain.

## Inspection and provenance

Local catalog payload assessed by SHA-256. Exact file digests, source URLs, prior rating and inspection status are recorded under `desktop-attention` in the [assessment manifest](2026-10-29-catalog-assessment-sources.json). Linked source content was treated as data; no installer, upstream helper or integration was executed.

- [entries/hooks/desktop-attention/HOOK.md](../../entries/hooks/desktop-attention/HOOK.md) — read in full.
- [entries/hooks/desktop-attention/notify.py](../../entries/hooks/desktop-attention/notify.py) — read in full.
- [entries/hooks/desktop-attention/settings.example.json](../../entries/hooks/desktop-attention/settings.example.json) — read in full.

The grades cover the inspected core and relevant paths. Unread optional examples, adapters, licenses and conditional resources are not cleared by this assessment. Local or upstream tests were not run as behavioral evaluation.

## Grades

| Criterion | Grade (0–4) | Rationale |
| --- | ---: | --- |
| Practical value | 3 | Useful when native app attention signals are missed. |
| Dependability | 3 | Fixed local notification and bounded subprocess failure. |
| Cognitive ease | 3 | Unobtrusive alerts can reduce manual session polling. |
| Human control | 4 | No dynamic prompt text, network call or permission decision. |
| Adoption cost | 3 | Requires Python plus OS notification service/permissions. |
| Compatibility | 3 | Supported desktop OS constraints are explicit. |
| Upkeep | 3 | Small OS integration with no persistent state. |

Aggregate: **7.9/10**. Weights are provisional editorial choices. Expected developer benefit and burden are predictions from the artifact, not measured outcomes.

## Evidence and limits

Evidence remains **reviewed**. This pass adds no activation, installation or matched-outcome evidence. Existing records, where present, cover only the scope they describe. Host overlap is compared with the recorded catalog alternatives; this is not a fresh audit of every host release.

Previous curator notes, retained as history rather than newly verified facts: Small independent Python implementation of the native notification pattern. macOS and Linux desktop support only; requires notification permissions/daemon. Failures are advisory; no remote notification service or dynamic prompt text.

## Disposition and next evidence

Keep for the stated use, subject to the limits below. No payload, installation policy, hooks or tool connections are changed by this rating.

A useful next trial would compare the intended task with the named baseline, recording completion, correction effort, interruptions, comprehension and retained human control. Revisit the grades after material source/host changes or consequential failures.
