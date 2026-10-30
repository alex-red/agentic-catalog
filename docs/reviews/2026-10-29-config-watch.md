# Watch configuration changes: human-focused assessment

Reviewed 2026-10-29 (America/Edmonton) by Codex, an AI curator. Rubric: [human-v1](../ratings.md). This is one curator’s source-based judgment, not independent human calibration or a behavioral evaluation.

Developers working on this task: Installers or other processes may alter agent settings while a session runs. Declared hosts: claude-code.

Comparison baseline and alternatives: Complements config-guard by watching configuration reloads rather than agent tool inputs; native ConfigChange supplies the event.

Useful visibility tripwire; audit raw-payload retention and keep block mode an explicit choice.

## Inspection and provenance

Pinned upstream revision: `63e0354bdf6ec56dd508d8ceef33b416ab6d8b14`. Exact file digests, source URLs, prior rating and inspection status are recorded under `config-watch` in the [assessment manifest](2026-10-29-catalog-assessment-sources.json). Linked source content was treated as data; no installer, upstream helper or integration was executed.

- [plugins/config-watch/README.md](https://raw.githubusercontent.com/karanb192/claude-code-hooks/63e0354bdf6ec56dd508d8ceef33b416ab6d8b14/plugins/config-watch/README.md) — read in full.
- [plugins/config-watch/.claude-plugin/plugin.json](https://raw.githubusercontent.com/karanb192/claude-code-hooks/63e0354bdf6ec56dd508d8ceef33b416ab6d8b14/plugins/config-watch/.claude-plugin/plugin.json) — read in full.
- [plugins/config-watch/config-watch.js](https://raw.githubusercontent.com/karanb192/claude-code-hooks/63e0354bdf6ec56dd508d8ceef33b416ab6d8b14/plugins/config-watch/config-watch.js) — read in full.
- [plugins/config-watch/hooks/hooks.json](https://raw.githubusercontent.com/karanb192/claude-code-hooks/63e0354bdf6ec56dd508d8ceef33b416ab6d8b14/plugins/config-watch/hooks/hooks.json) — read in full.

Other packaged or fetched files not inspected in this pass: `plugins/config-watch/tests/config-watch.test.js`.

The grades cover the inspected core and relevant paths. Unread optional examples, adapters, licenses and conditional resources are not cleared by this assessment. Local or upstream tests were not run as behavioral evaluation.

## Grades

| Criterion | Grade (0–4) | Rationale |
| --- | ---: | --- |
| Practical value | 3 | Makes out-of-band configuration changes visible. |
| Dependability | 2 | Undocumented payload assumptions and fail-open parsing limit guarantees. |
| Cognitive ease | 3 | Warnings help detect surprises but may become noisy. |
| Human control | 2 | Raw payload is persisted locally without redaction. |
| Adoption cost | 3 | Requires Node, registration and local log management. |
| Compatibility | 3 | Specific ConfigChange contract and legitimate edits need calibration. |
| Upkeep | 2 | Host payload shape and retained logs need upkeep. |

Aggregate: **6.5/10**. Weights are provisional editorial choices. Expected developer benefit and burden are predictions from the artifact, not measured outcomes.

## Evidence and limits

Evidence remains **reviewed**. This pass adds no activation, installation or matched-outcome evidence. Existing records, where present, cover only the scope they describe. Host overlap is compared with the recorded catalog alternatives; this is not a fresh audit of every host release.

Previous curator notes, retained as history rather than newly verified facts: Warns by default; CONFIG_WATCH_BLOCK=true blocks eligible changes, including intentional user changes. Managed policy cannot be blocked. Full event payloads are logged locally; upstream's undocumented-payload caveat is outdated.

## Disposition and next evidence

Keep for the stated use, subject to the limits below. No payload, installation policy, hooks or tool connections are changed by this rating.

A useful next trial would compare the intended task with the named baseline, recording completion, correction effort, interruptions, comprehension and retained human control. Revisit the grades after material source/host changes or consequential failures.
