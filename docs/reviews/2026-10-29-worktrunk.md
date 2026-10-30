# Worktrunk parallel worktrees: human-focused assessment

Reviewed 2026-10-29 (America/Edmonton) by Codex, an AI curator. Rubric: [human-v1](../ratings.md). This is one curator’s source-based judgment, not independent human calibration or a behavioral evaluation.

Developers working on this task: You run several agent sessions on separate branches and want consistent worktree creation, cleanup and a view of which session is working or waiting. Declared hosts: claude-code, codex.

Comparison baseline and alternatives: Claude Code has built-in worktrees (--worktree, EnterWorktree, worktree-isolated subagents under .claude/worktrees/); Codex has its own. Worktrunk adds merge and cleanup, project lifecycle hooks with approval, and per-session status. The superpowers and compound-engineering worktree skills are guidance only. desktop-attention covers waiting-for-input alerts.

Useful worktree UX; plugin lifecycle takeover and retained auto-approval behavior need review.

## Inspection and provenance

Pinned upstream revision: `bc8ad63e232b28445474dd03ab1ac9641bdd4f31`. Exact file digests, source URLs, prior rating and inspection status are recorded under `worktrunk` in the [assessment manifest](2026-10-29-catalog-assessment-sources.json). Linked source content was treated as data; no installer, upstream helper or integration was executed.

- [plugins/worktrunk/.claude-plugin/plugin.json](https://raw.githubusercontent.com/max-sixty/worktrunk/bc8ad63e232b28445474dd03ab1ac9641bdd4f31/plugins/worktrunk/.claude-plugin/plugin.json) — read selected line ranges: lines 1–18.
- [README.md](https://raw.githubusercontent.com/max-sixty/worktrunk/bc8ad63e232b28445474dd03ab1ac9641bdd4f31/README.md) — read in full.

The listed excerpts support partial judgments only. Unlisted runtime, required references and transitive dependencies are outside coverage; no aggregate is assigned.

## Grades

| Criterion | Grade (0–4) | Rationale |
| --- | ---: | --- |
| Practical value | 3 | Worktree addressing, merge cleanup and status improve multi-branch ergonomics. |
| Dependability | Not graded | Only manifest and README inspected anew; CLI/hook implementation is not audited. |
| Cognitive ease | 3 | Core commands simplify Git while merge and lifecycle automation add concepts. |
| Human control | 2 | Compound merge/cleanup and recorded permission auto-approval need deliberate user configuration. |
| Adoption cost | 2 | CLI and shell integration plus optional plugin setup add adoption work. |
| Compatibility | 2 | Host-native worktree conventions and platform shells may conflict. |
| Upkeep | 2 | Git, shell and host hook compatibility require upkeep. |

Aggregate: **incomplete — withheld** · scoped blocker(s) remain. Weights are provisional editorial choices. Expected developer benefit and burden are predictions from the artifact, not measured outcomes.

## Evidence and limits

Evidence remains **reviewed**. This pass adds no activation, installation or matched-outcome evidence. Existing records, where present, cover only the scope they describe. Host overlap is compared with the recorded catalog alternatives; this is not a fresh audit of every host release.

Previous curator notes, retained as history rather than newly verified facts: Skills, plugin manifests, hook script and the Rust hook handler reviewed at the pin; large reference files only searched. No telemetry. Hooks write status markers to .git/config. In Claude Code, WorktreeCreate and WorktreeRemove take over built-in worktrees (sibling `<repo>.<branch>` layout, also for worktree-isolated subagents), and the PermissionRequest hook auto-approves EnterWorktree into existing worktrees. Removal never forces, but deletes merged branches. Project hooks need approval and fail closed without a TTY.

Open inspection gaps:

- Audit hook handler, PermissionRequest behavior, merge/removal and shell integration; previous findings remain unresolved.

Scoped blockers:

- **PermissionRequest auto-approval for EnterWorktree:** Earlier pinned-source review records automatic approval into existing worktrees. Disable that hook path where it supersedes the host or project approval policy until explicitly adopted.

## Disposition and next evidence

Refresh affected paths; retain the entry with explicit blockers. No payload, installation policy, hooks or tool connections are changed by this rating.

Resolve the named inspection gaps first. Correct or independently verify the affected recipe/policy before using that path. A useful next trial would compare the intended task with the named baseline, recording completion, correction effort, interruptions, comprehension and retained human control. Revisit the grades after material source/host changes or consequential failures.
