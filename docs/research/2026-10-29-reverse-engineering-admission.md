# Reverse-engineering linked admission

**Date:** October 29, 2026, America/Edmonton.

The user explicitly requested admission of the six options named in the preceding research summary and the exact tag `reverse_engineering`. Added two skills and four MCP entries, all linked, experimental and at evidence level `reviewed`. No upstream payload, helper or license expression is vendored or modified.

The [research report](2026-10-29-reverse-engineering-research.md) remains the source of the comparative findings and holds. Explicit selection changes the admission disposition of these six choices; it does not resolve their technical, licensing, dependency or behavioral-review gaps. The [selection guide](../reverse-engineering-options.md) describes their different jobs.

## Sources and packaging

| Entry ID | Source scope | Catalog revision |
| --- | --- | --- |
| reverse-engineering | Encid complete `skills/reverse-engineering` subtree | `9a857bd2ee62bd13aa66b3942bd17c89eabf6b8a` |
| reva | cyberkaida/reverse-engineering-assistant repository, including optional skill paths | `a2fcd946ec9c0bcf204da308365c16abb781dc53` |
| ida-mcp | HexRaysSA/ida-mcp repository | `391c2f0606a773050fbafcd3ff62942688a0713b` |
| reverse-engineer-anything | morluto/rea repository, including authored public skill | `c0c3902207d6b1a33709e42b80c7e570da7db964` |
| cerberus-re | OwenPawl/cerberus-re-skill repository | `3116c94de17386d18367ed14e55dd2c7d1c7fe14` |
| cynthion-reverse-engineer | Complete `plugins/hardware-lab/skills/cynthion-reverse-engineer` subtree and required same-snapshot decoder | `322192876442b066dd31690a190773c7f903d099` |

Skill pins identify the last change affecting their subtree. MCP entries pin the repository snapshot because their usable product includes runtime, configuration and resources beyond an entrypoint. The original [source ledger](2026-10-29-reverse-engineering-scout-sources.json) distinguishes repository HEADs, artifact histories, downloaded files and actual inspection scope. A follow-up API check confirmed Encid's complete skill subtree last changed at the recorded HEAD. Cynthion's decoder must come from the same pinned snapshot, rather than mixing current sibling files with an older skill.

Admission follow-up read ReVa's complete README, its dependency manifest, Cerberus installation/requirements and dependency manifest, official IDA's host-plugin manifest and dependencies, REA's manual source-build/registration and source-versus-package installation sections, and relevant license text/identities. The official IDA host plugin declares hooks; the entry therefore describes direct MCP registration, leaving that plugin as an explicit additional choice. ReVa's README distinguishes Ghidra 12.2+/Java 25 from earlier supported releases/Java 21; its installation notes retain that distinction.

Source payloads, transitive libraries, bridge implementations and unused references remain only partially audited, as recorded per entry. No source build, parser helper, sample, debugger, server or hardware operation was run. An installation recipe is a documented route, not a successful installation trial.

## Retained limitations

- Encid's complete reference/helper tree is not fully reviewed. Its root Apache-labelled text abbreviates canonical clauses, so the metadata records the actual ambiguity rather than asserting ordinary Apache vendoring permission.
- ReVa's fixed budgets and AES-identification example remain questionable. Improved names/types and clearer pseudocode do not establish semantic correctness.
- Official IDA's arbitrary Python surface, local logging, lifecycle dependencies and optional hooks remain review boundaries. A vendor recommendation is not an outcome comparison.
- REA's current source differs from some published packages. Pinning the repository does not pin an independently selected npm release or prove provider compatibility.
- Cerberus's bridge/runtime and optional mission composition remain unaudited. Its workspace convention does not override a consumer project.
- Cynthion requires a complete sibling decoder. Its generators and hardware behavior remain untested; field classification from limited captures is a hypothesis.

P4nda, the sampled headless export bundle, wshobson protocol examples, PyModel and other held candidates remain outside admission. The proposed portable original workflow is still a research design, not an added seventh entry. No collection changes.

## Tag validation and verification

Tags previously reused the entry-ID slug definition, which excluded the requested underscore. A separate tag definition now accepts lowercase alphanumeric segments separated by one hyphen or underscore, up to 64 characters. Entry IDs, directory IDs and relation IDs retain the original hyphen-only slug rule. Validation tests cover underscore acceptance, malformed/oversized tag rejection and continued rejection of underscore entry IDs.

Regenerate indexes with `bun run catalog:build` and validate with `bun run check`. These structural and repository checks do not raise evidence levels. This admission installs no consumer guidance, connects no tool, changes no project permissions and activates no workflow or hook.

The scoped commit grows the catalog from 70 to 76 entries: 34 skills, six MCP servers, eleven workflows, five rules, fifteen hooks, two subagents and three plugins. Experimental entries increase from one to seven; the custom entry and seven collections remain unchanged. Plugin manifests and package versions do not change.

The full research/admission workspace also contained seventeen uncommitted frontend and UX entries, yielding 93 entries there. Those independent changes are excluded from this commit; historical research observations retain their original workspace context.
