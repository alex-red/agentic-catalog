# Security

Agent instructions do not enforce permissions. Use the agent host's runtime controls and the project's existing authorization boundaries.

For a suspected problem in this library, record the affected component, revision, reproduction, and impact. Remove credentials and private project data before sharing a report. A private reporting address has not been established yet; do not publish sensitive vulnerability details in a public issue. Establish a private channel with the repository owner first.

The scaffold does not install hooks, activate external tools, or run unattended loops. Validation reads repository content and uses temporary directories for isolation tests. `bun run catalog:build` writes the generated catalog; `bun run wiki:build` writes the static export under `dist/wiki/`. The local preview serves only that export on loopback.
