# Monorepo change verification: human-focused assessment

Reviewed 2026-10-29 (America/Edmonton) by Codex, an AI curator. Rubric: [human-v1](../ratings.md). This is one curator’s source-based judgment, not independent human calibration or a behavioral evaluation.

Developers working on this task: Planning or verifying cross-package changes, shared build configuration, affected-task selection or package boundaries in a monorepo. Declared hosts: any.

Comparison baseline and alternatives: repo-research discovers conventions and verification-before-completion requires evidence. Native task runners compute graphs and execute checks; agents-md-authoring covers scoped instructions. This workflow handles cross-package selection and package/cache contracts without installing or replacing a runner.

Useful for cross-package changes; native task runners still execute and validate the actual graph.

## Inspection and provenance

Local catalog payload assessed by SHA-256. Exact file digests, source URLs, prior rating and inspection status are recorded under `monorepo-change-verification` in the [assessment manifest](2026-10-29-catalog-assessment-sources.json). Linked source content was treated as data; no installer, upstream helper or integration was executed.

- [entries/workflows/monorepo-change-verification/WORKFLOW.md](../../entries/workflows/monorepo-change-verification/WORKFLOW.md) — read in full.

Other packaged or fetched files not inspected in this pass: `entries/workflows/monorepo-change-verification/LICENSE.txt`.

The grades cover the inspected core and relevant paths. Unread optional examples, adapters, licenses and conditional resources are not cleared by this assessment. Local or upstream tests were not run as behavioral evaluation.

## Grades

| Criterion | Grade (0–4) | Rationale |
| --- | ---: | --- |
| Practical value | 4 | Separates dependency, task and release graphs. |
| Dependability | 3 | Includes missing-base, cache restore and consumer checks. |
| Cognitive ease | 3 | Named graphs reduce mistaken affected-task assumptions. |
| Human control | 4 | Preserves tooling, credentials and publishing authority. |
| Adoption cost | 3 | Graph inspection and representative consumers require effort. |
| Compatibility | 3 | Tool-agnostic with project-specific command selection. |
| Upkeep | 3 | Runner invalidation and package contracts need rechecks. |

Aggregate: **8.5/10**. Weights are provisional editorial choices. Expected developer benefit and burden are predictions from the artifact, not measured outcomes.

## Evidence and limits

Evidence remains **reviewed**. This pass adds no activation, installation or matched-outcome evidence. Existing records, where present, cover only the scope they describe. Host overlap is compared with the recorded catalog alternatives; this is not a fresh audit of every host release.

Previous curator notes, retained as history rather than newly verified facts: A tool-agnostic workflow that distinguishes dependency, task and release graphs and checks conservative affected selection. Complements repository discovery and general verification. Source reviewed; no representative agent outcome or Turbo/Nx cache evaluation.

## Disposition and next evidence

Keep for the stated use, subject to the limits below. No payload, installation policy, hooks or tool connections are changed by this rating.

A useful next trial would compare the intended task with the named baseline, recording completion, correction effort, interruptions, comprehension and retained human control. Revisit the grades after material source/host changes or consequential failures.
