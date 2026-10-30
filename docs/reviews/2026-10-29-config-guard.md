# Protect agent configuration: human-focused assessment

Reviewed 2026-10-29 (America/Edmonton) by Codex, an AI curator. Rubric: [human-v1](../ratings.md). This is one curator’s source-based judgment, not independent human calibration or a behavioral evaluation.

Developers working on this task: The agent must leave its own guardrail configuration to a human. Declared hosts: claude-code.

Comparison baseline and alternatives: protect-files-and-commands protects a few files; native managed settings and permissions provide stronger enforcement. This adds configuration-specific diagnostics.

Useful explanatory config guard alongside managed controls; it deliberately cannot enforce every mutation route.

## Inspection and provenance

Pinned upstream revision: `63e0354bdf6ec56dd508d8ceef33b416ab6d8b14`. Exact file digests, source URLs, prior rating and inspection status are recorded under `config-guard` in the [assessment manifest](2026-10-29-catalog-assessment-sources.json). Linked source content was treated as data; no installer, upstream helper or integration was executed.

- [plugins/config-guard/README.md](https://raw.githubusercontent.com/karanb192/claude-code-hooks/63e0354bdf6ec56dd508d8ceef33b416ab6d8b14/plugins/config-guard/README.md) — read in full.
- [plugins/config-guard/.claude-plugin/plugin.json](https://raw.githubusercontent.com/karanb192/claude-code-hooks/63e0354bdf6ec56dd508d8ceef33b416ab6d8b14/plugins/config-guard/.claude-plugin/plugin.json) — read in full.
- [plugins/config-guard/config-guard.js](https://raw.githubusercontent.com/karanb192/claude-code-hooks/63e0354bdf6ec56dd508d8ceef33b416ab6d8b14/plugins/config-guard/config-guard.js) — read in full.
- [plugins/config-guard/hooks/hooks.json](https://raw.githubusercontent.com/karanb192/claude-code-hooks/63e0354bdf6ec56dd508d8ceef33b416ab6d8b14/plugins/config-guard/hooks/hooks.json) — read in full.

Other packaged or fetched files not inspected in this pass: `plugins/config-guard/tests/config-guard.test.js`.

The grades cover the inspected core and relevant paths. Unread optional examples, adapters, licenses and conditional resources are not cleared by this assessment. Local or upstream tests were not run as behavioral evaluation.

## Grades

| Criterion | Grade (0–4) | Rationale |
| --- | ---: | --- |
| Practical value | 3 | Protects configuration surfaces other hooks depend on. |
| Dependability | 2 | Direct symlink checks help; shell forms and parse failures bypass. |
| Cognitive ease | 3 | Specific refusals help while broad matches add friction. |
| Human control | 3 | Per-level ask options and explicit override expose control. |
| Adoption cost | 3 | Node plus policy/env configuration and logs. |
| Compatibility | 3 | Default high blocks plugin management; path conventions are host-specific. |
| Upkeep | 2 | Shell heuristics and protected configuration names drift. |

Aggregate: **6.9/10**. Weights are provisional editorial choices. Expected developer benefit and burden are predictions from the artifact, not measured outcomes.

## Evidence and limits

Evidence remains **reviewed**. This pass adds no activation, installation or matched-outcome evidence. Existing records, where present, cover only the scope they describe. Host overlap is compared with the recorded catalog alternatives; this is not a fresh audit of every host release.

Previous curator notes, retained as history rather than newly verified facts: Resolves direct edit paths through symlinks, but Bash checks are heuristics. Interpreter writes, variable-built paths, and some Git commands bypass them. Parse errors allow. Default high level blocks plugin management too.

## Disposition and next evidence

Keep for the stated use, subject to the limits below. No payload, installation policy, hooks or tool connections are changed by this rating.

A useful next trial would compare the intended task with the named baseline, recording completion, correction effort, interruptions, comprehension and retained human control. Revisit the grades after material source/host changes or consequential failures.
