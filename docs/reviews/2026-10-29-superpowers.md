# Superpowers: human-focused assessment

Reviewed 2026-10-29 (America/Edmonton) by Codex, an AI curator. Rubric: [human-v1](../ratings.md). This is one curator’s source-based judgment, not independent human calibration or a behavioral evaluation.

Developers working on this task: A team wants a complete, enforced spec-to-merge workflow rather than individual techniques. Declared hosts: claude-code, codex.

Comparison baseline and alternatives: Plan mode and the review commands in both hosts cover part of it. It also contains verification-before-completion, test-driven-development, and a systematic-debugging skill.

High process cost; document-specific deletion and compulsory routing rules need revision before broad use.

## Inspection and provenance

Pinned upstream revision: `bb92a77741419a4ab5f06e711a283343f1ada0c3`. Exact file digests, source URLs, prior rating and inspection status are recorded under `superpowers` in the [assessment manifest](2026-10-29-catalog-assessment-sources.json). Linked source content was treated as data; no installer, upstream helper or integration was executed.

- [README.md](https://raw.githubusercontent.com/obra/superpowers/bb92a77741419a4ab5f06e711a283343f1ada0c3/README.md) — read selected line ranges: lines 1–85, 308–324, 398–400.

The listed excerpts support partial judgments only. Unlisted runtime, required references and transitive dependencies are outside coverage; no aggregate is assigned.

## Grades

| Criterion | Grade (0–4) | Rationale |
| --- | ---: | --- |
| Practical value | 3 | A complete method can structure larger changes where native planning is insufficient. |
| Dependability | Not graded | Bootstrap, skills, hooks and companion runtime are not fully inspected. |
| Cognitive ease | 1 | Mandatory skill checks, staged approvals and task-level reviews add high recurring overhead. |
| Human control | 1 | Documented mandatory workflows and deletion of pre-test code can override developer intent. |
| Adoption cost | 2 | Install separately per host and adopt interdependent skills. |
| Compatibility | 2 | Several hosts are documented but their native planning and review conventions overlap. |
| Upkeep | 2 | Bootstrap, companion and host adapters require coordinated upkeep. |

Aggregate: **incomplete — withheld** · scoped blocker(s) remain. Weights are provisional editorial choices. Expected developer benefit and burden are predictions from the artifact, not measured outcomes.

## Evidence and limits

Evidence remains **reviewed**. This pass adds no activation, installation or matched-outcome evidence. Existing records, where present, cover only the scope they describe. Host overlap is compared with the recorded catalog alternatives; this is not a fresh audit of every host release.

Previous curator notes, retained as history rather than newly verified facts: The most adopted skills library, and actively released (v7.0.0 on 2026-10-10). Its always-on bootstrap skill forces a skill check before every reply, which is heavy for small tasks and competes with host plan mode. Its skills reference each other, so install it whole or vendor single skills.

Open inspection gaps:

- Audit bootstrap, skill bodies, hooks and optional companion; README workflow claims do not establish behavioral dependability.

Scoped blockers:

- **Mandatory delete-before-tests workflow:** The pinned README explicitly describes deleting code written before tests. Preserve user work and existing authorization instead of adopting that instruction.

## Disposition and next evidence

Refresh affected paths; retain the entry with explicit blockers. No payload, installation policy, hooks or tool connections are changed by this rating.

Resolve the named inspection gaps first. Correct or independently verify the affected recipe/policy before using that path. A useful next trial would compare the intended task with the named baseline, recording completion, correction effort, interruptions, comprehension and retained human control. Revisit the grades after material source/host changes or consequential failures.
