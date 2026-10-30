# Tokio async correctness: human-focused assessment

Reviewed 2026-10-29 (America/Edmonton) by Codex, an AI curator. Rubric: [human-v1](../ratings.md). This is one curator’s source-based judgment, not independent human calibration or a behavioral evaluation.

Developers working on this task: Reviewing or fixing Tokio select loops, lost work, orphan tasks, closed-channel spins, unbounded spawning or shutdown behavior. Declared hosts: any.

Comparison baseline and alternatives: Rust compiler diagnostics and Clippy catch some mistakes; diagnosing-bugs and property-based-testing supply general methods. This skill owns Tokio cancellation, task lifecycle and bounded work. rust-verification-ladder selects wider verification tools; no Tokio dependency, tool connection or background process is installed by selecting the skill.

Strong specialist review method; bounded fixtures do not prove all interleavings correct.

## Inspection and provenance

Local catalog payload assessed by SHA-256. Exact file digests, source URLs, prior rating and inspection status are recorded under `tokio-async-correctness` in the [assessment manifest](2026-10-29-catalog-assessment-sources.json). Linked source content was treated as data; no installer, upstream helper or integration was executed.

- [entries/skills/tokio-async-correctness/SKILL.md](../../entries/skills/tokio-async-correctness/SKILL.md) — read in full.
- [entries/skills/tokio-async-correctness/references/task-lifecycle.md](../../entries/skills/tokio-async-correctness/references/task-lifecycle.md) — read in full.

Other packaged or fetched files not inspected in this pass: `entries/skills/tokio-async-correctness/LICENSE.txt`.

The grades cover the inspected core and relevant paths. Unread optional examples, adapters, licenses and conditional resources are not cleared by this assessment. Local or upstream tests were not run as behavioral evaluation.

## Grades

| Criterion | Grade (0–4) | Rationale |
| --- | ---: | --- |
| Practical value | 4 | Addresses cancellation and ownership defects missed by compilation. |
| Dependability | 3 | Operation contracts and explicit error layers bound examples. |
| Cognitive ease | 3 | Lifecycle mapping narrows concurrency reasoning. |
| Human control | 4 | Preserves shutdown semantics and existing runtime. |
| Adoption cost | 3 | Requires Tokio expertise and controlled concurrency tests. |
| Compatibility | 3 | Version/features are explicit; no new runtime is required. |
| Upkeep | 3 | Tokio API contracts and examples need rechecking. |

Aggregate: **8.5/10**. Weights are provisional editorial choices. Expected developer benefit and burden are predictions from the artifact, not measured outcomes.

## Evidence and limits

Evidence remains **reviewed**. This pass adds no activation, installation or matched-outcome evidence. Existing records, where present, cover only the scope they describe. Host overlap is compared with the recorded catalog alternatives; this is not a fresh audit of every host release.

Previous curator notes, retained as history rather than newly verified facts: Targets lifecycle bugs that compile successfully, using official Tokio contracts. Includes a complete bounded task example with supervisor-cancellation and result-memory limits disclosed. Compiled and checked with coordinated scratch cases; no agent trigger, representative schedule coverage or matched outcome evaluation is claimed.

## Disposition and next evidence

Keep for the stated use, subject to the limits below. No payload, installation policy, hooks or tool connections are changed by this rating.

A useful next trial would compare the intended task with the named baseline, recording completion, correction effort, interruptions, comprehension and retained human control. Revisit the grades after material source/host changes or consequential failures.
