# Catalog wiki

A static field guide to the generated catalog. Search skills, rules, and profiles; filter by type; switch layouts; and read a component or reference guide without leaving the page. Profiles link to their included components. Filters and item links survive a reload and can be shared.

## Preview

From the repository root:

```sh
bun install
bun run wiki:dev
```

Open the printed local URL, normally `http://127.0.0.1:4173/`. Use `bun run wiki:dev -- --port 4180` to select another port. The command rebuilds once at startup; restart it after source changes. Stop it with Ctrl+C.

## Build

```sh
bun run catalog:build
bun run wiki:build
```

The output is `dist/wiki/`. Serve that directory with a static HTTP server or deploy it to a static host. It works at a domain root or a subdirectory and uses local assets throughout. Opening the HTML directly with `file://` does not support its JSON fetch.

The build reads `catalog/index.json`, verifies that it matches its authoring sources, and renders the linked Markdown. It includes source copies and linked local documents for the reader. New catalog entries appear on the next build; do not maintain a second item list in the webpage. Review linked documents before publishing an export.

There is no frontend framework, bundler, runtime dependency, analytics, or external font request. Build-time Markdown extensions render tables and checklists. Raw HTML and unsafe link protocols are excluded from rendered documentation.

`bun run check` includes the wiki's build and tooling tests. Browser checks are separate from the agent-host compatibility and effectiveness evaluations described in the main plan.
