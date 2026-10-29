# Tagging patterns for Agentic Catalog

**As of / researched:** October 29, 2026, America/Edmonton. Focused research into catalog discovery and metadata design. Recommendations are design judgments, not measured search improvements or adopted implementation decisions.

**Recommendation:** retain entry-level tag IDs, introduce a controlled vocabulary that explains them, and derive a few independent discovery facets from that vocabulary. Start with Topic, Task and Technology. Preserve specialist keywords for search. Keep type, host compatibility, provenance and evidence in their existing authoritative fields.

## Baseline and observed problems

Reviewed [PLAN.md](../../PLAN.md), [CONTRIBUTING.md](../../CONTRIBUTING.md), [decisions](../decisions.md), the [entry schema](../../catalog/schema/entry.schema.json), source metadata, the [discovery skill](../../skills/agentic-catalog/SKILL.md), and browser category, sidebar and command-search code. The maintainer scout methodology informed source review; this is a metadata study rather than a queue of upstream entries to admit. Existing candidate holds remain in their original reports and are outside this study.

The [audit snapshot](2026-10-29-catalog-tagging-audit.json) reads working-tree `entries/**/entry.yaml`, rather than trusting the generated index. It records every entry's tags and each tag's entry IDs:

| Measure | Observed value |
| --- | --- |
| Entries | 93 |
| Tag assignments | 416 |
| Distinct tags | 200 |
| Tags occurring once | 126 (63% of distinct tags) |
| Mean tags per entry | 4.47 |
| Most frequent tags | frontend (16), code-review (14), verification (13), testing (12), design (10) |

The schema permits 1–8 unique tags per entry, accepting hyphen and underscore separators. It checks spelling shape, not meaning or membership in a vocabulary.

Concrete findings:

- Tags mix subjects (`game-design`), tasks (`code-review`), technologies (`rust`), methods (`tdd`), lifecycle events (`pre-tool-use`) and broad qualities (`simplicity`). Some repeat structured metadata: `experimental`, and sometimes `workflow`.
- There is no shared record explaining what a tag means, which synonyms belong to it, or when to use it. Similar words are not necessarily duplicates: `testing`, `verification` and `evaluation` describe distinguishable work.
- Browser categories currently recognize only `game-design`. `categoryOf()` returns one category, and the primary tree puts entries under experimental/custom, then category, then type. Adding more recognized tags would therefore introduce an implicit first-category preference.
- Reverse-engineering entries intentionally use `reverse_engineering`, per decision 44. That exact ID must be preserved unless a later explicit migration supersedes the decision.
- Sidebar search matches one contiguous query against combined text. Command search requires every whitespace-separated word and ranks title matches first. Neither has a vocabulary alias resolver. These are different matching contracts.

Singletons indicate a long tail, not demonstrated tagging failure. `ghidra`, `tokio` and `codeql` can be valuable even with few entries. There is no query log, user study or labeled retrieval benchmark establishing which terms cause unsuccessful discovery.

## Patterns compared

| Pattern | Strength | Cost or limitation here | Recommendation |
| --- | --- | --- | --- |
| Free-form flat tags | Easy authoring; specialist terms emerge naturally | Meaning and synonyms drift; hundreds of filter choices | Preserve the long tail, add governance |
| Controlled flat vocabulary | Stable IDs, definitions and consistent aliases | Still mixes different discovery questions | First implementation step |
| Faceted classification | Combine subject, task and technology independently | Requires definitions and multi-value filter semantics | Best fit for discovery |
| One deep category tree | Familiar hierarchical browsing | Cross-cutting entries fit several branches; primary placement hides alternatives | Avoid as the sole model |
| Lightweight thesaurus | Separates synonyms, broader concepts and related concepts | Relationships need editorial review | Borrow selectively |
| Full RDF/OWL knowledge graph | Interoperability and formal modeling | Infrastructure and inference exceed the demonstrated need | Defer |
| Embedding or model-only classification | Can match natural-language requests | Harder to inspect; may drift; adds runtime dependencies | Possible later supplement after a baseline |

These approaches are composable: a controlled vocabulary can power faceted navigation and keyword search together.

## What the sources support

The following are borrowed principles; the proposed schema and facet choices below are our interpretation for this catalog.

1. **Separate concept identity from wording.** W3C SKOS distinguishes concepts, preferred labels, alternative labels and semantic relationships. This supports stable IDs with editable display labels and synonyms. A broader concept and an equivalent expression are different relationships; do not merge them. We can use those ideas in YAML without adopting an RDF runtime. [W3C SKOS Primer](https://www.w3.org/TR/skos-primer/), [normative reference](https://www.w3.org/TR/skos-reference/).
2. **Keep different metadata questions distinct.** Backstage's catalog separates tags from structural fields such as kind, type and lifecycle. Dublin Core similarly distinguishes subject from resource type. This supports retaining our existing type, hosts, source and evidence fields rather than duplicating them as discovery tags. [Backstage descriptor format](https://backstage.io/docs/features/software-catalog/descriptor-format/), [DCMI Metadata Terms](https://www.dublincore.org/specifications/dublin-core/dcmi-terms/).
3. **Model the content that exists.** GOV.UK's taxonomy describes its published domain, distinguishes topics from tasks and formats, and names topics in user language. It also supports topic pages that include subtopic content. For us, Topic and Task should be separate facets, and empty aspirational categories should wait for entries. Its government-scale hierarchy and branch-size guidance are not requirements for this library. [GOV.UK taxonomy principles](https://www.gov.uk/government/publications/govuk-topic-taxonomy-principles/govuk-taxonomy-principles).
4. **Make refinement semantics explicit.** Algolia documents contextual facet values/counts and both AND and OR combinations. These are useful interaction patterns, not a recommendation to adopt its service. Our small catalog can calculate them locally. [Algolia faceting](https://www.algolia.com/doc/guides/managing-results/refine-results/faceting).
5. **Govern vocabulary changes.** ONS emphasizes scope notes, clear ownership, proportional complexity and documented revisions. Apply this through ordinary repository review, including a reason for new terms and explicit merge/split records. NISO's controlled-vocabulary standard covers lists, synonym rings, taxonomies and thesauri; only its public abstract was inspected here. [ONS framework](https://www.ons.gov.uk/methodology/classificationsandstandards/taxonomybestpracticeframework), [NISO standard overview](https://www.niso.org/publications/ansiniso-z3919-2005-r2010).

## Proposed model

### 1. Keep entry metadata compact; centralize vocabulary meaning

Add a source file such as `catalog/tags.yaml`. Entries continue storing their existing `tags` array. A draft term record could look like this; it is illustrative, not a new schema implemented by this research:

```yaml
schemaVersion: 1
terms:
  - id: reverse_engineering
    label: Reverse engineering
    facet: topic
    aliases: [reverse-engineering, reverse engineering]
    definition: Recovering behavior and structure from existing software or hardware artifacts.

  - id: code-review
    label: Code review
    facet: task
    aliases: [code review]
    definition: Inspecting proposed changes for actionable defects and maintainability concerns.

  - id: ghidra
    label: Ghidra
    facet: technology
    definition: Guidance or integration specifically involving Ghidra.
```

Require ID, label, definition and facet for promoted terms. Allow `keyword` as a search-only classification for specialist concepts that do not fit the initial facets; do not expose it as a fourth giant filter list. Optional broader-term links can come later when a concrete browsing need justifies them. A replacement field is useful only once there is an actual deprecated term.

Publish the vocabulary alongside the generated index so agents can resolve the same terms as the browser. Keep per-entry metadata and standard skill frontmatter unchanged in the initial migration. Update the discovery skill's metadata documentation if generated fields are eventually added. Use the existing build pipeline for generated indexes.

### 2. Give each facet one clear question

| Facet | Question | Illustrative values from existing coverage |
| --- | --- | --- |
| Topic | What area does this concern? | frontend, game-design, security, reverse_engineering, project-instructions |
| Task | What am I trying to do? | debugging, code-review, planning, research, verification, refactoring |
| Technology | What specific technology does it address? | vue, react, rust, bun, ghidra, playwright |
| Existing structured fields | What form, compatibility or evidence do I need? | type, hosts, source.kind, rating.evidence, experimental |

This is a seed set, not an exhaustive classification of all 200 tags. Trial it on representative entries before deciding whether methods such as `tdd` deserve a separate facet. Classify them as searchable keywords initially rather than forcing an inaccurate assignment.

Technology tags describe substantive coverage, not mandatory dependencies or supported hosts. For example, a portable Ghidra integration can retain `hosts: [any]`. Tags must never grant installation authorization, imply verified quality or determine an entry's behavioral evidence level.

Allow an entry to have multiple topics and tasks. Avoid requiring every portable rule to have a technology. One concept has one primary facet to keep interpretation stable; if curators repeatedly disagree, revise the definition or separate genuinely different meanings.

### 3. Use aliases conservatively

- Preserve `reverse_engineering` as the stored ID. Resolve spaces and the hyphenated spelling to it for discovery.
- `tdd` and “test driven development” can identify the same concept. `testing` is broader; it must not become a synonym of `tdd`.
- Do not merge `design`, `ui`, `ux` and `frontend`. Their intersection is large but their meanings differ. Definitions should establish when each applies.
- Keep `debugging`, `diagnosis` and `root-cause` distinct pending editorial review. Similarity alone does not establish equivalence.
- Treat punctuation variants as lookup normalization, not an instruction to rename stored IDs. Reject registry collisions where two distinct terms normalize to the same alias without disambiguation.
- Keep entry IDs, titles, vocabulary aliases and skill trigger descriptions separate. Search expansion must not rewrite the installed skill's activation description.

### 4. Define discovery behavior

Use OR within a facet and AND across facets. For example:

```text
(Topic = frontend OR game-design)
AND Task = code-review
AND Host = codex-compatible
```

The existing `any` host compatibility rule remains authoritative. A Topic facet can return skills, workflows, hooks and MCP entries together while preserving type-specific installation routes.

For each facet, calculate value counts using the text query and all other active facets, leaving out that facet's current selections. Label these as matching-entry counts, not the number of entries a click would add. Keep selected values visible even when they have zero matches. Count each entry once even if it matches multiple selected tags or topic descendants.

Use one shared normalization and alias module for sidebar and command search. They may retain distinct scopes: the command palette can still search globally while sidebar search respects active filters. Exact title/ID and canonical term matches should rank above alias-only or optional broader-topic matches. No numeric weight is justified by current evidence; tune against test queries.

If broader-term expansion is introduced, make it directional: selecting a broad topic may include narrower topics, but choosing a narrow topic must not return every broad-topic entry. Related concepts should be suggestions, not automatic filter expansions. Do not infer a topic hierarchy from technology dependencies.

Retain collections as editorially chosen combinations for a recognizable job. A tag-based result set does not imply that all its entries should be installed together. Tree grouping, featured status and experimental status are presentation choices; they must not remove an entry from its applicable topic results.

## Rollout and validation

1. **Define the vocabulary.** Review the audit with a sample covering skills, rules, workflows, hooks, MCP entries and plugins. Register current IDs without destructive renames. Promote only terms whose definitions and facet are clear; retain others as searchable keywords.
2. **Add aliases and shared search.** Preserve current tag payloads and the explicitly requested underscore ID. Expose the vocabulary to agents. Document compatibility before changing generated output shape.
3. **Add Topic, Task and Technology filters.** Replace the single-category assumption with multi-topic membership. Start with represented values and search within technology choices; avoid a screen of 200 chips. Preserve useful tree navigation separately.
4. **Tighten validation after migration.** Require registered IDs, reject duplicate concepts under aliases, detect alias collisions and unknown broader IDs, and reject hierarchy cycles if broader links are supported. Suggest additions for curator review rather than silently creating tags. Add malformed-input and invariant tests when implementing validators.
5. **Measure retrieval and maintenance.** Run a small labeled query set before and after the change, record misses and irrelevant results, and ask two curators to tag the same sample independently. Disagreement identifies unclear scope notes. Counts and schema checks alone do not establish discovery quality.

Suggested starting queries, with expected anchors rather than exhaustive relevance judgments:

| Query | Expected anchor | Important boundary |
| --- | --- | --- |
| reverse engineering | reverse-engineering, reva, ida-mcp | Finds the underscore tag through an alias |
| Ghidra | reva | Technology does not imply installation approval |
| review game balance | game-balance-review | Topic and task combine across entry types |
| test driven development | test-driven-development | Broader testing entries need separate relevance judgments |
| fix CI | gh-fix-ci | User phrases need coverage beyond exact tag spelling |
| self improvement loop | self-improvement-loop | Finds a workflow rather than only similarly named skills |
| Vue async state | vue-async-state | Multiword matching works consistently |

Record expected relevant entries and an adjudication reason before scoring. Compare top-five recall and irrelevant-result counts, alias parity, zero-result cases and tagging agreement. These are catalog-retrieval checks, separate from skill activation or matched outcome evaluation. No benchmark was run in this study.

## Ranked next steps and limits

1. Build the vocabulary and shared aliases first: these address meaning and wording without an entry-schema migration.
2. Add faceted discovery and multi-topic matching: these address browsing consistency and the current one-category assumption.
3. Trial the seed vocabulary against actual user requests before splitting tags into more fields or adding deeper hierarchy.

This research adds this report and the audit snapshot only. No entries, ratings, tags, pins, installation behavior or generated catalog artifacts were changed by this task. No lasting design choice was adopted, so no decision record was appended.

Sources were searched and inspected on the research date: official W3C, Backstage, DCMI, GOV.UK, ONS, NISO and Algolia material. The initial GOV.UK URL and developer-manual fetch failed; the publication's linked HTML principles were subsequently accessible. NISO's complete standard and ONS's downloadable assessment PDF were not read. This is a focused pattern comparison, not a census or evidence that one vendor's search product is best. The repository had existing modified and untracked files before the study; those remain outside this task's changes.
