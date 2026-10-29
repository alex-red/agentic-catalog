# Selection, catalogs and packaging

Examples assume commands run from the workspace root and names `@acme/core` and `@acme/app`, with the app declaring a workspace dependency on core. Verify installed Bun support and the repository's actual package names. These are examples for a requested operation, not an instruction to run every command.

## Select the correct relation

```bash
# Only the app's script; this selection alone does not add prerequisites.
bun run --filter '@acme/app' check

# App plus its workspace dependencies, for finite prerequisite builds.
bun run --filter '@acme/app...' build

# Core plus reverse dependents, for checks of consuming packages.
bun run --filter '...@acme/core' check

# Add a local dependency to the consumer, preserving root ownership.
bun add '@acme/core@workspace:*' --filter '@acme/app'

# An alternative for versions without filtered add support:
# Run from the app package directory, using that version's supported cwd form.
```

Suffix `...` selects dependencies; prefix `...` selects dependents. These graph selections do not infer changed packages from Git. Multiple positive filters combine and exclusions subtract. A path filter such as `'./packages/*'` must match actual workspace directories. Check the selected set; short names and folder labels may not match scoped package names.

A runner may use dependency edges for finite script ordering, but an exact package selection is not permission to assume every prerequisite script will run. Inspect the selected graph, and use the existing task runner when it provides a more accurate task dependency model. Avoid forcing dependent builds into parallel mode. Long-lived scripts require an explicitly scoped concurrency/readiness arrangement.

## Declare catalogs deliberately

A root declaration can use an object when catalogs are needed:

```json
{
  "name": "workspace-root",
  "private": true,
  "workspaces": {
    "packages": ["packages/*"],
    "catalog": {
      "is-number": "7.0.0"
    },
    "catalogs": {
      "checks": {
        "is-odd": "3.0.1"
      }
    }
  }
}
```

A consumer uses `"is-number": "catalog:"` in its chosen dependency class; a package needing the named range uses `"is-odd": "catalog:checks"`. The tiny packages illustrate syntax, not recommended application dependencies. Bun resolves these ranges into the shared lockfile. Validate compatibility before changing a shared range.

## Check clean installation and delivery

In a disposable copy preserving workspace paths, manifests, source and lockfile, install with the intended policy:

```bash
bun install --frozen-lockfile
```

If scripts are deliberately disabled for a resolution-only inspection, add `--ignore-scripts` and disclose that native/generated artifacts remain unverified. Repeat the relevant build and consumer checks under the intended production installation policy before claiming deployment readiness.

From a package directory, `bun pm pack --destination <temporary-directory>` produces a local tarball. Review pack lifecycle scripts before running it. Inspect its manifest and contents: `workspace:*` should become the local package version, catalog references should become their declared ranges, and public exports/types must refer to included files. Do not publish as part of inspection. A bundled application can eliminate an internal import while a published library retains it; validate the contract appropriate to that artifact.
