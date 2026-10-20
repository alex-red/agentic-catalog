# Decisions

Short records of choices that shape the library. Add a new entry rather than rewriting an old one; mark superseded entries.

## 1. Content must target observed failures (2026-10-20)

Current Claude and GPT-class coding agents already reproduce bugs, keep diffs focused, and report verification without being told, and host system prompts restate most generic guidance. Shipping more of the same costs context without a measurable gain. Components therefore start from a recorded failure in a real project and must beat the host baseline, including host built-in skills, in a matched comparison.

## 2. Plugins first, directory copies as fallback (2026-10-20)

Claude Code and Codex both install plugins from Git-hosted marketplaces, and Codex has done so since March 2026. The repository root is the plugin: shared `skills/`, `.claude-plugin/plugin.json` for Claude Code, root `plugin.json` (Agent Plugins format) for Codex, and one marketplace file per host. Plugin install and update replace the manual copy-and-diff steps. Copying a skill directory remains supported for projects that pin content in their checkout.

Neither host ships project instructions inside a plugin, so rules stay manual: copy files into `.claude/rules/` for Claude Code, or merge the marked block into `AGENTS.md` for Codex.

## 3. Skill names drop the `ar-` prefix (2026-10-20)

Plugin skills are namespaced by the host (`agentic-rules:systematic-debugging`), so the prefix only added noise. Copy installs can collide with same-named skills from other libraries, and the installation guide says to check for that before copying.

## 4. Reuse host evaluation tools (2026-10-20)

`claude plugin eval` already runs plugin-versus-baseline comparisons in a sandbox, so trigger cases are generated for it from `evals/cases/*.yaml` rather than graded by custom code. It cannot run hidden test suites or drive Codex, so a small harness (`scripts/eval-run.ts`) runs headless `claude -p` and `codex exec` sessions on fresh fixture copies and scores them with hidden grader tests.

## 5. Fixtures must separate process from luck (2026-10-20)

A bug whose visible failing test points straight at the fix is solved equally well by every arm. Outcome fixtures keep grader tests out of the agent's workspace and are designed so a fix for the symptom alone passes the visible tests but fails the hidden ones. The pagination fixture remains as a smoke case.

## 6. Remove the catalog wiki (2026-10-20)

A static wiki with custom fonts and about 500 lines of client code was maintained for one component. The README and the generated `catalog/index.json` cover browsing at this size. It is recoverable from commit `5b2edf6`.

## 7. Keep structural validation (2026-10-20)

The validator checks resource closure, portability, schemas, and catalog freshness. It is small and well tested, and these properties matter for copy installs. `claude plugin validate --strict` covers the plugin manifests. The Agent Skills reference validator (`skills-ref`) describes itself as demonstration-only, so it is not a CI dependency.

## 8. Facts that must apply every time go in always-loaded instructions (2026-10-20)

In the pilot, skills fired reliably on matching requests (32/32 in the user's real environment). The missed step was the check after a change: 3 of roughly 9 sessions with visible UI changes never opened the running app. That moment is not a user request, so a skill description has nothing to match. The `retrospective` skill therefore places such facts in `AGENTS.md`, `CLAUDE.md`, or `.claude/rules/`, with a one-line pointer to the detailed skill. It writes skill descriptions in the user's own wording and checks them with trigger cases.

## 9. Rules target observed gaps, not general virtues (2026-10-20)

In the pilot the agent already reported unverified work honestly, so `verification-evidence` dropped that text. The rule now addresses the observed gap instead: not checking visible changes in an app that was already running, because starting a server was off limits.

## 10. Outcome grading must fail closed (2026-10-20)

The repository review reproduced an unchanged pagination fixture with two failing tests being recorded as `passed`: the runner treated a successful agent exit as success when no grader existed. Every outcome case now requires an explicit grader; trigger-only cases remain valid. Pagination runs its visible unittest suite. Agent errors remain errors even when grader tests pass.

## 11. Isolate the component and retain the run evidence (2026-10-20)

A score for a skill bundled with three rules cannot justify keeping each member. Outcome runs can select one `skill/NAME` or `rule/ID`; profile runs remain available for measuring the bundle. Both hosts install only the selected library content, and fixture-owned instructions are preserved. Rules get instruction-load and outcome checks rather than skill-trigger tests. Cases are discovered and validated from `evals/cases/`, including rule cases.

Version 2 raw records retain the source input contents and digest, selected and installed components, host version, settings, full agent output, tracked diff, untracked contents, and runtime evidence. Final messages alone cannot establish reproduction, browser use, or honest reporting. Review the transcript and changes against the acceptance criteria before treating an automated pass as outcome evidence.

## 12. Running-app telemetry is a signal requiring review (2026-10-20)

The UI fixture's evaluator starts a loopback server before the agent, supplies its URL and the no-start constraint equally to both arms, and stops it after grading. The task asks only for a visible product change. Page telemetry ties the computed background to the final source revision and distinguishes a plain source edit from a reported browser runtime check. An HTTP client can synthesize the event, so its classification is `browser_runtime_signal`; transcript review must establish actual browser use. Local use of the built-in browser validates the fixture plumbing, not the guidance's effectiveness or a headless host's browser access.

## 13. Prepare paid comparisons without running them (2026-10-20)

The user chose commands only for the next evaluation batch. `eval:run --dry-run` validates and prints the comparison without starting an agent, starting a runtime, or writing result files. Claude's optional dollar ceiling is per session, so a matched three-repetition comparison has six such ceilings. Codex has no supported dollar ceiling in this runner and its account cost must be recorded separately. The remaining comparison and installation work stays pending until actually run and reviewed.

## 10. A small Vite frontend for browsing the catalog (2026-10-20)

This supersedes the removal in §6, with a different shape: a vanilla TypeScript page in `site/` that imports the generated `catalog/index.json`, with no framework, custom fonts, or build-time Markdown rendering. Vite is used only for `bun run dev` (hot reload on localhost) and `bun run site:build`. It is a local tool, not a hosted catalog, so the `PLAN.md` exclusion still holds.
