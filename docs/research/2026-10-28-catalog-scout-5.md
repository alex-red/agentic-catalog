# Rust frontier: skills, verification workflows and semantic tools

## Scope and baseline

**As of / researched:** October 28, 2026, America/Edmonton. Focused live research into advanced Rust guidance for coding agents: unsafe/FFI correctness, asynchronous cancellation, memory-model testing, fuzzing, bounded verification, and language-server tooling. “Cutting edge” means differentiated capability beyond generic ownership/style advice; it does not mean every tool here is newly invented.

Baseline: [popular-library review](2026-10-28-catalog-scout-4.md), [October 27 queue](2026-10-27-catalog-scout.md), `PLAN.md`, `CONTRIBUTING.md`, and [decisions 19–33](../decisions.md). The catalog has 56 entries and seven collections, including focused security review. It has no dedicated Rust entry. Existing `property-based-testing`, `variant-analysis`, `security-threat-model`, `diagnosing-bugs`, `verification-before-completion` and `repo-research` cover adjacent methods.

**Finding:** the strongest direction is a small Rust verification workflow and a narrowly scoped Tokio correctness skill. Several sophisticated upstream bundles contain technically consequential errors. Trail of Bits' Rust review is the most interesting integrated security candidate, but the inspected revision needs correction before admission. Semantic rust-analyzer integration deserves a separate runtime review.

## Coverage and observations

Reviewed nine pinned source candidates: Actionbook, Apollo, Leonardo Maldonado, Josh Thomas, low-level-dev-skills, Trail of Bits, wshobson, ECC, and dexwritescode/rust-mcp. Full repository file inventories were obtained for eight; the MCP candidate has only selected root files. Some inventories came from the preceding same-day tree response at the identical revision. Pinned tarballs were read as data: regular files only, no symlinks or path traversal, no upstream code executed.

Discovery also covered Miri, Rust sanitizers, Loom, Kani, cargo-fuzz, nextest, cargo-mutants and cargo-semver-checks through primary documentation. These are potential workflow ingredients, not automatically installable catalog skills. Search results about other MCP servers, cargo-skill and Rust rule directories were leads, not completed reviews. The [companion snapshot](2026-10-28-rust-scout-sources.json) records revisions, inventory method, inspection scope and access limits.

| Observation, checked October 28 | Signal | Interpretation |
| --- | --- | --- |
| [Actionbook repository page on skills.sh](https://www.skills.sh/actionbook/rust-skills) | 122.7K total installs; 38-skills header | Aggregate CLI-channel activity across the library, not per-skill quality |
| [Leonardo's Rust skill](https://www.skills.sh/leonardomso/rust-skills) | 6.5K total installs | Attention for the single entrypoint, not evaluation of all 265 rules |
| [Trail of Bits rust-review](https://www.skills.sh/trailofbits/skills/rust-review) | 2.1K installs | Skill-channel observation, distinct from stars for the entire security library |
| [low-level-dev-skills detail page](https://www.skills.sh/mohitmishra786/low-level-dev-skills/rust-sanitizers-miri) | 468 installs | Cached detail observation; library listing displayed 536 for the same item, so do not combine the values or infer growth |

No new GitHub-star census or comparable adoption/outcome study was completed. Git HEADs establish source identity, not maintenance velocity. Registry rankings, advertised coverage and author benchmarks do not establish that these items improve coding outcomes.

## Recommend adding: two narrow authoring proposals

No inspected upstream Rust bundle clears unchanged admission in this pass. The following are independently authored proposals grounded in verified primary contracts; they need concrete payload review before entry admission at `reviewed`.

### 1. Rust verification ladder — portable workflow

**Job:** choose the smallest appropriate verification layer for a Rust change, record its configuration and limits, and preserve a failing case as a regression. This adds language-specific evidence selection beyond `verification-before-completion`; it does not replace Cargo, CI or a project's existing checks.

| Question | Appropriate evidence | Scope limit |
| --- | --- | --- |
| Does the supported configuration build and behave correctly? | Existing formatting, Clippy and tests; optional [nextest](https://nexte.st/) for test execution | Respect the project's MSRV, target and supported feature combinations; do not assume all features can be enabled together |
| Could an unsafe abstraction violate validity or aliasing? | A written invariant plus focused [Miri](https://github.com/rust-lang/miri) tests on a recorded nightly | Passing sampled executions is not a proof of soundness; platform/FFI support constrains coverage |
| Is a synchronization algorithm correct under different schedules? | Small models using [Loom's instrumented types](https://docs.rs/loom/latest/loom/) | Uninstrumented operations are outside the model; bound the state space and report limits |
| Can malformed or structured input break a parser or boundary? | [cargo-fuzz](https://rust-fuzz.github.io/book/cargo-fuzz/setup.html), a useful oracle, corpus and minimized crash regression | Requires a suitable harness/toolchain/platform; set a campaign budget rather than starting an unbounded run |
| Can a small algorithm satisfy a precise property over symbolic inputs? | [Kani proof harnesses](https://model-checking.github.io/kani/) | Record assumptions, unwind bounds and unsupported features; Kani is not a substitute for concurrency model checking |
| Do passing tests actually reject plausible bugs? | Targeted [cargo-mutants](https://github.com/sourcefrog/cargo-mutants) runs | Requires reliable tests; classify surviving mutants rather than gaming a percentage |
| Could a library API change break downstream users? | [cargo-semver-checks](https://github.com/obi1kenobi/cargo-semver-checks) with an explicit baseline and feature selection | Published-registry lookup is optional; baseline revision/root can be supplied, and configuration affects coverage |

**Admission path:** original workflow written here from primary documentation, with references and explicit prerequisites. Do not copy flawed upstream Miri or Loom examples. No hook, service, background model, nightly override or tool installation should be implicit. Usefulness is high for Rust libraries/systems code, portability high as a documented procedure, novelty moderate-to-high in selecting evidence, and quality depends on keeping the procedure conditional rather than running every tool for every edit.

**Next step:** author a compact workflow with a report contract: tool versions, commands, target/features, assumptions, time limits, result, and remaining coverage. Validate representative commands on a disposable Rust fixture when that implementation work is requested; source review alone does not establish runtime success.

### 2. Tokio async correctness — focused skill

**Job:** review task ownership, cancellation, backpressure and shutdown, then design a regression that exposes the failure. Center on [Tokio's select contract](https://docs.rs/tokio/latest/tokio/macro.select.html) and [JoinSet lifecycle](https://docs.rs/tokio/latest/tokio/task/struct.JoinSet.html), not blanket “use Arc” or “never hold any lock” rules.

Useful checks: identify what state is lost on each cancellation point; distinguish data loss from loss of queue position; handle EOF and closed channels; bound spawned tasks and queues; distinguish dropping a JoinHandle from dropping a JoinSet; drain/observe termination and errors where the intended lifecycle requires it. Existing generic debugging and property-testing entries do not own this runtime-specific contract.

**Inspiration inspected:** Leonardo's complete [async-cancel-safety](https://github.com/leonardomso/rust-skills/blob/fd2a861ab0406a4ac536a55274d14ea6fd1ca9c9/rules/async-cancel-safety.md) and JoinSet rule, at `fd2a861ab0406a4ac536a55274d14ea6fd1ca9c9`, plus the MIT license. Their mistakes below rule out a verbatim copy. An independently written adaptation should use official contracts, preserve the project's chosen runtime and authorization, and have no sibling-skill or service dependency. Usefulness and novelty are high for Tokio services, portability is good across coding hosts but intentionally Tokio-specific, and a small correct scope is preferable to a broad Rust persona.

**Next step:** author and review a self-contained skill; validate cancellation/shutdown examples before publishing. Do not present the proposal as an already evaluated upstream skill.

## Review next

### Rust-analyzer semantic tooling

**Identity:** `dexwritescode/rust-mcp`, snapshot `f03b2b0db8995d327b10ba292333c8259f8979aa`; [README](https://github.com/dexwritescode/rust-mcp/blob/f03b2b0db8995d327b10ba292333c8259f8979aa/README.md). Read the complete README, Cargo manifest and MIT license. Implementation, path boundaries, subprocess handling, edit application, tests and dependency closure remain uninspected. No verified adoption metric was collected.

**Fit:** language-server definitions, references and diagnostics can improve semantic navigation beyond text search when the host lacks equivalent tools. The README also advertises rename, extraction, generation, Clippy fixes, signature changes and module moves, so this is not merely read-only navigation. Usefulness and novelty are potentially high on large workspaces; quality and portability remain unestablished until actual supported tool contracts are checked.

**Concrete discrepancy:** README says Rust 1.70+, but Cargo.toml selects edition 2024; the [edition guide](https://doc.rust-lang.org/edition-guide/rust-2024/index.html) identifies Rust 1.85 as the edition's release floor. Resolve the effective build/dependency floor before recommending installation. README tool totals also should not stand in for implementation inspection.

**Disposition:** linked MCP review candidate, not admission-ready. Inspect analyzer startup, workspace selection, file confinement, mutation semantics and actual tool handlers; then test a small workspace. Prefer host-native LSP when available. Building the server may execute Cargo build scripts/proc macros; don't activate a connection during source research.

### Josh Thomas: Thinking in Rust

**Identity:** `joshuadavidthomas/agent-skills`, snapshot `516dee7a422b90937b2958d11c03694154ab9c09`; [rust/SKILL.md](https://github.com/joshuadavidthomas/agent-skills/blob/516dee7a422b90937b2958d11c03694154ab9c09/rust/SKILL.md). Read selected entrypoint, atomics and unsafe sections plus the root MIT license; many linked references and embedded reference-source terms remain unread. No current usage metrics were verified.

**Fit:** invariant-first design, typed boundaries and written ordering arguments are useful complements to `domain-modeling`. The trigger spans nearly all Rust work and several defaults are categorical: every domain string becomes a newtype, every boolean becomes an enum, and closed sets avoid trait objects. These need proportionality and project-convention review. Portability is good for Markdown, novelty moderate; broad source volume is not automatically better than compiler feedback and small targeted procedures.

**Disposition:** review narrow domain/ownership or atomics material if that gap is prioritized. Do not copy only SKILL.md and leave its reference closure behind. No complete bundle admission recommendation here.

## Watch / hold / skip

### Trail of Bits Rust review — promising orchestration, technical correction required

**Identity:** `trailofbits/skills`, snapshot `2be6433b39e009cd2b6fd3be1895f6b1faa5af9a`; [rust-review entrypoint](https://github.com/trailofbits/skills/blob/2be6433b39e009cd2b6fd3be1895f6b1faa5af9a/plugins/rust-review/skills/rust-review/SKILL.md), [unsafe-boundary prompt](https://github.com/trailofbits/skills/blob/2be6433b39e009cd2b6fd3be1895f6b1faa5af9a/plugins/rust-review/prompts/clusters/unsafe-boundary.md).

**Inspection:** selected entrypoint/setup/planning sections, plugin manifest, Python dependency manifest and unsafe-boundary prompt sections. The entire subtree was downloaded; its three runtime scripts, all worker/judge protocols and dozens of finder prompts were not fully audited. Root CC-BY-SA-4.0 was identified in the prior same-revision review; linking remains the catalog path.

**Distinct value:** capability-gated bug classes, scoped workers, deduplication, false-positive judging and SARIF. The README attributes its bug taxonomy to RustSec advisories and audits; those counts are author research claims, not measured detection performance. Runtime requires uv/Python 3.11+, named subagents and helper scripts, writes `.rust-review-results/`, and can launch many model calls. Host portability and total cost need actual tests. It is substantially more specialized than `pr-review-code-reviewer` or a generic security prompt.

**Decisive blocker:** the inspected unsafe-boundary prompt says a thin pointer obtained from a slice cannot be used beyond one element. Rust's [slice::as_ptr example](https://doc.rust-lang.org/std/primitive.slice.html#method.as_ptr) explicitly demonstrates reading multiple in-bounds elements through that pointer. It also requires identical source/destination alignment for transmute, while the [transmute contract](https://doc.rust-lang.org/std/mem/fn.transmute.html) distinguishes by-value alignment from pointed-to alignment. These rules risk false findings. Pointer/integer round-trip guidance also needs checking against the standard library's exposed-provenance model rather than categorical rejection.

**Disposition:** hold unchanged admission. Reopen after the exact faulty prompt revision is corrected and the runtime closure is reviewed; do not infer accuracy from a security specialist's reputation or automated judge stage. Qualitative usefulness/novelty are high, current sample quality is mixed, and portability is conditional.

### Leonardo Maldonado's 265-rule library — source of ideas, not a clean copy

**Identity:** `leonardomso/rust-skills`, snapshot `fd2a861ab0406a4ac536a55274d14ea6fd1ca9c9`; root SKILL.md, selected async/unsafe/testing rules and full MIT license inspected. Remaining rules and whole-library technical accuracy were not reviewed.

**Specific issues:** its cancellation table labels Tokio Mutex::lock cancellation-safe; [Tokio documents loss of fairness-queue position](https://docs.rs/tokio/latest/tokio/macro.select.html#cancellation-safety). The suggested loop does not handle zero-byte reads or a closed receiver as terminal states. Its Loom example calls instrumented AtomicBool::new from a const constructor, although [Loom's constructor is not const](https://docs.rs/loom/latest/loom/sync/atomic/struct.AtomicBool.html#method.new). Its Miri rule says safe-only crates gain nothing and makes unconditional detection claims, which overstate what the tool guarantees and ignore unsafe dependencies.

**Disposition:** hold wholesale/unchanged admission. Prefer a small independent Tokio workflow, with official contracts and executable examples. Broad usefulness, moderate novelty and strong reference granularity do not compensate for consequential example errors. No matched outcome evaluation was run.

### Actionbook Rust Skills — interesting routing, weak safety shortcut and incomplete licensing

**Identity:** `actionbook/rust-skills`, snapshot `5c40d3ad785193231b7d0dbfb8e1eb447e5edd94`; complete `m05-type-driven`, `unsafe-checker`, `rust-code-navigator` entrypoints and README setup sections read. Other layers, hooks, dynamic skill generation, crate research and supporting integrations remain unreviewed.

**Findings:** the unsafe checker suggests repr(C) as an alignment fix and MaybeUninit as a general invalid-bit-pattern fix. Neither alone establishes that a pointer access or initialized value is valid. Type-driven design is a useful reasoning prompt, but it has sibling references and substantial overlap with `domain-modeling`. The LSP navigator assumes a host tool named LSP, which this session does not expose; skill installation cannot supply that capability. Full plugin mode also adds hooks and generated guidance.

The README carries an MIT badge, but no applicable license/notice file was found in the complete 242-file pinned regular-file inventory. Do not infer copying rights from the badge. **Hold copying/adaptation and full-plugin recommendation** until licensing, resource closure and safety content are resolved; a linked review candidate is possible. No Actionbook/MCP/browser connection was activated.

### low-level-dev-skills — reject the inspected sanitizer guide unchanged

**Identity:** `mohitmishra786/low-level-dev-skills`, snapshot `bdc58472fa9f309ed1b3f7d985a0d8e9bd8f4608`; complete rust-sanitizers-miri and rust-async-internals entrypoints and root MIT license read. Miri reference and other sibling skills remain unread.

The sanitizer guide describes Miri as compile-time UB detection, proposes `-Zsanitizer=undefined`, and frames a nightly container as a stable-Rust workaround. The current [Rust sanitizer contract](https://doc.rust-lang.org/unstable-book/compiler-flags/sanitizer.html) does not list that UBSan selector. Miri is an interpreter, with configurable experimental checks and execution limits; a wrapper/container does not remove the compiler requirement. Several listed Miri flags and the race-detection explanation also require correction.

**Disposition:** do not admit verbatim. Reopen after examples and terminology are corrected against supported tool versions. MIT may permit an independent adaptation, but official tool documentation is a stronger foundation than repairing this broad guide. Source review only; no sanitizer/compiler command was executed.

### Apollo Rust best practices — baseline candidate, not the frontier priority

**Identity:** `apollographql/skills`, snapshot `ff4534868e089580c2e09563c20f86a410179628`; complete Rust entrypoint, nine-reference inventory and root MIT license read; chapter bodies not fully reviewed.

The handbook is useful for team conventions but much of it overlaps ordinary Rust/API/style knowledge. It declares Rust 1.70+ compatibility while recommending `#[expect(...)]`, stabilized in [Rust 1.81](https://blog.rust-lang.org/2024/09/05/Rust-1.81.0/). Blanket all-features checking, one-assertion-per-test and fixed small-Copy thresholds need project-specific interpretation. **Review as an opinionated baseline**, not an automatic 2026 upgrade; complete chapter/MSRV checks before copying. The upstream handbook and skill are distinct artifacts.

### Additional leads

- **Trail of Bits cargo-fuzz:** entrypoint and UI metadata inspected, resource inventory recorded at `2be6433b39e009cd2b6fd3be1895f6b1faa5af9a`; optional technique siblings and technical examples not fully verified. Prefer primary cargo-fuzz setup guidance before admission. Do not assume safe Rust means sanitizer instrumentation can always be discarded or repeat an unconditional 2× speed claim without measurement.
- **wshobson rust-async-patterns and ECC rust-testing:** exact source inventories and current pins recorded, files downloaded, but no complete technical review in this pass. The prior Python-testing and full-ECC runtime holds remain; those findings neither approve nor condemn the separate Rust payloads.
- **cargo-skill, Rust analyzer MCP alternatives, Rust rules corpora:** discovery only. Resolve original authors, actual tool schemas, runtime closure, licensing and a concrete gap before ranking. A directory's “official” label is not evidence that an MCP wrapper is published by rust-lang.
- **Shuttle concurrency testing:** the initially attempted repository URL did not resolve. No source review or recommendation follows; do not confuse similarly named deployment products with concurrency-testing tools.

## Revisit existing entries

- `property-based-testing` and `variant-analysis` already supply useful methods for Rust; add Rust-specific tool selection rather than duplicate the generic process.
- `verification-before-completion` records evidence but does not choose between Miri, a schedule model, a fuzzer, a proof harness and mutation testing. That is the concrete proposed workflow gap.
- `security-review` stays conditional. An expensive Rust review plugin would be a separately selected option, not another automatic stage for every diff.
- `post-edit-diagnostics` can run an already installed project checker; do not put a full feature matrix, fuzz campaign, Miri suite or model checker after every keystroke. Keep broad CI checks and targeted investigations distinct.
- `repo-research` can establish toolchain, target, MSRV, features and platform constraints before Rust work. No current entry is changed or repinned by this survey.

No Rust-specific skill or LSP capability appears in this session's supplied skill/tool inventory. Native shell access to Cargo, project CI and compiler diagnostics still overlap much routine guidance. This observation does not establish the capabilities of every Claude Code or Codex installation.

## Changes since baseline and top priorities

The earlier broad survey contained Rust discovery leads; this pass adds immutable source inspection, verified technical contradictions and a concrete workflow design. It preserves the earlier sharp-edges, Actions security, SQL, Terraform, Django licensing, Vue testing, Planning with Files and framework/runtime holds at their prior dispositions. Frontend/security collections are existing content after decision 33.

1. **Author the Rust verification ladder.** Best immediate catalog gap: evidence selection with bounded cost and honest coverage, rather than hundreds of style rules.
2. **Author the focused Tokio correctness skill.** Cancellation, backpressure and task lifecycle are concrete problems that compile successfully; independently write and test examples instead of vendoring the faulty rules.
3. **Re-review Trail of Bits rust-review after prompt correction.** Strongest integrated security architecture found, but current false-positive rules and unreviewed scripts block admission.
4. **Inspect and trial semantic rust-analyzer integration.** Valuable where native LSP is absent; first resolve actual build floor, tool behavior and mutation boundaries.
5. **Add targeted library-release/test-quality checks when relevant.** cargo-semver-checks and cargo-mutants offer different evidence from lint/test success. Keep Kani and Loom attached to suitably small models, not a universal “run everything” preset.

Priorities 1–2 are authoring proposals, not completed entries; 3–4 are blocked or incomplete source reviews; 5 is conditional workflow research. No catalog entries, collections, ratings, pins, generated indexes, consumer setup or recurring jobs changed. No Rust programs, upstream scripts, installers, fuzzers, proof tools, MCP servers or agent workers were run. No behavioral improvement or security guarantee was measured.

Repository verification: `bun run check` passed type checking, Markdown lint, validation of 56 entries and seven collections, generated-index consistency, and all 96 tests. Local fixture servers used the required sandbox permission. `git diff --check` passed. These checks validate the repository, not the Rust recommendations.
