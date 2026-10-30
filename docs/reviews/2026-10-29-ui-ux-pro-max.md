# Searchable UI design guidance (UI UX Pro Max): human-focused assessment

Reviewed 2026-10-29 (America/Edmonton) by Codex, an AI curator. Rubric: [human-v1](../ratings.md). This is one curator’s source-based judgment, not independent human calibration or a behavioral evaluation.

Developers working on this task: Looking for product-specific design references or stack guidance and willing to verify the search results before applying or persisting them. Declared hosts: any.

Comparison baseline and alternatives: frontend-design and Taste choose visual directions; this externalizes recommendations into searchable local data. react-best-practices overlaps its React guidance. It does not replace ux-critique or rendered verification.

Useful design retrieval option; search rank and confidence fields do not establish correctness.

## Inspection and provenance

Pinned upstream revision: `28b3b8dee8c976df4fa3e94aed4e092ad43fcb03`. Exact file digests, source URLs, prior rating and inspection status are recorded under `ui-ux-pro-max` in the [assessment manifest](2026-10-29-catalog-assessment-sources.json). Linked source content was treated as data; no installer, upstream helper or integration was executed.

- [.claude/skills/ui-ux-pro-max/SKILL.md](https://raw.githubusercontent.com/nextlevelbuilder/ui-ux-pro-max-skill/28b3b8dee8c976df4fa3e94aed4e092ad43fcb03/.claude/skills/ui-ux-pro-max/SKILL.md) — read in full.

The listed excerpts support partial judgments only. Unlisted runtime, required references and transitive dependencies are outside coverage; no aggregate is assigned.

## Grades

| Criterion | Grade (0–4) | Rationale |
| --- | ---: | --- |
| Practical value | 3 | Searchable design resources can improve discovery over unaided generation. |
| Dependability | Not graded | Dataset quality and the Python search/template generation chain are not fully audited. |
| Cognitive ease | 3 | Bounded lookup and retry guidance reduce search overhead, while the dataset adds concepts. |
| Human control | 3 | Visible overwrite controls help, but generated prescriptions require designer judgment. |
| Adoption cost | 2 | Python and a bounded manual installation are required. |
| Compatibility | 3 | Several frontend stacks are supported; generated defaults need adaptation. |
| Upkeep | 2 | Data, framework templates and generation paths must stay current. |

Aggregate: **incomplete — withheld**. Weights are provisional editorial choices. Expected developer benefit and burden are predictions from the artifact, not measured outcomes.

## Evidence and limits

Evidence remains **reviewed**. This pass adds no activation, installation or matched-outcome evidence. Existing records, where present, cover only the scope they describe. Host overlap is compared with the recorded catalog alternatives; this is not a fresh audit of every host release.

Previous curator notes, retained as history rather than newly verified facts: Entrypoint, CLI/template routing, core configuration and sample provenance reviewed; full dataset and generation chain not audited. Python 3 required. Confidence fields and retrieval ranks are not correctness evidence. Default installer copies sibling skills; use the bounded manual route. No outcome trial.

Open inspection gaps:

- Audit the dataset, search scripts and generation chain; use the bounded install route rather than assuming sibling installation is authorized.

## Disposition and next evidence

Pending further inspection; retain with an incomplete profile. No payload, installation policy, hooks or tool connections are changed by this rating.

Resolve the named inspection gaps first. A useful next trial would compare the intended task with the named baseline, recording completion, correction effort, interruptions, comprehension and retained human control. Revisit the grades after material source/host changes or consequential failures.
