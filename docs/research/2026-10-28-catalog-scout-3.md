# Repository research and initialization — October 28, 2026

## Scope and baseline

**As of / researched:** October 28, 2026, America/Edmonton. Live, focused research into collections of skills, workflows, and hooks for understanding an existing repository or starting a new project. Recommendations are source-based curator judgments, not a benchmark of which framework produces better software.

Baseline: [October 20 survey](../research-2026-10.md), [October 27 scout](2026-10-27-catalog-scout.md), [hook admission](2026-10-28-catalog-scout-2.md), [hook portability](2026-10-28-hook-portability.md), `PLAN.md`, `CONTRIBUTING.md`, and [decisions 19–30](../decisions.md). Existing uncommitted catalog work was preserved. No guidance, packages, hooks, services, or framework installers were activated.

**Recommendation:** use a small portable collection by default. If the project needs a framework to own research, requirements, roadmap, and recovery state, **GSD Core is the closest fit to this particular job and the first framework to trial**. Choose OpenSpec when incremental specifications are the priority, Spec Kit when explicit requirements-to-design traceability is the priority, and Superpowers when an enforced development method is the priority. These are alternatives with different costs, not components to stack together.

## Recommended collection and sequence

This is a proposed composition of existing entries plus one missing procedure; it is not a new installed collection. The current `starter` collection is useful but includes debugging, which is not central to initialization.

| Stage | Preferred component | Useful output |
| --- | --- | --- |
| 1. Inspect the repository | Host file search/read and Git history; proposed scoped repo-research procedure below | Evidence-backed constraints, actual commands, integration seams, unknowns |
| 2. Clarify the goal | `grilling`; `domain-modeling` only for meaningful domain ambiguity | Scope, non-goals, acceptance criteria; vocabulary and decisions where warranted |
| 3. Research external choices | Native search of current official documentation; optional `context7` for version-specific gaps | Short comparison of alternatives with sources, dates, constraints, and a recommended choice |
| 4. Record durable guidance | `agents-md-authoring` | A small AGENTS.md containing verified commands and non-obvious project constraints |
| 5. Initialize and prove the foundation | `explore-plan-implement-review` with `verification-before-completion` | A runnable first slice, repeatable setup, meaningful checks, reviewed diff |
| 6. Preserve continuity when needed | `handoff` | Current state, unresolved decisions, and next concrete action |
| 7. Automate stable checks | Opt-in `format-after-edit` and `stop-gate-checks` | Consistent formatting and feedback when the fast completion gate fails |

For most projects the core is **grilling + agents-md-authoring + explore-plan-implement-review + verification-before-completion**. Domain modeling, handoff, Context7, and hooks are conditional additions. The host already provides exploration, planning, and review capabilities; this collection supplies a repeatable contract rather than a new execution engine. Do not install duplicate verification or planning skills when the chosen framework already includes them.

### The missing procedure: research to a verified foundation

1. **Establish what exists.** Read applicable instructions, repository status, manifests, workspace configuration, CI, representative tests, and relevant history. Separate intended rules from patterns merely observed in old code. Scope large repositories to the affected workspace and shared constraints.
2. **Separate project types.** For an existing repo, establish the current setup and failing checks before recommending replacements. For an empty repo, identify the user outcome, delivery constraints, supported platforms, and first useful behavior before selecting a stack. Do not generate a seven-file codebase map for an empty directory.
3. **Research decisions, not the whole internet.** List consequential unknowns. Prefer existing repo capabilities, then inspect maintained alternatives. Check current official version support, migration/deprecation notes, licenses, deployment fit, and operational cost. Label facts, inferences, and untested assumptions separately; stars do not settle architecture choices.
4. **Write only decision-useful artifacts.** Use existing document conventions. A compact research/decision record should include the question, sources and dates, chosen option, rejected alternatives, and what would invalidate the choice. Keep detailed research out of always-loaded instructions.
5. **Make setup repeatable.** Establish the selected runtime and package-manager versions, lockfile, documented setup/run/check commands, environment variable names with safe examples, and CI checks appropriate to the project. Preserve existing tooling. Use a devcontainer only when environmental isolation or onboarding friction justifies one.
6. **Prove one vertical slice.** Exercise installation, startup, and the first useful behavior. Run relevant lint, type, test, and build checks; inspect visible UI when applicable. Report commands actually run and distinguish a passing local foundation from deployment readiness.
7. **Add automation after the commands are stable.** Keep checks fast and choose events supported by the actual host. Validate invocation in a scratch session. Use CI as the shared enforcement point; local agent hooks provide earlier feedback.

This procedure is a proposed workflow design, not a universal 2026 standard or an evaluated skill. It should preserve existing authorization and avoid imposing extra approval gates for already-authorized reversible work.

## Coverage and observations

Surveyed six active candidate families plus the archived GSD predecessor, existing catalog components, current host guidance, skills.sh all-time/trending views, VoltAgent's directory, and searches for repo onboarding, initialization, scoped context guidance, and security-oriented codebase exploration. This is a focused sample, not an exhaustive census.

The [companion snapshot](2026-10-28-repo-initialization-sources.json) records public GitHub API observations, exact repository HEADs, dates, stars, archival status, source inventories, and inspection scope. Recursive tree responses were untruncated. A retrieved file or enumerated path is not necessarily a read file. Downloaded upstream files remained under `/tmp`; no upstream program was executed.

| Repository | Stars observed October 28 | HEAD commit date, UTC | Interpretation |
| --- | --- | --- | --- |
| obra/superpowers | 307,418 | October 21 | Established full-method option already cataloged |
| affaan-m/ECC | 291,736 | October 26 | Broad collection; old everything-claude-code URL redirects here |
| github/spec-kit | 143,659 | October 28 | Active specification/process toolkit |
| Fission-AI/OpenSpec | 73,264 | October 24 | Active incremental specification framework |
| gsd-build/get-shit-done | 64,197 | May 31 | Archived; do not recommend it as the active installation target |
| EveryInc/compound-engineering-plugin | 25,755 | October 28 | Existing catalog framework; changed source needs review |
| open-gsd/gsd-core | 10,974 | October 28 | Active separate repository reviewed for the GSD workflow |

Stars are repository attention, not skill adoption or outcome evidence. No growth rate is inferred. The [skills.sh all-time view](https://www.skills.sh/) displayed `grill-me` at 1.5M, `handoff` at 1.1M, and `grilling` at 1.0M; these are distinct artifact names and rounded CLI-channel install observations. The [trending view](https://www.skills.sh/trending) labeled its tab 24h and was dominated by design/media leads in the first visible rows. It supplied no reason to rank a repo-bootstrap framework first. No comparable active-user, cost, or success-rate data was available.

Official host overlap was checked using [Codex customization](https://learn.chatgpt.com/docs/customization/overview), [OpenAI's workflow recipe](https://developers.openai.com/cookbook/examples/codex/iterating-development-workflows-with-codex), [Claude Code best practices](https://code.claude.com/docs/en/best-practices), and the [Claude](https://code.claude.com/docs/en/hooks-guide) and [Codex](https://learn.chatgpt.com/docs/hooks) hook documentation. Both hosts already cover substantial instruction, skill, planning, and tool integration needs. Optional workflow document layouts in a cookbook are examples, not mandatory project files. Hook schemas and payloads remain host-specific.

## Recommend adding

**One narrow adapted skill is worth preparing: scoped repository research.** No full framework clears complete runtime inspection for a new admission in this pass.

**Source:** Compound Engineering's [repo-research-analyst](https://github.com/EveryInc/compound-engineering-plugin/blob/e86a51a744de2fc884752d86c817dc5351884fa2/skills/ce-plan/references/agents/repo-research-analyst.md), reviewed at `e86a51a744de2fc884752d86c817dc5351884fa2`. Read the entire role and root MIT license. The role itself has no required local resource imports or bundled scripts; syntax-aware search is optional. The containing `ce-plan` skill has a much larger dependency closure and is not approved by this isolated inspection.

**Gap and fit:** a bounded, evidence-backed assessment of an unfamiliar repo before initializing guidance or proposing changes. The useful technique is to detect manifests/workspaces first, scope exploration, separate documented conventions from observed patterns, and return only findings that change the plan. Usefulness and portability are high; quality is good for scoped inventory; novelty is moderate because native exploration already does much of the work. `agents-md-authoring` owns instruction writing, `domain-modeling` owns terminology, and `explore-plan-implement-review` owns execution; none defines this research output contract.

**Proposed admission:** independently adapted portable skill, tentatively `repo-research`, with the source and license recorded. Remove the parent framework's dispatch/completion contract; preserve existing host tool and authorization conventions. Require file evidence, uncertainty labels, verified-versus-discovered commands, and workspace scope. Avoid a permanent comprehensive architecture encyclopedia. No new runtime, hooks, MCP, issue access, or outbound writes should be required. If expression is copied rather than independently rewritten, retain the applicable MIT notice.

**Next step:** author the concrete skill, inspect its complete payload, compare its trigger with agents-md-authoring, and review it against a real unfamiliar repository before admission at `reviewed`. This report does not add that entry or claim measured benefit.

## Review next

### 1. GSD Core: first full-framework trial

**Identity:** `open-gsd/gsd-core`, snapshot `65638993a3aff373159b1a4d5585e5e5c48a9578`; [new-project entrypoint](https://github.com/open-gsd/gsd-core/blob/65638993a3aff373159b1a4d5585e5e5c48a9578/skills/gsd-new-project/SKILL.md), [onboard entrypoint](https://github.com/open-gsd/gsd-core/blob/65638993a3aff373159b1a4d5585e5e5c48a9578/skills/gsd-onboard/SKILL.md).

**Inspected:** complete README, three entrypoints (new-project, onboard, map-codebase), onboarding tutorial, hook manifest, MIT license; selected new-project workflow and researcher sections. The strongest match is its explicit questioning → ecosystem research → requirements → roadmap sequence and brownfield onboarding. Research spans stack, features, architecture, and pitfalls; results feed persistent `.planning/` state.

**Tradeoff:** installation rewrites runtime-specific integration; Markdown entrypoints alone are insufficient. CLI helpers, automatic document commits, research caching, and multiple hook handlers enlarge the review surface. The tutorial includes an optional permission-bypass launch example; retain normal permissions in a trial. Portability is an upstream claim pending installed-runtime testing, and no performance advantage has been measured here.

**Disposition:** highest-priority linked-framework review, not admission-ready. Read the installer, onboard workflow, imported references/templates, CLI research/cache/commit code, and every enabled hook script at a pinned revision; then trial initialization, interruption/recovery, and idempotent reruns in disposable greenfield and brownfield repos on the intended host. Full mapping remains required before new-project even when onboarding starts with its fast option.

### 2. OpenSpec: incremental adoption in existing repositories

**Identity:** `Fission-AI/OpenSpec`, snapshot `6d04a1b58dedc95729d34e4f223d9d483aae210a`; [explore skill](https://github.com/Fission-AI/OpenSpec/blob/6d04a1b58dedc95729d34e4f223d9d483aae210a/skills/openspec-explore/SKILL.md), [existing-project guide](https://github.com/Fission-AI/OpenSpec/blob/6d04a1b58dedc95729d34e4f223d9d483aae210a/docs/existing-projects.md).

**Inspected:** explore skill sections covering prerequisites, project/store discovery, scope and write boundaries, and capture; complete existing-project guide and MIT license. Its main advantage is documenting the next real change without specifying the whole existing codebase. It complements native planning by maintaining behavior specifications over time, rather than replacing repository setup tooling.

**Disposition:** linked-framework review next. Requires the OpenSpec CLI and generated project/tool scaffolding; inspect initialization, generated commands/templates, dependency resolution, and archive/spec-merge behavior before admission. Docs use `/opsx:*` aliases while the source skill uses `openspec-*` names: confirm actual generated commands for the selected host/version. Best for spec continuity, less direct for external stack research or environment bootstrapping.

### 3. Spec Kit: explicit research and design artifacts

**Identity:** `github/spec-kit`, snapshot `99e047e9b48c3ecbbc5c3e530fb45bed671960bc`; [plan template](https://github.com/github/spec-kit/blob/99e047e9b48c3ecbbc5c3e530fb45bed671960bc/templates/commands/plan.md).

**Inspected:** complete plan template, relevant README process/install sections, and MIT license. The concrete value is resolving technical unknowns into decisions with alternatives, then producing data models, interface contracts, and runnable validation guidance. This can suit teams wanting traceability beyond host plan mode; it is more process than a lightweight repo bootstrap needs.

**Dependencies and decision:** CLI, Python 3.11+, uv, integration scaffolding, setup scripts, templates, and optional extension hooks. Plan dispatches configured mandatory hooks, so integrations require explicit inspection. Current README also offers bugfix and assessment processes; the earlier survey's SDD-only characterization is incomplete. Keep in linked-framework review until CLI/setup scripts, templates, extension dispatch, and target-host generation are inspected. Prefer it when the team explicitly wants those artifacts.

## Watch / hold / skip

- **ECC search-first — hold verbatim admission.** Full [single-file skill](https://github.com/affaan-m/ECC/blob/25278e7d7b6cf6e6a4e7a6c8e10f14ff22f0eb5b/skills/search-first/SKILL.md) and root MIT license read at `25278e7d7b6cf6e6a4e7a6c8e10f14ff22f0eb5b`; no separate file in its skill subtree. Useful repo-first adopt/extend/build decision pattern and honest unavailable-channel reporting. Its database advice defaults toward MCP, its integration examples extend beyond repo initialization, and its HTTP client example implies general retries without explaining that [HTTPX transport retries cover connection errors/timeouts](https://www.python-httpx.org/advanced/transports/), not all transient failures. Prefer a narrower independently authored procedure over importing its tool preferences or the full ECC runtime. The earlier background-learning/runtime hold remains unresolved; the new canonical repository name does not clear it.
- **Planning with Files — retain runtime hold.** The [October 27 record](2026-10-27-catalog-scout.md#watch--hold--skip) still governs concurrent plans, recovery, selectors, and stop behavior. Persistent files are useful but already overlap host plans and handoff; no renewed source review here.
- **BMAD — optional full-method alternative.** Retain the [earlier renderer and project-context findings](../research-2026-10.md#bmad--walkthrough-is-renderer-dependent-project-context-has-a-useful-preservation-ledger). No new revision or runtime inspection in this pass. Its scope is broader than this requested bootstrap collection.
- **Archived GSD predecessor — skip as installation target.** Public API confirms `gsd-build/get-shit-done` is archived at `bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815`. Search results can still expose it. GSD Core is a separate active source and must be reviewed on its own merits; archived stars and users are not its adoption metrics.
- **Trail of Bits audit-context-building / devcontainer-setup — specialist leads.** [Upstream collection](https://github.com/trailofbits/skills) and discovery results identify potentially useful audit and isolated-environment jobs. No pinned payload/closure/license review in this pass. Audit-level line-by-line analysis is excessive for ordinary onboarding; a devcontainer is justified by environment needs, not its availability as a skill.
- **Large rules corpora / automatic skill packs — discovery only.** Current GitHub and VoltAgent results add leads, not evidence that a giant install improves initialization. Preserve the earlier antfu-pack packaging/hook hold and the Node/security-example holds. Use stack-owner guidance only when it matches the chosen versions and project job.

## Revisit existing entries

| Existing entry | Finding | Follow-up |
| --- | --- | --- |
| compound-engineering | New snapshot; ce-plan has many mandatory references, output tiers, review and handoff rules. The standalone repo analyst is more relevant to scoped reconnaissance than importing the whole plan method. | Review the full changed bundle before repinning. The best-practices researcher labels skill knowledge curated/tested and prioritizes it over official docs; curation alone does not establish correctness or evaluation. |
| superpowers | Snapshot `2ce8aa15d05bd57213e6f746f953aafb7ded7a8b`; complete bootstrap and hook manifest plus first brainstorming sections inspected, root MIT license read. Bootstrap still requires skill checks before responses; brainstorming now explicitly permits a trivial-task shortcut and user opt-out. | Keep as an alternative full method. Review changed resources before repinning; avoid describing every task as requiring the same ceremony. Visual-companion scripts and remaining sibling skills were not audited here. |
| agents-md-authoring | Strong initialization fit; detailed architecture/research should remain outside the always-loaded file. | Use existing entry; verify commands against the actual repo. No source change proposed. |
| context7 | Optional version-specific docs retrieval overlaps native browsing. Existing October 27 upstream-movement flag remains. | Review before repinning; do not require an MCP connection for basic research. |
| format-after-edit / stop-gate-checks | Relevant optional pair already present with host adapters. Stop gate is a bounded reminder, not proof of a successful final check. | Configure real existing commands and test live invocation. Keep CI authoritative; do not infer that synthetic payload tests validate every client. |
| post-edit-diagnostics / compact-context | Useful only when latency or lost state demonstrates a need. | Avoid duplicate full checks per edit; add compaction notes only for information actually lost. |

The hook choice is intentionally small. Protection hooks may be appropriate for specific project boundaries, but they are not a substitute for host permissions or CI. Initialization does not require notification hooks, automatic memory capture, a self-improvement loop, or a background model process.

## Changes since baseline

- Made the research-to-foundation sequence and greenfield/brownfield split explicit; the existing starter set is adjacent coverage rather than a complete initialization method.
- Reconfirmed the archived original GSD source and inspected the active GSD Core onboarding entrypoint/tutorial. It remains a linked runtime review candidate, not a standalone skill to copy.
- Added OpenSpec as a focused incremental-specification alternative. Refreshed Spec Kit's current research template and expanded process scope without clearing its runtime closure.
- Elevated the source-reviewed Compound Engineering repository-analysis role as inspiration for one portable adapted skill. Existing framework pins and ratings remain unchanged.
- Kept ECC's broader runtime hold and identified a specific retry-example limitation. All unrelated unresolved Actions security, sharp-edges, Durable Objects, Terraform, Supabase, Django, Vue testing, and other prior queues remain at the dispositions in the [October 27 report](2026-10-27-catalog-scout.md).

## Top priorities

1. **Addition proposal: prepare one scoped repo-research skill.** A smaller concrete gap than another entire methodology; use the inspected analyst role as inspiration, with evidence and uncertainty requirements.
2. **Research priority: trial GSD Core after reviewing runtime closure.** Best fit for integrated domain research and project initialization; compare setup cost and state recovery with the small collection above.
3. **Research priority: inspect OpenSpec's generated target-host integration.** Prefer it over a whole-codebase documentation initiative when incremental specs are the actual need.
4. **Existing-content composition: use the four-part lightweight core.** Add the optional domain, handoff, and documentation components only as needed; consider a small catalog collection after the missing workflow has a usable payload.
5. **Validation priority: test two configured hooks on the real host.** Formatting and a fast completion check offer a concrete benefit once project commands are repeatable. Keep optional diagnostics/compaction conditional.

Only priority 1 is a proposed new entry; priorities 2–3 are runtime research, and 4–5 concern composition and validation. No entries, ratings, pins, collections, generated indexes, or durable policy decisions changed. No installs, agent outcome evaluations, cost comparisons, or live hook invocations were performed.

## Repository verification

`bun run check` passed: type checking, Markdown lint, validation of 55 entries and four collections, generated-index consistency, and 96 tests. The initial sandboxed run could not bind the local fixture server; the permitted rerun passed. These checks validate repository structure and existing tests, not the effectiveness of the recommended collection.
