# Interface regression review (Jakub Krehel): human-focused assessment

Reviewed 2026-10-29 (America/Edmonton) by Codex, an AI curator. Rubric: [human-v1](../ratings.md). This is one curator’s source-based judgment, not independent human calibration or a behavioral evaluation.

Developers working on this task: Explicitly reviewing interface regressions in a change and accepting installation of the complete required domain-review bundle. Declared hosts: any.

Comparison baseline and alternatives: Native code review and ux-critique overlap general findings. This adds change attribution and affected-surface expansion, while react-component-composition covers implementation contracts. It is a review bundle, not a standalone one-file skill.

Useful change-scoped review orchestration; installation must include the required sibling bundle.

## Inspection and provenance

Pinned upstream revision: `1eb03d2b145df1c6cd84ab54a337600a2a379017`. Exact file digests, source URLs, prior rating and inspection status are recorded under `interface-review` in the [assessment manifest](2026-10-29-catalog-assessment-sources.json). Linked source content was treated as data; no installer, upstream helper or integration was executed.

- [skills/interface-review/SKILL.md](https://raw.githubusercontent.com/jakubkrehel/skills/1eb03d2b145df1c6cd84ab54a337600a2a379017/skills/interface-review/SKILL.md) — read in full.

Other packaged or fetched files not inspected in this pass: `skills/interface-review/scope-resolution.md`, `skills/interface-review/removed-signals.md`.

The listed excerpts support partial judgments only. Unlisted runtime, required references and transitive dependencies are outside coverage; no aggregate is assigned.

## Grades

| Criterion | Grade (0–4) | Rationale |
| --- | ---: | --- |
| Practical value | 3 | Adds regression attribution and affected-surface expansion. |
| Dependability | Not graded | Scope/removal references and required sibling review bundle are unaudited. |
| Cognitive ease | 3 | Strict scope helps, but seven domains add coordination cost. |
| Human control | 4 | Read-only checkout and explicit target resolution preserve work. |
| Adoption cost | 1 | Requires better-interface and its domain siblings. |
| Compatibility | 2 | A bundle with host/Git and review conventions, not one standalone file. |
| Upkeep | 3 | Multiple sibling contracts and Git resolution paths need upkeep. |

Aggregate: **incomplete — withheld**. Weights are provisional editorial choices. Expected developer benefit and burden are predictions from the artifact, not measured outcomes.

## Evidence and limits

Evidence remains **reviewed**. This pass adds no activation, installation or matched-outcome evidence. Existing records, where present, cover only the scope they describe. Host overlap is compared with the recorded catalog alternatives; this is not a fresh audit of every host release.

Previous curator notes, retained as history rather than newly verified facts: Review entrypoint, scope/removal references and better-interface router read; not every transitive domain reference audited. Requires seven sibling skills. Change-scoped source review is useful, but rendered verification is opt-in and unverified domains must stay visible. No behavioral trial.

Open inspection gaps:

- Dependability: required better-interface/domain skills and scope/removal references have not been inspected at this pin.

## Disposition and next evidence

Pending further inspection; retain with an incomplete profile. No payload, installation policy, hooks or tool connections are changed by this rating.

Resolve the named inspection gaps first. A useful next trial would compare the intended task with the named baseline, recording completion, correction effort, interruptions, comprehension and retained human control. Revisit the grades after material source/host changes or consequential failures.
