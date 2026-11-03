# Worktrunk parallel worktrees: completed source assessment

Follow-up begun 2026-10-30; completed 2026-11-03 (America/Edmonton) by Codex, an AI curator. Rubric: [human-v1](../ratings.md). This is a provisional source judgment, not independent human calibration or behavioral evidence. Supersedes the [partial assessment](2026-10-29-worktrunk.md) without rewriting its history.

## Context and comparison

Developers working on this task: You run several agent sessions on separate branches and want consistent worktree creation, cleanup and a view of which session is working or waiting. Declared hosts: claude-code, codex.

Baseline: Comparison baseline and alternatives: Claude Code has built-in worktrees (--worktree, EnterWorktree, worktree-isolated subagents under .claude/worktrees/); Codex has its own. Worktrunk adds merge and cleanup, project lifecycle hooks with approval, and per-session status. The superpowers and compound-engineering worktree skills are guidance only. desktop-attention covers waiting-for-input alerts.

## Inspection and finding

Pinned revision: `bc8ad63e232b28445474dd03ab1ac9641bdd4f31`. The [follow-up manifest](2026-10-30-assessment-completion-sources.json) records source URLs, SHA-256 digests, retrieved source ranges and prior unknowns under `worktrunk`. Files downloaded outside those ranges are not claimed inspected. Source was treated as data; no upstream helper, installer or integration was executed.

The complete routing skill, Claude create/switch skill, hook manifest and shell wrapper were read, together with the full hook dispatcher and merge/remove/shell reference guides. The dispatcher restricts automatic EnterWorktree approval to an existing same-repository worktree at its configured expected path; missing or unresolvable inputs leave the dialog. It still replaces a host approval decision, so the existing blocker remains. Lifecycle removal invokes foreground removal without a force flag. Merge documentation clearly discloses automatic staging, squashing, rebasing and cleanup; inspected command gates freeze covered hook plans before execution. Declining project commands continues the merge or removal without those hooks, which can omit project validation and must not be confused with cancelling the operation. The create/switch recipe uses a bare stash push followed by stash pop rather than retaining a stash identity, making recovery dependent on intervening stash activity. The inspected Bash wrapper passes argv and reads the directory as raw data rather than evaluating it; initialization and generated completions still trust the installed executable. This supports useful but qualified source dependability, not a proof of all Git recovery paths.

## Grades

| Criterion | Grade (0–4) | Rationale |
| --- | ---: | --- |
| Practical value | 3 | Worktree addressing, merge cleanup and status improve multi-branch ergonomics. |
| Dependability | 2 | Coherent scoped Git workflow and frozen hook plans, with approval takeover, validation-skipping and stash recovery caveats. |
| Cognitive ease | 3 | Core commands simplify Git while merge and lifecycle automation add concepts. |
| Human control | 2 | Compound merge/cleanup and recorded permission auto-approval need deliberate user configuration. |
| Adoption cost | 2 | CLI and shell integration plus optional plugin setup add adoption work. |
| Compatibility | 2 | Host-native worktree conventions and platform shells may conflict. |
| Upkeep | 2 | Git, shell and host hook compatibility require upkeep. |

Aggregate: **6.0/10** · scoped blockers remain. Weights are provisional editorial choices. Completing a profile does not establish that its examples are correct or authorize its installation.

## Blockers and disposition

- **PermissionRequest auto-approval for EnterWorktree:** Earlier pinned-source review records automatic approval into existing worktrees. Disable that hook path where it supersedes the host or project approval policy until explicitly adopted.

Disposition: **Refresh**. Explicitly adopt or disable EnterWorktree auto-approval, preserve stash identity, and make declined-hook validation policy visible.

## Evidence and limits

Evidence remains **reviewed**; existing evidence records retain their original scope. No installation, activation, live service accuracy, native binary correspondence or measured improvement over the baseline is claimed. Coverage includes complete core guidance, the Claude hook dispatcher, Bash wrapper and selected merge/removal gates. Full Git mutation/recovery implementations, every shell installer/wrapper, optional references and Codex runtime are outside coverage; no worktree or hook was activated. Revisit after source/host changes, consequential failure or a matched trial recording correction effort, interruptions, comprehension and control.
