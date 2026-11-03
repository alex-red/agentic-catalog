# Interface regression review (Jakub Krehel): completed source assessment

Follow-up begun 2026-10-30; completed 2026-11-03 (America/Edmonton) by Codex, an AI curator. Rubric: [human-v1](../ratings.md). This is a provisional source judgment, not independent human calibration or behavioral evidence. Supersedes the [partial assessment](2026-10-29-interface-review.md) without rewriting its history.

## Context and comparison

Developers working on this task: Explicitly reviewing interface regressions in a change and accepting installation of the complete required domain-review bundle. Declared hosts: any.

Baseline: Comparison baseline and alternatives: Native code review and ux-critique overlap general findings. This adds change attribution and affected-surface expansion, while react-component-composition covers implementation contracts. It is a review bundle, not a standalone one-file skill.

## Inspection and finding

Pinned revision: `1eb03d2b145df1c6cd84ab54a337600a2a379017`. The [follow-up manifest](2026-10-30-assessment-completion-sources.json) records source URLs, SHA-256 digests, retrieved source ranges and prior unknowns under `interface-review`. Files downloaded outside those ranges are not claimed inspected. Source was treated as data; no upstream helper, installer or integration was executed.

Read the complete change-review core, scope/removal references, better-interface contract and every Markdown/reference file in the six required domain skills at the same pin. Scope handling accounts for merge bases, explicit ranges, untracked files, shallow clones and mid-operation states; it protects the checkout and exposes the five-consumer cutoff and unverified rendering. Required sibling absence is explicit. Domain guidance remains opinionated: exact press scales, font-weight floors and color conventions can become false positives if treated as universal defects, and custom overlay snippets are not complete focus-trap implementations. Apply the stated evidence bar and project conventions before issuing a blocker.

## Grades

| Criterion | Grade (0–4) | Rationale |
| --- | ---: | --- |
| Practical value | 3 | Adds regression attribution and affected-surface expansion. |
| Dependability | 3 | Resolved-ref evidence, explicit failure states and coverage limits support the regression method; domain prescriptions and abbreviated examples remain meaningful limitations. |
| Cognitive ease | 3 | Strict scope helps, but seven domains add coordination cost. |
| Human control | 4 | Read-only checkout and explicit target resolution preserve work. |
| Adoption cost | 1 | Requires better-interface and its domain siblings. |
| Compatibility | 2 | A bundle with host/Git and review conventions, not one standalone file. |
| Upkeep | 3 | Multiple sibling contracts and Git resolution paths need upkeep. |

Aggregate: **7.1/10**. Weights are provisional editorial choices. Completing a profile does not establish that its examples are correct or authorize its installation.

## Blockers and disposition

No recommendation blocker established within the inspected scope.

Disposition: **Keep**. Use only for the stated task and review the cited limitations before adoption.

## Evidence and limits

Evidence remains **reviewed**; existing evidence records retain their original scope. No installation, activation, live service accuracy, native binary correspondence or measured improvement over the baseline is claimed. No branch/PR review, browser rendering or assistive-technology trial was performed. The installed bundle must include all eight complete sibling skills at this revision. Revisit after source/host changes, consequential failure or a matched trial recording correction effort, interruptions, comprehension and control.
