# Skill creator with evaluations: completed source assessment

Follow-up begun 2026-10-30; completed 2026-11-03 (America/Edmonton) by Codex, an AI curator. Rubric: [human-v1](../ratings.md). This is a provisional source judgment, not independent human calibration or behavioral evidence. Supersedes the [partial assessment](2026-10-29-skill-creator.md) without rewriting its history.

## Context and comparison

Developers working on this task: Authoring or tuning a skill and measuring whether it triggers and helps; use it as a methodology reference. Declared hosts: claude-code.

Baseline: Comparison baseline and alternatives: Built into Claude Code through the skill-creator plugin; Codex ships a system skill-creator.

## Inspection and finding

Pinned revision: `b9e19e6f44773509fbdd7001d77ff41a49a486c1`. The [follow-up manifest](2026-10-30-assessment-completion-sources.json) records source URLs, SHA-256 digests, retrieved source ranges and prior unknowns under `skill-creator`. Files downloaded outside those ranges are not claimed inspected. Source was treated as data; no upstream helper, installer or integration was executed.

Read the complete authoring/evaluation procedure, packager/validator, main benchmark aggregator, trigger execution/selection paths and complete Python review viewer with its HTML embedding boundary. The method usefully compares outputs and critiques weak assertions. But the documented direct with_skill/outputs layout is skipped by an aggregator requiring run-* children; output character counts can be labeled tokens and metadata hardcodes three runs. Repeatedly choosing the best held-out score makes that set a selection set, not an independent final test. The trigger harness tests synthetic commands and terminates after the first relevant tool, limiting correspondence to actual installed skills. Viewer JSON is inserted into an inline script without escaping HTML closing-script sequences from outputs; live mode also terminates arbitrary processes on the chosen port. Packaging follows files broadly, including hidden files/symlinks, without secret or containment checks.

## Grades

| Criterion | Grade (0–4) | Rationale |
| --- | ---: | --- |
| Practical value | 2 | Evaluation design adds value primarily where a suitable host skill creator is absent. |
| Dependability | 1 | Meaningful human review method, but required helper mismatches and unsafe viewer behavior make the current automated evaluation path unreliable. |
| Cognitive ease | 2 | Evaluation and iterative model runs impose significant reading and compute costs. |
| Human control | 3 | The visible process permits lighter paths, but authoring and execution need separate scope. |
| Adoption cost | 2 | Requires evaluation assets and host-specific tooling beyond Markdown. |
| Compatibility | 3 | Skill format transfers; Claude-specific details need adaptation. |
| Upkeep | 2 | Host conventions, evaluation scripts and model behavior evolve. |

Aggregate: **5.1/10** · scoped blockers remain. Weights are provisional editorial choices. Completing a profile does not establish that its examples are correct or authorize its installation.

## Blockers and disposition

- **Evaluation viewer with untrusted outputs and default live launch:** Unescaped JSON enters an inline HTML script; live launch also SIGTERMs any process listening on its port. Repair embedding and ownership checks before using this path.

Disposition: **Refresh**. Make evaluation aggregation match the written layout, escape inline HTML data and remove unrelated-port process termination before using the viewer.

## Evidence and limits

Evidence remains **reviewed**; existing evidence records retain their original scope. No installation, activation, live service accuracy, native binary correspondence or measured improvement over the baseline is claimed. Optional description-improvement model calls, full HTML renderer, blind comparison and all schema examples were not fully audited. No child model, viewer, package builder or evaluation was run. Revisit after source/host changes, consequential failure or a matched trial recording correction effort, interruptions, comprehension and control.
