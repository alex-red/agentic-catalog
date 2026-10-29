# Dev UX: running, finding and observing local apps

**Admission follow-up:** the user later admitted the four recommended additions plus claude-hud and ccusage ([decision 52](../decisions.md)), with Dev UX widened to user-facing tools ([decision 51](../decisions.md)). Admission re-reviewed each source at its pin; corrections are recorded in the entries. The findings below preserve the original research boundary.

## Scope and baseline

**As of:** October 29, 2026, America/Edmonton. **Research date:** the same day. This is live source research, not a historical reconstruction or a behavioral trial.

**Requested focus:** candidates for a "Dev UX" area: tools and guidance that improve the development loop when an agent runs, finds and observes a local app. Vercel's `portless` is the motivating example. Four lanes were surveyed: Vercel's agent tooling, local process and environment management, parallel-session tooling, and a registry/curation sweep.

**Conclusion:** the strongest finds are maintainer-built agent surfaces on established tools, not standalone "dev server MCP" projects, most of which are new and have little adoption. **Portless is the strongest Dev UX addition. Process-compose's built-in MCP and `mise mcp` are the strongest process and toolchain additions. Worktrunk is the strongest parallel-worktree addition.** All four are linked tools with real side effects that their entries must state. One existing entry, `webapp-testing`, has a verified server-helper defect.

Baseline: [PLAN.md](../../PLAN.md), [CONTRIBUTING.md](../../CONTRIBUTING.md), [decisions](../decisions.md) through 50, the [October research queue](../research-2026-10.md) (agent-browser and Playwright MCP findings), and the [tag vocabulary](../../catalog/tags.yaml). Current coverage near this area: `chrome-devtools-mcp`, `webapp-testing`, the `verification-evidence` rule, the `post-edit-diagnostics`, `stop-gate-checks`, `format-after-edit`, `desktop-attention`, `context-hogs` and `subagent-budget` hooks, and the worktree skills inside `superpowers` and `compound-engineering`. The catalog has no entry for dev-server lifecycle, stable local URLs, toolchain resolution or worktree management.

Host built-ins overlap materially. Claude Code provides background Bash, Monitor and task listing, `--worktree` with `WorktreeCreate`/`WorktreeRemove` hooks, a configurable status line, a sandboxed Bash tool, a reference dev container, and cost tracking ([worktrees](https://code.claude.com/docs/en/worktrees.md), [statusline](https://code.claude.com/docs/en/statusline.md), [sandboxing](https://code.claude.com/docs/en/sandboxing.md), [devcontainer](https://code.claude.com/docs/en/devcontainer.md), [costs](https://code.claude.com/docs/en/costs.md)). Codex documents worktrees, local-environment setup scripts, a sandbox and notifications. Every candidate below must justify itself against these.

This pass makes no entry, rating, pin, tag or generated-artifact changes. No upstream installer, script, hook, MCP server or CLI was executed. Recommendations are curator judgments from source review.

## Coverage and observations

Four research workers, plus a direct check by the curator, sampled:

- **GitHub:** REST search (about 30 queries in total; both process and parallel lanes hit the search rate limit and then used direct repository lookups), the vercel-labs organization listing (309 non-archived repositories), trees, per-path commits, releases and LICENSE files.
- **skills.sh:** the All-time page (about ranks 1–287 visible, with collapsed groups), Trending (24h) ranks 1–20, Hot ranks 1–22, and about 50 queries against `https://skills.sh/api/search`. The web search box renders client-side and returned nothing to a fetcher. The [FAQ](https://www.skills.sh/docs/faq) defines counts as anonymous, opt-out telemetry from `npx skills add`. It does not define an install unit, deduplication, or the Trending and Hot windows.
- **Package registries:** api.npmjs.org last-week and last-month downloads, crates.io, and formulae.brew.sh.
- **Curated lists at HEAD:** VoltAgent/awesome-agent-skills `a6f9992c`, hesreallyhim/awesome-claude-code `f698257c`, PatrickJS/awesome-cursorrules `b044f956`, github/awesome-copilot `b6483db4`, and the official Claude plugin marketplace `f8c5e7a1` (315 plugins, keyword-filtered).
- **Other:** Hacker News search; official Claude Code and Codex documentation.

About 70 distinct leads were collected and 19 were inspected closely. This is a sampled survey, not a census. Not covered: GitHub topic search, unofficial plugin marketplaces, Trending past rank 20, and skills.sh counts for repositories that are not skill-listed.

### Popularity is a separate signal

All observations were checked October 29, 2026. Stars are whole-repository attention. npm counts include CI and transitive installs; dev3000 depends on portless and agent-browser, which inflates both. skills.sh counts are all-time, channel-specific installs.

| Artifact | Stars | Package downloads | skills.sh installs |
| --- | ---: | --- | --- |
| [vercel-labs/portless](https://github.com/vercel-labs/portless) | 12,761 | npm 2,279,329 / week | about 6.0K (`portless`), 3.0K (`oauth`) |
| [vercel-labs/agent-browser](https://github.com/vercel-labs/agent-browser) | 44,851 | npm 2,429,286 / week | 1,221,428; Trending #9 |
| [F1bonacc1/process-compose](https://github.com/F1bonacc1/process-compose) | 2,907 | not measured | not listed |
| [jdx/mise](https://github.com/jdx/mise) | 35,540 | not measured | not listed (third-party `mise-tasks` 724) |
| [max-sixty/worktrunk](https://github.com/max-sixty/worktrunk) | 9,555 | crates.io 40,761 total; Homebrew 2,434 / 30 days | not captured |
| [jarrodwatts/claude-hud](https://github.com/jarrodwatts/claude-hud) | 29,007 | not measured | not listed |
| [ccusage/ccusage](https://github.com/ccusage/ccusage) | 19,250 | npm 896,825 / month | not listed |
| [vercel-labs/dev3000](https://github.com/vercel-labs/dev3000) | 1,592 | npm 28,332 / week | about 860 |
| [vercel/next-devtools-mcp](https://github.com/vercel/next-devtools-mcp) | 834 | npm 159,252 / week | not listed |
| [sentimony/skills](https://github.com/sentimony/skills) `web-debug` | not captured | none | 2,913 |
| [anthropics/skills](https://github.com/anthropics/skills) `webapp-testing` | whole repository | none | 191,985 |
| [mitsuhiko/agent-stuff](https://github.com/mitsuhiko/agent-stuff) `tmux` | 3,203 | none | 388 (derivative openclaw copy 5,923) |

## Recommend adding

Four proposals cleared source inspection for admission review. Each is linked: they are tools whose skills or MCP surfaces depend on an installed binary, so copying a skill cannot provide closure.

| Rank | Proposal | Mode | Gap it fills |
| --- | --- | --- | --- |
| 1 | [portless](https://github.com/vercel-labs/portless/blob/a9561dcb891a10c37a9695c3f938007b8ba09f32/skills/portless/SKILL.md) skill plus optional MCP | linked (skill or MCP) | Agents guessing or colliding on ports; per-worktree URLs |
| 2 | [process-compose built-in MCP](https://github.com/F1bonacc1/process-compose/blob/f471d83a5dfa4779d589d0a73182b6d6e22736b2/www/docs/mcp-server.md) | linked MCP | Duplicate dev servers, lost background logs, readiness and port discovery |
| 3 | [`mise mcp`](https://github.com/jdx/mise/blob/56efe3a5298af7e11bad7749449d9f38a02da38b/docs/mcp.md) | linked MCP | Wrong toolchain versions and invented task commands |
| 4 | [worktrunk](https://github.com/max-sixty/worktrunk/blob/4907d2dd40de47f14bd0fc0e3b3f6ebe143094e3/plugins/worktrunk/.claude-plugin/plugin.json) plugin and skills | linked plugin | Worktree lifecycle and per-session status for parallel agents |

### 1. Portless: stable named local URLs

| Field | Record |
| --- | --- |
| Identity | `vercel-labs/portless`, CLI with `skills/portless/SKILL.md`, `skills/oauth/SKILL.md` and `portless mcp`. HEAD [`a9561dcb891a10c37a9695c3f938007b8ba09f32`](https://github.com/vercel-labs/portless/tree/a9561dcb891a10c37a9695c3f938007b8ba09f32) (2026-10-29); `skills/portless` last changed in `3a67ed12fb9175e2bb2a237af5d14831e052a1aa` (2026-10-24); MCP added in `bd1ee4d3d1b99e840aca2874f15b17f7d5a08b71` (2026-10-24). v0.15.12, pre-1.0, with its state format possibly changing. |
| Signals | See the popularity table. Releases on October 24 and 26; not archived. |
| Inspection | README, the opening and headings of SKILL.md, LICENSE and `packages/portless/package.json`; greps of `hosts.ts`, `certs.ts` and `cli.ts`. `proxy.ts`, `mcp.ts` and the oauth skill were not read in full. |
| Behavior | A daemon reverse proxy maps `https://<name>.localhost` to an app on a random port in 4000–4999, passed as `PORT` or injected as `--port`/`--host` for Vite, Astro, Expo and similar. Git worktrees get their own subdomains. Non-browser clients receive JSON errors. Binds to loopback unless LAN/mDNS mode is enabled; sharing via Tailscale, ngrok or Cloudflare is opt-in. The MCP `core` profile lists and looks up apps and aliases; by design it cannot start servers or perform privileged actions. |
| Side effects | **By default it binds port 443 and auto-elevates with sudo, generates a local CA and adds it to the system trust store, and maintains a managed block in `/etc/hosts`** (disable with `PORTLESS_SYNC_HOSTS=0`). State lives in `~/.portless`. `portless service install` optionally adds a root launchd/systemd service or a SYSTEM scheduled task. `-p <high port>` avoids sudo; `--no-tls` uses HTTP on port 80. `portless clean` reverses the CA, hosts block and service. Node ≥24; no runtime dependencies or postinstall script in the manifest; no telemetry strings found in the files grepped. |
| Fit | The skill names the failure directly: agents test the wrong port. It also addresses `EADDRINUSE` collisions, port drift between worktrees, and cookie bleed across `localhost` apps. No catalog entry or host built-in provides stable names. Usefulness and novelty high; portability good (macOS, Linux, Windows; framework-neutral); quality provisionally good but under-inspected. |
| Admission path | Linked skill, optionally with the MCP surface. Apache-2.0 ([LICENSE](https://github.com/vercel-labs/portless/blob/a9561dcb891a10c37a9695c3f938007b8ba09f32/LICENSE)). The entry must state the privileged defaults above and lead with the least-privilege path (`-p` high port or `--no-tls`). The skill tells agents to run `npm install -g`; installation remains a user decision. |
| Decision | **Recommend adding, experimental.** Next: read `proxy.ts`, `mcp.ts`, `hosts.ts`, `certs.ts` and the full skill at the pin; confirm the sudo prompt cannot be triggered silently by an agent; then admit. |

### 2. Process-compose built-in MCP

| Field | Record |
| --- | --- |
| Identity | `F1bonacc1/process-compose`, built-in MCP configured with `mcp_server:` in `process-compose.yaml`. HEAD [`f471d83a5dfa4779d589d0a73182b6d6e22736b2`](https://github.com/F1bonacc1/process-compose/tree/f471d83a5dfa4779d589d0a73182b6d6e22736b2) (2026-10-26); `src/mcp/control_tools.go` last changed in `5412c4ed5376ee001da8b636d273b83357a6323f` (2026-05-30); the docs page last changed in `6ffa74f462cd2fa4f8dc1ee63c70b793b298c858` (2026-07-10). Release v1.124.0. |
| Inspection | `www/docs/mcp-server.md`, `src/mcp/control_tools.go`, `tools.go`, `sse_security.go`, LICENSE. The rest of the Go source was not read. |
| Behavior | With `expose_control_tools: true` (opt-in), an agent can start, stop, restart, scale, list and inspect processes, read listening ports, tail and BM25-search logs, check project readiness and read the dependency graph. Any process can also be exposed as a parameterized tool with `@{arg}` substitution into a shell command. |
| Side effects | Runs project commands as the user; no sudo, hosts or certificate changes. The SSE transport binds localhost and checks Host and Origin against DNS rebinding, with an optional `PC_API_TOKEN`; `trusted_hosts: ["*"]` disables those checks. Stdio mode disables the TUI and has the client launch process-compose. |
| Fit | Fixes duplicate dev servers, lost background logs and port discovery across sessions, which host background Bash does not persist. It is maintainer-built, which avoids the third-party wrappers (`jessedhillon/process-compose-mcp` and others). Requires adopting a `process-compose.yaml`, which limits portability to projects that already use it or choose to. |
| Admission path | Linked MCP. Apache-2.0. Guidance should recommend attaching over SSE to the user's running instance and keeping control tools and parameterized tools off unless wanted; argument substitution into shell commands needs an explicit warning. |
| Decision | **Recommend adding.** Decisive open question before admission: does stdio mode start one process-compose per client session, recreating the duplicate-server problem? |

### 3. `mise mcp`: toolchain and task awareness

| Field | Record |
| --- | --- |
| Identity | `jdx/mise`, `mise mcp` stdio server. HEAD [`56efe3a5298af7e11bad7749449d9f38a02da38b`](https://github.com/jdx/mise/tree/56efe3a5298af7e11bad7749449d9f38a02da38b) (2026-10-29); `docs/mcp.md` last changed in `71529e4deea2af4cc71856d7b14c2fa5847191c2` and `src/cli/mcp.rs` in `b71ae7cfd663e8eb2f88ed95086638db170543f6` (both 2026-10-23). The command is no longer marked experimental. |
| Inspection | `docs/mcp.md`, `docs/cli/mcp.md`, `crates/mise-agent-env/README.md`, LICENSE. The Rust implementation was not read. |
| Behavior | Resources `mise://tools`, `mise://tasks`, `mise://env` and `mise://config`; tools `list_commands` (classified read, write or destructive), `run_task` and `install_tool`. |
| Side effects | Respects `mise trust` and refuses untrusted configurations; `MISE_SAFE=1` is read-only. `run_task` sets `MISE_YES=1` and blocks until completion without streaming. `mise://env` can expose secrets. `install_tool` uses the network and refuses options such as `postinstall`. |
| Fit | Stops agents assuming a tool is missing, using the wrong version or inventing task commands. No catalog overlap. It does not manage long-running servers. Useful only where mise is in use, but mise adoption is large. |
| Admission path | Linked MCP. MIT. Guidance: use `--cd` with an absolute path, prefer `MISE_SAFE=1` in unreviewed repositories, and treat `mise://env` as sensitive. |
| Decision | **Recommend adding.** Next: read `src/cli/mcp.rs` to confirm the trust and safe-mode behavior before admission. |

### 4. Worktrunk: parallel worktree lifecycle

| Field | Record |
| --- | --- |
| Identity | `max-sixty/worktrunk`, Claude and Codex plugin plus skills `worktrunk` and `wt-switch-create`. HEAD [`4907d2dd40de47f14bd0fc0e3b3f6ebe143094e3`](https://github.com/max-sixty/worktrunk/tree/4907d2dd40de47f14bd0fc0e3b3f6ebe143094e3) (2026-10-29); `plugins/worktrunk` and `skills` last changed in `bc8ad63e232b28445474dd03ab1ac9641bdd4f31` (2026-10-27). v0.81.0. |
| Inspection | `plugin.json`, `marketplace.json`, `hooks/hooks.json`, `hooks/wt.sh`, and the first part of both skills (the two skill copies are byte-identical). `reference/*.md`, `rationale.md` and the Rust source were not read. |
| Behavior | The skill explains how `wt` resolves its target worktree and separates user configuration (propose and obtain consent) from project `.config/wt.toml` hooks (edit, but warn about `rm -rf`, `curl \| sh` and `sudo`). `wt-switch-create` uses the host's `EnterWorktree` with a `wt switch --create --format=json` fallback. |
| Side effects | **The plugin activates hooks** on UserPromptSubmit, Notification, PreToolUse (AskUserQuestion), PermissionRequest, Stop, SessionEnd, WorktreeCreate and WorktreeRemove. Each calls `wt config plugins claude hook` to record activity markers shown in `wt list`. The WorktreeCreate and WorktreeRemove hooks replace Claude Code's built-in worktree creation. Requires `wt` on PATH. |
| Fit | Builds on, rather than duplicates, Claude Code's worktree support, adding merge, cleanup and per-session "needs input" status. It goes beyond the worktree skills in `superpowers` and `compound-engineering`. |
| Admission path | Linked plugin. MIT OR Apache-2.0 (dual-licensed LICENSE). The entry must list every hook it activates; per catalog policy, installation does not activate hooks implicitly, so the skills-only route should be offered separately. |
| Decision | **Recommend adding.** Next: read `hooks/wt.sh` behavior end to end and the reference files the skill loads; confirm what the PermissionRequest hook does. |

## Review next

| Candidate | Why it is promising | Decisive open question and next inspection |
| --- | --- | --- |
| [sentimony/skills `web-debug`](https://github.com/sentimony/skills/tree/61919613972e63f2c833c1c5ad4744d7c40ad05a/plugins/skills/skills/web-debug) (path last changed `1ab0b9206c4b0bcd4eeb5d9fb5e73577157b7386`) | A maintained fork of `webapp-testing` that fixes its server-helper defect: logs to files, process-group cleanup with SIGTERM→SIGKILL escalation, a port-free preflight, a bounded sanitized log tail, and no `networkidle` wait. Ships a 294-line test file. Apache-2.0 with a modification notice; repository root MIT. | Only part of `scripts/with_server.py` was read. Read all scripts and the test file, then decide between a replacement and a labelled alternative to `webapp-testing`. POSIX-only. |
| [cli-for-agents](https://github.com/pproenca/dot-skills/blob/cf93c57cac89d6fc3e4194686000411567f5caf3/skills/.experimental/cli-for-agents/SKILL.md) (path last changed `f33b7cc5294bd0580b525205bcbb46bd3e315e15`) | 45 rules for agent-usable CLIs (non-interactive operation, actionable errors, dry-run, NDJSON, stdout/stderr, TTY detection), citing clig.dev and the Heroku, GNU and POSIX conventions. Pure guidance, MIT, no catalog overlap. | It sits under `.experimental`, and 43 of 46 reference files were not read. Read them all and check the technical claims before choosing vendored or linked. |
| [mitsuhiko/agent-stuff `tmux`](https://github.com/mitsuhiko/agent-stuff/blob/0865c849befd2021490679f96a8dee58c84ac857/skills/tmux/SKILL.md) (path last changed `7b9f32efa00c4d90b5dc1480f3d472f38769bcdd`) | Drives interactive programs (REPLs, gdb, lldb) on a private socket, waits for output with a timeout, and prints an attach command for the user. That covers what host background Bash cannot: interactive TTYs. | **Defect:** it mixes `tmux -L` (socket name) with `-S` (socket path), so several examples target the wrong server. The repository LICENSE is Apache-2.0 but the frontmatter says `license: Vibecoded`. Resolve the license, then consider an independent adaptation rather than a link. |
| [dekit agent guide](https://github.com/pvolok/dekit/blob/3e6209973655e217c03567e1ba03c308ce6ebb94/src/docs/start/agents.md) (formerly mprocs) | `--json` everywhere and `start --wait --wait-timeout` that returns on readiness or reports why it failed, with a "never sleep or poll" instruction snippet. | The page is `hidden: true` and the project was just renamed. Confirm the JSON contract is documented publicly and read the LICENSE file. A useful source for a "wait for readiness, don't poll" rule. |
| [dev3000 `d3k`](https://github.com/vercel-labs/dev3000/blob/222dbfc1f9f9155947d885a74a856cb3c7143110/skills/d3k/SKILL.md) | One cursor-readable timeline of server output, console, exceptions and network, with rules to reuse a ready runtime and to disclose evidence gaps. MIT. | Canary (`0.0.190-canary`), rewritten recently, path changing daily. Its helper falls back to `pnpm dlx dev3000@>=0.0.184`, an unpinned runtime fetch, and it now requires portless canonical HTTPS with administrator setup. Wait for a stable, pinnable release; consider presenting it with the portless entry. |
| [next-devtools-mcp](https://github.com/vercel/next-devtools-mcp/blob/1e8dcfa4789777901144b5d9710137f0eff72036/README.md) | Returns Next.js 16+ runtime errors, routes and logs to the agent via the built-in `/_next/mcp` endpoint. | No LICENSE file in the repository (MIT only in README and `package.json`); telemetry on by default; recommended config is `@latest`. Decide whether the native endpoint makes the proxy unnecessary, and resolve the license. |
| [jarrodwatts/claude-hud](https://github.com/jarrodwatts/claude-hud/blob/ce2ceff9d67a34e9e6a7889336cf2911254800ff/commands/setup.md) | Status-line view of context use, active tools, subagents and todos. MIT, active. `/claude-hud:setup` asks before replacing an existing status line and backs up settings. | It reads `~/.claude.json` account data; only a grep of `src` checked for network calls. Read the source, and decide whether status-line tools belong in this catalog, since they fill a built-in setting rather than guide the agent. |
| [ccusage](https://github.com/ccusage/ccusage) | Local, read-only usage and cost history across Claude Code, Codex and other tools; broader than per-session `/cost`. MIT. | It is a user tool, not agent guidance. Decide whether the catalog accepts user-facing tools under Dev UX before reviewing further. |
| [addyosmani `browser-testing-with-devtools`](https://github.com/addyosmani/agent-skills/tree/eb07f19f52c2669f2364897aaa293e2aaddd7b1c/skills/browser-testing-with-devtools) (path last changed `e8c9b4632d9e4ab8ca4ea514dae03e25683e8186`) | Companion guidance for `chrome-devtools-mcp`: isolated profiles by default, explicit `--autoConnect` risk, page content treated as untrusted. MIT. | Only 40 of 317 lines were read, and the recommended config is `chrome-devtools-mcp@latest`. Read it fully and compare with `chrome-devtools-mcp`'s own bundled skills. |
| [trailofbits/claude-code-devcontainer](https://github.com/trailofbits/claude-code-devcontainer/blob/32af1916f6689517fff4a576a1447eb3e3667b3d/devcontainer.json) | A dev container with an unusually candid threat model (no protection against escape via `.git`, VS Code host RPC or token exfiltration). Apache-2.0. | **`post_install.py` sets `defaultMode: bypassPermissions`**, and the container has NET_ADMIN/NET_RAW, passwordless sudo, unrestricted outbound network and `curl \| bash` installers. That default conflicts with preserving existing authorization. `install.sh` (899 lines) was not read. A reference link at most; sandboxing may warrant its own research pass. |

## Watch / hold / skip

| Candidate | Disposition | Reason and reopening condition |
| --- | --- | --- |
| [agent-browser](https://github.com/vercel-labs/agent-browser/blob/1453dd37a40c730fe00f592bc32198a896ff8747/skills/agent-browser/SKILL.md) | **Hold (carried)** | The October [research queue](../research-2026-10.md) found a stub skill that loads CLI-served guidance and prefers itself over host browsers. Both remain true at `1453dd37`: the description still says to prefer agent-browser over built-in automation, and npm postinstall downloads a native binary. Reopen if a stable skill pins its guidance and drops the override trigger. |
| [dagger/container-use](https://github.com/dagger/container-use/blob/2e43e625e95216b719ec9338f4034fd3a0be2734/rules/agent.md) | Hold | Per-agent containers and branches are valuable, but its rules require "ONLY Environments for ANY and ALL" operations, overriding host tools, and the README suggests appending them to CLAUDE.md via `curl`. Labelled stability-experimental; last commit August 12. Reopen with evidence of maintenance and an MCP-only setup without the absolutist rules. |
| [trailofbits/skills `devcontainer-setup`](https://github.com/trailofbits/skills/tree/2be6433b39e009cd2b6fd3be1895f6b1faa5af9a/plugins/devcontainer-setup) | Hold | CC-BY-SA-4.0 share-alike; the Dockerfile pipes `claude.ai/install.sh` into bash and registers two marketplaces; `install.sh` copies `~/.claude/projects` into and out of the container. Better suited to a sandboxing pass. |
| [gillkyle/agent-tail](https://github.com/gillkyle/agent-tail/tree/934946c9f93e8fdaf27f57f8431591224c519d6f) | Hold | Writes server and browser console output to grep-able files, MIT. **Possible production exposure:** its Next.js setup gates only the script tag on development; the unauthenticated `/api/__browser-logs` POST route that appends to a log path was not shown to be gated. Not verified at runtime. No activity since March 2026. |
| [jetify-com/devbox `use-devbox`](https://github.com/jetify-com/devbox/blob/28c07cf12823c491a065e2dd8be1fc456e29b187/.agents/skills/use-devbox/SKILL.md) | Hold | Tells the agent to run `curl … \| bash` to install devbox and Nix on its own initiative. Could inform an independent environment-detection rule that asks before installing. |
| [ccstatusline](https://github.com/sirmalloc/ccstatusline) | Hold | Reads the Claude OAuth token from the macOS Keychain to fetch usage limits. An alternative to claude-hud at most. |
| [vercel-labs/emulate](https://github.com/vercel-labs/emulate) | Watch | Local stateful service emulators; a "LABS EXPERIMENT" closer to test fixtures than the dev-server loop. |
| Framework-specific runtime connectors: [laravel/boost](https://github.com/laravel/boost), [antfu/nuxt-mcp-dev](https://github.com/antfu/nuxt-mcp-dev), [laravel/pao](https://github.com/laravel/pao) | Watch | Useful within their stacks; consider alongside next-devtools-mcp if a framework-runtime group emerges. pao is a good example of compact, agent-detecting test output. |
| [d-kuro/gwq](https://github.com/d-kuro/gwq), [nekocode/agent-worktree](https://github.com/nekocode/agent-worktree) | Skip for now | Worktrunk covers the job more completely. |
| Desktop parallel-agent apps: [parallel-code](https://github.com/johannesjo/parallel-code), [jean](https://github.com/coollabsio/jean), [vibe-notch](https://github.com/farouqaldori/vibe-notch), [Claude-Code-Agent-Monitor](https://github.com/hoangsonww/Claude-Code-Agent-Monitor) | Skip | Applications rather than agent guidance; overlap host agent views. |
| [neptaco/mcproc](https://github.com/neptaco/mcproc), [process-concierge](https://github.com/ccdwyer/process-concierge), [portmarshal](https://github.com/worsher/portmarshal), [devpin](https://github.com/sichengchen/devpin), [mcp-rewatch](https://github.com/brennancheung/mcp-rewatch), [devloop](https://github.com/vincentvella/devloop), [background-process-mcp](https://github.com/waylaidwanderer/background-process-mcp) | Watch | Address the right problem with almost no adoption (0–11 stars). process-concierge intercepts Bash and answers permission checks, which needs a careful review if it grows. |
| [tmux-mcp](https://github.com/nickgnd/tmux-mcp) | Skip | Inactive since August 2025; the tmux skill is the better review target. |
| Third-party process-compose MCP wrappers; [cc-skills `mise-tasks`](https://github.com/terrylica/cc-skills); [claude-mods `process-compose-ops`/`portless-ops`](https://github.com/0xdarkmatter/claude-mods) | Skip | Superseded by the maintainers' own MCP surfaces. |
| [localias](https://github.com/peterldowns/localias), [puma-dev](https://github.com/puma/puma-dev), [overmind](https://github.com/DarthSim/overmind), [pm2](https://github.com/Unitech/pm2) | Skip | No agent guidance, and portless or process-compose cover the agent job; puma-dev is stale. |
| [awesome-cursor-skills `detecting-port-conflicts`/`finding-dev-server-url`](https://github.com/spencerpauly/awesome-cursor-skills) | Skip | A generic `lsof`-and-kill recipe and a Cursor-only terminal scan. The port-conflict idea could inform a rule. |
| [vercel-labs/nostics](https://github.com/vercel-labs/nostics) | Skip | An error-message library; its plugin hook is not a dev-loop tool. |
| [PeonPing/peon-ping](https://github.com/PeonPing/peon-ping), [splitrail](https://github.com/Piebald-AI/splitrail), [claude-powerline](https://github.com/Owloops/claude-powerline), [CCometixLine](https://github.com/Haleclipse/CCometixLine) | Skip | Overlap `desktop-attention`, ccusage or claude-hud. |
| [wasp start-dev-server](https://github.com/wasp-lang/wasp-agent-plugins), [ngrok expose-localhost](https://github.com/ngrok/skills), [firebase-local-env-setup](https://github.com/firebase/agent-skills), [nx-workspace](https://github.com/nrwl/nx-ai-agents-config), [herdr](https://github.com/herdrdev/herdr), [mirrord](https://github.com/metalbear-co/skills) | Out of lane or watch | Framework- or vendor-specific, remote side effects, or monorepo and terminal tooling better reviewed in their own passes. |

## Revisit existing entries

| Entry | Finding | Follow-up |
| --- | --- | --- |
| `webapp-testing` | **Verified by the curator in this checkout:** `entries/skills/webapp-testing/scripts/with_server.py` starts the server with `stdout=subprocess.PIPE, stderr=subprocess.PIPE` and never reads either pipe. A chatty dev server can block once the pipe buffer fills, and its errors never reach the agent. The skill also teaches `networkidle`, which may never settle while a hot-reload socket stays open. Upstream `skills/webapp-testing` has not changed its SKILL.md or scripts since `ef740771` (2025-12-01). | Record the caveat in the entry's rating notes now; evaluate the sentimony fork as a replacement or alternative. Do not edit the vendored payload. |
| `chrome-devtools-mcp` | Upstream now bundles seven skills (`chrome-devtools`, troubleshooting, LCP and others; about 8.7K skills.sh installs for the main one). | Review whether the entry should mention or link the bundled skills. |

## Changes since baseline

- **New discoveries:** portless (now with a skill and an MCP surface), process-compose's built-in MCP, `mise mcp`, worktrunk, the sentimony fork, cli-for-agents, and the tmux and dekit guides.
- **Carried hold:** agent-browser remains held for the same reasons as the October queue, at a newer revision.
- **Defect found in existing coverage:** `webapp-testing`'s server helper.
- **No prior holds resolved.** The holds in the [October queue](../research-2026-10.md), PLAN.md's "Grow carefully" list and earlier scout reports are unchanged and are not repeated here.
- **Taxonomy:** there is no Dev UX term in the [tag vocabulary](../../catalog/tags.yaml). Admission would need a new topic term, for example `dev-ux` (local app loop, ports, processes, toolchains and worktrees), and, if wanted, a browser category like Game design and System design. Existing entries that would also fit it include `webapp-testing`, `chrome-devtools-mcp`, `verification-evidence` and `post-edit-diagnostics`.

## Top priorities

1. **Admit portless** as an experimental linked skill (optionally with the MCP), after reading the proxy, MCP, hosts and certificate code. It most directly addresses the motivating failure and is the most active candidate; its privileged defaults are the main review item.
2. **Admit process-compose's MCP and `mise mcp`** as linked MCP entries. They are maintainer-built, permissively licensed, and fill the process and toolchain gaps that no entry covers. Resolve the stdio duplication question first.
3. **Admit worktrunk** as a linked plugin with its hooks listed and a skills-only route. Chosen over gwq and agent-worktree because it integrates with the host's worktree hooks and adds session status.
4. **Fix the `webapp-testing` disclosure** and review the sentimony fork as its replacement. This addresses a verified defect in a popular existing entry and should not wait on the new area.
5. **Research next, not yet additions:** finish reading cli-for-agents, and consider an independent "wait for readiness, don't poll; reuse a running server" rule drawing on dekit, dev3000 and the tmux skill. Decide separately whether Dev UX should include user-facing tools (ccusage, claude-hud) and whether sandboxing deserves its own pass.

Human review is still needed on the privileged installation steps (portless sudo, CA and hosts changes; worktrunk hook activation) and on whether status-line and usage tools fit the catalog's scope. No candidate was run; nothing here establishes behavioral benefit.
