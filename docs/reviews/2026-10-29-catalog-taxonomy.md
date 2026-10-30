# Design catalog taxonomies and facets: human-focused assessment

Reviewed 2026-10-29 (America/Edmonton) by Codex, an AI curator. Rubric: [human-v1](../ratings.md). This is one curator’s source-based judgment, not independent human calibration or a behavioral evaluation.

Developers working on this task: Designing a catalog's tagging system, auditing vocabulary drift, defining discovery filters, or migrating established classification metadata. Declared hosts: any.

Comparison baseline and alternatives: Native model reasoning covers ordinary tags, schemas and search design. domain-modeling maintains domain terminology and ADRs; human-interface-design addresses navigation and interaction; neither specifies catalog concept identity, facet counts and vocabulary migrations together. No catalog-taxonomy equivalent appears in this session's host skill inventory. Reuse an existing project vocabulary instead of introducing a competing registry.

Useful for real discovery problems; adds unjustified ceremony to a small stable tag list.

## Inspection and provenance

Local catalog payload assessed by SHA-256. Exact file digests, source URLs, prior rating and inspection status are recorded under `catalog-taxonomy` in the [assessment manifest](2026-10-29-catalog-assessment-sources.json). Linked source content was treated as data; no installer, upstream helper or integration was executed.

- [entries/skills/catalog-taxonomy/SKILL.md](../../entries/skills/catalog-taxonomy/SKILL.md) — read in full.
- [entries/skills/catalog-taxonomy/references/vocabulary-and-migration.md](../../entries/skills/catalog-taxonomy/references/vocabulary-and-migration.md) — read in full.

Other packaged or fetched files not inspected in this pass: `entries/skills/catalog-taxonomy/LICENSE.txt`.

The grades cover the inspected core and relevant paths. Unread optional examples, adapters, licenses and conditional resources are not cleared by this assessment. Local or upstream tests were not run as behavioral evaluation.

## Grades

| Criterion | Grade (0–4) | Rationale |
| --- | ---: | --- |
| Practical value | 3 | Adds alias, facet and migration semantics to ordinary tagging. |
| Dependability | 3 | Defines ambiguity, hierarchy and query invariants. |
| Cognitive ease | 3 | One registry reduces repeated metadata interpretation. |
| Human control | 4 | Preserves IDs and existing governance. |
| Adoption cost | 3 | Requires an inventory and representative labeled queries. |
| Compatibility | 3 | Reuses authoritative schemas and search semantics. |
| Upkeep | 4 | Self-contained prose with explicit migration contracts. |

Aggregate: **8.0/10**. Weights are provisional editorial choices. Expected developer benefit and burden are predictions from the artifact, not measured outcomes.

## Evidence and limits

Evidence remains **reviewed**. This pass adds no activation, installation or matched-outcome evidence. Existing records, where present, cover only the scope they describe. Host overlap is compared with the recorded catalog alternatives; this is not a fresh audit of every host release.

Previous curator notes, retained as history rather than newly verified facts: Focused synthesis with concept boundaries, alias collision handling, multi-topic discovery, contextual counts and merge/split migration guidance. Native agents can propose tags and schemas; this adds explicit semantics and compatibility constraints. No trigger trial, retrieval benchmark, user study or matched outcome evaluation has been run.

## Disposition and next evidence

Keep for the stated use, subject to the limits below. No payload, installation policy, hooks or tool connections are changed by this rating.

A useful next trial would compare the intended task with the named baseline, recording completion, correction effort, interruptions, comprehension and retained human control. Revisit the grades after material source/host changes or consequential failures.
