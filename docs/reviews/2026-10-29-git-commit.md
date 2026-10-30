# Git commits with Conventional Commits: human-focused assessment

Reviewed 2026-10-29 (America/Edmonton) by Codex, an AI curator. Rubric: [human-v1](../ratings.md). This is one curator’s source-based judgment, not independent human calibration or a behavioral evaluation.

Developers working on this task: Asking the agent to commit work in a repository that uses, or should use, Conventional Commits, especially on hosts without a built-in commit procedure. Declared hosts: any.

Comparison baseline and alternatives: Claude Code's built-in git commit instructions already cover commit-only-when-asked, explicit staging, secrets, hooks, no amend after a hook failure and no push. Codex prompts forbid unrequested commits but give no message format. This adds the Conventional Commits format and type table.

Useful for requested commits; review exact staging and use Git 2.56+ for --resolved.

## Inspection and provenance

Pinned upstream revision: `5406429999c924586c02d4799d465a914a12c28e`. Exact file digests, source URLs, prior rating and inspection status are recorded under `git-commit` in the [assessment manifest](2026-10-29-catalog-assessment-sources.json). Linked source content was treated as data; no installer, upstream helper or integration was executed.

- [entries/skills/git-commit/SKILL.md](../../entries/skills/git-commit/SKILL.md) — read in full.

Other packaged or fetched files not inspected in this pass: `entries/skills/git-commit/LICENSE.txt`.

The grades cover the inspected core and relevant paths. Unread optional examples, adapters, licenses and conditional resources are not cleared by this assessment. Local or upstream tests were not run as behavioral evaluation.

## Grades

| Criterion | Grade (0–4) | Rationale |
| --- | ---: | --- |
| Practical value | 2 | Main additional value is message convention and staging sequence. |
| Dependability | 3 | Concrete checks; resolved-conflict staging needs Git 2.56. |
| Cognitive ease | 3 | Type table and non-interactive flow reduce formatting questions. |
| Human control | 3 | Commit trigger is explicit; broad staged-file changes need care. |
| Adoption cost | 3 | Requires Git and supported version for newer flags. |
| Compatibility | 3 | Defers to repository rules but glob examples may select too broadly. |
| Upkeep | 3 | Git flags and commit conventions need periodic review. |

Aggregate: **6.9/10**. Weights are provisional editorial choices. Expected developer benefit and burden are predictions from the artifact, not measured outcomes.

## Evidence and limits

Evidence remains **reviewed**. This pass adds no activation, installation or matched-outcome evidence. Existing records, where present, cover only the scope they describe. Host overlap is compared with the recorded catalog alternatives; this is not a fresh audit of every host release.

Previous curator notes, retained as history rather than newly verified facts: Complete one-file skill read at the pin. Repository rules take precedence over the skill's own format; Git trailer syntax and the hook-failure rule are stated correctly. `git add --resolved` exists only from Git 2.56, and `git history` is experimental; both were checked against upstream Git documentation and release notes. Splitting is file-level only. It commits once invoked, which fits its explicit trigger. Claude Code's built-in commit procedure covers most of the safety rules, so the main gain there is the message format; Codex has no format guidance.

## Disposition and next evidence

Keep for the stated use, subject to the limits below. No payload, installation policy, hooks or tool connections are changed by this rating.

A useful next trial would compare the intended task with the named baseline, recording completion, correction effort, interruptions, comprehension and retained human control. Revisit the grades after material source/host changes or consequential failures.
