# Reverse-engineering skills and workflows: current research

**Admission follow-up:** the subsequent explicit selection adds six linked experiments with the `reverse_engineering` tag; see the [admission record](2026-10-29-reverse-engineering-admission.md). The findings and original review boundaries below remain historical research observations.

## Scope and baseline

**As of and researched:** October 29, 2026, America/Edmonton. Live source research. Focus: coding-agent skills and repeatable workflows for understanding compiled software, shipped applications, file formats and protocols; adjacent tool bridges where they supply missing capability.

**Finding:** use a small evidence-driven investigation method plus a deliberately selected analysis backend. The most promising sources solve different jobs: Encid provides a broad headless method; ReVa provides focused investigation and database refinement; P4nda provides structure/symbol recovery; official Hex-Rays provides current [official IDA MCP](https://github.com/HexRaysSA/ida-mcp/blob/391c2f0606a773050fbafcd3ff62942688a0713b/README.md) access; [REA investigation skill](https://github.com/morluto/rea/blob/c0c3902207d6b1a33709e42b80c7e570da7db964/.agents/skills/reverse-engineer-anything/SKILL.md) provides broad artifact investigation; Cerberus specializes in Apple static/runtime correlation. None was behaviorally compared here, and no unchanged upstream bundle cleared every admission check in this pass.

Baseline: [PLAN](../../PLAN.md), [contribution policy](../../CONTRIBUTING.md), [decisions 39–41](../decisions.md), the [latest general scout](2026-10-29-catalog-scout.md), and [frontend scout](2026-10-28-catalog-scout-9.md). The catalog currently has 82 entries. Searches of source metadata and historical reports found no dedicated RE entry or prior RE admission/hold. Existing `repo-research`, `diagnosing-bugs`, `systematic-debugging`, `variant-analysis`, `security-threat-model`, `handoff` and verification guidance cover adjacent work.

The installed skill inventory supplied to this session has no dedicated binary RE skill. Native file search, shell, browsing, planning and reasoning cover exploration, but do not themselves supply a decompiler or debugger integration. This is a statement about the available session, not a universal claim about every Codex or Claude installation.

This report adds research only. Existing uncommitted work is preserved. No sample, upstream helper, installer, plugin, MCP server, debugger or hardware interaction was executed; no catalog entries, ratings, pins or generated indexes changed.

## Coverage and observations

Queried live search for RE `SKILL.md` files, Ghidra/[official IDA MCP](https://github.com/HexRaysSA/ida-mcp/blob/391c2f0606a773050fbafcd3ff62942688a0713b/README.md) MCPs, protocol reconstruction, mobile analysis, rules corpora and current research. Retrieved complete GitHub recursive file inventories and HEAD metadata for **17 repositories**; all returned inventories were untruncated. Examined more than twenty distinct skill/tool artifacts at differing depths. The accompanying [source ledger](2026-10-29-reverse-engineering-scout-sources.json) records revisions, file hashes, downloads, explicitly read files/sections, and outstanding review.

Sampled search-result pages rather than a complete GitHub or skill-directory census. Searches targeted skills.sh RE, `rev-struct` and `ghidra-headless`; direct skills.sh access failed and no installation telemetry was verified. Queries for awesome-copilot and awesome-cursorrules yielded no shortlisted RE-specific rule. This does not prove those corpora contain none. Discovery expanded beyond directories into specialist maintainers, [Cynthion protocol workflow](https://github.com/curtisgalloway/public-skills/blob/a8e7254a88495228223a1e6fc0b1a58c0e28e0fd/plugins/hardware-lab/skills/cynthion-reverse-engineer/SKILL.md) workflows and primary papers. Search mirrors and [REA investigation skill](https://github.com/morluto/rea/blob/c0c3902207d6b1a33709e42b80c7e570da7db964/.agents/skills/reverse-engineer-anything/SKILL.md) forks were leads, not separate candidates or independent adoption.

| Repository | Stars observed | Repository HEAD date (UTC) | Interpretation |
| --- | ---: | --- | --- |
| [morluto/rea](https://github.com/morluto/rea) | 406,797 | 2026-10-29 | Whole repository; not skill adoption |
| [zhaoxuya520/reverse-skill](https://github.com/zhaoxuya520/reverse-skill) | 43,730 | 2026-09-22 | Whole repository; not skill adoption |
| [wshobson/agents](https://github.com/wshobson/agents) | 41,979 | 2026-10-17 | Whole repository; not skill adoption |
| [mrexodia/ida-pro-mcp](https://github.com/mrexodia/ida-pro-mcp) | 13,208 | 2026-09-26 | Whole repository; not skill adoption |
| [LaurieWired/GhidraMCP](https://github.com/LaurieWired/GhidraMCP) | 11,633 | 2026-10-10 | Whole repository; not skill adoption |
| [P4nda0s/reverse-skills](https://github.com/P4nda0s/reverse-skills) | 2,333 | 2026-05-06 | Whole repository; not skill adoption |
| [HexRaysSA/ida-mcp](https://github.com/HexRaysSA/ida-mcp) | 1,468 | 2026-10-28 | Whole repository; not skill adoption |
| [cyberkaida/reverse-engineering-assistant](https://github.com/cyberkaida/reverse-engineering-assistant) | 885 | 2026-10-27 | Whole repository; not skill adoption |
| [trailofbits/skills-curated](https://github.com/trailofbits/skills-curated) | 522 | 2026-07-14 | Whole repository; not skill adoption |
| [OwenPawl/cerberus-re-skill](https://github.com/OwenPawl/cerberus-re-skill) | 221 | 2026-08-30 | Whole repository; not skill adoption |
| [The-Arabi/Reverse-engineering-agent](https://github.com/The-Arabi/Reverse-engineering-agent) | 38 | 2026-08-04 | Whole repository; not skill adoption |
| [EncidXVII/claude-reverse-engineering-skill](https://github.com/EncidXVII/claude-reverse-engineering-skill) | 18 | 2026-10-19 | Whole repository; not skill adoption |
| [Albasha0x0/Corvus](https://github.com/Albasha0x0/Corvus) | 9 | 2026-10-29 | Whole repository; not skill adoption |
| [curtisgalloway/public-skills](https://github.com/curtisgalloway/public-skills) | 3 | 2026-10-27 | Whole repository; not skill adoption |
| [DorianGallo/reverse-skill](https://github.com/DorianGallo/reverse-skill) | 3 | 2026-06-25 | Whole repository; not skill adoption |
| [PyModel/reverse-engineering-skill](https://github.com/PyModel/reverse-engineering-skill) | 2 | 2026-09-02 | Whole repository; not skill adoption |
| [juank115/reverse-engineerskill](https://github.com/juank115/reverse-engineerskill) | 1 | 2026-09-03 | Whole repository; not skill adoption |

Counts are GitHub API observations on October 29, 2026, scoped to whole repositories. They are attention signals, not installs, users, skill quality or outcome evidence. A large multi-skill repository's count is not assigned to each skill. No comparable historical series was collected, so no growth or momentum ranking is claimed. HEAD dates show repository activity; artifact history below is more relevant to maintenance.

Access limits: shell networking initially could not resolve GitHub; approved read-only network retrieval worked. GitHub API rate limiting subsequently blocked the wshobson artifact-history query. Public web pages and pinned raw files remained available. The fetched [REA investigation skill](https://github.com/morluto/rea/blob/c0c3902207d6b1a33709e42b80c7e570da7db964/.agents/skills/reverse-engineer-anything/SKILL.md) snapshot is a large, fast-changing system; its inventory is not a source audit. No private service access or plugin installation was needed.

## What the workflow landscape actually contains

| Layer | Useful output | Representative sources | Main limitation |
| --- | --- | --- | --- |
| Artifact triage | Identity, architecture, container, compiler clues, extraction route | Encid, juank115, PyModel | Strings/entropy are clues; parser robustness and resource limits matter |
| Code navigation | Relevant functions, xrefs, entry points, data-flow slices | ReVa, Ghidra, [official IDA MCP](https://github.com/HexRaysSA/ida-mcp/blob/391c2f0606a773050fbafcd3ff62942688a0713b/README.md) | Dumping the whole program consumes context without proving understanding |
| Semantic recovery | Types, field offsets, function purpose, ownership and state | P4nda, ReVa | Names and inferred types can make an incorrect interpretation look authoritative |
| Runtime confirmation | Arguments/results, executed branches, module identity | Cerberus, Frida, LLDB, [REA investigation skill](https://github.com/morluto/rea/blob/c0c3902207d6b1a33709e42b80c7e570da7db964/.agents/skills/reverse-engineer-anything/SKILL.md) | Instrumentation changes execution; zero hits are ambiguous |
| Protocol/format recovery | Framing, field hypotheses, state transitions, parser corpus | Cynthion, wshobson, PyModel | Packet boundaries, sample bias and replay validity are frequent gaps |
| Reconstruction | Behavior specification and independently testable implementation | [REA investigation skill](https://github.com/morluto/rea/blob/c0c3902207d6b1a33709e42b80c7e570da7db964/.agents/skills/reverse-engineer-anything/SKILL.md), PyModel | Pretty pseudocode or a replay script does not establish equivalence |
| Durable evidence | Artifact identities, coordinates, tool versions, hypotheses and unknowns | Encid, ReVa, [REA investigation skill](https://github.com/morluto/rea/blob/c0c3902207d6b1a33709e42b80c7e570da7db964/.agents/skills/reverse-engineer-anything/SKILL.md), Cerberus | Persisting conclusions without their uncertainty compounds errors |

MCP and CLI are access choices. An exported decompiler tree may be sufficient for a bounded static question. A live database is valuable when type changes, annotations and repeated xref queries materially improve the analysis. A large workbench earns its cost when the task crosses artifact formats or static/runtime boundaries. There is no demonstrated universal advantage from using MCP alone.

### Research evidence that changes workflow design

The October paper [Humans vs. Machines](https://arxiv.org/abs/2610.14960) compares nine models on two compact static-analysis tasks and reports a tendency for agents to fetch broadly with few revisits. Its separate context-capacity analysis spans 4,000 real binaries. This supports prioritizing selective retrieval and persistent analysis state, but is not proof of human-level performance on arbitrary applications. Abstract reviewed; experiment artifacts and full methods were not audited.

The June [readability-metrics paper](https://arxiv.org/abs/2606.06838) reports that structural similarity alone can reward undesirable cleanup. Its contribution concerns decompiled-code readability; whole-program reconstruction remains outside its stated scope. Treat naming/readability and semantic correctness as separate evaluation axes. Abstract reviewed, not an independently reproduced result.

The May [adversarial RE-agent paper](https://arxiv.org/abs/2605.30667) demonstrates prompt injection through strings exposed by decompilation. This makes target-origin text a concrete trust-boundary issue. Preserve it as evidence without treating it as authority. This paper provides concise proof-of-concept cases, not an attack prevalence estimate. Abstract reviewed.

## Recommend adding

**No unchanged third-party entry is admission-ready on this inspection alone.** Required runtime/resource audits, technical corrections or licensing questions remain for the strongest options. Linked mode would avoid copying a large runtime, but would not resolve a known technical defect or justify an endorsement.

The strongest **design proposal** is an original, portable `reverse-engineering-investigation` workflow, with optional focused references for structure recovery, protocol inference and runtime validation. This is an authoring recommendation, not a finished entry or a rating. Source-reviewed method inspiration appears below; no upstream scripts or expression need to be copied. Prefer this to another generic expert persona or an install-all RE bundle.

A later admission should start at `reviewed`; source inspection, structural checks and curated popularity do not establish agent effectiveness.

## Review next

### 1. Encid: strongest broad headless method to inspect further

**Identity:** [Encid reverse-engineering](https://github.com/EncidXVII/claude-reverse-engineering-skill/blob/9a857bd2ee62bd13aa66b3942bd17c89eabf6b8a/skills/reverse-engineering/SKILL.md) at repository HEAD `9a857bd2ee62bd13aa66b3942bd17c89eabf6b8a`. The separate [cross-cutting workflow](https://github.com/EncidXVII/claude-reverse-engineering-skill/blob/9a857bd2ee62bd13aa66b3942bd17c89eabf6b8a/skills/reverse-engineering/references/workflow.md) last changed at `240df475465b8777052b3b96f8324866f203e482` on October 12. Full subtree admission would need its own last-path commit.

**Read:** complete entrypoint, cross-cutting workflow, findings template and root [license text](https://github.com/EncidXVII/claude-reverse-engineering-skill/blob/9a857bd2ee62bd13aa66b3942bd17c89eabf6b8a/LICENSE). Downloaded 24 files, including platform playbooks and helpers; downloading is not reviewing. Native/mobile/dynamic references, tool detection, triage, endpoint extraction and Java/Python exporters remain unaudited.

**Value:** practical shell-first operation, explicit skill-path rebasing for other hosts, bounded reading of exports, target-type routing, address-linked findings, evidence-type labels, and a direct instruction to treat target text as data. It distinguishes source-repository analysis from missing-source artifact investigation. These are useful additions beyond generic `repo-research` and debugging.

**Limits:** broad trigger and a substantial resource tree; automatic preference for any connected RE MCP can override a better project-specific route. Its Ghidra/JDK assumptions need checking against the selected release, rather than interpreting its JDK 21 example as universally current. The root license labels itself Apache-2.0 but abbreviates multiple clauses relative to the canonical text; preserve the actual terms and clarify provenance before calling this a standard Apache vendoring candidate.

**Fit:** usefulness high for RE; method quality promising; portability high after explicit path handling; novelty moderate-to-high in this catalog. **Disposition:** review next, preferably a linked option after helper/resource inspection and license clarification. First trial: locate one behavior in a stripped native fixture, then recover a cross-module behavior in an Electron fixture. Evaluate findings, not the breadth of the tool list.

### 2. ReVa: strongest focused investigation model in the sample

**Identity:** [ReVa deep-analysis](https://github.com/cyberkaida/reverse-engineering-assistant/blob/a2fcd946ec9c0bcf204da308365c16abb781dc53/ReVa/skills/deep-analysis/SKILL.md) and [ReVa binary-triage](https://github.com/cyberkaida/reverse-engineering-assistant/blob/a2fcd946ec9c0bcf204da308365c16abb781dc53/ReVa/skills/binary-triage/SKILL.md) at HEAD `a2fcd946ec9c0bcf204da308365c16abb781dc53`. Deep-analysis subtree last changed at `d4195002d43f48863b9576b235ba76de50fe73eb`, March 15; October repository activity does not make that procedure newly maintained.

**Read:** triage entrypoint and substantial deep-analysis sections, including investigation loop, evidence/assumption rules, tool guidance and final worked example. Remaining tool/server implementations, packaging and the entire deep-analysis text are not fully audited. Root and ReVa license files were downloaded; full licensing review remains outstanding.

**Value:** separate breadth-first triage from a focused question; read, interpret, improve types/names, re-decompile, follow evidence and return unresolved threads. It gives specific retrieval sizes and address-based handoff. `systematic-debugging` supplies hypothesis testing but does not address decompiler database refinement.

**Defects/limits:** mandatory database improvement and fixed 10–15-call / 3+ fact targets are poor universal completion criteria. Re-reading after a type change checks its effect on the decompiler, not independent semantic truth. The final example concludes AES from an AES S-box and a substitution/XOR expression; that is insufficient to identify the full AES algorithm. Triage's named/unnamed ratio similarly provides a stripping clue, not definitive stripping status. Specific ReVa tool names and `TodoWrite` reduce portability.

**Fit:** high domain usefulness and novelty, mixed example quality, moderate portability. **Disposition:** review next as a linked Ghidra option; independently author the portable method rather than copy its arbitrary budgets and overconfident example. Inspect the server and license closure, then test whether renaming/type changes improve correct understanding without reinforcing a false hypothesis.

### 3. Official Hex-Rays [official IDA MCP](https://github.com/HexRaysSA/ida-mcp/blob/391c2f0606a773050fbafcd3ff62942688a0713b/README.md) MCP: first [official IDA MCP](https://github.com/HexRaysSA/ida-mcp/blob/391c2f0606a773050fbafcd3ff62942688a0713b/README.md) integration to trial

**Identity:** [official IDA MCP](https://github.com/HexRaysSA/ida-mcp/blob/391c2f0606a773050fbafcd3ff62942688a0713b/README.md), HEAD `391c2f0606a773050fbafcd3ff62942688a0713b`; MCP source path last changed at `c9e5273910617d1e5e21660ed897294efe6c2fd8`, October 28. Pinned `pyproject.toml` declares package `20261028.0.3`.

**Read:** README, dependency manifest, MIT [MIT license](https://github.com/HexRaysSA/ida-mcp/blob/391c2f0606a773050fbafcd3ff62942688a0713b/LICENSE), and selected [official MCP implementation](https://github.com/HexRaysSA/ida-mcp/blob/391c2f0606a773050fbafcd3ff62942688a0713b/ida_mcp/mcp.py) sections for opening, Python execution, reference lookup, listing, saving and closing databases. Trace and lifecycle infrastructure, Nexus, ZeroMCP, CLI, plugins and tests were not fully audited.

**Value:** vendor-maintained access with headless and GUI database coordination. The README requires [official IDA MCP](https://github.com/HexRaysSA/ida-mcp/blob/391c2f0606a773050fbafcd3ff62942688a0713b/README.md) 9.4+, idalib, Python 3.11+, Git and uv. Actual decompiler/processor availability still depends on the installed [official IDA MCP](https://github.com/HexRaysSA/ida-mcp/blob/391c2f0606a773050fbafcd3ff62942688a0713b/README.md) entitlement. This is an optional backend, not a replacement for an investigation method.

**Important change:** [mrexodia IDA Pro MCP](https://github.com/mrexodia/ida-pro-mcp/blob/c133c3853faa111a9b00ee615c013b720d0c4acd/README.md) explicitly recommends the official server. The two expose different contracts: official source uses `open_database`, `execute_python`, `reference` and database lifecycle tools. Do not assume a recipe naming mrexodia-specific tools will work unchanged. This conclusion is checked against actual official source, not solely the [REA investigation skill](https://github.com/morluto/rea/blob/c0c3902207d6b1a33709e42b80c7e570da7db964/.agents/skills/reverse-engineer-anything/SKILL.md) issue discussion.

**Effects:** `execute_python` is an arbitrary analysis/programming surface, including database mutation; save/flush and local session logs deserve explicit review. The package depends on `ida-nexus>=0.14.2`, `zeromcp>=1.10.3` and `packaging`; reviewing this wrapper does not audit those dependencies. **Fit:** high usefulness for licensed [official IDA MCP](https://github.com/HexRaysSA/ida-mcp/blob/391c2f0606a773050fbafcd3ff62942688a0713b/README.md) users, good vendor alignment, moderate portability with high environment cost, high capability novelty here. **Disposition:** first integration trial, then a linked MCP entry if the lifecycle and installation route pass review. Do not install both [official IDA MCP](https://github.com/HexRaysSA/ida-mcp/blob/391c2f0606a773050fbafcd3ff62942688a0713b/README.md) servers by default.

### 4. [REA investigation skill](https://github.com/morluto/rea/blob/c0c3902207d6b1a33709e42b80c7e570da7db964/.agents/skills/reverse-engineer-anything/SKILL.md): broadest artifact-investigation candidate in this sample

**Identity:** [REA investigation skill](https://github.com/morluto/rea/blob/c0c3902207d6b1a33709e42b80c7e570da7db964/.agents/skills/reverse-engineer-anything/SKILL.md) at HEAD `c0c3902207d6b1a33709e42b80c7e570da7db964`; public skill subtree last changed at `8188497f13477918f2b696689c3598b65f11a7c5`, October 29. Original repository is `morluto/rea`; search-discovered forks are deduplicated.

**Read:** entrypoint sections for connection ownership/recovery, target routing, summary-first retrieval, evidence/unknowns and broader investigations. Seven referenced guides, notices, README and license were downloaded but not completely read. Runtime source, dependency graph, provider bridges and evaluation fixtures remain unaudited.

**Value:** common evidence records, explicit target identity, retained result paging, reuse of investigation state and artifact-to-feature tracing. Its source warns that repository-main skill capabilities can exceed an older npm package. It explicitly separates installing the skill from registering a server; plugin installation can register the server. This distinction matters to catalog packaging.

**Limits:** 6,782 inventoried files and a very large capability surface. The skill contains dozens of format-specific routes; a thin copy is not the product. External engine/runtime requirements vary by target. README demos and verification commands are author evidence, not independent outcomes. GitHub returned 406,797 repository stars; this striking count is retained as an API observation, not verified adoption or a reason to waive review.

**Fit:** high usefulness for cross-format work, potentially high quality, moderate portability and substantial operational cost. Overlap with ordinary source research is explicitly excluded upstream. **Disposition:** review next as a linked workbench. Pin the package, inspect the relevant provider and reference chain, then trial one native and one packaged-JavaScript investigation. Verify the current official-[official IDA MCP](https://github.com/HexRaysSA/ida-mcp/blob/391c2f0606a773050fbafcd3ff62942688a0713b/README.md) adapter separately; an older issue claiming no support cannot establish the current snapshot's behavior.

### 5. Cerberus RE: strongest Apple-specific workflow lead

**Identity:** [Cerberus RE](https://github.com/OwenPawl/cerberus-re-skill/blob/3116c94de17386d18367ed14e55dd2c7d1c7fe14/SKILL.md) at `3116c94de17386d18367ed14e55dd2c7d1c7fe14`, repository HEAD dated August 30. Artifact-path history not collected.

**Read:** complete root skill and selected README sections; dependency manifest and root Apache-labelled license downloaded, not fully reviewed. References, Python runtime, bridge extension, LLDB/Frida helpers, installers and benchmarks remain outstanding.

**Value:** Ghidra exports → LLDB/Frida observation → correlation into durable evidence. Explicit Mach-O slice selection, distinguishing a dyld-cache stub from an extracted binary, module-qualified hooks and checking warnings before interpreting zero XPC counts are useful domain detail. Runtime attach and bridge mutation are explicitly gated by its CLI.

**Limits:** substantial executable workbench; prescribed `~/ghidra-projects` workspace and milestone/release checks exceed a minimal consumer method. Strongly encourages a separate long-run-agent companion, though it documents bounded standalone use. Companion MCP tool composition expands integration scope. **Fit:** high Apple-specific usefulness/novelty; method promising; narrower target portability. **Disposition:** review next as a linked specialist alternative, not a mandatory companion stack. Trial static/runtime joins on an owned small Mach-O with known behavior before evaluating larger frameworks.

### 6. Cynthion: strongest concrete protocol experiment design

**Identity:** [Cynthion protocol workflow](https://github.com/curtisgalloway/public-skills/blob/a8e7254a88495228223a1e6fc0b1a58c0e28e0fd/plugins/hardware-lab/skills/cynthion-reverse-engineer/SKILL.md) at HEAD `a8e7254a88495228223a1e6fc0b1a58c0e28e0fd`; skill subtree last changed at `322192876442b066dd31690a190773c7f903d099`, September 24.

**Read:** complete entrypoint and [sibling decoder loader](https://github.com/curtisgalloway/public-skills/blob/a8e7254a88495228223a1e6fc0b1a58c0e28e0fd/plugins/hardware-lab/skills/cynthion-reverse-engineer/scripts/_sibling.py); remaining five helpers, synthetic example and sibling decoder runtime downloaded or inventoried but not audited. Apache-2.0 SPDX headers are present in the read files; root license downloaded, full review outstanding.

**Value:** labelled baseline/variant captures → transaction diff → field hypotheses → replay/emulation scaffold → protocol document. It explicitly explains two-capture ambiguity, fixed-length assumptions and that replaying observations does not establish a protocol model. These limitations are unusually concrete.

**Closure:** `cynthion-pcap-decode` is required, not merely a suggested sibling. `_sibling.py` searches environment overrides and multiple user/workspace roots, then imports `decode`. A standalone catalog entry must include reviewed required code within its own directory or provide a complete linked installation route. Hardware, Packetry, optional tshark, libusb and Facedancer add costs; generated replay interacts with a real device.

**Fit:** excellent specialist job, low general-project frequency, moderate portability, high novelty. **Disposition:** review next for hardware users. Audit decoder closure and generators, verify advertised Facedancer/platform assumptions, run the synthetic example only in a later authorized trial, then validate on hardware. Extracting the general experimental method is more broadly useful than imposing [Cynthion protocol workflow](https://github.com/curtisgalloway/public-skills/blob/a8e7254a88495228223a1e6fc0b1a58c0e28e0fd/plugins/hardware-lab/skills/cynthion-reverse-engineer/SKILL.md) tooling on every RE task.

## Watch / hold / skip

### P4nda: focused structure/symbol recovery; hold unchanged admission

**Identity:** [rev-struct](https://github.com/P4nda0s/reverse-skills/blob/a2baa31c58a3567977188414da68c8c842057152/skills/rev-struct/SKILL.md), [rev-symbol](https://github.com/P4nda0s/reverse-skills/blob/a2baa31c58a3567977188414da68c8c842057152/skills/rev-symbol/SKILL.md) and [rev-frida](https://github.com/P4nda0s/reverse-skills/blob/a2baa31c58a3567977188414da68c8c842057152/skills/rev-frida/SKILL.md) at `a2baa31c58a3567977188414da68c8c842057152`; `rev-struct` last changed at `bfcf083646dbf78be4d68689e739c5a9e3c2e066`, April 21. Read all three entrypoints and README_EN; other five skill payloads are unreviewed.

**Why interesting:** infer structure fields across callers/callees and recover function meaning from strings, constants, imports and argument patterns. Plain exported files can be analyzed without a live bridge. This fills a concrete gap beyond general debugging.

**Blockers:** all twelve repository file paths were enumerated; there is no license file, despite the README's MIT assertion. Do not infer redistribution permission from that label. `rev-struct` treats max accessed offset plus width as structure size; it is generally an observed extent/lower bound, not proof of total size. Pointer arithmetic must be scaled by the current pointee type; text patterns such as `*(a1 + 8)` do not universally mean byte offset eight. A leading pointer table is a vtable hypothesis, not a guaranteed object classification.

The “modern” Frida skill still includes `Module.getExportByName(null, "open")`. Current [Frida API documentation](https://frida.re/docs/javascript-api/) uses module-instance lookup or `Module.getGlobalExportByName`. It also provides module observers; the skill's loader-hook recipe needs comparison with that supported route. [Frida 17 release notes](https://frida.re/news/2025/05/17/frida-17-0-0-released/) distinguish custom-agent bridge packaging from REPL conveniences. Do not treat a CLI snippet as universally portable to a custom embedded agent.

**Disposition:** hold vendoring and unchanged endorsement. Consider a linked proposal after technical correction/license clarification, or independently author a field-evidence method using official tool contracts. No source expression or helper was copied here. Fit: high focused value, mixed technical quality, moderate [official IDA MCP](https://github.com/HexRaysSA/ida-mcp/blob/391c2f0606a773050fbafcd3ff62942688a0713b/README.md) coupling, high domain novelty.

### Ghidra headless: useful bridge-free fallback with concrete defects

**Identity:** [Ghidra headless](https://github.com/trailofbits/skills-curated/blob/6d05be4889017b06fb15069f371afd220daffb62/plugins/ghidra-headless/skills/ghidra-headless/SKILL.md) at HEAD `6d05be4889017b06fb15069f371afd220daffb62`; subtree last changed at `07277a6b5bd92a0d06842cff42c827ba7353185e`, February 12. Plugin README credits Armin Ronacher's `mitsuhiko/agent-stuff/skills/ghidra`; that original ancestry needs a separate pinned check. This is the **skills-curated** repository, not the existing catalog's differently licensed `trailofbits/skills` source.

**Read:** skill, plugin README, both shell helpers, complete `ExportFunctions.java` and `ExportCalls.java`, plus selected sections of the other four Java exporters and plugin-scoped Apache-2.0 license. Remaining Java sections, plugin manifest and original-source license provenance are outstanding.

**Defects:** [ExportCalls.java](https://github.com/trailofbits/skills-curated/blob/6d05be4889017b06fb15069f371afd220daffb62/plugins/ghidra-headless/skills/ghidra-headless/scripts/ghidra_scripts/ExportCalls.java) keys graph/address maps by unqualified function name, so two functions with the same name overwrite each other. [ExportFunctions.java](https://github.com/trailofbits/skills-curated/blob/6d05be4889017b06fb15069f371afd220daffb62/plugins/ghidra-headless/skills/ghidra-headless/scripts/ghidra_scripts/ExportFunctions.java) silently caps caller/callee lists at 50. `ExportAll.java` emits a bare functions array whereas the dedicated exporter emits an object containing `functions`; downstream consumers must distinguish schemas. [headless wrapper](https://github.com/trailofbits/skills-curated/blob/6d05be4889017b06fb15069f371afd220daffb62/plugins/ghidra-headless/skills/ghidra-headless/scripts/ghidra-analyze.sh) uses `-analysisTimeoutPerFile`, which is not a whole-process or per-decompiler export deadline. Its project deletion behavior requires careful use with existing project names.

The skill says Java 17+ without pinning an applicable Ghidra release. [Current Ghidra repository instructions](https://github.com/NationalSecurityAgency/ghidra/blob/master/README.md) specify JDK 25; this is development HEAD evidence, not proof that every stable release requires 25. Verify the chosen release's own requirements. The bundle's February artifact history reinforces the need for a version-specific check.

**Disposition:** hold unchanged adoption. Keep the basic headless route as an optional integration pattern; correct upstream or independently author a bounded export that keys by artifact/address and reports omissions. No upstream scripts were executed, so these are static source findings, not reproduced runtime failures. Fit: high fallback usefulness, mixed output integrity, shell/JVM portability costs, moderate novelty beyond direct Ghidra scripting.

### wshobson protocol skill: broad examples, incomplete transport correctness

**Identity:** [protocol-reverse-engineering](https://github.com/wshobson/agents/blob/0874a27b17a22e2b7c2e2bcd725768e0803cad06/plugins/reverse-engineering/skills/protocol-reverse-engineering/SKILL.md) at `0874a27b17a22e2b7c2e2bcd725768e0803cad06`. Artifact-history request hit API rate limits; repository HEAD is not an admission pin. Read full entrypoint, both required references and root MIT license.

**Value:** capture/identify/map/document/validate sequence, parser bounds checks, a protocol specification and Lua dissector. Optional dependencies include Wireshark/tshark, Scapy, mitmproxy and boofuzz. `binary-analysis-patterns`, anti-reversing and memory-forensics are adjacent artifacts, not audited by reading this skill.

**Limits:** raw Scapy packet replay does not recreate an application's TCP session or message state. The modification example resets checksums but does not explicitly repair every affected length/state field. [Lua dissector reference](https://github.com/wshobson/agents/blob/0874a27b17a22e2b7c2e2bcd725768e0803cad06/plugins/reverse-engineering/skills/protocol-reverse-engineering/references/protocol-documentation.md) invokes `dissect_tcp_pdus` but returns before it when fewer than four magic bytes arrive. Static inspection suggests a 1–3-byte initial header fragment cannot request reassembly through this path; confirm using a deliberately segmented capture. Correctness requires TCP reassembly and multi-PDU tests, as the [Wireshark developer guide](https://www.wireshark.org/docs/wsdg_html_chunked/ChDissectReassemble.html) explains. This is an unrun source-level concern, not a claimed failed test.

**Disposition:** hold unchanged recommendation until fragmented header, coalesced message, truncation and invalid-length cases are checked. Complete source closure is stronger than many alternatives, but a linked entry should still disclose/correct consequential examples. Fit: useful protocol introduction, mixed technical quality, moderate portability, moderate novelty.

### Other sampled candidates and leads

| Candidate | Inspection and disposition |
| --- | --- |
| [beginner RE skill](https://github.com/juank115/reverse-engineerskill/blob/02a29545cc16599b5f181f082a9d96dbce82791f/skills/reverse-engineering/SKILL.md), `02a29545cc16599b5f181f082a9d96dbce82791f` | Full entrypoint and first 190 lines of triage helper read. Beginner-friendly but malware-centric and heavy on repeated execution confirmations; seven references and helper remainder unaudited. Keep as educational alternative, not general default. MIT file downloaded; applicable terms need final review. |
| [PyModel RE skill](https://github.com/PyModel/reverse-engineering-skill/blob/d531c4fdfec68171f0b9f0da7a3db2710fcd9a6a/SKILL.md), `d531c4fdfec68171f0b9f0da7a3db2710fcd9a6a` | Full entrypoint, protocol reference, layout validator and MIT license read. Useful observed/inferred/proposed distinctions. Reject unchanged adoption: “No legal, no consent” directive conflicts with preserving task authority. The layout validator checks intervals/size, not ABI correctness or actual alignment despite the docstring; an overlap rejection also cannot represent legitimate unions. Remaining runtime/helpers and references unaudited. |
| [zhaoxuya protocol-reverse](https://github.com/zhaoxuya520/reverse-skill/blob/cab634bd855fc287f6e420c1f36fd1a6b9245960/skills/protocol-reverse/SKILL.md), `cab634bd855fc287f6e420c1f36fd1a6b9245960` | Protocol entrypoint and selected RE-agent workflow sections read. Concrete framing/state-machine output, but immediately depends on sibling journals, tool index, PowerShell case setup and multiple operational layers. Hold standalone install pending full resource closure. Do not import its authorization bureaucracy or broad suite implicitly. License file downloaded, not fully reviewed. |
| [DorianGallo/reverse-skill](https://github.com/DorianGallo/reverse-skill), `b95e889fa8666fedfc6929f68cfe7dbb9c70a4f4` | Large competition-oriented artifact family; entrypoint downloaded, full review not completed. Similar names and content routes require provenance checks against zhaoxuya rather than assuming independence or applying a fork label from appearance. Watch; not a separate recommendation. |
| [LaurieWired/GhidraMCP](https://github.com/LaurieWired/GhidraMCP), `1e980252087b2479a21b9ca6d82d5829538651a7` | Dependency manifest read: Python 3.10+, MCP/requests, optional PyGhidra. README/license downloaded; server/extension unaudited. Established Ghidra alternative to compare with ReVa in a backend trial; no superiority claim. |
| [mrexodia IDA Pro MCP](https://github.com/mrexodia/ida-pro-mcp/blob/c133c3853faa111a9b00ee615c013b720d0c4acd/README.md), `c133c3853faa111a9b00ee615c013b720d0c4acd` | README current migration recommendation checked. Retain as compatibility option for existing environments; trial official server first for new [official IDA MCP](https://github.com/HexRaysSA/ida-mcp/blob/391c2f0606a773050fbafcd3ff62942688a0713b/README.md) work. Server, skills and transitive runtime unreviewed. |
| [The-Arabi/Reverse-engineering-agent](https://github.com/The-Arabi/Reverse-engineering-agent), `c16af7d5c25f30007e2ae2d9e6dfd524d3aff0d9` | Inventory/README discovery only. Multiple host copies, knowledge-store and tool orchestration scope. Hold full bundle; inspect one binary-analysis path before ranking it against [REA investigation skill](https://github.com/morluto/rea/blob/c0c3902207d6b1a33709e42b80c7e570da7db964/.agents/skills/reverse-engineer-anything/SKILL.md). |
| [Albasha0x0/Corvus](https://github.com/Albasha0x0/Corvus), `79f8f8ca9539448e01ee2a3900ecdc2e52b7eea6` | Inventory and README discovery/download only. Own engine and managed-code claims are interesting; 2,809-file runtime remains unaudited. Watch emerging tool; no performance claim. |
| [bkerler master gist](https://gist.github.com/bkerler/301c33b363ad3ff02160b3a11ddc247e) | Search-discovered broad router for tools/reporting/notes. Exact gist revision/license/resource closure not inspected; watch rather than adopt an unpinned master instruction file. |
| [inliver233 Flutter skill](https://github.com/inliver233/reverse-skills) | Search lead reports malformed YAML and a single-campaign playbook. Verify actual pinned file and license before any conclusion or admission. Narrow campaign experience is not general effectiveness. |
| [a5c-ai babysitter Ghidra/IDA skill](https://github.com/a5c-ai/babysitter/blob/main/library/specializations/security-research/skills/ghidra-ida-re/SKILL.md) | Search entrypoint describes capabilities and framework processes; implementation/resource review outstanding. Lower priority than a runnable focused method. |
| connorads reverse-engineering directory listing | Original repository unresolved; attempted `connorads/skills` API path returned 404. Do not rank a directory mirror as original source. |

## Proposed portable workflow

The following is a research specification for later authoring, not an installed skill or an instruction to execute tools now.

1. **Bind the question and artifact.** Record what must be understood, artifact hash/build, platform, architecture/slice, available source and existing analysis state. Reuse the user's established scope. Choose the smallest artifact that can answer the question.
2. **Identify the representation.** Route native code, managed bytecode, packaged scripts, firmware, data formats and captures to suitable tools. Preserve archive member paths and hashes; do not disassemble a launcher when extracted application logic answers the question.
3. **Build a small map.** Inspect relevant sections, imports/exports, strings, entry points and known callbacks. Record parsing failures and omitted regions. Separate sample-derived text from instructions.
4. **Locate a behavioral anchor.** Follow a UI action, diagnostic string, export, input field, output artifact or packet type into relevant code. Use addresses and xrefs to narrow retrieval; preserve the unresolved frontier instead of dumping every function.
5. **Test a hypothesis.** State the interpretation and what would disprove it. Check assembly, callers/callees, data references and types. Change names/types provisionally; record the original and re-decompile to inspect consequences. Better-looking output is not confirmation by itself.
6. **Escalate evidence only when needed.** Use bounded debugging, tracing, instrumentation or emulation when static evidence cannot settle runtime values or paths. Bind module/build and address translation, inputs, environment, timeouts and observable outputs. Keep runtime findings distinct from static predictions and note instrumentation effects.
7. **Recover a contract.** Document relevant fields, widths, byte order, bounds, ownership, state transitions and error behavior. Retain competing layouts, unknown fields, possible aliases/unions and lower bounds on size. For protocols, reassemble the transport before inferring message framing.
8. **Challenge the contract.** Test other callers, contrasting inputs, different sessions and held-out captures. For reconstruction, check error behavior and side effects as well as happy-path outputs. A replay or one matching example is insufficient to establish equivalence.
9. **Deliver and checkpoint.** Answer each original question as supported, partial or unresolved. Link evidence to artifact plus coordinate and tool/version. Record bounded negative searches, changes to analysis state, remaining hypotheses and the cheapest next discriminating check.

Avoid mandatory database mutation, universal time/tool-call quotas, compulsory remote uploads, broad tool installation, and forced malware reporting for ordinary interoperability work. Related catalog entries should be optional companions.

### Conditional methods that deserve their own references

| Method | Evidence to retain | Common wrong conclusion to prevent |
| --- | --- | --- |
| Structure recovery | Cross-function byte offsets, access widths, allocation evidence, alignment assumptions | Highest accessed field proves total object size |
| Symbol recovery | Constants plus control/data flow and caller context | One recognizable constant proves an entire algorithm |
| Runtime/static join | Build identity, module load base, RVA/file offset mapping, actual probe hits | An installed hook with zero hits proves absence |
| Protocol recovery | Reassembled stream, labelled scenarios, field hypotheses, checksum coverage, state | One packet equals one application message |
| Version comparison | Build/compiler/config differences, stable match evidence, changed behavior | Every changed byte reflects a semantic change |
| Reconstruction | Behavior spec, held-out fixtures, state/error/side-effect comparisons | Cleaner pseudocode equals the original source or equivalent software |

## Revisit existing entries

No existing entry needs repinning or replacement based on this survey. `repo-research` remains the appropriate source-repository onboarding route; a new RE entry should trigger on shipped artifacts or missing-source behavior. `variant-analysis` remains conditional on a known root cause and could follow a confirmed binary finding, but its source-oriented scanner examples do not become general binary scanners. `security-threat-model` and `systematic-debugging` remain complementary. Reuse `handoff` and verification evidence principles without making them compulsory dependencies.

## Changes since baseline and remaining questions

This is the first dedicated RE research pass found in the repository. It identifies missing domain coverage, separates method from runtime, verifies the current official [official IDA MCP](https://github.com/HexRaysSA/ida-mcp/blob/391c2f0606a773050fbafcd3ff62942688a0713b/README.md) transition, and records technical/packaging holds. No previous unrelated hold is resolved: the [October 27 queue](2026-10-27-catalog-scout.md), [frontend queue](2026-10-28-catalog-scout-6.md), [design admission limits](2026-10-28-design-admission.md) and [UX admission limits](2026-10-29-ux-admission.md) remain in force.

Open questions include helper parser robustness, full license/resource closure, stable-release Ghidra/JDK compatibility, current [REA investigation skill](https://github.com/morluto/rea/blob/c0c3902207d6b1a33709e42b80c7e570da7db964/.agents/skills/reverse-engineer-anything/SKILL.md) provider behavior, API compatibility across Frida embedding modes, and whether persistent renaming/types actually improve correct understanding. None can be answered by star counts or schema validation.

## Top five priorities

1. **Author a small portable investigation workflow for review.** Strongest catalog fit and lowest deployment cost. Include explicit evidence types and conditional structure/protocol/runtime references. This is an original authoring proposal; no unchanged upstream addition is approved.
2. **Trial official Hex-Rays MCP for [official IDA MCP](https://github.com/HexRaysSA/ida-mcp/blob/391c2f0606a773050fbafcd3ff62942688a0713b/README.md) users.** It has the clearest vendor maintenance path and current upstream endorsement. Inspect lifecycle/dependencies first; compare against existing mrexodia installations only where compatibility matters.
3. **Complete Encid's resource/helper and license review.** Best broad lightweight-skill lead in this sample; preferable to reviewing every giant suite. Use a pinned two-target trial after review.
4. **Compare ReVa and a direct Ghidra headless route on the same question.** Measure correctness, retrieval cost and evidence coverage. Resolve graph identity/truncation/version defects before reusing the sampled export bundle.
5. **Choose the specialist branch by actual demand.** [REA investigation skill](https://github.com/morluto/rea/blob/c0c3902207d6b1a33709e42b80c7e570da7db964/.agents/skills/reverse-engineer-anything/SKILL.md) for cross-format application investigations; Cerberus for Apple static/runtime correlation; Cynthion for [Cynthion protocol workflow](https://github.com/curtisgalloway/public-skills/blob/a8e7254a88495228223a1e6fc0b1a58c0e28e0fd/plugins/hardware-lab/skills/cynthion-reverse-engineer/SKILL.md) protocol experiments. Review one relevant backend and resource chain before expanding the installation surface.

A useful later evaluation uses small owned fixtures with hidden ground truth: misleading constants, duplicate function names, a stripped structure with trailing fields, fragmented/coalesced protocol messages, a delayed-loaded module and an injected instruction string. Score correct conclusions and explicit uncertainty, evidence coordinates, omitted-path disclosure, tool cost and installation friction separately. No such agent or runtime evaluation was run during this research.
