# Interaction craft (Emil Kowalski): completed source assessment

Follow-up begun 2026-10-30; completed 2026-11-03 (America/Edmonton) by Codex, an AI curator. Rubric: [human-v1](../ratings.md). This is a provisional source judgment, not independent human calibration or behavioral evidence. Supersedes the [partial assessment](2026-10-29-emil-design-eng.md) without rewriting its history.

## Context and comparison

Developers working on this task: Trying detailed interaction and motion guidance for product UI while checking its technical examples against the project's actual library versions. Declared hosts: any.

Baseline: Comparison baseline and alternatives: frontend-design supplies art direction; react-component-composition supplies component contracts. remove-animations focuses on subtraction. This is an alternative craft policy, not an additional global mandate; it conflicts with baseline-ui and Taste on motion and easing.

## Inspection and finding

Pinned revision: `85e8e2363b713506e1d5b6e07a0eb2da66be1bc3`. The [follow-up manifest](2026-10-30-assessment-completion-sources.json) records source URLs, SHA-256 digests, retrieved source ranges and prior unknowns under `emil-design-eng`. Files downloaded outside those ranges are not claimed inspected. Source was treated as data; no upstream helper, installer or integration was executed.

The complete single-file method includes reduced motion, pointer capture, touch-hover gating, interruption and real-device checks. Blanket claims that CSS animations, clip-path and WAAPI are hardware accelerated and Motion shorthand never is are too broad; compositing depends on property, browser and library version. Frequency cutoffs, scale-on-press and mandatory table output remain house preferences. Profile the actual target rather than promising performance from syntax alone.

Cross-check: [Motion performance guidance](https://motion.dev/docs/performance) makes acceleration dependent on property/implementation and recommends testing devices; this is not a universal distinction between CSS and JavaScript (checked 2026-10-30).

## Grades

| Criterion | Grade (0–4) | Rationale |
| --- | ---: | --- |
| Practical value | 3 | Concrete interaction craft can improve implementation detail. |
| Dependability | 2 | Useful interaction craft and verification guidance, qualified by blanket acceleration claims, fixed timing rules and a mandatory review-table format. Profile the target browser and Motion version. |
| Cognitive ease | 2 | Large instruction surface and mandatory tabular output increase reading cost. |
| Human control | 3 | Project decisions can guide usage, but absolute animation rules need exceptions. |
| Adoption cost | 3 | Markdown guidance is easy to load; examples assume a particular frontend stack. |
| Compatibility | 2 | Motion and interaction prescriptions do not transfer uniformly across UI platforms. |
| Upkeep | 3 | Craft principles are durable but library-specific advice drifts. |

Aggregate: **6.4/10**. Weights are provisional editorial choices. Completing a profile does not establish that its examples are correct or authorize its installation.

## Blockers and disposition

No recommendation blocker established within the inspected scope.

Disposition: **Keep**. Use only for the stated task and review the cited limitations before adoption.

## Evidence and limits

Evidence remains **reviewed**; existing evidence records retain their original scope. No installation, activation, live service accuracy, native binary correspondence or measured improvement over the baseline is claimed. Source inspection does not audit transitive dependencies or validate behavior in every supported environment. Revisit after source/host changes, consequential failure or a matched trial recording correction effort, interruptions, comprehension and control.
