---
name: retrospective
description: "Turn the stumbling blocks of a finished piece of work into lasting project improvements: instructions, skills, scripts, or checks, each placed where a future session will actually load or run it. Use when asked to reflect on the work done, what slowed you down, lessons learned, or how to make future sessions faster. Not for reviewing code changes or planning new features."
license: MIT
---

# Retrospective

Find what made this work slower or riskier than it needed to be, and change the project so the next session avoids it. A lesson that is written down but never loaded has no effect, so placing each fix where it will be loaded matters as much as the lesson itself.

## Gather evidence

List concrete moments from the work, not general impressions:

- Corrections from the user, such as "still doesn't work", "I meant…", or "use the browser tab".
- Checks handed back to the user that you could have run yourself.
- Repeated or failed commands, wrong assumptions about the environment, and facts discovered late.
- Manual multi-step sequences you performed more than once.
- Incidents: broken builds, a commit that included someone else's work, lost state.

Then check whether the project's existing guidance was used. For each project skill, did it activate when its situation came up? In Claude Code, `/skill-doctor` reports per-skill use and never-invoked skills. If no usage data exists, compare the skill's description with the requests in this session. Guidance that existed but was not used is a finding in its own right; fix that before adding more.

## Place each fix where it will load

| The lesson is… | Put it in | Because |
| --- | --- | --- |
| A fact every session needs: where the app runs, how to commit, shell quirks | Always-loaded project instructions (`AGENTS.md`, `CLAUDE.md`, `.claude/rules/`), one or two lines | Skills load only when their description matches; facts like these are needed before anyone thinks to look |
| A procedure for one kind of task | A project skill, with its description written in the words users use for that task | Loaded on demand, so it can be detailed |
| A multi-step command sequence | A script in the project's tools directory, listed in one index | Running it is faster and more reliable than reading about it |
| Something that must never happen | A test, check, or hook, proposed to the user before adding | Prose does not prevent anything |
| A one-off | Nothing | Keeps the guidance small |

Prefer editing existing guidance over adding new files. Remove or merge guidance that is stale or unused.

## Make new or changed skills trigger

For every skill you create or edit:

1. Write the description so it states what the skill does, the situations and phrases that call for it (taken from real requests in this work), and a nearby situation it is not for. Quote it if it contains a colon.
2. Record at least two requests that should activate it and one that should not, using real wording from this session.
3. Run a trigger check when the host supports one. See [trigger checks](references/trigger-checks.md). If you cannot run it, say so and leave the cases in the project for later.

If a skill must apply after every change of some kind (for example, "verify visible changes in the app"), do not rely on its description alone. Add a one-line pointer to it in the always-loaded instructions.

## Scope and authorization

Implement small, clearly beneficial changes when the user asked for them. Propose larger changes before making them: restructured tooling, new hooks, changes to shared configuration, or anything affecting other people's work. Hooks and settings changes always need the user's approval.

## Report

Give a short table: stumbling block, the evidence, the fix, and where it now lives. Then list what you verified (for example, scripts you ran or trigger checks and their results), what you deferred, and any existing guidance that went unused, with the likely reason.
