# claude-reflect: completed source assessment

Follow-up begun 2026-10-30; completed 2026-11-03 (America/Edmonton) by Codex, an AI curator. Rubric: [human-v1](../ratings.md). This is a provisional source judgment, not independent human calibration or behavioral evidence. Supersedes the [partial assessment](2026-10-29-claude-reflect.md) without rewriting its history.

## Context and comparison

Developers working on this task: You keep correcting the agent on the same preferences and want those corrections captured with a review step. Declared hosts: claude-code.

Baseline: Comparison baseline and alternatives: Claude Code auto memory, the retrospective skill, and revise-claude-md.

## Inspection and finding

Pinned revision: `77c3340592aefc6ca964909198effc70fca3d01e`. The [follow-up manifest](2026-10-30-assessment-completion-sources.json) records source URLs, SHA-256 digests, retrieved source ranges and prior unknowns under `claude-reflect`. Files downloaded outside those ranges are not claimed inspected. Source was treated as data; no upstream helper, installer or integration was executed.

Read the complete core and /reflect command, all four capture/reminder hooks, queue read/write/migration boundaries, history extraction, pattern detection and semantic-validation entry path. Writes to memory require explicit final review, and ordinary capture has no network call in the inspected hook. But whole prompts are retained without redaction; atomic replace is not locked read-modify-write, so concurrent captures can lose items. Legacy migration deletes its source even after skipped/failed destination writes. History/queue instructions conflict about filtering, and the current-session branch still guesses folders by basename despite earlier prohibitions. Semantic analysis extracts a CLI result but does not JSON-decode that result when it is a string, causing fallback for that documented response shape. AGENTS synchronization replaces the entire managed section with the current batch, risking loss of previously accepted learnings; clearing removes the whole queue rather than processed item IDs.

## Grades

| Criterion | Grade (0–4) | Rationale |
| --- | ---: | --- |
| Practical value | 2 | A review queue and skill mining add some value beyond native memory and retrospective. |
| Dependability | 1 | Concrete queue durability, response parsing and memory replacement defects undermine the automatic learning path despite useful human approval steps. |
| Cognitive ease | 2 | Automatic reminders and a review workflow add recurring attention costs. |
| Human control | 3 | Manual reflection approval is documented; automatic capture still expands persistent state. |
| Adoption cost | 2 | Always-on hooks, Python and host setup increase onboarding work. |
| Compatibility | 3 | Fits declared Claude Code hooks but overlaps native memory and existing reflection guidance. |
| Upkeep | 2 | Hook payloads and native memory overlap change over time. |

Aggregate: **5.1/10** · scoped blockers remain. Weights are provisional editorial choices. Completing a profile does not establish that its examples are correct or authorize its installation.

## Blockers and disposition

- **AGENTS.md batch synchronization:** The command replaces the whole managed section using the current learning batch; preserve and merge previously accepted entries before applying this path.

Disposition: **Refresh**. Make queue updates transactional and AGENTS synchronization preserve older managed content before activating the affected paths.

## Evidence and limits

Evidence remains **reviewed**; existing evidence records retain their original scope. No installation, activation, live service accuracy, native binary correspondence or measured improvement over the baseline is claimed. Optional /reflect-skills, all encoding/migration variants, every semantic helper and tool-error pattern were not fully audited. No hooks, child model, history processing or memory writes were executed. Revisit after source/host changes, consequential failure or a matched trial recording correction effort, interruptions, comprehension and control.
