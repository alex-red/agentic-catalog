# Open-source release readiness (Trail of Bits): completed source assessment

Follow-up begun 2026-10-30; completed 2026-11-03 (America/Edmonton) by Codex, an AI curator. Rubric: [human-v1](../ratings.md). This is a provisional source judgment, not independent human calibration or behavioral evidence. Supersedes the [partial assessment](2026-10-29-open-sourcing.md) without rewriting its history.

## Context and comparison

Developers working on this task: Making a private repository public, choosing a license, or setting up packaging and release automation ahead of a public launch. Declared hosts: any.

Baseline: Comparison baseline and alternatives: oss-repo-health audits an already-public repository's ongoing practices and hands the pre-release secrets audit to this entry. github-actions-hardening reviews workflows in more depth. Hosts have no built-in release-readiness workflow.

## Inspection and finding

Pinned revision: `123037ec8aed26f0d86327cc39137ee5043e5deb`. The [follow-up manifest](2026-10-30-assessment-completion-sources.json) records source URLs, SHA-256 digests, retrieved source ranges and prior unknowns under `open-sourcing`. Files downloaded outside those ranges are not claimed inspected. Source was treated as data; no upstream helper, installer or integration was executed.

Both shell helpers are read-only indicator checks: no evaluator, installer or repository mutation is hidden in them. The full core and all language/license references distinguish presence from readiness and require a clean-clone build. Organization detection uses remote names or recent email and can overclassify contributors; the user override matters. Fresh-repository advice does not revoke leaked credentials or remove old copies. Release actions, language versions and license decisions still require project-specific verification.

## Grades

| Criterion | Grade (0–4) | Rationale |
| --- | ---: | --- |
| Practical value | 3 | Secrets-first readiness and launch sequencing address a distinct release task. |
| Dependability | 3 | Read-only helper checks and a coherent secrets-first launch workflow. Presence checks cannot establish readiness; organization inference, license choice and release recipes need project verification. |
| Cognitive ease | 3 | A staged launch checklist is understandable but wider than a simple publication task. |
| Human control | 2 | Default license and repository-policy choices require explicit project-owner decisions. |
| Adoption cost | 2 | Organization detection and language-specific paths require setup and interpretation. |
| Compatibility | 3 | Most practices transfer across hosts; sibling overlays introduce dependencies. |
| Upkeep | 2 | Release platforms, policies and language templates change. |

Aggregate: **6.8/10**. Weights are provisional editorial choices. Completing a profile does not establish that its examples are correct or authorize its installation.

## Blockers and disposition

No recommendation blocker established within the inspected scope.

Disposition: **Keep**. Use only for the stated task and review the cited limitations before adoption.

## Evidence and limits

Evidence remains **reviewed**; existing evidence records retain their original scope. No installation, activation, live service accuracy, native binary correspondence or measured improvement over the baseline is claimed. Source inspection does not audit transitive dependencies or validate behavior in every supported environment. Revisit after source/host changes, consequential failure or a matched trial recording correction effort, interruptions, comprehension and control.
