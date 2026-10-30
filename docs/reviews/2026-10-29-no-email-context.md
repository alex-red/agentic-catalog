# Remove account email from initial context: human-focused assessment

Reviewed 2026-10-29 (America/Edmonton) by Codex, an AI curator. Rubric: [human-v1](../ratings.md). This is one curator’s source-based judgment, not independent human calibration or a behavioral evaluation.

Developers working on this task: You want Claude Code's injected account-email context removed before a new conversation reaches the model. Declared hosts: claude-code.

Comparison baseline and alternatives: Native context transformation supplies the mechanism, but no equivalent account-email setting was verified. prompt-secret-check handles newly submitted credential-like text; secret-serialization concerns application data models.

A narrow privacy control; it does not scrub tools, files, logs, histories or all identity data.

## Inspection and provenance

Pinned upstream revision: `930d0b2cfabdc41feffb9f15ef0e981259d1e856`. Exact file digests, source URLs, prior rating and inspection status are recorded under `no-email-context` in the [assessment manifest](2026-10-29-catalog-assessment-sources.json). Linked source content was treated as data; no installer, upstream helper or integration was executed.

- [.claude/skills/no-email/.claude-plugin/plugin.json](https://raw.githubusercontent.com/AlexErrant/claude-code-no-email/930d0b2cfabdc41feffb9f15ef0e981259d1e856/.claude/skills/no-email/.claude-plugin/plugin.json) — read in full.
- [.claude/skills/no-email/hooks/hooks.json](https://raw.githubusercontent.com/AlexErrant/claude-code-no-email/930d0b2cfabdc41feffb9f15ef0e981259d1e856/.claude/skills/no-email/hooks/hooks.json) — read in full.
- [.claude/skills/no-email/hooks/register.ts](https://raw.githubusercontent.com/AlexErrant/claude-code-no-email/930d0b2cfabdc41feffb9f15ef0e981259d1e856/.claude/skills/no-email/hooks/register.ts) — read in full.
- [.claude/skills/no-email/tests/register.test.ts](https://raw.githubusercontent.com/AlexErrant/claude-code-no-email/930d0b2cfabdc41feffb9f15ef0e981259d1e856/.claude/skills/no-email/tests/register.test.ts) — read in full.
- [.claude/skills/no-email/tsconfig.json](https://raw.githubusercontent.com/AlexErrant/claude-code-no-email/930d0b2cfabdc41feffb9f15ef0e981259d1e856/.claude/skills/no-email/tsconfig.json) — read in full.
- [README.md](https://raw.githubusercontent.com/AlexErrant/claude-code-no-email/930d0b2cfabdc41feffb9f15ef0e981259d1e856/README.md) — read in full.

The grades cover the inspected core and relevant paths. Unread optional examples, adapters, licenses and conditional resources are not cleared by this assessment. Local or upstream tests were not run as behavioral evaluation.

## Grades

| Criterion | Grade (0–4) | Rationale |
| --- | ---: | --- |
| Practical value | 3 | Removes a specific host-injected identity block. |
| Dependability | 3 | Small exact-name filter; host fallback may preserve the block. |
| Cognitive ease | 3 | No ongoing prompts once correctly registered. |
| Human control | 3 | No runtime network/filesystem calls, but managed policy can supersede it. |
| Adoption cost | 3 | Needs host mod support, registration and final-request checks. |
| Compatibility | 3 | Claude-specific contract and managed deployment constraints. |
| Upkeep | 2 | Depends on generated host mod types and middleware ordering. |

Aggregate: **7.4/10**. Weights are provisional editorial choices. Expected developer benefit and burden are predictions from the artifact, not measured outcomes.

## Evidence and limits

Evidence remains **reviewed**. This pass adds no activation, installation or matched-outcome evidence. Existing records, where present, cover only the scope they describe. Host overlap is compared with the recorded catalog alternatives; this is not a fresh audit of every host release.

Previous curator notes, retained as history rather than newly verified facts: Complete MIT source and two tests read. Claude Code 2.1.301 static validation passes with a missing-author warning; no final-request or privacy outcome test. User-installed prompt.context mods are skipped under organization management unless deployed through managed settings.

## Disposition and next evidence

Keep for the stated use, subject to the limits below. No payload, installation policy, hooks or tool connections are changed by this rating.

A useful next trial would compare the intended task with the named baseline, recording completion, correction effort, interruptions, comprehension and retained human control. Revisit the grades after material source/host changes or consequential failures.
