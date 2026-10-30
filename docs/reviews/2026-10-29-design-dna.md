# Reference-driven visual identity: human-focused assessment

Reviewed October 29, 2026 (America/Edmonton) by Codex, an AI curator, using [human-v1](../ratings.md). Source-based judgment, not independent human calibration or behavioral evaluation.

## Context and baseline

For developers extracting an existing interface's visual language and applying it to new content. The baseline is the installed `frontend-design` skill plus a manually written reference dossier and rendered comparison. `ui-ux-pro-max` retrieves design suggestions; `interface-design` records product tokens; `human-interface-design` handles task/state/platform decisions. Those remain complementary. The installed frontend skill was read during scouting; no universal claim about host built-ins is made.

Selected over UI from screenshot for the user's “inspired by Cyberpunk 2077” example because the profile explicitly supports style transfer rather than one-screen reconstruction. This selection is a fit judgment, not a measured quality ranking.

## Inspection and provenance

Reviewed [zanwei/design-dna](https://github.com/zanwei/design-dna/tree/593e39bc9e3652734653bd75544a333d7d43615e) at full repository revision `593e39bc9e3652734653bd75544a333d7d43615e`. The installable source path is the repository root, so the pinned HEAD covers the whole package, rather than only the latest change to an entrypoint. [Scouting record](../research/2026-10-29-catalog-scout-5.md).

Read in full at that revision:

- `SKILL.md`
- `references/schema.md` and `references/generation-guide.md`
- `scripts/package.json`
- `scripts/color-math.mjs`, `scripts/measure-colors.mjs`, and `scripts/verify.mjs`
- Root `LICENSE` (MIT)

Required runtime source is covered. Tests were downloaded but not read or run; examples, localized READMEs and transitive dependencies are outside this assessment. No installer, dependency installation, runtime module, integration or UI implementation was executed. Source files were treated as data.

## Grades

| Criterion | Grade (0–4) | Rationale |
| --- | ---: | --- |
| Practical value | 3 | A reusable token/style/effects profile adds concrete structure to reference transfer beyond an aesthetic prompt. Actual images or URLs are still needed. |
| Dependability | 2 | Measurement and palette comparison are explicit, but schema completion invites inference about unseen details. Color scores do not establish spatial, typographic or behavioral fidelity. |
| Cognitive ease | 2 | Inspectable JSON helps review, while a large required schema and an extraction review question add attention and ceremony. |
| Human control | 3 | Separate extraction and generation allow review and redirection. Asset fetching and dependency setup still require interpretation within the user's task and project rules. |
| Adoption cost | 2 | Manual pinned installation, Node >=18.17, sharp setup, reference gathering and an external render/capture path are needed for the measured route. |
| Compatibility | 3 | Stack-neutral profile and framework override are useful; single-file HTML and optional effects-library recipes require adaptation to established projects. |
| Upkeep | 2 | Traceable small source package, but native image dependencies, unpinned CDN examples and a broad effects schema create maintenance work. |

Weighted aggregate: **6.3/10** (250/40, rounded). This editorial score does not establish visual accuracy, productivity or successful activation.

## Findings and limits

The measurement module samples pixels, clusters colors, merges nearby clusters, and assigns heuristic roles. Cluster centers are representative colors rather than guaranteed original design tokens. The largest cluster is treated as background; semantic role selection still needs human or agent inspection.

The verifier compares palette distances and coverage using the adjacent measurement script. It does not inspect positions, font metrics, components, transitions or task completion. Its PASS result must remain a color diagnostic. Different layouts can retain the same palette; this is a deduction from source, not an executed adversarial test. Legitimate style transfer can change color coverage as content changes.

The upstream requires populating schema fields by extraction or inference. Keep an accompanying evidence record that distinguishes measured, estimated, inferred and unknown values. A screenshot does not establish hover states, motion timing or navigation behavior. Resolve the intended reference family before extracting a named game's identity; no Cyberpunk-specific design values were verified here.

The generation guide includes floating `@latest` CDN examples and browser-effect recipes that were not tested. Consumer projects should use their own pinned dependencies and verify chosen recipes. npm setup writes into the installed scripts directory; catalog admission does not run it. Source asset rights are independent of the skill license.

## Disposition and next evidence

Admit as a **linked experimental** alternative with evidence level **reviewed**. No whole-task recommendation blocker is assigned: a bounded extraction/style-transfer route is inspectable, provided its output remains provisional and the documented verification limits are respected. The optional effects examples are not a validated implementation library.

A useful next trial would extract from a coherent reference set, implement one representative screen plus key states, and compare against the baseline at fixed dimensions. Record correction effort, visual differences, interaction behavior, responsiveness, focus and reduced motion. Do not raise evidence merely because catalog checks pass.
