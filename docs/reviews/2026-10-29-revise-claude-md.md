# Revise CLAUDE.md with session learnings: human-focused assessment

Reviewed 2026-10-29 (America/Edmonton) by Codex, an AI curator. Rubric: [human-v1](../ratings.md). This is one curator’s source-based judgment, not independent human calibration or a behavioral evaluation.

Developers working on this task: A session showed context the agent was missing, and you want a lightweight, approval-gated write-back to project instructions. Declared hosts: claude-code.

Comparison baseline and alternatives: Claude Code auto memory and /memory. The retrospective skill is the broader version.

A simple session-learning command; it does not choose between rules, skills, scripts and hooks.

## Inspection and provenance

Pinned upstream revision: `a86e34672c44fa1fb1ae2b2c4143abcf26612ace`. Exact file digests, source URLs, prior rating and inspection status are recorded under `revise-claude-md` in the [assessment manifest](2026-10-29-catalog-assessment-sources.json). Linked source content was treated as data; no installer, upstream helper or integration was executed.

- [plugins/claude-md-management/commands/revise-claude-md.md](https://raw.githubusercontent.com/anthropics/claude-plugins-official/a86e34672c44fa1fb1ae2b2c4143abcf26612ace/plugins/claude-md-management/commands/revise-claude-md.md) — read in full.

The grades cover the inspected core and relevant paths. Unread optional examples, adapters, licenses and conditional resources are not cleared by this assessment. Local or upstream tests were not run as behavioral evaluation.

## Grades

| Criterion | Grade (0–4) | Rationale |
| --- | ---: | --- |
| Practical value | 2 | Adds explicit review/approval beyond automatic memory capture. |
| Dependability | 3 | Concise additions are inspectable; it lacks trigger/load checks. |
| Cognitive ease | 3 | One-line-per-concept limits instruction growth. |
| Human control | 4 | Only approved file changes are applied. |
| Adoption cost | 3 | No runtime; extra approval and a discovery command add friction. |
| Compatibility | 3 | CLAUDE.md-specific naming and allowed tools constrain hosts. |
| Upkeep | 3 | Small command tied to host instruction conventions. |

Aggregate: **7.3/10**. Weights are provisional editorial choices. Expected developer benefit and burden are predictions from the artifact, not measured outcomes.

## Evidence and limits

Evidence remains **reviewed**. This pass adds no activation, installation or matched-outcome evidence. Existing records, where present, cover only the scope they describe. Host overlap is compared with the recorded catalog alternatives; this is not a fresh audit of every host release.

Previous curator notes, retained as history rather than newly verified facts: Short, with an approval gate and a brevity rule. It is simpler than the retrospective skill. It writes only to CLAUDE.md, and does not choose between instructions, skills, and hooks or check triggers. Claude Code's auto memory already captures some of this.

## Disposition and next evidence

Keep for the stated use, subject to the limits below. No payload, installation policy, hooks or tool connections are changed by this rating.

A useful next trial would compare the intended task with the named baseline, recording completion, correction effort, interruptions, comprehension and retained human control. Revisit the grades after material source/host changes or consequential failures.
