# Rust workflow and Tokio skill admission

**Date:** October 28, 2026, America/Edmonton. The user authorized adding the two strongest proposals from the [Rust scout](2026-10-28-catalog-scout-5.md).

## Admitted content

- [rust-verification-ladder](../../entries/workflows/rust-verification-ladder/WORKFLOW.md): an original workflow for selecting Rust verification layers. It starts from the project's Cargo checks and supported configuration, then makes Miri, Loom, fuzzing, Kani, mutation testing and semver comparison conditional on the relevant question.
- [tokio-async-correctness](../../entries/skills/tokio-async-correctness/SKILL.md): an original skill for cancellation, task ownership, capacity and shutdown. It includes one complete bounded intake/drain example, with explicit supervisor-cancellation, cooperative-abort and result-memory limits.

Both entries are independently written against the official primary contracts linked inside their payloads. No third-party skill text, examples, runtime scripts or framework integrations are copied. Each entry carries an MIT license. The scout's faulty upstream examples are not patched vendor copies or admitted under a new source pin.

## Source and overlap review

Rechecked the applicable Tokio select, JoinHandle, JoinSet, spawn_blocking, Mutex and mpsc documentation. In particular, the skill distinguishes loss of fairness-queue position from data loss, handle detachment from task-set cancellation, and cancellation requests from observed termination. It does not prohibit every async mutex guard across await or assume started blocking work can be aborted.

The workflow links the primary Miri, Loom, Kani, cargo-fuzz, nextest, cargo-mutants and cargo-semver-checks contracts. Project MSRV/targets/feature combinations constrain the checks. The documented nextest runner needs a separate documentation-test step. Miri checks exercised executions, Loom requires instrumentation, Kani requires explicit assumptions/bounds and supported features, and API comparison is distinct from behavioral compatibility. No advanced tool is installed or registered merely by selecting the entry.

`verification-before-completion` owns honest completion evidence; this workflow selects Rust-specific evidence. `diagnosing-bugs`, `property-based-testing`, `variant-analysis` and `repo-research` remain complementary methods. The Tokio skill owns runtime-specific progress/lifecycle reasoning rather than all Rust style, unsafe soundness or atomic-memory-model verification. No Rust LSP/MCP capability is added.

## Scratch verification

Used the installed Rust/Cargo 1.93.0 toolchain on aarch64 macOS and cached Tokio 1.53.3. Dependency resolution and compilation ran offline in a disposable fixture, with Cargo state/build artifacts under the temporary fixture and the existing registry read as input. No default toolchain, consumer project configuration or repository dependency changed. The code fence from the shipped task-lifecycle reference was compiled as the fixture's library; it was formatted with rustfmt and copied back into the reference.

Six coordinated test cases passed:

1. An already closed, empty input terminates and produces no results.
2. Queued input drains exactly once per job while active work stays within capacity.
3. A worker panic causes the supervisor to observe pending-task cleanup before returning the join error.
4. A cancelled partial read_exact has consumed input, so blindly restarting a full-length read loses progress.
5. A cancelled pending channel receive preserves the next message.
6. Dropping an ordinary JoinHandle detaches its task, which can still finish after an explicit release signal.

The fixture used channels, Notify, deliberately pending/ready futures and atomic accounting to establish the relevant states; timeouts were failure guards. Tests did not depend on racing wall-clock sleeps. Formatting, Clippy with warnings denied, and workspace tests were checked against the same locked fixture. These are source/example checks, not independent agent trigger tests, representative schedule coverage, or matched outcome evaluations. Both entries start at `reviewed`.

No Miri, Loom, Kani, cargo-fuzz, cargo-mutants, nextest or semver campaign was installed or run. Availability and execution of those optional layers remain dependent on the consumer project and authorization. The upstream Rust review plugin, MCP candidate and other held bundles remain at the scout's dispositions.

## Repository verification

The skill-creator quick validator passed using a temporary PyYAML environment. `bun run catalog:build` regenerated the indexes, and `bun run check` passed type checking, Markdown lint, validation of 58 entries and seven collections, index consistency, and all 96 repository tests. `git diff --check` passed. The shipped Rust code fence matches the formatted library compiled by the scratch fixture. These checks retain both entries at `reviewed`.
