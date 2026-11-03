# Variant analysis (Trail of Bits): completed source assessment

Follow-up begun 2026-10-30; completed 2026-11-03 (America/Edmonton) by Codex, an AI curator. Rubric: [human-v1](../ratings.md). This is a provisional source judgment, not independent human calibration or behavioral evidence. Supersedes the [partial assessment](2026-10-29-variant-analysis.md) without rewriting its history.

## Context and comparison

Developers working on this task: A vulnerability or logic bug has been found in one place and the question is where else the same root cause occurs. Declared hosts: any.

Baseline: Comparison baseline and alternatives: Host review commands and the security-threat-model entry find issues in a diff or a design; none of them start from a known bug and expand it systematically.

## Inspection and finding

Pinned revision: `123037ec8aed26f0d86327cc39137ee5043e5deb`. The [follow-up manifest](2026-10-30-assessment-completion-sources.json) records source URLs, SHA-256 digests, retrieved source ranges and prior unknowns under `variant-analysis`. Files downloaded outside those ranges are not claimed inspected. Source was treated as data; no upstream helper, installer or integration was executed.

Inspected all four step references, five CodeQL templates, five Semgrep templates and the report template. Exact-seed calibration, one-change expansion and adversarial triage are coherent. Generic queries are starters: Go treats filepath.Clean as a sanitizer without containment checks; C/C++ conflates return values with written buffers and uses incorrect format-string argument positions for several functions. Blanket sanitize/escape/validate name matching can hide real flows. Rewrite source/sink/barrier models for the known root cause and validate positive and negative fixtures before CI use.

## Grades

| Criterion | Grade (0–4) | Rationale |
| --- | ---: | --- |
| Practical value | 3 | Expands a known root cause beyond ordinary initial review. |
| Dependability | 2 | Core and all query/report resources inspected. Strong seed-based method; generic source/sink/barrier models are unreliable defaults. Rewrite and validate task-specific queries before treating their absence of matches as evidence. |
| Cognitive ease | 3 | Exact-match-first and single-change expansion limit noise. |
| Human control | 3 | Direct method is bounded; plugin workflow adds delegation. |
| Adoption cost | 3 | Requires a known seed and potentially CodeQL/Semgrep. |
| Compatibility | 3 | Optional plugin and sibling skills must be selected explicitly. |
| Upkeep | 3 | Query syntax and language-specific resources can drift. |

Aggregate: **7.0/10**. Weights are provisional editorial choices. Completing a profile does not establish that its examples are correct or authorize its installation.

## Blockers and disposition

No recommendation blocker established within the inspected scope.

Disposition: **Refresh**. Correct the cited sanitizer/barrier and sink-position examples before using them as detection templates.

## Evidence and limits

Evidence remains **reviewed**; existing evidence records retain their original scope. No installation, activation, live service accuracy, native binary correspondence or measured improvement over the baseline is claimed. Source inspection does not audit transitive dependencies or validate behavior in every supported environment. Revisit after source/host changes, consequential failure or a matched trial recording correction effort, interruptions, comprehension and control.
