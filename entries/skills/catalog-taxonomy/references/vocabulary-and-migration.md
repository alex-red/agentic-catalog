# Vocabulary and migration patterns

Use these patterns when designing a registry or changing an established classification system. Adapt storage and naming to the consuming project; this is not a required file format.

## A small vocabulary contract

An illustrative YAML source:

```yaml
schemaVersion: 1
terms:
  - id: reverse_engineering
    label: Reverse engineering
    facet: topic
    aliases: [reverse-engineering, reverse engineering]
    definition: Recovering behavior and structure from existing software or hardware artifacts.
  - id: tdd
    label: Test driven development
    facet: keyword
    aliases: [test driven development, test-driven development]
    definition: Developing behavior through repeated failing-test, implementation and refactoring steps.
```

The first ID illustrates a previously established underscore spelling, not a universal naming rule. Separate identifiers from human labels. A flat `tags` array on content records can reference these concepts while the registry supplies their facets. Separate per-facet arrays can also work when already established or independently validated; avoid maintaining both representations by hand.

Require definitions for terms promoted into discovery controls. A definition should explain inclusion and distinguish neighboring concepts. Search-only keywords need not become a visible “Other” bucket. Scope decisions belong in source metadata and review notes, not runtime model inference.

Treat aliases as equivalent expressions within the declared vocabulary scope. Normalize case, spacing and punctuation consistently, checking collisions against canonical IDs, labels and other aliases. Multiword aliases must match phrases or tokens deliberately; substring expansion can create unrelated matches. Acronyms with several meanings need qualification or a user choice. Do not turn every user phrase into a global synonym.

## Relationships and navigation

Store broader-term links only where meaningful. Check references and cycles; define whether multiple parents are supported. Never infer parentage from co-occurrence, tool dependencies, folder locations or editorial collection membership. A topic filter can include descendants without storing every ancestor on each record.

For cross-cutting records, match every applicable topic. If a tree needs one primary location, specify its presentation rule independently of filter membership and counts. Featured or experimental listings may affect placement while topic discovery still finds the record.

These distinctions draw on [W3C SKOS](https://www.w3.org/TR/skos-primer/): concept identity, preferred/alternative wording, broader/narrower relationships and associative links serve different purposes. A YAML or JSON implementation can use those ideas without RDF, an ontology engine or automatic inference. The installed method is self-contained; links supply background rather than remote instructions to load.

## Filter and ranking checks

For OR-within / AND-across browsing, a record matches when each selected facet has at least one matching value. Empty selections impose no restriction. Apply compatibility fields according to their declared semantics, not literal tag equality.

For contextual counts, evaluate the query and all selected facets except the one being counted; count distinct records with each candidate value. These counts describe matches under other constraints, not necessarily the result total after a click. Keep selected zero-count values visible and clearable. Deduplicate records matching several values or descendant paths.

Share normalization, vocabulary lookup and alias handling between search surfaces. A global command palette and a filtered list can intentionally search different scopes. Test phrase queries, punctuation variants and out-of-scope terms; changing token matching can affect existing behavior even without a metadata migration.

Use a small adjudicated set of realistic requests with relevant IDs and reasons, plus plausible irrelevant results. Compare top-k recall, false positives and zero-result cases before and after changes. An alias parity check can verify that two equivalent queries reach the same concepts. Keep retrieval relevance separate from curator ratings or evidence about the cataloged resource itself.

## Migration without losing meaning

1. Snapshot source assignments and current behavior. Identify public URLs, saved filters, APIs and consumers that depend on IDs or schema shape.
2. Register existing concepts and explain ambiguous ones. Preserve rare useful terms. Compare two curators' classifications on a representative sample when scope boundaries remain unclear.
3. Add aliases and search support before removing old spellings. Reject ambiguous aliases rather than resolving them by file order.
4. For a merge, identify the surviving concept and retain an old-ID lookup path. For a split, inspect each affected record; one old ID cannot redirect accurately to several new meanings. Unresolved records need explicit review rather than a guessed assignment.
5. Rebuild generated artifacts through the project's normal tooling. Verify reference closure and consumer compatibility, then tighten validation after existing data is migrated.
6. Record vocabulary revisions and rollback steps in existing project documentation. Measure discovery with the same labeled requests; do not claim a user benefit from schema validity alone.

## Supporting sources

Independently written synthesis, sources reviewed October 29, 2026. No source prose or executable implementation is bundled.

- [SKOS Primer](https://www.w3.org/TR/skos-primer/): concepts, labels and semantic relationships.
- [Backstage descriptor format](https://backstage.io/docs/features/software-catalog/descriptor-format/): structural metadata and free-form tags have distinct roles.
- [DCMI Metadata Terms](https://www.dublincore.org/specifications/dublin-core/dcmi-terms/): subject and resource type are separate metadata properties.
- [GOV.UK taxonomy principles](https://www.gov.uk/government/publications/govuk-topic-taxonomy-principles/govuk-taxonomy-principles): represent actual content, distinguish topics from tasks and formats, and use understandable labels.
- [ONS Taxonomy Best Practice Framework](https://www.ons.gov.uk/methodology/classificationsandstandards/taxonomybestpracticeframework): scope notes, governance and proportional complexity.
- [Algolia faceting](https://www.algolia.com/doc/guides/managing-results/refine-results/faceting): contextual counts and conjunctive/disjunctive refinement. This does not require an Algolia dependency.
