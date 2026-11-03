# Superpowers: completed source assessment

Follow-up begun 2026-10-30; completed 2026-11-03 (America/Edmonton) by Codex, an AI curator. Rubric: [human-v1](../ratings.md). This is a provisional source judgment, not independent human calibration or behavioral evidence. Supersedes the [partial assessment](2026-10-29-superpowers.md) without rewriting its history.

## Context and comparison

Developers working on this task: A team wants a complete, enforced spec-to-merge workflow rather than individual techniques. Declared hosts: claude-code, codex.

Baseline: Comparison baseline and alternatives: Plan mode and the review commands in both hosts cover part of it. It also contains verification-before-completion, test-driven-development, and a systematic-debugging skill.

## Inspection and finding

Pinned revision: `bb92a77741419a4ab5f06e711a283343f1ada0c3`. The [follow-up manifest](2026-10-30-assessment-completion-sources.json) records source URLs, SHA-256 digests, retrieved source ranges and prior unknowns under `superpowers`. Files downloaded outside those ranges are not claimed inspected. Source was treated as data; no upstream helper, installer or integration was executed.

The complete bootstrap hook and using-superpowers router, main brainstorm/plan/inline/subagent execution bodies, TDD, review, worktree and finishing guidance were inspected. There are useful evidence-before-claims checks, user opt-outs in brainstorming, explicit integration choices, and refusal to force-remove dirty worktrees. However, the TDD body repeatedly requires deleting production code written before a failing test, without a provenance distinction; the existing blocker is confirmed by the body rather than inferred from the README. Worktree setup automatically selects package-manager installs from file presence, and its ignore check succeeds if either of two directories is ignored rather than proving the chosen directory is ignored. Finish-time ownership is inferred from a directory name, not recorded creation provenance. Inline and subagent methods disagree on when a green suite and a clean review justify completion versus parked findings. The Codex adapter says full-history forks accept model overrides, which contradicts the tool contract in this review environment; it correctly says the actual tool list takes precedence. Optional visual companion boundary inspection found per-session authentication, WebSocket Origin checking and canonical file containment; that is not a complete server/lifecycle audit. The compulsory routing and recovery caveats prevent broad dependable adoption despite valuable individual techniques.

## Grades

| Criterion | Grade (0–4) | Rationale |
| --- | ---: | --- |
| Practical value | 3 | A complete method can structure larger changes where native planning is insufficient. |
| Dependability | 1 | Useful verification discipline is undermined by destructive TDD instructions, setup/ownership assumptions and adapter inconsistencies. |
| Cognitive ease | 1 | Mandatory skill checks, staged approvals and task-level reviews add high recurring overhead. |
| Human control | 1 | Documented mandatory workflows and deletion of pre-test code can override developer intent. |
| Adoption cost | 2 | Install separately per host and adopt interdependent skills. |
| Compatibility | 2 | Several hosts are documented but their native planning and review conventions overlap. |
| Upkeep | 2 | Bootstrap, companion and host adapters require coordinated upkeep. |

Aggregate: **4.4/10** · scoped blockers remain. Weights are provisional editorial choices. Completing a profile does not establish that its examples are correct or authorize its installation.

## Blockers and disposition

- **Mandatory delete-before-tests workflow:** The pinned README explicitly describes deleting code written before tests. Preserve user work and existing authorization instead of adopting that instruction.

Disposition: **Refresh**. Remove provenance-blind code deletion, correct the chosen-directory ignore check and host adapter contract, and record worktree ownership explicitly.

## Evidence and limits

Evidence remains **reviewed**; existing evidence records retain their original scope. No installation, activation, live service accuracy, native binary correspondence or measured improvement over the baseline is claimed. Complete main workflow bodies and bootstrap were read; selected reviewer prompt and visual-server security paths were examined. Optional authoring/diagnostics skills, every helper script, visual protocol/lifecycle and every host adapter remain outside coverage. No companion, subagent, installer or workflow was executed. Revisit after source/host changes, consequential failure or a matched trial recording correction effort, interruptions, comprehension and control.
