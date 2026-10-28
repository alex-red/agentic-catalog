# Catalog scout — October 27, 2026

## Scope and baseline

**As of:** 2026-10-27. **Research date/timezone:** 2026-10-27, America/Edmonton. This is a live, sampled survey for catalog maintainers, not admission, installation, or behavioral evaluation. The active catalog contains 41 entries and four collections. No entries, ratings, upstream pins, integrations, or generated indexes changed in this run.

Baseline: the [October research queue](../research-2026-10.md), [UX critique research](../user-critique-research-2026-10.md), current source metadata under `entries/`, and [decisions 19–27](../decisions.md). Later admission decisions supersede earlier candidate lists: handoff, secret serialization, Workers best practices, adaptable Vue composables, property-based testing, variant analysis, Ponytail, and UX critique are already represented. The two new local maintainer skills are tooling for this checkout, not product entries.

The clearest remaining opportunities are domain vocabulary and decision capture, scoped documentation accessibility, specialized security reviews, and infrastructure testing. This run favors distinct jobs over another broad planning, browser, or code-review bundle.

## Coverage and observations

Screened **30 candidate artifacts or narrowly named capabilities**, with closer source inspection of ten: domain-modeling, Markdown accessibility, architecture improvement, Terraform testing, Durable Objects, web-perf, Actions security review, sharp-edges, and the two Node security rules. Inspection depth varies and is stated below. Downloaded files were not automatically considered reviewed.

Coverage included:

- [skills.sh all-time](https://www.skills.sh/): sampled the first 30 displayed ranks, including collapsed bundle rows; [trending](https://www.skills.sh/trending): sampled displayed ranks through 50; [hot](https://www.skills.sh/hot): sampled the first 20 displayed ranks. Some intervening ranks were grouped rather than individually inspected.
- GitHub metadata and complete, non-truncated recursive file inventories for 15 repositories, with 69 initial source/license downloads and 18 targeted follow-up downloads. All requests were read-only. Raw file downloads were pinned; no upstream code, installers, hooks, agent workflows, infrastructure, or API examples were executed.
- Sampled HashiCorp, Trail of Bits, Sentry, Cloudflare, and web-quality sections of [VoltAgent's directory](https://github.com/VoltAgent/awesome-agent-skills), plus accessibility/security/review leads in [awesome-cursorrules](https://github.com/PatrickJS/awesome-cursorrules). Directory assertions were treated as leads, not adoption evidence.
- Broader web queries: `new agent skills rules October 2026 GitHub testing security database official` and `site:github.com agent skills accessibility instructions migrations October 2026`. Followed Exa's [October 26 release](https://github.com/exa-labs/agent-skills/releases/tag/v2026.10.26-aa6d5e6) and new hot-list leads including tstack and Ultracite.
- Current primary documentation for Terraform tests/mocking, Cloudflare D1 commands and Durable Object namespaces, GitHub Actions security, and W3C accessibility. For host overlap, compared current catalog source metadata and the skills/tools supplied in this session. This was not an exhaustive audit of every host distribution or plugin marketplace.

Popularity figures below were checked on the research date. [skills.sh describes its ranking](https://www.skills.sh/docs/faq) as aggregated installation telemetry from its CLI; installs do not establish unique users, active usage, task success, or independent adoption. Counts, stars, and maintenance remain separate signals. No growth rates are inferred from rounded figures in the older report.

| Observation | Displayed signal | Interpretation |
| --- | --- | --- |
| find-skills | 4.1M all-time installs | Already covered; discovery popularity is not a new catalog gap |
| grill-me; improve-codebase-architecture; domain-modeling | 1.4M; 1.2M; 895.2K all-time installs | Trace exact artifacts: a command alias or workflow is not necessarily the standalone skill we should ship |
| handoff | 1.1M all-time installs | Already admitted; do not rediscover it as a new addition |
| ui-taste | 30.3K in the view labelled Trending (24h) | A current lead; source/licensing and optional paid integration still need review |
| hyperframes-cli | 1.3M all-time; 20.9K trending | Strong channel visibility; video tooling remains a distinct, lower-priority catalog expansion |
| tstack council; Ultracite | Hot displays `20 +19` and `20 +19` | Preserve the displayed units; no independently verified time-window or velocity claim |

These observations come from the linked leaderboard views and the [ui-taste](https://www.skills.sh/site/uizze.sh/ui-taste) and [HyperFrames CLI](https://www.skills.sh/heygen-com/hyperframes/hyperframes-cli) detail pages. Detail-page and leaderboard totals were not synchronized; rounded counts can differ.

The [source snapshot](2026-10-27-catalog-scout-sources.json) records exact repository stars, full reviewed snapshot commits, commit dates, and inventory completeness. Snapshot commits were selected at or before `2026-10-28T03:38:27Z` (October 27 locally); popularity pages were read subsequently during this run. These are repository snapshots, **not proposed catalog pins**: admission must resolve the last commit touching each artifact's path.

| Repository | Stars observed | Snapshot commit date (UTC) |
| --- | --- | --- |
| mattpocock/skills | 304,979 | 2026-10-27 |
| github/awesome-copilot | 40,479 | 2026-10-27 |
| PatrickJS/awesome-cursorrules | 41,028 | 2026-05-30 |
| VoltAgent/awesome-agent-skills | 36,472 | 2026-10-27 |
| OthmanAdi/planning-with-files | 27,719 | 2026-10-24 |
| trailofbits/skills | 7,848 | 2026-10-27 |
| antfu/skills | 6,017 | 2026-10-23 |
| expo/skills | 3,326 | 2026-10-26 |
| cloudflare/skills | 3,192 | 2026-10-15 |
| vuejs-ai/skills | 3,192 | 2026-10-23 |
| supabase/agent-skills | 2,941 | 2026-10-02 |
| getsentry/skills | 1,092 | 2026-10-23 |
| hashicorp/agent-skills | 910 | 2026-09-28 |
| lirantal/agent-rules | 65 | 2026-10-27 |
| exa-labs/agent-skills | 63 | 2026-10-26 |

## Recommend adding

Only two candidates cleared this pass's source-inspection bar. These are recommendations to prepare entries, not admission approval or ratings.

| Rank | Candidate | Gap and differentiation | Proposed mode |
| --- | --- | --- | --- |
| 1 | [Domain modeling](https://github.com/mattpocock/skills/tree/59db609eb1e18aaf59b63284d0e52255aff0c63c/skills/engineering/domain-modeling) | Maintain precise domain terminology and capture consequential decisions without adopting a full methodology | Vendored, MIT |
| 2 | [Markdown accessibility guidance](https://github.com/github/awesome-copilot/blob/98b45a78d3ed316e78f005b60594d5c4a50588e3/instructions/markdown-accessibility.instructions.md) | Scoped documentation review beyond generic lint and UI critique | Adapted portable rule, with MIT source attribution |

### 1. Domain modeling

**Identity:** `mattpocock/skills`, `skills/engineering/domain-modeling`, skill. Reviewed snapshot: `59db609eb1e18aaf59b63284d0e52255aff0c63c`. Signals: 304,979 repository stars and 895.2K displayed all-time skill installs; neither is outcome evidence.

**Inspection:** Read all four files in the skill directory: `SKILL.md`, `ADR-FORMAT.md`, `GLOSSARY-FORMAT.md`, and `agents/openai.yaml`, plus the actual root [MIT license](https://github.com/mattpocock/skills/blob/59db609eb1e18aaf59b63284d0e52255aff0c63c/LICENSE). The inventory shows no scripts or additional files in this subtree. No sibling skill is required. Its glossary map is created only for multiple contexts; ADRs are offered only for consequential, non-obvious tradeoffs.

**Fit:** Usefulness is strongest in ambiguous business domains; quality is good because it distinguishes vocabulary from implementation notes and avoids filling out ADR forms unnecessarily. Portability is high: Markdown plus ordinary file reads/writes, with optional host display metadata. Novelty is moderate: ordinary models can write glossaries and ADRs, while this skill provides a repeatable discipline for reconciling language against code. `grilling` asks design questions, `handoff` preserves session continuity, and `explore-plan-implement-review` organizes implementation; none owns this precise glossary-maintenance job. No named equivalent appears in this session's supplied skill list, though consumer installations must still be checked.

**Admission path and effects:** Vendor the complete subtree unchanged with the root license as `LICENSE.txt`. Disclose its chosen `GLOSSARY.md`, `GLOSSARY-MAP.md`, and `docs/adr/` conventions and inline glossary writes; an existing project's document conventions still govern. It offers ADRs rather than treating an interview as blanket permission for every artifact. No hooks, services, commands, or runtime package are bundled.

**Decision:** Recommend preparing an entry at evidence level `reviewed`. Resolve the path-specific pin and record honest overlap and write behavior at admission. This does not justify adopting Matt's architecture workflow or the entire skill collection.

### 2. Markdown accessibility

**Identity:** `github/awesome-copilot`, `instructions/markdown-accessibility.instructions.md`, scoped instruction/rule. Reviewed snapshot: `98b45a78d3ed316e78f005b60594d5c4a50588e3`. Signal: 40,479 repository stars; no artifact-level installation or usage figure verified.

**Inspection:** Read the complete instruction file and actual root [MIT license](https://github.com/github/awesome-copilot/blob/98b45a78d3ed316e78f005b60594d5c4a50588e3/LICENSE). It contains no scripts or required local resources. Checked the decorative-image exception and heading rationale against [W3C images guidance](https://www.w3.org/WAI/tutorials/images/decorative/) and [heading guidance](https://www.w3.org/WAI/tutorials/page-structure/headings/). These checks do not turn every source preference into a normative accessibility requirement.

**Fit:** Usefulness is broad for documentation-heavy projects; quality is good because it explains user impact and preserves author voice. Portability needs adaptation: `applyTo: '**/*.md'` is a Copilot wrapper, not a portable activation mechanism. Novelty is moderate: Markdown lint covers some structure, but does not establish whether links are meaningful out of context, alt text describes the visual, or instructions depend only on visual cues. `ux-critique` concerns interface critique; `verification-evidence` concerns runtime checks. Neither is this scoped documentation rule.

**Admission path and effects:** Author a concise `RULE.md` with cited inspiration, preserving the source's meaningful distinctions. Keep decorative empty alt text valid, account for generated page titles, and present the one-H1 preference as a project convention rather than a universal WCAG condition. Document activation appropriate to each host without changing a consumer's rules implicitly. No external service, package, hook, or file outside the entry is required. Preserve attribution if reusing source expression.

**Decision:** Recommend preparing an adapted rule, initially `reviewed`; the proposed payload has not been written or evaluated. Prefer this bounded rule over importing a broad reviewer persona or silently relabelling a Copilot instruction as a portable skill.

## Review next

These candidates have concrete value, but outstanding inspection or technical blockers prevent an addition recommendation.

### GitHub Actions security review — finish technical and scope review

[Artifact](https://github.com/getsentry/skills/tree/d12f250460ffd961f549dbebf7eeb0cf4afd4c2e/skills/gha-security-review): `getsentry/skills`, `skills/gha-security-review`, snapshot `d12f250460ffd961f549dbebf7eeb0cf4afd4c2e`. Signal: 1,092 repository stars; artifact adoption unverified. Read the complete entrypoint and selected portions of permissions/secrets and supply-chain references; inventoried all ten subtree files. The remaining reference content and applicable attribution scope are outstanding, so no full bundle-review claim is made.

The exploitation-path requirement is useful and distinct from `gh-fix-ci` (repair) and `security-threat-model` (system design); generic host review remains overlap. Usefulness and novelty look strong for repositories with privileged workflows, quality is provisional, and portability is limited by Claude-style tools and the chosen threat model. Its external-attacker scope, first-party version-tag exemption, and blanket descriptions of some expression contexts as safe must be understood as bounded policy/analysis choices, not universal assurances. Current [GitHub security documentation](https://docs.github.com/en/actions/how-tos/secure-your-work) also includes dependency-lockfile workflows, which deserve comparison with the skill's pinning policy.

**Next:** Read every remaining required reference and license/attribution file, check indirect attacker-controlled code paths and the tool/side-effect boundary, and propose a narrow catalog summary. The root declares Apache-2.0; vendoring is only provisional until the whole subtree's applicable terms are resolved. Do not execute exploit examples or change workflow files during scouting.

### Sharp edges — review the whole package and analyzer dependency

[Artifact](https://github.com/trailofbits/skills/tree/bf23bfb21f10a2a4b0406086d690dc8cb1b3ccf3/plugins/sharp-edges/skills/sharp-edges): `trailofbits/skills`, `plugins/sharp-edges/skills/sharp-edges`, snapshot `bf23bfb21f10a2a4b0406086d690dc8cb1b3ccf3`. Signal: 7,848 repository stars; artifact adoption unverified. Read the entrypoint and plugin manifest, inventoried 19 skill-subtree files, and checked the root license identity as CC-BY-SA-4.0. Downloading the language references did not constitute reading them; the named `sharp-edges-analyzer` agent outside the subtree also needs inspection.

Useful differentiation: misuse-resistant API and configuration design, rather than finding another instance of a known bug (`variant-analysis`) or writing a system threat model. Quality and portability remain provisional because of assertive design prescriptions, technical examples, optional analyzer packaging, and required reference review. Novelty looks meaningful for libraries and security-sensitive APIs.

**Next:** Read the complete applicable references and analyzer definition, check example accuracy, and decide whether to link the plugin or the self-contained skill. Under current catalog policy, the CC-BY-SA source points toward linking, not vendoring. No analyzer was invoked and no behavioral benefit was measured.

### Durable Objects — repair or resolve an ancillary reference error

[Artifact](https://github.com/cloudflare/skills/tree/86505e44f87d801aa1864a3c4109e9a8ae5c409f/skills/durable-objects): `cloudflare/skills`, `skills/durable-objects`, snapshot `86505e44f87d801aa1864a3c4109e9a8ae5c409f`. Signal: 3,192 repository stars; artifact adoption unverified. Read all four skill files (`SKILL.md`, `references/rules.md`, `references/testing.md`, `references/workers.md`) and the actual Apache-2.0 root license. No script or subtree license/notice file appears in the inventory.

The coordination boundaries, durable-state guidance, and version-aware test routing have clear value beyond `workers-best-practices` and live-doc lookup through `context7`. Usefulness is specialized, novelty moderate, portability good for supported Workers projects, and quality mixed. The Workers reference labels a `wrangler d1 execute ... SELECT * FROM _cf_DO` example as listing Durable Objects. Current [D1 command documentation](https://developers.cloudflare.com/d1/wrangler-commands/) describes SQL against the selected D1 database, not Durable Object enumeration. This is a source/documentation discrepancy, not a runtime failure reproduced here. It also contains deploy and secret-setting examples, which are not authorized by copying the skill.

**Next:** Verify or correct that example upstream, then re-review the corrected pin; alternatively consider an independently authored narrower adaptation. Do not silently patch a vendored copy. Keep the plugin's remote MCP configuration outside any skill-only proposal. This specialist follow-up remains promising but is not ready for verbatim admission.

### Architecture improvement — linked workflow, with explicit sibling closure

[Artifact](https://github.com/mattpocock/skills/tree/59db609eb1e18aaf59b63284d0e52255aff0c63c/skills/engineering/improve-codebase-architecture): snapshot `59db609eb1e18aaf59b63284d0e52255aff0c63c`, 304,979 repository stars and 1.2M displayed all-time installs. Read the complete entrypoint and inventoried its three files; the HTML scaffold and full sibling-skill closure remain unread.

It invokes `codebase-design`, `grilling`, and `domain-modeling`, delegates exploration, creates a temporary HTML report, and loads presentation libraries from CDNs. These are substantial workflow and packaging requirements. Existing `grilling` and `explore-plan-implement-review` overlap, while deep-module selection is the plausible distinction. Usefulness is promising, quality unconfirmed beyond the entrypoint, portability lower than a standalone prompt, and novelty moderate. MIT root license verified, but that does not make a three-file copy complete.

**Next:** Review the scaffold, all required sibling resources, host invocation fallbacks, and authority to open generated reports. Preserve the prior linked-workflow disposition; do not promote it merely because its leaderboard rank is high.

## Watch / hold / skip

### Holds with source findings

- **Terraform testing — strengthened hold.** [Source](https://github.com/hashicorp/agent-skills/tree/f706481af9b8fedb66de909f6243ad29601afa0c/plugins/terraform/skills/terraform-test), full snapshot `f706481af9b8fedb66de909f6243ad29601afa0c`; 910 repository stars. Read the entrypoint and all three references; checked the root MPL-2.0 license identity. Its `-filter` examples describe filtering run names or naming categories, while the [CLI reference](https://developer.hashicorp.com/terraform/cli/commands/test) defines test-file filtering. Its mock reference says mocks cannot be used with apply, contradicted by [HashiCorp's provider-mocking documentation](https://developer.hashicorp.com/terraform/language/tests/mocking), which describes both plan and apply operations. The advertised `-no-cleanup` option also needs verification against the intended CLI version. No Terraform binary, provider, or infrastructure was run. The testing gap remains real, beyond generic TDD and property tests, but correctness is not ready for a recommendation. MPL points toward a linked entry under catalog policy once corrected; a link is not a reason to endorse known bad examples. Resolve those examples before admission.
- **Supabase Postgres — prior hold remains.** [Snapshot](https://github.com/supabase/agent-skills/tree/c9be0e931b7930f7d02126d04774d904c381e7d7/skills/supabase-postgres-best-practices), full commit `c9be0e931b7930f7d02126d04774d904c381e7d7`; 2,941 stars. Inspected the entrypoint and selected EXPLAIN/RLS examples, not the entire 36-file subtree. The blanket sequential-scan heuristic remains in `monitor-explain-analyze.md`; the role/isolation examples still need representative execution. No database test was performed, and this report does not claim the examples were fixed. Keep the [earlier SQL verification tasks](../research-2026-10.md) open. MIT is a possible future vendoring path after complete review; `context7` overlaps documentation retrieval but not a verified SQL checklist.
- **Node filesystem/process rules — prior hold confirmed.** [Filesystem](https://github.com/lirantal/agent-rules/blob/3943392447ff7767cb85073f79fdda83bced0657/__template__/nodejs/secure-code/file-system.md) and [process](https://github.com/lirantal/agent-rules/blob/3943392447ff7767cb85073f79fdda83bced0657/__template__/nodejs/secure-code/child-process.md), full snapshot `3943392447ff7767cb85073f79fdda83bced0657`; 65 stars. Read both complete templates. The prefix-only containment recommendation still accepts `/srv/uploads-other/secret.txt` under a `/srv/uploads` prefix check; reproduced with our own small local path-resolution probe, without running upstream code. The process template still prohibits `exec` but suggests `execSync` and a `forkSync` name. Quality remains insufficient despite differentiated Node-specific intent; Apache-2.0 is only a future source mode, not a quality signal. Reopen when a corrected source addresses the actual weaknesses.
- **Planning with Files — runtime review still required.** [Entrypoint](https://github.com/OthmanAdi/planning-with-files/blob/dcdfb278de53fdb69b2067ea173dbb1de45345a3/skills/planning-with-files/SKILL.md), full snapshot `dcdfb278de53fdb69b2067ea173dbb1de45345a3`; 27,719 stars. Re-inspected the entrypoint's hook and selected-plan recovery sections; scripts were not reviewed or executed in this run. The scope includes initialization, task selection, lifecycle hooks, and optional session-history replay, beyond three Markdown files. Retain the earlier concurrent-plan, rejected-selector, attestation, and stop-behavior review tasks. MIT may support linking or later complete vendoring, but host plans/compaction and `handoff` already cover adjacent jobs.
- **Django access review — licensing hold remains.** [Entrypoint](https://github.com/getsentry/skills/blob/d12f250460ffd961f549dbebf7eeb0cf4afd4c2e/skills/django-access-review/SKILL.md), full snapshot `d12f250460ffd961f549dbebf7eeb0cf4afd4c2e`; 1,092 repository stars. Checked license/attribution lines and the subtree inventory, not a complete renewed technical review. It still declares `license: LICENSE`, has no subtree license file in the inventory, and credits OWASP CC-BY-SA reference material. Resolve applicable terms before any copying; do not infer an Apache-only subtree from the root. The authorization-specific job remains useful beyond generic threat modeling.
- **web-perf — measurement compatibility review.** [Skill](https://github.com/cloudflare/skills/blob/86505e44f87d801aa1864a3c4109e9a8ae5c409f/skills/web-perf/SKILL.md), full snapshot `86505e44f87d801aa1864a3c4109e9a8ae5c409f`; 3,192 repository stars. Read the complete single-file skill and Apache-2.0 root license. It correctly permits useful analysis without trace tools and conditions MCP setup on authorization. Before recommending it, verify the tool-call shapes, cold-load assumptions, and how contrast/focus findings are actually measured rather than inferred from a text snapshot. It complements `chrome-devtools-mcp`; a host with those tools may already cover much of the work. No browser/performance audit or tool-version test was run.

### Remaining screened candidates

Each row is a discovery lead or preliminary screen, not a completed admission review. The earlier holds above and four Review next records complete the 30-candidate pool.

| Candidate | Disposition and decisive next step |
| --- | --- |
| Trail of Bits insecure-defaults | **Watch as a workflow/plugin.** At snapshot `bf23bfb21f10a2a4b0406086d690dc8cb1b3ccf3`, the command invokes `insecure-defaults:audit-pipeline` through a `Workflow` tool and requires plugin-root references. Read command and manifest only. Review `workflows/audit.js`, references, and host support before treating it as a standalone skill; no pipeline was run. [Source](https://github.com/trailofbits/skills/tree/bf23bfb21f10a2a4b0406086d690dc8cb1b3ccf3/plugins/insecure-defaults) |
| Trail of Bits differential-review | **Review later.** Compare its extra security/history method against host review and existing reviewers; source bundle not inspected in this run. [Source](https://github.com/trailofbits/skills/tree/bf23bfb21f10a2a4b0406086d690dc8cb1b3ccf3/plugins/differential-review) |
| Anthony Fu Vite | **Review next if build guidance is prioritized.** Entrypoint inspected; six local references remain unread. Avoid importing TypeScript/ESM preferences into unrelated project conventions. [Source](https://github.com/antfu/skills/tree/8886fe2d385d3644cbb47e46ae9cb1cf09307d3b/skills/vite) |
| Anthony Fu Vitest | **Watch version targeting.** Entrypoint now labels its reference target Vitest 5.1.0-beta.1, generated October 23. Verify intended stable/beta scope and all references; generation is not evaluation. [Source](https://github.com/antfu/skills/tree/8886fe2d385d3644cbb47e46ae9cb1cf09307d3b/skills/vitest) |
| vuejs-ai Vue testing | **Carry prior hold.** Current entrypoint and inventory retrieved; prior msw/Vitest examples have not been revalidated. Do not clear those blockers from a changed repository HEAD alone. [Source](https://github.com/vuejs-ai/skills/tree/198f0cd8f7f9c0a3d9b566ccc16de6677519ee78/skills/vue-testing-best-practices) |
| vuejs-ai Vue Router | **Specialist follow-up.** Inventory lead; check reused-component and guard examples and overlap with installed Vue skills. [Source](https://github.com/vuejs-ai/skills/tree/198f0cd8f7f9c0a3d9b566ccc16de6677519ee78/skills/vue-router-best-practices) |
| Expo upgrade | **Watch for mobile expansion.** Path verified in current inventory; SDK migration references and service requirements unread. [Source](https://github.com/expo/skills/tree/8a0dc4fa57ae345923c357e1451cbcd8b6f2a7db/plugins/expo/skills/expo-upgrade) |
| Expo Router | **Watch for mobile expansion.** More differentiated than a generic frontend prompt; full reference and dependency review outstanding. [Source](https://github.com/expo/skills/tree/8a0dc4fa57ae345923c357e1451cbcd8b6f2a7db/plugins/expo/skills/expo-router) |
| Exa build-with-exa | **Watch as product-integration guidance.** October 26 release checked and entrypoint downloaded; substantial API references remain unread. Review for a project actually building against Exa. [Source](https://github.com/exa-labs/agent-skills/tree/aa6d5e6f7315b215c20bf15930367d61f86cc268/skills/build-with-exa) |
| Exa search | **Watch.** Entrypoint sampled: explicit API key and HTTP search calls. Ordinary research already has native search here; do not introduce credentials or a service as an implicit research upgrade. No API calls or billing were exercised. [Source](https://github.com/exa-labs/agent-skills/tree/aa6d5e6f7315b215c20bf15930367d61f86cc268/skills/exa-search) |
| Addy Osmani web-quality-audit | **Discovery lead.** Identified through the curated directory; resolve original source, full pin, references, and overlap with `ux-critique`/web-perf before ranking. [Directory](https://github.com/VoltAgent/awesome-agent-skills/blob/47c4880c4a24611a6982b93a0d4b27c4928591ae/README.md) |
| awesome-cursorrules Playwright accessibility | **Discovery lead.** Named rule path verified from README; payload and provenance not reviewed. Prefer one scoped accessibility method to a whole rules bundle. [Source](https://github.com/PatrickJS/awesome-cursorrules/blob/b044f956f021b6e8877f16781bcfc466a6a120e9/rules/playwright-accessibility-testing-cursorrules-prompt-file.mdc) |
| awesome-cursorrules PR review | **Skip for now.** README-level screen suggests heavy overlap with existing reviewers; identify a concrete incremental technique before spending admission effort. [Source](https://github.com/PatrickJS/awesome-cursorrules/blob/b044f956f021b6e8877f16781bcfc466a6a120e9/rules/pr-review-cursorrules-prompt-file.mdc) |
| tstack council | **Watch.** Current upstream README says multi-provider model delegation is required; exact skill and execution closure unreviewed. Compare cost and authority boundaries with our review workflow. [Upstream](https://github.com/t3dotgg/tstack) |
| Ultracite | **Skip as a general guidance addition for now.** Upstream presents an opinionated linter/formatter preset system. Respect consumer tooling rather than importing another project's conventions; inspect a specific skill only for an actual gap. [Upstream](https://github.com/haydenbleasel/ultracite) |
| ui-taste | **Watch provenance and scope.** Trending lead hosted at a domain rather than a pinned GitHub artifact; registry description mentions an optional paid MCP. Verify immutable source, license, and overlap with host frontend-design and `ux-critique`. [Registry](https://www.skills.sh/site/uizze.sh/ui-taste) |
| HyperFrames CLI | **Watch for video/tooling expansion.** Registry names Node 22+, FFmpeg, a CLI, and plugin execution rules; no full source review performed. Installation-channel popularity alone does not make this more urgent than coding-workflow gaps. [Upstream](https://github.com/heygen-com/hyperframes) |

Other unresolved candidates in the [baseline queue](../research-2026-10.md)—including module refactoring, browser-stack alternatives, full development methodologies, scanners, and PR-writing integrations—remain outstanding at their recorded dispositions. This run does not silently clear them or imply they were all re-inspected.

## Revisit existing entries

Ran the existing read-only `bun run catalog:freshness`: **41 checked, five need attention**. All flags were upstream movement, not age or failed requests. No new upstream payloads were reviewed by this command, and no pin was updated.

| Existing ID | Current pin → reported latest (abbreviated) | Next review |
| --- | --- | --- |
| chrome-devtools-mcp | `5463101` → `a24334d` (2026-10-27) | Tool and setup changes; also relevant to web-perf compatibility |
| context7 | `74eda18` → `5c368c9` (2026-10-27) | Retrieval/API, setup, and current packaging changes |
| claude-reflect | `77c3340` → `b6c4232` (2026-10-03) | Pin semantics, actual source difference, and overlap with retrospective/host memory |
| compound-engineering | `bdc53d0` → `00d0a5b` (2026-10-27) | Workflow scope, dependencies, and installation instructions |
| superpowers | `bb92a77` → `2ce8aa1` (2026-10-21) | Bundle behavior and overlap with individually listed skills |

The abbreviated revisions preserve the freshness command's output; they are not installation pins. In particular, an apparently older latest commit is a reason to inspect pin semantics and path history rather than assuming the entry should move. Use a later maintenance task to resolve full revisions and re-read content.

## Changes since baseline

- Removed already-admitted handoff, security, Workers, Vue composable, property-testing, variant-analysis, Ponytail, and UX critique items from the new-addition pool by reconciling current entries with decisions 20, 21, and 24.
- Promoted the previously deferred domain-modeling direction and named Markdown accessibility rule into concrete addition proposals after complete local-resource inspection. They still need entry authoring, path pins, overlap metadata, and normal admission checks.
- Kept architecture as a linked-workflow research candidate with explicit sibling dependencies. It was not promoted on popularity alone.
- Strengthened the Terraform hold with primary-documentation contradictions. Identified an additional Durable Objects reference discrepancy. Neither was a runtime execution result.
- Reconfirmed the Node rules' containment weakness; retained Supabase, Django, Planning with Files, and Vue testing holds. Changed repository HEADs were not accepted as evidence that a specific blocker was fixed.
- Reclassified the currently inspected insecure-defaults entrypoint as a workflow/plugin dependency rather than assuming a plain copied skill. Added Exa, tstack, ui-taste, and HyperFrames to the watch list with their integration scope stated.
- Refreshed maintenance attention: five existing linked entries were flagged, compared with four reported in the earlier plan. The checks were taken at different times; this is not an adoption trend or evidence of degraded quality.

## Top priorities

1. **Prepare domain-modeling for admission.** The best balance of distinct coverage, small complete resource set, simple licensing, and no runtime integration. Disclose its artifact-writing conventions and overlap; start at `reviewed`.
2. **Write a portable Markdown accessibility rule.** A bounded, broadly useful documentation gap. Adapt the host wrapper and project conventions carefully instead of importing an entire reviewer bundle. This is an addition proposal, not a finished payload.
3. **Finish Actions security review inspection.** More immediately relevant to common coding repositories than another generic reviewer, but full references, scope exclusions, and current GitHub dependency-lockfile practices need review first.
4. **Finish sharp-edges package/dependency review.** A distinct library/API-design angle beyond the security entries already listed. Prefer linking under current license policy once closure and technical examples are understood.
5. **Verify or resolve the Durable Objects reference discrepancy.** The small complete skill is otherwise a plausible specialist companion to Workers guidance. A corrected pin or separately authored narrower adaptation is preferable to quietly modifying a vendor copy.

Only the first two are current addition recommendations; the last three are research priorities. Terraform, Supabase, and other held items should not enter an admission batch merely to fill a five-item list.

## Limits and verification

This was a sampled public-source survey, not a universal ranking or an independent adoption census. No non-public usage data, cost comparison, agent outcome evaluation, comprehensive host audit, SQL execution, Terraform execution, browser audit, or upstream workflow execution was performed. Source inspection is curator review. The only small technical probe was our own path-prefix counterexample; the freshness command checked revision metadata.

Network-restricted shell access initially failed; read-only public-source requests subsequently succeeded with the required network permission. Pinned inventories and full repository observations are retained in the companion JSON; third-party payload downloads remain temporary and are not vendored into this checkout. Repository checks validate report formatting and existing catalog invariants, not the research judgments.
