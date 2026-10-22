# Decisions

Short records of choices that shape the library. Add a new entry rather than rewriting an old one; mark superseded entries.

## 1. Content must target observed failures (2026-10-20; superseded by 15)

Current Claude and GPT-class coding agents already reproduce bugs, keep diffs focused, and report verification without being told, and host system prompts restate most generic guidance. Shipping more of the same costs context without a measurable gain. Components therefore start from a recorded failure in a real project and must beat the host baseline, including host built-in skills, in a matched comparison.

## 2. Plugins first, directory copies as fallback (2026-10-20)

Claude Code and Codex both install plugins from Git-hosted marketplaces, and Codex has done so since March 2026. The repository root is the plugin: shared `skills/`, `.claude-plugin/plugin.json` for Claude Code, root `plugin.json` (Agent Plugins format) for Codex, and one marketplace file per host. Plugin install and update replace the manual copy-and-diff steps. Copying a skill directory remains supported for projects that pin content in their checkout.

Neither host ships project instructions inside a plugin, so rules stay manual: copy files into `.claude/rules/` for Claude Code, or merge the marked block into `AGENTS.md` for Codex.

## 3. Skill names drop the `ar-` prefix (2026-10-20)

Plugin skills are namespaced by the host (`agentic-catalog:systematic-debugging`), so the prefix only added noise. Copy installs can collide with same-named skills from other libraries, and the installation guide says to check for that before copying.

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

## 14. A small Vite frontend for browsing the catalog (2026-10-20)

This supersedes the removal in §6, with a different shape: a vanilla TypeScript page in `site/` that imports the generated `catalog/index.json`, with no framework, custom fonts, or build-time Markdown rendering. Vite is used only for `bun run dev` (hot reload on localhost) and `bun run site:build`. It is a local tool, not a hosted catalog, so the `PLAN.md` exclusion still holds.

## 15. Pivot to a curated, rated catalog (2026-10-20)

Supersedes the product definition in §1 and the release gate built on it. The repository becomes a catalog of the best available agent guidance, wherever it was written, so that a user can ask an agent to "grab useful skills from the catalog" or "find a self-improvement loop". Measured benefit is no longer a condition for listing an entry. Instead, every entry carries an honest rating and an evidence level, and the evaluation harness becomes an optional way to raise that level. §1's lesson still shapes the ratings: novelty is scored against host built-ins and default model behavior, and the overlap is recorded.

Choices made with the user:

- **Storage is hybrid.** Permissively licensed content is vendored unmodified at a pinned commit with its license file. Restrictive, missing, or bundle licenses are linked. Material written here from cited sources is `adapted`.
- **Rating is a rubric.** Four 1–5 axes, with a score of (2 × usefulness + quality + portability + novelty) / 5 computed at build time so it cannot drift, plus an evidence level from `reviewed` to `evaluated` that requires linked files above `reviewed`.
- **All types.** Skills, rules, workflows and loops, hooks, subagents, MCP servers, and plugins, each in `entries/<type>s/<id>/` with a fixed primary file.
- **Hosts are tagged by format.** `any` means portable through an open format; `claude-code` and `codex` mark host-specific entries. Those two remain the documented focus.
- **Access is through a discovery skill plus llms.txt.** The plugin ships only the `agentic-catalog` skill, and `llms.txt` and `catalog/index.json` serve agents without an install. A CLI and an MCP server were considered and deferred.

Profiles became collections that list entry IDs of any type. The published location comes from `package.json` `repository.url`. The validator requires the discovery skill to reference the same raw URL, so the index, `llms.txt`, and the skill cannot disagree.

## 16. Seed entries from verified research, not memory (2026-10-20)

The seed set came from two research passes that checked licenses from the actual files, pinned commits through the GitHub API, and recorded stars and last-commit dates as maintenance signals. Notable findings that shaped the entries:

- Several repositories declare MIT without a license file (vercel-labs/agent-skills, the Karpathy guidelines), so those entries are linked.
- Anthropic's document skills are source-available rather than open, so they were left out.
- openai/skills is deprecated, so its vendored entries are effectively frozen copies.
- Skills that fetch unpinned instructions at runtime (Vercel's web-design-guidelines) were excluded as an instruction-injection and drift risk.
- Generic subagent personas from large collections were passed over in favor of Anthropic's confidence-filtered reviewer and an adapted silent-failure reviewer.
- A 2026 study found that context files can lower task success and raise cost. Guidance on writing AGENTS.md therefore ships as an on-demand skill (`agents-md-authoring`), not an always-loaded rule.

Host-specific details (Codex hook files and trust, the Codex plugin manifest location) were later checked against Codex documentation and source; see [compatibility](compatibility.md).

## 17. Vendored files stay byte-identical (2026-10-20)

Vendored content is never reformatted or edited, so the pinned revision remains an exact provenance claim. Markdown lint skips exactly the vendored directories, and a test fails if that list and the catalog's vendored entries diverge. Required changes, such as a narrower skill description, belong in the consumer's installed copy or in a new `adapted` entry.

## 18. Rename to Agentic Catalog (2026-10-20)

The project is now a catalog rather than a rule library, so it is named Agentic Catalog and published at `https://github.com/alex-red/agentic-catalog`. The package, plugin, and marketplace are all `agentic-catalog`, so the discovery skill is `agentic-catalog:agentic-catalog` when installed as a plugin. Rule blocks installed in consumer files use `agentic-catalog:begin` and `agentic-catalog:end` markers. Blocks written before the rename with `agentic-rules` markers remain valid text and can be renamed by hand.

## 19. Keep broad discovery separate from entry admission (2026-10-20)

The [October research queue](research-2026-10.md) combines popular collections, scoped rules, specialist maintainers, and focused projects such as Ponytail rather than selecting only by stars. Stars, registry install counts, maintainer curation, and author benchmarks are distinct signals; none alone establishes usefulness or behavioral evaluation. Prioritize concrete gaps and review individual artifacts, their licensing, host overlap, and resource closure before admission. Research candidates stay in documentation until usable entries have been reviewed; do not create placeholder entries or install runtime integrations during discovery.

## 20. First admission batch from the October research (2026-10-20)

Admitted from the [research queue](research-2026-10.md), each at evidence level `reviewed` after reading every shipped file at the pinned revision:

- **Vendored:** `handoff` (Matt Pocock, MIT), `secret-serialization` (Sentry, Apache-2.0), `workers-best-practices` (Cloudflare, Apache-2.0), and `create-adaptable-composable` (vuejs-ai, MIT). Each repository's root license is copied as `LICENSE.txt`; none of the repositories has a NOTICE file.
- **Linked:** `property-based-testing` and `variant-analysis` from Trail of Bits, because the repository is CC-BY-SA-4.0 and only permissive licenses are vendored.
- **Checked current:** `diagnosing-bugs` and `grilling` are byte-identical at the research snapshot, so their pins stand.

Each pin is the last commit that touched the entry's path, as the freshness check expects, not the repository head the research recorded.

The Vue testing skill from the same source was passed over because several examples are stale (the msw v1 handler API, Vitest's removed `poolOptions`, and `restoreAllMocks` used to undo fake timers). Workers' instructions to check current Cloudflare docs are documentation lookup, not the unpinned remote instructions excluded in §16. Its sibling skills and the plugin's remote MCP server are not included.

The skill frontmatter schema now accepts Claude Code's `argument-hint` and `disable-model-invocation` keys, which upstream skills use. Other unknown keys are still rejected.

Still held, for the reasons in the research: Supabase until its SQL examples are verified, Liran Tal's security rules until upstream corrects them, Sentry's Django review until its license terms are clear, and Matt's architecture skill, Planning with Files, and terraform-test until their linked workflows are reviewed.

## 21. An experimental tier for promising, unproven entries (2026-10-20)

Some candidates are interesting enough to list but lack evidence that they beat the established entries or host defaults. Ponytail is the first: its own benchmark shows similar correctness to baseline. Entries like this carry `experimental: true`. They follow every other rule, including honest ratings, an evidence level, and overlap. `llms.txt` lists them in their own section instead of the type sections, the browser shows them as a separate group with a badge, and the discovery skill recommends them only when the user asks for experimental options or nothing established fits. An entry leaves the tier when evidence supports it, and is removed if evidence goes against it.

## 22. Bespoke house items (2026-10-20)

The catalog can hold the owner's own prompts and workflows alongside curated ones. These entries carry `custom: true` and `source.kind: original`, and follow every other rule, including honest ratings and overlap. `llms.txt` lists them in a Custom section, the browser shows them as a separate group with a badge, and the discovery skill recommends them like any other entry but labels them custom. An entry that is both custom and experimental is listed as experimental. The first is `improvement-loop`, which started as the hand-pasted prompt that `retrospective` grew from and was then expanded into a plan-first, tooling-focused loop. It is invoke-only, so the two do not compete for the same triggers.

## 23. A Featured group in the browser (2026-10-20)

An entry can carry `featured: true` to appear in a Featured group at the top of the browser tree as well as under its own type. It is a display highlight only: `llms.txt`, ratings and discovery recommendations are unchanged, and the entry still lists once in its own section. The first featured entry is `improvement-loop`.

## 24. Admit a linked UX critique skill with its complete install requirements (2026-10-21)

Selected Thecsiz's `ux-critique` from the [user-critique research](user-critique-research-2026-10.md), pinned at `3da293cafb639195bf71797590081d4ffb0045ba`. Its observation-first, citation-support, skeptic, and confidence pipeline fills a product-critique gap beyond browser testing and generic design advice. The entry starts at `reviewed`; source review and resource-path checks are not behavioral evaluation or evidence of representative user reactions.

The entry is linked rather than vendored. The runtime is MIT, but its required knowledge base and generated metadata are CC-BY-4.0. Installation must combine the skill directory with the repository-root `kb/` and all four license/notice files at the same revision. Copying only the skill directory silently loses full-reference support. The entry discloses default local citation-count recording and its disable switch, optional Deep Flow workers and `--serial`, separate Figma authorization, the absent HTML artifact template, and experimental Apply Mode. No host installation, Figma connection, or additional workflow is activated by catalog admission.

## 25. Bulk install generates a script and a config, not an installer (2026-10-22)

The browser can turn a selection into a bash script and an `agentic-catalog.yaml` config. This stays clear of the out-of-scope custom installer: nothing is installed or run by the site, the script is plain text to read before running, and the only state is the config file: `.agents/agentic-catalog.yaml` for a repository, or `~/.agents/agentic-catalog.yaml` for a user-wide install. Both live in `.agents/`, which Codex already uses for skills, so the project root gains no new file. Removals come from comparing the selection with an uploaded config, so no other tracking is needed.

Scripts fetch from the commit the site was built from (`GITHUB_SHA` in CI), and the config records it, so the same config always names the same content. The script copies only hosted skills, rules, and Claude Code subagents. Hooks, MCP servers, workflows, plugins, Codex subagents, and linked entries whose install steps are prose stay commented manual steps, because curation rule 5 forbids implicit hook, MCP, and plugin installs and prose steps cannot be run safely. Existing files that differ are skipped unless `FORCE=1`, which keeps local edits, as the install guide asks. Linked skills with a plain `npx skills add` command run it unpinned, since that CLI takes no revision, and the dialog says so.
