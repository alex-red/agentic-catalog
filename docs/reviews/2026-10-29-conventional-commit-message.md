# Release-aware Conventional Commit messages: human-focused assessment

Reviewed 2026-10-29 (America/Edmonton) by Codex, an AI curator. Rubric: [human-v1](../ratings.md). This is one curator’s source-based judgment, not independent human calibration or a behavioral evaluation.

Developers working on this task: Writing commit messages in a repository whose releases and changelog are generated from commits, such as with conventional-changelog, release-please or semantic-release. Declared hosts: any.

Comparison baseline and alternatives: git-commit covers the Conventional Commits format with a basic type table and commits. committing-with-commitlint validates against enforced rules. This adds release-impact typing and monorepo scope rules for commit-driven release tooling.

Useful with commit-driven releases; visible/hidden type semantics are preset-specific, not universal SemVer rules.

## Inspection and provenance

Pinned upstream revision: `74a977a970f0eb5cdf317538baec8290eb909a05`. Exact file digests, source URLs, prior rating and inspection status are recorded under `conventional-commit-message` in the [assessment manifest](2026-10-29-catalog-assessment-sources.json). Linked source content was treated as data; no installer, upstream helper or integration was executed.

- [skills/conventional-commit-message/SKILL.md](https://raw.githubusercontent.com/conventional-changelog/conventional-changelog/74a977a970f0eb5cdf317538baec8290eb909a05/skills/conventional-commit-message/SKILL.md) — read in full.

The grades cover the inspected core and relevant paths. Unread optional examples, adapters, licenses and conditional resources are not cleared by this assessment. Local or upstream tests were not run as behavioral evaluation.

## Grades

| Criterion | Grade (0–4) | Rationale |
| --- | ---: | --- |
| Practical value | 3 | Adds release-impact typing and public-contract checks. |
| Dependability | 3 | Configuration-aware rules; some examples conflict with footer advice. |
| Cognitive ease | 3 | User-facing message construction reduces classification guesswork. |
| Human control | 4 | Message-only output does not commit or rewrite history. |
| Adoption cost | 3 | One file; optional local commitlint validation. |
| Compatibility | 3 | Tuned to a release preset and existing scope rules. |
| Upkeep | 3 | Preset bump behavior and tooling must be rechecked. |

Aggregate: **7.9/10**. Weights are provisional editorial choices. Expected developer benefit and burden are predictions from the artifact, not measured outcomes.

## Evidence and limits

Evidence remains **reviewed**. This pass adds no activation, installation or matched-outcome evidence. Existing records, where present, cover only the scope they describe. Host overlap is compared with the recorded catalog alternatives; this is not a fresh audit of every host release.

Previous curator notes, retained as history rather than newly verified facts: Complete 264-line file read at the pin; spec rules on footers, BREAKING CHANGE casing and token hyphens are accurate. The release-impact red flags are the distinctive part. Tuned to the conventionalcommits preset; whether hidden types bump depends on the release tool. One example puts an issue reference in the subject, contradicting its own footer rule. Message-only, so it does not commit.

## Disposition and next evidence

Keep for the stated use, subject to the limits below. No payload, installation policy, hooks or tool connections are changed by this rating.

A useful next trial would compare the intended task with the named baseline, recording completion, correction effort, interruptions, comprehension and retained human control. Revisit the grades after material source/host changes or consequential failures.
