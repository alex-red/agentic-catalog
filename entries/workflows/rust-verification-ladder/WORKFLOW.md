# Rust verification ladder

Choose evidence for the failure you are trying to exclude. Start with the project's existing checks, then add only the layers justified by the change. A passing tool run establishes its reported coverage, not universal Rust correctness.

## Establish the configuration

Read project instructions, Cargo manifests, the lockfile, toolchain selection and CI. Identify the affected crates, supported targets, minimum supported Rust version (MSRV), and relevant feature combinations. Preserve existing commands and conventions. `--all-features` is not a universal substitute for a supported feature matrix: some combinations are incompatible or omit the no-default-features case.

Record `rustc -Vv`, `cargo --version` and the versions of selected optional tools. Check whether prerequisites are already installed. Use explicit toolchain selectors where needed; do not change the user's default toolchain or add overrides as a side effect. Installation, dependency changes, CI edits, services and external actions remain within the user's existing authorization.

## Run the baseline

Use the repository's checks first. These common commands are starting points for a Cargo workspace, not a required policy for every crate:

```bash
cargo fmt --all --check
cargo clippy --workspace --all-targets --locked -- -D warnings
cargo test --workspace --locked
```

Select package, target and feature flags to match the supported configuration. Use the project's lint policy instead of imposing denial of every warning. `--locked` requires an existing, current lockfile; explain a lockfile mismatch rather than silently updating dependencies. Run the MSRV configuration when the change could raise the version floor.

If nextest is already configured, `cargo nextest run` can run the relevant compiled tests. Keep a separate `cargo test --doc` step for documentation tests; nextest's stable-Rust runner does not currently cover them. Preserve the same package/features across comparable checks.

## Select additional evidence

| Change or uncertainty | Select | What to establish before running |
| --- | --- | --- |
| Unsafe abstraction, initialization, aliasing or raw-pointer access | Focused Miri tests | Written safety contract, testable boundary, compatible nightly and supported platform operations |
| Atomic ordering, synchronization or schedule-sensitive bug | Loom model | Small state space, instrumented primitives and threads, and an explicit invariant |
| Parser, binary format, untrusted input or boundary conversion | cargo-fuzz | A deterministic harness with a meaningful oracle, appropriate seeds, and time/input/resource limits |
| Small algorithm with a precise symbolic property | Kani | Proof harness, assumptions, bounds and supported language features |
| Doubt that tests detect plausible behavioral errors | cargo-mutants | Reliable baseline tests, scoped code, runtime budget and a plan to inspect survivors |
| Public library API change | cargo-semver-checks | Intentional baseline revision/version and matching current/baseline feature selections |

A change can need more than one layer, but a routine safe refactor need not run this entire table. Prefer a focused regression over a new tool when it directly tests the requirement. Skip unavailable optional tools explicitly and keep independent checks moving.

### Unsafe code and Miri

Review the boundary first: which invariants must safe callers be unable to violate, and which obligations belong to an unsafe caller? Comments are a statement of the argument, not proof that it is true.

For an installed compatible nightly with Miri, a targeted command can be:

```bash
cargo +nightly miri test -p affected-crate test_name
```

Replace the package and test selector with real names and add only supported target/features. Record the resolved nightly; use an explicit installed dated toolchain for reproducibility. Do not blanket-disable isolation or validity checks to get a green run. Identify unsupported FFI/platform calls separately from a detected defect. If a different experimental aliasing model is relevant, verify the flags against that Miri version and record the model.

Miri interprets exercised executions; it does not prove a safe API sound for all callers. Safe source can still exercise unsafe dependencies. Retain normal native tests for behavior Miri cannot execute.

### Concurrency and symbolic verification

Loom sees only operations using its replacements. Model the smallest relevant synchronization protocol; note branches, threads, schedule bounds and excluded code. A stress test or one Miri seed does not substitute for that model. Kani serves a different job: state the property and assumptions, check supported features, and distinguish successful verification from resource exhaustion or unwinding failures. Do not route a concurrent runtime test to Kani as if it models arbitrary scheduling.

### Fuzzing, mutation and API compatibility

For fuzzing, decide what a failure means before starting. Handle expected parse errors normally, retain interesting inputs and minimize a reproducible crash into a regression. Choose a finite campaign budget. Sanitizer/target support depends on the toolchain and platform; inspect the installed tool's options instead of copying generic compiler flags. Do not infer sanitizer irrelevance from the absence of local unsafe blocks.

For mutation testing, inspect survivors for equivalent mutations, unreachable code, weak assertions or missing cases. Improve a meaningful assertion or fixture rather than chasing a score. For semver checks, select the intended baseline explicitly when the default registry comparison is inappropriate. A passing API comparison does not establish behavioral compatibility, and changing feature sets changes what was compared.

## Report and close the loop

Fix demonstrated issues within scope and rerun the relevant checks on the final revision. Report:

- Crates, target, features, toolchain/tool versions and baseline revision where applicable.
- Exact commands, exit/result status, and whether a check passed, found a defect, was unsupported, timed out or could not run.
- Test/model/harness scope, assumptions, bounds and campaign duration.
- Reproducer or regression artifact for a finding, and remaining coverage limits.

Keep long-running campaigns out of per-edit hooks. If a check cannot run, name the missing prerequisite without upgrading a partial result to verified completion.

## Primary contracts

Consult the applicable version when preparing a specialized run:

- [Miri usage and limitations](https://github.com/rust-lang/miri)
- [Loom instrumentation and model limits](https://docs.rs/loom/latest/loom/)
- [Kani properties, harnesses and limitations](https://model-checking.github.io/kani/)
- [cargo-fuzz requirements](https://rust-fuzz.github.io/book/cargo-fuzz/setup.html)
- [nextest test execution](https://nexte.st/docs/running/)
- [cargo-mutants](https://github.com/sourcefrog/cargo-mutants)
- [cargo-semver-checks baselines and features](https://github.com/obi1kenobi/cargo-semver-checks)
