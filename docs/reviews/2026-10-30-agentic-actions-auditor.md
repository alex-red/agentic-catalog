# Audit AI agents in GitHub Actions (Trail of Bits): completed source assessment

Follow-up begun 2026-10-30; completed 2026-11-03 (America/Edmonton) by Codex, an AI curator. Rubric: [human-v1](../ratings.md). This is a provisional source judgment, not independent human calibration or behavioral evidence. Supersedes the [partial assessment](2026-10-29-agentic-actions-auditor.md) without rewriting its history.

## Context and comparison

Developers working on this task: Reviewing workflows that invoke an AI agent action, especially ones triggered by issues, comments or pull_request_target. Declared hosts: any.

Baseline: Comparison baseline and alternatives: github-actions-hardening covers general workflow hardening, including direct expression injection and pull_request_target checkout, which this also checks. This adds the agent-specific vectors and action settings. Host security review does not cover workflow configuration.

## Inspection and finding

Pinned revision: `123037ec8aed26f0d86327cc39137ee5043e5deb`. The [follow-up manifest](2026-10-30-assessment-completion-sources.json) records source URLs, SHA-256 digests, retrieved source ranges and prior unknowns under `agentic-actions-auditor`. Files downloaded outside those ranges are not claimed inspected. Source was treated as data; no upstream helper, installer or integration was executed.

All nine vector guides, foundations, action profiles and depth-one resolver were inspected. The SAFE remediation still directly interpolates model output into a quoted run script and disagrees about its output name. Gemini defaults contradict across references; third-party actions are silently skipped, and core Step 2 stops when direct AI steps are absent before its cross-file discovery stage, which can miss an AI-only reusable workflow. Tainted input is an attack surface, not proof that injection or arbitrary execution succeeded.

## Grades

| Criterion | Grade (0–4) | Rationale |
| --- | ---: | --- |
| Practical value | 4 | Adds agent-prompt dataflow and configuration-specific attack vectors. |
| Dependability | 1 | Full core/reference review confirms unsafe output remediation, inconsistent defaults and blind spots in cross-file discovery. Retain the remediation blocker; tainted input alone does not prove successful execution. |
| Cognitive ease | 3 | Per-vector traces help explain cross-file risks. |
| Human control | 4 | Reports findings; fetched YAML is explicitly data. |
| Adoption cost | 3 | Many references and action/version knowledge are required. |
| Compatibility | 3 | GitHub-only and limited cross-file resolution. |
| Upkeep | 2 | Action input names and sandbox defaults drift quickly. |

Aggregate: **7.4/10** · scoped blockers remain. Weights are provisional editorial choices. Completing a profile does not establish that its examples are correct or authorize its installation.

## Blockers and disposition

- **GitHub AI Inference remediation in references/action-profiles.md:** The example labeled SAFE interpolates model output into a single-quoted run script, which an embedded quote can escape; it also conflicts with vector G on the output field. Do not copy that remediation.

Disposition: **Refresh**. Re-review a corrected upstream action profile and cross-file discovery path before clearing the unsafe-remediation blocker.

## Evidence and limits

Evidence remains **reviewed**; existing evidence records retain their original scope. No installation, activation, live service accuracy, native binary correspondence or measured improvement over the baseline is claimed. Source inspection does not audit transitive dependencies or validate behavior in every supported environment. Revisit after source/host changes, consequential failure or a matched trial recording correction effort, interruptions, comprehension and control.
