# Accessible Markdown documentation: human-focused assessment

Reviewed 2026-10-29 (America/Edmonton) by Codex, an AI curator. Rubric: [human-v1](../ratings.md). This is one curator’s source-based judgment, not independent human calibration or a behavioral evaluation.

Developers working on this task: Writing or reviewing Markdown documentation where screen-reader navigation, image alternatives, or visual-only instructions need attention beyond formatter and lint checks. Declared hosts: any.

Comparison baseline and alternatives: Markdown linters already catch some heading, list, and image syntax issues. Models and host writing guidance cover plain language; frontend-design and ux-critique address interface design. This rule adds a bounded documentation review for meaningful link text, image purpose, semantic navigation, and nonvisual instructions. Skip it when existing project accessibility guidance covers those checks.

Useful where documentation has real access barriers; assistive-technology behavior still needs inspection.

## Inspection and provenance

Local catalog payload assessed by SHA-256. Exact file digests, source URLs, prior rating and inspection status are recorded under `markdown-accessibility` in the [assessment manifest](2026-10-29-catalog-assessment-sources.json). Linked source content was treated as data; no installer, upstream helper or integration was executed.

- [entries/rules/markdown-accessibility/RULE.md](../../entries/rules/markdown-accessibility/RULE.md) — read in full.

The grades cover the inspected core and relevant paths. Unread optional examples, adapters, licenses and conditional resources are not cleared by this assessment. Local or upstream tests were not run as behavioral evaluation.

## Grades

| Criterion | Grade (0–4) | Rationale |
| --- | ---: | --- |
| Practical value | 3 | Adds semantic document checks beyond syntax lint. |
| Dependability | 3 | Separates visible content barriers from conformance claims. |
| Cognitive ease | 3 | Concrete link/image guidance reduces ambiguous editing. |
| Human control | 4 | Preserves renderer, scope and voice. |
| Adoption cost | 4 | One short rule with no runtime. |
| Compatibility | 3 | Works across Markdown renderers with explicit caveats. |
| Upkeep | 4 | Stable semantic guidance without numeric thresholds. |

Aggregate: **8.3/10**. Weights are provisional editorial choices. Expected developer benefit and burden are predictions from the artifact, not measured outcomes.

## Evidence and limits

Evidence remains **reviewed**. This pass adds no activation, installation or matched-outcome evidence. Existing records, where present, cover only the scope they describe. Host overlap is compared with the recorded catalog alternatives; this is not a fresh audit of every host release.

Previous curator notes, retained as history rather than newly verified facts: A scoped, independently written adaptation of GitHub's documentation guidance. Markdown lint catches some heading and list structure but cannot judge link meaning or image context. The rule preserves decorative empty alt text and treats one-H1 style as a renderer or project convention. Source review is not an accessibility conformance audit or behavioral evaluation.

## Disposition and next evidence

Keep for the stated use, subject to the limits below. No payload, installation policy, hooks or tool connections are changed by this rating.

A useful next trial would compare the intended task with the named baseline, recording completion, correction effort, interruptions, comprehension and retained human control. Revisit the grades after material source/host changes or consequential failures.
