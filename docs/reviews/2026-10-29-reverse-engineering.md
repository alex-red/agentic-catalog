# Reverse engineering (Encid): human-focused assessment

Reviewed 2026-10-29 (America/Edmonton) by Codex, an AI curator. Rubric: [human-v1](../ratings.md). This is one curator’s source-based judgment, not independent human calibration or a behavioral evaluation.

Developers working on this task: Understanding shipped binaries, APKs, packaged applications or protocols without complete source, while explicitly selecting a broad shell-first method. Declared hosts: any.

Comparison baseline and alternatives: repo-research handles source repositories; systematic-debugging handles hypothesis testing. ReVa supplies a live Ghidra database and REA a larger cross-format runtime. Native shell and file tools cover basic triage; this option adds routing, exports and artifact-coordinate reporting.

A useful cross-format method with unverified platform and helper coverage.

## Inspection and provenance

Pinned upstream revision: `9a857bd2ee62bd13aa66b3942bd17c89eabf6b8a`. Exact file digests, source URLs, prior rating and inspection status are recorded under `reverse-engineering` in the [assessment manifest](2026-10-29-catalog-assessment-sources.json). Linked source content was treated as data; no installer, upstream helper or integration was executed.

- [skills/reverse-engineering/SKILL.md](https://raw.githubusercontent.com/EncidXVII/claude-reverse-engineering-skill/9a857bd2ee62bd13aa66b3942bd17c89eabf6b8a/skills/reverse-engineering/SKILL.md) — read selected line ranges: lines 1–85, 180–196.

The listed excerpts support partial judgments only. Unlisted runtime, required references and transitive dependencies are outside coverage; no aggregate is assigned.

## Grades

| Criterion | Grade (0–4) | Rationale |
| --- | ---: | --- |
| Practical value | 3 | Artifact triage and coordinate-backed reporting extend source-repository investigation. |
| Dependability | Not graded | Platform playbooks and executable triage/export helpers are not audited here. |
| Cognitive ease | 3 | Triage-first routing reduces initial uncertainty but spans many toolchains. |
| Human control | 3 | Scoped investigation and isolated-sample guidance preserve analyst direction. |
| Adoption cost | 3 | Python and external decompilers require setup beyond a Markdown-only method. |
| Compatibility | 3 | Explicit path substitution supports multiple hosts; platform adapters still vary. |
| Upkeep | 2 | Decompiler and JDK compatibility require release-specific checks. |

Aggregate: **incomplete — withheld**. Weights are provisional editorial choices. Expected developer benefit and burden are predictions from the artifact, not measured outcomes.

## Evidence and limits

Evidence remains **reviewed**. This pass adds no activation, installation or matched-outcome evidence. Existing records, where present, cover only the scope they describe. Host overlap is compared with the recorded catalog alternatives; this is not a fresh audit of every host release.

Previous curator notes, retained as history rather than newly verified facts: Entrypoint, cross-cutting workflow, findings template and license read. Platform references and executable helpers are not fully audited. Useful routing and evidence labels; Ghidra/JDK assumptions require release-specific checks. Root license abbreviates Apache clauses. No behavioral trial or superiority evidence.

Open inspection gaps:

- Only listed entrypoint ranges inspected; audit the remainder, platform references and executable helpers before grading dependability.

## Disposition and next evidence

Pending further inspection; retain with an incomplete profile. No payload, installation policy, hooks or tool connections are changed by this rating.

Resolve the named inspection gaps first. A useful next trial would compare the intended task with the named baseline, recording completion, correction effort, interruptions, comprehension and retained human control. Revisit the grades after material source/host changes or consequential failures.
