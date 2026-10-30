# Prevent disabling tests: human-focused assessment

Reviewed 2026-10-29 (America/Edmonton) by Codex, an AI curator. Rubric: [human-v1](../ratings.md). This is one curator’s source-based judgment, not independent human calibration or a behavioral evaluation.

Developers working on this task: Agents have made failing suites pass by removing or skipping tests instead of fixing code. Declared hosts: claude-code.

Comparison baseline and alternatives: stop-gate-checks checks results; test-driven-development guides process. This targets an evasion those checks do not detect. CI and human review remain needed.

A heuristic tripwire for named test removals, not semantic test integrity or comprehensive write protection.

## Inspection and provenance

Pinned upstream revision: `63e0354bdf6ec56dd508d8ceef33b416ab6d8b14`. Exact file digests, source URLs, prior rating and inspection status are recorded under `protect-tests` in the [assessment manifest](2026-10-29-catalog-assessment-sources.json). Linked source content was treated as data; no installer, upstream helper or integration was executed.

- [plugins/protect-tests/README.md](https://raw.githubusercontent.com/karanb192/claude-code-hooks/63e0354bdf6ec56dd508d8ceef33b416ab6d8b14/plugins/protect-tests/README.md) — read in full.
- [plugins/protect-tests/.claude-plugin/plugin.json](https://raw.githubusercontent.com/karanb192/claude-code-hooks/63e0354bdf6ec56dd508d8ceef33b416ab6d8b14/plugins/protect-tests/.claude-plugin/plugin.json) — read in full.
- [plugins/protect-tests/hooks/hooks.json](https://raw.githubusercontent.com/karanb192/claude-code-hooks/63e0354bdf6ec56dd508d8ceef33b416ab6d8b14/plugins/protect-tests/hooks/hooks.json) — read in full.
- [plugins/protect-tests/protect-tests.js](https://raw.githubusercontent.com/karanb192/claude-code-hooks/63e0354bdf6ec56dd508d8ceef33b416ab6d8b14/plugins/protect-tests/protect-tests.js) — read in full.

Other packaged or fetched files not inspected in this pass: `plugins/protect-tests/tests/protect-tests.test.js`.

The grades cover the inspected core and relevant paths. Unread optional examples, adapters, licenses and conditional resources are not cleared by this assessment. Local or upstream tests were not run as behavioral evaluation.

## Grades

| Criterion | Grade (0–4) | Rationale |
| --- | ---: | --- |
| Practical value | 3 | Targets test deletion/skip evasion missed by a green gate. |
| Dependability | 2 | Path/marker heuristics miss assertion weakening and other writes. |
| Cognitive ease | 3 | Concrete denies help but can reject legitimate skips. |
| Human control | 3 | No edits; intentional removals need a separate approved path. |
| Adoption cost | 3 | Requires Node and a chosen safety level. |
| Compatibility | 3 | Coverage depends on host edit tools and test naming. |
| Upkeep | 3 | Small script; framework skip syntax evolves. |

Aggregate: **7.0/10**. Weights are provisional editorial choices. Expected developer benefit and burden are predictions from the artifact, not measured outcomes.

## Evidence and limits

Evidence remains **reviewed**. This pass adds no activation, installation or matched-outcome evidence. Existing records, where present, cover only the scope they describe. Host overlap is compared with the recorded catalog alternatives; this is not a fresh audit of every host release.

Previous curator notes, retained as history rather than newly verified facts: A heuristic for named paths and skip markers, not semantic test integrity. It can reject legitimate skips and misses assertion weakening, interpreter writes, and some deletion syntax. Default high does not screen whole-file Write; strict does.

## Disposition and next evidence

Keep for the stated use, subject to the limits below. No payload, installation policy, hooks or tool connections are changed by this rating.

A useful next trial would compare the intended task with the named baseline, recording completion, correction effort, interruptions, comprehension and retained human control. Revisit the grades after material source/host changes or consequential failures.
