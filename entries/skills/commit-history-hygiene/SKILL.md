---
name: commit-history-hygiene
description: Shape work into a reviewable Git history - group and order changes into self-contained commits, split mixed edits without interactive staging, write messages that explain why, fold review fixes in with fixup commits, and handle trailers and signing correctly. Use when the user asks to commit a body of work as several commits, clean up a branch before review, squash fixups, or add co-author or sign-off trailers. Not for pushing, opening pull requests, or choosing a message convention a repository already defines.
license: MIT
---

# Commit history hygiene

A good history lets a reviewer read one commit at a time and lets a later maintainer bisect, revert or cherry-pick one change without dragging others along. Aim for commits that each do one thing, leave the project working, and say why they exist.

## Authority comes first

- Commit only when the user asks. Making several commits from a request to "commit this" is fine; making commits the user did not ask for is not.
- Rewrite only unpublished history on a branch the user owns, and only when asked (for example "clean up the branch" or "squash the fixups"). Never rewrite the default branch or a branch others build on.
- Do not push. After a rewrite of a branch that already exists on a remote, tell the user it needs `git push --force-with-lease` and let them run it or explicitly ask you to.
- Do not change Git configuration, skip hooks (`--no-verify`), or disable signing. If a hook or signing fails, report the failure and fix the cause.
- Repository rules win. Read `CONTRIBUTING.md`, any commitlint configuration, and `git log --format='%s' -20` before writing a message. If the project uses Conventional Commits, follow that format for every commit below.

## Plan the commits before staging

Read `git status --porcelain`, `git diff` and `git diff --staged`, then write a short plan: one line per intended commit, in order. Show it to the user when the split is not obvious or when it changes what they asked for.

Each commit should hold one logical change. Useful boundaries:

- Mechanical changes (formatting, renames, moved files, regenerated output) apart from behavior changes, so the behavior diff stays readable.
- Preparatory refactors before the feature that needs them.
- Dependency or lockfile updates apart from the code that uses them, unless the code cannot build without them.
- Tests with the change they cover, not in a later "add tests" commit.

If the summary of a commit needs "and" to join two unrelated actions, it is probably two commits. Do not split so finely that a commit cannot build on its own.

## Stage without interactive prompts

Interactive commands (`git add -p`, `git add -i`, `git rebase -i` without a sequence editor) wait for a person and will hang an agent.

- Stage whole files with explicit paths: `git add -- path/a path/b`. Avoid `git add -A` and `git add .`, which pick up unrelated and untracked files.
- When one file contains changes for two commits, build the intermediate version instead of editing patches by hand: save the final file aside, write the file with only the first change, `git add -- file`, commit, then restore the final version. Alternatively, write a patch containing only the wanted hunks and stage it with `git apply --cached`, checking it first with `git apply --cached --check`.
- Before every commit, read `git diff --staged --stat` and `git diff --staged`. Confirm that only the planned change is staged, and that no secrets (`.env`, keys, credentials), build output, large binaries or editor files are included.

## Write the message

When the repository has no convention, use the long-standing Git style:

- A subject line of about 50 characters (hard limit 72), in the imperative mood ("Fix", not "Fixed"), with no trailing period.
- A blank line, then a body wrapped at about 72 columns.
- The body says what changed and why: the problem, the reason for this approach, and any consequence a reviewer should know. The diff already shows how.
- Reference issues the way the project does, usually as a trailer such as `Refs: #123`.

Pass multi-paragraph messages with a file (`git commit -F msg.txt`) or several `-m` options; never put literal `\n` in a `-m` string.

## Verify each commit, not only the last

After committing a series, check that every commit builds and passes the relevant checks:

```bash
git rebase --exec '<project test command>' <base>
```

This runs without an editor. It stops at the first commit whose command fails; fix that commit (see fixups below), or run `git rebase --abort` to return to the original state and report the problem. Choose a fast, relevant check when the full suite is slow, and say which one you ran.

## Fold review fixes in with fixups

During review, record each correction as a fixup of the commit it belongs to instead of adding "address review" commits:

```bash
git commit --fixup=<sha-of-target-commit>
```

When the user asks to tidy the branch, squash them in place:

```bash
git rebase --autosquash <base>
```

Since Git 2.44, `--autosquash` works without `-i` and opens no editor. On older Git, set `GIT_SEQUENCE_EDITOR=:` and add `-i` so the generated todo list is accepted unchanged. `--fixup=amend:<sha>` and `--fixup=reword:<sha>` open an editor for the new message, so ask the user to reword earlier commits rather than driving an editor.

Before rewriting, note the current tip (`git rev-parse HEAD`). Afterwards, run `git range-diff <base> <old-tip> HEAD` and confirm that the content is unchanged apart from the intended squashes. Show the user the summary.

## Trailers

Trailers are `Token: value` lines in the final paragraph of the message. Add them with `git commit --trailer 'Token: value'` so Git formats them correctly.

- `Co-authored-by: Name <email>` credits another author. Use only a name and email the user gave you or that appear in the project's history for that person; never invent one. GitHub attributes the commit only when the email belongs to that person's account.
- `Signed-off-by` (`git commit -s`) is a personal certification under a Developer Certificate of Origin, not a formality. Add it only when the project requires it and the user has agreed to certify the change.
- For attribution of AI assistance, follow the host's attribution setting and the project's policy. Do not add a second attribution trailer on top of one the host already adds.

## Signing

Respect existing signing configuration (`commit.gpgsign`, `gpg.format`, `user.signingkey`). If signing fails, for example because no key agent is unlocked, stop and tell the user; do not retry with `--no-gpg-sign` or change the configuration.

## Finish

Report the resulting commits with `git log --oneline <base>..HEAD`, which checks you ran on each commit, and anything still uncommitted. State whether the branch needs a force push.
