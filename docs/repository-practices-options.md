# Commit and repository practices

Eight skills cover writing commits and maintaining public repositories. They are separate jobs; install only the ones a project needs. The `open-source-maintenance` collection groups the upkeep set.

| Entry | Choose it for | Form |
| --- | --- | --- |
| [git-commit](../entries/skills/git-commit/SKILL.md) | A single commit with a Conventional Commits message | Vendored skill |
| [conventional-commit-message](../entries/skills/conventional-commit-message/entry.yaml) | Choosing types by release impact when releases and changelogs are generated from commits | Linked skill |
| [committing-with-commitlint](../entries/skills/committing-with-commitlint/SKILL.md) | Repositories that enforce commitlint in a commit-msg hook | Vendored skill |
| [commit-history-hygiene](../entries/skills/commit-history-hygiene/SKILL.md) | A series of reviewable commits, fixups and autosquash, trailers | Adapted skill |
| [oss-repo-health](../entries/skills/oss-repo-health/SKILL.md) | Auditing a public repository's docs, licensing, community files, security policy, branch rules and releases | Adapted skill |
| [github-actions-hardening](../entries/skills/github-actions-hardening/SKILL.md) | Reviewing workflow files for injection, privileged triggers, permissions and pinning | Vendored skill |
| [agentic-actions-auditor](../entries/skills/agentic-actions-auditor/entry.yaml) | Workflows that run AI agents: prompt injection paths and agent sandbox settings | Linked skill (experimental) |
| [open-sourcing](../entries/skills/open-sourcing/entry.yaml) | Taking a private repository public, secrets audit first | Linked skill (CC-BY-SA-4.0) |

## Choosing

- **Commit messages.** Claude Code already has a built-in commit procedure, so git-commit mainly adds the Conventional Commits format there; on Codex it adds more. Use committing-with-commitlint instead when commitlint is enforced, and conventional-commit-message when release tooling reads commit types. The repository's own rules always take precedence.
- **More than one commit.** commit-history-hygiene plans and verifies a series. It also folds review fixes in with fixup commits. History rewriting and force pushes still need an explicit request.
- **Public repositories.** Run oss-repo-health for ongoing upkeep. Before the first public release, run open-sourcing; it puts the secrets history audit first because that cannot be fixed afterwards. Both hand workflow security to github-actions-hardening; add agentic-actions-auditor when a workflow runs an AI agent, and avoid its AI-output remediation example, which is itself injectable.

These combine with the `git-safety` hook, which blocks direct writes to protected branches and destructive GitHub CLI actions.

## Limits

Every entry starts at evidence level `reviewed`. Payloads were read at their pins, and the Git and `gh` commands the adapted skills rely on were exercised in a scratch repository or against a public repository. No trigger or outcome evaluation has been run. See the [research report](research/2026-10-29-catalog-scout-4.md) and decisions [53 and 54](decisions.md). Held candidates and their reasons are in the research report.
