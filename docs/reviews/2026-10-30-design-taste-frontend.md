# Art direction and browser gates (Taste): completed source assessment

Follow-up begun 2026-10-30; completed 2026-11-03 (America/Edmonton) by Codex, an AI curator. Rubric: [human-v1](../ratings.md). This is a provisional source judgment, not independent human calibration or behavioral evidence. Supersedes the [partial assessment](2026-10-29-design-taste-frontend.md) without rewriting its history.

## Context and comparison

Developers working on this task: Explicitly trying a strict art-direction system for a marketing page or app screen and accepting its style policy and browser-tool overhead. Declared hosts: any.

Baseline: Comparison baseline and alternatives: Alternative to frontend-design and Impeccable, with stronger house-style enforcement. Native browser tools and webapp-testing cover screenshots and behavior. emil-design-eng, remove-animations and baseline-ui conflict with its marketing motion policy.

## Inspection and finding

Pinned revision: `af8a897996e159ccc89c9da535dff714d5dba62d`. The [follow-up manifest](2026-10-30-assessment-completion-sources.json) records source URLs, SHA-256 digests, retrieved source ranges and prior unknowns under `design-taste-frontend`. Files downloaded outside those ranges are not claimed inspected. Source was treated as data; no upstream helper, installer or integration was executed.

Read the complete primary skill, study-method report and critique rubric, complete browser driver, main inspector and selected direction/asset implementation. The study explicitly uses model reviewers and gallery sampling; its own unseen-brief round lost all three comparisons, and the later improvement reused those briefs. It is not independent human calibration or evidence of universal improvement. The main skill acknowledges house taste, but enforces minimum imagery and motion counts and caps scores for stylistic devices even when the study finds them more common on strong sites. The draw is seeded selection plus recent-use history, not research proving the chosen design fits a new subject. Browser execution uses a temporary profile and rejects dialogs, but local-file inspection serves the checkout root with lexical containment only, allowing dotfiles and symlink targets; it has no request authentication or Host validation. This creates a concrete exposure boundary for sensitive checkouts. Screenshot coverage is capped at twelve screens and many optional probe errors become null/empty findings, so a zero-FAIL result is bounded. Asset acquisition rechecks recorded license categories and preserves credits, but trusts remote metadata and redirects; images and posters are read fully without the video size cap, and credit updates are unlocked read-modify-write. These findings support an experimental, qualified grade rather than dependable general frontend guidance.

## Grades

| Criterion | Grade (0–4) | Rationale |
| --- | ---: | --- |
| Practical value | 3 | Reference-led exploration can give a UI more coherent visual direction. |
| Dependability | 1 | Useful concrete render checks and attribution are limited by rigid taste metrics, bounded/suppressed probes and a local-server containment defect. |
| Cognitive ease | 2 | Multiple directions, inspection and persistence add substantial design overhead. |
| Human control | 2 | A prescribed house style and mandatory references can compete with product decisions. |
| Adoption cost | 2 | Node/browser tooling and local artifacts add setup work. |
| Compatibility | 2 | Opinionated style and screen requirements limit adoption in established design systems. |
| Upkeep | 2 | Browser tooling and external visual assets need continuing maintenance. |

Aggregate: **5.1/10** · scoped blockers remain. Weights are provisional editorial choices. Completing a profile does not establish that its examples are correct or authorize its installation.

## Blockers and disposition

- **Local-file inspector serving sensitive checkouts:** The local server serves the checkout root without authentication or Host validation, permits dotfiles, and uses lexical containment that follows symlink targets. Use an independently scoped static preview or fix those boundaries before exposing a sensitive checkout.

Disposition: **Refresh**. Use a scoped authenticated preview with canonical containment and dotfile exclusion; bound image downloads and distinguish house metrics from study evidence.

## Evidence and limits

Evidence remains **reviewed**; existing evidence records retain their original scope. No installation, activation, live service accuracy, native binary correspondence or measured improvement over the baseline is claimed. Complete primary guidance, study, critique, browser driver and inspector were inspected with selected draw/history and asset download paths. Remaining source adapters, full probe/rules library, optional app/scene workflows and raw study provenance were not audited; no browser, media fetch or design trial was run. Revisit after source/host changes, consequential failure or a matched trial recording correction effort, interruptions, comprehension and control.
