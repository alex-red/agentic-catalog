# Evidence-grounded UX critique (Thecsiz): completed source assessment

Follow-up begun 2026-10-30; completed 2026-11-03 (America/Edmonton) by Codex, an AI curator. Rubric: [human-v1](../ratings.md). This is a provisional source judgment, not independent human calibration or behavioral evidence. Supersedes the [partial assessment](2026-10-29-ux-critique.md) without rewriting its history.

## Context and comparison

Developers working on this task: You want direct, evidence-grounded criticism of an app screen, prototype, screenshot, or connected user flow, with unsupported findings challenged before reporting. Declared hosts: any.

Baseline: Comparison baseline and alternatives: Generic model critique and frontend-design guidance already identify familiar UI issues. This entry adds an explicit observation, citation-support, skeptic, and confidence pipeline. webapp-testing and chrome-devtools-mcp collect runtime evidence but do not supply that critique method. grilling stress-tests decisions through questions; improvement-loop and retrospective improve agent tooling and process. None of these substitutes for observing real users.

## Inspection and finding

Pinned revision: `3da293cafb639195bf71797590081d4ffb0045ba`. The [follow-up manifest](2026-10-30-assessment-completion-sources.json) records source URLs, SHA-256 digests, retrieved source ranges and prior unknowns under `ux-critique`. Files downloaded outside those ranges are not claimed inspected. Source was treated as data; no upstream helper, installer or integration was executed.

The complete entrypoint and required chat pipeline, canonical schema, retrieval ranker, flow contract and aggregate usage recorder were inspected, with two complete KB support samples. Observation precedes retrieval; exact quote presence is explicitly separated from applicability and missing assets degrade visibly. The ranker is deterministic lexical matching with weak aliases, not semantic validation. A single-citation-per-issue and global citation-uniqueness policy can force unrelated defects sharing one principle to compete. Stage/name/size heuristics can exclude real screens. The sampled touch-target entry distinguishes AA/AAA correctly in its body while its title and some platform wording overgeneralize; KB support still requires judgment. Citation counts are written locally by default with an opt-out and contain no design prose in the inspected writer.

## Grades

| Criterion | Grade (0–4) | Rationale |
| --- | ---: | --- |
| Practical value | 3 | Observation, citation checks and skepticism add structure beyond generic critique. |
| Dependability | 2 | Coherent citation-aware critique with visible degradation; heuristic stage/retrieval rules and forced citation uniqueness can omit or misprioritize findings. |
| Cognitive ease | 2 | Mandatory Brief and a long pipeline create friction for small reviews. |
| Human control | 4 | Visible rules keep Figma read-only without explicit writeback approval and separate confidence from severity. |
| Adoption cost | 2 | Large local KB and retrieval assets increase installation cost. |
| Compatibility | 3 | Chat review transfers across hosts; Figma and artifact modes require integrations. |
| Upkeep | 2 | KB, citations and renderers need coordinated maintenance. |

Aggregate: **6.6/10**. Weights are provisional editorial choices. Completing a profile does not establish that its examples are correct or authorize its installation.

## Blockers and disposition

No recommendation blocker established within the inspected scope.

Disposition: **Keep**. Use only for the stated task and review the cited limitations before adoption.

## Evidence and limits

Evidence remains **reviewed**; existing evidence records retain their original scope. No installation, activation, live service accuracy, native binary correspondence or measured improvement over the baseline is claimed. The 606-entry KB was sampled, not fully fact-checked. Optional Figma builder, experimental artifact/apply and feedback paths were not fully audited or executed; their authorization contract was inspected. No design critique or writeback trial was performed. Revisit after source/host changes, consequential failure or a matched trial recording correction effort, interruptions, comprehension and control.
