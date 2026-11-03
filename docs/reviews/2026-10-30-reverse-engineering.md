# Reverse engineering (Encid): completed source assessment

Follow-up begun 2026-10-30; completed 2026-11-03 (America/Edmonton) by Codex, an AI curator. Rubric: [human-v1](../ratings.md). This is a provisional source judgment, not independent human calibration or behavioral evidence. Supersedes the [partial assessment](2026-10-29-reverse-engineering.md) without rewriting its history.

## Context and comparison

Developers working on this task: Understanding shipped binaries, APKs, packaged applications or protocols without complete source, while explicitly selecting a broad shell-first method. Declared hosts: any.

Baseline: Comparison baseline and alternatives: repo-research handles source repositories; systematic-debugging handles hypothesis testing. ReVa supplies a live Ghidra database and REA a larger cross-format runtime. Native shell and file tools cover basic triage; this option adds routing, exports and artifact-coordinate reporting.

## Inspection and finding

Pinned revision: `9a857bd2ee62bd13aa66b3942bd17c89eabf6b8a`. The [follow-up manifest](2026-10-30-assessment-completion-sources.json) records source URLs, SHA-256 digests, retrieved source ranges and prior unknowns under `reverse-engineering`. Files downloaded outside those ranges are not claimed inspected. Source was treated as data; no upstream helper, installer or integration was executed.

Read the complete core, all four Python CLI helpers, both Ghidra exporters, findings template and the cross-cutting/native/dynamic playbooks. The helpers read artifacts rather than launch them, stream hashes/fingerprints, bound common output and identify inference separately from runtime confirmation. Known limits remain: endpoint scans follow file symlinks and skip read failures; masking secret-shaped matches does not redact credentials embedded in URL/path results. App inspection reads whole executables/archive members without size limits, trusts CFBundleExecutable paths, and reports malformed-input error objects with exit status zero. The export footer counts attempted functions, including failures, so its existence proves completion of traversal rather than successful decompilation. Strong static-first handling still requires OS isolation for parsers/tools and manual verification of format/security claims.

## Grades

| Criterion | Grade (0–4) | Rationale |
| --- | ---: | --- |
| Practical value | 3 | Artifact triage and coordinate-backed reporting extend source-repository investigation. |
| Dependability | 2 | Coherent bounded investigation method with meaningful verification, qualified by helper parsing, path and reporting limitations. |
| Cognitive ease | 3 | Triage-first routing reduces initial uncertainty but spans many toolchains. |
| Human control | 3 | Scoped investigation and isolated-sample guidance preserve analyst direction. |
| Adoption cost | 3 | Python and external decompilers require setup beyond a Markdown-only method. |
| Compatibility | 3 | Explicit path substitution supports multiple hosts; platform adapters still vary. |
| Upkeep | 2 | Decompiler and JDK compatibility require release-specific checks. |

Aggregate: **6.9/10**. Weights are provisional editorial choices. Completing a profile does not establish that its examples are correct or authorize its installation.

## Blockers and disposition

No recommendation blocker established within the inspected scope.

Disposition: **Keep**. Use only for the stated task and review the cited limitations before adoption.

## Evidence and limits

Evidence remains **reviewed**; existing evidence records retain their original scope. No installation, activation, live service accuracy, native binary correspondence or measured improvement over the baseline is claimed. Platform-specific Android/iOS/managed/firmware and other optional playbooks were not all audited; the assessment covers triage and native investigation. No parser, exporter, decompiler, debugger or sample was executed. Revisit after source/host changes, consequential failure or a matched trial recording correction effort, interruptions, comprehension and control.
