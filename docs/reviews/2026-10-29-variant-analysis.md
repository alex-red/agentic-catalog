# Variant analysis (Trail of Bits): human-focused assessment

Reviewed 2026-10-29 (America/Edmonton) by Codex, an AI curator. Rubric: [human-v1](../ratings.md). This is one curator’s source-based judgment, not independent human calibration or a behavioral evaluation.

Developers working on this task: A vulnerability or logic bug has been found in one place and the question is where else the same root cause occurs. Declared hosts: any.

Comparison baseline and alternatives: Host review commands and the security-threat-model entry find issues in a diff or a design; none of them start from a known bug and expand it systematically.

Useful seed-based method; the core is not the complete parallel plugin workflow.

## Inspection and provenance

Pinned upstream revision: `123037ec8aed26f0d86327cc39137ee5043e5deb`. Exact file digests, source URLs, prior rating and inspection status are recorded under `variant-analysis` in the [assessment manifest](2026-10-29-catalog-assessment-sources.json). Linked source content was treated as data; no installer, upstream helper or integration was executed.

- [plugins/variant-analysis/skills/variant-analysis/SKILL.md](https://raw.githubusercontent.com/trailofbits/skills/123037ec8aed26f0d86327cc39137ee5043e5deb/plugins/variant-analysis/skills/variant-analysis/SKILL.md) — read in full.
- [plugins/variant-analysis/skills/variant-analysis/references/root-cause.md](https://raw.githubusercontent.com/trailofbits/skills/123037ec8aed26f0d86327cc39137ee5043e5deb/plugins/variant-analysis/skills/variant-analysis/references/root-cause.md) — read in full.
- [plugins/variant-analysis/skills/variant-analysis/references/searching.md](https://raw.githubusercontent.com/trailofbits/skills/123037ec8aed26f0d86327cc39137ee5043e5deb/plugins/variant-analysis/skills/variant-analysis/references/searching.md) — read in full.
- [plugins/variant-analysis/skills/variant-analysis/references/triage.md](https://raw.githubusercontent.com/trailofbits/skills/123037ec8aed26f0d86327cc39137ee5043e5deb/plugins/variant-analysis/skills/variant-analysis/references/triage.md) — read in full.
- [plugins/variant-analysis/skills/variant-analysis/references/reporting.md](https://raw.githubusercontent.com/trailofbits/skills/123037ec8aed26f0d86327cc39137ee5043e5deb/plugins/variant-analysis/skills/variant-analysis/references/reporting.md) — read in full.

The listed excerpts support partial judgments only. Unlisted runtime, required references and transitive dependencies are outside coverage; no aggregate is assigned.

## Grades

| Criterion | Grade (0–4) | Rationale |
| --- | ---: | --- |
| Practical value | 3 | Expands a known root cause beyond ordinary initial review. |
| Dependability | Not graded | Core and four step references provide a coherent method; uninspected query resources and report template prevent a complete dependability grade. |
| Cognitive ease | 3 | Exact-match-first and single-change expansion limit noise. |
| Human control | 3 | Direct method is bounded; plugin workflow adds delegation. |
| Adoption cost | 3 | Requires a known seed and potentially CodeQL/Semgrep. |
| Compatibility | 3 | Optional plugin and sibling skills must be selected explicitly. |
| Upkeep | 3 | Query syntax and language-specific resources can drift. |

Aggregate: **incomplete — withheld**. Weights are provisional editorial choices. Expected developer benefit and burden are predictions from the artifact, not measured outcomes.

## Evidence and limits

Evidence remains **reviewed**. This pass adds no activation, installation or matched-outcome evidence. Existing records, where present, cover only the scope they describe. Host overlap is compared with the recorded catalog alternatives; this is not a fresh audit of every host release.

Previous curator notes, retained as history rather than newly verified facts: The exact-match-first rule and the one-change-at-a-time ladder are distinctive and keep reports from flooding. Not for discovering the first bug. It names sibling skills (audit-context-building, issue-writer), and its parallel /variant-analysis:variants workflow needs the plugin. Linked because the repository is CC-BY-SA-4.0. Upstream ships eval prompts; we have not run them.

Open inspection gaps:

- Dependability: core and four step references were inspected; query resources and report template remain uninspected at this pin.

## Disposition and next evidence

Pending further inspection; retain with an incomplete profile. No payload, installation policy, hooks or tool connections are changed by this rating.

Resolve the named inspection gaps first. A useful next trial would compare the intended task with the named baseline, recording completion, correction effort, interruptions, comprehension and retained human control. Revisit the grades after material source/host changes or consequential failures.
