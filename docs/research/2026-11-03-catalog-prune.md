# Complete the outstanding human-v1 assessments

As of **2026-11-03**, America/Edmonton. Source inspection began 2026-10-30 and concluded 2026-11-03. Reviewer: Codex, one AI curator, following the user's instruction to continue with one reviewer.

## Scope and outcome

Complete the 32 profiles identified as incomplete in the [original catalog assessment](2026-10-29-catalog-prune.md). This is substantive pinned-source follow-up, not filling missing dimensions with defaults. Every entry now has seven reasoned human-v1 grades and a linked follow-up. The original partial reviews remain historical records. Dates in follow-up filenames identify the batch's start; their text and metadata record completion on November 3.

The active inventory now has **111 complete profiles, zero incomplete profiles, and 19 scoped blockers across 18 entries**. The concurrent TypeScript admission accounts for one of those 111 entries and two of the blockers; it is separate from this follow-up. All 32 reviewed entries retain evidence level `reviewed`; there are **13 Keep and 19 Refresh dispositions**. No retirement is proposed or applied, so IDs, collection memberships, relations and evaluation cases are unchanged.

## Method and evidence limits

Read each primary artifact and relevant source paths against its existing task, supported environment and named baseline. For large bundles, inspect the operating guide and consequential setup, execution, persistence or network boundaries; state which optional workflows, provider implementations, datasets and dependencies remain outside coverage. A complete provisional source profile does not mean the entire upstream repository or every runtime path has been audited. The seven-dimensional judgment is complete for its stated context; runtime and outcome uncertainty remain in the linked assessment.

The [source manifest](../reviews/2026-10-30-assessment-completion-sources.json) records all 32 pins, prior gaps, source URLs, SHA-256 digests and retrieved excerpts. Retrieval ranges are navigation aids, not a line-by-line certification; large displays can be abbreviated. Each linked assessment states its substantive coverage and limitations. Upstream files were treated as data. No upstream helper, installer, hook, MCP connection, provider, browser session or external evaluation was executed merely to grade it. Repository checks validate this catalog's structure, not the upstream behavior.

Source correctness, authorization boundaries, failure reporting and recovery determined dependability. Existing value/cost/fit grades were retained unless inspection changed their rationale. Impeccable's missing human-control grade is now 2; Compound Engineering's control grade is revised from 3 to 2 because default external-model egress needs a deliberately adopted policy. Neither aggregate scores nor author/model-judged studies establish measured improvement over the baseline. Independent human calibration and authorized matched trials remain outstanding.

## Entry-by-entry decisions

Dependability uses 0–4; aggregate uses 0–10. Fit and scoped blockers precede score in recommendations. Follow-up links contain all seven grades, original comparison context, source findings, coverage limits and the smallest refresh action.

| Entry and assessment | Dependability | Score | Disposition | Decisive finding |
| --- | ---: | ---: | --- | --- |
| [ccusage](../reviews/2026-10-30-ccusage.md) | 2 | 6.9 | Keep | Primary Claude/Codex source paths and native release wiring inspected. Silent record omissions, heuristic deduplication/model inference and pricing snapshots limit cost accuracy; published binary equivalence remains unverified. |
| [variant-analysis](../reviews/2026-10-30-variant-analysis.md) | 2 | 7.0 | Refresh | Core and all query/report resources inspected. Strong seed-based method; generic source/sink/barrier models are unreliable defaults. Rewrite and validate task-specific queries before treating their absence of matches as evidence. |
| [ux-critique](../reviews/2026-10-30-ux-critique.md) | 2 | 6.6 | Keep | Required chat/flow pipeline and retrieval/usage helpers inspected with KB samples. Explicit quote/applicability checks help; lexical ranking, stage heuristics and citation uniqueness need judgment. Local aggregate usage writes are opt-out. |
| [ui-ux-pro-max](../reviews/2026-10-30-ui-ux-pro-max.md) | 2 | 6.6 | Keep | Core, references and search/generation/persistence boundaries inspected with dataset samples. Closed rules and no-overwrite writes help; plausible defaults, editorial mappings and page/Master drift require verification before applying results. |
| [synthesize-research](../reviews/2026-10-30-synthesize-research.md) | 3 | 7.5 | Keep | Coherent attributed synthesis with explicit confidence and contradictions. Deduplicate participants across sources and avoid treating convenience-sample frequencies as population prevalence. |
| [skill-creator](../reviews/2026-10-30-skill-creator.md) | 1 | 5.1 | Refresh | Complete procedure and required authoring/benchmark/viewer boundaries inspected. Benchmark layout/metric mismatches and trigger proxies weaken results; viewer embedding and port cleanup need repair. Use the writing method selectively. |
| [reverse-engineering](../reviews/2026-10-30-reverse-engineering.md) | 2 | 6.9 | Keep | Core, helper chain, both exporters and native/dynamic method inspected. Coordinate-based findings and visible analysis caps help; parser resource limits, metadata path trust, error exit status and incomplete secret masking need care. |
| [react-best-practices](../reviews/2026-10-30-react-best-practices.md) | 2 | 6.9 | Refresh | Complete compiled guide inspected. Useful performance priorities, with incorrect transition-cancellation/default-prop claims and behavior-changing micro-optimization examples. Select rules by framework version and measured bottleneck. |
| [portless](../reviews/2026-10-30-portless.md) | 2 | 6.5 | Refresh | Core proxy/TLS/hosts and elevation paths inspected. Routing and errors are visible, but app startup expands into privileged proxy, CA trust and hosts writes; trust markers can be stale. Preserve the setup blocker and use explicit configuration/removal scope. |
| [open-sourcing](../reviews/2026-10-30-open-sourcing.md) | 3 | 6.8 | Keep | Read-only helper checks and a coherent secrets-first launch workflow. Presence checks cannot establish readiness; organization inference, license choice and release recipes need project verification. |
| [mcp-builder](../reviews/2026-10-30-mcp-builder.md) | 1 | 6.0 | Refresh | Tool-design principles remain useful, but implementation examples and the evaluation harness have concrete correctness/control defects. Repair the file-resource, HTTP and harness paths before use; scoped example blocker retained. |
| [interface-review](../reviews/2026-10-30-interface-review.md) | 3 | 7.1 | Keep | Complete required eight-skill bundle inspected at one pin. Strong scope attribution, checkout protection and explicit coverage limits; exact polish conventions and abbreviated widget recipes still need judgment and rendered verification. |
| [interface-design](../reviews/2026-10-30-interface-design.md) | 2 | 6.4 | Keep | Useful product-UI craft, component reuse and visual checks. Native-control styling and WCAG target-size wording are overbroad; fixed exploration/motion rules need project judgment. |
| [intent](../reviews/2026-10-30-intent.md) | 2 | 5.8 | Refresh | Core and relevant research/ethics/accessibility foundations inspected. Useful bounded routing, but artifact conventions can hide material uncertainty; standards and regulatory claims need correction. Keep experimental scope and inspect selected siblings separately. |
| [impeccable](../reviews/2026-10-30-impeccable.md) | 2 | 5.4 | Refresh | Launcher and telemetry inspected. Cached/unversioned engines can differ from pin; telemetry opt-out preserves roll traffic, and update checks have a separate opt-out. |
| [emil-design-eng](../reviews/2026-10-30-emil-design-eng.md) | 2 | 6.4 | Keep | Useful interaction craft and verification guidance, qualified by blanket acceleration claims, fixed timing rules and a mandatory review-table format. Profile the target browser and Motion version. |
| [design-taste-frontend](../reviews/2026-10-30-design-taste-frontend.md) | 1 | 5.1 | Refresh | Model-judged study and browser/media chain reviewed. Inspector can expose checkout dotfiles/symlink targets; screenshot and download coverage have explicit limits. |
| [cynthion-reverse-engineer](../reviews/2026-10-30-cynthion-reverse-engineer.md) | 1 | 5.5 | Refresh | Complete analysis/generation chain and decoder inspected. Counter ordering, unmatched-transfer loss and replay limitations weaken inference. Device strings enter clone Python without escaping; generated clone execution is blocked pending repair. |
| [agentic-actions-auditor](../reviews/2026-10-30-agentic-actions-auditor.md) | 1 | 7.4 | Refresh | Full core/reference review confirms unsafe output remediation, inconsistent defaults and blind spots in cross-file discovery. Retain the remediation blocker; tainted input alone does not prove successful execution. |
| [worktrunk](../reviews/2026-10-30-worktrunk.md) | 2 | 6.0 | Refresh | Same-repository hook restriction verified; approval takeover remains blocked. Merge may continue without declined validation hooks; stash recovery is not identity-bound. |
| [superpowers](../reviews/2026-10-30-superpowers.md) | 1 | 4.4 | Refresh | Core workflow audit confirms deletion blocker, package-install assumptions and path-based ownership/ignore weaknesses. Host adapter details require checking against live tools. |
| [compound-engineering](../reviews/2026-10-30-compound-engineering.md) | 2 | 5.6 | Refresh | Core method and persistence reviewed. Full review defaults to external-model egress after disclosure; automatic history probing and shipping tail need deliberate adoption. |
| [claude-reflect](../reviews/2026-10-30-claude-reflect.md) | 1 | 5.1 | Refresh | Core command, hooks and storage/validation boundaries inspected. Manual final review helps, but migration/concurrent queue loss, filtering drift and whole-section AGENTS replacement need repair. Raw corrections remain sensitive local records. |
| [claude-hud](../reviews/2026-10-30-claude-hud.md) | 2 | 6.9 | Refresh | Setup/launcher and primary source/distributed entry paths inspected. Backups, sanitization and opt-in shell execution help; highest-cache version selection ignores enabled/pinned choice, and append-only parser assumptions can show stale or partial state. |
| [reverse-engineer-anything](../reviews/2026-10-30-reverse-engineer-anything.md) | 2 | 6.0 | Refresh | Core investigation and selected provider lifecycle/wire reviewed. Source npm preparation can install Husky; source-build instructions now disable that hook setup. |
| [reva](../reviews/2026-10-30-reva.md) | 1 | 5.5 | Refresh | Operating method and key runtime controls inspected. Public-bind and script-path guards help, but automatic stdio retries can repeat mutations; cooperative timeouts and inference examples remain weak. Preserve experimental scope and the headless retry blocker. |
| [process-compose-mcp](../reviews/2026-10-30-process-compose-mcp.md) | 1 | 5.4 | Refresh | MCP package and guide inspected. Explicit SSE controls, opt-in process tools and timeouts help, but nested quoting in the psql recipe remains injectable. Resource reads execute processes; arguments can enter logs. |
| [mise-mcp](../reviews/2026-10-30-mise-mcp.md) | 2 | 6.6 | Keep | Complete MCP boundary and trust paths inspected. Explicit argv validation and failure reporting help. CI trust shortcuts qualify refusal claims; environment reads expose real values and task runs answer other prompts automatically. |
| [ida-mcp](../reviews/2026-10-30-ida-mcp.md) | 2 | 6.0 | Keep | Complete MCP boundary and optional hooks inspected. Target/cancellation handling is explicit; arbitrary Python, persistent mutation, full-content tracing and unauthenticated remote HTTP require trusted scope. Keep optional auto-allow hooks excluded. |
| [context7](../reviews/2026-10-30-context7.md) | 2 | 6.9 | Keep | MCP and setup/data boundaries inspected. Version-aware retrieval is a useful lead, not verified release accuracy. Queries leave the host; setup adds rules/skills and can overwrite files. Prefer explicit manual MCP configuration for bounded adoption. |
| [chrome-devtools-mcp](../reviews/2026-10-30-chrome-devtools-mcp.md) | 3 | 7.0 | Keep | MCP/browser boundary, path checks and telemetry/CrUX paths inspected. Explicit errors and reconnect handling support use; profile persistence, dialog acceptance, raw debug logs and default outbound features require deliberate configuration. |
| [cerberus-re](../reviews/2026-10-30-cerberus-re.md) | 1 | 5.3 | Refresh | Core, installer and runtime/MCP policy boundaries inspected. Dedicated gates help, but allow-by-default passthrough admits bootstrap installation/config writes. Typed status wrappers still rely on heuristic output parsing; repair the generic path. |

## Scoped blockers and metadata repairs

Preserve every existing blocker. Refine Portless's existing wording to the actual certificate/hosts trust scope rather than implying OS prompts are absent. Add eight blockers, limited to the observed paths: generated Cynthion clones, MCP-builder examples, Skill Creator's evaluation viewer, Reflect's AGENTS batch synchronization, ReVa's mutating stdio retries, Cerberus's generic bootstrap route, Compound Engineering's automatic external review, and Taste's local-file server. These do not prohibit unrelated scoped use or authorize installation. Including the separate TypeScript admission, the active catalog has the 19 blockers counted above.

Apply four small metadata corrections supported by inspection:

- REA source installation sets `HUSKY=0` for `npm ci`, so the prepare lifecycle does not silently install Git hooks.
- ccusage's Claude example uses `claude daily`; bare `daily` aggregates sources.
- Impeccable distinguishes choice-telemetry opt-out, remaining roll requests and the separate version-check opt-out.
- ReVa's summary names concrete retry risks and bounded runtime inspection instead of leaving a generic incomplete-review claim.

No source pin, vendored payload, plugin manifest or version is changed. Unrelated working-tree work is preserved.

## Ranked next actions

1. Repair the eight newly blocked paths upstream or provide an explicitly bounded alternative; re-read corrected pins before clearing blockers.
2. Reconcile the identified incorrect examples in React, variant analysis, Intent and other Refresh entries with supported primary documentation.
3. Make external-recipient, hook, certificate and runtime authority choices concrete in the actual consumer project before adoption.
4. Calibrate varied profiles with independent human judgments; test sensitivity to provisional weights.
5. Run a small authorized matched trial against each selected entry's stated baseline, recording correction effort, interruptions, comprehension and control before raising evidence.

## Validation

`bun run catalog:build` regenerated both indexes. `bun run check` passed: type checks, Markdown lint, validation of 111 entries and eight collections, generated-file freshness, and 121 tests across 13 files (zero failures). Loopback-server fixtures required running the check with local network access. `git diff --check` passed. Source pins, related IDs and evidence levels for all 32 entries match the pre-review snapshot. These checks do not upgrade entry evidence.
