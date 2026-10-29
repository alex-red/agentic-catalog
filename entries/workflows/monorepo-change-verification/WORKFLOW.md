# Monorepo change verification

Use when creating package boundaries, changing shared packages or build configuration, or selecting verification for a cross-package change. Preserve the repository's package manager, task runner, release model and language tooling. A monorepo does not require a new orchestrator, remote cache or uniform framework.

## Map the three graphs

Inspect workspace declarations, package manifests, package exports, task configuration and CI. Identify separately:

1. **Dependency graph:** which packages consume which public contracts, including generators, shared configuration and non-code inputs that the tool may not infer.
2. **Task graph:** which tasks need another task's artifacts before starting. A dependency on a package does not mean every task needs that package built; source-consuming tools and artifact-consuming tools differ.
3. **Release/deployment graph:** which independently published or deployed units must remain compatible, and what private packages they include.

Record the changed nodes and their consumers. For a new monorepo, begin with the smallest real application/library split. Use boundaries that encapsulate a responsibility or deployment contract; do not create a package for every folder or introduce cycles to share implementation details.

## Keep package contracts real

Declare a dependency where it is consumed, not only at the root. Use the package manager's local workspace linking mechanism. Shared configuration packages are dependencies too; root developer tooling can remain at the root when that is the intended execution scope.

Choose a source-exporting or built-artifact contract for each internal package and ensure each consumer supports it. In JavaScript/TypeScript, do not hide a missing dependency or broken public export by aliasing a sibling package directly to its source. Package-local aliases and explicit framework source-consumption contracts are different cases.

When a package will be published, verify actual package contents, public subpaths, runtime formats, peer ranges, declarations and target compatibility. Passing tests inside a workspace can conceal missing files or accidental root dependencies. Use a disposable packed-package consumer when publication behavior is material. Keep private packages private unless publishing them is explicitly in scope.

## Select affected work conservatively

Establish the actual comparison base/head and available Git history before asking the runner for affected projects. In CI, use the provider's intended PR/base or successful-build baseline; do not silently compare a branch to itself. Account for local changes when verifying a working tree. A missing base or incomplete graph calls for a wider check, not an empty success.

- **To produce artifacts:** include prerequisite tasks in dependency order.
- **To check compatibility:** include changed packages and relevant reverse dependents. Testing a library alone does not test its applications.
- **For root configuration, lockfiles, generators or shared schemas:** inspect the runner's invalidation rules. Broaden selection when it cannot represent those relationships.
- **For a leaf-only change:** keep selection focused when the graph supports that conclusion.

Preview or inspect the selected task set using the installed runner's supported graph/dry-run interface. Verify that required tasks exist. Record both executed tasks and justified exclusions; a package name filter is not automatically an affected-project analysis.

## Make scheduling and caching correct

Run finite artifact prerequisites before their consumers and bound concurrency to the machine and workload. Long-running servers cannot serve as prerequisites that must finish; start the needed processes together with the repository's existing lifecycle/readiness mechanism. Do not parallelize a build solely to make it faster.

A cache key must cover all output-affecting inputs: source, configuration, lock/resolution state, relevant environment, toolchain/target and generator inputs. Use the runner's documented defaults deliberately; a custom input list can replace rather than extend them. Declare every required output so a cache hit restores artifacts rather than only logs. Do not cache deploys, mutations or other non-repeatable side effects as ordinary builds.

For a cache/configuration change, check a clean uncached build, a warm restore after removing only disposable outputs, and an input change that should miss. Compare the restored artifact's behavior, not just the reported hit. Keep remote cache trust, uploads and credentials within existing project authorization; local task selection does not authorize a new service connection.

## Verify the consumer-facing outcome

Choose checks from the changed contract: package tests, dependent type checks, a consuming app build, an integration flow or a packed consumer. Broaden only for unresolved risks, shared inputs or required project gates. Preserve the release/versioning mechanism and update dependent ranges or migration notes when that contract changes.

Report the graph/selection basis, versions, base/head, task results, cache mode and untested consumer targets. A fast affected run is useful only if it contains the work the change can break. Creation or review of release configuration does not authorize publishing or deployment.

## Tool contracts

Consult documentation matching the installed tool rather than translating flags by resemblance:

- [Turborepo task dependencies and inputs/outputs](https://turborepo.dev/docs/crafting-your-repository/configuring-tasks)
- [Turborepo cache assumptions](https://turborepo.dev/docs/crafting-your-repository/caching)
- [Nx affected selection](https://nx.dev/docs/features/ci-features/affected)
- [pnpm dependency and dependent selectors](https://pnpm.io/filtering)
- [TypeScript module resolution and paths](https://www.typescriptlang.org/docs/handbook/modules/reference.html#paths)
