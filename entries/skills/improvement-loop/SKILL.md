---
name: improvement-loop
description: Run the improvement loop on finished work. Reflect on the stumbling blocks, trace each to a root cause, turn them into prioritized improvement items, agree on a plan with the user, then change the project's tooling so future sessions iterate faster, and verify that each change helped. Invoke explicitly with /improvement-loop.
license: MIT
disable-model-invocation: true
---

# Improvement loop

Consider the work done, think about the stumbling blocks you encountered, and improve the process for future you. Break them down into actionable improvement items, produce a plan organized logically, agree on it with the user, and then refactor, update, or add to the project's tooling so the next session iterates faster. Favor modular, extensible, and maintainable changes over quick patches.

If arguments were given, treat them as the focus of this loop (for example, "the test setup" or "deploys").

## 1. Gather evidence

Review the work blamelessly: the goal is a better process, not a verdict on anyone. List concrete moments, each with what happened and what it cost (time, attempts, a wrong result):

- Corrections and repeated requests from the user.
- Commands that failed or were retried, and slow feedback loops (long builds, manual checks, waiting on the user).
- Facts discovered late: environment quirks, conventions, where things live.
- Manual multi-step sequences done more than once.
- Checks handed to the user that you could have run.
- Existing tooling or guidance that was available but not used.

Skip anything you cannot point to in this session. If the user remembers stumbling blocks you missed, add them.

## 2. Find root causes

For each stumbling block, ask why until you reach something the project can change. Classify it:

| Cause | Typical fix |
| --- | --- |
| Missing knowledge (a fact or convention the agent could not find) | One line in always-loaded instructions, or a better name or doc where the agent will look |
| Missing or awkward tool | A script or command, or a fix to an existing one |
| Slow or noisy feedback | A faster targeted test, a watch mode, clearer error output |
| Unreliable environment | A setup or reset script, pinned versions, a health check |
| Unclear requirements | A question to ask earlier next time, or a template for the request |
| A mistake that must never repeat | A test, lint rule, or hook |

Several symptoms often share one cause. Merge them.

## 3. Write improvement items

Each item states:

- **Change:** a verb and an object ("add `scripts/reset-db.sh`", "make `test` accept a file filter").
- **Prevents:** the stumbling blocks it addresses, and how often they are likely to recur.
- **Done when:** an observable check ("the repro runs in one command under 10 seconds").
- **Size and risk:** small, medium, or large; and whether it touches shared configuration, hooks, CI, or other people's work.

Prefer the strongest mechanism that fits: an automated check beats a script, a script beats a written instruction, and a written instruction beats nothing. Put an instruction where it will be loaded: facts every session needs go in the always-loaded project instructions in a line or two; procedures for one kind of task go in a skill or doc linked from there. Prefer editing existing tooling over adding new files, and remove guidance that turned out stale.

## 4. Prioritize and plan

Rank items by payoff (how much time or risk they remove, times how often) against cost and risk. Keep the plan short: the top three to five items, with the rest listed as deferred. Organize it logically:

1. Group items by area (for example: environment, tests, scripts, instructions).
2. Order them so foundations come first and each step leaves the project working.
3. For each step, name the files to change and the check that shows it is done.

Then ask clarifying questions, only where the answer changes the plan: scope, taste, conventions you cannot infer, and anything that needs authorization. Give your recommendation with each question. **Present the plan and wait for approval before changing anything.**

## 5. Implement

Work through the approved plan in order, in small reversible steps:

- Follow the project's existing structure, naming, and conventions. Extend existing tools before adding new ones.
- Keep each tool single-purpose, with clear inputs, outputs, and errors, so it can be composed and extended later.
- Document each new tool in one place the agent already reads (for example, a one-line entry in the project instructions or a scripts index).
- Add tests for tooling that has logic.
- Do not add dependencies, hooks, CI changes, or shared configuration without explicit approval.
- Stay within the plan. Note new ideas as deferred items instead of doing them now.

## 6. Verify

For each item, run its "done when" check. Where possible, replay the original stumbling block and show the difference (before: three manual steps and a failed attempt; after: one command). If an item could not be verified, say so. Never report an unverified item as working.

## 7. Report

Give a short table of stumbling block, root cause, change, where it lives, and verification result. Then list the deferred items with their rationale, and what to watch in the next session to confirm the changes helped. If the project keeps an improvement log, append the items there so the next loop can check whether earlier fixes worked and remove those that did not.
