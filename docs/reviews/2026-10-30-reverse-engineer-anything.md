# Reverse Engineer Anything (REA): completed source assessment

Follow-up begun 2026-10-30; completed 2026-11-03 (America/Edmonton) by Codex, an AI curator. Rubric: [human-v1](../ratings.md). This is a provisional source judgment, not independent human calibration or behavioral evidence. Supersedes the [partial assessment](2026-10-29-reverse-engineer-anything.md) without rewriting its history.

## Context and comparison

Developers working on this task: Tracing behavior across shipped application components or artifact formats where retained evidence and a common investigation surface justify a broader workbench. Declared hosts: any.

Baseline: Comparison baseline and alternatives: Ordinary source analysis belongs to repo-research. reverse-engineering supplies a smaller method; ReVa and IDA MCP expose particular databases; Cerberus specializes in Apple static/runtime correlation. REA adds cross-format routing, retained evidence and feature investigation at greater operational cost.

## Inspection and finding

Pinned revision: `c0c3902207d6b1a33709e42b80c7e570da7db964`. The [follow-up manifest](2026-10-30-assessment-completion-sources.json) records source URLs, SHA-256 digests, retrieved source ranges and prior unknowns under `reverse-engineer-anything`. Files downloaded outside those ranges are not claimed inspected. Source was treated as data; no upstream helper, installer or integration was executed.

The complete authored investigation guide and evidence workflow were read with the source-build/registration documentation, CLI dispatcher, startup policy, shared provider-creation lifecycle and Ghidra request wire. The guide carefully separates observed facts, inferred candidates and unknowns, routes ordinary source work away from REA, and distinguishes retained-page completeness from program coverage. The inspected provider creation path retains exact cleanup ownership and reports incomplete cleanup rather than discarding it; the Ghidra wire correlates requests, checks size before writing and has no blind retry loop. Cancelling or timing out a wire wait does not prove target-side execution stopped. Provider behavior therefore remains consequential and task-specific. The source prepare lifecycle installs Husky unless HUSKY=0, despite the catalog route intending no implicit hooks; the catalog source-build instructions now set that variable for npm ci. A package version still does not prove equality with this tree, and no published artifact was installed. The grade is a provisional judgment of this bounded source-build investigation/control surface, not validation of every parser, engine or runtime capture claim in this very large workbench.

## Grades

| Criterion | Grade (0–4) | Rationale |
| --- | ---: | --- |
| Practical value | 3 | Cross-format investigation and retained evidence offer broader routing than a single backend. |
| Dependability | 2 | Careful evidence scopes and owned cleanup support conditional use; target-side timeout effects and unverified provider/package breadth limit confidence. |
| Cognitive ease | 2 | One entrypoint helps routing but backend selection and retained artifacts add complexity. |
| Human control | 3 | Visible setup proposes changes for review and backs up configuration. |
| Adoption cost | 2 | Node plus native providers and platform prerequisites increase adoption work. |
| Compatibility | 2 | Broad formats are supported through differing provider/platform constraints. |
| Upkeep | 2 | Large provider and release/package graph increases upkeep. |

Aggregate: **6.0/10**. Weights are provisional editorial choices. Completing a profile does not establish that its examples are correct or authorize its installation.

## Blockers and disposition

No recommendation blocker established within the inspected scope.

Disposition: **Refresh**. Use the corrected no-Husky source-build instructions and separately inspect the provider selected for the actual investigation.

## Evidence and limits

Evidence remains **reviewed**; existing evidence records retain their original scope. No installation, activation, live service accuracy, native binary correspondence or measured improvement over the baseline is claimed. Complete primary guide, evidence guide, CLI dispatcher and selected shared provider/Ghidra wire paths were inspected. Setup publication internals, full Ghidra bridge, other providers/parsers/runtime capture, transitive lifecycle scripts and release-to-source correspondence remain outside coverage. No setup, build, target execution or provider trial was performed. Revisit after source/host changes, consequential failure or a matched trial recording correction effort, interruptions, comprehension and control.
