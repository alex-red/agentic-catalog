# Commit in commitlint repositories: human-focused assessment

Reviewed 2026-10-29 (America/Edmonton) by Codex, an AI curator. Rubric: [human-v1](../ratings.md). This is one curator’s source-based judgment, not independent human calibration or a behavioral evaluation.

Developers working on this task: A repository enforces commit messages with commitlint, through husky, lefthook or a commit-msg hook, and agent commits keep getting rejected. Declared hosts: any.

Comparison baseline and alternatives: git-commit covers Conventional Commits generally and also reads commitlint configuration, but does not validate before committing or interpret rejections. Host commit procedures say not to skip hooks but give no recovery method.

Prefer the project-local executable: upstream npx commands can download packages. Intended for existing commitlint repositories.

## Inspection and provenance

Pinned upstream revision: `36dc150fc3c0ef5f0860e9f2ef7729a6d9c7db72`. Exact file digests, source URLs, prior rating and inspection status are recorded under `committing-with-commitlint` in the [assessment manifest](2026-10-29-catalog-assessment-sources.json). Linked source content was treated as data; no installer, upstream helper or integration was executed.

- [entries/skills/committing-with-commitlint/SKILL.md](../../entries/skills/committing-with-commitlint/SKILL.md) — read in full.

Other packaged or fetched files not inspected in this pass: `entries/skills/committing-with-commitlint/LICENSE.txt`.

The grades cover the inspected core and relevant paths. Unread optional examples, adapters, licenses and conditional resources are not cleared by this assessment. Local or upstream tests were not run as behavioral evaluation.

## Grades

| Criterion | Grade (0–4) | Rationale |
| --- | ---: | --- |
| Practical value | 3 | Adds exact configuration and rejection recovery. |
| Dependability | 3 | Reads effective rules and validates the whole message. |
| Cognitive ease | 3 | Named-rule fixes avoid repeated message guessing. |
| Human control | 3 | Never bypasses hooks; npx may download code. |
| Adoption cost | 3 | Low friction when commitlint already exists. |
| Compatibility | 3 | Adopts local rules rather than imposing a preset. |
| Upkeep | 3 | Command resolution and config formats can change. |

Aggregate: **7.5/10**. Weights are provisional editorial choices. Expected developer benefit and burden are predictions from the artifact, not measured outcomes.

## Evidence and limits

Evidence remains **reviewed**. This pass adds no activation, installation or matched-outcome evidence. Existing records, where present, cover only the scope they describe. Host overlap is compared with the recorded catalog alternatives; this is not a fresh audit of every host release.

Previous curator notes, retained as history rather than newly verified facts: Written by the commitlint maintainers; complete one-file skill read at the pin. Narrow and precise, with a concrete self-correction loop from hook output. `npx commitlint` can download the package when it is not installed locally, so it is not offline-safe; prefer the project's local binary. Only useful in repositories that already use commitlint.

## Disposition and next evidence

Keep for the stated use, subject to the limits below. No payload, installation policy, hooks or tool connections are changed by this rating.

A useful next trial would compare the intended task with the named baseline, recording completion, correction effort, interruptions, comprehension and retained human control. Revisit the grades after material source/host changes or consequential failures.
