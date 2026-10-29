# Vue, React, and Bun skills: source review

## Scope and baseline

**As of and researched:** October 28, 2026, America/Edmonton. Live, focused research into portable skills and workflows for Vue, React, and Bun. This is source inspection, not an agent outcome evaluation. No upstream installer, hook, scanner, generation script, or skill workflow was executed.

Baseline: [October 27 scout](2026-10-27-catalog-scout.md), [popular collections review](2026-10-28-catalog-scout-4.md), `PLAN.md`, `CONTRIBUTING.md`, and [decisions 20 and 32–34](../decisions.md). The catalog has 58 entries and seven collections. Existing coverage includes `react-best-practices`, `create-adaptable-composable`, `webapp-testing`, `ux-critique`, `verification-before-completion`, and `frontend-quality`. The host also supplies `frontend-design` and `vue-skilld`. Preserve all earlier uncommitted admissions.

**Judgment:** Vercel remains the strongest existing React performance reference in this sample. Vue benefits from one selected core guide, with project conventions and installed versions taking precedence. Anthony Fu offers a compact Vue reference; vuejs-ai offers a more prescriptive engineering workflow; skilld offers version-specific API context. These are alternatives, not three layers to install together. Bun's best immediate baseline is its current official documentation: the inspected community skills have material gaps. Elysia's official skill is a promising specialist for Elysia projects, with unresolved version and licensing questions.

## Coverage and observations

Downloaded complete file inventories at eight full repository HEADs. Closely inspected selected artifacts across these repositories; scope varies deliberately. The [source snapshot](2026-10-28-frontend-scout-sources.json) records full revisions, exact files read, excerpts sampled, inventories, unread scope, redirects, and popularity observations. HEAD is a discovery snapshot, **not** the last commit touching each candidate path; resolve that separately at admission.

Discovery sampled upstream GitHub searches, skills.sh repository pages, related-project links, and framework documentation. Leads included Vue core, Router, Pinia, Vue testing, Vite, Vitest, React performance/composition, React Doctor's three public workflows, Bun initialization/migration/testing/development, and Elysia. Nuxt, VueUse, React Native, view transitions, and the remaining Bun build/deploy skills were screened as adjacent jobs, not fully reviewed. JetBrains' directory was a discovery lead, not independent validation of copied artifacts. This is not an exhaustive ecosystem census.

### Popularity is a separate signal

Primary skills.sh pages displayed these rounded aggregate CLI install counts when accessed October 28:

| Source | Selected skill counts | Page freshness caveat |
| --- | --- | --- |
| [Vercel](https://www.skills.sh/vercel-labs/agent-skills) | React performance 849.3K; composition 424.8K | Page marked crawled today |
| [vuejs-ai](https://www.skills.sh/vuejs-ai/skills) | Core 42.8K; Router 15.0K; testing 13.7K | Page marked crawled two days ago |
| [Anthony Fu](https://www.skills.sh/antfu/skills) | Vitest 44.1K; Vite 40.1K; Vue 35.9K; Pinia 19.8K | Page marked crawled two days ago |
| [React Doctor](https://www.skills.sh/millionco/react-doctor) | Doctor 15.8K; improve-react 2.3K | Page marked crawled three weeks ago |
| [Bun Skills](https://www.skills.sh/daleseo/bun-skills) | Testing 224; migration 43; initialization 39 | Page marked crawled three weeks ago |
| [Vue ecosystem skills](https://www.skills.sh/skilld-dev/vue-ecosystem-skills) | vue-skilld 325 | Page marked crawled three weeks ago |

The [registry FAQ](https://www.skills.sh/docs/faq) describes CLI installation telemetry. These observations are cached page displays, not guaranteed live counters, unique users, comparative quality, or task success. Search snippets returned different Vue counts; the opened primary page is the recorded observation. No growth claim or composite popularity score is made. No new GitHub star ranking was needed; the previous report preserves its dated observations.

## Recommend adding

**No new upstream skill is recommended for admission unchanged from this pass.** That does not mean none is useful. Several are strong references with explicit preferences, but duplicate installed coverage, have unresolved required resources, or contain examples we should not endorse as defaults.

The useful outcome is a narrower selection policy:

| Project | Preferred starting set | Add only for a concrete need |
| --- | --- | --- |
| Vue application | One version-matched Vue core guide; existing composable skill for reusable input APIs | Router/Pinia specialist after correcting the findings below; browser testing where DOM behavior matters |
| React application | Existing Vercel performance entry plus verification | Independent component-architecture guidance; measured profiling for an actual slow interaction |
| Bun project | Current official docs plus existing repo research and verification workflows | A focused workflow separating package management, runtime, bundling, and test-runner migration |

These are research recommendations, not new collection files or automatic installations. Qualitative assessments below are provisional curator judgments, not catalog ratings or behavioral evidence.

## Review next

### Vue core: choose an approach rather than stacking bundles

**Anthony Fu — compact reference.** [Exact Vue artifact](https://github.com/antfu/skills/tree/8886fe2d385d3644cbb47e46ae9cb1cf09307d3b/skills/vue), reviewed HEAD `8886fe2d385d3644cbb47e46ae9cb1cf09307d3b`. Read the entire entrypoint, all three references, generation record, and actual root `LICENSE.md` (MIT). No runtime script is required to consume the static skill. Its Vue 3.5 scope, cleanup-before-await example, macros and built-ins make it the most compact core candidate inspected.

Its unconditional Composition API preference and discouragement of reactive props destructuring are author preferences. They conflict with skilld's preference for destructuring; neither should override a project's style. The generic `useFetch` example lacks stale-response suppression, unlike its watcher cleanup example. Useful and portable; novelty is modest against official docs and the installed Vue skill. **Review as an explicit alternative**, not an additional mandatory layer. Admission would require deciding which project types benefit enough to justify another core entry.

**vuejs-ai — engineering workflow.** [Exact core artifact](https://github.com/vuejs-ai/skills/tree/198f0cd8f7f9c0a3d9b566ccc16de6677519ee78/skills/vue-best-practices), HEAD `198f0cd8f7f9c0a3d9b566ccc16de6677519ee78`. Read the entrypoint and sampled reactivity/composables examples; remaining required SFC/data-flow and optional references are not fully reviewed. Actual root license is MIT. No required runtime was identified in the inspected material.

Its strongest value is explicit ownership, cleanup, focused public contracts, and behavior-preserving decomposition. It appropriately preserves Options API when the project requires it and scales boundary planning down for local fixes. However, it requires four core references for every Vue task and labels primitive `ref()` usage incorrect in favor of unconditional `shallowRef()` for performance. That claim lacks linked measurement; official Vue docs use primitive `ref()` normally. Broad trigger and mandatory context have overhead. **Finish closure and assess trigger cost before admission**; prefer narrow composable coverage for a small task.

**skilld — targeted release context.** The old Harlan URL redirects to [skilld-dev/vue-ecosystem-skills](https://github.com/skilld-dev/vue-ecosystem-skills/tree/c60d4ccc466a8ca2694cbb089fdd3b3d97b78961/skills/vue-skilld), HEAD `c60d4ccc466a8ca2694cbb089fdd3b3d97b78961`. Read README, MIT license, entrypoint and all four local references. The reviewed artifact targets Vue `3.6.0-beta.17`, while the installed host copy targets `3.6.0-beta.10` and was generated April 20. Neither should be assumed to describe today's installed project version.

Good: beta/RC event-delegation changes are distinguished and linked. Caveats: entrypoint example uses `computed()` without importing it; the API-changes reference claims cleanup callbacks cannot be used from nested helpers, an overstatement because the callback can be passed to helpers. [Official cleanup documentation](https://vuejs.org/api/reactivity-core.html#onwatchercleanup) makes the synchronous registration constraint decisive. The package-source line citations are author assertions; the prepared package is not included in this review. **Use version-matched references when needed; no duplicate global installation or automatic host update.** Sync scripts and the rest of the ecosystem collection remain unreviewed.

### React runtime profiling: promising separately from Doctor triage

[React Doctor performance skill](https://github.com/millionco/react-doctor/blob/84ad0c8d0df7a3ab7d26946367fae3bc39c100d0/skills/performance/SKILL.md), HEAD `84ad0c8d0df7a3ab7d26946367fae3bc39c100d0`. Full standalone entrypoint read, along with package manifest, root license and telemetry gate; instrument initialization sampled. No supporting files within this skill directory. It emphasizes production builds, a reproducible interaction, browser versus React costs, capture limitations, local traces, and comparable before/after measurements. This is more useful than treating a scanner score as user experience.

It requires the React Doctor executable, supported Node, interactive terminal, Chrome/CDP, and runtime instrumentation. The command uses `@latest`. Source inspection found telemetry enabled by default except documented opt-outs/tests; `--no-telemetry` or `REACT_DOCTOR_NO_TELEMETRY` gates it. Scanner, capture and telemetry closure remain unread. The actual license is **Modified MIT**, with restrictions on ML training/evaluation and specified commercial offerings; it is not ordinary MIT. Existing browser tools and `chrome-devtools-mcp` overlap, while React-aware measurements may add value. **Review next as a linked specialist**, with pinned executable/version, explicit data behavior and a capability comparison. Do not run an evaluation or redistribute under an assumed permissive license.

### Elysia: the best specialist Bun lead in this sample

[Official Elysia skill](https://github.com/elysiajs/skills/tree/1466d85aa4f2a0fec91f71311e65bbfa91aa7dc5/elysia), HEAD `1466d85aa4f2a0fec91f71311e65bbfa91aa7dc5`. Read entrypoint, metadata, versions, testing and migration references; runtime integration sampled. Remaining references are unread. No license file appears in the 27-file inventory, so any proposal is **linked**, pending terms review.

Excellent fit for Elysia API authors: preserve project versions, keep route types, test rejection paths without opening ports, distinguish shared/request state, and preserve framework-owned serving. [Current official v2 docs](https://next.elysiajs.com/table-of-content/) explicitly recommend matching skill and project versions. But the entrypoint targets RC.0+, while `versions.md` and install examples still target beta.32; its reviewed source working tree included uncommitted changes and is explicitly not reproducible from the named source commit. **Resolve the RC/beta baseline and inspect remaining references before admission.** This is Elysia guidance, not a reason to migrate an arbitrary Bun project to Elysia.

## Watch / hold / skip

### Vite: full static read improves confidence, but reveals contradictions

[Anthony Fu Vite](https://github.com/antfu/skills/tree/8886fe2d385d3644cbb47e46ae9cb1cf09307d3b/skills/vite). Read entrypoint, all six references, generation metadata, MIT license. This clears the previous unread-reference gap. Its Vite 8/Rolldown/Oxc and Environment API material fills a real cross-framework tooling gap, with no required runtime beyond the user's Vite project.

Hold unchanged: `core-config.md` says `customResolver` was removed, while `rolldown-migration.md` and [official migration docs](https://vite.dev/guide/migration#other-related-deprecations) say deprecated. The `@` alias points to filesystem `/src`, not an absolute path derived from the consumer project; [official alias docs](https://vite.dev/config/shared-options#resolve-alias) require appropriate filesystem paths. A framework Vite override example needs peer/support checks. These are fixable issues in an otherwise valuable reference. **First tooling review priority after an upstream correction or independently authored replacement.** Do not edit a vendored copy.

### Vue Router and Pinia: specialist knowledge needs example repair

**Router:** [vuejs-ai artifact](https://github.com/vuejs-ai/skills/tree/198f0cd8f7f9c0a3d9b566ccc16de6677519ee78/skills/vue-router-best-practices), MIT. Entrypoint plus three references read. Useful same-component reuse and per-route guard warnings. However, its same-route execution flow puts `beforeRouteUpdate` before global `beforeEach`; [official flow](https://router.vuejs.org/guide/advanced/navigation-guards.html#the-full-navigation-resolution-flow) puts global `beforeEach` first. Calling `next()` categorically deprecated overstates the docs, which retain the optional argument. Route-fetch examples also lack stale-result suppression. **Hold unchanged; remaining five references unread.** High usefulness, mixed inspected quality, portable static format, modest novelty beyond official docs.

**Pinia:** [Anthony Fu artifact](https://github.com/antfu/skills/tree/8886fe2d385d3644cbb47e46ae9cb1cf09307d3b/skills/pinia), MIT. Entrypoint and testing/outside-component/SSR references read. Good fresh-per-test instances and setup-action stubbing caveat. SSR example uses callable default `devalue` and then `JSON.parse` for hydration: current [devalue](https://github.com/sveltejs/devalue#usage) distinguishes JavaScript expressions from its paired stringify/parse format. The shown server/client pair is not a valid general round trip. **Hold unchanged; remaining references and Pinia 4 version claims need review.** vuejs-ai's Pinia entrypoint and method-binding reference were also read, but the full sibling is not approved.

**Vue testing:** [same vuejs-ai revision](https://github.com/vuejs-ai/skills/tree/198f0cd8f7f9c0a3d9b566ccc16de6677519ee78/skills/vue-testing-best-practices). Prior hold now reconfirmed against the offending examples: MSW v1 `rest`/`req,res,ctx`, removed `poolOptions`, and `restoreAllMocks()` used for fake-timer teardown. See [MSW migration](https://mswjs.io/docs/migrations/1.x-to-2.x/), [Vitest 4 migration](https://v4.vitest.dev/guide/migration), and the explicit real-timer teardown in Anthony Fu's newer mocking guide. **Carry decision 20's hold.** Useful testing topics do not make every setup example current.

**Vitest:** [Anthony Fu artifact](https://github.com/antfu/skills/tree/8886fe2d385d3644cbb47e46ae9cb1cf09307d3b/skills/vitest), MIT. Entrypoint and two mocking/vi references read; many required topic references unread. Clear version labels and `useRealTimers()` cleanup improve on the held Vue testing material. Target is explicitly `5.1.0-beta.1`; v5 APIs must not leak into earlier projects. **Review next only for a matching version**, after remaining references and consequential APIs are checked.

### React composition: useful architecture, overbroad API rules

[Vercel composition](https://github.com/vercel-labs/agent-skills/tree/1a2c79d4e6c4a2283dc2c614b6538cbe1ed5ca62/skills/composition-patterns), HEAD `1a2c79d4e6c4a2283dc2c614b6538cbe1ed5ca62`. Read entrypoint, README, metadata, all eight substantive rules and rule scaffolding. Compiled `AGENTS.md` remains unread. MIT is declared but no actual license file was found; **linked only**, no copying/adaptation rights inferred.

The architecture job is valuable and distinct from the existing performance entry: explicit variants, shared state contracts and flexible children. It correctly acknowledges data-providing render props as legitimate. However, labeling React 19 `useContext()` incorrect is a preference, not an API requirement: [React still documents it](https://react.dev/reference/react/useContext). React 19-only `use(Context)` and provider shorthand also appear in architecture examples outside the explicitly gated React 19 section. Nullable contexts are destructured without a missing-provider check or type narrowing. **Hold unchanged as a universal architecture default**; prefer independently authored, version-aware guidance grounded in official React docs, or an upstream revision fixing these examples.

### React Doctor triage and improve-react: remote instruction policy

The current [Doctor skill](https://github.com/millionco/react-doctor/blob/84ad0c8d0df7a3ab7d26946367fae3bc39c100d0/skills/react-doctor/SKILL.md) requires fetching a changing canonical playbook and per-rule instruction URLs. `improve-react` likewise requires current remote rule recipes in the sampled entrypoint. This is unpinned remote **instruction** loading, unlike ordinary documentation lookup. **Exclude those workflows under existing catalog policy.** Do not generalize that exclusion to the separate performance skill or claim the underlying scanner is unusable. Supporting files/runtime and the modified license would still need review for other uses.

### Bun collections: avoid automatic broad migrations

**daleseo/bun-skills**, HEAD `10ac42f094a52dcbe15febb4992f381dd1f0b60d`: read README, actual MIT license, complete `bun-init`, `node-to-bun`, `bun-test` entrypoints and testing mocking reference. Remaining resources/skills unread.

- Migration deletes npm/Yarn/pnpm lockfiles before installing, discarding inputs Bun can migrate. It still calls `bun.lockb` the generated default. [Official docs](https://bun.com/docs/pm/lockfile) describe text `bun.lock` and automatic migration.
- Its backup branch does not preserve uncommitted work, and fallback `git reset --hard HEAD~1` is not a generally valid rollback. Changing runtime, runner and bundler together makes diagnosis harder.
- Initialization ignores the old lockfile and its library build does not request declaration output despite declaration settings plus `noEmit`. Web setup assumes React even though the trigger includes Vue.
- Testing sets `coverageThreshold = 80` rather than the documented fractional value and uses an undocumented HTML reporter command. [Coverage docs](https://bun.com/docs/test/code-coverage) show fractions and text/LCOV output. The mocking guide replaces global fetch without restoring it; module-mock lifetime is not explained.
- Blanket speed ratios have no reproducible workload evidence in the inspected material.

**Hold the inspected three skills unchanged.** Their focused job boundaries are useful, but breadth and permissive licensing do not clear these defects. No conclusion about the five unread siblings.

**Community bun-development**, now [sickn33/agentic-awesome-skills](https://github.com/sickn33/agentic-awesome-skills/tree/e9809578fd426a284af017c5db99f8eb6628e6ca/skills/bun-development), HEAD `e9809578fd426a284af017c5db99f8eb6628e6ca`: read entrypoint, full detailed guide and both root license files; searched attribution index. Improvements over older advice include preserving lockfiles, measuring speed, inspecting installers, and separating runner compatibility. Yet it calls `bunx` execution “without installing,” treats `bun build` as shorthand for a package script despite the built-in command collision, and still shows obsolete project-creation advice. Novelty over current docs is limited. Written content is CC BY 4.0 by default, tooling MIT, subject to upstream exceptions; **linked only if reconsidered**, not MIT vendoring. Hold pending technical and attribution review; do not inherit its entire control-plane runtime.

## Revisit existing entries

- **react-best-practices:** retain as the best existing React performance reference in this sample. Current entrypoint and selected rules inspected at Vercel HEAD above; the remainder was not re-reviewed. The Effect Event dependency rule matches [current React docs](https://react.dev/reference/react/useEffectEvent), and request-local state guidance is useful. The deferred-value example memoizes filtering but does not establish that a costly child can skip the urgent render; [official guidance](https://react.dev/reference/react/useDeferredValue) discusses the slow subtree boundary. Before repinning, inspect the complete changed rules, React Compiler applicability, version requirements, and actual license state. A newer repository HEAD is not automatic approval.
- **create-adaptable-composable:** retain its narrow role. Existing vendored files must remain unchanged. Check installed core guidance before adding it to a consumer project; substantial API overlap is explicit.
- **frontend-quality:** retain as an optional React-oriented selection. Do not append every Vue/Bun guide to this collection. Existing browser/design capabilities cover part of UI validation; they do not themselves supply framework-specific state or migration contracts.
- **Installed vue-skilld:** upstream version differs, but research does not authorize replacing the host installation. A later refresh needs the project's exact version and review of changed references.

## Changes since baseline

Resolved Anthony Fu's actual root license location: `LICENSE.md` is MIT. Completed all Vite references and all compact Vue references, revealing concrete preferences and Vite contradictions rather than assuming generated freshness establishes correctness. Reconfirmed the Vue testing blockers; added Router execution-order and Pinia hydration findings. Completed composition rule reading and identified React version/type limitations. Discovered separate React Doctor profiling versus remote-triage behavior, modified licensing and telemetry gating. Added focused Bun migration/testing and official Elysia research. Confirmed the skilld and AAS repository redirects.

Bun's current docs add a particularly important freshness check: [initialization](https://bun.com/docs/runtime/templating/init) can generate agent instruction files, while [bundling](https://bun.com/docs/bundler) documents `--check` and `--dts`. “Bun only transpiles” is not a complete account of current capabilities. Ordinary execution still does not substitute for the project's type check; select commands supported by the installed version. Do not activate generated instructions or replace an established Vue/Vite pipeline merely because Bun is the package manager.

Other holds from the [earlier collections review](2026-10-28-catalog-scout-4.md) remain open, including Impeccable runtime review and Vercel web-design remote instruction loading. No unrelated holds were reopened. Bun template source paths guessed during fetching returned 404; no pinned template review is claimed. No representative end-to-end trials or independent usage outcomes were available in this pass.

## Top priorities

1. **Bun migration and verification workflow — authoring priority.** Write an original, small workflow from current official docs: select package-manager/runtime/bundler/test scope independently, preserve migration inputs, check lifecycle trust and versions, validate representative behavior, and provide a rollback preserving local changes. This fills a gap better than admitting either inspected migration guide unchanged.
2. **Vite build and migration guidance — upstream correction priority.** Strongest cross-stack tooling fit after fixing the identified examples; six-reference closure is now inspected. Recheck the corrected revision rather than editing a vendored copy.
3. **Vue core selection — overlap decision.** Prefer Anthony Fu for compact reference, vuejs-ai for an explicit engineering workflow after closure review, or skilld for exact release questions. Pick one per project and preserve conventions. Avoid a global pile of overlapping triggers.
4. **React component architecture — independent implementation or upstream repair.** Keep the useful composition ideas, but respect React versions, valid `useContext`, provider boundaries and nullable context types. Complement the existing performance entry rather than replacing it.
5. **Elysia v2 specialist — targeted follow-up.** Resolve RC/beta and rights questions, finish source closure and validate against a published version before proposing a linked entry. React Doctor profiling is the next specialist after that, subject to runtime/data/license review.

These are ranked research/authoring actions, not five admission-ready entries. Admission, installation, new collections and ratings remain separate authorized work.
