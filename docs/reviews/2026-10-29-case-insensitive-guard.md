# Catch filesystem case collisions: human-focused assessment

Reviewed 2026-10-29 (America/Edmonton) by Codex, an AI curator. Rubric: [human-v1](../ratings.md). This is one curator’s source-based judgment, not independent human calibration or a behavioral evaluation.

Developers working on this task: Agents delete or overwrite similarly capitalized paths on macOS, Windows, or shared case-insensitive drives. Declared hosts: claude-code, codex.

Comparison baseline and alternatives: protect-files-and-commands blocks a few destructive patterns; this addresses actual path spelling collisions that generic command rules miss.

A focused accidental-deletion guard; it cannot replace sandboxing or resolve every dynamic shell target.

## Inspection and provenance

Pinned upstream revision: `63e0354bdf6ec56dd508d8ceef33b416ab6d8b14`. Exact file digests, source URLs, prior rating and inspection status are recorded under `case-insensitive-guard` in the [assessment manifest](2026-10-29-catalog-assessment-sources.json). Linked source content was treated as data; no installer, upstream helper or integration was executed.

- [plugins/case-insensitive-guard/README.md](https://raw.githubusercontent.com/karanb192/claude-code-hooks/63e0354bdf6ec56dd508d8ceef33b416ab6d8b14/plugins/case-insensitive-guard/README.md) — read in full.
- [plugins/case-insensitive-guard/.claude-plugin/plugin.json](https://raw.githubusercontent.com/karanb192/claude-code-hooks/63e0354bdf6ec56dd508d8ceef33b416ab6d8b14/plugins/case-insensitive-guard/.claude-plugin/plugin.json) — read in full.
- [plugins/case-insensitive-guard/case-insensitive-guard.js](https://raw.githubusercontent.com/karanb192/claude-code-hooks/63e0354bdf6ec56dd508d8ceef33b416ab6d8b14/plugins/case-insensitive-guard/case-insensitive-guard.js) — read in full.
- [plugins/case-insensitive-guard/hooks/hooks.json](https://raw.githubusercontent.com/karanb192/claude-code-hooks/63e0354bdf6ec56dd508d8ceef33b416ab6d8b14/plugins/case-insensitive-guard/hooks/hooks.json) — read in full.

Other packaged or fetched files not inspected in this pass: `plugins/case-insensitive-guard/tests/case-insensitive-guard.test.js`.

The grades cover the inspected core and relevant paths. Unread optional examples, adapters, licenses and conditional resources are not cleared by this assessment. Local or upstream tests were not run as behavioral evaluation.

## Grades

| Criterion | Grade (0–4) | Rationale |
| --- | ---: | --- |
| Practical value | 3 | Targets a real case-folding deletion hazard. |
| Dependability | 2 | Models many shell forms but allows dynamic/unknown targets. |
| Cognitive ease | 3 | Typed-versus-actual names make refusals understandable. |
| Human control | 3 | No deletion itself; command logging and ask modes need review. |
| Adoption cost | 3 | Requires Node, filesystem access and registration. |
| Compatibility | 3 | Useful on case-folding volumes; limited shell model. |
| Upkeep | 2 | Large custom shell parser and OS semantics need upkeep. |

Aggregate: **6.9/10**. Weights are provisional editorial choices. Expected developer benefit and burden are predictions from the artifact, not measured outcomes.

## Evidence and limits

Evidence remains **reviewed**. This pass adds no activation, installation or matched-outcome evidence. Existing records, where present, cover only the scope they describe. Host overlap is compared with the recorded catalog alternatives; this is not a fresh audit of every host release.

Previous curator notes, retained as history rather than newly verified facts: Models several shell chains and wrappers without probe writes. Dynamic targets, substitutions, globs, and complete shell semantics remain outside coverage. Exact-case deletes and case-only renames pass. Not a general deletion sandbox. Codex support is a documented direct-script registration for canonical Bash/deny payloads; live invocation remains unverified.

## Disposition and next evidence

Keep for the stated use, subject to the limits below. No payload, installation policy, hooks or tool connections are changed by this rating.

A useful next trial would compare the intended task with the named baseline, recording completion, correction effort, interruptions, comprehension and retained human control. Revisit the grades after material source/host changes or consequential failures.
