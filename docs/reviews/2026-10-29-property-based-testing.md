# Property-based testing (Trail of Bits): human-focused assessment

Reviewed 2026-10-29 (America/Edmonton) by Codex, an AI curator. Rubric: [human-v1](../ratings.md). This is one curator’s source-based judgment, not independent human calibration or a behavioral evaluation.

Developers working on this task: Code has an algebraic shape (encode and decode pairs, parsers, normalizers, comparators, data structures, contract invariants), or existing property tests need review. Declared hosts: any.

Comparison baseline and alternatives: test-driven-development covers the red-green loop, not property design. Models write simple property tests unprompted, but rarely check them for tautology or vacuity.

Useful property design, with all five task references inspected; fixed severity/settings claims and unnecessary refactor suggestions need judgment.

## Inspection and provenance

Pinned upstream revision: `123037ec8aed26f0d86327cc39137ee5043e5deb`. Exact file digests, source URLs, prior rating and inspection status are recorded under `property-based-testing` in the [assessment manifest](2026-10-29-catalog-assessment-sources.json). Linked source content was treated as data; no installer, upstream helper or integration was executed.

- [plugins/property-based-testing/skills/property-based-testing/SKILL.md](https://raw.githubusercontent.com/trailofbits/skills/123037ec8aed26f0d86327cc39137ee5043e5deb/plugins/property-based-testing/skills/property-based-testing/SKILL.md) — read in full.
- [plugins/property-based-testing/skills/property-based-testing/references/generating.md](https://raw.githubusercontent.com/trailofbits/skills/123037ec8aed26f0d86327cc39137ee5043e5deb/plugins/property-based-testing/skills/property-based-testing/references/generating.md) — read in full.
- [plugins/property-based-testing/skills/property-based-testing/references/refactoring.md](https://raw.githubusercontent.com/trailofbits/skills/123037ec8aed26f0d86327cc39137ee5043e5deb/plugins/property-based-testing/skills/property-based-testing/references/refactoring.md) — read in full.
- [plugins/property-based-testing/skills/property-based-testing/references/reviewing.md](https://raw.githubusercontent.com/trailofbits/skills/123037ec8aed26f0d86327cc39137ee5043e5deb/plugins/property-based-testing/skills/property-based-testing/references/reviewing.md) — read in full.
- [plugins/property-based-testing/skills/property-based-testing/references/interpreting-failures.md](https://raw.githubusercontent.com/trailofbits/skills/123037ec8aed26f0d86327cc39137ee5043e5deb/plugins/property-based-testing/skills/property-based-testing/references/interpreting-failures.md) — read in full.
- [plugins/property-based-testing/skills/property-based-testing/references/libraries.md](https://raw.githubusercontent.com/trailofbits/skills/123037ec8aed26f0d86327cc39137ee5043e5deb/plugins/property-based-testing/skills/property-based-testing/references/libraries.md) — read in full.

The grades cover the inspected core and relevant paths. Unread optional examples, adapters, licenses and conditional resources are not cleared by this assessment. Local or upstream tests were not run as behavioral evaluation.

## Grades

| Criterion | Grade (0–4) | Rationale |
| --- | ---: | --- |
| Practical value | 3 | Adds tautology/vacuity and property design beyond TDD. |
| Dependability | 2 | Core methods help, but zero-case/Hypothesis claims and refactoring generalizations are overstated. |
| Cognitive ease | 3 | Task routing avoids loading all domain material. |
| Human control | 4 | A new PBT dependency is explicitly the user choice. |
| Adoption cost | 3 | Needs generators, useful oracles and relevant library knowledge. |
| Compatibility | 3 | Reuses a project library and excludes unrelated test methods. |
| Upkeep | 3 | Multiple language libraries and examples require maintenance. |

Aggregate: **7.4/10**. Weights are provisional editorial choices. Expected developer benefit and burden are predictions from the artifact, not measured outcomes.

## Evidence and limits

Evidence remains **reviewed**. This pass adds no activation, installation or matched-outcome evidence. Existing records, where present, cover only the scope they describe. Host overlap is compared with the recorded catalog alternatives; this is not a fresh audit of every host release.

Previous curator notes, retained as history rather than newly verified facts: Strong test-design guidance beyond a TDD loop, with task-specific references that load on demand. It treats adding a testing library as the user's decision. Linked rather than vendored because the repository is CC-BY-SA-4.0. Upstream ships its own eval prompts; we have not run them.

## Disposition and next evidence

Keep for the stated use, subject to the limits below. No payload, installation policy, hooks or tool connections are changed by this rating.

A useful next trial would compare the intended task with the named baseline, recording completion, correction effort, interruptions, comprehension and retained human control. Revisit the grades after material source/host changes or consequential failures.
