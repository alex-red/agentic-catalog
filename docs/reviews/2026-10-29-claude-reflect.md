# claude-reflect: human-focused assessment

Reviewed 2026-10-29 (America/Edmonton) by Codex, an AI curator. Rubric: [human-v1](../ratings.md). This is one curator’s source-based judgment, not independent human calibration or a behavioral evaluation.

Developers working on this task: You keep correcting the agent on the same preferences and want those corrections captured with a review step. Declared hosts: claude-code.

Comparison baseline and alternatives: Claude Code auto memory, the retrospective skill, and revise-claude-md.

Adopt only when the review queue justifies automatic capture and reminders.

## Inspection and provenance

Pinned upstream revision: `77c3340592aefc6ca964909198effc70fca3d01e`. Exact file digests, source URLs, prior rating and inspection status are recorded under `claude-reflect` in the [assessment manifest](2026-10-29-catalog-assessment-sources.json). Linked source content was treated as data; no installer, upstream helper or integration was executed.

- [README.md](https://raw.githubusercontent.com/BayramAnnakov/claude-reflect/77c3340592aefc6ca964909198effc70fca3d01e/README.md) — read selected line ranges: lines 1–85, 134–150, 312–351.

The listed excerpts support partial judgments only. Unlisted runtime, required references and transitive dependencies are outside coverage; no aggregate is assigned.

## Grades

| Criterion | Grade (0–4) | Rationale |
| --- | ---: | --- |
| Practical value | 2 | A review queue and skill mining add some value beyond native memory and retrospective. |
| Dependability | Not graded | Prompt hooks, stored history and mutation implementation are uninspected. |
| Cognitive ease | 2 | Automatic reminders and a review workflow add recurring attention costs. |
| Human control | 3 | Manual reflection approval is documented; automatic capture still expands persistent state. |
| Adoption cost | 2 | Always-on hooks, Python and host setup increase onboarding work. |
| Compatibility | 3 | Fits declared Claude Code hooks but overlaps native memory and existing reflection guidance. |
| Upkeep | 2 | Hook payloads and native memory overlap change over time. |

Aggregate: **incomplete — withheld**. Weights are provisional editorial choices. Expected developer benefit and burden are predictions from the artifact, not measured outcomes.

## Evidence and limits

Evidence remains **reviewed**. This pass adds no activation, installation or matched-outcome evidence. Existing records, where present, cover only the scope they describe. Host overlap is compared with the recorded catalog alternatives; this is not a fresh audit of every host release.

Previous curator notes, retained as history rather than newly verified facts: MIT, active, and tested. Claude Code's auto memory now captures corrections natively, so its distinct value is the review queue and the skill mining. It installs always-on hooks and needs Python.

Open inspection gaps:

- Audit capture hooks, local storage, history processing and memory/skill writes before grading dependability.

## Disposition and next evidence

Pending further inspection; retain with an incomplete profile. No payload, installation policy, hooks or tool connections are changed by this rating.

Resolve the named inspection gaps first. A useful next trial would compare the intended task with the named baseline, recording completion, correction effort, interruptions, comprehension and retained human control. Revisit the grades after material source/host changes or consequential failures.
