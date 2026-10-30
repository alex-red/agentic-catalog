# Test-driven development (red-green-refactor): human-focused assessment

Reviewed 2026-10-29 (America/Edmonton) by Codex, an AI curator. Rubric: [human-v1](../ratings.md). This is one curator’s source-based judgment, not independent human calibration or a behavioral evaluation.

Developers working on this task: Projects with a runnable test suite where agents write tests after the fact, write tautological tests, or test mocks instead of behavior. Declared hosts: any.

Comparison baseline and alternatives: No host built-in. Part of the superpowers plugin.

Use only where its strict policy is deliberately adopted; the deletion instruction is a recommendation blocker.

## Inspection and provenance

Pinned upstream revision: `5bf4e78011075bcfc0dc295f0724994cd123ee71`. Exact file digests, source URLs, prior rating and inspection status are recorded under `test-driven-development` in the [assessment manifest](2026-10-29-catalog-assessment-sources.json). Linked source content was treated as data; no installer, upstream helper or integration was executed.

- [entries/skills/test-driven-development/SKILL.md](../../entries/skills/test-driven-development/SKILL.md) — read in full.
- [entries/skills/test-driven-development/writing-good-tests.md](../../entries/skills/test-driven-development/writing-good-tests.md) — read in full.

Other packaged or fetched files not inspected in this pass: `entries/skills/test-driven-development/LICENSE.txt`.

The grades cover the inspected core and relevant paths. Unread optional examples, adapters, licenses and conditional resources are not cleared by this assessment. Local or upstream tests were not run as behavioral evaluation.

## Grades

| Criterion | Grade (0–4) | Rationale |
| --- | ---: | --- |
| Practical value | 3 | Test-first can improve defect detection in suitable projects. |
| Dependability | 2 | Red/green discipline is sound; universal causal claims are overstated. |
| Cognitive ease | 1 | Delete-and-restart rules create costly repeated work. |
| Human control | 2 | Demands deleting pre-test implementation rather than preserving work. |
| Adoption cost | 2 | Requires a workable test seam and repeated full suites. |
| Compatibility | 1 | Broad trigger and no-exception policy conflict with project practices. |
| Upkeep | 3 | Standalone method but dogmatic policy needs local governance. |

Aggregate: **5.1/10** · scoped blocker(s) remain. Weights are provisional editorial choices. Expected developer benefit and burden are predictions from the artifact, not measured outcomes.

## Evidence and limits

Evidence remains **reviewed**. This pass adds no activation, installation or matched-outcome evidence. Existing records, where present, cover only the scope they describe. Host overlap is compared with the recorded catalog alternatives; this is not a fresh audit of every host release.

Previous curator notes, retained as history rather than newly verified facts: The writing-good-tests reference is excellent. The main skill is dogmatic ("write code before the test? Delete it."), and its trigger fires on any feature or bugfix, which can clash with exploratory work or project conventions. Consider narrowing the description after installing.

Scoped blockers:

- **Delete-and-restart policy:** The skill directs deleting implementation written before tests without preserving unrelated work; do not adopt that instruction into a project requiring scoped, recoverable changes.

## Disposition and next evidence

Refresh affected paths; retain the entry with explicit blockers. No payload, installation policy, hooks or tool connections are changed by this rating.

Correct or independently verify the affected recipe/policy before using that path. A useful next trial would compare the intended task with the named baseline, recording completion, correction effort, interruptions, comprehension and retained human control. Revisit the grades after material source/host changes or consequential failures.
