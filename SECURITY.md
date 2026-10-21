# Security

Agent instructions do not enforce permissions. Use the agent host's runtime controls and the project's existing authorization boundaries.

For a suspected problem in this library, record the affected component, revision, reproduction, and impact. Remove credentials and private project data before sharing a report. Report privately through GitHub's [private vulnerability reporting](https://github.com/alex-red/agentic-catalog/security/advisories/new) for this repository, and do not publish sensitive details in a public issue.

The plugin ships skills only: no hooks, MCP servers, or executables. Validation reads repository content and uses temporary directories for isolation tests. `bun run catalog:build` writes the generated catalog, and `bun run eval:triggers` writes generated cases under `eval-build/`.

`bun run eval:run` starts real agent sessions with permission to edit files and run `python3` inside a temporary fixture copy. Claude Code runs use `acceptEdits` with an allowlist; Codex runs use the `workspace-write` sandbox. Run it only with fixtures from this repository, and treat each workspace as untrusted output.
