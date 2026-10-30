# Open-source repository health audit: human-focused assessment

Reviewed 2026-10-29 (America/Edmonton) by Codex, an AI curator. Rubric: [human-v1](../ratings.md). This is one curator’s source-based judgment, not independent human calibration or a behavioral evaluation.

Developers working on this task: Reviewing or improving a public repository's practices, preparing it for outside contributors, or setting up versioning, a changelog or releases. Declared hosts: any.

Comparison baseline and alternatives: open-sourcing covers the go-public event and secrets history; github-actions-hardening covers workflow security; GitHub's community profile shows file presence only. The OpenSSF Scorecard tool scores security practices automatically but not documentation or contributor experience.

Useful ongoing audit; several Must/Should judgments need project-specific calibration.

## Inspection and provenance

Local catalog payload assessed by SHA-256. Exact file digests, source URLs, prior rating and inspection status are recorded under `oss-repo-health` in the [assessment manifest](2026-10-29-catalog-assessment-sources.json). Linked source content was treated as data; no installer, upstream helper or integration was executed.

- [entries/skills/oss-repo-health/SKILL.md](../../entries/skills/oss-repo-health/SKILL.md) — read in full.

Other packaged or fetched files not inspected in this pass: `entries/skills/oss-repo-health/LICENSE.txt`.

The grades cover the inspected core and relevant paths. Unread optional examples, adapters, licenses and conditional resources are not cleared by this assessment. Local or upstream tests were not run as behavioral evaluation.

## Grades

| Criterion | Grade (0–4) | Rationale |
| --- | ---: | --- |
| Practical value | 3 | Audits contributor and maintenance experience beyond file presence. |
| Dependability | 3 | Unknown settings remain unknown; findings require evidence. |
| Cognitive ease | 3 | Project-kind calibration reduces irrelevant checklist work. |
| Human control | 4 | Settings, licenses and publication remain owner decisions. |
| Adoption cost | 3 | Read-only gh access and a broad audit cost time. |
| Compatibility | 3 | GitHub-first with explicit mappings to other forges. |
| Upkeep | 3 | Forge APIs and release practices need maintenance. |

Aggregate: **7.9/10**. Weights are provisional editorial choices. Expected developer benefit and burden are predictions from the artifact, not measured outcomes.

## Evidence and limits

Evidence remains **reviewed**. This pass adds no activation, installation or matched-outcome evidence. Existing records, where present, cover only the scope they describe. Host overlap is compared with the recorded catalog alternatives; this is not a fresh audit of every host release.

Previous curator notes, retained as history rather than newly verified facts: Fills the ongoing-maintenance gap that launch-focused skills leave. It calibrates checks to project kind, leaves license choice and repository settings to the owner, and distinguishes unknown from missing when API access is limited. The four gh queries were run read-only against a public repository. It is GitHub-first with stated mappings for other forges, and it hands workflow security and the pre-release secrets audit to the specialist entries. No trigger or outcome evaluation has been run.

## Disposition and next evidence

Keep for the stated use, subject to the limits below. No payload, installation policy, hooks or tool connections are changed by this rating.

A useful next trial would compare the intended task with the named baseline, recording completion, correction effort, interruptions, comprehension and retained human control. Revisit the grades after material source/host changes or consequential failures.
