# GitHub Actions hardening review: human-focused assessment

Reviewed 2026-10-29 (America/Edmonton) by Codex, an AI curator. Rubric: [human-v1](../ratings.md). This is one curator’s source-based judgment, not independent human calibration or a behavioral evaluation.

Developers working on this task: Reviewing, writing or hardening .github/workflows files, especially ones using pull_request_target, workflow_run or issue_comment. Declared hosts: any.

Comparison baseline and alternatives: Claude Code /security-review targets application code changes, not workflow configuration; gh-fix-ci repairs failing checks; security-threat-model covers system design. agentic-actions-auditor adds AI-agent workflow vectors. getsentry gha-security-review was held because its do-not-flag rules exempt inputs passed through with, including github-script scripts.

Useful review lens, but do not copy the cross-run download example or fixed permission claims unchanged.

## Inspection and provenance

Pinned upstream revision: `df566343b3a685e821f8ebe8ea70a2a8eb8b857b`. Exact file digests, source URLs, prior rating and inspection status are recorded under `github-actions-hardening` in the [assessment manifest](2026-10-29-catalog-assessment-sources.json). Linked source content was treated as data; no installer, upstream helper or integration was executed.

- [entries/skills/github-actions-hardening/SKILL.md](../../entries/skills/github-actions-hardening/SKILL.md) — read in full.
- [entries/skills/github-actions-hardening/references/injection.md](../../entries/skills/github-actions-hardening/references/injection.md) — read in full.
- [entries/skills/github-actions-hardening/references/permissions-and-tokens.md](../../entries/skills/github-actions-hardening/references/permissions-and-tokens.md) — read in full.
- [entries/skills/github-actions-hardening/references/report-format.md](../../entries/skills/github-actions-hardening/references/report-format.md) — read in full.
- [entries/skills/github-actions-hardening/references/supply-chain.md](../../entries/skills/github-actions-hardening/references/supply-chain.md) — read in full.
- [entries/skills/github-actions-hardening/references/triggers-and-privilege.md](../../entries/skills/github-actions-hardening/references/triggers-and-privilege.md) — read in full.

Other packaged or fetched files not inspected in this pass: `entries/skills/github-actions-hardening/LICENSE.txt`.

The grades cover the inspected core and relevant paths. Unread optional examples, adapters, licenses and conditional resources are not cleared by this assessment. Local or upstream tests were not run as behavioral evaluation.

## Grades

| Criterion | Grade (0–4) | Rationale |
| --- | ---: | --- |
| Practical value | 4 | Targets Actions-specific trust boundaries beyond application review. |
| Dependability | 2 | Fixed-token assumptions and cross-run artifact example need correction. |
| Cognitive ease | 3 | Mechanism-first examples explain injection clearly. |
| Human control | 4 | Report-only; it never auto-applies fixes. |
| Adoption cost | 3 | Several references and workflow knowledge are required. |
| Compatibility | 3 | GitHub-specific and must respect repository token settings. |
| Upkeep | 3 | Platform permissions and action versions drift. |

Aggregate: **8.0/10** · scoped blocker(s) remain. Weights are provisional editorial choices. Expected developer benefit and burden are predictions from the artifact, not measured outcomes.

## Evidence and limits

Evidence remains **reviewed**. This pass adds no activation, installation or matched-outcome evidence. Existing records, where present, cover only the scope they describe. Host overlap is compared with the recorded catalog alternatives; this is not a fresh audit of every host release.

Previous curator notes, retained as history rather than newly verified facts: All six files read at the pin. The core insight (expressions are pasted into the script before the shell runs) and the two-workflow pattern are correct and well taught. It never applies changes. Its trust matrix presents token scopes as fixed, but they follow repository default permissions. The workflow_run example downloads an artifact without the run-id and github-token inputs that a cross-run download needs. It reasons only, without running zizmor or actionlint. No trigger or outcome evaluation has been run.

Scoped blockers:

- **Cross-run artifact remediation example:** The documented workflow_run download omits cross-run identification/authentication inputs; validate and correct it before using that remediation.

## Disposition and next evidence

Refresh affected paths; retain the entry with explicit blockers. No payload, installation policy, hooks or tool connections are changed by this rating.

Correct or independently verify the affected recipe/policy before using that path. A useful next trial would compare the intended task with the named baseline, recording completion, correction effort, interruptions, comprehension and retained human control. Revisit the grades after material source/host changes or consequential failures.

The artifact-download concern was checked against the [official download-artifact cross-run instructions](https://github.com/actions/download-artifact#download-artifacts-from-other-workflow-runs-or-repositories) and [GitHub workflow_run documentation](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#workflow_run). These support the remediation concern, not a behavioral result for this skill.
