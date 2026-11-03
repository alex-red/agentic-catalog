# Design refinement and variants (Impeccable): completed source assessment

Follow-up begun 2026-10-30; completed 2026-11-03 (America/Edmonton) by Codex, an AI curator. Rubric: [human-v1](../ratings.md). This is a provisional source judgment, not independent human calibration or behavioral evidence. Supersedes the [partial assessment](2026-10-29-impeccable.md) without rewriting its history.

## Context and comparison

Developers working on this task: Explicitly trying a broad design-refinement workflow and accepting its engine setup, project artifacts and command-specific dependencies. Declared hosts: claude-code, codex.

Baseline: Comparison baseline and alternatives: Overlaps frontend-design, ux-critique, webapp-testing and native browser tools. Adds coordinated refinement vocabulary and live variants. Prefer a focused command to loading several competing design systems. A clean detector is not proof of design quality.

## Inspection and finding

Pinned revision: `7510e233b228864606888d252abacf5e7148bf87`. The [follow-up manifest](2026-10-30-assessment-completion-sources.json) records source URLs, SHA-256 digests, retrieved source ranges and prior unknowns under `impeccable`. Files downloaded outside those ranges are not claimed inspected. Source was treated as data; no upstream helper, installer or integration was executed.

The full primary skill, POSIX engine launcher, craft floor and polish playbook were inspected, with selected context, roll and telemetry implementation. Scoped polish preserves the incumbent identity, factual copy and behavior, and explicitly says a clean detector is not design-quality proof. The craft floor nevertheless has absolute stylistic bans even when a brief asks otherwise, plus fixed typography/radius rules that need judgment. The launcher verifies new downloads against bundled checksums but executes an override or sibling directly; unversioned home/PATH engines need only answer a prefix handshake, and a cached .verified marker skips rehashing. Consequently the running engine need not match the pinned skill version. Telemetry is on by default; checked opt-outs combine environment, user and project settings without an opt-in overriding an opt-out. The concept choice path skips pings when disabled, but roll requests still send a seed key and mode/scope with a do-not-record header. Server compliance was not verified. Update checks are separately controlled by IMPECCABLE_NO_UPDATE_CHECK or updateCheck:false, not the telemetry opt-out. Local seed records persist keys beyond pruning of old rounds. These disclosed effects support a qualified source grade for the catalog manual/scoped-refinement route, not approval of every live-edit or generation workflow.

## Grades

| Criterion | Grade (0–4) | Rationale |
| --- | ---: | --- |
| Practical value | 3 | A coordinated design critique and polish system can add more than generic prompting. |
| Dependability | 2 | Good refinement/evidence boundaries and download checks, with engine correspondence, style absolutism and network/data limits. |
| Cognitive ease | 2 | Mandatory context launching and many commands introduce process overhead. |
| Human control | 2 | Brief and narrow-refinement boundaries are explicit and telemetry has working client opt-outs; automatic engine selection/download and house-style bans still reduce discretion. |
| Adoption cost | 1 | Binary download and engine setup exceed a standalone skill install. |
| Compatibility | 2 | Manual-copy and plugin routes differ; host and runtime assumptions need care. |
| Upkeep | 2 | Engine, command and reference versions must remain coordinated. |

Aggregate: **5.4/10**. Weights are provisional editorial choices. Completing a profile does not establish that its examples are correct or authorize its installation.

## Blockers and disposition

No recommendation blocker established within the inspected scope.

Disposition: **Refresh**. Bind the executing engine to the intended version; select telemetry, roll and update-network behavior explicitly.

## Evidence and limits

Evidence remains **reviewed**; existing evidence records retain their original scope. No installation, activation, live service accuracy, native binary correspondence or measured improvement over the baseline is claimed. Coverage is complete for primary guidance, POSIX launcher, craft floor and polish; context/version and telemetry/roll paths and new-work excerpts were selected. Full live-edit server, optional agents, Windows launcher, other command references, complete context engine and remote service were not audited or executed. Revisit after source/host changes, consequential failure or a matched trial recording correction effort, interruptions, comprehension and control.
