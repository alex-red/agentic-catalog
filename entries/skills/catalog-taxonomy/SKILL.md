---
name: catalog-taxonomy
description: Design or audit tags, controlled vocabularies, taxonomies, and search facets for catalogs and content libraries. Use when defining classification metadata, resolving tag drift, improving discovery, or planning a vocabulary migration; not for ordinary record tagging against an established vocabulary.
license: MIT
---

# Design catalog taxonomies and facets

Build a classification system that helps people and agents find and compare the catalog's actual content. Produce the requested design, audit findings, or implementation; scale the work to the catalog and preserve its existing IDs, contracts and authoring conventions.

## Ground the model in discovery tasks

Inspect authoritative records, metadata schemas, search behavior and navigation. Identify who is searching, what decisions the results support, and representative queries with expected relevant entries. Count distinct tags, assignments and single-use terms where useful, but do not treat frequency as quality: one specialist tool can justify a rare tag.

Distinguish observed misses from suspected problems. Without query logs or user trials, describe retrieval improvements as hypotheses. Do not invent a hierarchy of subjects the catalog does not yet contain.

## Separate the questions metadata answers

Keep authoritative fields for resource type, compatibility, provenance, lifecycle and evidence. Avoid recreating those facts as independently maintained tags. Classification must not imply installation permission, dependency requirements or verified quality.

Choose independent facets from actual discovery questions. Topic (what area?), Task (what job?) and Technology (what tool or stack?) are useful starting points, not mandatory fields. Permit multiple relevant values and absent values where appropriate. Preserve specialist concepts as searchable keywords when a prominent facet would add clutter. Introduce methods, audiences or lifecycle events as separate facets only when the content and queries justify them.

A topic can span skills, workflows and tools. A navigation group need not own an entry exclusively. Editorial collections express chosen combinations; sharing a tag does not mean every matching entry should be installed or used together.

## Define concepts before spelling rules

Use a shared vocabulary to explain tag IDs rather than repeating definitions on every record. Give promoted concepts a stable ID, readable label, scope definition and facet. Add aliases for equivalent wording. Read [vocabulary and migration patterns](references/vocabulary-and-migration.md) when specifying the registry, relationships, search semantics or a migration.

Separate equivalent wording, broader/narrower meaning and related concepts. “Test driven development” can be an alias of `tdd`; `testing` is broader, and code review is related. Do not collapse concepts merely because they co-occur. Define exclusions when neighboring terms are difficult to distinguish.

Preserve established IDs, including intentional punctuation conventions. Normalize spelling for lookup without silently renaming stored values. Detect alias collisions across concepts. Qualify ambiguous labels instead of guessing. Add hierarchy only when it helps a demonstrated browsing task; related links do not imply ancestry or synonymy.

## Make retrieval behavior explicit

Document how values combine. OR within a facet and AND across facets is a useful browsing default; some tasks need explicit “match all.” Specify broad-topic descendant inclusion separately from exact tags. Narrow-topic selection must not automatically include every broadly tagged record.

Define counts, deduplication and zero-result behavior. A useful count for each value applies the text query and other facets while omitting that facet's current selections. Explain whether the count means matching records or an incremental change. Keep selected values removable even with no matches.

Share canonicalization and alias resolution across search surfaces while preserving intentional differences in scope. Prefer exact titles, IDs and concepts over alias-only matches when appropriate. Related concepts can suggest refinements; they should not silently expand exact filters. Choose ranking through labeled queries rather than arbitrary quality claims.

## Deliver a maintainable design

Include the vocabulary contract, representative record mappings, filter/search semantics, compatibility plan and checks needed for the requested change. Follow the project's source and generation pipeline; installable guidance must work without this catalog checkout or live source fetching.

For an audit, report the location, evidence, discovery consequence and remedy. For implementation, migrate incrementally with explicit merges/splits, preserved lookup paths and rollback. Keep new-term review in the existing contribution process; do not introduce a separate service or approval workflow without a demonstrated need.

Check meaningful invariants such as unresolved IDs, alias ambiguity, duplicate concept assignments and hierarchy cycles when those features exist. Compare retrieval against queries labeled before tuning, including specialist terms and negative cases. Report checks separately from user comprehension, skill activation or measured task outcomes. When no behavioral trial was run, say so.
