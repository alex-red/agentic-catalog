# Skill creator with evaluations: human-focused assessment

Reviewed 2026-10-29 (America/Edmonton) by Codex, an AI curator. Rubric: [human-v1](../ratings.md). This is one curator’s source-based judgment, not independent human calibration or a behavioral evaluation.

Developers working on this task: Authoring or tuning a skill and measuring whether it triggers and helps; use it as a methodology reference. Declared hosts: claude-code.

Comparison baseline and alternatives: Built into Claude Code through the skill-creator plugin; Codex ships a system skill-creator.

Compare with the installed host skill creator before adopting a second authoring system.

## Inspection and provenance

Pinned upstream revision: `b9e19e6f44773509fbdd7001d77ff41a49a486c1`. Exact file digests, source URLs, prior rating and inspection status are recorded under `skill-creator` in the [assessment manifest](2026-10-29-catalog-assessment-sources.json). Linked source content was treated as data; no installer, upstream helper or integration was executed.

- [skills/skill-creator/SKILL.md](https://raw.githubusercontent.com/anthropics/skills/b9e19e6f44773509fbdd7001d77ff41a49a486c1/skills/skill-creator/SKILL.md) — read selected line ranges: lines 1–85.

The listed excerpts support partial judgments only. Unlisted runtime, required references and transitive dependencies are outside coverage; no aggregate is assigned.

## Grades

| Criterion | Grade (0–4) | Rationale |
| --- | ---: | --- |
| Practical value | 2 | Evaluation design adds value primarily where a suitable host skill creator is absent. |
| Dependability | Not graded | Helper scripts, evaluation machinery and remaining body are uninspected. |
| Cognitive ease | 2 | Evaluation and iterative model runs impose significant reading and compute costs. |
| Human control | 3 | The visible process permits lighter paths, but authoring and execution need separate scope. |
| Adoption cost | 2 | Requires evaluation assets and host-specific tooling beyond Markdown. |
| Compatibility | 3 | Skill format transfers; Claude-specific details need adaptation. |
| Upkeep | 2 | Host conventions, evaluation scripts and model behavior evolve. |

Aggregate: **incomplete — withheld**. Weights are provisional editorial choices. Expected developer benefit and burden are predictions from the artifact, not measured outcomes.

## Evidence and limits

Evidence remains **reviewed**. This pass adds no activation, installation or matched-outcome evidence. Existing records, where present, cover only the scope they describe. Host overlap is compared with the recorded catalog alternatives; this is not a fresh audit of every host release.

Previous curator notes, retained as history rather than newly verified facts: A reference-grade evaluation method, but a 33 KB body with sections specific to Claude. Both hosts already ship a skill creator, so install it only when the built-in one is missing.

Open inspection gaps:

- Audit required helpers and the remaining authoring/evaluation instructions before grading dependability.

## Disposition and next evidence

Pending further inspection; retain with an incomplete profile. No payload, installation policy, hooks or tool connections are changed by this rating.

Resolve the named inspection gaps first. A useful next trial would compare the intended task with the named baseline, recording completion, correction effort, interruptions, comprehension and retained human control. Revisit the grades after material source/host changes or consequential failures.
