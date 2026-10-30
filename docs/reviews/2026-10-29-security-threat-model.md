# Repository threat model: human-focused assessment

Reviewed 2026-10-29 (America/Edmonton) by Codex, an AI curator. Rubric: [human-v1](../ratings.md). This is one curator’s source-based judgment, not independent human calibration or a behavioral evaluation.

Developers working on this task: Someone explicitly asks for a threat model or abuse-path analysis of a codebase or service. Declared hosts: any.

Comparison baseline and alternatives: Claude Code /security-review and Codex /review inspect diffs. Neither builds a whole-system threat model.

Useful for explicit threat modeling; fixed report naming and mandatory confirmation need project-sensitive use.

## Inspection and provenance

Pinned upstream revision: `5c8f1e26803bcfaffeceef1e7accbcf7e388417a`. Exact file digests, source URLs, prior rating and inspection status are recorded under `security-threat-model` in the [assessment manifest](2026-10-29-catalog-assessment-sources.json). Linked source content was treated as data; no installer, upstream helper or integration was executed.

- [entries/skills/security-threat-model/SKILL.md](../../entries/skills/security-threat-model/SKILL.md) — read in full.
- [entries/skills/security-threat-model/references/prompt-template.md](../../entries/skills/security-threat-model/references/prompt-template.md) — read in full.

Other packaged or fetched files not inspected in this pass: `entries/skills/security-threat-model/LICENSE.txt`, `entries/skills/security-threat-model/agents/openai.yaml`, `entries/skills/security-threat-model/references/security-controls-and-assets.md`.

The grades cover the inspected core and relevant paths. Unread optional examples, adapters, licenses and conditional resources are not cleared by this assessment. Local or upstream tests were not run as behavioral evaluation.

## Grades

| Criterion | Grade (0–4) | Rationale |
| --- | ---: | --- |
| Practical value | 3 | Whole-system abuse paths differ from diff review. |
| Dependability | 3 | Requires repository evidence and explicit assumptions. |
| Cognitive ease | 3 | Small high-quality threat set helps; mandatory pause adds friction. |
| Human control | 3 | Confirms consequential context, but writes a prescribed report file. |
| Adoption cost | 3 | No runtime; broad system extraction still costs attention. |
| Compatibility | 3 | Portable reasoning with fixed output and question conventions. |
| Upkeep | 2 | Deprecated upstream and reference contract are locally owned. |

Aggregate: **7.4/10**. Weights are provisional editorial choices. Expected developer benefit and burden are predictions from the artifact, not measured outcomes.

## Evidence and limits

Evidence remains **reviewed**. This pass adds no activation, installation or matched-outcome evidence. Existing records, where present, cover only the scope they describe. Host overlap is compared with the recorded catalog alternatives; this is not a fresh audit of every host release.

Previous curator notes, retained as history rather than newly verified facts: Well scoped, with explicit negative triggers, and it insists on evidence for every claim. Upstream is deprecated and frozen since February 2026, so this pinned copy is effectively owned here.

## Disposition and next evidence

Keep for the stated use, subject to the limits below. No payload, installation policy, hooks or tool connections are changed by this rating.

A useful next trial would compare the intended task with the named baseline, recording completion, correction effort, interruptions, comprehension and retained human control. Revisit the grades after material source/host changes or consequential failures.
