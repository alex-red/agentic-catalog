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

## 26. A local scouting skill for repeatable curation (2026-10-27)

`catalog-scout` lives under `.agents/skills/` for maintainers; the consumer plugin continues to ship only `agentic-catalog`. It researches upstream skills and rules, including adjacent components where useful, and saves dated review reports under `docs/research/`. Reports reconcile the legacy research queues with current entries and later decisions, preserve unresolved holds and exclusions, and separate inspected addition recommendations from further research and existing-entry updates.

Discovery covers established popularity, recent momentum, rules corpora, and specialist maintainers. Popularity metrics remain separate from qualitative fit and evidence of effectiveness. Each recommendation needs an exact artifact and revision, declared inspection scope, licensing and dependency findings, and overlap with current entries and host capabilities. Historical requests distinguish the requested cutoff from the research date and cannot use current counts as historical evidence.

The skill ends with a ranked review queue. Admission, installation, rating changes, upstream script execution, and recurring scheduling require their own requested scope. No entry is added, integration activated, or behavioral evidence claimed by scouting. This implements the separation between discovery and admission in decision 19 without adding an installer or another consumer discovery workflow.

## 27. Review declining value and preserve retirement history (2026-10-27)

`catalog-prune` is a local maintainer companion to `catalog-scout`. It reviews existing entries for current usefulness, host and catalog overlap, technical drift, context and setup costs, and linked usage evidence. It distinguishes keep, refresh, archive, remove, and pending-evidence decisions. Age, upstream inactivity, low popularity, and absent outcome evidence are review signals rather than automatic retirement criteria. Review requests produce reports; requests to apply retirements authorize their scoped repository changes without a second approval step.

Archives preserve complete, unchanged entry directories under `archive/YYYY-MM-DD/<type>s/<id>/`, with separate retirement records under that date's `records/` directory. This keeps historical payloads and licenses recoverable outside the active loader without introducing an archive field or changing consumer discovery. Removal retains an appropriate factual record instead of the payload. No entries are retired by introducing this skill, and archive directories are created only when used.

Applying a retirement includes active relation and collection repairs, handling evaluation cases that require active IDs, preserving historical evidence, updating vendored lint exclusions and inventory, rebuilding generated files, and running repository checks. Retirement does not uninstall consumer copies or admit a replacement implicitly. Restoration requires a fresh review and a record of why the earlier retirement reason no longer applies.

## 28. Admit domain modeling and scoped Markdown accessibility (2026-10-27)

Admitted the two addition recommendations from the [October 27 scout report](research/2026-10-27-catalog-scout.md), both at evidence level `reviewed` with curator ratings and explicit overlap. The other shortlisted candidates remain research priorities or holds. Admission adds catalog content; it does not install or activate guidance in this checkout or a consumer project.

`domain-modeling` is the complete, unchanged four-file skill subtree from Matt Pocock's repository, pinned at `d80fa0f4ebe0c5714af0adf8670336065233ecc6`, the last commit touching that path within the reviewed snapshot. All four files and the root MIT license at that pin were read before copying. The license ships as `LICENSE.txt`; there is no applicable NOTICE file. Metadata discloses inline glossary writes and the upstream GLOSSARY.md, GLOSSARY-MAP.md, and docs/adr/ conventions, which do not override consumer project guidance. No sibling skills or runtime integrations are included.

`markdown-accessibility` is an independently written, portable rule inspired by GitHub's MIT-licensed instruction at path-specific pin `e2c948023120a8318645170132b839280b50557e`, with W3C guidance cited for decorative images and headings. It removes the Copilot-specific activation wrapper, preserves decorative empty alternatives and generated titles, treats heading style as a project convention, and avoids claiming conformance from source checks. Its scope is Markdown authoring and review; it does not activate a global writing policy or install tooling. Provenance is in `inspiredBy`, and the adapted payload contains no copied upstream expression requiring an additional notice.

The catalog now contains 43 entries: 24 skills, five rules, and the existing other types and four collections. Vendored lint exclusions include the new skill, and generated indexes are rebuilt from source. Source/license inspection, byte comparisons, structural checks, and the existing test suite do not raise either entry above `reviewed`.

## 29. Admit twelve opt-in Claude Code hooks (2026-10-28)

Following the user's request to find and add about a dozen hooks, admitted twelve at evidence level `reviewed`: seven linked upstream components and five independently implemented adaptations. The [admission research](research/2026-10-28-catalog-scout-2.md) records source scope, pins, limitations, rejected alternatives and the relationship to the [initial investigation](research/2026-10-28-catalog-scout.md). These are selected options for distinct jobs, not a recommended bundle or a claim of universal superiority.

The linked hooks are `no-email-context` from AlexErrant and `config-guard`, `config-watch`, `git-safety`, `protect-tests`, `case-insensitive-guard`, and `context-hogs` from Karan Bansal. Each records its plugin-directory pin and full runtime dependency review. They remain hook entries because the lifecycle behavior is the product; upstream plugin packaging does not require copying an entire marketplace or relabeling the component as a broad plugin. Linked content stays upstream and is not modified. Tracking marketplace install commands are explicitly distinguished from pinned local-plugin use.

No-email's documented event/block types and installed Claude Code 2.1.301 static validation support admitting its narrow source-reviewed claim. End-to-end request privacy, account-settings provenance and compatibility on other surfaces remain unverified. The validator's organization-managed deployment restriction and missing-author warning are recorded. This does not claim the initial report's runtime validation priorities have been completed.

The adapted hooks are `desktop-attention`, `compact-context`, `post-edit-diagnostics`, `subagent-budget`, and `prompt-secret-check`. Each ships its own script, registration example and installation/disable instructions inside its entry. No upstream code expression was copied. Notifications use fixed local text; compaction notes are explicitly maintained and bounded; diagnostics use installed commands and argument arrays; SQLite serializes subagent-call reservations; credential-paste checks report categories without echoing matches. Reservations count attempts sharing a session ID, not actual successful spawns or a global token budget. The upstream spawn-cap race and secrets-guard command-allowlist bypass were not imported.

Refreshed the three original hook examples: formatting selects explicit edited paths and preserves unusual names instead of using whitespace-splitting xargs or Git-wide selection; the Stop gate detects untracked-only changes and documents its one-retry limit; direct-edit and Codex patch protection lists now align, including Move headers. Existing hook ratings remain curator judgments.

Scratch script checks exercise concurrent reservations, privacy-preserving rejection, path boundaries, explicit file selection and gate edge cases. These checks do not establish host invocation, comprehensive security, billing accuracy, or matched behavioral outcomes; evidence levels remain `reviewed`. The catalog now has 55 entries, including 15 hooks, and four collections. No host hooks, plugin installations, services, external messaging or extra consumer workflows are activated by admission.

## 30. Generalize hook logic through explicit host adapters (2026-10-28)

The user's portability request adds Codex registrations to six of the twelve hooks admitted in decision 29: `compact-context`, `post-edit-diagnostics`, `subagent-budget`, `prompt-secret-check`, `git-safety`, and `case-insensitive-guard`. The [review](research/2026-10-28-hook-portability.md) and [matrix](compatibility.md#hook-portability-review-october-28-2026) record all fifteen hooks, including the three earlier Codex entries. The active inventory stays at 55 entries and 15 hooks.

Share the policy or small script where contracts agree, but retain separate registration files and explicit payload/path adapters. Claude's Edit/Write and Agent matchers do not imply that Codex changes `apply_patch`/`spawn_agent` payloads into Claude shapes. Compaction notes remain harness-local, diagnostic patch paths use event cwd while checks run from the installed project root, and budget state is isolated by harness. The linked Bash guards retain their source pins and unchanged code; direct-script Codex registration does not claim marketplace/plugin compatibility or import unsupported ask mode.

Do not infer universal portability from lifecycle naming. No-email removal, notification hooks and configuration reload observation have no direct counterpart established in Codex's current hook contract. Configuration protection, semantic test preservation and context attribution need real adapters before they can list Codex. Native notification settings can serve the notification job without misusing approval or Stop decisions. Other harnesses remain unclaimed until their actual contracts are reviewed and usable adapters exist.

All evidence levels remain `reviewed`. Synthetic script fixtures cover the added Codex payloads, not live client invocation. The official contract does not establish a Codex equivalent of Claude's configured `onFailure` behavior, so Codex examples omit that field and disclose startup/timeout limits. Nothing installs, trusts, activates or changes consumer hooks implicitly.

## 31. Make explicitly selected hook setup executable and idempotent (2026-10-28)

The user requested that the install command copy hooks and register them in settings when absent. The browser now generates an executable project-local setup command for reviewed standalone routes, and project bulk selections use the same helper. This supersedes decision 25's blanket manual-only treatment of hooks for these routes; the general-purpose installer CLI remains out of scope. Existing authorization rules still prevent implicit activation from catalog admission or discovery recommendations.

`scripts/install-hook.py` loads catalog metadata at the site's revision, fetches every required runtime resource before modifying the consumer, copies missing files under `.claude/hooks/<id>/` or `.codex/hooks/<id>/`, and merges only missing handlers into `.claude/settings.json` or `.codex/hooks.json`. It preserves unrelated settings and existing custom handler options. Matching uses event/conditions and normalized command arguments rather than JSON formatting; it never evaluates a shell to compare commands. A changed settings file receives an exact backup before atomic replacement. A project lock serializes setup. Malformed settings, symlinked targets, conflicting local files and failed downloads stop the operation instead of replacing user work. Hook file conflicts remain protected even when a bulk script uses FORCE for other entry types.

Hosted entries supply explicit registration examples and runtime files. The original guard and Stop scripts are now standalone resources as well. Six reviewed linked hooks fetch unchanged scripts and the MIT license from their exact upstream pins. Their shell command is rebuilt with quoted absolute paths; a small CommonJS package boundary avoids inheriting a consumer's `type: module`. Context-hogs installs only the standalone hook and reports its explicit render command; its optional Claude leaderboard skill is not activated. No upstream installers, handlers, tests, model calls or dependencies run during setup.

User-wide hooks, unsupported host routes, and no-email's mod/plugin packaging remain manual rather than being misregistered as settings hooks. Codex registration does not grant trust; the user still reviews the exact definition in `/hooks`. These setup commands need Python 3.9+ and are tied to the published catalog revision, so unpublished source changes must be published with the site before remote commands can retrieve them. Scratch setup tests and generated-script tests establish installation merge behavior, not host effectiveness or a higher entry evidence level.

## 32. Add a lightweight research-to-initialization collection (2026-10-28)

Following the user's request to add the [recommended lightweight collection](research/2026-10-28-catalog-scout-3.md), admitted `repo-research` and the five-entry `project-initialization` collection. The other members are existing entries: `grilling`, `agents-md-authoring`, `explore-plan-implement-review`, and `verification-before-completion`. The [usage guide](project-initialization.md) describes the adaptable sequence, existing-repository versus empty-project behavior, and optional companions. A collection groups usable entries; it does not run them as an orchestrator.

`repo-research` is an independently written adaptation inspired by Compound Engineering's scoped repository-analysis role at `e86a51a744de2fc884752d86c817dc5351884fa2`, whose complete role and root MIT license were read during scouting. No upstream expression, scripts, framework runtime, or sibling resources are copied. The entry includes its own MIT license and records immutable inspiration and named host/catalog overlap. It scopes exploration, separates documented constraints from observed patterns, labels discovered versus executed commands, checks consequential external choices, and hands off a concrete foundation plan. Research does not grant implementation or installation authority.

The new skill starts at `reviewed`; no trigger or matched outcome evaluation is claimed. Source review, structural validation, and repository tests do not establish improved project outcomes. The active inventory becomes 56 entries, including 25 skills, and five collections. Domain modeling, handoff, Context7, formatting and Stop hooks remain optional selections outside this collection. No consumer installation, hook activation, tool connection, or mandatory extra approval workflow occurs through this admission.

## 33. Group frontend quality and conditional security methods (2026-10-28)

Following the user's request to add the two collections proposed in the [popular-library review](research/2026-10-28-catalog-scout-4.md), added `frontend-quality` and `security-review` using existing entries. Frontend quality groups `react-best-practices`, `webapp-testing`, `ux-critique`, and `verification-before-completion`. Focused security review groups `security-threat-model`, `secret-serialization`, and `variant-analysis`. The [usage guide](quality-collections.md) records each member's job, prerequisites, and conditional use.

Frontend quality is React/Next.js-oriented; other stacks should select matching guidance. Native browser and design capabilities may cover parts of the job. UX critique retains its complete KB/license installation requirements and documented recording/output limitations. Security review is a menu of methods, not a mandatory pipeline: threat modeling requires an explicit request, secret serialization requires the relevant credential/sink context, and variant analysis requires a known defect. Existing linked resource and license requirements remain in force.

The catalog stays at 56 entries and grows to seven collections. No entry, source pin, rating or evidence level changes. Impeccable's engine/context review and trial remain outstanding; the sampled review does not justify its admission or any held whole-library installation. Collection admission does not install consumer guidance, activate hooks or scanners, connect services, or authorize external testing.

## 34. Admit focused Rust verification and Tokio lifecycle guidance (2026-10-28)

Following the user's request to add the strongest [Rust research proposals](research/2026-10-28-catalog-scout-5.md), added the original `rust-verification-ladder` workflow and `tokio-async-correctness` skill. The [admission record](research/2026-10-28-rust-admission.md) documents source contracts, overlap, dependencies and the scratch example checks. Both entries carry MIT licenses and start at evidence level `reviewed`.

The workflow selects evidence based on the change and supported toolchain/target/feature configuration; it does not require every advanced checker. The skill targets Tokio cancellation, capacity, task ownership and shutdown, with a complete bounded intake/drain reference. A disposable offline fixture compiled that example and exercised six coordinated lifecycle/operation cases. Those checks do not establish agent activation, exhaustive schedule coverage, outcome improvements, or the operation of the optional verification tools.

No upstream skill expression, helper script or runtime bundle is copied. Faulty upstream examples remain held rather than modified in vendored entries. No consumer toolchain override, dependency, hook, scanner, MCP, background process or additional workflow is activated by catalog admission. Native compiler/checker capabilities and existing general testing skills remain complementary. The catalog now contains 58 entries, including 26 skills and five workflows, with seven collections.

## 35. Admit focused Vue, React and Bun guidance (2026-10-28)

Following the user's request to add the strongest [frontend research findings](research/2026-10-28-catalog-scout-6.md), added `vue-async-state`, `react-component-composition`, and the `bun-migration-verification` workflow. The [admission record](research/2026-10-28-frontend-admission.md) describes official contracts, scope, overlap and scratch verification. All are independently written original MIT entries at evidence level `reviewed`; no held third-party skill is copied, patched or represented as newly approved.

Prefer these focused jobs to another global core framework bundle: Vue async state complements existing composable and installed Vue guidance; React composition complements existing performance guidance; Bun migration separates package-manager, runtime, bundler and runner choices. Preserve project versions, conventions, state ownership, resolution inputs, lifecycle trust and existing authorization. Vite and other unresolved upstream candidates retain their research holds. No new collection or consumer integration is activated.

The Vue reference passes strict type checking and six controlled scratch cases on a pinned stable Vue 3 baseline. This does not establish agent activation, comprehensive scheduling coverage, UI correctness or improved outcomes. React interaction and real Bun migration outcomes remain unmeasured. The catalog now contains 61 entries, including 28 skills and six workflows, with seven collections.

## 36. Distill Harness² into a bounded experiment workflow (2026-10-28)

Following the user's request to add the [Harness² research recommendation](research/2026-10-28-catalog-scout-7.md), admitted `harness-experiment-loop` as an adapted workflow at evidence level `reviewed`. The payload is independently written MIT prose inspired by the pinned Google Research method; it includes no upstream wording, scripts, executable runtime or third-party bundle. Metadata records immutable inspiration links and overlap with the retrospective and improvement entries.

The workflow tests guidance changes on replayable tasks, using fresh solver contexts, focused process/domain hypotheses, execution contrasts and selective composition. It preserves the original baseline output as an adoption alternative, unlike upstream's finals-only selection, and separates a useful task result from evidence of transfer. It records confounders, costs and failed runs, allows a smaller explicitly limited comparison, and retains no standing lesson without support.

The existing self-improvement workflow points to this procedure when a lesson merits an experiment. No collection grows, consumer guidance is installed, hook is activated, permissions are expanded or model execution is launched by this admission. A skill wrapper remains deferred until use demonstrates a need for orchestration beyond the manual procedure. Structural validation does not establish effectiveness, and upstream benchmark gains are not evidence for this adaptation. This admission adds one workflow without changing collection membership.

## 37. Separate monorepo verification from Bun workspace operations (2026-10-28)

The user requested research and admission of monorepo guidance plus a Bun-specific skill, with original authoring authorized when needed. Added the original MIT `monorepo-change-verification` workflow and `bun-workspaces` skill at evidence level `reviewed`. The [research and admission record](research/2026-10-28-catalog-scout-8.md) compares official Turbo/Nx leads, general management guidance and Bun candidates, with exact source scope and reasons for withholding unchanged upstream payloads.

The general workflow separates package, task and release graphs, conservative affected selection, public package contracts and cache evidence. The Bun skill handles membership, local dependencies, catalogs, linker history, scoped commands, scheduling and packed outputs. It complements `bun-migration-verification` rather than duplicating its migration-layer decision. Existing project tools and instructions retain authority; no orchestrator, remote cache, service, hook, package publication or consumer migration is activated by catalog admission.

Ten disposable fixture checks passed on Bun 1.4.3, including current filtered-add support, consumer-scoped imports, dependency order, catalog resolution, clean frozen installation and local packing. They do not establish agent outcomes, cross-platform behavior, lifecycle readiness, cache correctness or deployment success. The catalog now has 64 entries, including 29 skills and eight workflows, with seven collections. No upstream skill expression or executable is copied, and all prior research holds remain unless explicitly resolved in the new report.

## 38. Admit explicitly selected frontend design alternatives (2026-10-28)

Following the user's request to add all eight ranked sources from the [frontend design research](research/2026-10-28-catalog-scout-9.md), added twelve linked entries: `frontend-design`, `impeccable`, `emil-design-eng`, `remove-animations`, `design-taste-frontend`, `ui-ux-pro-max`, `interface-design`, `better-typography`, `interface-review`, `baseline-ui`, `fixing-accessibility` and `fixing-motion-performance`. All start at `reviewed`. Eleven are experimental; Anthropic is a normal upstream baseline alternative for hosts without an existing equivalent. The [admission record](research/2026-10-28-design-admission.md) and [selection guide](frontend-design-options.md) describe their distinct jobs and limitations.

This explicit selection changes the prior admission disposition for these named candidates, not the underlying technical findings. Link them as choices with conservative ratings instead of implying that full runtime, reference-chain or outcome reviews have passed. Interface Design's incorrect target-size/control wording, stale animation generalizations, competing house policies and the larger systems' unaudited runtime scope remain disclosed. The proposed independent motion-reduction adaptation is not silently substituted for the original linked skill. Vercel remote-instruction loading, Uizze provenance and the other unranked holds remain unchanged.

Pins identify the last commit affecting each artifact; all twelve entrypoints and license files were checked against those exact pins. Linked installation retains complete subtrees and licenses. UI/UX Pro Max uses an installed-script-path adapter, avoiding a plugin-only variable and the broad sibling-installing CLI. Interface review explicitly requires its eight-skill bundle; manual Impeccable setup is scoped refinement and does not claim to provide named agents, hooks or the full command suite. No upstream file is vendored or edited.

These alternatives do not become an install-all collection. Existing project conventions, accepted design systems and authorization retain authority. No consumer skill, dependency, engine, external connection, hook or additional worker is activated by catalog admission. Generated indexes are rebuilt from source; checks do not raise evidence levels. The catalog now has 76 entries, including 41 skills, twelve experimental entries in total, one custom entry and seven collections.

## 39. Add evidence-focused UI/UX methods and a bounded workflow (2026-10-29)

Following the user's request to add the [UI/UX research selections](research/2026-10-29-catalog-scout.md), added linked `intent` and `synthesize-research`, adapted `moderated-usability-study`, and adapted workflow `evidence-to-flow-ux`. Reuse the existing `ux-critique` without changing its pin, rating or payload requirements. The [selection guide](ux-workflow-options.md) distinguishes each job; the [admission record](research/2026-10-29-ux-admission.md) retains review and evidence limits.

Intent enters as an explicitly selected linked experiment, with incomplete wider resource review disclosed. Its complete core includes eight references; specialists require separate selection and review. Do not install the whole eighteen-skill system, six agents or platform configuration merely because the router mentions them. Anthropic synthesis uses the product-management source, its complete connector reference and its verified scoped Apache-2.0 license. Standalone installation explicitly rebases the connector link and records that packaging modification; the anomalous root license remains a research observation rather than being substituted for the scoped license.

The study method is independently written instead of patching or adopting the upstream helpers. It keeps task neutrality, real participant evidence and traceable observations while omitting fixed sample guarantees and calculators. The workflow branches by available evidence, preserves observation/hypothesis boundaries and stops at a supported decision or named evidence gap. Both adapted payloads are self-contained and require no other catalog entry.

All four start at `reviewed`. Structural checks do not establish better UX outcomes. No consumer skill, collection, participant contact, recording, publication, tool connection, hook or additional worker is activated. The catalog now has 80 entries, including 44 skills, nine workflows, thirteen experimental entries in total, one custom entry and seven collections.

## 40. Adapt Apple's interface principles into a portable design method (2026-10-29)

Following the user's approval of the [research proposal](research/2026-10-29-apple-inspired-interface-skill.md), admitted adapted `human-interface-design`, titled Human-centered interface design, at `reviewed`. Its concise core and three conditional references connect task structure, navigation, state, recovery, visual hierarchy, accessibility and verification. Web, handheld and desktop adaptations preserve product identity and target-platform conventions; other interactive surfaces reuse the core questions and consult specialized platform guidance when needed.

The method is independently written MIT prose with Apple and supporting standards recorded as inspiration. No Apple wording, assets, fonts, symbols, code or remote instruction loader is shipped. Familiar controls, system typography, expressive branding and appropriate density remain legitimate choices. References are self-contained; related catalog entries are optional. The skill introduces no persistent project-file convention, runtime dependency or consumer integration.

The [admission record](research/2026-10-29-human-interface-design-admission.md) retains a small independent design-specification comparison with installed frontend-design. Both answers addressed the major task and recovery risks; no superiority was demonstrated. That one-run qualitative exercise does not establish activation, implementation quality, user outcomes or matched host performance. Eight trigger cases are prepared but unrun. Evidence remains `reviewed`, and ratings are curator judgments.

Indexes are regenerated from source. No existing entry or collection is replaced, and no consumer skill is installed or workflow activated. The catalog now has 81 entries, including 45 skills, nine workflows, thirteen experimental entries, one custom entry and seven collections.

## 41. Distill MMORPG research into a focused design skill (2026-10-29)

Following the user's request to turn the session's MMORPG and MapleStory investigation into a skill, added adapted `mmorpg-design`, titled Persistent-world systems design. Its core traces mechanics through incentives, behavior, effects on other players and long-term consequences. A conditional reference retains primary sources, historical pacing, trade restrictions, account investment and comparison questions for Ragnarok Online, Dungeon Fighter Online and Guild Wars 2.

The skill uses independently written MIT prose. It distinguishes documented mechanics, developer intentions, player observations and design hypotheses; region and era matter. It does not present nostalgia, a selected interview sample, or observational retention correlations as causal proof. It favors capability changes, social reconnection, acquisition variance and aggregate recurring work over engagement alone. MapleStory supplies examples rather than a universal design prescription.

Overlap was checked against the available host skills and catalog metadata. Native reasoning, grilling and research methods cover adjacent work; no MMORPG-specific equivalent was present. The entry adds domain-specific decision criteria without requiring another skill, runtime, tool connection or persistence convention. It is admitted at `reviewed`, with conservative usefulness for typical software projects; no activation trial, gameplay experiment or matched agent-outcome improvement is claimed.

All installable files, the research reference and license live inside the entry directory. Admission does not install the skill into a consumer project or personal skill directory. The catalog now contains 82 entries, including 46 skills, and seven collections; no collection or plugin manifest changes.

## 42. Copy installation handoffs from every catalog page (2026-10-29)

The browser's Copy for LLM action generates a project-scoped installation prompt for an entry or every member of a collection. The overview instead requests a shortlist and user selection. Prompts include catalog files and the type-specific install reference at the site's build revision, upstream provenance, supported hosts, experimental status and entry-specific installation guidance. Complete payloads and licenses remain required; linked upstream instructions retain their own pins.

The handoff preserves project conventions, existing files and approval for executable integrations. It does not run workflow tasks or activate integrations on copying. Clipboard failure opens selectable text for manual copying. Existing source and shell snippet copy controls retain their respective jobs. Prompt tests cover all catalog types, collection membership, missing members and overview selection boundaries; they do not establish agent installation behavior.

## 43. Add game-design methods and a topic category (2026-10-29)

Following the user's request to add all five shortlisted [game-design methods](research/2026-10-29-catalog-scout-2.md), admitted adapted `mechanic-prototyping`, `level-design`, `game-feel`, `game-balance-review` and `gameplay-playtesting`. The [admission record](research/2026-10-29-game-design-admission.md) documents independent authoring, source boundaries and validation. Two skills and three workflows complement existing `mmorpg-design`; every new entry starts at `reviewed`.

The methods are self-contained MIT prose with immutable inspiration and explicit overlap. They omit upstream runtime dependencies, universal success thresholds, flawed effect snippets and studio-specific configuration. The prior whole-package review gaps are not treated as resolved. No consumer guidance, reviewer agent, hook, service, recording or participant contact is activated by admission.

The browser now supports a Game design topic category derived from the existing `game-design` tag. It has a dedicated primary tree group and a Category filter that composes with existing filters. Entry types and installation routes remain unchanged. Featured remains an additional listing; Custom and Experimental keep their existing placement priority. A topic category is not a new entry type or an install-all collection.

Generated indexes are rebuilt from source, and the [selection guide](game-design-options.md) explains each method. The catalog now has 87 entries, including 48 skills and 12 workflows, with seven collections. Category tests, a site build and local browser verification assess implementation; they do not establish improved gameplay or agent outcomes.

## 44. Admit explicitly selected reverse-engineering alternatives (2026-10-29)

Following the user's selection of the six [research options](research/2026-10-29-reverse-engineering-research.md), added linked `reverse-engineering` and `cynthion-reverse-engineer` skills, plus `reva`, `ida-mcp`, `reverse-engineer-anything` and `cerberus-re` MCP entries. All are experimental and start at `reviewed`. The [admission record](research/2026-10-29-reverse-engineering-admission.md) and [selection guide](reverse-engineering-options.md) distinguish methods, tool access and larger runtimes.

Explicit selection permits listing these alternatives without claiming their prior review blockers are resolved. Known technical examples, incomplete resource/runtime audits and Encid's noncanonical Apache-labelled text remain disclosed. Installation routes retain complete resources and licenses; Cynthion requires its sibling decoder, and workbench dependencies remain conditional. No upstream payload is vendored or edited, and no integration, host hook, engine, runtime probe or hardware operation is activated.

The exact requested `reverse_engineering` tag uses a separate tag schema accepting single hyphen or underscore separators. Entry and relation IDs keep their hyphen-only convention. Tests preserve that distinction and reject malformed tags. This is a searchable tag, not a new entry type, topic category or install-all collection.

The recovered RE report now uses a descriptive filename after a shared-workspace dated-filename collision; the existing game-design report and its links are preserved. Generated indexes are rebuilt from source. The catalog now contains 93 entries, including 50 skills, six MCP servers, nineteen experimental entries, one custom entry and seven collections. No plugin manifest or version changes.

## 45. Add a global catalog command palette (2026-10-29)

The catalog browser exposes a Commands button and Cmd/Ctrl+K shortcut. An empty query offers overview navigation, filter reset, Codex and Claude Code browsing, About, installation review when a selection exists, the starter collection and up to four featured non-experimental entries. Installation review only opens the existing preview; palette actions do not select or install entries.

Search covers all entries and collections independently of sidebar filters, matching every query word across titles, IDs, summaries, use cases, tags and hosts. Title matches rank first, with curator score as an entry tie-breaker. Results are capped at thirty with an accessible count and narrowing hint. The native modal contains a combobox/listbox with arrow navigation, Enter activation, Escape dismissal and focus restoration; page shortcuts ignore the palette. The existing slash shortcut still focuses sidebar search.

## 46. Refine catalog browsing and entry inspection across window sizes (2026-10-29)

Applied the supplied Human-centered interface design method to the existing catalog workbench. At the initial 950 CSS-pixel window, the header squeezed search to about 51 pixels and overflowed its width; fixed minimum inspector columns also caused horizontal scrolling. The header now reflows before crowding, inspector cards adapt to available space, long source controls remain contained, and light-theme badge text and subtle labels use darker colors. The existing typography, source action, metadata and navigation categories remain in place.

On narrow screens, Browse catalog exposes the list while entry selection collapses it and focuses the details. Search reopens browsing. Entry shortcuts reach installation, source files and review details without changing the route. Skip navigation, consistent focus outlines, native pressed-button groups, selection focus retention and preserved visible folder folds support keyboard use. Filter reset restores search focus without rebuilding the current entry; Escape retains the entry route, and arrow-key entry navigation is scoped to the catalog list or page background so reading controls keep their normal scrolling behavior. Reduced-motion preferences suppress decorative transitions.

File changes clear stale content and disable copying until the selected file loads. Missing files explain how to recover; rejected loads expose Retry; clipboard rejection offers manual copying. A scoped status announces file feedback instead of treating the entire detail pane as a live region. Explicit hidden styling prevents flex controls from accidentally displaying hidden recovery actions.

Browser checks exercised desktop and narrow layouts, disclosure and entry focus, keyboard selection, folded groups, empty-search reset, skip navigation, section shortcuts, host switching, file switching, browser Back, successful copying, missing-file recovery and command-palette dismissal. No browser console errors were recorded. Repository checks pass 104 tests; the production build passes. The initial sandboxed check failed on localhost fixture binding and passed with test-server permissions. Rejected network loads, denied clipboard permissions, a rendered light theme, screen-reader compatibility and participant comprehension were not tested; this pass makes no accessibility-conformance or measured-usability claim. The shared workspace's existing command-palette and catalog-content changes were preserved.

## 47. Distill tagging research into a System design skill (2026-10-29)

Following the user's request, admitted adapted `catalog-taxonomy` from the [tagging research](research/2026-10-29-catalog-tagging-research.md). It supplies a reusable method for concept identity, scoped facets, aliases, retrieval semantics and compatible vocabulary migrations. A conditional reference provides registry examples and migration detail; both it and the license live inside the skill directory. The method is independently authored from primary-source principles and requires no runtime, service or sibling skill.

Overlap with native reasoning, the available host skill inventory, domain-modeling and human-interface-design is recorded in the entry. Evidence starts at `reviewed`: packaging and category checks do not establish activation, better retrieval or user outcomes. No independent behavioral trial was run.

Added a System design browser topic from the `system-design` tag, preserving the underlying Skill type and install route. Topic filters and counts recognize every applicable category, independently of the existing single primary tree placement and Custom/Experimental priority. Existing entries were not retagged. This is a focused category addition, not adoption of the proposed registry, taxonomy migration or full discovery redesign.

The catalog now has 94 entries, including 51 skills and seven collections. Generated indexes are rebuilt from source. No plugin manifest, version or consumer installation changes.

## 48. Give native scrollbars a consistent workbench treatment (2026-10-29)

Added a dedicated scrollbar stylesheet for the catalog's scroll surfaces. Fine-pointer environments use rounded inset handles inside fixed 14-pixel rails, a wider visible grip on hover, an accent while dragging, transparent resting tracks and distinct light-theme colors. Standards-based colors cover engines without the detailed WebKit selectors; touch-only and forced-color environments keep native styling. Standard colors are reset inside the detailed-style branch because they otherwise override it in Chromium; see the [browser styling guidance](https://developer.chrome.com/docs/css-ui/scrollbar-styling).

Vertical panes reserve stable gutters and contain vertical overscroll; horizontal file and command strips contain horizontal overscroll and leave room for focus rings. Installation commands are focusable and labelled so keyboard users can scroll long lines. No replacement scrollbar widgets, wheel handlers, scroll animation or dependencies are introduced. Stable gutters follow [the browser's classic/overlay behavior](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/scrollbar-gutter).

Local browser verification confirmed independent dragging of both main handles, horizontal arrow-key scrolling of installation commands and unchanged pane widths when filtering between overflowing results and an empty state. The sidebar retained 325 pixels of content width in both states. Dark-theme rendering and narrow layout are inspected in the in-app browser; other browser engines, rendered light/forced-color modes and physical touch input are not claimed as tested.

## 49. Highlight Markdown and YAML source without a runtime dependency (2026-10-29)

The file viewer applies a small lexical highlighter to `.md`, `.yaml` and `.yml` sources. Markdown headings, list/quote markers, strong text, links, inline code and fences get theme-aware colors; YAML keys, quoted strings, comments, literals and block scalars are distinguished. Markdown frontmatter and YAML fences use the YAML path. This remains a source viewer: links and embedded HTML are displayed as text, not rendered or activated.

The highlighter escapes all source before generating a fixed set of span classes. Token text preserves original whitespace and line endings, while Copy file still uses the unmodified loaded string. Unsupported extensions, files above 200,000 characters and lines above 2,000 characters remain plain text. These bounds keep malformed and generated content inexpensive; the lexer is intentionally not a full Markdown or YAML parser. No grammar bundles, CDN requests or package dependencies are added; its standalone minified module measures about 2.4 KB before compression.

Tests cover lossless text, frontmatter and fence context, quoted hashes, block scalar content, HTML injection escaping and size fallbacks. Browser checks cover Markdown/YAML switching and exact clipboard-to-source comparison. Dark/light palette rules and a forced-color fallback are included; only dark-theme rendering was visually inspected in the in-app browser.

## 50. Retag every entry against a controlled vocabulary (2026-10-29)

Following the user's request, applied the catalog-taxonomy method to all 94 entries. Every entry tag is now registered in `catalog/tags.yaml` with a stable ID, label, facet (topic, task, technology or search-only keyword) and scope definition. Aliases record equivalent wording, including the spellings retired here. The validator rejects unregistered entry tags, unused terms, duplicate IDs, malformed terms, and any ID, label or alias that normalizes to two terms. Tests exercise each of these cases.

Retagging reduced 200 distinct tags and 416 assignments to 175 and 406. Tags that repeated structured fields (`experimental`, `workflow`) or named broad qualities (`evidence`, `quality`, `discipline`, `meta`, `automation`, `local`, `session`, `iteration`) were removed. Equivalent spellings were merged into one term, with the old spelling kept as an alias: `context-hygiene` into `context`, `interaction` into `interaction-design`, `critique` into `design-review`, `credentials` into `secrets`, `gh-cli` into `github`, `fonts` into `typography`, `art-direction` into `visual-design`, `knowledge-capture` into `memory`, `skill-triggering` into `skill-authoring`, `honesty` into `completion-claims`, and `appsec` into `security`. `research` was split: studies of people use `user-research`, while `research` remains for technical and codebase investigation. Grilling no longer carries `design-review`, which now means interface critique only. Shared tags were added where coverage was missing, for example `guardrails` on blocking hooks, `binary-analysis` on every binary RE tool, `reproduction` on both debugging skills, and `frontend` on all web UI entries.

`reverse_engineering` keeps its underscore spelling under decision 44. `domain-modeling` gains `system-design`, so it now appears in the System design browser category alongside catalog-taxonomy; no other category membership changed. Tag edits to vendored entries touch only catalog metadata in `entry.yaml`, not vendored payloads.

The vocabulary is validated but is not yet published in the generated index or used by browser search. Aliases do not currently expand queries, and faceted filters remain future work under the tagging research. Ratings, evidence levels, entry types, hosts and installation routes are unchanged. No retrieval benchmark or curator-agreement trial was run, so improved discovery is a hypothesis.

## 51. Add a Dev UX topic that admits user-facing tools (2026-10-29)

Following the user's review of the [Dev UX research](research/2026-10-29-catalog-scout-3.md), registered the `dev-ux` topic in the tag vocabulary. It covers the local development loop around agents: running, finding and observing apps (dev servers, ports, logs, browser checks), toolchains, worktrees and session visibility. The browser derives a Dev UX category from the tag, alongside Game design and System design, with the same multi-category filter and single primary tree placement rules.

Five existing entries fit the definition and are tagged now: `webapp-testing`, `chrome-devtools-mcp`, `verification-evidence`, `post-edit-diagnostics` and `desktop-attention`. Non-experimental, non-custom entries whose first recognized category is Dev UX move into that tree group; their types and installation routes are unchanged.

At the user's direction, Dev UX includes tools whose primary user is the person rather than the agent, such as usage reports and status lines. This widens the catalog's scope from agent guidance alone for this area. Such entries still need an applicable entry type, honest ratings starting at `reviewed`, stated side effects and explicit opt-in; reading credentials or rewriting settings counts as a side effect to disclose. The current entry types have no home for a standalone CLI that is neither a plugin nor an MCP server, so admitting one such as ccusage needs a schema decision first.

No candidate from the research is admitted by this decision. Ratings, evidence levels, pins and the `webapp-testing` payload are unchanged; the report's server-helper finding remains a follow-up. Generated indexes are rebuilt from source.

## 52. Admit Dev UX tools and a user-facing tool type (2026-10-29)

Following the user's request to proceed with the [Dev UX research](research/2026-10-29-catalog-scout-3.md), admitted six linked entries at `reviewed`: skill `portless` (experimental), MCP servers `process-compose-mcp` and `mise-mcp`, plugins `worktrunk` and `claude-hud`, and tool `ccusage`. The [selection guide](dev-ux-options.md) distinguishes their jobs. Each was source-reviewed again at its pin before admission. Pins follow the last commit affecting the reviewed path, except claude-hud, which pins the CI commit that ships the reviewed source's built output, and ccusage, which pins release tag v20.0.45.

Added a `tool` entry type for user-facing developer tools that are neither plugins nor MCP servers, following decision 51. Tools live under `entries/tools/`, are always linked, have no primary payload file, and are installed manually like plugins. The schema, loader, install-config schema, bulk installer ordering and browser type filter recognize the type; a test rejects a non-linked tool.

Side effects are stated in each entry instead of being treated as blockers:

- Portless's skill directs elevation (port 443 with sudo), local CA trust, `/etc/hosts` sync, package.json edits and global installs without asking. Its entry leads with the least-privilege setup and lists what to ask about. It is experimental because it is pre-1.0 and changes weekly.
- Process-compose's stdio mode starts a duplicate project, so SSE attachment is the documented route. Its shell substitution of tool arguments is injectable when placeholders are quoted.
- Mise's environment resource returns unredacted secrets, and setting `CI` disables its trust gate.
- Worktrunk's Claude Code plugin replaces built-in worktree creation and removal and auto-approves entering existing worktrees.
- Claude HUD's launcher runs the highest cached version from any marketplace.
- ccusage spawns an unreviewed native binary and downloads prices unless `--offline` is passed.

Unpinned installer commands are replaced with pinned ones where upstream allows it.

Also recorded the verified `webapp-testing` server-helper defect in that entry's rating notes. The vendored payload is unchanged. Added `worktrees` to `superpowers` and `compound-engineering`, which already ship worktree skills, and registered the keywords `dev-servers`, `local-urls`, `worktrees`, `toolchains`, `status-line` and `usage-tracking`.

dev3000, next-devtools-mcp, the sentimony fork, cli-for-agents and the other review-next items remain unadmitted, and agent-browser stays held. No hook, MCP connection, plugin or tool is installed or activated by admission. Generated indexes are rebuilt from source. The catalog now has 100 entries: 52 skills, 12 workflows, 15 hooks, eight MCP servers, five plugins, five rules, two subagents and one tool, with twenty experimental entries and seven collections. No plugin manifest or version changes.
