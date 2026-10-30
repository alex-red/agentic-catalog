# Find expensive context files: human-focused assessment

Reviewed 2026-10-29 (America/Edmonton) by Codex, an AI curator. Rubric: [human-v1](../ratings.md). This is one curator’s source-based judgment, not independent human calibration or a behavioral evaluation.

Developers working on this task: Large generated files or repeated reads appear to consume disproportionate context. Declared hosts: claude-code.

Comparison baseline and alternatives: Claude's context display shows current context; this adds persistent per-file estimates. No automatic read denial or instruction activation occurs.

Useful estimates, not billing; inspect suggested exclusions and account for local ledger/privacy costs.

## Inspection and provenance

Pinned upstream revision: `68238bcbfcd628a458548dbb92c02a414df8f975`. Exact file digests, source URLs, prior rating and inspection status are recorded under `context-hogs` in the [assessment manifest](2026-10-29-catalog-assessment-sources.json). Linked source content was treated as data; no installer, upstream helper or integration was executed.

- [plugins/context-hogs/README.md](https://raw.githubusercontent.com/karanb192/claude-code-hooks/68238bcbfcd628a458548dbb92c02a414df8f975/plugins/context-hogs/README.md) — read in full.
- [plugins/context-hogs/.claude-plugin/plugin.json](https://raw.githubusercontent.com/karanb192/claude-code-hooks/68238bcbfcd628a458548dbb92c02a414df8f975/plugins/context-hogs/.claude-plugin/plugin.json) — read in full.
- [plugins/context-hogs/context-hogs.js](https://raw.githubusercontent.com/karanb192/claude-code-hooks/68238bcbfcd628a458548dbb92c02a414df8f975/plugins/context-hogs/context-hogs.js) — read in full.
- [plugins/context-hogs/hooks/hooks.json](https://raw.githubusercontent.com/karanb192/claude-code-hooks/68238bcbfcd628a458548dbb92c02a414df8f975/plugins/context-hogs/hooks/hooks.json) — read in full.
- [plugins/context-hogs/skills/leaderboard/SKILL.md](https://raw.githubusercontent.com/karanb192/claude-code-hooks/68238bcbfcd628a458548dbb92c02a414df8f975/plugins/context-hogs/skills/leaderboard/SKILL.md) — read in full.

Other packaged or fetched files not inspected in this pass: `plugins/context-hogs/tests/context-hogs.test.js`.

The grades cover the inspected core and relevant paths. Unread optional examples, adapters, licenses and conditional resources are not cleared by this assessment. Local or upstream tests were not run as behavioral evaluation.

## Grades

| Criterion | Grade (0–4) | Rationale |
| --- | ---: | --- |
| Practical value | 3 | Adds per-file context estimates beyond total token counts. |
| Dependability | 2 | Attribution is heuristic; ledger compaction can lose concurrent rows. |
| Cognitive ease | 3 | Leaderboard helps prioritize but suggestions can hide needed context. |
| Human control | 3 | Writes local paths/estimates and proposes rather than installs deny rules. |
| Adoption cost | 3 | Node, persistent ledgers and model-rate configuration. |
| Compatibility | 3 | Host result shapes and token pricing vary. |
| Upkeep | 2 | Custom attribution and accumulating state require maintenance. |

Aggregate: **6.9/10**. Weights are provisional editorial choices. Expected developer benefit and burden are predictions from the artifact, not measured outcomes.

## Evidence and limits

Evidence remains **reviewed**. This pass adds no activation, installation or matched-outcome evidence. Existing records, where present, cover only the scope they describe. Host overlap is compared with the recorded catalog alternatives; this is not a fresh audit of every host release.

Previous curator notes, retained as history rather than newly verified facts: Byte-derived token/cost estimates, not billing telemetry. Read attribution is strongest; shell/search attribution is heuristic. Async events can be lost at shutdown and compaction can lose concurrent rows. Suggestions do not modify project instructions.

## Disposition and next evidence

Keep for the stated use, subject to the limits below. No payload, installation policy, hooks or tool connections are changed by this rating.

A useful next trial would compare the intended task with the named baseline, recording completion, correction effort, interruptions, comprehension and retained human control. Revisit the grades after material source/host changes or consequential failures.
