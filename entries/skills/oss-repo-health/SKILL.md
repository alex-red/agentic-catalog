---
name: oss-repo-health
description: Audit an open-source repository's health - front-door documentation, licensing, contribution and community files, security policy and reporting, branch rules, dependency updates, versioning, changelog and release process - and produce a prioritized, evidence-backed report before changing anything. Use when asked to review or improve a public repository's practices, prepare it for outside contributors, or set up versioning, changelogs or releases. Not for the one-time secrets and history audit before making a private repository public, or for reviewing workflow YAML security in depth.
license: MIT
---

# Open-source repository health

Assess whether a public repository is easy to understand, legally usable, safe to depend on and practical to contribute to. Produce findings first. Change files or settings only for the items the user approves.

## Scope and handoffs

- **About to make a private repository public?** The first job is a secrets and history audit, which cannot be fixed after publication. Use a pre-release skill such as `open-sourcing` for that, then return here.
- **Workflow files under `.github/workflows/`** need a dedicated review of triggers, injection, token permissions and action pinning. Note their presence here and hand them to a workflow-hardening skill such as `github-actions-hardening`, or to `zizmor` if the project uses it.
- **Other forges** (GitLab, Codeberg, Gitea) have equivalent files and settings under different names. Map each check to the forge in use rather than skipping it.

## Calibrate to the project

Before judging gaps, establish what kind of project this is, because a weekend prototype does not need what a widely used library needs. Determine from the repository and the user:

- Its kind: library or package, application, CLI tool, research code, documentation or data.
- Its audience: whether it publishes to a package index, and whether others depend on it.
- Who maintains it: one person or a team, and whether outside contributions are wanted.

State these assumptions at the top of the report. Mark a check as not applicable instead of reporting it as a gap when the project kind makes it irrelevant.

## Gather evidence without side effects

Read files from the working tree and use read-only queries only. With the GitHub CLI:

```bash
gh repo view --json name,visibility,defaultBranchRef,licenseInfo,hasIssuesEnabled,isArchived
gh api repos/{owner}/{repo}/community/profile
gh api repos/{owner}/{repo}/rulesets
gh api repos/{owner}/{repo}/private-vulnerability-reporting
```

Some settings, such as classic branch protection and security features, need admin access to read. When a query fails for lack of access, or the CLI is unavailable, record the item as **unknown** with the reason. Never report it as missing.

## What to check

### Front door

- **README**: what the project is and why it exists, in the first paragraph; how to install it; one copy-pasteable usage example; project status or maturity; and where to get help. Building or installing from a fresh clone must work from the README alone.
- **License**: a `LICENSE` file with the full text, using a recognized SPDX identifier. The license in package metadata (`package.json`, `pyproject.toml`, `Cargo.toml` and similar) and in the README must agree with it. Flag disagreements, and flag files vendored from elsewhere whose own licenses are not preserved.
- **Choosing a license** is the owner's legal decision. If none exists, explain the common options and their consequences (permissive such as MIT or Apache-2.0, copyleft such as GPL or AGPL), point to choosealicense.com, and let the owner decide. Never pick one.

### Contributing and community

- **`CONTRIBUTING.md`**: development setup, how to run tests and checks, the commit and pull-request conventions, and what kinds of contribution are welcome.
- **`CODE_OF_CONDUCT.md`** with a working contact, when the project expects outside contributors.
- **Issue forms or templates and a pull-request template** that ask for the information maintainers actually need, such as version, reproduction steps and expected behavior. Prefer issue forms (`.github/ISSUE_TEMPLATE/*.yml`) on GitHub.
- **`CODEOWNERS`**, when review routing matters. Check that its paths exist and its owners are real users or teams.
- **`SUPPORT.md`** or a README section that separates questions from bug reports.
- Labels such as "good first issue" if the project wants newcomers.

### Security

- **`SECURITY.md`**: which versions receive fixes, and a private way to report a vulnerability. That can be GitHub private vulnerability reporting, if it is enabled, or a monitored address. Public issues are not a private channel.
- **Automated dependency updates** (Dependabot or Renovate), covering the package ecosystems in use and GitHub Actions. Grouping updates and a short cooldown before adopting new releases reduce noise and exposure to hijacked releases.
- **Secret scanning and push protection**, where the forge offers them.
- **Workflows**: present or absent, and handed off as described above.

### Change control

- **The default branch** is protected by a ruleset or branch protection: changes go through pull requests, required status checks pass before merging, and force pushes and deletion are blocked.
- **CI** runs the tests on pull requests, and the default branch is currently passing.
- Signed commits or tags are optional. Recommend them only when the project's threat model or its users ask for them.

### Versions, changelog and releases

- **Versioning**: anything others depend on should follow Semantic Versioning 2.0.0 and say what its public API is. Tag releases consistently, for example `vX.Y.Z`.
- **Changelog**: a human-written `CHANGELOG.md` following Keep a Changelog 1.1.0, with an `Unreleased` section, newest release first, ISO dates and the change types Added, Changed, Deprecated, Removed, Fixed and Security. Release notes generated from merged pull requests are an acceptable alternative when they are curated. A raw commit log is not a changelog.
- **Release process**: releases are built and published by CI from a tag or a release, not from a maintainer's machine. Prefer trusted publishing (OIDC) over long-lived registry tokens where the registry supports it.
- **Release automation**: recommend a tool only when manual releases are a real burden, and keep a working process that already exists:
  - **release-please**, when the history already follows Conventional Commits and maintainers want a reviewable release PR.
  - **Changesets**, for JavaScript monorepos where each PR declares its own version impact.
  - **semantic-release**, for fully automated publishing on merge, when strict Conventional Commits are enforced.

### Maintenance signals

Note whether the project looks alive or abandoned to a newcomer, without making it part of the score:

- Recent activity and open, unanswered issues.
- Archived status, or a stated maintenance policy.
- A `CITATION.cff` for research software that people will cite.

## Report

Lead with the assumptions about project kind, audience and maintainers. Then give one table, ordered by priority:

| Priority | Area | Finding | Evidence | Proposed change |
| --- | --- | --- | --- | --- |

Use these priorities:

- **Must**: legal or security exposure. Examples: no license, conflicting license metadata, no private vulnerability channel, a protected branch that is not protected.
- **Should**: friction for users or contributors.
- **Could**: polish.

Cite a path, command output or API field for every finding. List the **unknown** items separately, with what access would resolve them. Finish with what is already in good shape, so the user can see what was checked.

## Applying changes

- Change only the items the user approves. Write project-specific content from what you learned in the repository; do not paste generic boilerplate with placeholder names, emails or versions.
- Keep existing files, conventions and tooling. Extend them rather than replacing them.
- Repository settings (rulesets, security features, labels, visibility) are outward-facing. Give the user the exact `gh` command or settings page to apply them. Run it yourself only with explicit approval for that specific change.
- Do not commit, push, tag or publish unless asked.
