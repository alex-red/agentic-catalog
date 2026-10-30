# Open-source release readiness (Trail of Bits): human-focused assessment

Reviewed 2026-10-29 (America/Edmonton) by Codex, an AI curator. Rubric: [human-v1](../ratings.md). This is one curator’s source-based judgment, not independent human calibration or a behavioral evaluation.

Developers working on this task: Making a private repository public, choosing a license, or setting up packaging and release automation ahead of a public launch. Declared hosts: any.

Comparison baseline and alternatives: oss-repo-health audits an already-public repository's ongoing practices and hands the pre-release secrets audit to this entry. github-actions-hardening reviews workflows in more depth. Hosts have no built-in release-readiness workflow.

Useful launch checklist; do not infer release readiness from presence checks.

## Inspection and provenance

Pinned upstream revision: `123037ec8aed26f0d86327cc39137ee5043e5deb`. Exact file digests, source URLs, prior rating and inspection status are recorded under `open-sourcing` in the [assessment manifest](2026-10-29-catalog-assessment-sources.json). Linked source content was treated as data; no installer, upstream helper or integration was executed.

- [plugins/open-sourcing/skills/open-sourcing/SKILL.md](https://raw.githubusercontent.com/trailofbits/skills/123037ec8aed26f0d86327cc39137ee5043e5deb/plugins/open-sourcing/skills/open-sourcing/SKILL.md) — read in full.

The listed excerpts support partial judgments only. Unlisted runtime, required references and transitive dependencies are outside coverage; no aggregate is assigned.

## Grades

| Criterion | Grade (0–4) | Rationale |
| --- | ---: | --- |
| Practical value | 3 | Secrets-first readiness and launch sequencing address a distinct release task. |
| Dependability | Not graded | Required readiness scripts and language/licensing references were not inspected anew. |
| Cognitive ease | 3 | A staged launch checklist is understandable but wider than a simple publication task. |
| Human control | 2 | Default license and repository-policy choices require explicit project-owner decisions. |
| Adoption cost | 2 | Organization detection and language-specific paths require setup and interpretation. |
| Compatibility | 3 | Most practices transfer across hosts; sibling overlays introduce dependencies. |
| Upkeep | 2 | Release platforms, policies and language templates change. |

Aggregate: **incomplete — withheld**. Weights are provisional editorial choices. Expected developer benefit and burden are predictions from the artifact, not measured outcomes.

## Evidence and limits

Evidence remains **reviewed**. This pass adds no activation, installation or matched-outcome evidence. Existing records, where present, cover only the scope they describe. Host overlap is compared with the recorded catalog alternatives; this is not a fresh audit of every host release.

Previous curator notes, retained as history rather than newly verified facts: Read SKILL.md, licensing reference, both scripts and manifest; scanned the language references. Scripts are read-only presence checks and a remote/email grep, with no network or writes. The secrets-first ordering and rationalizations to reject are the distinctive part. A Trail of Bits overlay loads only when detected; the Python reference defers to a sibling modern-python skill. Launch-focused, so ongoing upkeep (changelog, templates, CODEOWNERS) is thin. Linked because the repository is CC-BY-SA-4.0.

Open inspection gaps:

- Core inspected; inspect both scripts and required references. Earlier metadata reports read-only checks, which this pass does not independently re-audit.

## Disposition and next evidence

Pending further inspection; retain with an incomplete profile. No payload, installation policy, hooks or tool connections are changed by this rating.

Resolve the named inspection gaps first. A useful next trial would compare the intended task with the named baseline, recording completion, correction effort, interruptions, comprehension and retained human control. Revisit the grades after material source/host changes or consequential failures.
