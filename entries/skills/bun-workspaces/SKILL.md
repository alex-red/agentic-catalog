---
name: bun-workspaces
description: Configure or troubleshoot Bun monorepos, including workspace membership, local dependencies, catalogs, linker behavior, filtered scripts and installs, and package exports. Use for cross-package resolution or scheduling problems in an existing or requested Bun workspace.
license: MIT
---

# Bun monorepo workspaces

Inspect the root manifest, workspace package manifests, `bun.lock`, `bunfig.toml`, installed Bun version, task runner and CI before editing. Preserve the chosen runtimes and framework builds: Bun workspaces can manage packages that still run on Node or use Vite, Next.js, Turbo or Nx.

## Workspace and dependency ownership

Use the root `workspaces` declaration as the membership source. Each package needs a unique name; a directory's presence under `packages/` alone does not establish membership. Respect exclusions, existing separate projects and workspace paths outside the root. Do not merge lockfile roots or rewrite workspace patterns merely to fit a conventional layout.

For a new workspace, use an explicit package set and make the orchestration root private unless it is intentionally publishable. The workspace root owns the shared lockfile. Put each imported dependency in its consumer's manifest with the appropriate runtime, development, peer or optional classification. Root tooling is not a replacement for a library's runtime dependency.

Use `workspace:*` or the project's chosen workspace range for local package contracts. Resolve through workspace links and public exports. Avoid TypeScript aliases into sibling sources that bypass those contracts. Source exports can be intentional for internal packages when every consumer supports them; published Node/browser packages need matching emitted artifacts and declarations.

## Version and linker behavior

New workspace lockfiles with current configuration default to isolated linking; older/migrated lockfiles can retain hoisted behavior. Read the existing configuration instead of inferring the linker from the Bun binary version. If changing it, treat that as a compatibility change and test the actual clean layout.

Isolated linking exposes many undeclared dependencies, but a successful import is not a complete dependency audit. Probe from the package that consumes the dependency. A root-level import can fail correctly when the root does not declare that package; do not broaden root dependencies just to make a misplaced probe pass. Check peer-dependent packages and bundler resolution in their actual consumer scopes.

Preserve lifecycle trust policy. A frozen install does not imply scripts are disabled. The fetched package cache, linker store and build-task cache serve different purposes; do not enable a global store or remote caching as an incidental workspace fix.

## Scope commands to the job

Quote selectors so the shell does not expand them. Package-name patterns match full names, so prefer `@acme/app` over an assumed short-name match. Name/path filters select packages; they do not compute Git-affected tasks.

Current Bun supports filtered package-manager commands, including `bun add`. Keep the filter after the package-manager subcommand; placing it before a command name can select script execution instead. For an older version, check its help and use the target package's cwd if that command is unsupported. Read [selection and packaging examples](references/selection-and-packaging.md) when changing filters, catalogs, task ordering or release contents.

Use `bun run <script>` explicitly for package scripts that collide with built-in commands. Check selected package names and script existence before running a large selection. Avoid `--if-present` when it would hide a missing required check.

Finite filtered scripts can honor package dependencies, but only the declared graph and supported runner behavior are available. When an existing orchestrator models task-specific prerequisites or bounded concurrency, keep using it. Starting every workspace task can exhaust resources, and independent long-running servers need a deliberate parallel/readiness strategy rather than a completion dependency.

## Catalogs and package delivery

Use catalogs for intentionally shared version ranges, not as an automatic mandate to align incompatible consumers. Distinguish the default `catalog:` from `catalog:<name>` and inspect all affected dependency classes when changing a catalog range. Reconcile the root lockfile and verify consumer peers; updating the central range does not prove integration compatibility.

For a deliverable package, inspect a local pack in a disposable destination after reviewing its lifecycle scripts. Check included public outputs, rewritten workspace/catalog ranges and consumer resolution without workspace source aliases. Packing is local but can execute scripts; publishing is a separate external action.

## Verify the graph you changed

Exercise a clean frozen install using the intended linker and script policy, then build/test the changed packages and relevant consumers. For filter or scheduling changes, confirm both inclusion and exclusion and verify that prerequisites finish first. For package-resolution fixes, test the real public import from a dependent package. Retain representative application/type checks; a lockfile diff or installation alone is insufficient.

Report Bun version, linker, selected packages, commands, results and any untested OS/runtime or release path. Use existing project migration guidance if changing package manager or runtime is also in scope.

## Official contracts

- [Workspace membership and protocols](https://bun.com/docs/pm/workspaces)
- [Filtering and script scheduling](https://bun.com/docs/pm/filter)
- [Catalogs](https://bun.com/docs/pm/catalogs)
- [Linker configuration](https://bun.com/docs/pm/isolated-installs)
- [Lifecycle trust](https://bun.com/docs/pm/lifecycle)
