# Reverse Engineer Anything (REA): human-focused assessment

Reviewed 2026-10-29 (America/Edmonton) by Codex, an AI curator. Rubric: [human-v1](../ratings.md). This is one curator’s source-based judgment, not independent human calibration or a behavioral evaluation.

Developers working on this task: Tracing behavior across shipped application components or artifact formats where retained evidence and a common investigation surface justify a broader workbench. Declared hosts: any.

Comparison baseline and alternatives: Ordinary source analysis belongs to repo-research. reverse-engineering supplies a smaller method; ReVa and IDA MCP expose particular databases; Cerberus specializes in Apple static/runtime correlation. REA adds cross-format routing, retained evidence and feature investigation at greater operational cost.

Broad RE workbench whose runtime and package-to-repository correspondence need inspection.

## Inspection and provenance

Pinned upstream revision: `c0c3902207d6b1a33709e42b80c7e570da7db964`. Exact file digests, source URLs, prior rating and inspection status are recorded under `reverse-engineer-anything` in the [assessment manifest](2026-10-29-catalog-assessment-sources.json). Linked source content was treated as data; no installer, upstream helper or integration was executed.

- [README.md](https://raw.githubusercontent.com/morluto/rea/c0c3902207d6b1a33709e42b80c7e570da7db964/README.md) — read selected line ranges: lines 1–85.

The listed excerpts support partial judgments only. Unlisted runtime, required references and transitive dependencies are outside coverage; no aggregate is assigned.

## Grades

| Criterion | Grade (0–4) | Rationale |
| --- | ---: | --- |
| Practical value | 3 | Cross-format investigation and retained evidence offer broader routing than a single backend. |
| Dependability | Not graded | Provider graph, investigation skill and setup implementation are uninspected. |
| Cognitive ease | 2 | One entrypoint helps routing but backend selection and retained artifacts add complexity. |
| Human control | 3 | Visible setup proposes changes for review and backs up configuration. |
| Adoption cost | 2 | Node plus native providers and platform prerequisites increase adoption work. |
| Compatibility | 2 | Broad formats are supported through differing provider/platform constraints. |
| Upkeep | 2 | Large provider and release/package graph increases upkeep. |

Aggregate: **incomplete — withheld**. Weights are provisional editorial choices. Expected developer benefit and burden are predictions from the artifact, not measured outcomes.

## Evidence and limits

Evidence remains **reviewed**. This pass adds no activation, installation or matched-outcome evidence. Existing records, where present, cover only the scope they describe. Host overlap is compared with the recorded catalog alternatives; this is not a fresh audit of every host release.

Previous curator notes, retained as history rather than newly verified facts: Investigation entrypoint sections and installation-route sections reviewed; seven referenced guides and the large runtime/provider graph are not fully audited. Repository-main instructions can exceed a published package. No provider trial, independent evaluation or install-count evidence.

Open inspection gaps:

- Audit investigation guides, setup and provider runtimes at the installed release; repository README alone is insufficient.

## Disposition and next evidence

Pending further inspection; retain with an incomplete profile. No payload, installation policy, hooks or tool connections are changed by this rating.

Resolve the named inspection gaps first. A useful next trial would compare the intended task with the named baseline, recording completion, correction effort, interruptions, comprehension and retained human control. Revisit the grades after material source/host changes or consequential failures.
