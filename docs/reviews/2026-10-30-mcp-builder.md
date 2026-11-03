# MCP server builder: completed source assessment

Follow-up begun 2026-10-30; completed 2026-11-03 (America/Edmonton) by Codex, an AI curator. Rubric: [human-v1](../ratings.md). This is a provisional source judgment, not independent human calibration or behavioral evidence. Supersedes the [partial assessment](2026-10-29-mcp-builder.md) without rewriting its history.

## Context and comparison

Developers working on this task: Building or reviewing an MCP server that wraps an external API or service. Declared hosts: any.

Baseline: Current MCP SDK documentation and a small server built with its official examples, using the host’s ordinary code review.

## Inspection and finding

Pinned revision: `b9e19e6f44773509fbdd7001d77ff41a49a486c1`. The [follow-up manifest](2026-10-30-assessment-completion-sources.json) records source URLs, SHA-256 digests, retrieved source ranges and prior unknowns under `mcp-builder`. Files downloaded outside those ranges are not claimed inspected. Source was treated as data; no upstream helper, installer or integration was executed.

Both implementation guides, the best-practice/evaluation guides and both Python helpers were inspected. The harness exposes every listed tool without enforcing its advertised read-only task scope, handles only the first tool_use block, and JSON-serializes SDK content objects without conversion. The Python file-resource example joins an unvalidated name under ./docs; the TypeScript HTTP recipe listens without a loopback host or authentication middleware despite the security guidance. These are concrete limitations, not merely absent runtime testing. Use tool-design principles selectively; repair examples/harness before copying them.

## Grades

| Criterion | Grade (0–4) | Rationale |
| --- | ---: | --- |
| Practical value | 3 | Tool-contract design and evaluation planning add structure beyond SDK examples. |
| Dependability | 1 | Tool-design principles remain useful, but implementation examples and the evaluation harness have concrete correctness/control defects. Repair the file-resource, HTTP and harness paths before use; scoped example blocker retained. |
| Cognitive ease | 2 | Four phases and broad coverage requirements are costly for small servers. |
| Human control | 3 | Review and evaluation checkpoints expose decisions without establishing runtime approval boundaries. |
| Adoption cost | 3 | Python or TypeScript implementation needs the matching SDK and harness. |
| Compatibility | 3 | MCP concepts transfer but SDK examples and host integration vary. |
| Upkeep | 2 | Fast-moving SDK details create a recurring update burden. |

Aggregate: **6.0/10** · scoped blockers remain. Weights are provisional editorial choices. Completing a profile does not establish that its examples are correct or authorize its installation.

## Blockers and disposition

- **Python file-resource and TypeScript HTTP example deployment:** The Python example interpolates an unvalidated name into a file path; the HTTP example omits host binding and authentication middleware. Do not deploy these recipes unchanged.

Disposition: **Refresh**. Replace the unsafe example transport/file handling and constrain evaluation calls to an explicitly selected tool set before recommending those paths.

## Evidence and limits

Evidence remains **reviewed**; existing evidence records retain their original scope. No installation, activation, live service accuracy, native binary correspondence or measured improvement over the baseline is claimed. Source inspection does not audit transitive dependencies or validate behavior in every supported environment. Revisit after source/host changes, consequential failure or a matched trial recording correction effort, interruptions, comprehension and control.
