# Frontend design skills: a source-based comparison

## Scope and baseline

**As of and researched:** October 28, 2026, America/Edmonton. Live research into coding-agent frontend design skills, including all-time installation signals, specialist design engineering, product UI, critique, and design-system continuity. “Best of all time” is interpreted as the strongest available candidates across the established ecosystem, not a historically proven champion. The evidence does not support that stronger claim.

**Finding:** Anthropic's current `frontend-design` is the strongest compact starting point in this sample. Impeccable is the broadest refinement workflow worth trialing. Emil Kowalski's focused skills are the strongest source for interaction craft and motion restraint. Taste is a deliberately restrictive art-direction system, and UI/UX Pro Max is a searchable recommendation library. They solve different problems; installing all of them together creates policy conflicts.

These are provisional curator judgments from source inspection, not measured rankings. No designs were generated, no upstream scripts or installers executed, and no matched outcome evaluation performed. Source availability and attractive demonstrations cannot establish better user outcomes.

Baseline: [popular-library scout](2026-10-28-catalog-scout-4.md), [frontend scout](2026-10-28-catalog-scout-6.md), [earlier Taste comparison](../research-2026-10.md#taste-skill-and-anthropic-frontend-design--different-enforcementcost-tradeoffs), [UX critique research](../user-critique-research-2026-10.md), `PLAN.md`, `CONTRIBUTING.md`, and [decisions 33 and 35](../decisions.md). The current index has 64 entries. Existing coverage includes `ux-critique`, `webapp-testing`, `react-best-practices`, `react-component-composition`, `vue-async-state`, `verification-before-completion`, and the `frontend-quality` collection.

The installed host environment already exposes a `frontend-design` skill and browser tools. Its local frontend prompt is an older, more maximalist version than the current upstream inspected here. That is an observed difference in this environment, not a claim about every Codex or Claude installation. No duplicate or replacement was installed.

## Coverage and observations

Surveyed skills.sh's rendered All Time, Trending (24h), and Hot lists, the linked candidate detail pages, ten upstream GitHub inventories at full commits, original-maintainer sources, and focused searches for interface design, typography, motion, design-system extraction, and Stitch. The rendered leaderboard responses contained about 460 lines each, with bundle collapsing; this is a sample, not the complete registry or a census of all skills ever published. Hot's displayed increments are not treated as a verified time-window growth measure.

Closely compared eight source families: Anthropic, Impeccable, Taste, UI/UX Pro Max, Emil, Ibelick, Interface Design, and Jakub Krehel. Vercel and Stitch received narrower overlap/dependency inspection. Additional leads appear under Hold. Downloaded inventories and files are distinct from files actually read; the [source snapshot](2026-10-28-design-scout-sources.json) records those limits.

The [skills.sh FAQ](https://www.skills.sh/docs/faq) describes aggregate CLI installation telemetry. Counts below are observed, rounded all-time displays, not active users, independent installations, measured visual quality, or historical growth. Repository stars describe attention to the entire repository. They must not be assigned to each skill or combined with installation counts into a quality score.

| Candidate | Skill installs displayed | Repository stars from GitHub API | Scope of the signal |
| --- | ---: | ---: | --- |
| [Anthropic frontend-design](https://www.skills.sh/anthropics/skills/frontend-design) | 1.0M | 184,568 | One skill; stars cover the whole skills repository |
| [UI Taste / Uizze](https://www.skills.sh/site/uizze.sh/ui-taste) | 802.4K | Not established | Domain-hosted skill; provenance hold retained |
| [Taste](https://www.skills.sh/leonxlnx/taste-skill/design-taste-frontend) | 696.0K | 104,731 | One registry skill; repository snapshot inspected separately |
| [UI/UX Pro Max](https://www.skills.sh/nextlevelbuilder/ui-ux-pro-max-skill/ui-ux-pro-max) | 421.6K | 142,177 | One skill within an expanding bundle |
| [Emil design engineering](https://www.skills.sh/emilkowalski/skills) | 397.0K | 51,159 | `emil-design-eng`; repository total separately displayed as 2.8M |
| [Impeccable](https://www.skills.sh/pbakaus/impeccable) | 369.2K | 93,293 | Main skill; repository total separately displayed as 1.9M |
| [Jakub typography](https://www.skills.sh/jakubkrehel/skills) | 35.3K | 9,033 | `better-typography`; repository total separately 309.2K |
| [Interface Design](https://www.skills.sh/dammyjay93/interface-design/interface-design) | 31.1K | 5,872 | Main skill |
| [Ibelick Baseline UI](https://www.skills.sh/ibelick/ui-skills) | 24.7K | 10,322 | Main baseline; library total separately 114.3K |

Same-day differences from earlier reports are separate observations, not a growth study. Registry headers may include aliases and retired names: Impeccable's 24 registry names are not 24 independent current skill entrypoints, and Jakub's 20-name header differs from the 14 entrypoints in the pinned tree. Registry summary prose can also lag source: UI/UX Pro Max's summary advertises fewer stacks and palettes than its current entrypoint. Use the pinned artifact as authority.

## Practical ranking by job

The order below weighs usable instruction quality, scope, incremental value and operational burden. It is not a star ranking or an admission decision.

| Priority | Choice | Where it is strongest | Principal limitation |
| --- | --- | --- | --- |
| 1 | Anthropic frontend-design | New pages and a compact general visual-design baseline | Existing host overlap; limited enforcement |
| 2 | Impeccable | Iterative improvement, modes, focused polish, critique and variants | Executable engine, broad dependencies and workflow effects |
| 3 | Emil's focused design-engineering skills | Product interactions, motion decisions, component feel | Some absolute policies and stale performance generalizations |
| 4 | Taste | Expressive marketing pages with an intentionally strict house style | Aesthetic quotas, runtime cost, no demonstrated general win |
| 5 | UI/UX Pro Max | Searching palettes, product patterns, typography and stack guidance | Retrieval relevance and data validity still need checking |
| 6 | Interface Design | Domain-specific dashboards, token consistency and persistent decisions | Incorrect technical statements and too much novelty pressure |
| 7 | Jakub's focused skills | Detailed typography and change-scoped interface review | Reference and sibling closure remains incomplete |
| 8 | Ibelick's focused checks | Small code-level accessibility or animation-performance passes | Baseline stack mandates and overgeneralized rules |

For an existing product, project components, accepted tokens and actual user tasks are the first design authority. A design skill should help apply that authority. Distinctiveness is useful for a new visual identity; it does not justify replacing familiar controls in an operational tool.

## Recommend adding

**No unchanged upstream bundle is recommended for immediate admission from this pass.** The best general baseline is already exposed in the host, while the differentiated large systems retain explicit review blockers.

**One adapted proposal clears the source-research bar: interaction-preserving motion reduction.** Independently author a focused skill inspired by Emil's complete `remove-animations` entrypoint and MIT license at `a81dbca07f2217b7103e510c0f13f8d5b017afc9`. Its concrete value is inspecting what depends on an animation before removing it: hidden start states, delayed unmounts, callbacks, focus timing, tests and orphaned imports. Neither `react-best-practices` nor `ux-critique` supplies this specific removal procedure. Browser tools supply observations, not that dependency method.

Preserve accepted motion and project conventions. Treat frequency and keyboard use as reasons to investigate latency, rather than universal deletion laws. Do not copy the mandatory quota of two to five kept animations, require sibling skills, or turn a request to reduce motion into a dependency uninstall. Verify the full interaction after each removal, including focus, rapid re-entry, reduced-motion behavior, content visibility and asynchronous state. Authoring and any fixture checks remain a later admission task; this report does not contain an installable placeholder or establish behavioral effectiveness.

Provisional fit: high usefulness for over-animated product UI; good quality in the dependency inspection method; high potential portability for an independent procedure; meaningful novelty beyond general polish. Proposed mode: **adapted**, with immutable inspiration and an independently written payload. Preserve the upstream copyright/license if copying expression; an original rewrite should still cite the source. This is a bounded addition proposal, not endorsement of the entire Emil library.

## Candidate records and review next

### Anthropic: best compact starting point

**Identity:** [skills/frontend-design/SKILL.md](https://github.com/anthropics/skills/blob/ca45fc496a3436251f191354091d557da31c15b5/skills/frontend-design/SKILL.md), repository HEAD `ca45fc496a3436251f191354091d557da31c15b5`; last path commit `41bbe19d1a1a7eaab5e7bb9050a417e5c6cffc8f`, September 3. Complete entrypoint and local Apache-2.0 `LICENSE.txt` read. No executable helpers or required reference subtree in that skill directory.

The current version ties identity to subject matter, plans color/type/layout before implementation, reviews the plan against the brief, limits decorative motion, checks responsive/focus/reduced-motion basics and treats interface copy as functional content. Crucially, its anti-template examples yield to explicit brief requirements. That makes it a better default than a large universal ban list.

The installed older prompt emphasizes extreme aesthetic directions, forbids common fonts and encourages many effects; the newer upstream stresses one memorable element with surrounding restraint. A skill name alone does not identify its behavior. Source versions matter when comparing screenshots or experiences.

**Fit:** high usefulness and portability, strong compactness, modest novelty where the host already provides it. Overlap: installed `frontend-design`, normal model design ability, `verification-before-completion`, `webapp-testing` and `ux-critique`. **Disposition:** keep as baseline and revisit the local copy if updating it is requested. No additional catalog copy is needed here. Neither the license nor its popularity proves outcome improvement.

### Impeccable: strongest broad workflow to trial

**Identity:** [.agents/skills/impeccable/SKILL.md](https://github.com/pbakaus/impeccable/blob/5e745ace7e151feb2a93d360d0281fe39448b857/.agents/skills/impeccable/SKILL.md), version 4.8.0; repository HEAD `5e745ace7e151feb2a93d360d0281fe39448b857`; last skill-directory commit `7510e233b228864606888d252abacf5e7148bf87`, October 28.

**Inspection:** entrypoint, craft floor and polish playbook read; critique setup/orchestration, scoring and persona sections sampled; shell launcher and context/telemetry/release source sections inspected. Root license is Apache-2.0; `NOTICE.md` read, including MIT-derived platform reference attribution. The full Rust engine, browser scripts, live mutation path, transitive dependencies, all playbooks and platform references were not audited. Downloading source does not close these gaps.

Its best distinction is explicit modes: Persuade, Operate, Read and Experience. A dashboard is not treated as a marketing canvas. Polish preserves incumbent identity, prioritizes broken tasks and missing states, checks long/localized content and verifies a complete path. The breadth of focused verbs gives users a more precise vocabulary than “make this better.” Live variants could make choosing a direction materially easier.

Limitations are substantive. The craft floor contains an eyebrow-label ban even when the brief asks for it, alongside broader instructions that the brief wins. Critique has two independent assessment roles and a Codex-specific permission gate; these are source workflow requirements, not a universal host fact. Its heuristic scores and simulated personas remain expert hypotheses. They are not observed users or accessibility certification.

The launcher can download a versioned engine checked against the installed checksum manifest; installed binaries, overrides and cached verification stamps take other routes. That is executable setup, not unpinned remote prose loading. Source inspection also found default-on roll/choice telemetry settings and a remote roll feature: `DO_NOT_TRACK=1` and `IMPECCABLE_NO_TELEMETRY=1` disable telemetry, but the source explicitly says the roll request still happens. Opting out is not offline operation. Server recording behavior was not independently verified.

**Fit:** high usefulness and differentiated coordination; potentially high quality, moderate portability, high operational burden. Overlap: host frontend design/browser tools, `ux-critique`, `webapp-testing`, existing tokens. **Disposition:** retain the previous hold, with expanded evidence. Preferred eventual mode is linked, after engine/resource review and a disposable refinement/critique/live-variant trial. No binary, hook or telemetry path was activated in this research.

### Emil: strongest focused interaction-craft source

**Identity:** [emil-design-eng](https://github.com/emilkowalski/skills/blob/a81dbca07f2217b7103e510c0f13f8d5b017afc9/skills/emil-design-eng/SKILL.md), [remove-animations](https://github.com/emilkowalski/skills/blob/a81dbca07f2217b7103e510c0f13f8d5b017afc9/skills/remove-animations/SKILL.md), and [animation-performance](https://github.com/emilkowalski/skills/blob/a81dbca07f2217b7103e510c0f13f8d5b017afc9/skills/animation-performance/SKILL.md). HEAD `a81dbca07f2217b7103e510c0f13f8d5b017afc9`; `emil-design-eng` last changed at `85e8e2363b713506e1d5b6e07a0eb2da66be1bc3`, September 15; removal skill changed October 28. Root MIT license read. Main design-engineering sections and complete removal/performance entrypoints inspected; `animate` was downloaded but not fully reviewed. Sibling workflows were not reviewed as a package.

The valuable material explains purpose and frequency, origin-aware popovers, delayed versus subsequent tooltips, interruptibility, pointer capture, touch hover, motion visibility and removing animation dependencies safely. It offers much more implementable detail than a generic request for delightful interactions. For a daily product tool, restraint often deserves more attention than a dramatic entrance.

Do not treat every statement as a current browser contract. The performance skill presents `motion/react` components as always driven on the main thread and says independent transform shorthands are not accelerated. Current [Motion documentation](https://motion.dev/docs/performance) describes accelerated independent transforms and browser-dependent exceptions. API, library version and animation kind matter; this report does not assert every React layout animation is accelerated. The same skill claims padding and scale look the same, which is false for content and document flow, and proposes opacity for display/visibility swaps. [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/opacity) notes invisible elements may still receive pointer input and focus. These substitutions require semantic and interaction checks.

**Fit:** high usefulness and concrete craft; good prose portability; useful novelty for dependency-safe motion removal. **Disposition:** recommend the bounded adaptation above. Hold unchanged broad performance guidance pending version-scoped corrections upstream. MIT does not authorize silently editing a vendored entry; adaptation must be identified as adaptation.

### Taste: strongest deliberately opinionated art-direction experiment

**Identity:** [skills/taste-skill/SKILL.md](https://github.com/Leonxlnx/taste-skill/blob/12af471f627f866411b4bd785b19646d3672784c/skills/taste-skill/SKILL.md); HEAD `12af471f627f866411b4bd785b19646d3672784c`; last directory commit `af8a897996e159ccc89c9da535dff714d5dba62d`, October 24. Frontmatter name is `design-taste-frontend`, different from its source directory.

**Inspection:** entrypoint and MIT license; research method, reported test rounds and app-screen study; inspector setup, motion gate, output and reduced-motion sections. Other references, drawing/media tools, CDP/probe/rule libraries, scene scripts and full browser chain remain incompletely read. Node 22+ and Chrome-family browser are needed for the full inspector; fallback paths exist. It writes `.taste-skill` artifacts and may fetch media with source/credit requirements. Media rights must be assessed per asset, separately from the code license.

The distinctive method deals art directions from a local library, demands a subject-specific idea, builds something visitors can use, measures multiple widths, then critiques screenshots. Existing-brand palette/type preservation and inspector allowances are documented. Its app mode has separate rules; marketing-page restrictions must not be generalized to every app screen.

The house style bans many legitimate devices: gradients, hairlines, monospace labels, repeated cards, long headings and certain palettes. Marketing inspection fails insufficient motion below eight moving elements, warns below sixteen, and demands entrances across sections. That is a style policy, not a quality or accessibility standard. It can directly conflict with an accepted restrained brand.

The [author's research file](https://github.com/Leonxlnx/taste-skill/blob/12af471f627f866411b4bd785b19646d3672784c/skills/taste-skill/references/research.md) is commendably candid: its gallery panel was model reviewers, not human designers. Early rounds lost to baseline. The unseen-brief fourth round averaged 6.9 versus baseline 7.9; the fifth reused those three briefs and averaged 7.7 versus 7.8, winning two of three individually. Final skill builds had zero inspector failures while baseline builds had eight to thirteen. This supports improved house-rule compliance, not a general visual-quality win. Small samples, model judges and iterative reuse limit transfer; the current revision is not established as the exact version producing every reported result.

**Fit:** high potential usefulness for expressive sites; coherent but restrictive quality; moderate portability; differentiated enforcement. **Disposition:** preserve opt-in specialist hold. Trial against current Anthropic and no-skill baselines on unseen marketing and app tasks; measure brand adherence, completion time, tokens and behavior as well as screenshots. Do not admit the full runtime without resource closure.

### UI/UX Pro Max: strongest searchable design-reference candidate

**Identity:** [.claude/skills/ui-ux-pro-max/SKILL.md](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/blob/28b3b8dee8c976df4fa3e94aed4e092ad43fcb03/.claude/skills/ui-ux-pro-max/SKILL.md), HEAD and last path commit `28b3b8dee8c976df4fa3e94aed4e092ad43fcb03`, October 26. Root MIT license read.

**Inspection:** complete entrypoint, search CLI routing/output code, core domain/data configuration and sample data-provenance records. The Python generation/reasoning chain, full CSV bodies, relevance evaluator, installer, all reference bodies and duplicated CLI assets were not audited. The source describes standard-library Python search with no external Python packages; this is a documented prerequisite, not a run result.

This is useful because it externalizes recommendations into local searchable data: styles, semantic palettes, fonts, chart choices and stack rules. Queries distinguish design-system generation, a specific domain and stack-specific implementation. The current entrypoint checks return relevance, retries once, prohibits pretending an empty search succeeded, detects the stack and preserves existing persisted decisions. Those are stronger than mechanically choosing a palette by industry name.

BM25 relevance and curated confidence fields do not establish correctness. Sample provenance confidence values are author-supplied; derived links to other local rows are not independent evidence. `--design-system` ignores `--stack` and expects a separate stack query, explicitly disclosed by the CLI. Consumers must inspect the returned suggestions and render the result. This is a recommendation source, not a substitute for a visual feedback loop.

The inspected entrypoint uses `CLAUDE_PLUGIN_ROOT` paths. That requires a verified installation/path route for Codex; a portable format alone does not resolve the variable. Master/page persistence writes project files and has its own overwrite rules. Python availability, complete data/scripts/references, font/icon provenance and sibling asset packaging need admission review.

**Fit:** high usefulness for broad product exploration, promising structured quality, moderate portability until packaging review, meaningful retrieval novelty beyond a prose skill. **Disposition:** Review next; linked likely fits better than copying a large data bundle. Read the entire generation/retrieval chain and sample consequential UX/stack records before a focused relevance and brand-preservation trial.

### Interface Design: promising product focus with specific blockers

**Identity:** [.claude/skills/interface-design/SKILL.md](https://github.com/Dammyjay93/interface-design/blob/2f9be3206855bcb2d1d0af262c8bae25cba6658d/.claude/skills/interface-design/SKILL.md); HEAD `2f9be3206855bcb2d1d0af262c8bae25cba6658d`, last directory commit `890d9295acdaf57891a20dc2499abfb4b8529784`, June 20. Main entrypoint sections and MIT license inspected. Plugin commands and any supporting files remain unreviewed; no whole-plugin review claimed.

The narrow product-UI scope is valuable: dashboards, settings and data interfaces; persistent `.interface-design/system.md`; existing components before custom behavior; domain exploration and hierarchy rather than palette alone. Optional direction boards and inline specimens can make choices reviewable, though a specimen is not verification of the running app.

Two technical blockers weaken unchanged admission. It calls 44×44 “WCAG” and 40 the minimum without specifying level: [WCAG 2.2 AA minimum](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) is 24×24 CSS pixels with exceptions, while [44×44 is the enhanced AAA criterion](https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced.html). Larger house targets can be sensible, but should not be mislabeled as universal conformance rules. It also says native selects/date inputs cannot be styled and recommends replacing them. [MDN's select documentation](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/select) describes both legacy styling and newer customizable selects; replacement should follow actual requirements and browser support.

**Fit:** high usefulness for dashboards, moderate current quality, good prose portability, limited-to-moderate novelty against Impeccable Operate and host guidance. **Disposition:** hold unchanged artifact; watch upstream corrections. Avoid forcing novelty or poetic token names where an established semantic system is already clear and usable.

### Jakub Krehel: promising typography and interface regression review

**Identity:** [better-typography](https://github.com/jakubkrehel/skills/blob/592aedc44d7d5b3e29740984252902f3e5402a1c/skills/better-typography/SKILL.md), [interface-review](https://github.com/jakubkrehel/skills/blob/592aedc44d7d5b3e29740984252902f3e5402a1c/skills/interface-review/SKILL.md); HEAD `592aedc44d7d5b3e29740984252902f3e5402a1c`, October 25. Typography last directory commit `1eb03d2b145df1c6cd84ab54a337600a2a379017`, October 24. Both entrypoints and root MIT license read. Typography references and review's required `better-interface`/domain chain were not read completely; single-file copying is insufficient.

Typography goes beyond selecting fonts: actual loaded faces, synthesis, font properties, semantic scales, wrapping, truncation recovery, numeric alignment, bidi and verification. It preserves the project's typeface unless a change is requested and separates some preference from findings. Some exact numeric floors are still policy judgments, not universal standards.

Interface review distinguishes introduced, regressed and pre-existing findings, expands changed tokens/components to consumers, reads removed lines, and refuses to invent a review when no change exists. It is a concrete gap between generic code review and a screen-wide UX critique. It relies on siblings for verdict/severity, and its opt-in rendered verification means it cannot establish runtime quality by source review alone.

**Fit:** high usefulness for detailed maintenance, promising quality, moderate portability due resource/sibling closure, useful novelty for interface regressions. **Disposition:** high-priority Review next. Read typography references and the entire required review chain before recommending a complete linked bundle or bounded adaptation. Do not silently install every registry alias.

### Ibelick: useful focused checks, restrictive baseline

**Identity:** [baseline-ui](https://github.com/ibelick/ui-skills/blob/59193a75432e5f41c6980f53b9e6a7bd56919947/skills/baseline-ui/SKILL.md), [fixing-accessibility](https://github.com/ibelick/ui-skills/blob/59193a75432e5f41c6980f53b9e6a7bd56919947/skills/fixing-accessibility/SKILL.md), [fixing-motion-performance](https://github.com/ibelick/ui-skills/blob/59193a75432e5f41c6980f53b9e6a7bd56919947/skills/fixing-motion-performance/SKILL.md). HEAD `59193a75432e5f41c6980f53b9e6a7bd56919947`, October 25; baseline last changed `edda651ce598c8b7735784178f94de61696ea854`, June 11. Those three complete entrypoints and MIT license read. `create-design-md` received separate entrypoint inspection; registry/MCP/CLI runtime not audited.

The concise finding/snippet/impact/fix structure is useful. Focused animation guidance preserves the stack and covers measurement batching, offscreen loops and profiling. Accessibility checks cover names, native semantics, errors and focus. But “all interactive elements reachable by Tab” is too broad: [WAI-ARIA keyboard guidance](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/) uses arrow navigation within composite widgets and often one Tab stop. Fixing that wording is necessary before treating every literal rule as a defect detector.

Baseline UI mandates Tailwind defaults, `motion/react`, a class utility and primitive systems, forbids unsolicited animation/custom easing/letter-spacing and applies destructive dialogs broadly. These are a coherent house policy for a compatible project, not universal frontend design. The motion performance example substituting a transform for width is incomplete without preserving layout intent.

`create-design-md` usefully separates repository authority from URL reconstruction and requires computed evidence. It also calls an unpinned `@google/design.md` specification/lint/export tool; schema behavior, execution effects and version compatibility remain unverified. This is tool/documentation lookup, not automatically the same exclusion as loading arbitrary remote agent instructions.

**Fit:** focused checks are useful and portable prose, but mixed quality and substantial overlap with existing critique/browser checks. **Disposition:** prefer targeted inspection over the whole baseline; hold unchanged accessibility wording and DESIGN.md tool path pending verification. A compatible React/Tailwind team may choose the baseline as an explicit policy.

## Watch / hold / skip

| Candidate | Disposition and reason | What would reopen it |
| --- | --- | --- |
| [Vercel web-design-guidelines](https://github.com/vercel-labs/agent-skills/blob/1a2c79d4e6c4a2283dc2c614b6538cbe1ed5ca62/skills/web-design-guidelines/SKILL.md) | Preserve exclusion: complete entrypoint still fetches `main/command.md` before each review and follows that remote output format. This is unpinned runtime instruction loading. The underlying guidelines may be useful. | An upstream pinned/self-contained route or separately researched adaptation with license/source review |
| [Stitch skills](https://github.com/google-labs-code/stitch-skills/tree/0337446dadde6f8c94210444e2aa9d546126480f) | Platform-specific option, not a universal taste upgrade. Inspected extraction entrypoint sections and README; full references, upload scripts, licenses and sibling chain not reviewed. Some workflows require Stitch MCP, credentials and remote writes; source-only extraction is narrower. | A user with a real Stitch workflow and a complete scoped dependency/authorization review |
| [Uizze UI Taste](https://www.skills.sh/site/uizze.sh/ui-taste) | Preserve October 27 provenance hold. Registry now explicitly separates free skill from optional paid reference MCP. Source pin and redistribution rights remain unverified. | Immutable inspectable source, license and a clear account-free path |
| [AgentsORG design-engineering](https://github.com/AgentsORG/design-engineering) | Discovery lead: navigation graph and many inspirations; root overview only, not closure/source review. Directory size and author attributions do not prove useful retrieval. | Exact artifact/references/licensing review and a specific gap over primary sources |
| [dannyjpwilliams/design-engineer-skill](https://github.com/dannyjpwilliams/design-engineer-skill) | Discovery lead distilling Emil/Jakub; prefer original maintainers until distinct benefit and ancestry are established. | Source/license inspection showing concrete value beyond those sources |
| [High-end visual design](https://github.com/nexu-io/open-design) | Mirror/community lead only; provenance of the exact original skill and required motion/library path not resolved. | Original author, immutable artifact, license and accessible/non-showcase trial |
| Anthropic brand-guidelines / theme-factory / canvas-design | Adjacent jobs. A company-specific brand, theme presets or static artwork is not a general frontend workflow. No new admission review here. | A concrete matching catalog gap |
| React performance / composition skills | Existing catalog coverage; engineering quality complements design, but does not prove art direction. | Relevant upstream change or a recorded failure beyond existing entries |

Unrelated holds remain in the [previous queues](2026-10-28-catalog-scout-8.md) and [frontend queue](2026-10-28-catalog-scout-6.md). This report does not reopen security, Rust, Vue/Vite, Bun or whole-library exclusions.

## Revisit existing entries

- **frontend-quality:** retain its small composition. The missing opportunity is persistent product design authority and interaction-preserving motion work, not another overlapping generic design prompt. Do not expand membership until an actual entry is admitted.
- **ux-critique:** keep the distinction between evidence-grounded findings and Impeccable's broader design-direction system. Existing mixed KB licensing, packaging, local usage recording and output limitations remain. No upstream refresh is claimed here.
- **webapp-testing / verification-before-completion:** browser evidence is the shared foundation. A successful build, house-style scan or screenshot cannot alone establish that a real task works with keyboard, touch, long/localized content and error recovery.
- **react-best-practices / react-component-composition:** retain as complementary engineering methods; a design-system or motion skill should preserve their project constraints and state/interaction contracts.
- **Installed frontend-design:** if the user wants an update, compare the local prompt to the exact current upstream and preserve their installation conventions. Updating user-wide guidance is outside this research request.

## Changes since baseline

Expanded the earlier partial frontend comparison into ten pinned repository inventories, eight close candidate comparisons and additional specialist leads. Separated UI/UX Pro Max's search job from art direction, added Interface Design and Jakub's maintenance-focused guidance, and traced the local/upstream Anthropic prompt difference.

The Impeccable hold is narrowed by additional craft, polish, telemetry and release inspection, but **not cleared**. Taste's reported study and tests weaken any unsupported claim of general superiority; they strengthen the case for measuring compliance separately from outcomes. Vercel's remote-instruction exclusion and Uizze's provenance hold remain. Nothing was admitted, installed, repinned or behaviorally evaluated.

## Top priorities and a fair comparison

1. **Addition proposal:** independently author interaction-preserving motion reduction, using the dependency hazards rather than rigid universal deletion thresholds. This has a smaller review surface and clearer catalog gap than another broad design persona.
2. **Research:** complete Impeccable's runtime/resource review and trial ordinary refinement first. Its mode separation and integrated iteration offer more incremental value than duplicating the host baseline.
3. **Research:** close Jakub's typography/reference and interface-review dependency chains. These target maintainable design quality and introduced regressions, where visual-prompt comparisons provide little evidence.
4. **Research:** audit UI/UX Pro Max's generation/data path and verify a Codex installation route. Assess whether retrieved advice fits the product instead of rewarding catalog size.
5. **Research:** run an unseen-task comparison of current Anthropic, Taste, Impeccable and no added design skill. Treat Emil's narrow motion task separately so its limited purpose is not penalized by a greenfield landing-page benchmark.

Use at least three task classes: an expressive marketing page, an existing branded dashboard, and a form/settings flow with loading, errors and long localized strings. Give all arms the same product brief, assets, stack, preview tooling, budget and accepted design constraints. Use fresh contexts and repeat runs; do not let one arm's output become another's reference.

Judge blinded renders and live tasks separately. Record visual hierarchy, subject fit, brand consistency, keyboard/focus behavior, small-screen/zoom layouts, reduced motion, error recovery, build correctness, time, tokens and setup burden. Prefer independent human design judgment and observed task completion where available. If only model judges are available, disclose that limit and check ordering sensitivity. A skill's own detector is a diagnostic, never the primary outcome judge. Report losses and incomplete runs; keep the baseline as a legitimate adoption choice.

No such trial was launched here. This report and its source snapshot are the completed research deliverables; no admission or installation authority is inferred from them.
