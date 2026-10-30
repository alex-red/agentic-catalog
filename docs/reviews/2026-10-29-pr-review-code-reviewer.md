# Code reviewer with confidence filtering: human-focused assessment

Reviewed 2026-10-29 (America/Edmonton) by Codex, an AI curator. Rubric: [human-v1](../ratings.md). This is one curator’s source-based judgment, not independent human calibration or a behavioral evaluation.

Developers working on this task: You want a fresh-context review before commit or PR that enforces your CLAUDE.md or AGENTS.md rules while keeping false positives low. Declared hosts: claude-code.

Comparison baseline and alternatives: Claude Code /code-review and /security-review cover bug review; Codex has /review. The added value is checking compliance with your written rules.

A conditional reviewer persona; confidence is not calibrated probability and inherited tools are broader than a read-only role.

## Inspection and provenance

Pinned upstream revision: `ce721c1f1d5da2c281588818e072ae01a05d2e73`. Exact file digests, source URLs, prior rating and inspection status are recorded under `pr-review-code-reviewer` in the [assessment manifest](2026-10-29-catalog-assessment-sources.json). Linked source content was treated as data; no installer, upstream helper or integration was executed.

- [entries/subagents/pr-review-code-reviewer/AGENT.md](../../entries/subagents/pr-review-code-reviewer/AGENT.md) — read in full.

Other packaged or fetched files not inspected in this pass: `entries/subagents/pr-review-code-reviewer/LICENSE`.

The grades cover the inspected core and relevant paths. Unread optional examples, adapters, licenses and conditional resources are not cleared by this assessment. Local or upstream tests were not run as behavioral evaluation.

## Grades

| Criterion | Grade (0–4) | Rationale |
| --- | ---: | --- |
| Practical value | 2 | Most coverage duplicates built-in diff review. |
| Dependability | 2 | Confidence numbers mix likelihood, impact and rule compliance. |
| Cognitive ease | 2 | Aggressive filtering helps but can omit low-confidence serious risks. |
| Human control | 2 | No tool allowlist; the agent inherits broad tools. |
| Adoption cost | 2 | Hard-coded Opus adds cost and host setup. |
| Compatibility | 2 | CLAUDE.md and host model naming limit portability. |
| Upkeep | 3 | Small prompt but model/tool assumptions require upkeep. |

Aggregate: **5.1/10**. Weights are provisional editorial choices. Expected developer benefit and burden are predictions from the artifact, not measured outcomes.

## Evidence and limits

Evidence remains **reviewed**. This pass adds no activation, installation or matched-outcome evidence. Existing records, where present, cover only the scope they describe. Host overlap is compared with the recorded catalog alternatives; this is not a fresh audit of every host release.

Previous curator notes, retained as history rather than newly verified facts: The confidence threshold is the useful idea. It beats the popular generic reviewer personas in VoltAgent and wshobson, which use broad checklists and can edit files. It pins model opus and declares no tools list, so it inherits every tool, including edits. Consider setting model to inherit and tools to Read, Grep, Glob, Bash.

## Disposition and next evidence

Keep for the stated use, subject to the limits below. No payload, installation policy, hooks or tool connections are changed by this rating.

A useful next trial would compare the intended task with the named baseline, recording completion, correction effort, interruptions, comprehension and retained human control. Revisit the grades after material source/host changes or consequential failures.
