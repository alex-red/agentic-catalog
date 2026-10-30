# Bun monorepo workspaces: human-focused assessment

Reviewed 2026-10-29 (America/Edmonton) by Codex, an AI curator. Rubric: [human-v1](../ratings.md). This is one curator’s source-based judgment, not independent human calibration or a behavioral evaluation.

Developers working on this task: Creating, configuring or debugging a Bun monorepo with cross-package dependency, filter, linker, catalog or package-export problems. Declared hosts: any.

Comparison baseline and alternatives: bun-migration-verification selects migration layers; monorepo-change-verification selects cross-package evidence; repo-research supplies repository context. Bun docs and installed task runners provide actual commands. This skill supplies workspace-specific contracts and does not install Bun, Turbo, Nx, hooks or services.

Strong Bun-specific guidance; verification costs and version-sensitive commands remain visible.

## Inspection and provenance

Local catalog payload assessed by SHA-256. Exact file digests, source URLs, prior rating and inspection status are recorded under `bun-workspaces` in the [assessment manifest](2026-10-29-catalog-assessment-sources.json). Linked source content was treated as data; no installer, upstream helper or integration was executed.

- [entries/skills/bun-workspaces/SKILL.md](../../entries/skills/bun-workspaces/SKILL.md) — read in full.
- [entries/skills/bun-workspaces/references/selection-and-packaging.md](../../entries/skills/bun-workspaces/references/selection-and-packaging.md) — read in full.

Other packaged or fetched files not inspected in this pass: `entries/skills/bun-workspaces/LICENSE.txt`.

The grades cover the inspected core and relevant paths. Unread optional examples, adapters, licenses and conditional resources are not cleared by this assessment. Local or upstream tests were not run as behavioral evaluation.

## Grades

| Criterion | Grade (0–4) | Rationale |
| --- | ---: | --- |
| Practical value | 4 | Connects workspace membership, linking and packing failures. |
| Dependability | 3 | Requires consumer-scoped probes and clean installs. |
| Cognitive ease | 3 | Decision branches replace command guessing. |
| Human control | 4 | Preserves runtime choices and lifecycle trust policy. |
| Adoption cost | 3 | Needs Bun and a representative package fixture. |
| Compatibility | 3 | Keeps existing orchestration and release contracts. |
| Upkeep | 3 | Linker and CLI details require version maintenance. |

Aggregate: **8.5/10**. Weights are provisional editorial choices. Expected developer benefit and burden are predictions from the artifact, not measured outcomes.

## Evidence and limits

Evidence remains **reviewed**. This pass adds no activation, installation or matched-outcome evidence. Existing records, where present, cover only the scope they describe. Host overlap is compared with the recorded catalog alternatives; this is not a fresh audit of every host release.

Previous curator notes, retained as history rather than newly verified facts: Original Bun-specific guidance using current official contracts with version checks. A disposable three-package fixture verified ten selection, ordering, catalog, install and packing invariants on Bun 1.4.3. This is not an agent evaluation or cross-platform/deployment test.

## Disposition and next evidence

Keep for the stated use, subject to the limits below. No payload, installation policy, hooks or tool connections are changed by this rating.

A useful next trial would compare the intended task with the named baseline, recording completion, correction effort, interruptions, comprehension and retained human control. Revisit the grades after material source/host changes or consequential failures.
