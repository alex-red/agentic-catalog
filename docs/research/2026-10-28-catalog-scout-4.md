# Popular skill collections: discovery and review

## Scope and baseline

**As of / researched:** October 28, 2026, America/Edmonton. This is live research into popular upstream skill libraries, focused bundles, and workflow frameworks beyond project initialization. It reviews source samples and packaging, not installed agent behavior. No upstream installers, scripts, hooks, binaries, or agent workflows were executed.

Baseline: [October 27 scout](2026-10-27-catalog-scout.md), [initialization comparison](2026-10-28-catalog-scout-3.md), `PLAN.md`, `CONTRIBUTING.md`, and [decisions 19–32](../decisions.md). The lightweight `project-initialization` collection and `repo-research` skill are now existing coverage. The catalog currently has 56 entries and five collections; this research preserves the earlier uncommitted admission work.

**Overall judgment:** Matt Pocock remains the strongest general-purpose source for our composable approach. Impeccable is the most interesting additional frontend workflow to trial. Trail of Bits is the strongest specialist security source in this sample. Addy Osmani and wshobson have useful material, but the inspected examples contain concrete correctness problems. Popularity does not justify admitting or installing their entire libraries.

## Coverage and popularity observations

### What can actually be ranked

[skills.sh packs](https://www.skills.sh/packs) are unlisted collections shared by URL; there is no public pack leaderboard available to sample. The [FAQ](https://www.skills.sh/docs/faq) says the public skill leaderboard uses aggregate CLI installation telemetry. Therefore this survey uses GitHub repository stars for library attention and separately records skills.sh skill-install totals. Neither measures active users, representative adoption, task success, or the quality of an entire bundle.

Attempted current GitHub repository/HEAD/tree lookup for **24 repositories**. Sixteen returned complete, untruncated inventories; eight encountered API rate limits. Read-only raw source fetching remained available for the pinned successful results. Primary web pages resolved two renamed repositories. The [companion snapshot](2026-10-28-popular-collections-sources.json) records exact revisions, observations, errors, inventory counts, downloaded files, and the smaller inspection scope.

Discovery sampled the skills.sh all-time, Trending (24h), and Hot views; six repository detail URLs; rules corpora; specialist maintainers; and searches for popular libraries and workflow bundles. Addy's and wshobson's registry detail pages failed to load. This is a purposeful sample rather than a complete popularity census. Directory articles and community posts were leads only; shortlisted claims use upstream sources.

| Library | GitHub stars observed October 28 | Scope | Review verdict |
| --- | ---: | --- | --- |
| [Superpowers](https://github.com/obra/superpowers) | 307,433 | Enforced engineering method | Already cataloged; alternative to a small collection |
| [Matt Pocock](https://github.com/mattpocock/skills) | 305,755 | Composable engineering and productivity | Prefer selected skills; substantial existing coverage |
| [ECC](https://github.com/affaan-m/ECC) | 291,754 | Broad skills, hooks, memory and harness system | Keep full-runtime hold |
| [Anthropic](https://github.com/anthropics/skills) | 184,517 | Technical, creative and document skills | Select by job and file-specific rights; check installed host skills first |
| [Addy Osmani](https://github.com/addyosmani/agent-skills) | 111,466 | Engineering lifecycle library | Hold inspected simplification skill; review shared-resource packaging |
| [Impeccable](https://github.com/pbakaus/impeccable) | 92,623 | Frontend design and iteration | High-priority trial after engine/runtime inspection |
| [Composio](https://github.com/ComposioHQ/awesome-claude-skills) | 78,198 | Broad curated skills/integrations | Discovery source; provenance and dependencies need individual review |
| [Corey Haines](https://github.com/coreyhaines31/marketingskills) | 57,128 | Marketing and growth workflows | Optional product-marketing direction; outside the core coding baseline |
| [wshobson](https://github.com/wshobson/agents) | 41,939 | Modular plugins, agents and skills | Hold inspected Python testing skill; do not generalize package size into quality |
| [Awesome Cursor Rules](https://github.com/PatrickJS/awesome-cursorrules) | 41,042 | Rules corpus | Source of scoped leads, not a coherent install-everything bundle |
| [Awesome Copilot](https://github.com/github/awesome-copilot) | 40,516 | Skills, instructions, agents and plugins | Select exact artifacts; Markdown accessibility is already covered |
| [VoltAgent directory](https://github.com/VoltAgent/awesome-agent-skills) | 36,518 | Discovery index | Trace links to original maintainers; directory stars do not transfer to entries |
| [Vercel](https://github.com/vercel-labs/agent-skills) | 33,167 | React, composition, deployment and UI guidance | React guidance already cataloged; retain remote-instruction exclusion |
| [Trail of Bits](https://github.com/trailofbits/skills) | 7,867 | Security analysis and testing | Prefer focused security workflows over a marketplace-wide installation |
| [Anthony Fu](https://github.com/antfu/skills) | 6,019 | Vue/Vite ecosystem guidance | Strong stack fit; check exact versions and references |
| [Cloudflare](https://github.com/cloudflare/skills) | 3,198 | Cloudflare platform expertise | Workers already covered; retain unresolved specialist holds |

These are whole-repository counts from the API snapshot, not per-skill adoption. Dates and stars are independent observations; no velocity ranking is inferred from same-day differences.

Separate [registry observations](https://www.skills.sh/mattpocock/skills): Matt's page displayed **30.5M total installs** and a 55-skills header; [Impeccable](https://www.skills.sh/pbakaus/impeccable) displayed **1.9M** and 24; [marketing skills](https://www.skills.sh/coreyhaines31/marketingskills) **5.9M** and 72; [Trail of Bits](https://www.skills.sh/trailofbits/skills) **428.0K** and 105. Preserve those rounded display values: the lists also contain old names and do not equal a pinned source inventory. Bundled installs cannot be treated as unique users or added to stars to calculate a quality score.

## Recommend adding

**No new whole upstream library is ready for admission from this sampled review.** The useful near-term additions are two small catalog collections assembled from already admitted entries. These are proposals, not new YAML files or claims of measured effectiveness.

1. **Frontend quality:** `react-best-practices`, `webapp-testing`, `ux-critique`, and `verification-before-completion`. A coherent sequence for React performance guidance, observable browser behavior, evidence-grounded critique, and final verification. Prefer it to importing another full lifecycle framework. Disclose Python Playwright/server prerequisites, the critique entry's complete KB/license packaging, and native-browser overlap. For non-React projects, choose the matching stack skill instead of installing React guidance. The host's existing frontend-design skill can supply creation; a duplicate catalog copy is unnecessary here.
2. **Focused security review:** `security-threat-model`, `secret-serialization`, and `variant-analysis`. These cover system trust boundaries, a narrow credential-leak mechanism, and expansion from a known bug. They are selectable methods, not three mandatory scans for every diff: secret serialization needs an appropriate object/sink context; variant analysis needs a seed defect. The linked Trail of Bits component retains its CC-BY-SA and complete-resource requirements. Automated scanners, service connections, and security hooks remain separate choices.

The members' existing source and packaging reviews govern these proposals; this pass checked their metadata and overlap rather than repeating every vendored-source audit. Neither new collection needs a future placeholder entry. No new individual skill is recommended for admission solely from the bundle samples below.

## Review next: shortlisted library records

### 1. Impeccable — differentiated frontend workflow, larger runtime than its name suggests

**Identity:** `pbakaus/impeccable`, snapshot `5e745ace7e151feb2a93d360d0281fe39448b857`; [.agents skill](https://github.com/pbakaus/impeccable/blob/5e745ace7e151feb2a93d360d0281fe39448b857/.agents/skills/impeccable/SKILL.md). Signals: 92,623 repository stars; registry 1.9M total installs. HEAD date October 28.

**Inspection:** full skill entrypoint, full shell launcher and package manifest; selected audit/critique reference sections; root license identification. Other playbooks, engine implementation, browser integration, agent configurations and release assets remain unreviewed. Downloaded references were not all read.

**Fit:** high usefulness for UI teams; strong task-specific vocabulary and routing; moderate portability until the runtime is tested; substantial novelty in coordinated refinement and live variants. Existing `ux-critique`, `webapp-testing`, browser tools and the supplied frontend-design skill cover much of critique/building. The distinct candidate is its integrated design workflow, not another generic design prompt.

**Dependencies/effects:** root Apache-2.0 identified; third-party notice and engine/dependency audit outstanding. Startup invokes a binary through a launcher that can download a versioned release and verify a local checksum manifest. It also accepts overrides, installed binaries and PATH candidates. This is executable runtime setup, not a Markdown-only skill. Hooks, project context and design files add further effects. A documented manual-context fallback prevents launcher failure from inherently blocking design work.

**Verdict:** first new bundle to trial, as a linked option after reviewing engine source/release provenance, required context directives and enabled integrations. Verify an ordinary refinement, a critique, and a live-variant session in a disposable project. Audit/heuristic scores and simulated personas are expert judgments, not accessibility certification or evidence from real users. Do not reject it merely for a pinned binary download, or silently install that runtime while calling it source review.

### 2. Matt Pocock — best composable source, mostly existing coverage

**Identity:** `mattpocock/skills`, snapshot `59db609eb1e18aaf59b63284d0e52255aff0c63c`; [README](https://github.com/mattpocock/skills/blob/59db609eb1e18aaf59b63284d0e52255aff0c63c/README.md). Signals: 305,755 stars; registry 30.5M total installs. HEAD date October 27.

**Inspection:** current README installation/setup/engineering sections and full root MIT license; prior complete source reviews remain applicable to admitted `grilling`, `diagnosing-bugs`, `handoff`, and `domain-modeling`. This is not a renewed audit of all 55 registry-listed skills.

**Fit:** high usefulness and portability for selected complete subtrees; good compositional design; low additional novelty for already covered jobs. The full package has setup conventions for trackers, labels and document storage, plus orchestration skills with sibling dependencies. Its popularity is not permission to enable those conventions.

**Verdict:** keep using selected entries. Review `research`, `codebase-design`, and the architecture orchestration separately if a concrete gap remains after `repo-research`; preserve the earlier architecture dependency hold. A whole-library plugin would duplicate several installed catalog skills. Prefer one distribution route, and distinguish tracker-writing orchestration from reusable analysis. Linked whole bundle or unchanged complete MIT subtrees remain possible after exact-path inspection.

### 3. Trail of Bits — strongest specialist source, still inspect the exact workflow

**Identity:** `trailofbits/skills`, snapshot `2be6433b39e009cd2b6fd3be1895f6b1faa5af9a`; [sharp-edges](https://github.com/trailofbits/skills/blob/2be6433b39e009cd2b6fd3be1895f6b1faa5af9a/plugins/sharp-edges/skills/sharp-edges/SKILL.md). Signals: 7,867 stars; registry 428.0K total installs. HEAD date October 28.

**Inspection:** sharp-edges entrypoint, analyzer agent and plugin manifest; reference inventory and root license identification. Category and language references were downloaded but not re-reviewed in full; the entrypoint does not stand in for those resources.

**Fit:** high value for security-relevant API/configuration design; strong misuse-resistance framing beyond `security-threat-model` and `secret-serialization`; good process portability with host-specific agent packaging. Novelty is substantial for the specific footgun-analysis job. Existing `property-based-testing` and `variant-analysis` already supply useful members of a security/testing collection.

**Verdict:** retain the earlier sharp-edges review queue, with explicit remaining reference/example inspection. Root CC-BY-SA-4.0 favors linking under catalog policy. Its skill permits only read/search tools while describing reproduction and mitigation tests; the read-only analyzer instead asks for a described minimal example. Resolve the intended execution handoff before promising autonomous validation. No new scanner or whole marketplace installation is recommended.

### 4. Marketing Skills — useful product context, optional expansion beyond coding

**Identity:** `coreyhaines31/marketingskills`, snapshot `0cd9b3a0ef4c411a1d690419ce843f2a1da32cce`; [product-marketing](https://github.com/coreyhaines31/marketingskills/blob/0cd9b3a0ef4c411a1d690419ce843f2a1da32cce/skills/product-marketing/SKILL.md). Signals: 57,128 stars; registry 5.9M total installs. HEAD date October 27.

**Inspection:** product-marketing entrypoint and brand-voice reference, plugin manifest and root MIT license; README collaboration/sponsorship/tool-setup sections. CRO files were downloaded but not fully inspected. Other skills, tool registry, partner policies, scheduled loops and account integrations remain outside review.

**Fit:** high value for marketing-led products, moderate for coding projects generally; good use of evidence-backed brand attributes and a versioned shared context document. Portability is high for the isolated document workflow; novelty overlaps `domain-modeling` and `grilling` but owns audience, positioning and proof rather than engineering terms. It writes `.agents/product-marketing.md` and can maintain approved learning records.

**Verdict:** review a narrow product-marketing/copy/CRO subset if we expand product-growth coverage. The brand-voice reference credits another MIT source; inspect its actual license/notice ancestry before copying. Prefer a linked proposal if packaging rights remain incomplete. Do not install the complete integration catalog, paid tools, outbound messaging or scheduled learning loops as a side effect. Sponsorship disclosure is a review input, not evidence of biased recommendations or of their neutrality.

### 5. Anthony Fu — select for the actual frontend stack

**Identity:** `antfu/skills`, snapshot `8886fe2d385d3644cbb47e46ae9cb1cf09307d3b`; [Vite entrypoint](https://github.com/antfu/skills/blob/8886fe2d385d3644cbb47e46ae9cb1cf09307d3b/skills/vite/SKILL.md). Signals: 6,019 stars. HEAD date October 23; the skill itself says generated September 25 against Vite 8.3.1.

**Inspection:** full Vite entrypoint and inventory; required references and applicable license files not newly reviewed. API's MIT label is not a completed license audit.

**Fit/verdict:** high stack-specific usefulness, moderate novelty over current official docs and existing Vue skills, portable Markdown core. Useful for a future Vue/Vite collection after checking six references against supported project versions. Its TypeScript/ESM preferences do not override consumer conventions. Preserve the previous Vitest beta-target and Vue testing-example holds; generated timestamps are maintenance signals, not behavioral evidence. No new admission recommendation yet.

## Watch / hold / skip

### Addy Osmani — hold simplification; review complete resource packaging

**Identity:** `addyosmani/agent-skills`, snapshot `aeac41d4d005999432bb7312f7ff06383a91d59d`; [code-simplification](https://github.com/addyosmani/agent-skills/blob/aeac41d4d005999432bb7312f7ff06383a91d59d/skills/code-simplification/SKILL.md). Signals: 111,466 stars; HEAD October 13. Read the complete simplification and meta-skill entrypoints, root MIT license, plugin manifests, and README packaging sections. Shared definition-of-done reference, hooks, commands, remaining skills and copied-source ancestry were not audited.

The process is clear and useful for an explicitly requested refactor, but examples conflict with its exact-behavior requirement: a reducer returning an object of `{count}` records is replaced by a Map of numeric values. Consumers see a different interface and serialization. Removing an async wrapper also changes how a synchronous exception becomes a rejected promise unless the callee's contract rules that case out. These are source-level counterexamples, not an upstream test run.

The README acknowledges isolated skill copies omit repository-root checklists; the meta-skill requires such a definition-of-done reference. It also imposes broad always-applicable behaviors and a lifecycle sequence that overlap host defaults, `focused-changes`, `verification-before-completion`, and `project-initialization`. Usefulness is potentially high, quality mixed in this sample, portability conditional, and novelty moderate. **Hold verbatim simplification admission** until corrected; inspect closure before any linked whole-framework proposal. One flawed sample does not establish that every sibling skill is poor.

### wshobson — hold the inspected Python testing skill

**Identity:** `wshobson/agents`, snapshot `0874a27b17a22e2b7c2e2bcd725768e0803cad06`; [Python testing](https://github.com/wshobson/agents/blob/0874a27b17a22e2b7c2e2bcd725768e0803cad06/plugins/python-development/skills/python-testing-patterns/SKILL.md). Signals: 41,939 stars; HEAD October 17. Read the complete skill and both testing references, root MIT license, and README host/evaluation sections. Other Python skills, agents and installer adapters remain unreviewed.

Concrete defects: the email predicate accepts `@example.com` although its accompanying test expects false. The async example uses `@pytest.fixture` without setting auto mode; [pytest-asyncio documents](https://pytest-asyncio.readthedocs.io/en/stable/concepts.html) that strict mode processes async fixtures decorated with `@pytest_asyncio.fixture`. The sorted-list properties check length, set equality and ordering, which can miss changed multiplicities: `[1,1,2]` and `[1,2,2]` satisfy those three comparisons. CI examples also warrant a separate current-action/version pass.

Usefulness is broad, quality mixed in this sample, portability depends on choosing skills-only versus generated plugin adapters, novelty is modest against existing TDD/property-testing guidance. **Hold this skill unchanged.** Prefer the existing property-testing entry for test-design depth; do not infer marketplace-wide quality from the single sample. The README correctly distinguishes static checks and experimental model judges from task success; preserve that distinction.

### Other screened libraries and retained holds

- **Vercel**, snapshot `1a2c79d4e6c4a2283dc2c614b6538cbe1ed5ca62`: complete composition and web-design entrypoints inspected; composition references remain unread and licensing remains incomplete. React performance is already linked. [Web-design-guidelines](https://github.com/vercel-labs/agent-skills/blob/1a2c79d4e6c4a2283dc2c614b6538cbe1ed5ca62/skills/web-design-guidelines/SKILL.md) still fetches instructions from a moving `main` URL before each review: **retain exclusion**. Ordinary version-specific documentation lookup is a different activity. Review composition as a React-only alternative, not a universal UI library.
- **Anthropic**, snapshot `ca45fc496a3436251f191354091d557da31c15b5`: README and contrasting frontend/docx license material inspected. The repo explicitly distinguishes open examples from source-available document skills; do not apply one license to the entire library. Existing `webapp-testing` and linked `mcp-builder` cover part of it, and this host already supplies frontend and document capabilities. **Select by actual missing job**, with complete source and rights review before a copy.
- **ECC**, unchanged inspected snapshot `25278e7d7b6cf6e6a4e7a6c8e10f14ff22f0eb5b`: keep the [earlier research/runtime hold](2026-10-28-catalog-scout-3.md#watch--hold--skip). No renewed full source review here. Its large star count does not clear the retry-example, memory capture, background-model-call or hook-activation questions.
- **Agentic Awesome Skills:** the [old Antigravity URL redirects](https://github.com/sickn33/antigravity-awesome-skills) to `sickn33/agentic-awesome-skills`; primary page displays about 48.7K stars. The current README presents a local control plane with CLI/MCP/catalog/plugins, beyond a set of prompts. **Discovery/runtime review only**: API pin and full closure unavailable after rate limiting. Do not substitute a fork for the canonical source.
- **Scientific Agent Skills:** the [old K-Dense URL redirects](https://github.com/K-Dense-AI/claude-scientific-skills) to `K-Dense-AI/scientific-agent-skills`; primary page displays about 55.1K stars. **Specialist watch**: no current full pin, payload or scientific-validation review. Its claimed scientist count and validated-skill description are author claims, not independently verified adoption or outcomes. Not a default coding collection.
- **Composio, VoltAgent, Awesome Copilot and Awesome Cursor Rules:** metadata/inventory or directory-level screens only; no new whole-library approval. Exact artifacts need provenance, applicable licensing and dependency review. Their curation and repository stars do not validate every linked/copied component.
- **Rate-limited specialist sources:** Sentry, Supabase, HashiCorp, Expo, Microsoft and BMAD did not yield renewed API snapshots in this run. Prior counts are not presented as today's observations. Prior SQL, Terraform, Django licensing, Durable Objects, Vue testing, Planning with Files, architecture and other unresolved holds remain in the [October 27 queue](2026-10-27-catalog-scout.md) and [initialization review](2026-10-28-catalog-scout-3.md).

## Revisit existing entries

- **superpowers:** current HEAD matches the earlier initialization snapshot; use that source review and its unresolved full-runtime scope rather than claiming a new audit. Keep as the full-method alternative to our lightweight collection, not another mandatory layer.
- **compound-engineering:** preserve the earlier changed-bundle review queue and the standalone repo-analyst review that informed `repo-research`. No new pin or source update proposed.
- **grilling / diagnosing-bugs / handoff / domain-modeling:** already admitted Matt components; do not re-add them under popular aliases. Inspect actual path changes before repinning.
- **react-best-practices / webapp-testing / ux-critique:** compose a scoped frontend-quality collection with complete install prerequisites; avoid a second copy of host frontend-design. A collection does not resolve existing linked packaging limitations.
- **security-threat-model / secret-serialization / variant-analysis / property-based-testing:** existing coverage supports focused security and testing selections now. Extra scanners or sharp-edges remain separate source reviews.

Current [Claude Code guidance](https://code.claude.com/docs/en/best-practices) and this session's supplied capabilities confirm significant native exploration, review, skill routing, browser and artifact overlap. More generic workflow text is not automatically an improvement. Installation size is also not the same as prompt context: skills can load progressively, while bootstrap instructions and hooks may have broader session effects.

## Changes since baseline

- Broadened discovery from project initialization to general engineering, frontend design, security, marketing, stack expertise, and scientific workflows.
- Added current popularity observations with separate repository/CLI units and explicit public-pack discoverability limits.
- Recorded concrete Addy/wshobson example defects instead of ranking them solely by popularity or claimed production readiness.
- Identified Impeccable's binary-launcher and context/runtime scope; it deserves a focused trial, not treatment as a small Markdown-only design pack.
- Resolved two renamed source URLs; no old counts or copied forks were substituted for current canonical evidence.
- Removed repo-research and project-initialization from the candidate queue after decision 32; carried unrelated holds forward explicitly.

## Top priorities

1. **Collection proposal: frontend quality using four existing entries.** The most immediately usable additional grouping, with performance, runtime evidence and critique serving distinct jobs.
2. **Research priority: complete Impeccable engine/context review and trial it.** The most differentiated new frontend bundle in the inspected sample; compare it against the existing host skill plus ux-critique before admission.
3. **Collection proposal: focused security review using three existing entries.** Useful distinct methods with explicit conditional activation, rather than installing an entire security marketplace.
4. **Research priority: finish Trail of Bits sharp-edges reference and validation-handoff review.** A clearer catalog gap than another generic reviewer or broad engineering lifecycle bundle.
5. **Research priority: inspect a small marketing subset if product-growth coverage is wanted.** Start with product context and draft-only copy/CRO work; resolve ancestry and integration scope first. Otherwise prioritize exact-stack Vite/composition guidance.

No new collection or entry is admitted by this report. No ratings, source pins, generated catalog files, hook registrations, connections, recurring runs or consumer installations change. No behavioral evaluations, paid model calls, actual UI audits, security tests or installation trials were performed. File inspection and repository checks do not establish that a bundle improves outcomes.

Repository verification: `bun run check` passed type checking, Markdown lint, validation of 56 entries and five collections, generated-index consistency, and all 96 tests. Local fixture servers ran with the required sandbox permission. `git diff --check` also passed.
