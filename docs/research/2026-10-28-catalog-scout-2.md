# Claude Code hook admission research — October 28, 2026

## Scope and baseline

**As of / researched:** 2026-10-28, America/Edmonton. The user explicitly requested finding and adding about twelve of the best Claude Code hooks. This follow-up combines focused scouting with authorized admission. Baseline: the [initial hooks investigation](2026-10-28-catalog-scout.md), [October 27 queue](2026-10-27-catalog-scout.md), `CONTRIBUTING.md`, `PLAN.md`, and [decisions 19–29](../decisions.md).

“Best” here means useful, understandable options for distinct project needs, selected after comparing implementation and overlap. No representative outcome benchmark or exhaustive marketplace ranking was performed. The result adds twelve entries, refreshes three existing ones, and leaves every hook at evidence level `reviewed`. It does not enable any hook.

## Coverage and observations

Read-only source snapshots downloaded into `/tmp`:

| Repository | Reviewed HEAD | Scope |
| --- | --- | --- |
| AlexErrant/claude-code-no-email | `930d0b2cfabdc41feffb9f15ef0e981259d1e856` | All seven tracked files, including MIT license and two tests; carried forward from initial report |
| karanb192/claude-code-hooks | `57a28c7687305e4a9b9dd50490e9b3c552c71ca4` | Inventoried all 22 plugins; read all runtime/registration/development-facing metadata required by the six selected plugin subtrees and the root MIT license; tests inventoried rather than fully read/run |
| disler/claude-code-hooks-mastery | `052ad1cbd5aeb1ec4a1def22012d1293c6225625` | README and hook inventory sampled; tutorial leads, no selected artifact or admission pin |
| rtk-ai/rtk | `5f4a4dcb97f1a3e9479708e1198fbb68a78d3ee6` | Claude hook README and repository inventory only; runtime closure not reviewed |
| ldayton/Dippy | `2edad4a48d616a191c83417552ddc60eb79b526a` | README and repository inventory only; parser and approval policies not reviewed |
| anthropics/claude-plugins-official | `f8c5e7a1dcb71b10cb74586224b5401f3de5db28` | Automation recommender's complete hooks-patterns reference and applicable Apache-2.0 license; broader runtime bundles not admitted |

Also read complete runtime sources for Karan's `protect-secrets` and `subagent-spawn-cap` to assess admission blockers; the spawn cap inspired an independent implementation rather than a linked admission. The selected `context-hogs` runtime additionally requires its complete invoke-only leaderboard skill, which was read. Selected Karan runtimes use Node built-ins only; `git-safety` additionally invokes local Git for branch lookup. No runtime fetches remote instructions. Scripts downloaded upstream were not executed. Static validation ran the installed host validator, not the downloaded hook commands.

Search lanes included `Claude Code useful hooks github hooks security format notification 2026`, hook secrets/RTK/Dippy queries, the official Anthropic plugin ecosystem, and the official [hooks reference](https://code.claude.com/docs/en/hooks) / [guide](https://code.claude.com/docs/en/hooks-guide). Repository directories and README claims supplied leads, not proof of popularity or efficacy. No installation counts, stars, growth rates, upstream test totals or “faster development” claims are used as quality evidence. This was a focused cross-source sample, not a census.

Current official documentation establishes event-specific decision behavior and `onFailure: "block"` from Claude Code 2.1.295. It also now documents `ConfigChange.source` and optional `file_path`; config-watch's older claim that the payload is undocumented is stale, but its defensive field parsing remains usable. See the [reference sections](https://code.claude.com/docs/en/hooks#configchange).

## Recommend adding — admitted under this request

The table orders the additions by broad review priority; installation should follow a project's actual need. Entry metadata contains the four curator axes, exact installation requirements, related entries and full limitations. Links below point to the immutable reviewed upstream artifact or the complete independently implemented entry.

| Priority | Entry and exact source | Gap / overlap and admission rationale |
| --- | --- | --- |
| 1 | [no-email-context](../../entries/hooks/no-email-context/entry.yaml); [upstream](https://github.com/AlexErrant/claude-code-no-email/tree/930d0b2cfabdc41feffb9f15ef0e981259d1e856/.claude/skills/no-email) | Removes one host-injected identity block; distinct from file protection and application secret serialization. Linked MIT mod; very small runtime. |
| 2 | [desktop-attention](../../entries/hooks/desktop-attention/HOOK.md) | Local attention signal when native notifications are insufficient. Independent adaptation of the official notification pattern; fixed text avoids forwarding private prompts. |
| 3 | [config-guard](https://github.com/karanb192/claude-code-hooks/tree/63e0354bdf6ec56dd508d8ceef33b416ab6d8b14/plugins/config-guard) | Configuration-specific checks beyond the existing tiny protected-file example; managed policy remains stronger. Linked MIT, Node. |
| 4 | [protect-tests](https://github.com/karanb192/claude-code-hooks/tree/63e0354bdf6ec56dd508d8ceef33b416ab6d8b14/plugins/protect-tests) | Detects common deletion/skip evasions that a passing gate misses; complements TDD and stop checks. Linked MIT, Node. |
| 5 | [post-edit-diagnostics](../../entries/hooks/post-edit-diagnostics/HOOK.md) | Earlier checker feedback than Stop; distinct from formatter writes. Independent adaptation of Anthropic's diagnostic-hook recommendation. |
| 6 | [case-insensitive-guard](https://github.com/karanb192/claude-code-hooks/tree/63e0354bdf6ec56dd508d8ceef33b416ab6d8b14/plugins/case-insensitive-guard) | Real directory spelling checks for case-folding volumes, beyond generic destructive-command regexes. Linked MIT, Node. |
| 7 | [config-watch](https://github.com/karanb192/claude-code-hooks/tree/63e0354bdf6ec56dd508d8ceef33b416ab6d8b14/plugins/config-watch) | Watches reloads from other processes; complements config-guard's agent-tool checks. Linked MIT, Node. |
| 8 | [prompt-secret-check](../../entries/hooks/prompt-secret-check/HOOK.md) | Withholds a few recognizable credential forms in user submissions; no-email instead handles host-injected identity. Independent implementation of prompt validation. |
| 9 | [context-hogs](https://github.com/karanb192/claude-code-hooks/tree/68238bcbfcd628a458548dbb92c02a414df8f975/plugins/context-hogs) | Persistent per-file byte-derived estimates beyond the current-context display. Linked MIT, Node, plus invoke-only leaderboard skill. |
| 10 | [subagent-budget](../../entries/hooks/subagent-budget/HOOK.md) | Transactional total-attempt reservations complement native concurrency/depth caps. Independent adaptation of Karan's spawn-cap idea; Python SQLite. |
| 11 | [compact-context](../../entries/hooks/compact-context/HOOK.md) | Small explicit note for observed compaction gaps; overlaps loaded instructions, memory and handoff, so use selectively. Independent adaptation of the official pattern. |
| 12 | [git-safety](https://github.com/karanb192/claude-code-hooks/tree/63e0354bdf6ec56dd508d8ceef33b416ab6d8b14/plugins/git-safety) | Optional main/master and GitHub-action policy, distinct from generic deletion checks. Linked MIT, Node/Git; hardcoded policy narrows fit. |

### Inspection, effects and limits

All six Karan additions: read the complete runtime `.js`, plugin README, `.claude-plugin/plugin.json`, `hooks/hooks.json`, and root LICENSE; additionally read `context-hogs/skills/leaderboard/SKILL.md`. Last-path commits were resolved from repository history, not guessed from HEAD. No test-suite execution or outcome claim is attached to those entries. No applicable nested license or NOTICE was found in the selected subtrees; the root MIT license supplies the terms. Read test inventories are not represented as full test review.

Guards use heuristic text/path checks; several intentionally return `{}` on malformed input. They are not comprehensive security boundaries. Native managed permissions, filesystem isolation and server branch protection remain separate controls. Config-guard's default policy also blocks plugin management, and its environment escape hatch is explicit. Protect-tests can reject legitimate skips and cannot establish assertion quality; default high does not inspect whole-file Write content, while strict does. Git-safety derives branch from the hook process cwd and does not model aliases, command-local `cd`, or `git -C`. Case-insensitive-guard allows unresolved dynamic targets and some globs rather than proving shell semantics.

These components write local logs under `~/.claude/hooks-logs/`: config-watch records the raw event payload; Git/case guards can record full commands; config-guard records truncated targets. Context-hogs stores paths/counts/estimates under `~/.claude/context-hogs/`, writes a suggested instruction file for review, and adds one invoke-only skill. Its byte/token/cost estimates are not bills; concurrent rewrite/shutdown can lose rows. No selected upstream runtime sends network requests. Upstream tracking marketplace installs can move beyond the recorded pin; pinned local-plugin use and that distinction are documented.

No-email: complete runtime and packaging were already inspected. Installed Claude Code 2.1.301 recognizes `prompt.context`, reports no mod API calls, and validates the nested plugin with a missing-author warning; strict mode turns that warning into failure. It also says organization-managed environments skip a person's installed `prompt.context` handler unless deployed through managed settings. The entry records this restriction. The exact account-setting provenance and absence of a native disable setting remain unverified. Default middleware failure fallback and outer handlers can leave/reinsert the block. No final request was captured, and no real account identity was inspected.

The five adaptations ship standalone resources under their own entries; none depends on this maintainer checkout. Independently written source avoids copying upstream expression or importing a large tutorial stack. Python runtimes are explicit. Notification output is fixed/local; compaction reads one bounded maintained note; diagnostics execute only a selected installed argument array; prompt checks report only credential category; budget state contains only a count keyed by a hashed event session ID. There is no remote notification integration or credential logging. Host configuration files show exact events/commands; installation remains opt-in.

## Review next

- **End-to-end Claude invocation:** exercise each chosen handler in a scratch project and record build/surface, ordering, failure behavior and disable paths. Local subprocess checks are not this evidence.
- **No-email privacy:** capture a synthetic-identity final request on supported surfaces and verify organization management. Do not test with real personal data or persist it in research logs.
- **RTK:** promising output-compression job, but the current multi-crate runtime, filters, parser, awareness injection and installer effects need complete dependency review. README/inventory inspection is insufficient for admission.
- **Dippy:** approval-fatigue use case overlaps native approval behavior. Its parser, command policies, project overrides and authorization expansion need full review before offering an optional linked entry. Author speed claims are unverified.

## Watch / hold / skip

- **Karan protect-secrets:** hold the reviewed runtime at HEAD. `checkBashCommand` first allows the whole command if an allowlisted suffix matches it. Thus a command reading a sensitive file followed by an example-file command can evade checks. Direct paths are not canonicalized through symlinks. A source-level bypass is enough to withhold a “secrets firewall” recommendation; no actual secret was read and the hook was not executed. Reopen when the token-level exception and path semantics are corrected and tested.
- **Karan subagent-spawn-cap:** do not import its implementation as a hard budget. It reads line count before a separate append; atomic append does not make count-and-reservation atomic. The independent SQLite adaptation addresses that invariant, charges attempts, and narrows its session-ID scope. Cross-session/global nested budgets remain unclaimed.
- **Auto-stage:** skip as a default; automatic index mutation can stage unrelated human intent. Not required for formatting or verification.
- **External Slack alerts / PR provenance stamps:** skip here; external messaging and putting prompt-derived data into PR bodies add effects unnecessary to the requested local hook catalog.
- **Bounty side quests and automatic rule/standup mining:** skip this batch; these add workflow scope and persistent data capture rather than a narrow deterministic need.
- **Security-guidance:** the previous source/dependency/model-call review hold remains open. The initial report and October 27 queue retain all other unaddressed holds; this admission does not silently clear them.

## Revisit existing entries

Applied the three fixes named in the initial investigation: `format-after-edit` now selects exact event paths (including new patch files), passes arguments without shell splitting and avoids unrelated Git changes; `stop-gate-checks` sees untracked-only changes and explains its bounded retry; `protect-files-and-commands` aligns patch/direct protected names and includes Move headers. All remain reviewed, and shell/path heuristics are disclosed rather than upgraded into comprehensive controls.

## Changes since baseline

The user authorized admission after the initial research-only pass. Twelve concrete entries now exist, rather than placeholder queue items. No-email's static host validation adds evidence about API recognition and managed deployment, but does not resolve final-request privacy testing. The existing hooks' source-level defects were addressed with scratch regression checks. The catalog grows from 43 to 55 entries and from three to fifteen hooks; collections and consumer-plugin capabilities are unchanged.

## Top priorities

1. Use no-email's synthetic-request test to settle the narrow privacy claim before deployment in sensitive work.
2. Start with local notifications or an existing formatter when those solve an observed problem; they have small dependency and policy surfaces.
3. Choose configuration/test guards only where their policy and heuristic limits fit the project.
4. Keep diagnostics and budget hooks bounded; evaluate invocation and failure paths in the actual Claude surface.
5. Review RTK before adding more overlapping guard bundles; it offers a different potential benefit but carries a larger dependency review.

Validation records for this batch belong to source/packaging checks, not behavioral ratings. See decision 29 for the durable admission choice.
