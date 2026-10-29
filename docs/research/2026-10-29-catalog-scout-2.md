# Game-design skills and workflows: focused methods before studio bundles

**Admission follow-up:** the user's subsequent selection is recorded in the [admission record](2026-10-29-game-design-admission.md). Five independent adaptations are now admitted and grouped in the browser. Findings below preserve the source-review boundary; wider studio runtimes and other held candidates remain unapproved.

## Scope and baseline

**As of:** October 29, 2026. **Research date:** October 29, 2026, America/Edmonton. Live, sampled research into popular agent skills and workflows for game design; not a ranking of human game-design courses or a behavioral evaluation.

**Recommendation:** prepare three focused adaptations: mechanic prototyping, level blockout and encounter design, and readable gameplay feedback. Review data-backed balance analysis next. Large studio systems are useful research sources but have substantially more dependencies and prescribed process than these jobs require.

Baseline: [PLAN.md](../../PLAN.md), [contribution policy](../../CONTRIBUTING.md), [decisions 39–41](../decisions.md), the [prior UI/UX scout](2026-10-29-catalog-scout.md), and the existing [mmorpg-design](../../entries/skills/mmorpg-design/SKILL.md). There are 82 current entries and seven collections. MMORPG systems reasoning, human-interface design, research synthesis, moderated usability studies, general implementation planning and verification are existing coverage. There is no dedicated core-mechanic prototyping, level-design or game-feedback entry.

The [source snapshot](2026-10-29-game-design-scout-sources.json) records revisions, popularity observations, inspected files and incomplete review. Earlier uncommitted work is preserved. This run adds research only: no catalog admission, ratings, source-pin changes, generated-index changes, installs, hooks, agents or external participant contact.

## Coverage and observations

Discovery covered skills.sh All Time, Trending and Hot pages; game-specific repository/detail pages; GitHub original-maintainer sources; VoltAgent's directory; GitHub Awesome Copilot; and Awesome Cursor Rules. The three general leaderboard responses each exposed about 459 rendered lines with collapsed bundles, not the entire registry. No comparable historical observations were collected, so this report makes no popularity-growth claim or inferred trending time-window claim.

Seven principal repository inventories returned untruncated GitHub trees. Five complete blob-path inventories were retained for focused repositories; the two enormous Antigravity libraries needed filtered relevant-path output after initial local truncation. Additional targeted inventories covered OpenAI plugins, OpenAI skills, Awesome Copilot and Cursor rules. About twenty concrete entrypoints were identified across prototyping, game feel, levels, RPGs, design theory, balance, playtesting and browser-game implementation. Inspection depth varies and is stated below. No upstream installer, script, hook, engine example or agent instruction was executed.

### Popularity signals

[skills.sh describes its leaderboard](https://www.skills.sh/docs/faq) as aggregate installation telemetry from its CLI. Install counts below are rounded displays observed on October 29, sometimes from cached pages. Stars were obtained through the read-only GitHub API that day. Repository-wide attention is not the adoption of an individual skill, and neither signal measures design quality.

| Source family | Whole-repository stars | Skill installation display | What this establishes |
| --- | ---: | --- | --- |
| [awesome-gamedev-agent-skills](https://www.skills.sh/gamedev-skills/awesome-gamedev-agent-skills) | 5,575 | game-feel 11.0K; level-design 8.9K; rpg 7.3K; prototype-fast 7.2K | Strongest focused game-design installation signals in this sample; many similarly sized counts may reflect bundled selection |
| [Claude-Code-Game-Studios](https://github.com/Donchitos/Claude-Code-Game-Studios) | 28,922 | Not independently captured | Substantial attention to the whole studio, not proof of balance-check use |
| [BMad Game Dev Studio](https://github.com/bmad-code-org/bmad-module-game-dev-studio) | 262 | Not independently captured | Module attention only; do not assign the much larger BMad Method repository's stars to it |
| [Agentic Awesome Skills](https://www.skills.sh/sickn33/agentic-awesome-skills/game-development) | 48,730 | game-development 3.8K | Whole-library attention plus router installations; not a focused design endorsement |
| [Omer Metin's skills](https://www.skills.sh/omer-metin/skills-for-antigravity) | 183 | game-design-core 538; game-design 230; progression-systems 64 | Displayed library-page totals per skill; individual game-design-core page timed out |
| [Sascha Becker's game-design](https://www.skills.sh/saschb2b/skills/game-design) | 22 | 75 | Specialist lead with limited visible adoption |
| [OpenAI plugins](https://github.com/openai/plugins) | 7,656 | Not captured for Game Studio | First-party provenance and whole-repository attention, not plugin usage |
| [indieshade/game-design-analysis-skill](https://github.com/indieshade/game-design-analysis-skill) | 0 | Not captured | A source lead, not an established popular choice |

The game-dev registry page advertises 78 skills, while the pinned tree includes additional recent paths. Treat registry headers and live inventories as separate snapshots. Sickn33's former `antigravity-awesome-skills` URL redirects to `agentic-awesome-skills`; it is one source, not two candidates.

## Recommend adding

These are proposals to author independent, scoped adaptations, not endorsements of unchanged upstream content. Source inspection supports the method and licensing path; a later admission must review the actual adaptation and start at `reviewed`. Qualitative assessments below are not catalog ratings.

### 1. Mechanic prototype decision workflow

**Identity:** [prototype-fast](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/19d93f97c9c1ea0f8b306e77aa81e0d3e352d3e9/skills/workflows/prototype-fast/SKILL.md). Reviewed repository HEAD `19d93f97c9c1ea0f8b306e77aa81e0d3e352d3e9`; last directory commit `3727d02499efac5d4703ccdc5e59e54e60e954b7` (August 8).

**Inspection:** complete entrypoint, root Apache-2.0 license and NOTICE. The directory has one payload file. Sibling engine/game-jam skills are referenced as companions; their code and workflows were not reviewed as part of this candidate.

**Distinct job:** turn an uncertain mechanic into a small playable experiment and a keep/change/stop decision. Its strongest details are an explicit question, minimal implementation, question-specific instrumentation and stopping criteria. It fills the gap between `mmorpg-design`'s proposal and implementation planning's production work.

**Fit:** high usefulness within game projects, moderate usefulness across the overall catalog; strong portability as a manual workflow; moderate novelty beyond native planning because it organizes learning rather than feature completion.

**Adaptation needed:** do not prescribe a universal hour-long budget, require every game to prove itself in thirty seconds, require an outside participant before useful work can proceed, or make rewriting every successful prototype mandatory. Preserve existing code when appropriate and distinguish reusable experiments from disposable spikes. Art, audio or social context may be the variable under test, so greyboxing everything is conditional.

**Admission path:** adapted workflow, independent prose with immutable inspiration. Preserve Apache license/NOTICE requirements if upstream expression or code is reused. No timer service, participant recruitment, engine change or sibling-skill installation is required by the proposed method. Next: write and review a bounded brief-to-prototype-to-decision procedure before adding another general design framework.

### 2. Level blockout and encounter design

**Identity:** [level-design](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/19d93f97c9c1ea0f8b306e77aa81e0d3e352d3e9/skills/disciplines/level-design/SKILL.md). Last directory commit `5dea243846da81e60129210bdd2cb73c68fc6a20` (October 24), distinct from reviewed HEAD above.

**Inspection:** complete entrypoint and `references/pacing-and-flow.md`; root license and NOTICE. Reviewed the idealized jump formulas and key/ability reachability model, but did not compile or execute engine code. The source appropriately warns that measured controller behavior can differ from the ideal arc and that its simple gate model assumes non-consumable capabilities.

**Distinct job:** relate geometry to movement metrics, block out space, expose teaching/encounter beats, inspect gates, then observe traversal before dressing. Especially relevant to MapleStory-like platform maps, although a repeatable farming map needs different objectives from an authored single-pass level.

**Fit:** strong domain usefulness, clear operational detail, high conceptual portability, meaningful novelty beyond `frontend-design`, `human-interface-design` and `mmorpg-design`. It addresses playable space, not screen layout or whole-world progression.

**Adaptation needed:** retain measured traversal, topology and cheap iteration; avoid imposing a rising sawtooth, mandatory safe introduction or boss climax on every game. Use player capability ranges, camera, failure/recovery and accessibility constraints. Do not silently freeze controller design before discovery is complete. Numerical safety margins are experiment settings, not universal fairness guarantees.

**Admission path:** adapted skill with conceptual guidance; engine examples optional and verified separately against the target version. Same Apache/NOTICE boundary as above. Next: author a compact blockout-review method and optional platform-map reference; test the latter on an actual controller/map when a suitable project is available.

### 3. Readable gameplay feedback and game feel

**Identity:** [game-feel](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/19d93f97c9c1ea0f8b306e77aa81e0d3e352d3e9/skills/disciplines/game-feel/SKILL.md). Last directory commit `1b71e6315900d9a4729fa4c0bb40f24052caa24b` (October 24).

**Inspection:** complete entrypoint and `references/feedback-recipes.md`, root license and NOTICE. Inspected technical examples as source; no runtime validation. Checked shared time-scale semantics against [Godot Engine documentation](https://docs.godotengine.org/en/stable/classes/class_engine.html) and [Unity Time.timeScale documentation](https://docs.unity3d.com/6000.0/Documentation/ScriptReference/Time-timeScale.html).

**Distinct job:** make an existing action legible and satisfying through proportionate feedback, consistent importance tiers, transient effects, input responsiveness and reduced-effects options. This complements MMORPG incentives and interface design without importing an engine tutorial.

**Technical limitations:** the Unity hit-stop coroutine restores global time scale without overlap ownership, despite the prose warning about overlapping effects. Both showcased engines restore a literal `1`, which can override another system's slow motion or pause. Global time manipulation is especially unsuitable as an unexplained default for multiplayer. These are source-level findings, not executed reproductions. Examples should not be vendored unchanged.

**Adaptation needed:** focus on event clarity, anticipation, response and recovery; do not require every action to stack five to eight effects or reject linear motion categorically. Keep visual feedback separate from collision/simulation. Make camera motion, flashing, overlap and lifecycle cleanup explicit decisions. A functioning input loop and appropriate restraint can matter more than additional effects.

**Admission path:** independently authored conceptual skill; exclude the flawed snippets. If later shipping engine helpers, verify concurrency, cancellation, pre-existing time state and scene transitions first. High domain fit and portability, moderate novelty, mixed quality in unchanged upstream examples. Next: author the bounded method before considering executable recipes.

## Review next

### Data-backed balance review: strongest specialist follow-up

**Identity:** [Donchitos balance-check](https://github.com/Donchitos/Claude-Code-Game-Studios/blob/05ad7c8a5b8aa2aa86bbd3439ae7cf7295cac418/.claude/skills/balance-check/SKILL.md), HEAD and last directory commit `05ad7c8a5b8aa2aa86bbd3439ae7cf7295cac418`. Complete entrypoint and root MIT license read; also read [playtest-report](https://github.com/Donchitos/Claude-Code-Game-Studios/blob/05ad7c8a5b8aa2aa86bbd3439ae7cf7295cac418/.claude/skills/playtest-report/SKILL.md).

Useful distinctions include explicit data sources, intended targets, observed values and a real “not assessed” outcome when inputs are missing. Domain checks cover combat, economy, progression and loot. This is a more concrete complement to `mmorpg-design` than another broad list of theory names.

**Not ready as a standalone copy:** the entry executes a YAML configuration helper through Claude-specific dynamic shell syntax, reads studio-wide automation policy, relies on registry/GDD paths and routes to sibling workflows. The reporting workflow can spawn a director reviewer in full mode. Those required helper/config/gate resources remain unread and unexecuted. Large repository popularity does not clear their runtime review.

The balance logic also needs revision: a resource loop without a sink is not intrinsically a critical defect in every game; out-of-range data do not establish actual player outcomes; “strictly better” requires context and comparable costs. Loot analysis needs acquisition distributions and recovery, not expected time alone.

**Provisional fit:** strong usefulness for data-bearing game projects, moderate portability of unchanged payload, good novelty relative to native prose critique. **Next:** inspect helper and policy closure for a linked studio option, or author an independent data-and-target-based balance workflow without the framework runtime. Do not inherit its fixed directory layout or automatic agent review.

### BMad playtest planning: separate human research from production ceremony

**Identity:** [gds-playtest-plan](https://github.com/bmad-code-org/bmad-module-game-dev-studio/blob/ff8870955203e1665f4bf75a64049078e6d4080c/src/workflows/gametest/gds-playtest-plan/SKILL.md), reviewed HEAD and last directory commit `ff8870955203e1665f4bf75a64049078e6d4080c`.

Read the entrypoint, `customize.toml`, game-dev knowledge `playtesting.md`, quick-dev entrypoint and root MIT license with trademark notice. The API license label was NOASSERTION; the actual file identifies MIT. The playtest checklist, template, remaining step files and customization resolver remain unreviewed.

Strong parts: explicit decision objectives, participant criteria, observation and intervention guidance, timestamped notes and issue synthesis. Weak parts: the knowledge file suggests arbitrary frequency thresholds such as three reports or fifty percent; a severe single failure can matter more than a repeated preference, and a small convenience sample cannot establish population prevalence. Config-driven activation and fixed checkpoints add overhead.

**Overlap:** `moderated-usability-study`, `synthesize-research` and `evidence-to-flow-ux` already cover much of this method. **Next:** review the missing closure, then decide whether a small optional game-playtest reference on an existing study method is sufficient. No evidence yet justifies a whole studio plugin or duplicate general study skill. Moderate novelty and lower unchanged portability than the focused adaptations.

### Sascha Becker's cross-game pattern library

**Identity:** [game-design](https://github.com/saschb2b/skills/blob/31a6a1364b73ff24f388f9e35c6e3ccd9baa7d89/skills/productivity/game-design/SKILL.md), HEAD `31a6a1364b73ff24f388f9e35c6e3ccd9baa7d89`; last directory commit `5fe23350bcbe5f101e5dbb2f72864f105962470c`.

Read complete entrypoint, integration guide and root MIT license; read selected pattern-catalog and systems/economy sections. The broader reference closure and linked OKF knowledge framework are not fully reviewed. The bundle contains useful comparisons of loadout budgets, inventory constraints, feedback and reward systems, with a more considered stance than many generic theory prompts.

However, it also prescribes a concept-bundle lifecycle, mandatory design-first consultation and optional project rules/hooks. Its input-randomness preference, single-verb emphasis and horizontal-progression stance may fit some games better than MMORPGs. Some pattern examples and accessibility claims need primary-source checking. The keyword reminder hook was read as text, never installed.

**Next:** inspect the remaining reference closure and verify selected examples before proposing a linked alternative or a small pattern-analysis adaptation. Existing `mmorpg-design`, `human-interface-design` and domain decision methods overlap. Do not install concept scaffolds or auto-consultation hooks as a side effect of research or skill copying.

### OpenAI Game Studio: browser execution companion

**Identity:** [game-playtest](https://github.com/openai/plugins/blob/0722921d5542fc593105c27bd52630babd8b8c2a/plugins/game-studio/skills/game-playtest/SKILL.md), reviewed repository HEAD `0722921d5542fc593105c27bd52630babd8b8c2a`.

Read game-playtest, umbrella game-studio, playtest checklist and plugin manifest. Strong browser-specific checks include canvas screenshots, input/menu handoffs, viewport changes, recovery and render-layer issues missed by DOM assertions. This complements human playtests; automation does not establish human enjoyment.

Required sibling references, engine paths and scripts are not fully reviewed. The manifest declares MIT, but an applicable LICENSE text was not found among the inspected plugin/root license paths. Do not infer redistribution permission from the manifest alone. Existing `webapp-testing`, browser tools and interface review overlap substantially; the incremental value is game-specific visual/state inspection.

**Next:** resolve license and reference closure before proposing a linked option. Keep the Phaser/Three.js defaults within browser-game scope; do not use the router to switch an existing engine. No installation or current-host availability claim is made.

## Watch / hold / skip

| Candidate | Disposition and reason | What would reopen it |
| --- | --- | --- |
| [Gamedev RPG skill](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/19d93f97c9c1ea0f8b306e77aa81e0d3e352d3e9/skills/genres/rpg/SKILL.md) | Skip unchanged as a design addition. Main file and formula/quest reference read; useful implementation sketch, but broad “must-have” systems and “safe defaults” overlap ordinary engine/model knowledge. Not every RPG requires its complete checklist. | A demonstrated project need for verified stat modifiers, quest state or save contracts; review its sibling composition then |
| [Omer game-design-core](https://github.com/omer-metin/skills-for-antigravity/blob/e8dcf4e8737921a10088bd5c9eb65e81f74c051f/skills/game-design-core/SKILL.md) | Hold unchanged. Main file read; invented expert biography, universal thirty-second-fun and no-tutorial claims, reference-as-truth language and instructions to correct user preferences are poor fit. Three required references and actual license text unread. | Complete reference/license review and substantive upstream scope corrections; popularity alone is insufficient |
| [Sickn33 game-development/game-design](https://github.com/sickn33/agentic-awesome-skills/blob/753c5f7bb64650b7d3ac0ab84d9b24892d7aed8b/skills/game-development/game-design/SKILL.md) | Skip as a new theory skill. Complete file read; mostly generic loops, GDD and motivation tables. Its current thirty-second and player-type caveats are better than hard rules, but novelty is low. LICENSE-CONTENT distinguishes prose from MIT code; upstream exceptions remain unresolved. | A specific missing method plus original-source/provenance and license review, rather than whole-library star counts |
| [indieshade game-design-analysis](https://github.com/indieshade/game-design-analysis-skill/blob/1a0851c6dffdad6d3eca67df93cc5e861ab92056/SKILL.md) | Hold. Complete entrypoint read; referenced `frameworks.md` is absent from the four-file tree. Mandatory frameworks and cross-domain theory quotas encourage ceremonial analysis. | Ship missing resource and replace universal output quotas with decision-relevant reasoning; inspect actual license text |
| [GitHub Awesome Copilot game-engine](https://github.com/github/awesome-copilot/blob/b6483db44fb602654bca6a097185fcaddb305f97/skills/game-engine/SKILL.md) | Review later for web implementation, not game design. Entry read; assets/references/license not reviewed. The reference list names `terminology.md`, absent from the inspected subtree. | Verify closure and engine examples if a web-game implementation gap emerges |
| [OpenAI develop-web-game registry entry](https://www.skills.sh/openai/skills/develop-web-game) | Source unresolved. Registry shows 1.1K installations and a small-step browser-test loop, but the current untruncated OpenAI skills tree at `49f948faa9258a0c61caceaf225e179651397431` has no matching path. | Resolve historical pin or maintained replacement and inspect full scripts/license; do not vendor cached registry text |
| [Jord game-development](https://www.skills.sh/jord-jd/jord-skills/game-development) | Source unavailable: GitHub API returned 404. Registry text alone does not establish current packaging or rights. | Reachable maintainer source and exact artifact |
| Omer combat-design, progression-systems, level-design, card/board-game-design | Watch as focused leads from the complete relevant-path inventory; payloads not read. | Inspect only a concrete gap after stronger candidates; verify actual file-specific rights |
| [Awesome Cursor Rules Unity rule](https://github.com/PatrickJS/awesome-cursorrules/blob/b044f956f021b6e8877f16781bcfc466a6a120e9/rules/unity-cursor-ai-c-cursorrules-prompt-file.mdc) | Inventory lead only. Engine coding rules are adjacent to this design request. | User need for Unity implementation conventions and a complete source/version review |

## Revisit existing entries

- **mmorpg-design:** retain its focused role. The candidates complement it with prototypes, playable space and feedback; none supplies a better reviewed persistent-world replacement. If balance work is later admitted, keep data analysis distinct from design hypotheses rather than enlarging this skill into a studio router.
- **moderated-usability-study / synthesize-research / evidence-to-flow-ux:** reuse these for real-player evidence and synthesis. A game-specific observation reference may be enough; do not turn agent-controlled gameplay into participant evidence.
- **human-interface-design / frontend-design / webapp-testing:** retain their current roles. A game HUD, canvas or controller task may benefit from specialist checks, but no source pin or rating change is proposed by this survey.

## Changes since baseline

Added a dedicated game-design research queue after admitting `mmorpg-design`; it is existing coverage, not a candidate awaiting addition. Identified three narrowly scoped adaptation proposals and dependency-heavy alternatives. Recorded the Sickn33 rename, content-license distinction, a missing analysis reference, browser-source availability gaps and concrete feedback-example risks.

Earlier unrelated frontend, UI/UX, infrastructure and runtime holds remain unchanged. The [prior scout](2026-10-29-catalog-scout.md), [frontend admission record](2026-10-28-design-admission.md) and [decisions](../decisions.md) retain their status. Source review and popularity do not resolve those findings. No game-specific prior hold was silently promoted.

## Top priorities

1. **Prepare mechanic prototyping for admission.** Highest immediate value: it converts an idea into evidence without requiring a production framework. Adapt the rigid timing/rewrite rules.
2. **Prepare level design for admission.** Adds measured space, topology and encounter iteration missing from the catalog; especially useful alongside our MapleStory investigation.
3. **Prepare conceptual game feel for admission.** Strong visible demand and a clear job, but omit unverified helpers and universal effect recipes.
4. **Research a data-backed balance workflow.** Prefer Donchitos's target/data/not-assessed distinction to generic theory. Resolve runtime closure or independently author the method before admission.
5. **Evaluate the smallest playtesting addition.** Compare a game-specific extension to our existing study method with BMad human-playtest planning and OpenAI browser QA. They answer different questions; neither justifies adopting a whole studio by default.

Items 1–3 are adaptation recommendations. Items 4–5 require more source work or an explicit authoring proposal. All would need review of their concrete deliverables before admission, and any new entry starts at evidence level `reviewed`.
