# Rust verification ladder: human-focused assessment

Reviewed 2026-10-29 (America/Edmonton) by Codex, an AI curator. Rubric: [human-v1](../ratings.md). This is one curator’s source-based judgment, not independent human calibration or a behavioral evaluation.

Developers working on this task: Choosing or reviewing verification for a Rust change involving unsafe code, concurrency, input handling, test quality or a public library API. Declared hosts: any.

Comparison baseline and alternatives: Cargo, rustfmt, Clippy and project CI supply the actual checks. verification-before-completion requires evidence but does not select Rust-specific layers. property-based-testing and variant-analysis supply adjacent methods; tokio-async-correctness covers runtime lifecycle review. Optional tools are separate prerequisites, not bundled capabilities.

Strong specialist selection guide; optional layers remain prerequisites, not bundled verified capabilities.

## Inspection and provenance

Local catalog payload assessed by SHA-256. Exact file digests, source URLs, prior rating and inspection status are recorded under `rust-verification-ladder` in the [assessment manifest](2026-10-29-catalog-assessment-sources.json). Linked source content was treated as data; no installer, upstream helper or integration was executed.

- [entries/workflows/rust-verification-ladder/WORKFLOW.md](../../entries/workflows/rust-verification-ladder/WORKFLOW.md) — read in full.

Other packaged or fetched files not inspected in this pass: `entries/workflows/rust-verification-ladder/LICENSE.txt`.

The grades cover the inspected core and relevant paths. Unread optional examples, adapters, licenses and conditional resources are not cleared by this assessment. Local or upstream tests were not run as behavioral evaluation.

## Grades

| Criterion | Grade (0–4) | Rationale |
| --- | ---: | --- |
| Practical value | 4 | Selects specialized evidence beyond cargo test alone. |
| Dependability | 3 | Clearly states model, feature, target and bound limitations. |
| Cognitive ease | 3 | Change-to-tool table avoids running everything. |
| Human control | 4 | No default toolchain changes or implicit tool installation. |
| Adoption cost | 3 | Advanced harnesses and tools can be expensive. |
| Compatibility | 3 | Preserves MSRV, feature matrices and project lint policy. |
| Upkeep | 3 | Tool capabilities and nightly compatibility change. |

Aggregate: **8.5/10**. Weights are provisional editorial choices. Expected developer benefit and burden are predictions from the artifact, not measured outcomes.

## Evidence and limits

Evidence remains **reviewed**. This pass adds no activation, installation or matched-outcome evidence. Existing records, where present, cover only the scope they describe. Host overlap is compared with the recorded catalog alternatives; this is not a fresh audit of every host release.

Previous curator notes, retained as history rather than newly verified facts: Selects distinct evidence rather than running every advanced tool. Preserves MSRV, feature matrices and project policy, and distinguishes bounded tests/models from soundness proofs. The baseline was checked in a disposable Rust fixture; specialized tools were not installed or exercised. No trigger or matched outcome evaluation.

## Disposition and next evidence

Keep for the stated use, subject to the limits below. No payload, installation policy, hooks or tool connections are changed by this rating.

A useful next trial would compare the intended task with the named baseline, recording completion, correction effort, interruptions, comprehension and retained human control. Revisit the grades after material source/host changes or consequential failures.
