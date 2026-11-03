# Product interface craft (Damola Akinleye): completed source assessment

Follow-up begun 2026-10-30; completed 2026-11-03 (America/Edmonton) by Codex, an AI curator. Rubric: [human-v1](../ratings.md). This is a provisional source judgment, not independent human calibration or behavioral evidence. Supersedes the [partial assessment](2026-10-29-interface-design.md) without rewriting its history.

## Context and comparison

Developers working on this task: Trying an opinionated product-UI workflow for dashboards, settings or admin tools, with persistent design decisions and explicit technical caveats. Declared hosts: any.

Baseline: Comparison baseline and alternatives: Overlaps frontend-design, Impeccable Operate mode and existing component conventions. Adds product-domain exploration and a persistent system.md convention. Preserve native controls and established semantic tokens when they fit.

## Inspection and finding

Pinned revision: `890d9295acdaf57891a20dc2499abfb4b8529784`. The [follow-up manifest](2026-10-30-assessment-completion-sources.json) records source URLs, SHA-256 digests, retrieved source ranges and prior unknowns under `interface-design`. Files downloaded outside those ranges are not claimed inspected. Source was treated as data; no upstream helper, installer or integration was executed.

The complete core preserves existing components and design systems, prioritizes native controls and requires visual/build verification. It nevertheless says native select/date inputs cannot be styled, labels 44px as WCAG while allowing a 40px minimum without a conformance level, and mixes strict motion bans with 200–500ms examples. Treat these as technical limitations, not universal standards; persistence is offered after the task. Optional plugin commands are outside the selected core.

Cross-check: W3C distinguishes [24px minimum at AA](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum) from [44px enhanced at AAA](https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced), both with exceptions (checked 2026-10-30).

## Grades

| Criterion | Grade (0–4) | Rationale |
| --- | ---: | --- |
| Practical value | 3 | Domain exploration and persistent design tokens can improve UI continuity. |
| Dependability | 2 | Useful product-UI craft, component reuse and visual checks. Native-control styling and WCAG target-size wording are overbroad; fixed exploration/motion rules need project judgment. |
| Cognitive ease | 2 | Fixed exploration counts and several stages add design effort. |
| Human control | 3 | Domain context guides the work but novelty requirements may override accepted patterns. |
| Adoption cost | 3 | Core Markdown is accessible; persistence and commands require integration. |
| Compatibility | 2 | Dashboard-focused conventions fit some products better than others. |
| Upkeep | 3 | Principles are durable while platform and accessibility examples need checking. |

Aggregate: **6.4/10**. Weights are provisional editorial choices. Completing a profile does not establish that its examples are correct or authorize its installation.

## Blockers and disposition

No recommendation blocker established within the inspected scope.

Disposition: **Keep**. Use only for the stated task and review the cited limitations before adoption.

## Evidence and limits

Evidence remains **reviewed**; existing evidence records retain their original scope. No installation, activation, live service accuracy, native binary correspondence or measured improvement over the baseline is claimed. Source inspection does not audit transitive dependencies or validate behavior in every supported environment. Revisit after source/host changes, consequential failure or a matched trial recording correction effort, interruptions, comprehension and control.
