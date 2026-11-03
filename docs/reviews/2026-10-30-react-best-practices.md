# React and Next.js performance practices (Vercel): completed source assessment

Follow-up begun 2026-10-30; completed 2026-11-03 (America/Edmonton) by Codex, an AI curator. Rubric: [human-v1](../ratings.md). This is a provisional source judgment, not independent human calibration or behavioral evidence. Supersedes the [partial assessment](2026-10-29-react-best-practices.md) without rewriting its history.

## Context and comparison

Developers working on this task: Writing, reviewing, or refactoring React or Next.js code where performance matters. Declared hosts: any.

Baseline: React and the project framework documentation, existing profiler measurements, and targeted host code review.

## Inspection and finding

Pinned revision: `dc8367e6f91c022d83361f03c3313fa05e848ee5`. The [follow-up manifest](2026-10-30-assessment-completion-sources.json) records source URLs, SHA-256 digests, retrieved source ranges and prior unknowns under `react-best-practices`. Files downloaded outside those ranges are not claimed inspected. Source was treated as data; no upstream helper, installer or integration was executed.

Read the complete 3,810-line compiled guide and entrypoint. Prioritization of waterfalls, auth, payload size and cache scope is useful. But the search useTransition recipe claims newer transitions cancel pending requests while lacking stale-result guards, and its post-await setResults is not wrapped in another transition. The memo default-prop example confuses defaults evaluated inside a component with props compared before rendering. Micro-optimization examples can change behavior: flatMap retains falsy active names that filter(Boolean) removed. Compiler/version and measured bottlenecks must determine which rules apply.

Cross-check: React documents [post-await updates and out-of-order requests](https://react.dev/reference/react/useTransition) and [memo comparison of incoming props](https://react.dev/reference/react/memo). These contradict the unconditional cancellation and default-prop claims in the pinned guide (checked 2026-10-30).

## Grades

| Criterion | Grade (0–4) | Rationale |
| --- | ---: | --- |
| Practical value | 3 | Prioritized React performance topics help focus investigation. |
| Dependability | 2 | Complete compiled guide inspected. Useful performance priorities, with incorrect transition-cancellation/default-prop claims and behavior-changing micro-optimization examples. Select rules by framework version and measured bottleneck. |
| Cognitive ease | 3 | Progressive rule routing reduces initial reading load. |
| Human control | 3 | Performance choices remain inspectable but require target measurements. |
| Adoption cost | 3 | Markdown index is easy to load alongside a React project. |
| Compatibility | 3 | React and framework-specific rules need selective application. |
| Upkeep | 2 | Framework and rendering behavior change across releases. |

Aggregate: **6.9/10**. Weights are provisional editorial choices. Completing a profile does not establish that its examples are correct or authorize its installation.

## Blockers and disposition

No recommendation blocker established within the inspected scope.

Disposition: **Refresh**. Refresh the transition, cancellation and memoization examples against the supported React version.

## Evidence and limits

Evidence remains **reviewed**; existing evidence records retain their original scope. No installation, activation, live service accuracy, native binary correspondence or measured improvement over the baseline is claimed. Source inspection does not audit transitive dependencies or validate behavior in every supported environment. Revisit after source/host changes, consequential failure or a matched trial recording correction effort, interruptions, comprehension and control.
