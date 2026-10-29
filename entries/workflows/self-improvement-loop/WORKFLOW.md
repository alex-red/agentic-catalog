# Self-improvement loop

Make each session leave the project easier for the next one, without letting always-loaded instructions grow until they hurt. Each step names a catalog entry that does it, but any equivalent works.

## After a piece of work: capture

Run a retrospective while the session is still in context (the `retrospective` skill, or `/revise-claude-md` in Claude Code). Keep only lessons that a future session could not recover by reading the code, and that would have changed what the agent did.

## Place each lesson where it will take effect

| Lesson | Where it goes |
| --- | --- |
| Must hold every time, and can be checked by a command | A hook, permission rule, or CI check (for example `format-after-edit` or `stop-gate-checks`) |
| A fact needed at a moment no request mentions, such as after editing UI | One line in `AGENTS.md` or `CLAUDE.md`, or a `.claude/rules/` file scoped by path |
| A procedure needed only for some requests | A skill, with a description written in the user's own words |
| A repeated multi-step command | A script in the repository, mentioned in one line of `AGENTS.md` |

## Check that it loads

Start a fresh session. Confirm that rules load (`/memory` in Claude Code) and that new skills trigger on two or three realistic prompts and stay quiet on nearby ones. The retrospective skill covers trigger checks.

## Prune regularly

Every few weeks, or whenever `AGENTS.md` passes about 150 lines, delete lines that do not change behavior and move rarely needed procedures into skills (see `agents-md-authoring`). Longer always-loaded files cost tokens in every session, and in 2026 measurements they lowered success.

## Measure when it matters

When a lesson is expensive to keep, compare a session with it against one without it on the same task before keeping it permanently.

Use the catalog's `harness-experiment-loop` workflow for the comparison procedure: isolate fresh runs, preserve an unchanged baseline, compare execution evidence and check transfer separately. It is optional when a small improvement needs no experiment.
