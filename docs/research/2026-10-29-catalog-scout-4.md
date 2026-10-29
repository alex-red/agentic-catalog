# Open-source repository and Git commit practices

**Admission follow-up:** at the user's request, the recommended additions below were admitted the same day ([decision 53](../decisions.md)), and the review-next candidates were then decided ([decision 54](../decisions.md)). See the [selection guide](../repository-practices-options.md).

## Scope and baseline

**As of:** October 29, 2026, America/Edmonton. **Research date:** the same day. This is live source research, not a historical reconstruction or a behavioral trial.

**Requested focus:** catalog items for open-source repository practices and Git commit practices. Two lanes:

- **Commits:** message conventions, atomic commits, history hygiene, commitlint, trailers and signing.
- **Repositories:** community health files, licensing, security policy, branch rules, versioning, changelogs, releases and GitHub Actions hardening.

Baseline: [PLAN.md](../../PLAN.md), [CONTRIBUTING.md](../../CONTRIBUTING.md), [decisions](../decisions.md) through 52, the [October 27 scout](2026-10-27-catalog-scout.md) (Actions security review queue) and the [October research queue](../research-2026-10.md). Before this pass the catalog had no commit, changelog, release or repository-health entry. Nearby coverage: the `git-safety` and `protect-files-and-commands` hooks, `gh-fix-ci`, `security-threat-model` and `focused-changes`.

**Host overlap:**

- **Claude Code** ships a built-in git commit procedure. It commits only when asked, stages explicit files, warns about secrets, never skips hooks or amends after a hook failure, matches the repository's log style, adds an attribution trailer controlled by the `attribution` setting, and never pushes unprompted. Its `/security-review` targets code changes, not workflow configuration.
- **Codex** prompts ([openai/codex at `e9854c0a`](https://github.com/openai/codex/tree/e9854c0aa52d494fa4f4c3683741461e2640011b)) forbid unrequested commits and branches and destructive resets, but give no message format.
- **No host** covers splitting work into a commit series, fixups and autosquash, commitlint, trailer semantics or signing.

## Coverage and observations

Two research workers swept the following, and the curator re-read every admitted payload:

- GitHub search: skill and plugin queries for commit, changelog, release, open source and zizmor.
- Repositories: anthropics/skills, openai/skills, github/awesome-copilot, trailofbits/skills, getsentry/skills, obra/superpowers, EveryInc/compound-engineering-plugin and the official Claude plugin marketplace.
- Lists and directories: VoltAgent/awesome-agent-skills, hesreallyhim/awesome-claude-code, and the skills.sh search API (commit, changelog, release, readme, open source).
- Primary references: Conventional Commits 1.0.0, Git documentation and release notes, kernel patch guidance, GitHub community health and Actions security documentation, OpenSSF Scorecard and Best Practices, SemVer 2.0.0 and Keep a Changelog 1.1.0.

About 25 distinct artifacts were collected and 14 read closely. This is a sampled survey, not a census.

| Artifact | Stars (repository) | skills.sh installs |
| --- | ---: | ---: |
| github/awesome-copilot `git-commit` | 40,570 | 47,623 |
| github/awesome-copilot `github-actions-hardening` | 40,570 | 2,258 |
| conventional-changelog/commitlint `committing-with-commitlint` | 18,788 | 64 |
| trailofbits/skills `open-sourcing` | 7,878 | 1,435 |
| conventional-changelog/conventional-changelog `conventional-commit-message` | about 8,500 | 977 |
| EveryInc/compound-engineering-plugin `ce-commit` | about 25,800 | 3,391 |
| getsentry/skills `commit` | about 1,100 | 4,749 |
| basecamp/house-skills `harden-github-actions` | 98 | 38 |

Stars are whole-repository attention, and installs are anonymous all-time CLI telemetry. Neither establishes use or quality.

Source access was not uniform. The anonymous GitHub API rate-limited part of the pass. Path pins were confirmed with the authenticated CLI, and each pinned file was compared byte for byte with repository HEAD.

## Recommend adding

| Rank | Proposal | Mode | Gap it fills |
| --- | --- | --- | --- |
| 1 | Commit history hygiene | adapted | Commit series, non-interactive splitting, per-commit verification, fixup/autosquash, trailers, signing |
| 2 | Open-source repository health audit | adapted | Ongoing repository upkeep: docs, license consistency, community files, security policy, branch rules, SemVer, changelog, releases |
| 3 | [git-commit](https://github.com/github/awesome-copilot/blob/5406429999c924586c02d4799d465a914a12c28e/skills/git-commit/SKILL.md) | vendored | Conventional Commits format with safe staging, especially for hosts without a commit procedure |
| 4 | [github-actions-hardening](https://github.com/github/awesome-copilot/tree/df566343b3a685e821f8ebe8ea70a2a8eb8b857b/skills/github-actions-hardening) | vendored | Workflow security review; resolves the open Actions security queue item with a different candidate |
| 5 | [open-sourcing](https://github.com/trailofbits/skills/tree/123037ec8aed26f0d86327cc39137ee5043e5deb/plugins/open-sourcing/skills/open-sourcing) | linked | Going public: secrets first, then license, docs, CI and releases |
| 6 | [committing-with-commitlint](https://github.com/conventional-changelog/commitlint/blob/36dc150fc3c0ef5f0860e9f2ef7729a6d9c7db72/skills/committing-with-commitlint/SKILL.md) | vendored | Repositories that enforce commitlint |

### git-commit (awesome-copilot)

| Field | Record |
| --- | --- |
| Identity | `skills/git-commit/SKILL.md`, path pin `5406429999c924586c02d4799d465a914a12c28e` (October 16); identical at HEAD `b6483db44fb602654bca6a097185fcaddb305f97`. |
| Inspection | Complete 127-line file and root MIT license. `git add --resolved` was confirmed in the Git 2.56 release notes, and `git history` in upstream documentation as experimental; local Git 2.51 has neither. |
| Fit | Repository rules take precedence over its own format. It forbids interactive staging, checks staged names for secrets, and on a hook failure retries rather than amending. It never pushes or rewrites history. Its file-level splitting is the main limit. High overlap with Claude Code's built-in procedure; the added value is the format, and more on Codex. |
| Decision | Vendor, novelty 2. |

### github-actions-hardening (awesome-copilot)

| Field | Record |
| --- | --- |
| Identity | `skills/github-actions-hardening/`, path pin `df566343b3a685e821f8ebe8ea70a2a8eb8b857b` (June 16); six files identical at HEAD. |
| Inspection | All six files and the root MIT license. Report-only ("Never auto-apply changes"). |
| Defects | The trust matrix states token scopes as fixed, but they follow repository default permissions. The `workflow_run` example's artifact download omits the `run-id` and `github-token` inputs a cross-run download needs. It never runs zizmor or actionlint. |
| Fit | Different from getsentry `gha-security-review`, which stays in Review next: broader hardening coverage, no external-attacker-only scope, and a simpler MIT single-folder license. |
| Decision | Vendor, with the defects recorded in rating notes. |

### open-sourcing (Trail of Bits)

| Field | Record |
| --- | --- |
| Identity | `plugins/open-sourcing/skills/open-sourcing/`, path pin `123037ec8aed26f0d86327cc39137ee5043e5deb` (September 16), plugin 0.1.2. |
| Inspection | SKILL.md, licensing reference, both scripts, plugin manifest and marketplace entry; the six language references were scanned for commands and sibling dependencies. |
| Scripts | `check_readiness.sh` makes read-only presence checks and greps tracked file names. `detect_org.sh` greps remotes and committer emails. Neither has network access or writes. |
| Dependencies | The Python reference defers to a sibling `modern-python` skill. |
| Decision | Link (CC-BY-SA-4.0). It is the strongest launch-time artifact found. Weak on ongoing upkeep, which motivates proposal 2. |

### committing-with-commitlint (commitlint maintainers)

| Field | Record |
| --- | --- |
| Identity | `skills/committing-with-commitlint/SKILL.md`, path pin `36dc150fc3c0ef5f0860e9f2ef7729a6d9c7db72` (June 2); identical at HEAD `4467ec47655f4236ed1b7d3e50b511baa8d45b91`. Root `license.md` is MIT. |
| Fit | Reads the effective config, validates the full message via stdin, and fixes only the bracketed rules from a hook rejection. `npx` may fetch the package when it is not installed. |
| Decision | Vendor; narrow but exact. |

### Adapted proposals

**Commit history hygiene.** No candidate or host covers:

- splitting mixed edits without `add -p`
- per-commit verification
- non-interactive autosquash
- trailer semantics
- signing failures

Candidate skills either recommend interactive commands (`softaworks/commit-work`, `thoughtbot/atomic-commits`) or commit on every step without being asked. These were exercised in a scratch repository on Git 2.51:

- non-interactive `rebase --autosquash` with `GIT_EDITOR=false`
- `rebase --exec` stopping at the first failing commit
- `--fixup=reword:` rejecting `-m` and `-F`

The Git 2.44 autosquash change was checked in the release notes.

**Repository health audit.** No candidate covers ongoing upkeep in one read-only pass:

- Keep a Changelog
- CODEOWNERS and issue forms
- private vulnerability reporting
- rulesets
- release tool choice

Its four `gh` queries were run read-only against `cli/cli`.

## Review next

At the user's request, the four review-next candidates were read in full and decided the same day ([decision 54](../decisions.md)):

| Candidate | Decision | Reason |
| --- | --- | --- |
| trailofbits `agentic-actions-auditor`, pin `123037ec8aed26f0d86327cc39137ee5043e5deb` | **Linked, experimental** | Distinct agent-specific vectors (env intermediaries, runtime `gh` fetches, log injection, eval of model output). Read-only. Verified defects: its AI-output remediation labelled SAFE interpolates model output into single quotes in `run:`, which is still injectable, and uses a wrong output name; Gemini sandbox defaults contradict across files. |
| conventional-changelog `conventional-commit-message`, pin `74a977a970f0eb5cdf317538baec8290eb909a05` | **Linked** | Release-impact typing and breaking-change red flags; message-only. Linked, not vendored, because the frontmatter says MIT and the repository license is ISC. |
| getsentry `gha-security-review`, pin `b11ee5163295996fa6449c4842749811c82ac77c` | **Hold** | Its exploit-path discipline is distinct, but its do-not-flag list exempts `${{ }}` in `with:` and never mentions `actions/github-script`. It also offers a bypassable `workflow_run.head_branch == 'main'` guard as safe, and its cache-poisoning example contradicts its own scope table. Suppression rules that hide real injections are disqualifying for a security reviewer. Reopen at a pin that fixes them. |
| basecamp `harden-github-actions`, pin `2d2468e6403eca6170056f8003b22ddd2a029b1c` | **Hold** | The best zizmor-driven fixer, but it commits each step without asking, passes the user's full `gh auth token` to zizmor, and tells the agent to edit the skill's own files. It also suppresses cache-poisoning findings by default on an overconfident "requires push access" argument, and it carries Basecamp-only assumptions ("all our target repos are public", dismiss bot reviewers). Reopen if upstream generalizes it and gates commits. |

## Watch / hold / skip

| Artifact | Disposition and reason |
| --- | --- |
| thoughtbot `atomic-commits` plugin | Hold. Its trigger fires on any code change, it says to commit after each step, it recommends `add -p`, and the plugin installs a hook implicitly. 4 stars. |
| EveryInc `ce-commit` | Skip as an entry: it creates branches without asking and depends on sibling skills. Its pathspec staging and co-author email rule are cited as inspiration. |
| getsentry `commit` | Skip: Sentry house style, auto-branching, an over-broad trigger. |
| awesome-copilot `conventional-commit` | Skip: commits without confirmation. |
| anthropics `commit-commands` plugin | Skip: a thin wrapper over built-in behavior; `/commit-push-pr` pushes and opens a PR in one step. |
| openai `yeet` | Skip: `git add -A`, installs dependencies, retries pushes. |
| awesome-copilot `repo-standardizer`, `github-release` | Skip: push to the default branch, write settings through `gh api`, tag and push. |
| glebis `repo-prep` | Skip: personal configuration paths and a network license fetcher. |
| scrutineer `zizmor` | Skip: depends on its own harness. |
| NASA-AMMOS SLIM | Watch: verbose template generators, low adoption. |
| Changelog generator skills (wshobson, composio) | Skip: commit-to-notes generators, not maintenance guidance. |

## Revisit existing entries

- **`git-safety`, `protect-files-and-commands`:** they complement the new commit entries by blocking force pushes and protected-branch writes. No change is needed.
- **`gh-fix-ci`:** it repairs failing checks, while `github-actions-hardening` hardens workflows. The new entry lists it as related; no change is needed.

## Changes since baseline

- The Actions security queue item now has an admitted alternative. getsentry `gha-security-review` was then held after a full read.
- New tags: `open-source`, `commits`, `conventional-commits`, `licensing`, `releases`, `supply-chain`.
- Other prior holds (sharp-edges, Durable Objects, Terraform, Supabase, Django, Planning with Files) are unchanged; see the [October 27 report](2026-10-27-catalog-scout.md).

## Top priorities

1. **Commit history hygiene**, adapted. It fills the largest gap, and agents can follow it without interactive tools.
2. **Repository health audit**, adapted. It covers ongoing upkeep that launch-focused skills skip.
3. **github-actions-hardening**, vendored. It is report-only and resolves a long-open queue item.
4. **git-commit and committing-with-commitlint**, vendored. They are complementary message-format skills, and the first has low novelty on Claude Code.
5. **open-sourcing**, linked. It is the launch-time counterpart to the audit.

The review-next candidates were resolved afterwards; see Review next.
