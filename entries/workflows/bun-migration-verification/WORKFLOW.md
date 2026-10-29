# Bun migration and verification

Use when initializing a Bun project or changing an existing project's package manager, runtime, bundler or test runner. Treat those as independent choices. Bun as the package manager does not imply replacing Vue/Vite, Next.js, Node deployment, Jest, or Vitest.

## Define the change and baseline

Inspect manifests, every relevant workspace, existing lockfiles, registry configuration, lifecycle scripts, runtime targets, CI and deploy commands. Record the installed Bun and Node versions, supported operating systems, and the project's existing checks. Measure the baseline if performance is the reason for migration; use comparable cache conditions and workloads.

Select the smallest requested scope:

| Scope | Preserve until separately needed | Evidence to collect |
| --- | --- | --- |
| Package management | Runtime, bundler and runner | Reproducible resolution, workspace links, native dependencies and lifecycle outputs |
| Runtime | Package graph, build and test tools | Representative APIs, native addons, resolution, timers, process behavior and target deployment |
| Bundling | Framework integration and deployment contract | Client/server boundaries, assets, dynamic loading, externals, output formats and library types |
| Test runner | Application behavior and original assertions | Discovery, setup, mocks, timers, isolation, snapshots and coverage semantics |

## Keep migration recoverable

Work in an isolated checkout when useful, or preserve the exact pre-change manifests, lockfiles and configuration along with existing local changes. A new branch alone does not save uncommitted work. Do not create a blanket backup commit, overwrite unrelated files, or use a hard reset as a generic rollback.

For a new project, select the framework/template that meets the request, with an explicit version where reproducibility matters. Inspect generated files before treating them as project policy. `bun init` can install dependencies and generate agent instructions; creation is a mutation, not a read-only inspection. Keep existing instructions and tooling choices intact unless changing them is part of the request.

## Migrate resolution before removing inputs

Keep the source lockfile available while using the installed Bun version's documented migration route. Supported formats and precedence are version-specific; do not assume an old npm lockfile can be converted without re-resolution. Current Bun uses text `bun.lock`; legacy `bun.lockb` has a separate conversion path.

Review the resulting manifest/lockfile changes, workspace resolution, peers, overrides, patches and registry sources. If several source lockfiles exist, establish which one is authoritative rather than relying on migration precedence. Remove a superseded lockfile only after verification and a decision that the project no longer supports that package manager.

Review lifecycle trust as a separate compatibility input. Bun has a built-in trusted list when `trustedDependencies` is omitted; an explicit list replaces it. A frozen lockfile does not itself disable scripts. `--ignore-scripts` can help inspect resolution, but it can leave native/code-generation outputs missing and is not a substitute for validating the intended installation. Add trust only for dependencies that need it and whose scripts have been reviewed in scope.

## Verify the selected layers

- **Reproducibility:** once the new lockfile exists, exercise `bun install --frozen-lockfile` in a clean disposable checkout using the chosen Bun version and intended script policy. Reusing populated `node_modules` can hide missing install artifacts. Do not delete the user's checkout to simulate a clean install.
- **Scripts and runtime:** use explicit `bun run <script>` for package scripts that collide with built-in commands such as `build`. Preserve runtime selection unless it is in scope; inspect shebangs and invocation flags. `bunx` can fetch and execute package code and is not a no-install operation.
- **Types and build:** ordinary TypeScript execution is not a type check. Run the project's actual type check. New Bun releases document `bun check` and `bun build --check`/`--dts`; confirm availability and compatibility with the installed version before selecting them. If publishing a library, verify that every exported JS/type path exists and is consumable in the supported target; declaration settings with `noEmit` alone do not produce types.
- **Tests:** keep the original runner for a package-manager-only migration. If changing runners, review compatibility rather than renaming imports wholesale. In Bun, restoring spies does not undo `mock.module` overrides. Restore global replacements and timer state using the installed runner's APIs. Run relevant suites together to expose cross-test pollution.
- **Coverage:** thresholds and reporters are runner-specific. Current Bun thresholds use fractions, such as `0.8`, rather than `80`; confirm that the selected reporting mode actually enforces them. A changed coverage number may reflect changed instrumentation, not a product improvement.
- **Deployment:** exercise the supported OS/runtime, artifact entrypoint, assets, native dependencies and required environment loading. Bundling for `browser` is not appropriate for server secrets; Bun compile targets are distinct from browser bundles. Preserve framework build plugins unless replacing them is part of the task.

Use project tests and a representative application flow. Add a focused check when it would expose a migration risk that current checks miss; do not generate trivial assertion tests to make setup look verified.

## Close with evidence or restore the scoped change

Record selected layers, exact versions, files changed, commands and results, and remaining target gaps. Claim speed improvements only from representative comparable measurements. Do not report full migration success after only an install or test run.

If the selected layer fails its acceptance criteria, stop expanding scope. Restore only this migration's edits from the preserved state, retaining unrelated local changes and the original resolution inputs. Keep useful diagnostic results; do not force the project through a different runtime or framework to make the checks pass.

## Official references

Consult the installed version's documentation for the layer being changed:

- [Initialization](https://bun.com/docs/runtime/templating/init)
- [Lockfiles and migration](https://bun.com/docs/pm/lockfile)
- [Lifecycle trust](https://bun.com/docs/pm/lifecycle)
- [Node compatibility](https://bun.com/docs/runtime/nodejs-compat)
- [Bundling and declaration output](https://bun.com/docs/bundler)
- [Mock lifetime](https://bun.com/docs/test/mocks)
- [Coverage](https://bun.com/docs/test/code-coverage)
