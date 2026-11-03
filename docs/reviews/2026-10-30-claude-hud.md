# Claude HUD status line: completed source assessment

Follow-up begun 2026-10-30; completed 2026-11-03 (America/Edmonton) by Codex, an AI curator. Rubric: [human-v1](../ratings.md). This is a provisional source judgment, not independent human calibration or behavioral evidence. Supersedes the [partial assessment](2026-10-29-claude-hud.md) without rewriting its history.

## Context and comparison

Developers working on this task: You run long or parallel Claude Code sessions and want context pressure, tool and subagent activity, and limits visible without running /context, /cost or /usage. Declared hosts: claude-code.

Baseline: Comparison baseline and alternatives: Claude Code's statusLine setting, which this fills, and the built-in status line setup agent; /context, /cost and /usage report the same numbers on demand. ccusage statusline is a lighter cost-only alternative. context-hogs attributes context cost to files rather than showing live use.

## Inspection and finding

Pinned revision: `ce2ceff9d67a34e9e6a7889336cf2911254800ff`. The [follow-up manifest](2026-10-30-assessment-completion-sources.json) records source URLs, SHA-256 digests, retrieved source ranges and prior unknowns under `claude-hud`. Files downloaded outside those ranges are not claimed inspected. Source was treated as data; no upstream helper, installer or integration was executed.

Read the complete setup procedure/helper, launcher, source and distributed main entrypoint, transcript/config-count/auth readers, optional shell-command and external-usage boundaries, and configuration defaults. Setup validates JSON, preserves other settings, writes atomically and provides backups. The launcher nevertheless scans every marketplace cache and runs the highest numeric version, ignoring enabled-plugin selection and prerelease ordering; the catalog source pin does not pin what it executes. Transcript parsing sanitizes labels and checkpoints privately, but assumes append-only same-inode files and bounded message-ID deduplication, silently skips malformed data and can retain stale totals after same-inode rewrite. Optional extra-cmd requires an environment opt-in and timeout. Missing installation produces no diagnostic. Cost/auth displays and local caches remain observations rather than authoritative host state.

## Grades

| Criterion | Grade (0–4) | Rationale |
| --- | ---: | --- |
| Practical value | 3 | Persistent context and activity visibility adds convenience beyond occasional usage commands. |
| Dependability | 2 | Coherent local display with bounded parsing state and recoverable setup; dynamic version routing and silent transcript omissions limit dependable attribution. |
| Cognitive ease | 3 | Compact status output has low interaction cost after setup. |
| Human control | 3 | Documented preview and opt-in extra commands expose choices; runtime privacy still requires verification. |
| Adoption cost | 3 | Needs plugin/runtime and status-line configuration. |
| Compatibility | 3 | Fits its declared Claude Code status-line environment; minimum host/runtime versions still constrain setup. |
| Upkeep | 2 | Host version and launcher/cache behavior need continuing checks. |

Aggregate: **6.9/10**. Weights are provisional editorial choices. Completing a profile does not establish that its examples are correct or authorize its installation.

## Blockers and disposition

No recommendation blocker established within the inspected scope.

Disposition: **Refresh**. Select the enabled/pinned cache version rather than the highest available directory before relying on automatic launcher selection.

## Evidence and limits

Evidence remains **reviewed**; existing evidence records retain their original scope. No installation, activation, live service accuracy, native binary correspondence or measured improvement over the baseline is claimed. Only the distributed main entrypoint was compared directly with source; every dist module, optional VCS/cost/render subsystem and all config coercions were not fully audited. No setup, statusline or shell command was run. Revisit after source/host changes, consequential failure or a matched trial recording correction effort, interruptions, comprehension and control.
