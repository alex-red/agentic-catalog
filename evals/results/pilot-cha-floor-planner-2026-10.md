# Pilot findings: cha-floor-planner (October 2026)

Exploratory transcript review, not a controlled comparison. Source: 30 Claude Code sessions in the pilot project, October 14–18, 2026, with 246 messages typed by the user and 82 commits. No Codex sessions exist for this project. Counts come from pattern matching over transcripts plus manual reading; treat them as approximate.

## Project context

A Vue and three.js floor planner with a Python AI worker, developed mostly in parallel Claude Code sessions sharing one working tree. The user's dev server and the desktop Browser pane are normally already running. A global instruction forbids starting the dev server or a build without permission.

The project has no `CLAUDE.md` or `AGENTS.md`. It has five project skills (`browser-verify`, `render-debug`, `add-element`, `inspector-ux`, `voxel-assets`) and about 20 tool scripts, mostly produced by retrospectives the user asked for.

## Findings

### 1. Project skills were loaded less often than expected, but the descriptions were not the cause

*Corrected 2026-10-20.* The first version of this finding compared Git commit times (UTC−7) with transcript times (UTC) and overstated how often the skills had a chance to fire. With corrected times:

| Skill | Sessions after creation | Invoked | Notes |
| --- | --- | --- | --- |
| `browser-verify` | 13 | 3 | Four more sessions used the browser directly without loading the skill |
| `add-element` | 13 | 3 | |
| `render-debug` | 16 | 0 | It was created at the end of the wall-seam session, and few later sessions had seam or outline problems |
| `inspector-ux` | 9 | 0 | |
| `voxel-assets` | 6 | 0 | |

Trigger checks then showed that every skill fires on its matching request, with the original descriptions, both in a sandbox and in the user's real environment ([trigger results](triggers-2026-10-20.md)). Low invocation counts mostly reflect few matching requests. Sometimes the agent also did the work, browser checks for example, without loading the skill. Whether that lost the skill's gotchas is not established.

### 2. Visible changes are handed back unverified

After `browser-verify` existed, 3 of roughly 9 sessions with visible UI changes made no browser calls at all. One of those (the AI edit tool) produced two "does not work" replies. Across all sessions, fourteen user replies report that a change did not work, was wrong, or regressed. Examples: "I dont see any of these options", "still doesnt work", "nope", "it never changes anything", "but now the lines between walls are back". Several sessions that changed UI behavior made no browser calls at all. Reports were honest ("I haven't run the app, since you asked me not to start the dev server"), so the gap is not truthful reporting. The agent treated "do not start the dev server" as "do not check in the app", even though the app was already running in the Browser pane. The user had to redirect once with "just use the browser tab here".

Implication: generic "report what you verified" guidance adds nothing here, because the agent already does it. What is missing is an always-loaded fact: the app is running at a known URL and visible changes are checked there.

### 3. Shared working tree makes commits expensive

There were 33 commit requests, and 11 of them carried explicit scoping instructions ("only the cabinet work, not other sessions' files", "leave ImportDialog.vue out", "wait until the stairs session finishes"). One commit swept in 23 files from another session, and a mis-staged file broke HEAD for four commits. The project responded with edit-recording hooks and `scope.sh`. Both hosts now support per-session Git worktrees natively, which would remove the shared-tree problem rather than manage it.

### 4. The same retrospective prompt was pasted five times

"Consider the work done, think about the stumbling blocks… Refactor/update/change/add to our tooling…" appears verbatim in five sessions. A prompt repeated verbatim is the clearest signal for a reusable skill.

### 5. Other observations

- Sixteen messages were only "proceed", "continue", or "go with your recommendations". Many follow a deliberate plan-then-approve request, so this is not clearly a failure.
- Six sessions ran out of context and were compacted. No resulting failure was identified.
- Two misread visual references ("I meant these vertical seams") preceded wasted fixes.

## What this changes in the library

- **New skill: `retrospective`.** Packages the repeated prompt. Facts that must apply every time go into always-loaded project instructions with a pointer to the detailed skill. Each skill a retrospective creates gets trigger cases.
- **Revise the `verification-evidence` rule** to target the observed gap: check visible changes in an already-running app when one exists, and keep starting a server separate from verifying. Drop the honest-reporting text the pilot shows is redundant.
- **Trigger evals for project skills** (`bun run eval:skills`), so a consumer can test their own `.claude/skills/`.
- **No new debugging content.** The existing `systematic-debugging` skill was never installed in the pilot, so these sessions say nothing about it either way.

## Applied to the pilot (2026-10-20, uncommitted in the pilot)

- `AGENTS.md`: the running app, checking visible changes there through `browser-verify`, which skill covers which recurring work, and the shared-tree commit procedure. The project previously had no always-loaded instructions.
- The five skill descriptions were rewritten in the user's wording. This made no measurable trigger difference, and it fixed `browser-verify`'s invalid YAML frontmatter.
- `tools/skill-triggers.yaml` holds 16 trigger requests, and `tools/README.md` explains how to re-run them.

Still unmeasured: whether `AGENTS.md` makes agents check visible changes in the running app after implementing them. That needs an outcome evaluation with the app running, or two weeks of normal use followed by another transcript review.
