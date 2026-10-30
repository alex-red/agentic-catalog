# Claude HUD status line: human-focused assessment

Reviewed 2026-10-29 (America/Edmonton) by Codex, an AI curator. Rubric: [human-v1](../ratings.md). This is one curator’s source-based judgment, not independent human calibration or a behavioral evaluation.

Developers working on this task: You run long or parallel Claude Code sessions and want context pressure, tool and subagent activity, and limits visible without running /context, /cost or /usage. Declared hosts: claude-code.

Comparison baseline and alternatives: Claude Code's statusLine setting, which this fills, and the built-in status line setup agent; /context, /cost and /usage report the same numbers on demand. ccusage statusline is a lighter cost-only alternative. context-hogs attributes context cost to files rather than showing live use.

Useful human-facing visibility; retained launcher pinning concerns require follow-up.

## Inspection and provenance

Pinned upstream revision: `ce2ceff9d67a34e9e6a7889336cf2911254800ff`. Exact file digests, source URLs, prior rating and inspection status are recorded under `claude-hud` in the [assessment manifest](2026-10-29-catalog-assessment-sources.json). Linked source content was treated as data; no installer, upstream helper or integration was executed.

- [README.md](https://raw.githubusercontent.com/jarrodwatts/claude-hud/ce2ceff9d67a34e9e6a7889336cf2911254800ff/README.md) — read selected line ranges: lines 1–85, 273–289, 291–307.

The listed excerpts support partial judgments only. Unlisted runtime, required references and transitive dependencies are outside coverage; no aggregate is assigned.

## Grades

| Criterion | Grade (0–4) | Rationale |
| --- | ---: | --- |
| Practical value | 3 | Persistent context and activity visibility adds convenience beyond occasional usage commands. |
| Dependability | Not graded | Launcher, readers and distributed binary are not inspected anew. |
| Cognitive ease | 3 | Compact status output has low interaction cost after setup. |
| Human control | 3 | Documented preview and opt-in extra commands expose choices; runtime privacy still requires verification. |
| Adoption cost | 3 | Needs plugin/runtime and status-line configuration. |
| Compatibility | 3 | Fits its declared Claude Code status-line environment; minimum host/runtime versions still constrain setup. |
| Upkeep | 2 | Host version and launcher/cache behavior need continuing checks. |

Aggregate: **incomplete — withheld**. Weights are provisional editorial choices. Expected developer benefit and burden are predictions from the artifact, not measured outcomes.

## Evidence and limits

Evidence remains **reviewed**. This pass adds no activation, installation or matched-outcome evidence. Existing records, where present, cover only the scope they describe. Host overlap is compared with the recorded catalog alternatives; this is not a fresh audit of every host release.

Previous curator notes, retained as history rather than newly verified facts: Setup, launcher and main readers reviewed at the pin; no network requests or telemetry found. Reads the transcript, ~/.claude.json (plan tier, optional email local part, MCP counts) and settings files; writes caches under ~/.claude/plugins/claude-hud/. The launcher runs the highest-version claude-hud in any marketplace cache, not a pinned copy, and Node runs CI-built dist/ not compared with src. Claude Code only. A user-facing tool; no agent outcome claim.

Open inspection gaps:

- Audit setup, cache launcher, transcript/config readers and distributed output; earlier highest-version cache finding is unresolved.

## Disposition and next evidence

Pending further inspection; retain with an incomplete profile. No payload, installation policy, hooks or tool connections are changed by this rating.

Resolve the named inspection gaps first. A useful next trial would compare the intended task with the named baseline, recording completion, correction effort, interruptions, comprehension and retained human control. Revisit the grades after material source/host changes or consequential failures.
