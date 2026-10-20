# Agent guidance research queue — October 2026

Researched on **2026-10-20**, including a follow-up source inspection at recorded commits. This is research for Agentic Catalog, not a completed admission audit or behavioral evaluation. Priorities below are curator judgments. No candidate has been installed, vendored, or given a catalog rating by this research.

## Recommendation

After source inspection, the best candidates to prepare for admission are **Matt Pocock's handoff; Trail of Bits' property-based testing and variant analysis; Sentry's secret-serialization; Cloudflare's Workers guidance; and a narrowly scoped Vue skill**. Ponytail remains a plausible minimal-change alternative, with substantial overlap. Matt's architecture command is a linked workflow candidate because it invokes sibling skills. Supabase needs SQL-example verification, Planning with Files needs runtime review, and Liran Tal's security rules are on hold after a reproduced path-containment failure. The original discovery tables below preserve the hypotheses; the source findings and revised queue supersede their initial dispositions.

Prefer individual skills or rules with a specific job over importing whole collections. A popular repository is a source to inspect, not automatically a useful catalog entry.

## Search coverage and limits

The search covered Agent Skills, Cursor rules, AGENTS.md conventions, Claude Code plugins and subagents, Copilot instructions, context and memory workflows, spec-driven development, browser tooling, security, databases, infrastructure, frontend, and mobile development. Broad searches were followed by direct upstream repository and README checks. Search themes included:

- `best agent skills github repositories 2026 skills rules Claude Codex popular`
- `github awesome cursorrules agent skills rules repositories popular`
- `agent skills trailofbits supabase cloudflare sentry`
- `skills planning-with-files everything-claude-code get-shit-done`
- `agent skills context engineering memory gsd bmad`
- Framework and infrastructure searches for Vue, Vite, Terraform, and Expo.

Discovery used the [skills.sh all-time leaderboard](https://www.skills.sh/), its [trending view](https://www.skills.sh/trending), GitHub searches, community directories, and upstream cross-links. The follow-up recorded HEAD commits and recursive file inventories for 32 repositories, retrieved root license files where present, and inspected selected skills, references, manifests, and scripts. Exact snapshots appear at the end. Downloaded files are not automatically counted as fully reviewed: each finding below names its inspection scope. None of the repositories received an exhaustive code audit, and no upstream scripts or agent sessions were executed. The only runtime probe was our own small Node path-check example.

“Top used” cannot be established as a universal ranking from these sources. GitHub stars measure attention; skills.sh counts reflect its installation channel, not unique active users or successful tasks. The displayed numbers below are rounded observations from the initial web pass, not historical October-wide totals or an independent API census. Public GitHub access became available for the follow-up source fetch; that pass pinned files rather than refreshing the popularity figures. No maintenance score is inferred from stars or file counts.

Two recent primary research sources reinforce that distinction: [Skill Constellations, submitted October 8](https://arxiv.org/abs/2610.11169), reports that stars do not identify the main sources of copied skills; [From Registry to Repository, July 2026](https://arxiv.org/abs/2607.00911), studies registry-to-repository reuse and maintenance. Neither establishes that any candidate here improves coding outcomes. Their datasets deserve a separate follow-up for adoption evidence beyond stars; this pass inspected abstracts and the constellation viewer, not the underlying adoption graph.

## Observed adoption signals

These are separate signals, deliberately not combined into a score. Each repository name links to the upstream page that displayed its stars.

| Source | Observed signal | Implication for research |
| --- | --- | --- |
| [mattpocock/skills](https://github.com/mattpocock/skills) | About 298.2k stars; skills.sh displayed architecture at 1.1M and handoff at 1.0M all-time installs | A strong source for additional focused skills; we already carry grilling and diagnosing-bugs. |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | About 284.6k stars | Major bundle to compare against existing workflow plugins. |
| [anthropics/skills](https://github.com/anthropics/skills) | About 182.4k stars; frontend-design displayed at 1.0M all-time installs | Baseline and overlap reference; already represented in the catalog. |
| [DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail) | About 169.3k stars and 9.2k forks | Clearly merits review, including its newer review/audit surfaces. |
| [github/spec-kit](https://github.com/github/spec-kit) | About 142.1k stars | Significant workflow alternative, with more process ownership than an isolated skill. |
| [bmad-code-org/BMAD-METHOD](https://github.com/bmad-code-org/BMAD-METHOD) | About 54.4k stars | Compare only if we want a full development methodology. |
| [sickn33/agentic-awesome-skills](https://github.com/sickn33/agentic-awesome-skills) | About 48.1k stars | Discovery source; aggregate popularity does not transfer to every included skill. |
| [vercel-labs/agent-browser](https://github.com/vercel-labs/agent-browser) | About 44.3k stars; 1.2M all-time installs displayed for its skill | Compare browser access methods against tools already available in the host. |
| [PatrickJS/awesome-cursorrules](https://github.com/PatrickJS/awesome-cursorrules) | About 41.0k stars | Important rules corpus to sample, rather than adopting a global rules bundle. |
| [microsoft/playwright-mcp](https://github.com/microsoft/playwright-mcp) | About 38.4k stars | Well-known alternative to our Chrome DevTools MCP entry. |
| [VoltAgent/awesome-agent-skills](https://github.com/VoltAgent/awesome-agent-skills) | About 36.1k stars | Broad discovery source for original maintainers. |
| [trailofbits/skills](https://github.com/trailofbits/skills) | About 7.7k stars | Smaller specialist source with clearly differentiated tasks. |
| [cloudflare/skills](https://github.com/cloudflare/skills) | About 3.1k stars | Product-maintainer expertise matters more than its relative star rank. |
| [supabase/agent-skills](https://github.com/supabase/agent-skills) | About 2.9k stars | Same: specific database knowledge is a plausible catalog gap. |
| [lirantal/agent-rules](https://github.com/lirantal/agent-rules) | Search-indexed upstream page displayed 59 stars; lower-confidence freshness | Include a small security-rules source so popularity does not determine coverage. |

Install figures above come from the [all-time leaderboard](https://www.skills.sh/). Its trending page was also checked for discovery; no trending counts are treated as comparable to all-time counts. Independent maintainers with similarly named `superpowers` repositories appeared in the leaderboard; do not confuse those with `obra/superpowers` or infer common provenance.

## Priority 1 — research for possible admission

The order is the suggested research sequence, not a quality ranking. “Consider” means worth investigating, not approved for addition. Exact source files and redistribution rights must be checked at a pinned revision before an entry is proposed.

| Order | Upstream and concrete target | Why it could belong | Overlap and decisive research question | Initial disposition |
| --- | --- | --- | --- | --- |
| 1 | [Ponytail](https://github.com/DietrichGebert/ponytail): core `ponytail` skill, then review/audit commands | Explicit order of reuse: existing project code, platform capability, installed dependency, then new code. Review/audit may be more distinct than the core prompt. | Compare with `focused-changes`, `karpathy-coding-guidelines`, verification entries, and host defaults. Does the decision ladder prevent unnecessary implementation while preserving completeness? Check broad trigger and session persistence. | Consider the core as an alternative; review commands separately. Avoid bundling dashboard/hooks into a prompt entry. |
| 2 | [mattpocock/skills](https://github.com/mattpocock/skills): `improve-codebase-architecture`, `handoff`; later domain modeling | Architecture improvement and explicit handoff artifacts fill gaps more clearly than another general planning skill. | Existing `grilling`, `diagnosing-bugs`, `explore-plan-implement-review`, and host compaction cover adjacent work. Check standalone resource closure and current skill paths. Can handoff preserve constraints and architecture propose bounded changes? | Strong candidates for separate entries. Existing PLAN already names architecture and handoff as deferred candidates. |
| 3 | [trailofbits/skills](https://github.com/trailofbits/skills): `property-based-testing`, `differential-review`, `variant-analysis`, `insecure-defaults`, `sharp-edges` | Adds concrete testing techniques and focused security analysis beyond generic reviewer personas. | Compare with `security-threat-model`, `silent-failure-hunter`, TDD, and host review. Which individual skill adds reproducible findings with manageable tool dependencies? | Strong research source. GitHub labels the repo CC-BY-SA-4.0; plan on linked entries under our permissive-only vendoring policy unless file-specific terms establish otherwise. |
| 4 | [supabase/agent-skills](https://github.com/supabase/agent-skills): `supabase-postgres-best-practices` | Query plans, indexing, concurrency, pooling, and RLS guidance address a database gap. | `context7` can retrieve documentation but is a different delivery mechanism. Separate general Postgres advice from Supabase-specific assumptions. Check reference freshness and actual SQL examples. | Strong candidate for one focused database skill. Prefer it over the broader product router initially. |
| 5 | [OthmanAdi/planning-with-files](https://github.com/OthmanAdi/planning-with-files): planning skill and optional lifecycle hooks | Persistent plan, findings, and progress files target recovery after context loss. | Compare with host plans/compaction and `explore-plan-implement-review`. Can the skill work alone? What do hooks read or inject, and how does completion blocking behave? | Consider a skill/workflow; treat hooks as a separately disclosed configuration. Upstream benchmark claims need independent inspection. |
| 6 | [getsentry/skills](https://github.com/getsentry/skills): `gha-security-review`, `django-access-review`, `secret-serialization`, `skill-scanner`; later `iterate-pr` | Real team workflows and specialized review targets are more distinct than another general code reviewer. | `gh-fix-ci`, our existing reviewers, and authoring skills cover adjacent tasks. Identify Sentry-only assumptions, dependencies, and vendored ancestry. A scanner cannot establish that a skill is safe. | Consider narrow reviews first; avoid company-specific commit and branch conventions. |
| 7 | [cloudflare/skills](https://github.com/cloudflare/skills): `workers-best-practices`, `durable-objects`, `web-perf` | Platform lifecycle, stateful services, and performance diagnostics could add current expertise. | Compare with `context7`, `chrome-devtools-mcp`, and `webapp-testing`. The plugin advertises a bundled remote MCP server; can the chosen skill operate without configuring it? Audit sibling-skill and live-doc dependencies. | Consider individual skills for Cloudflare projects. |
| 8 | [hashicorp/agent-skills](https://github.com/hashicorp/agent-skills/blob/f706481af9b8fedb66de909f6243ad29601afa0c/SKILLS.md): `terraform-test`, `refactor-module`, `terraform-style-guide` | Gives infrastructure work a concrete testing and module-maintenance entry point. | Generic testing/review is partial overlap. Inspect lifecycle state, supported model assumptions, execution permissions, and whether the workflow can modify or apply infrastructure. | Consider testing or module refactoring first, with execution boundaries explicit. |
| 9 | [agent-browser](https://github.com/vercel-labs/agent-browser) skill versus [Playwright MCP](https://github.com/microsoft/playwright-mcp) | CLI plus instructions and MCP are alternative ways to give an agent browser access. | Strong overlap with `chrome-devtools-mcp`, `webapp-testing`, and host browsers. Compare setup, session isolation, scriptability, and task success; avoid recommending all browser stacks together. | Research a single clearly labelled alternative first. Playwright MCP was already deferred in PLAN. |
| 10 | [antfu/skills](https://github.com/antfu/skills) and [vuejs-ai/skills](https://github.com/vuejs-ai/skills): Vue/Vite/Vitest guidance | Broadens frontend coverage beyond the existing React entry, with documentation-derived and issue-derived approaches to compare. | Compare with `context7` and any installed host-specific Vue skill. Inspect generated material, upstream provenance, framework-version assumptions, and reported evals. Antfu explicitly calls its generation project a proof of concept without full practical testing. | Choose one narrowly scoped skill per job after comparison. Do not treat `antfu/skills-pack` as the original source of every skill. |
| 11 | [lirantal/agent-rules](https://github.com/lirantal/agent-rules): secure-code or testing rules | A smaller, security-focused rules source broadens coverage beyond the biggest skill packs. | Compare with `scope-and-authority`, `focused-changes`, threat modeling, and language-specific tools. Do individual rules add concrete secure-coding detail rather than generic advice? | Consider selected rules only. Inspect actual license and installer; do not run the rule/MCP generator during review. |
| 12 | [github/awesome-copilot](https://github.com/github/awesome-copilot) and [PatrickJS/awesome-cursorrules](https://github.com/PatrickJS/awesome-cursorrules): scoped instruction files | Provides a large pool of file-pattern-specific rules, a different format from on-demand skills. | Host-specific frontmatter and generic style preferences can defeat portability. First identify named files for one actual stack; verify contributor provenance and modern framework advice. | Research sources, not entries yet. Do not catalog either entire corpus as a universal rule pack. |

## Priority 2 — compare or revisit when the need arises

| Source | Research angle and reason to defer |
| --- | --- |
| [ECC, formerly Everything Claude Code](https://github.com/affaan-m/ECC) | Inspect research-first development, memory, and continuous-learning components individually. Heavy overlap with `superpowers`, `compound-engineering`, `retrospective`, and `self-improvement-loop`; full bundle has substantial runtime/configuration scope. |
| [github/spec-kit](https://github.com/github/spec-kit) | Compare spec-to-task artifacts with our planning workflow and grilling skill. Worth a linked workflow alternative if a user wants a more structured process. Review current templates and initializer before recommending setup. |
| [BMAD-METHOD](https://github.com/bmad-code-org/BMAD-METHOD) | Role/workflow methodology; [current skill reference](https://github.com/bmad-code-org/BMAD-METHOD/blob/61e01f82644c4bb533750cfa0d6d61ab61d2cc9b/docs/reference/skills-and-agents.md) gives concrete targets such as walkthrough and project context. Full adoption changes project process, so seek one distinctive workflow first. |
| [open-gsd/gsd-core](https://github.com/open-gsd/gsd-core) | Fresh-context execution, phase artifacts, verification, and handoffs. The [old gsd-build/get-shit-done README](https://raw.githubusercontent.com/gsd-build/get-shit-done/main/README.md) redirects here; do not recommend the archived home. Compare its process/runtime overhead with smaller skills. |
| [Agent Skills for Context Engineering](https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering) | Investigate `context-compression`, `filesystem-context`, and `tool-design`. Separate building agent systems from guidance usable by an ordinary coding agent; reject assumptions that require modifying the host harness. |
| [Beads](https://github.com/steveyegge/beads) | Persistent dependency-aware work tracking; the upstream link redirects to the current project. This introduces a CLI and storage model, so assess as a tool/workflow integration rather than a copied memory rule. |
| [steipete/agent-scripts](https://github.com/steipete/agent-scripts) | Practical helpers and documentation discovery. The [archived agent-rules repo](https://github.com/steipete/agent-rules) points here. Review individual self-contained helpers; current README includes sibling-repository symlinks and personal absolute paths that violate our copy-install closure requirement if carried over. |
| [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) versus [Anthropic frontend-design](https://github.com/anthropics/skills/tree/dbd4588f9e1033efb41dad4bef2f7947c8993d44/skills/frontend-design) | Distinct visual-design direction and browser verification are worth comparing, but host-provided frontend skills can make them redundant. Taste's README describes substantial time/token use; inspect scripts and evaluate against a cheaper baseline. |
| [expo/skills](https://github.com/expo/skills) | Official mobile-specific guidance; start with navigation or native modules when adding a mobile collection. Core Expo advice and paid EAS services need distinct scopes. |
| [remotion-dev/skills](https://github.com/remotion-dev/skills) | Video-in-code domain expertise with a visible skills.sh presence. Defer until motion/video work is an observed need; this is less central than current coding-workflow gaps. |

## Discovery sources and existing coverage

These remain useful in subsequent passes without adding another catalog entry for discovery itself:

- [VoltAgent/awesome-agent-skills](https://github.com/VoltAgent/awesome-agent-skills): trace attractive skills to their original maintainers.
- [sickn33/agentic-awesome-skills](https://github.com/sickn33/agentic-awesome-skills), formerly antigravity-awesome-skills: broad index and tooling; inspect per-skill origins and licenses rather than assuming uniform rights or quality.
- [VoltAgent/awesome-claude-code-subagents](https://github.com/VoltAgent/awesome-claude-code-subagents): sample concrete procedures; generic personas remain low priority under decision 16.
- [trailofbits/skills-curated](https://github.com/trailofbits/skills-curated): upstream says its plugins are staff-reviewed. Useful evidence of curation, not an independent efficacy evaluation or a substitute for our review.
- [JetBrains/skills](https://github.com/JetBrains/skills): another curated discovery route; follow each listed skill back to its source.
- [antfu/skills-pack](https://github.com/antfu/skills-pack): aggregation and update approach; original authors differ by skill.

Already represented: [obra/superpowers](https://github.com/obra/superpowers), [EveryInc/compound-engineering-plugin](https://github.com/EveryInc/compound-engineering-plugin), [Anthropic skills](https://github.com/anthropics/skills), [official Claude plugins](https://github.com/anthropics/claude-plugins-official), [Vercel agent-skills](https://github.com/vercel-labs/agent-skills), [Vercel skills/discovery](https://github.com/vercel-labs/skills), and the Karpathy guidelines. Search prominence is a reason to check freshness and missing capabilities, not to duplicate these entries. Existing exclusion decisions about unpinned remote instructions and document-skill licenses stand unless new source evidence changes them.

## Source findings — primary candidates

The inspection units here are specific artifacts, not endorsements of an entire repository. File counts describe the pinned tree, not the quantity of effective guidance. A permissive root license is only the starting point: check local notices and the entire proposed bundle before copying.

### 1. Ponytail — prompt alternative; keep the plugin separate

**Inspected:** [core skill](https://github.com/DietrichGebert/ponytail/blob/09c434ab73ca43761c5d8b0c5d341926c2fba710/skills/ponytail/SKILL.md), [review](https://github.com/DietrichGebert/ponytail/blob/09c434ab73ca43761c5d8b0c5d341926c2fba710/skills/ponytail-review/SKILL.md), [audit](https://github.com/DietrichGebert/ponytail/blob/09c434ab73ca43761c5d8b0c5d341926c2fba710/skills/ponytail-audit/SKILL.md), plugin manifest, hook registration, activation/runtime/instruction-loading code, root MIT license, and the October benchmark report.

The three prompts can be read independently. Core applies a six-step implementation ladder, checks callers before bug fixes, preserves validation and error handling, and requires a small check for nontrivial logic. Its lite/full/ultra levels differ in how strongly the agent questions scope; activation persists for the session. Review traces callers and expected load beyond the diff; audit first maps entry points and data flows, limits output to 20 findings, and reports unread areas. Both require a concrete failure case per finding and make no code changes.

The plugin is considerably more than those prompts. SessionStart and SubagentStart inject guidance; prompt submission tracks mode. The activation code writes mode state, runs a codebase-map helper with a three-second timeout, and can copy a statusline script into the host configuration directory while prompting for configuration. The manifest also exposes an optional webhook URL/token and task-name sharing setting for the dashboard. That is a separate integration surface, not required by a prompt-only entry; its remaining helpers have not received full review.

**Evidence:** the [October 7 report](https://github.com/DietrichGebert/ponytail/blob/09c434ab73ca43761c5d8b0c5d341926c2fba710/benchmarks/results/2026-10-07-agentic.md) describes 39 tasks × five runs × three arms, using headless Claude Code and Opus 5.5 with Bash disabled. Only 18 tasks have hidden correctness checks: baseline and v4 each passed 86/90, v5 87/90. All arms passed the six security tasks equally; the other 21 tasks primarily measure delivered code size. This supports investigating reduced output/cost, not claiming better correctness or performance in a normal tool-enabled session. We read the report, not the full harness or raw runs, and did not reproduce it.

**Disposition:** retain core as a labelled alternative to `focused-changes` and Karpathy guidance, not another default install. Review/audit are readable but overlap heavily with existing review capabilities. A useful comparison would test whether reuse actually preserves all acceptance criteria. If copied later, include the MIT license and keep dashboard/hooks out of the install unless separately requested.

### 2. Matt Pocock — handoff is small; architecture is a workflow

**Inspected:** [handoff](https://github.com/mattpocock/skills/blob/5beb35b040e3de97e54fa9e386d7e42d15c295c2/skills/productivity/handoff/SKILL.md), [architecture improvement](https://github.com/mattpocock/skills/blob/5beb35b040e3de97e54fa9e386d7e42d15c295c2/skills/engineering/improve-codebase-architecture/SKILL.md), its HTML-report resource, [domain modeling](https://github.com/mattpocock/skills/blob/5beb35b040e3de97e54fa9e386d7e42d15c295c2/skills/engineering/domain-modeling/SKILL.md), the codebase-design vocabulary, directory inventories, and root MIT license.

`handoff` contains only the prompt and Codex display metadata. It is explicitly invoked (`disable-model-invocation: true`), writes to the OS temporary directory, references existing specs/ADRs/commits rather than duplicating them, redacts sensitive information, and tailors the handoff to the next session's purpose. It asks for suggested skills but does not install them. Its weakness is that it prescribes no explicit acceptance checklist for preserving unresolved constraints; a short handoff can still omit important state.

Architecture improvement first scopes exploration using the user's target or Git history, then looks for shallow modules that can hide more behavior behind a smaller interface. It writes a temporary before/after HTML report, asks the user to choose an opportunity, and continues through a design interview. It explicitly invokes **codebase-design, grilling, and domain-modeling** and uses subagents. The HTML uses Tailwind and Mermaid from CDNs, so the report is not fully offline despite its single-file packaging. Copying its three-file directory does not supply those sibling skills. Domain modeling adds glossary/ADR formats and creates project documentation lazily; it must respect an existing consumer documentation scheme.

**Disposition:** prepare `handoff` first as a standalone candidate. Treat architecture as a linked workflow/bundle, or write an explicitly adapted standalone version after deciding how to replace sibling dispatch and CDN dependence. Do not silently edit a vendored copy. Compare handoff against host compaction using an interrupted task with a rejected approach, pending check, and authorization constraint.

### 3. Trail of Bits — testing and known-bug expansion are the best fits

**Inspected:** [property-based-testing](https://github.com/trailofbits/skills/blob/5c99c03fb8a9ea568432ecbcba5d86e9f4ac2bf0/plugins/property-based-testing/skills/property-based-testing/SKILL.md), its test-review reference, [variant-analysis](https://github.com/trailofbits/skills/blob/5c99c03fb8a9ea568432ecbcba5d86e9f4ac2bf0/plugins/variant-analysis/skills/variant-analysis/SKILL.md), differential-review and sharp-edges prompts, their resource inventories/manifests, insecure-defaults' command, and root CC-BY-SA-4.0 license.

- **Property-based testing:** its nine-file skill directory includes five task-specific references. It distinguishes roundtrip, oracle, idempotence, and invariants; rejects tautological assertions and filters that exclude nearly every generated input; and allows the conclusion that example tests are a better fit. It separates writing, reviewing, and interpreting a shrunk counterexample. Adding a testing library is explicitly a dependency decision for the user. This adds test-design detail beyond our TDD skill.
- **Variant analysis:** starts with a known bug, proves an exact search matches it, then generalizes one element at a time, stopping when more than half the matches are noise. The 18-file skill directory includes four process references, a report template, and CodeQL/Semgrep resources for five languages. The direct process is useful without a special runtime; the parallel `/variants` workflow is a separate plugin surface. It is not an initial vulnerability-discovery skill.
- **Differential review:** uses Git history, caller counts, test coverage, and attacker scenarios; requires a Markdown artifact and namespaced adversarial-modeler dispatch. References to audit-context-building and issue-writer create additional coupling. Its thresholds and report requirements are more prescriptive than the two candidates above; do not equate missing coverage with a confirmed vulnerability.
- **Sharp edges:** focuses on misuse-resistant API/configuration design, such as unsafe defaults and interchangeable primitive parameters. It has 19 files including language references and mentions a dedicated agent. Stronger fit for library/API design than ordinary bug review; its categorical migration advice needs consumer compatibility constraints.
- **Insecure defaults:** at this snapshot it is a plugin **command**, not a standalone `SKILL.md`. The [audit command](https://github.com/trailofbits/skills/blob/5c99c03fb8a9ea568432ecbcba5d86e9f4ac2bf0/plugins/insecure-defaults/commands/audit.md) requires the host `Workflow` tool and an installed reference corpus, then dispatches `insecure-defaults:audit-pipeline`. Do not describe it as a portable copied skill.

**Disposition:** prepare linked entries for property-based testing and variant analysis under our current permissive-only vendoring policy. Defer differential-review and sharp-edges until they address a specific need. Keep insecure-defaults as a host-dependent plugin candidate. A discriminating follow-up would ask the testing skill to reject a useless property and the variant skill to find the same root cause across different modules without flooding the report.

### 4. Supabase — useful reference set, but verify the SQL before admission

**Inspected:** [skill](https://github.com/supabase/agent-skills/blob/c9be0e931b7930f7d02126d04774d904c381e7d7/skills/supabase-postgres-best-practices/SKILL.md), complete directory inventory, and references for missing indexes, RLS performance, deadlocks, and EXPLAIN; root MIT license. The 36-file directory contains 35 reference/changelog files besides `SKILL.md`, not scripts or a configured MCP connection. Most references are general Postgres; the auth examples are Supabase-specific. The trigger is much broader than performance: it requests loading before essentially every database edit.

Its useful shape is short, impact-ranked topics with bad/good SQL and primary documentation links: index selection, pooling, keyset pagination, row security, locks, and diagnostics. It can be consulted selectively and does not inherently need the larger Supabase product router.

Several inspected examples prevent an unconditional recommendation:

- [RLS performance](https://github.com/supabase/agent-skills/blob/c9be0e931b7930f7d02126d04774d904c381e7d7/skills/supabase-postgres-best-practices/references/security-rls-performance.md) revokes function execution from PUBLIC and authenticated roles, then uses that function in a policy without a corresponding grant. The document also generalizes that a security-definer function bypasses RLS on every table. PostgreSQL says policy expressions run with the querying user's privileges and table-owner/BYPASSRLS behavior has qualifications. The example's role setup needs execution under a non-owner role; we have not run that database test. See [PostgreSQL row security](https://www.postgresql.org/docs/current/ddl-rowsecurity.html) and [GRANT](https://www.postgresql.org/docs/current/sql-grant.html).
- [Deadlock prevention](https://github.com/supabase/agent-skills/blob/c9be0e931b7930f7d02126d04774d904c381e7d7/skills/supabase-postgres-best-practices/references/lock-deadlock-prevention.md) correctly demonstrates explicitly ordered locks, but its alternative describes a multirow UPDATE as acquiring all locks atomically. Verify concurrent behavior rather than treating that sentence as a deadlock guarantee.
- Indexing/EXPLAIN references use unconditional heuristics and large speedup figures. Those figures are examples or author claims, not a guarantee for arbitrary selectivity and workloads; the missing-index page even describes scan growth as exponential.

**Disposition:** keep high research priority, but hold verbatim admission until representative SQL is verified or upstream corrects it. If we need an entry sooner, consider a separately authored, cited and narrower guide, not a silently patched vendor copy. The admission task should cover an ordinary user under RLS, an intentionally unselective query, and conflicting concurrent writes.

### 5. Planning with Files — runtime-backed recovery, not just three Markdown files

**Inspected:** [canonical skill](https://github.com/OthmanAdi/planning-with-files/blob/de837a95cc845b6341a6cbfd902a89a8190c568e/skills/planning-with-files/SKILL.md), Codex variant, hook manifest, skill/root script inventories, dispatcher/gate code and selected injector/recovery paths, templates, [evaluation write-up](https://github.com/OthmanAdi/planning-with-files/blob/de837a95cc845b6341a6cbfd902a89a8190c568e/docs/evals.md), and MIT license. The full shell/Python runtime and all host variants were not audited.

Version 3.25.0 selects a plan using `PLAN_ID` and `PWF_PLAN_ROOT`; legacy mode uses project-root files, while named tasks use `.planning/<id>/`. It refuses ambiguous multiple plans and rejected explicit selectors instead of resuming another task. One owner writes shared plan state; workers use assigned files. Attestation hashes detect plan drift, and optional gate mode can request continuation. Automatic recovery reads project files; session metadata and bounded transcript replay are separate explicit modes.

Copy installation is **not inherently hook-free**: the main `SKILL.md` itself registers UserPromptSubmit, PreToolUse, PostToolUse, Stop, and PreCompact command hooks. Those invoke bundled `skill-hook.sh`, injection, and completion scripts, with host-specific fallback paths. A plain text-only adaptation would lose the mechanism behind several advertised benefits. Its rigid requirement to save findings after every two view/search actions also imposes ongoing overhead.

**Evidence limits:** early evaluations primarily test file names, headings, and adherence to its own workflow, not task correctness. The report states that the skill used more tokens and time in that set. Its blind comparisons also favored the expected structure. Later comparative recovery figures use an older transcript-catchup mode; the write-up explicitly says they do not measure the current file-only default. The comparative raw workspace is not tracked in this repository. A public file-only fixture exists, but we did not run it.

**Disposition:** consider a linked workflow/plugin with explicit hook disclosure; do not offer a three-file copy as equivalent. Before admission, test current file-only recovery, two concurrent named plans, a rejected selector, a modified attested plan, and a user stopping gated work. Compare against simple saved notes and host compaction.

### 6. Sentry — prioritize secret serialization; separate mixed licenses and PR writes

**Inspected:** the five nominated skill prompts, their resource inventories, secret-serialization's SPEC/SOURCES and language references, scanner code structure/patterns, PR helper inventory, and root Apache-2.0 license. No scanner, helper, or remote review was run.

- **[Secret serialization](https://github.com/getsentry/skills/blob/f57ada2d0b640406ea7e25b11d636c530e77c58b/skills/secret-serialization/SKILL.md):** five files, no bundled executable. It treats a credential holder and a serialization sink as two halves that can arrive in different changes, and searches outside the diff for the other half. It distinguishes repr, `asdict`, Pydantic dumps, raw attribute traversal, and JavaScript enumeration; a field flag protecting one path does not automatically protect another. The spec explicitly calls it opt-in because sinkless holder findings can be noisy. This is much narrower than a generic secret scanner or our threat-model skill.
- **Evidence for that skill:** [SOURCES.md](https://github.com/getsentry/skills/blob/f57ada2d0b640406ea7e25b11d636c530e77c58b/skills/secret-serialization/SOURCES.md) describes one internal incident, repeat positive runs and two negative cases on Warden/Grok, plus a tool-frontmatter failure and known duplicate reports. It discloses that Claude was not tested. Useful origin/evaluation detail, but the internal fixture and raw evidence are unavailable here; it does not justify raising our catalog evidence level.
- **[GitHub Actions security](https://github.com/getsentry/skills/blob/f57ada2d0b640406ea7e25b11d636c530e77c58b/skills/gha-security-review/SKILL.md):** ten files with nine pattern references. Traces fork/comment input through checkout or expression expansion to credentials and execution, and requires entry, payload, mechanism, impact, and a PoC sketch for high confidence. Its external-attacker-only model excludes insider/write-access cases and exempts first-party action tags from its pinning policy. Those are scope choices, not a general assurance that those configurations are safe.
- **[Django access review](https://github.com/getsentry/skills/blob/f57ada2d0b640406ea7e25b11d636c530e77c58b/skills/django-access-review/SKILL.md):** reconstructs managers, middleware, base views and DRF permissions before tracing user A's access to user B's object. References include tenant isolation. However, the skill declares `license: LICENSE` without a LICENSE in its directory, and attributes reference material to OWASP CC-BY-SA-4.0. The root Apache license is insufficient evidence for blindly copying this subtree; resolve those terms first.
- **[Skill scanner](https://github.com/getsentry/skills/blob/f57ada2d0b640406ea7e25b11d636c530e77c58b/skills/skill-scanner/SKILL.md):** a Python scanner with PEP 723 `pyyaml` dependency plus three analysis references. It collects regex/structure findings for agent review, including symlinks and hooks. It can assist source inspection; absence of a matched pattern is not a proof of safety. `uv run` may resolve its package dependency and needs separate execution review.
- **[Iterate PR](https://github.com/getsentry/skills/blob/f57ada2d0b640406ea7e25b11d636c530e77c58b/skills/iterate-pr/SKILL.md):** four Python helpers require `gh` authentication and `uv`. It distinguishes actionable CI from human gates, stops on draft/no-check/rebase cases, and includes commit/push steps plus a helper capable of replying to threads. A consumer must explicitly authorize the relevant writes; installing the skill must not authorize messages or pushes by itself.

**Disposition:** prepare secret-serialization first; consider Actions review second after checking its scope/exemptions. Hold Django vendoring for licensing clarification. Defer scanner and PR iteration as separate integrations, not implicit extensions of read-only review.

### 7. Cloudflare — concrete runtime guidance and a performance companion

**Inspected:** [Workers](https://github.com/cloudflare/skills/blob/86505e44f87d801aa1864a3c4109e9a8ae5c409f/skills/workers-best-practices/SKILL.md), Durable Objects and web-perf prompts, reference inventories and selected runtime/configuration references, plugin manifest, `.mcp.json`, and Apache-2.0 license.

Workers guidance first reads the project's configured compatibility date, flags, generated binding types, and installed schema. It covers streaming rather than unbounded buffering, `ctx.waitUntil()` lifetimes, request-state isolation, platform-class inheritance, serialization boundaries, and generated `Env` types. Its three local references make this substantially more specific than a general clean-code rule. It requests observability for new production Workers; keep that choice consistent with the project's cost and logging requirements.

Durable Objects covers per-entity coordination, SQLite migrations, persistence before memory caches, alarm replacement, concurrency control, deterministic instance routing, and testing. It retrieves current API documents and routes CLI work to sibling skills. `web-perf` is a different entry: a five-phase trace/network/accessibility/source audit using Chrome DevTools MCP names, with degraded analysis if tools are unavailable. That makes it a potential procedural companion to our `chrome-devtools-mcp`, not another browser backend.

The full plugin configures `https://mcp.cloudflare.com/mcp`; standalone skills need not inherit it. Live product-document retrieval should be distinguished from silently executing remote instructions, but its exact scope and provenance still matter.

**Disposition:** prepare Workers best practices for Cloudflare projects; keep Durable Objects as a specialist follow-up. Consider web-perf as a complementary workflow after testing tool-version compatibility. Prefer existing browser tools and never configure the plugin's remote MCP merely to copy a skill.

### 8. HashiCorp — linked Terraform testing; hold module-refactor examples

**Inspected:** [Terraform testing](https://github.com/hashicorp/agent-skills/blob/f706481af9b8fedb66de909f6243ad29601afa0c/plugins/terraform/skills/terraform-test/SKILL.md), refactor-module and style-guide prompts, their reference inventories, support matrix, and **MPL-2.0** root license. All three are marked active. Support policy lists selected Claude/OpenAI models and explicitly says support does not promise identical harness behavior; it is not an evaluation result for our hosts.

Terraform testing explains `.tftest.hcl`, run/assert blocks, plan versus apply mode, mocks, and suite organization. Three references cover provider mocks, CI, and complete examples. It states that mocks require Terraform 1.7+ and that default apply mode creates real resources. A catalog entry must make that operational distinction conspicuous instead of describing all tests as harmless local checks.

Refactor-module is substantially broader: module interface design, state migration, test generation, documentation and apply commands, with live links to sibling skills. One shown module block combines a Git source with a `version` constraint, which should be checked against [Terraform's module source/version rules](https://developer.hashicorp.com/terraform/language/modules/configuration) before adoption. Style-guide includes opinionated naming/version defaults and refers to `SECURITY.md`; check the intended location rather than assuming all referenced content is local to its skill directory.

**Disposition:** consider a linked Terraform-test entry with explicit plan/mock/apply behavior. MPL-2.0 points to linking under our current permissive-only vendoring policy. Hold refactor-module pending example validation; style guidance is lower novelty than testing.

### 9. Agent Browser — the installable skill is a CLI documentation stub

**Inspected:** [skill stub](https://github.com/vercel-labs/agent-browser/blob/5ee8691339a5a002e4d7454eec95250253bc7419/skills/agent-browser/SKILL.md), [core CLI-served guide](https://github.com/vercel-labs/agent-browser/blob/5ee8691339a5a002e4d7454eec95250253bc7419/skill-data/core/SKILL.md), package metadata, inventories, and Apache-2.0 license. Browser implementation, installer, and all specialized guides were not audited.

The installed `agent-browser` skill is hidden and directs the agent to `agent-browser skills get core`; it does not contain the operating instructions. The core guide is version-coupled to the installed CLI, uses CDP snapshots with short element references, requires a task-specific named session, and describes a separate MCP surface. It also supports website-advertised WebMCP discovery, with explicit treatment of its metadata as untrusted data rather than authorization.

The stub's trigger extends beyond ordinary browsing to Electron, Slack and cloud browsers and explicitly prefers this tool over host built-ins. That preference conflicts with our consumer-convention principle when the host already supplies a browser. Pinning the stub alone also does not pin the CLI-provided guidance or browser binary. Its session management is useful, but the catalog unit is a tool integration, not a self-contained Markdown skill.

**Disposition:** defer a generic browser skill; consider a linked integration only for a demonstrated CLI/session need. Compare with the installed host browser and Playwright/Chrome MCP before recommending a new stack. Copying the stub cannot establish resource closure or behavioral compatibility.

### 10. Playwright MCP — deliberate browser-tool alternative

**Inspected:** README, package manifest, CLI/entrypoint, server metadata and configuration types at the pinned commit. Package `@playwright/mcp` is 0.0.83, requires Node 18+, and declares Apache-2.0. Its Playwright dependencies are pinned to an alpha build in that manifest; the thin repository entrypoints delegate substantial behavior into those packages.

It provides structured browser interaction over MCP; configuration includes browser selection, persistent versus isolated contexts, storage state, browser/CDP attachment, and capabilities. Choose isolated contexts for repeatable tests and attach only to user-intended sessions. Reviewing this wrapper is not a review of the dependency implementation, and the runtime/browser artifacts need their own pin and compatibility check.

**Disposition:** still a reasonable linked alternative to `chrome-devtools-mcp`, not a default companion. Select by the task: interaction/test automation versus Chrome-specific performance diagnostics, available host tools, and installation friction. No runtime or comparative reliability claim was tested here.

### 11. Anthony Fu — current framework references with explicit preferences

**Inspected:** [Vue](https://github.com/antfu/skills/blob/feb0f3aba6566426f12230e7fc7a10d97c1293bb/skills/vue/SKILL.md), Vite and Vitest entrypoints, generation metadata, inventories, README and MIT license. Snapshot headers identify Vue 3.5, Vite 8.3.1 and Vitest 5.0.1, generated September 25. Those are the upstream reference targets, not versions we installed or verified by executing examples.

These are compact topic routers into documentation-derived references: Vue macros/reactivity, Vite build/SSR/environment APIs and Rolldown migration, Vitest mocking/fixtures/projects/type tests. They explicitly prefer TypeScript/ESM, and Vue mandates Composition API while discouraging reactive props destructure. Such preferences should not silently migrate an existing Options API or JavaScript project. Generation dates aid freshness review, but neither generation nor a maintainer's expertise proves behavioral benefit.

**Disposition:** Vite migration or Vitest-specific guidance could fill a current gap; prefer the smallest relevant skill and include its entire reference subtree. Compare with `context7` and host-provided framework guidance. Avoid a global personal-preferences bundle.

### 12. vuejs-ai — symptom-based references are more differentiated

**Inspected:** [Vue testing](https://github.com/vuejs-ai/skills/blob/f5d4b3b869bb8a86ddfea148196f7db64aeefeab/skills/vue-testing-best-practices/SKILL.md), router and adaptable-composable prompts, selected async/component-testing references, inventory and MIT license.

Testing routes concrete symptoms to references: missing Pinia injection, async setup/Suspense, `flushPromises`, lifecycle-dependent composables, Teleport queries, and snapshot-only coverage. Router targets guard behavior on parameter changes, stale data from reused components, and redirect loops. `create-adaptable-composable` is unusually small and specific: distinguish writable refs from readonly/getter inputs, normalize within reactive effects, and do not accidentally invoke a callback as a getter.

The README describes baseline-versus-skill evaluation, but that description alone is not a published reproducible result for the sampled files. Avoid inheriting every framework preference, and verify minimum APIs against the consumer's actual Vue version rather than the broad Vue 3 compatibility field.

**Disposition:** prepare adaptable-composable or Vue testing before another all-purpose Vue skill. A useful test would combine an async component or injected store with a getter input and check that the proposed fix preserves reactivity without rewriting the project's API style.

### 13. Liran Tal — hold secure-code rules after a reproduced counterexample

**Inspected:** [child-process rule](https://github.com/lirantal/agent-rules/blob/4df076e0c55f814386b8fb379ea567da710ba4e9/__template__/nodejs/secure-code/child-process.md), [filesystem rule](https://github.com/lirantal/agent-rules/blob/4df076e0c55f814386b8fb379ea567da710ba4e9/__template__/nodejs/secure-code/file-system.md), testing template, template inventory, README and Apache-2.0 license. The CLI/adapters were not executed or fully audited. The source templates have `applyTo` globs for JavaScript/TypeScript; adapters are a separate concern.

The filesystem rule suggests confirming containment by checking that a resolved path starts with the base directory. We reproduced that recommendation accepting a sibling directory using our own Node probe:

```text
base: /srv/uploads
input: ../uploads-other/secret.txt
resolved: /srv/uploads-other/secret.txt
resolved.startsWith(base): true
```

This demonstrates a deficiency in the textual recommendation, not an exploit tested against the repository's CLI. It also does not address symlink containment. The child-process rule prohibits `exec` but then lists `execSync` as an acceptable synchronous alternative, and recommends `--` without qualifying whether the target command supports it. These internal inconsistencies warrant a correction pass before recommending the security rules verbatim.

**Disposition:** hold these templates. The idea of scoped Node security guidance remains useful, but use corrected upstream content at a new pin or a separately authored adaptation. Do not let the Apache license or security-focused branding substitute for checking the actual recommendations.

### 14. Awesome Copilot — prefer Markdown accessibility to generic JS preferences

**Inspected:** [Markdown accessibility](https://github.com/github/awesome-copilot/blob/613efc8c21d9b3ce642dff361d17006cd9967e28/instructions/markdown-accessibility.instructions.md), Node/Vitest and security/OWASP instruction samples, inventories, README and MIT license. This is a sample of a large corpus, not a complete review of its thousands of files.

Markdown accessibility has an explicit `**/*.md` scope and concrete checks for contextual link text, useful alt text, heading structure, list semantics and multimedia alternatives. It separates author judgment from mechanical findings. This is a more distinct gap than another broad coding rule, though a linter can enforce part of it.

The Node/Vitest sample embeds much stronger preferences: ESM/Node version, no `null`, functions over classes, Vitest for all testing, and no restructuring code for testability. Those are unsuitable as universal project guidance and can conflict with the user's conventions. `applyTo` is Copilot-specific; portable `AGENTS.md` installation must preserve conditional scope rather than flattening it into an always-on rule.

**Disposition:** investigate the accessibility instruction as a named candidate. Do not import generic stack bundles. For each candidate inspect its exact file and references; the repository's MIT license and marketplace presence do not establish correctness of every contribution.

### 15. Awesome Cursor Rules — sampled entries add little beyond existing coverage

**Inspected:** [anti-overengineering](https://github.com/PatrickJS/awesome-cursorrules/blob/b044f956f021b6e8877f16781bcfc466a6a120e9/rules/anti-overengineering.mdc), ai-agent-specialist, a Python/FastAPI sample, tree and CC0-1.0 license. Current samples are `.mdc` with descriptions, globs and `alwaysApply: false`, not merely legacy `.cursorrules` files.

Anti-overengineering is a short restatement of focused changes and avoiding unnecessary abstraction/dependencies. The general agent-specialist sample adds arbitrary constraints such as a 20-line maximum function and preferring interfaces. The FastAPI sample is mostly a list of familiar framework practices and a folder structure, with an unqualified suggestion to use background tasks for long operations. None of these samples demonstrates missing procedural knowledge or version-specific expertise.

**Disposition:** pass on the sampled rules for now; retain the repository as a discovery corpus. This does not reject unsampled files. A future rule should target a concrete framework failure and retain Cursor scoping, or be an explicitly adapted conditional rule for our hosts.

## Source findings — broader workflow and specialist alternatives

### ECC — inspect isolated research guidance; defer the learning runtime

**Inspected:** [search-first](https://github.com/affaan-m/ECC/blob/30b68924ae9729159f44326aa3134b1d9d67c0e2/skills/search-first/SKILL.md), strategic-compact and continuous-learning-v2 prompts, their configuration/hook inventories, observer entrypoint excerpts, plugin hook manifest and MIT license. Search-first has a useful availability preflight: missing registry, search or docs access must not become a false claim that nothing exists. Its adopt/extend/build comparison overlaps Ponytail and our discovery skill, while its implementation phase can install packages or configure MCP connections.

Continuous-learning-v2 captures prompts/tool use into project-scoped observations and derives confidence-scored instincts that may be promoted across projects. Its background observer is disabled by default in the inspected config; this does not establish that all observation capture is disabled. The guide specifies platform limits and persistent data outside host configuration. Strategic compaction depends on a transcript-reading hook outside the skill directory, so a copied prompt alone is incomplete.

**Disposition:** consider search-first only if a reuse/research gap remains after Ponytail comparison. Defer full ECC and learning integration: session capture, background model calls, promotion and hook installation need independent review. Confidence numbers on learned instincts are not measured task-success probabilities.

### Spec Kit — cross-artifact consistency is its clearest distinct capability

**Inspected:** [analyze command template](https://github.com/github/spec-kit/blob/505781d7cabb5180b7098a7d8371c48456f9d4f6/templates/commands/analyze.md), specify/implement templates, prerequisite script, tree and MIT license. It checks agreement across `spec.md`, `plan.md`, and `tasks.md`, including ambiguous/duplicate requirements, coverage, constitution conflicts and sequencing. It expects `.specify` scaffolding and feature-path resolution; it is not a standalone SKILL.md copy.

Even the nominally non-destructive analyze command inspects configured extension hooks and directs execution of enabled mandatory hooks. That does not make every analysis run a pure read-only operation. Initializer/templates, hook trust, branch conventions and implementation commands belong in the integration review.

**Disposition:** consider a linked specification workflow for projects that want its artifact contract. Compare consistency checking with our lighter planning workflow; avoid introducing its scaffold just to get ordinary planning or clarification.

### BMAD — walkthrough is renderer-dependent; project-context has a useful preservation ledger

**Inspected:** [walkthrough entrypoint](https://github.com/bmad-code-org/BMAD-METHOD/blob/61e01f82644c4bb533750cfa0d6d61ab61d2cc9b/skills/bmad-walkthrough/SKILL.md), [project-context skill](https://github.com/bmad-code-org/BMAD-METHOD/blob/61e01f82644c4bb533750cfa0d6d61ab61d2cc9b/skills/bmad-project-context/SKILL.md), walkthrough resource inventory, README and MIT license. Walkthrough invokes `uv run --no-cache` on a project-installed `_bmad/scripts/render_skill.py` and follows the rendered workflow. It explicitly halts or offers setup when that runtime is absent: the short entrypoint is not the full portable procedure.

Project-context's strongest idea is an instruction-preservation ledger: retain, rewrite, relocate, automate or delete each existing instruction, with evidence and a visible approval state. It checks relocated material is actually loadable and distinguishes approval of a rewritten block from approval of losing a rule. It also reads customization/configuration scripts and callbacks in the BMAD project setup and prescribes extensive user interaction.

**Disposition:** link BMAD for users choosing its methodology; do not copy renderer stubs. The preservation-ledger technique is worth researching for our existing `agents-md-authoring`, but an adapted change would need separate design and evidence. No BMAD instructions were activated during this review.

### GSD Core — valuable recovery artifacts, tightly coupled commands

**Inspected:** [plan-phase](https://github.com/open-gsd/gsd-core/blob/78d3ef62d722293bd167c4e6e060661ac3c8eade/skills/gsd-plan-phase/SKILL.md), [resume-work](https://github.com/open-gsd/gsd-core/blob/78d3ef62d722293bd167c4e6e060661ac3c8eade/skills/gsd-resume-work/SKILL.md), tree, README, hook manifest and MIT license. Plan-phase orchestrates researcher, planner and plan-checker roles; it has separate research-only modes and flags for gaps, imported ADRs and acceptance criteria. Resume restores `STATE.md`, checkpoints and plans without summaries.

The inspected skill entrypoints include `@~/.claude/gsd-core/workflows/...` references and depend on installed workflows/tools; their portable form is produced by the installer, not by copying one file. Plan-phase also exposes an explicit flag suppressing human checkpoints for one-way decisions. That option must never be implied by catalog installation or a vague request to keep working.

**Disposition:** retain as a linked workflow alternative with runtime/setup scope, not an independent planning or handoff skill. Compare its artifacts and execution cost with Matt's handoff and simple plan files. Resolve the old archived GSD link to this current source before future reviews.

### Context Engineering skills — more useful for agent builders than everyday coding

**Inspected:** [filesystem-context](https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering/blob/9ff0c99108b36d3b886defd825d8ac1f47dba374/skills/filesystem-context/SKILL.md), context-compression and tool-design entrypoints, reference inventories, README and MIT license. Filesystem-context covers output offloading, targeted retrieval, isolated worker files, scratchpad retention, stale references and evidence stored alongside runs. Compression and tool design are separated by job rather than all firing for the same context problem.

Much of the material prescribes changes to tool adapters, output formats or the agent harness; a skill inside an existing host cannot necessarily implement them. File-backed memory and self-modification also overlap our retrospective workflow and require validation of persisted preferences. Pseudocode, token thresholds and claimed savings are illustrative, not measurements for these hosts.

**Disposition:** retain tool-design or filesystem-context as specialist candidates for people building agent systems. Avoid adding the whole conceptual collection to ordinary coding projects. Verify all selected local references before proposing a copied entry.

### Beads — a task database integration, not a Markdown memory trick

**Inspected:** [plugin skill](https://github.com/gastownhall/beads/blob/f3c47390e7885c6cbfc0fd043b4a7a90d002755e/plugins/beads/skills/beads/SKILL.md), generated skill-template entrypoint, tree, README and MIT license. The canonical repository now resolves to `gastownhall/beads`. The inspected skill expects an initialized `bd` CLI/Dolt-backed task store, uses dependency-aware ready work and atomic claims, records progress and closes tasks, and may push to a configured Dolt remote.

It delegates current CLI guidance to `bd prime` and even warns its static command details may be stale beyond a specified version. Its resources and hooks are part of the complete workflow. That is useful for existing Beads users, but copying the prompt supplies neither the database nor current tool behavior. Initialization and remote sync are separate authorized operations.

**Disposition:** defer unless durable shared task tracking is an observed need. If added, use a linked integration with storage/init/sync requirements; do not describe it as a lightweight replacement for host to-do lists without measuring the setup cost.

### Agent Scripts — a Swift specialist is more promising than the global rule file

**Inspected:** README, shared `AGENTS.MD`, [Swift concurrency skill](https://github.com/steipete/agent-scripts/blob/1159adf26ad007df38b87debb107d3946008d38b/skills/swift-concurrency-expert/SKILL.md), its two reference files, documentation-helper source and MIT license. The shared setup contains personal paths and sibling-repository symlinks, so adopting the global instructions or sync topology would break our self-contained install contract.

Swift concurrency is a more useful discrete artifact: captures exact diagnostics, identifies actor/default-isolation context, distinguishes UI from background work, and favors safe Sendable/isolation fixes over unchecked conformance. It attributes itself to `Dimillian/Skills`; verify that original source and terms before treating this copy as canonical. The docs-list helper uses document summary/read-when metadata for discovery but requires a repository to adopt that convention.

**Disposition:** pursue the original Swift source if we add Apple-development coverage. Defer global agent-scripts installation and avoid inheriting the author's personal environment conventions.

### Taste Skill and Anthropic frontend-design — different enforcement/cost tradeoffs

**Inspected:** [Taste prompt](https://github.com/Leonxlnx/taste-skill/blob/6010f91a9935f1c167dfc500fb1a475681892e6b/skills/taste-skill/SKILL.md), script inventory and selected script entrypoints, README and MIT license; [Anthropic prompt](https://github.com/anthropics/skills/blob/dbd4588f9e1033efb41dad4bef2f7947c8993d44/skills/frontend-design/SKILL.md) and its local Apache-2.0 `LICENSE.txt`. The latter is a non-document skill; the source-available license restriction on Anthropic document skills must not be generalized to this file.

Taste's directory is `skills/taste-skill`, but its frontmatter name is `design-taste-frontend`: direct copying under the source folder name would fail our name/directory invariant. It deals candidate art directions using library data, requires a subject-specific concept, searches image sources, and lints/inspects real browser output at multiple widths. It writes `.taste-skill/` project artifacts and requires Node 22+ plus Chrome-family tooling for the full path. Its strict aesthetic rules may reject a valid house style; reference overrides and fallback behavior need review. The complete browser/media script chain was not audited or run.

Anthropic's sampled skill has a simpler subject-first design plan, brief review, build and critique loop, with responsive/accessibility expectations and screenshot review when supported. It prescribes no equivalent bundled inspector. Many hosts already provide closely related frontend guidance.

**Disposition:** keep Taste as an opt-in specialist alternative after checking latency, resource closure and brand compliance. Anthropic is the simpler baseline; a local Apache license permits considering a future vendor review, but host overlap may still make a new entry redundant. Do not infer better visual outcomes from an inspector passing its own aesthetic rules.

### Expo — official version-sensitive guidance with outbound feedback steps

**Inspected:** [router](https://github.com/expo/skills/blob/55ec65cd16499f20f14fb10fe99a2e62901b00a1/plugins/expo/skills/expo-router/SKILL.md), upgrade and native-module prompts, tree, README and MIT license. These contain platform-specific details absent from a generic React skill: native stacks/tabs/sheets, module-class registration across Swift/Kotlin/TypeScript, and SDK migration references. The upgrade path includes dependency resolution, cache clearing and potentially `prebuild --clean`; those commands need project-specific review, especially with hand-maintained native directories.

The prompts also suggest sending actionable feedback using a `submit-expo-feedback@latest` CLI, or loading a feedback skill. That is outbound communication and package execution, not an implicit permission granted by requesting local Expo work. No feedback was sent in this research.

**Disposition:** keep router or native-module as a project-matched candidate; prefer linking fast-changing SDK upgrade guidance. Any entry must preserve user control over destructive regeneration, paid EAS services and outbound reports. Validate example APIs against the consumer's installed SDK.

### Remotion — the popular best-practices name is now a router

**Inspected:** [best-practices](https://github.com/remotion-dev/skills/blob/039e8a2fc78b67efc228d5645367838b85818a1c/skills/remotion-best-practices/SKILL.md), render prompt, file tree, package metadata and README. At 4.0.537, best-practices routes to embedded `REFERENCE.md` subtrees for creation, markup, maps, captions, multimedia, Studio, SaaS and upgrades. Those embedded paths exist in the pinned tree; it is not enough to copy the root prompt.

The router favors opening Studio while making a video and renders only when explicitly requested. That is a product-flow choice worth exposing in `useWhen`. The separate render skill is a thin CLI guide and links rendering/transparency references. Package metadata points back to the Remotion monorepo's skills package, so provenance/freshness should track that relationship. No root or per-skill LICENSE file was found in this repository's recursive inventory; do not assume the software package's terms cover all skill content.

**Disposition:** linked specialist entry if video work becomes a catalog priority. Hold vendoring until the applicable license and canonical source are established. No render was performed.

## Source findings — discovery repositories

| Repository | Specific findings from this pass | Catalog consequence |
| --- | --- | --- |
| [VoltAgent/awesome-agent-skills](https://github.com/VoltAgent/awesome-agent-skills) | Only four files in the pinned inventory: a link directory rather than a skill distribution. Groups maintainers and community sources, including security, infrastructure and provider ecosystems. Some links route through a directory service rather than directly to source. Root MIT covers this index, not every linked artifact. | Keep for discovery; follow through to original files and current repositories. No installable entry proposed. |
| [sickn33/agentic-awesome-skills](https://github.com/sickn33/agentic-awesome-skills) | 26,949 files across canonical and plugin surfaces; a whole-tree count would greatly overstate distinct skills. `LICENSE` is MIT for tooling, while `LICENSE-CONTENT` assigns CC-BY-4.0 to original non-code content and points to `docs/sources/sources.md` for third-party exceptions. | Do not call the entire content corpus MIT or re-vendor a giant bundle. Trace a selected skill's ancestry, terms, duplicates and install surface first. Only inventory, root terms and selected README sections were reviewed. |
| [VoltAgent subagents](https://github.com/VoltAgent/awesome-claude-code-subagents) | Sample `code-reviewer.md` has inherited model selection but Write/Edit/Bash tools, arbitrary coverage/complexity targets, a context-manager protocol, and illustrative delivery statistics. These are broad persona conventions rather than a narrowly evidenced review procedure. Root MIT present. | Pass on the sampled generic reviewer; stronger overlap with our existing reviewer than novelty. Do not treat illustrative success numbers as actual evaluations. Other agents remain unreviewed. |
| [Trail of Bits curated marketplace](https://github.com/trailofbits/skills-curated) | Marketplace and README distinguish internally reviewed sources from original Trail of Bits skills and list external approved marketplaces. Root CC-BY-SA-4.0 present; individual plugin origins/terms still vary. | Useful cross-check on source selection. Staff review is a curation claim, not proof of behavioral benefit or blanket permission to copy external skills. No full plugin audit here. |
| [JetBrains/skills](https://github.com/JetBrains/skills) | README reports a flat snapshot of 129 skills from 15 repos with per-skill `metadata.source`. Scanner CI enforces changed-skill error findings while a manual full audit uploads reports without blocking. Its event path filters include SKILL.md and selected root files, so a reference/script-only change does not necessarily trigger that workflow. No root license file; local licenses exist for some skills. | “Verified” is narrower than a current behavioral/security guarantee. Prefer canonical upstream sources and check per-file terms. We inspected README, tree, workflow and scanner launcher, not all skills or report artifacts. |
| [antfu/skills-pack](https://github.com/antfu/skills-pack) | Package metadata lists selections from Matt Pocock, vuejs-ai, Anthropic, Vercel and others; this is not solely Anthony Fu-authored guidance. The README's update path can fetch newer upstream versions. Package development also configures Git hooks in `prepare`. Root MIT does not supersede third-party licenses. | Keep as discovery/distribution research. Do not introduce its package/update or hook workflow as a side effect of catalog admission. Pin the original artifact instead of treating a pack name as provenance. |

## Revised admission queue

These are recommendations for the next implementation/review pass, not entries added by this research.

| Action | Candidate | Remaining work before adding |
| --- | --- | --- |
| Prepare first | Matt handoff | Read final bundle/license byte-for-byte; check explicit invocation and handoff acceptance criteria in both hosts. |
| Prepare first, linked | Trail of Bits property-based-testing and variant-analysis | Capture exact resource/optional workflow boundaries; explain CC-BY-SA licensing and overlap. |
| Prepare first | Sentry secret-serialization | Finish language-reference review; retain opt-in scope and private-evidence limitations; do not inherit unrelated Sentry conventions. |
| Prepare for matching projects | Cloudflare Workers; vuejs-ai adaptable-composable or testing | Complete chosen reference-tree review; match configured platform/framework versions and host skill overlap. |
| Alternative only | Ponytail core | Compare against focused-change rules; keep session persistence explicit and exclude plugin runtime from a prompt install. |
| Linked workflow review | Matt architecture; Planning with Files; HashiCorp terraform-test | Disclose sibling skills/CDNs, hook runtime, or plan/apply behavior respectively; inspect complete selected runtime when relevant. |
| Hold for correctness or terms | Supabase SQL; Liran Tal secure-code; Sentry Django subtree; Remotion copying | Reproduce SQL concerns, obtain corrected upstream rules, clarify mixed/local terms, or establish license/canonical source. |
| Pass/defer current samples | Generic Cursor/Copilot JS rules; VoltAgent reviewer; full ECC/BMAD/GSD; extra browser stack | Need a specific gap or a project deliberately choosing the integration. Preserve discovery links for future needs. |

## Next research batch and admission criteria

Use the revised queue above to scope a small admission batch:

1. Finish resource and licensing review for handoff, property-based-testing, variant-analysis and secret-serialization.
2. Pick one project-specific candidate from Workers and Vue guidance rather than adding every framework.
3. Validate the Supabase SQL concerns and seek corrected Liran Tal rules before admitting those sources.
4. Review the complete runtime only when proposing a linked workflow or tool integration, including Planning with Files and browser alternatives.
5. Keep private/author-run benchmark evidence separate from our own evaluations and record untested host assumptions.

For each proposed entry, record the exact file, pinned revision, license file, resource/script inventory, trigger, compatible hosts, overlap with named entries and host built-ins, and a reason to add, defer, or reject. Read every shipped file before vendoring. Preserve the consumer's authorization boundaries and project conventions, and keep installs self-contained. Use `linked` when licensing or bundle coupling makes copying unsuitable. Start accepted entries at `reviewed`; only linked evidence can justify a higher level.

A small representative task is useful when differentiating alternatives: minimal-change completeness for Ponytail, constraint retention for handoff, a concrete security or SQL failure for specialist guidance, and recovery after compaction for persistent planning. Behavioral comparisons are follow-up work, not something this screening pass has performed. Record final admission choices in `docs/decisions.md`, regenerate indexes only when entries change, and run `bun run check`.

## Source snapshots

Public HEAD revisions resolved on 2026-10-20 using `git ls-remote`; file counts come from recursive GitHub tree responses, all reported untruncated. These are research anchors, not approved vendor revisions. A root license label does not settle third-party or file-specific notices. Source-file links in the findings resolve to these commits. Temporary downloaded source copies are outside this repository and are not required to use the research document.

| Repository snapshot | Full commit | Blob files | License source inspected |
| --- | --- | --- | --- |
| [DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail/tree/09c434ab73ca43761c5d8b0c5d341926c2fba710) | `09c434ab73ca43761c5d8b0c5d341926c2fba710` | 214 | [MIT](https://github.com/DietrichGebert/ponytail/blob/09c434ab73ca43761c5d8b0c5d341926c2fba710/LICENSE) |
| [JetBrains/skills](https://github.com/JetBrains/skills/tree/e0f258b5cfed145015cb3e48da9a97947f7c4ed7) | `e0f258b5cfed145015cb3e48da9a97947f7c4ed7` | 1,840 | No root license; inspect each skill |
| [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill/tree/6010f91a9935f1c167dfc500fb1a475681892e6b) | `6010f91a9935f1c167dfc500fb1a475681892e6b` | 69 | [MIT](https://github.com/Leonxlnx/taste-skill/blob/6010f91a9935f1c167dfc500fb1a475681892e6b/LICENSE) |
| [OthmanAdi/planning-with-files](https://github.com/OthmanAdi/planning-with-files/tree/de837a95cc845b6341a6cbfd902a89a8190c568e) | `de837a95cc845b6341a6cbfd902a89a8190c568e` | 759 | [MIT](https://github.com/OthmanAdi/planning-with-files/blob/de837a95cc845b6341a6cbfd902a89a8190c568e/LICENSE) |
| [PatrickJS/awesome-cursorrules](https://github.com/PatrickJS/awesome-cursorrules/tree/b044f956f021b6e8877f16781bcfc466a6a120e9) | `b044f956f021b6e8877f16781bcfc466a6a120e9` | 295 | [CC0-1.0](https://github.com/PatrickJS/awesome-cursorrules/blob/b044f956f021b6e8877f16781bcfc466a6a120e9/LICENSE) |
| [VoltAgent/awesome-agent-skills](https://github.com/VoltAgent/awesome-agent-skills/tree/68dd71d55456414e9b4ae2f7385283985b8cba4a) | `68dd71d55456414e9b4ae2f7385283985b8cba4a` | 4 | [MIT index; linked content separate](https://github.com/VoltAgent/awesome-agent-skills/blob/68dd71d55456414e9b4ae2f7385283985b8cba4a/LICENSE) |
| [VoltAgent/awesome-claude-code-subagents](https://github.com/VoltAgent/awesome-claude-code-subagents/tree/408d3c9eee2d0c75c12a3abb5de29e53c2ca6b9e) | `408d3c9eee2d0c75c12a3abb5de29e53c2ca6b9e` | 198 | [MIT](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/408d3c9eee2d0c75c12a3abb5de29e53c2ca6b9e/LICENSE) |
| [affaan-m/ECC](https://github.com/affaan-m/ECC/tree/30b68924ae9729159f44326aa3134b1d9d67c0e2) | `30b68924ae9729159f44326aa3134b1d9d67c0e2` | 4,627 | [MIT](https://github.com/affaan-m/ECC/blob/30b68924ae9729159f44326aa3134b1d9d67c0e2/LICENSE) |
| [antfu/skills](https://github.com/antfu/skills/tree/feb0f3aba6566426f12230e7fc7a10d97c1293bb) | `feb0f3aba6566426f12230e7fc7a10d97c1293bb` | 178 | [MIT](https://github.com/antfu/skills/blob/feb0f3aba6566426f12230e7fc7a10d97c1293bb/LICENSE.md) |
| [antfu/skills-pack](https://github.com/antfu/skills-pack/tree/0dfbee841aefe34f983efeb67f2a40f4b5942642) | `0dfbee841aefe34f983efeb67f2a40f4b5942642` | 18 | [MIT pack; upstream terms separate](https://github.com/antfu/skills-pack/blob/0dfbee841aefe34f983efeb67f2a40f4b5942642/LICENSE) |
| [anthropics/skills](https://github.com/anthropics/skills/tree/dbd4588f9e1033efb41dad4bef2f7947c8993d44) | `dbd4588f9e1033efb41dad4bef2f7947c8993d44` | 445 | [Apache-2.0 for sampled frontend-design](https://github.com/anthropics/skills/blob/dbd4588f9e1033efb41dad4bef2f7947c8993d44/skills/frontend-design/LICENSE.txt) |
| [bmad-code-org/BMAD-METHOD](https://github.com/bmad-code-org/BMAD-METHOD/tree/61e01f82644c4bb533750cfa0d6d61ab61d2cc9b) | `61e01f82644c4bb533750cfa0d6d61ab61d2cc9b` | 584 | [MIT](https://github.com/bmad-code-org/BMAD-METHOD/blob/61e01f82644c4bb533750cfa0d6d61ab61d2cc9b/LICENSE) |
| [cloudflare/skills](https://github.com/cloudflare/skills/tree/86505e44f87d801aa1864a3c4109e9a8ae5c409f) | `86505e44f87d801aa1864a3c4109e9a8ae5c409f` | 237 | [Apache-2.0](https://github.com/cloudflare/skills/blob/86505e44f87d801aa1864a3c4109e9a8ae5c409f/LICENSE) |
| [expo/skills](https://github.com/expo/skills/tree/55ec65cd16499f20f14fb10fe99a2e62901b00a1) | `55ec65cd16499f20f14fb10fe99a2e62901b00a1` | 194 | [MIT](https://github.com/expo/skills/blob/55ec65cd16499f20f14fb10fe99a2e62901b00a1/LICENSE) |
| [gastownhall/beads](https://github.com/gastownhall/beads/tree/f3c47390e7885c6cbfc0fd043b4a7a90d002755e) | `f3c47390e7885c6cbfc0fd043b4a7a90d002755e` | 5,075 | [MIT](https://github.com/gastownhall/beads/blob/f3c47390e7885c6cbfc0fd043b4a7a90d002755e/LICENSE) |
| [getsentry/skills](https://github.com/getsentry/skills/tree/f57ada2d0b640406ea7e25b11d636c530e77c58b) | `f57ada2d0b640406ea7e25b11d636c530e77c58b` | 158 | [Apache-2.0 root; local notices differ](https://github.com/getsentry/skills/blob/f57ada2d0b640406ea7e25b11d636c530e77c58b/LICENSE) |
| [github/awesome-copilot](https://github.com/github/awesome-copilot/tree/613efc8c21d9b3ce642dff361d17006cd9967e28) | `613efc8c21d9b3ce642dff361d17006cd9967e28` | 3,524 | [MIT](https://github.com/github/awesome-copilot/blob/613efc8c21d9b3ce642dff361d17006cd9967e28/LICENSE) |
| [github/spec-kit](https://github.com/github/spec-kit/tree/505781d7cabb5180b7098a7d8371c48456f9d4f6) | `505781d7cabb5180b7098a7d8371c48456f9d4f6` | 983 | [MIT](https://github.com/github/spec-kit/blob/505781d7cabb5180b7098a7d8371c48456f9d4f6/LICENSE) |
| [hashicorp/agent-skills](https://github.com/hashicorp/agent-skills/tree/f706481af9b8fedb66de909f6243ad29601afa0c) | `f706481af9b8fedb66de909f6243ad29601afa0c` | 126 | [MPL-2.0](https://github.com/hashicorp/agent-skills/blob/f706481af9b8fedb66de909f6243ad29601afa0c/LICENSE) |
| [lirantal/agent-rules](https://github.com/lirantal/agent-rules/tree/4df076e0c55f814386b8fb379ea567da710ba4e9) | `4df076e0c55f814386b8fb379ea567da710ba4e9` | 100 | [Apache-2.0](https://github.com/lirantal/agent-rules/blob/4df076e0c55f814386b8fb379ea567da710ba4e9/LICENSE) |
| [mattpocock/skills](https://github.com/mattpocock/skills/tree/5beb35b040e3de97e54fa9e386d7e42d15c295c2) | `5beb35b040e3de97e54fa9e386d7e42d15c295c2` | 191 | [MIT](https://github.com/mattpocock/skills/blob/5beb35b040e3de97e54fa9e386d7e42d15c295c2/LICENSE) |
| [microsoft/playwright-mcp](https://github.com/microsoft/playwright-mcp/tree/ab6d67cbf8b619338f096980806fdbe29432cc4d) | `ab6d67cbf8b619338f096980806fdbe29432cc4d` | 39 | [Apache-2.0](https://github.com/microsoft/playwright-mcp/blob/ab6d67cbf8b619338f096980806fdbe29432cc4d/LICENSE) |
| [muratcankoylan/Agent-Skills-for-Context-Engineering](https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering/tree/9ff0c99108b36d3b886defd825d8ac1f47dba374) | `9ff0c99108b36d3b886defd825d8ac1f47dba374` | 511 | [MIT](https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering/blob/9ff0c99108b36d3b886defd825d8ac1f47dba374/LICENSE) |
| [open-gsd/gsd-core](https://github.com/open-gsd/gsd-core/tree/78d3ef62d722293bd167c4e6e060661ac3c8eade) | `78d3ef62d722293bd167c4e6e060661ac3c8eade` | 4,001 | [MIT](https://github.com/open-gsd/gsd-core/blob/78d3ef62d722293bd167c4e6e060661ac3c8eade/LICENSE) |
| [remotion-dev/skills](https://github.com/remotion-dev/skills/tree/039e8a2fc78b67efc228d5645367838b85818a1c) | `039e8a2fc78b67efc228d5645367838b85818a1c` | 293 | No LICENSE found in pinned inventory |
| [sickn33/agentic-awesome-skills](https://github.com/sickn33/agentic-awesome-skills/tree/32b8ad933cfb84065a4ce5304c2557c9e39b25fa) | `32b8ad933cfb84065a4ce5304c2557c9e39b25fa` | 26,949 | [MIT tooling; CC-BY-4.0 original non-code; exceptions](https://github.com/sickn33/agentic-awesome-skills/blob/32b8ad933cfb84065a4ce5304c2557c9e39b25fa/LICENSE-CONTENT) |
| [steipete/agent-scripts](https://github.com/steipete/agent-scripts/tree/1159adf26ad007df38b87debb107d3946008d38b) | `1159adf26ad007df38b87debb107d3946008d38b` | 228 | [MIT; check copied-source notices](https://github.com/steipete/agent-scripts/blob/1159adf26ad007df38b87debb107d3946008d38b/LICENSE) |
| [supabase/agent-skills](https://github.com/supabase/agent-skills/tree/c9be0e931b7930f7d02126d04774d904c381e7d7) | `c9be0e931b7930f7d02126d04774d904c381e7d7` | 61 | [MIT](https://github.com/supabase/agent-skills/blob/c9be0e931b7930f7d02126d04774d904c381e7d7/LICENSE) |
| [trailofbits/skills](https://github.com/trailofbits/skills/tree/5c99c03fb8a9ea568432ecbcba5d86e9f4ac2bf0) | `5c99c03fb8a9ea568432ecbcba5d86e9f4ac2bf0` | 1,486 | [CC-BY-SA-4.0](https://github.com/trailofbits/skills/blob/5c99c03fb8a9ea568432ecbcba5d86e9f4ac2bf0/LICENSE) |
| [trailofbits/skills-curated](https://github.com/trailofbits/skills-curated/tree/6d05be4889017b06fb15069f371afd220daffb62) | `6d05be4889017b06fb15069f371afd220daffb62` | 614 | [CC-BY-SA-4.0 root; plugin origins vary](https://github.com/trailofbits/skills-curated/blob/6d05be4889017b06fb15069f371afd220daffb62/LICENSE) |
| [vercel-labs/agent-browser](https://github.com/vercel-labs/agent-browser/tree/5ee8691339a5a002e4d7454eec95250253bc7419) | `5ee8691339a5a002e4d7454eec95250253bc7419` | 482 | [Apache-2.0](https://github.com/vercel-labs/agent-browser/blob/5ee8691339a5a002e4d7454eec95250253bc7419/LICENSE) |
| [vuejs-ai/skills](https://github.com/vuejs-ai/skills/tree/f5d4b3b869bb8a86ddfea148196f7db64aeefeab) | `f5d4b3b869bb8a86ddfea148196f7db64aeefeab` | 211 | [MIT](https://github.com/vuejs-ai/skills/blob/f5d4b3b869bb8a86ddfea148196f7db64aeefeab/LICENSE) |
