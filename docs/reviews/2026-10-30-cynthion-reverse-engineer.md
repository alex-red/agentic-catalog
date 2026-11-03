# Cynthion USB protocol investigation: completed source assessment

Follow-up begun 2026-10-30; completed 2026-11-03 (America/Edmonton) by Codex, an AI curator. Rubric: [human-v1](../ratings.md). This is a provisional source judgment, not independent human calibration or behavioral evidence. Supersedes the [partial assessment](2026-10-29-cynthion-reverse-engineer.md) without rewriting its history.

## Context and comparison

Developers working on this task: Reverse engineering a proprietary USB device protocol from contrasting captures, or preparing a bounded replay/emulation experiment. Declared hosts: any.

Baseline: Comparison baseline and alternatives: Generic debugging and file tools lack USB-specific capture differencing and command inference. REA covers broader application artifacts; reverse-engineering supplies a general analysis method. This specialist option requires its decoder and is not a default dependency of other RE entries.

## Inspection and finding

Pinned revision: `322192876442b066dd31690a190773c7f903d099`. The [follow-up manifest](2026-10-30-assessment-completion-sources.json) records source URLs, SHA-256 digests, retrieved source ranges and prior unknowns under `cynthion-reverse-engineer`. Files downloaded outside those ranges are not claimed inspected. Source was treated as data; no upstream helper, installer or integration was executed.

Read the complete core, all five analysis/generation helpers, sibling resolver and required decoder. Source confirms several limits beyond the documented fixed-frame assumption: inference sorts all values before testing increments, losing chronological/within-label order; pairwise diff zips streams and drops unmatched tails/endpoints; tshark failures can yield empty success because its exit status is ignored. The decoder does not expand nested configuration descriptors for the clone generator. Replay emits bulk calls for interrupt traffic and its advertised pyusb fallback is unimplemented. The clone generator interpolates device-controlled strings directly into Python literals/docstrings. Keep capture observations as hypotheses, repair generation and verify transfers before any hardware execution.

## Grades

| Criterion | Grade (0–4) | Rationale |
| --- | ---: | --- |
| Practical value | 3 | USB capture contrasts and replay scaffolds add specialist structure. |
| Dependability | 1 | Concrete inference, decode failure-reporting and code-generation defects outweigh the useful staged capture/documentation method. |
| Cognitive ease | 2 | Seven stages and per-stage review increase analyst effort. |
| Human control | 3 | Explicit capture choices and artifact reviews retain analyst direction, with repeated confirmation costs. |
| Adoption cost | 2 | Requires Cynthion hardware, decoder skill and several platform tools. |
| Compatibility | 2 | Decoder discovery supports several hosts but emulation requires platform-specific dependencies. |
| Upkeep | 2 | Hardware, decoder and Python helper versions must stay aligned. |

Aggregate: **5.5/10** · scoped blockers remain. Weights are provisional editorial choices. Completing a profile does not establish that its examples are correct or authorize its installation.

## Blockers and disposition

- **Generated Facedancer clone execution:** gen_facedancer_clone.py inserts device-provided strings into Python literals/docstrings without escaping; inspect and repair generated source before execution.

Disposition: **Refresh**. Correct ordering, unmatched-diff and clone-generation handling before executing generated clone code.

## Evidence and limits

Evidence remains **reviewed**; existing evidence records retain their original scope. No installation, activation, live service accuracy, native binary correspondence or measured improvement over the baseline is claimed. Optional setup/capture skills and external tshark/libusb/Facedancer implementations were not audited. No packet parser, generated script, hardware command or emulator was executed. Revisit after source/host changes, consequential failure or a matched trial recording correction effort, interruptions, comprehension and control.
