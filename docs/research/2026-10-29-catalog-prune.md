# Catalog-wide human-focused assessment, 2026-10-29

The user requested assessment of every catalog item against the new human-focused rubric. All **108 entries** now have `human-v1` profiles: **76 have complete scores out of 10; 32 remain incomplete with named inspection gaps; 9 have scoped blockers**. Blockers overlap the complete/incomplete groups. No active entry retains a legacy score. The three starter rule profiles are carried forward; this pass substantively assessed the other 105 entries.

Reviewed by Codex, an AI curator, as of 2026-10-29 (America/Edmonton). This is a single-reviewer static assessment, not independent human calibration, a runtime security clearance or new behavioral evidence. Weights remain provisional. The [rubric](../ratings.md) explains the seven criteria, unknowns and score interpretation.

## Coverage and method

Read the local installable entrypoints, relevant references and hook scripts. Retrieved linked resources at each metadata pin; read full small entrypoints and selected required references/runtime paths, and recorded exact inspected ranges for larger systems. **Fetching a file did not count as reading it.** No upstream installer, integration, helper, privilege change or telemetry activation was executed. Catalog validation tests check implementation consistency; they do not evaluate entry outcomes.

Each entry links to its assessment with context, baseline, seven rationales, scope, decisive tradeoff, retained prior findings, unknowns, blockers and next evidence. The [source manifest](../reviews/2026-10-29-catalog-assessment-sources.json) records payload SHA-256 digests, pinned URLs, inspected versus uninspected fetched files, line ranges, previous ratings and existing evidence links for the 105 new assessments. The [starter record](../reviews/2026-10-29-human-v1-starter.md) covers the other three.

Complete scores cover the inspected core and relevant paths. They do not clear unread optional examples, conditional references, adapters or licenses. For the 32 incomplete profiles, the required remaining core/reference/runtime inspection prevents a defensible dependability grade; Impeccable also lacks a human-control grade. Their aggregate remains null, with no midpoint or partial average substituted.

Existing `reviewed`/`used`/`tested`/`evaluated` levels and evidence links are preserved. Source pins, installable payloads, collections, relationships and install policy are unchanged. Recorded overlap guides comparisons, but not every host release or alternative received a fresh implementation audit. Expected value and burden are curator predictions. No popularity or adoption ranking was treated as effectiveness evidence.

## Dispositions

There are 72 keeps, 27 pending-inspection entries without a blocker, and 9 refresh recommendations for affected paths. “Keep” means retain for the stated use, not universal recommendation. Nothing is archived or removed, and no replacement is installed. Therefore there are no retirement dependency changes or consumer migrations.

Scoped blockers include confirmed source defects in the workflow artifact-download recipe, injectable AI-output remediation, server-helper process handling, global installation defaults and delete-before-tests instructions. The portless privileged setup, process-compose interpolation and Worktrunk approval concerns are retained findings from the earlier pinned-source reviews, explicitly distinguished from runtime paths not re-audited here.

## Ranked next actions

1. Refresh unsafe examples and authority policies: agentic-actions-auditor, github-actions-hardening, webapp-testing, find-skills, test-driven-development and Superpowers. Correct affected upstream paths or publish a separately reviewed adaptation; leave vendored payloads intact.
2. Inspect and bound privileged or approval-changing integration paths in portless, process-compose-mcp and Worktrunk before adopting them. This rating pass does not authorize setup or policy changes.
3. Close required reference and runtime gaps for the 32 incomplete profiles, prioritizing the entries someone actually intends to use. Inspect installed release artifacts as well as repository source where the two differ.
4. Obtain independent human judgments on 10–12 varied profiles, resolve dimension disagreements, and test weight sensitivity before treating small score differences as meaningful.
5. Compare a small explicitly authorized subset with the named simpler baseline on real tasks, recording corrections, interruptions, comprehension, completion and human control. Publish matched evidence separately from curator grades.

## Verification

`bun run check` passed all 121 tests, type checks, Markdown lint, structural validation and generated-file freshness. The production site build passed. A before/after comparison confirmed identical non-rating metadata and evidence levels across all 108 entries and unchanged SHA-256 digests for every assessed local payload file. Browser inspection confirmed complete scores, incomplete profiles with an omitted dependability grade, assessment links and scoped blocker reasons render in the local preview. These are catalog implementation checks, not entry outcome evidence.

## Entry-by-entry results

| Entry / assessment | Type | Score | Disposition | Decisive tradeoff |
| --- | --- | ---: | --- | --- |
| [case-insensitive-guard](../../docs/reviews/2026-10-29-case-insensitive-guard.md) | hook | 6.9/10 | Keep | A focused accidental-deletion guard; it cannot replace sandboxing or resolve every dynamic shell target. |
| [compact-context](../../docs/reviews/2026-10-29-compact-context.md) | hook | 6.4/10 | Keep | Use only for observed compaction gaps; stale duplicated notes can worsen context quality. |
| [config-guard](../../docs/reviews/2026-10-29-config-guard.md) | hook | 6.9/10 | Keep | Useful explanatory config guard alongside managed controls; it deliberately cannot enforce every mutation route. |
| [config-watch](../../docs/reviews/2026-10-29-config-watch.md) | hook | 6.5/10 | Keep | Useful visibility tripwire; audit raw-payload retention and keep block mode an explicit choice. |
| [context-hogs](../../docs/reviews/2026-10-29-context-hogs.md) | hook | 6.9/10 | Keep | Useful estimates, not billing; inspect suggested exclusions and account for local ledger/privacy costs. |
| [desktop-attention](../../docs/reviews/2026-10-29-desktop-attention.md) | hook | 7.9/10 | Keep | Skip when host notifications suffice; desktop permission and headless-session limits remain. |
| [format-after-edit](../../docs/reviews/2026-10-29-format-after-edit.md) | hook | 7.5/10 | Keep | Useful where formatter feedback is late; avoid duplicate editor/pre-commit work and test the actual client. |
| [git-safety](../../docs/reviews/2026-10-29-git-safety.md) | hook | 6.1/10 | Keep | An opt-in policy guard, not branch protection; critical level applies no rules and high is not standalone full coverage. |
| [no-email-context](../../docs/reviews/2026-10-29-no-email-context.md) | hook | 7.4/10 | Keep | A narrow privacy control; it does not scrub tools, files, logs, histories or all identity data. |
| [post-edit-diagnostics](../../docs/reviews/2026-10-29-post-edit-diagnostics.md) | hook | 7.5/10 | Keep | Choose a genuinely fast checker; exit-2 feedback after an edit must not be mistaken for rollback. |
| [prompt-secret-check](../../docs/reviews/2026-10-29-prompt-secret-check.md) | hook | 7.4/10 | Keep | A narrow accidental-paste guard, not comprehensive DLP or erasure of local history. |
| [protect-files-and-commands](../../docs/reviews/2026-10-29-protect-files-and-commands.md) | hook | 6.0/10 | Keep | An advisory guardrail alongside real permissions; do not rely on it for canonical path enforcement. |
| [protect-tests](../../docs/reviews/2026-10-29-protect-tests.md) | hook | 7.0/10 | Keep | A heuristic tripwire for named test removals, not semantic test integrity or comprehensive write protection. |
| [stop-gate-checks](../../docs/reviews/2026-10-29-stop-gate-checks.md) | hook | 5.8/10 | Keep | A bounded reminder, not an invariant that checks pass; whole-tree dirtiness is not turn ownership. |
| [subagent-budget](../../docs/reviews/2026-10-29-subagent-budget.md) | hook | 7.3/10 | Keep | Counts admitted attempts, not tokens, concurrent agents or nested global fan-out; Codex host failures may proceed. |
| [cerberus-re](../../docs/reviews/2026-10-29-cerberus-re.md) | mcp | Incomplete | Pending inspection | Specialist Apple workbench with documented opt-ins and an unaudited runtime. |
| [chrome-devtools-mcp](../../docs/reviews/2026-10-29-chrome-devtools-mcp.md) | mcp | Incomplete | Pending inspection | Useful browser diagnostics; explicitly review data collection, profile isolation and overlap with installed tools. |
| [context7](../../docs/reviews/2026-10-29-context7.md) | mcp | Incomplete | Pending inspection | Convenient version-specific documentation retrieval; verify important results against primary docs. |
| [ida-mcp](../../docs/reviews/2026-10-29-ida-mcp.md) | mcp | Incomplete | Pending inspection | Specialist IDA bridge; do not treat analysis tools or Python execution as inherently read-only. |
| [mise-mcp](../../docs/reviews/2026-10-29-mise-mcp.md) | mcp | Incomplete | Pending inspection | Useful for existing mise users; environment disclosure and task authority require deliberate client configuration. |
| [process-compose-mcp](../../docs/reviews/2026-10-29-process-compose-mcp.md) | mcp | Incomplete | Refresh affected path | Useful stack management with retained command-interpolation and transport concerns. |
| [reva](../../docs/reviews/2026-10-29-reva.md) | mcp | Incomplete | Pending inspection | Useful Ghidra bridge; scripting and database edits need explicit analysis scope. |
| [reverse-engineer-anything](../../docs/reviews/2026-10-29-reverse-engineer-anything.md) | mcp | Incomplete | Pending inspection | Broad RE workbench whose runtime and package-to-repository correspondence need inspection. |
| [claude-hud](../../docs/reviews/2026-10-29-claude-hud.md) | plugin | Incomplete | Pending inspection | Useful human-facing visibility; retained launcher pinning concerns require follow-up. |
| [claude-reflect](../../docs/reviews/2026-10-29-claude-reflect.md) | plugin | Incomplete | Pending inspection | Adopt only when the review queue justifies automatic capture and reminders. |
| [compound-engineering](../../docs/reviews/2026-10-29-compound-engineering.md) | plugin | Incomplete | Pending inspection | Consider for deliberate method adoption, after comparing native planning/review and a smaller retrospective. |
| [superpowers](../../docs/reviews/2026-10-29-superpowers.md) | plugin | Incomplete | Refresh affected path | High process cost; document-specific deletion and compulsory routing rules need revision before broad use. |
| [worktrunk](../../docs/reviews/2026-10-29-worktrunk.md) | plugin | Incomplete | Refresh affected path | Useful worktree UX; plugin lifecycle takeover and retained auto-approval behavior need review. |
| [focused-changes](../../docs/reviews/2026-10-29-human-v1-starter.md) | rule | 7.3/10 | Keep | Source review only: small, actionable guidance with low setup cost. Incremental value is limited by host overlap; choose it for observed overreach. No new behavioral trial or matched outcome evidence. |
| [karpathy-coding-guidelines](../../docs/reviews/2026-10-29-karpathy-coding-guidelines.md) | rule | 6.9/10 | Keep | A short alternative policy with substantial built-in overlap; keep linked packaging and avoid stacking duplicates. |
| [markdown-accessibility](../../docs/reviews/2026-10-29-markdown-accessibility.md) | rule | 8.3/10 | Keep | Useful where documentation has real access barriers; assistive-technology behavior still needs inspection. |
| [scope-and-authority](../../docs/reviews/2026-10-29-human-v1-starter.md) | rule | 7.3/10 | Keep | Source review only: clear authority boundaries and proportionate clarification, with low adoption and upkeep costs. Mostly redundant on the primary hosts; no new behavioral or outcome evaluation. |
| [verification-evidence](../../docs/reviews/2026-10-29-human-v1-starter.md) | rule | 8.0/10 | Keep | Targets the recorded pilot gap while preserving server-start authorization. Grades are curator judgments; the existing used evidence is an exploratory transcript review. No matched outcome benefit has been established. |
| [agentic-actions-auditor](../../docs/reviews/2026-10-29-agentic-actions-auditor.md) | skill | Incomplete | Refresh affected path | Useful specialist audit structure, but unsafe remediation and unreviewed required references prevent an aggregate. |
| [agents-md-authoring](../../docs/reviews/2026-10-29-agents-md-authoring.md) | skill | 7.9/10 | Keep | Useful for bloated instructions; the fixed size target and host-version claims need project judgment. |
| [baseline-ui](../../docs/reviews/2026-10-29-baseline-ui.md) | skill | 5.1/10 | Keep | An alternative house policy, not a universal UI-quality standard; preserve existing stack and user preferences. |
| [better-typography](../../docs/reviews/2026-10-29-better-typography.md) | skill | 7.0/10 | Keep | All six typography references inspected. Useful implementation detail; numeric floors and rendering preferences are not universal defects. |
| [bun-workspaces](../../docs/reviews/2026-10-29-bun-workspaces.md) | skill | 8.5/10 | Keep | Strong Bun-specific guidance; verification costs and version-sensitive commands remain visible. |
| [catalog-taxonomy](../../docs/reviews/2026-10-29-catalog-taxonomy.md) | skill | 8.0/10 | Keep | Useful for real discovery problems; adds unjustified ceremony to a small stable tag list. |
| [commit-history-hygiene](../../docs/reviews/2026-10-29-commit-history-hygiene.md) | skill | 8.5/10 | Keep | Improves reviewable history; staged intermediate versions and rebase checks still require careful supervision. |
| [committing-with-commitlint](../../docs/reviews/2026-10-29-committing-with-commitlint.md) | skill | 7.5/10 | Keep | Prefer the project-local executable: upstream npx commands can download packages. Intended for existing commitlint repositories. |
| [conventional-commit-message](../../docs/reviews/2026-10-29-conventional-commit-message.md) | skill | 7.9/10 | Keep | Useful with commit-driven releases; visible/hidden type semantics are preset-specific, not universal SemVer rules. |
| [create-adaptable-composable](../../docs/reviews/2026-10-29-create-adaptable-composable.md) | skill | 7.9/10 | Keep | Useful for library-style composables; often redundant with installed Vue guidance. |
| [cynthion-reverse-engineer](../../docs/reviews/2026-10-29-cynthion-reverse-engineer.md) | skill | Incomplete | Pending inspection | Useful USB specialist workflow; mandatory decoder and generator inspection is still outstanding. |
| [design-taste-frontend](../../docs/reviews/2026-10-29-design-taste-frontend.md) | skill | Incomplete | Pending inspection | Experimental design method whose style and setup costs must fit the project. |
| [diagnosing-bugs](../../docs/reviews/2026-10-29-diagnosing-bugs.md) | skill | 7.8/10 | Keep | Choose for hard bugs; refusing hypotheses without a tight loop and fixed phase counts can slow simpler work. |
| [domain-modeling](../../docs/reviews/2026-10-29-domain-modeling.md) | skill | 7.3/10 | Keep | Useful where terminology drifts; prescribed files and immediate writes must yield to existing project practice. |
| [emil-design-eng](../../docs/reviews/2026-10-29-emil-design-eng.md) | skill | Incomplete | Pending inspection | Useful craft detail with absolute rules that need project-specific judgment. |
| [find-skills](../../docs/reviews/2026-10-29-find-skills.md) | skill | 4.5/10 | Refresh affected path | Discovery utility with weak vetting heuristics; stars/installs do not establish safety or quality. |
| [fixing-accessibility](../../docs/reviews/2026-10-29-fixing-accessibility.md) | skill | 7.4/10 | Keep | Useful focused checklist; apply composite-widget exceptions and do not infer WCAG conformance from source review. |
| [fixing-motion-performance](../../docs/reviews/2026-10-29-fixing-motion-performance.md) | skill | 7.4/10 | Keep | Use profiling to validate gains; fixed blur thresholds and broad property bans are heuristics. |
| [frontend-design](../../docs/reviews/2026-10-29-frontend-design.md) | skill | 7.9/10 | Keep | Select as an alternative to installed frontend-design, not an extra global design layer. |
| [game-feel](../../docs/reviews/2026-10-29-game-feel.md) | skill | 8.0/10 | Keep | A practical source-based method; player comfort and satisfaction still require suitable player evidence. |
| [gh-fix-ci](../../docs/reviews/2026-10-29-gh-fix-ci.md) | skill | 7.1/10 | Keep | Concrete CI triage; authenticated gh, an extra approval step and deprecated upstream add operating costs. |
| [git-commit](../../docs/reviews/2026-10-29-git-commit.md) | skill | 6.9/10 | Keep | Useful for requested commits; review exact staging and use Git 2.56+ for --resolved. |
| [github-actions-hardening](../../docs/reviews/2026-10-29-github-actions-hardening.md) | skill | 8.0/10 | Refresh affected path | Useful review lens, but do not copy the cross-run download example or fixed permission claims unchanged. |
| [grilling](../../docs/reviews/2026-10-29-grilling.md) | skill | 7.0/10 | Keep | An explicit interview option; exhaustive rounds and yes-shaped recommendations can bias or prolong decisions. |
| [handoff](../../docs/reviews/2026-10-29-handoff.md) | skill | 7.5/10 | Keep | Useful for a fresh chat; reviewers should check that unresolved constraints and rejected approaches survived summarization. |
| [human-interface-design](../../docs/reviews/2026-10-29-human-interface-design.md) | skill | 7.9/10 | Keep | Useful cross-platform decision structure; overlaps existing design skills and is not accessibility certification. |
| [impeccable](../../docs/reviews/2026-10-29-impeccable.md) | skill | Incomplete | Pending inspection | Experimental suite; runtime behavior and data collection need inspection before recommendation. |
| [improvement-loop](../../docs/reviews/2026-10-29-improvement-loop.md) | skill | 7.8/10 | Keep | A deliberate tooling-improvement option; use one retrospective method per session and avoid ritual for minor fixes. |
| [intent](../../docs/reviews/2026-10-29-intent.md) | skill | Incomplete | Pending inspection | Best considered for teams choosing the wider lifecycle method. |
| [interface-design](../../docs/reviews/2026-10-29-interface-design.md) | skill | Incomplete | Pending inspection | Useful domain-specific design method with retained prior accessibility and native-control concerns. |
| [interface-review](../../docs/reviews/2026-10-29-interface-review.md) | skill | Incomplete | Pending inspection | Useful change-scoped review orchestration; installation must include the required sibling bundle. |
| [level-design](../../docs/reviews/2026-10-29-level-design.md) | skill | 8.0/10 | Keep | Strong for layout decisions; reachability and agent traversal do not establish enjoyment. |
| [mcp-builder](../../docs/reviews/2026-10-29-mcp-builder.md) | skill | Incomplete | Pending inspection | Useful MCP design guidance; supporting implementation and evaluation material still needs inspection. |
| [mmorpg-design](../../docs/reviews/2026-10-29-mmorpg-design.md) | skill | 7.9/10 | Keep | Assess within MMORPG projects; source reasoning does not prove retention, social quality or economy balance. |
| [moderated-usability-study](../../docs/reviews/2026-10-29-moderated-usability-study.md) | skill | 8.6/10 | Keep | Good study discipline; participant access and organizational consent prerequisites are real costs. |
| [open-sourcing](../../docs/reviews/2026-10-29-open-sourcing.md) | skill | Incomplete | Pending inspection | Useful launch checklist; do not infer release readiness from presence checks. |
| [oss-repo-health](../../docs/reviews/2026-10-29-oss-repo-health.md) | skill | 7.9/10 | Keep | Useful ongoing audit; several Must/Should judgments need project-specific calibration. |
| [ponytail](../../docs/reviews/2026-10-29-ponytail.md) | skill | 5.9/10 | Keep | Experimental session-wide style policy; smaller output and popularity are not evidence of better correctness. |
| [portless](../../docs/reviews/2026-10-29-portless.md) | skill | Incomplete | Refresh affected path | Strong development convenience with privileged setup costs that need explicit scope. |
| [property-based-testing](../../docs/reviews/2026-10-29-property-based-testing.md) | skill | 7.4/10 | Keep | Useful property design, with all five task references inspected; fixed severity/settings claims and unnecessary refactor suggestions need judgment. |
| [react-best-practices](../../docs/reviews/2026-10-29-react-best-practices.md) | skill | Incomplete | Pending inspection | Useful React performance index; the index alone cannot establish rule correctness. |
| [react-component-composition](../../docs/reviews/2026-10-29-react-component-composition.md) | skill | 7.9/10 | Keep | Useful for difficult ownership/API changes; ordinary component edits rarely need the whole method. |
| [remove-animations](../../docs/reviews/2026-10-29-remove-animations.md) | skill | 6.3/10 | Keep | Use dependency-aware cleanup while retaining intentional motion and accepted project decisions. |
| [repo-research](../../docs/reviews/2026-10-29-repo-research.md) | skill | 7.9/10 | Keep | Best for consequential onboarding decisions; redundant for trivial repository navigation. |
| [retrospective](../../docs/reviews/2026-10-29-retrospective.md) | skill | 7.9/10 | Keep | Useful for repeat friction; trigger results establish activation, not that the resulting guidance helps. |
| [reverse-engineering](../../docs/reviews/2026-10-29-reverse-engineering.md) | skill | Incomplete | Pending inspection | A useful cross-format method with unverified platform and helper coverage. |
| [secret-serialization](../../docs/reviews/2026-10-29-secret-serialization.md) | skill | 8.5/10 | Keep | A valuable specialist audit; source rules and upstream runs do not establish complete leak coverage. |
| [security-threat-model](../../docs/reviews/2026-10-29-security-threat-model.md) | skill | 7.4/10 | Keep | Useful for explicit threat modeling; fixed report naming and mandatory confirmation need project-sensitive use. |
| [skill-creator](../../docs/reviews/2026-10-29-skill-creator.md) | skill | Incomplete | Pending inspection | Compare with the installed host skill creator before adopting a second authoring system. |
| [synthesize-research](../../docs/reviews/2026-10-29-synthesize-research.md) | skill | Incomplete | Pending inspection | Useful research structure; frequency and impact rankings require sampling judgment. |
| [systematic-debugging](../../docs/reviews/2026-10-29-systematic-debugging.md) | skill | 7.4/10 | Keep | A lightweight debugging option; recorded trigger misses on small bugs do not prove worse outcomes. |
| [test-driven-development](../../docs/reviews/2026-10-29-test-driven-development.md) | skill | 5.1/10 | Refresh affected path | Use only where its strict policy is deliberately adopted; the deletion instruction is a recommendation blocker. |
| [tokio-async-correctness](../../docs/reviews/2026-10-29-tokio-async-correctness.md) | skill | 8.5/10 | Keep | Strong specialist review method; bounded fixtures do not prove all interleavings correct. |
| [ui-ux-pro-max](../../docs/reviews/2026-10-29-ui-ux-pro-max.md) | skill | Incomplete | Pending inspection | Useful design retrieval option; search rank and confidence fields do not establish correctness. |
| [ux-critique](../../docs/reviews/2026-10-29-ux-critique.md) | skill | Incomplete | Pending inspection | A useful critique method with large support dependencies; expert critique is not user research. |
| [variant-analysis](../../docs/reviews/2026-10-29-variant-analysis.md) | skill | Incomplete | Pending inspection | Useful seed-based method; the core is not the complete parallel plugin workflow. |
| [verification-before-completion](../../docs/reviews/2026-10-29-verification-before-completion.md) | skill | 5.9/10 | Keep | Concrete evidence table, but absolutist tone and repeated full verification make this a conditional policy. |
| [vue-async-state](../../docs/reviews/2026-10-29-vue-async-state.md) | skill | 7.9/10 | Keep | Useful for stale async state; reuse query-library behavior rather than adding another owner. |
| [webapp-testing](../../docs/reviews/2026-10-29-webapp-testing.md) | skill | 5.3/10 | Refresh affected path | Use the already-running-app path where suitable; the server helper has documented pipe/readiness/cleanup limitations. |
| [workers-best-practices](../../docs/reviews/2026-10-29-workers-best-practices.md) | skill | 7.1/10 | Keep | Useful platform checklist; fixed CPU-plan limits are stale and default logs/traces can affect privacy/cost. Recheck the actual target before applying recipes. |
| [pr-review-code-reviewer](../../docs/reviews/2026-10-29-pr-review-code-reviewer.md) | subagent | 5.1/10 | Keep | A conditional reviewer persona; confidence is not calibrated probability and inherited tools are broader than a read-only role. |
| [silent-failure-hunter](../../docs/reviews/2026-10-29-silent-failure-hunter.md) | subagent | 7.3/10 | Keep | Use as a focused reviewer; its Bash tool permission does not enforce read-only execution. |
| [ccusage](../../docs/reviews/2026-10-29-ccusage.md) | tool | Incomplete | Pending inspection | Useful human-facing reporting; displayed costs are estimates and runtime behavior still needs inspection. |
| [bun-migration-verification](../../docs/reviews/2026-10-29-bun-migration-verification.md) | workflow | 8.5/10 | Keep | Good migration boundaries; a successful install is still insufficient deployment evidence. |
| [evidence-to-flow-ux](../../docs/reviews/2026-10-29-evidence-to-flow-ux.md) | workflow | 8.0/10 | Keep | Useful decision discipline; browser success remains distinct from human comprehension. |
| [explore-plan-implement-review](../../docs/reviews/2026-10-29-explore-plan-implement-review.md) | workflow | 6.4/10 | Keep | Use for changes needing coordination; ordinary one-sentence fixes should take its explicit skip path. |
| [game-balance-review](../../docs/reviews/2026-10-29-game-balance-review.md) | workflow | 8.0/10 | Keep | Useful specialist analysis; target ranges and spreadsheets do not establish enjoyable balance. |
| [gameplay-playtesting](../../docs/reviews/2026-10-29-gameplay-playtesting.md) | workflow | 7.8/10 | Keep | Good game-study structure; long-term social and mastery questions need longer observation. |
| [harness-experiment-loop](../../docs/reviews/2026-10-29-harness-experiment-loop.md) | workflow | 8.4/10 | Keep | Strong for guidance maintainers; cost and replayability make it excessive for ordinary product edits. |
| [mechanic-prototyping](../../docs/reviews/2026-10-29-mechanic-prototyping.md) | workflow | 8.0/10 | Keep | Useful for deciding whether to build a mechanic; a successful spike does not establish production quality. |
| [monorepo-change-verification](../../docs/reviews/2026-10-29-monorepo-change-verification.md) | workflow | 8.5/10 | Keep | Useful for cross-package changes; native task runners still execute and validate the actual graph. |
| [ralph-loop](../../docs/reviews/2026-10-29-ralph-loop.md) | workflow | 5.8/10 | Keep | Only for explicitly authorized sandboxed iteration with strong checks; no whole-loop outcome claim. |
| [revise-claude-md](../../docs/reviews/2026-10-29-revise-claude-md.md) | workflow | 7.3/10 | Keep | A simple session-learning command; it does not choose between rules, skills, scripts and hooks. |
| [rust-verification-ladder](../../docs/reviews/2026-10-29-rust-verification-ladder.md) | workflow | 8.5/10 | Keep | Strong specialist selection guide; optional layers remain prerequisites, not bundled verified capabilities. |
| [self-improvement-loop](../../docs/reviews/2026-10-29-self-improvement-loop.md) | workflow | 7.0/10 | Keep | Use selectively for repeat friction; related hooks remain explicit opt-in and fixed line counts are heuristics. |
