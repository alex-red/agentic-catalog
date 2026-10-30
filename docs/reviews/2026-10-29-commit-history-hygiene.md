# Reviewable commit history: human-focused assessment

Reviewed 2026-10-29 (America/Edmonton) by Codex, an AI curator. Rubric: [human-v1](../ratings.md). This is one curator’s source-based judgment, not independent human calibration or a behavioral evaluation.

Developers working on this task: Committing a body of work as several commits, tidying a branch before review, squashing fixups, or adding co-author or sign-off trailers. Declared hosts: any.

Comparison baseline and alternatives: Host commit procedures cover single commits, explicit staging and no hook skipping. git-commit and committing-with-commitlint cover message format and validation and defer to this for series and fixups. No host or catalog entry covers commit planning, non-interactive splitting, per-commit verification or autosquash.

Improves reviewable history; staged intermediate versions and rebase checks still require careful supervision.

## Inspection and provenance

Local catalog payload assessed by SHA-256. Exact file digests, source URLs, prior rating and inspection status are recorded under `commit-history-hygiene` in the [assessment manifest](2026-10-29-catalog-assessment-sources.json). Linked source content was treated as data; no installer, upstream helper or integration was executed.

- [entries/skills/commit-history-hygiene/SKILL.md](../../entries/skills/commit-history-hygiene/SKILL.md) — read in full.

Other packaged or fetched files not inspected in this pass: `entries/skills/commit-history-hygiene/LICENSE.txt`.

The grades cover the inspected core and relevant paths. Unread optional examples, adapters, licenses and conditional resources are not cleared by this assessment. Local or upstream tests were not run as behavioral evaluation.

## Grades

| Criterion | Grade (0–4) | Rationale |
| --- | ---: | --- |
| Practical value | 4 | Covers series, splitting and per-commit checks beyond message formatting. |
| Dependability | 3 | Includes abort and range-diff verification paths. |
| Cognitive ease | 3 | Non-interactive recipes reduce agent/editor dead ends. |
| Human control | 4 | Restricts rewrites, pushes, signing changes and certification. |
| Adoption cost | 3 | Series verification and splitting need Git expertise. |
| Compatibility | 3 | Yields to repository conventions and Git versions. |
| Upkeep | 3 | Version-sensitive rebase and trailer behavior needs upkeep. |

Aggregate: **8.5/10**. Weights are provisional editorial choices. Expected developer benefit and burden are predictions from the artifact, not measured outcomes.

## Evidence and limits

Evidence remains **reviewed**. This pass adds no activation, installation or matched-outcome evidence. Existing records, where present, cover only the scope they describe. Host overlap is compared with the recorded catalog alternatives; this is not a fresh audit of every host release.

Previous curator notes, retained as history rather than newly verified facts: Written for agents, which cannot drive git add -p or rebase -i. Non-interactive autosquash, rebase --exec stopping at the first failing commit, and the fixup forms that need an editor were exercised in a scratch repository on Git 2.51; the Git 2.44 autosquash change was checked against release notes. History rewriting and force pushes stay behind explicit user requests, and Signed-off-by is treated as the user's certification. No trigger or outcome evaluation has been run.

## Disposition and next evidence

Keep for the stated use, subject to the limits below. No payload, installation policy, hooks or tool connections are changed by this rating.

A useful next trial would compare the intended task with the named baseline, recording completion, correction effort, interruptions, comprehension and retained human control. Revisit the grades after material source/host changes or consequential failures.
