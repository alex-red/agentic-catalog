# MCP server builder: human-focused assessment

Reviewed 2026-10-29 (America/Edmonton) by Codex, an AI curator. Rubric: [human-v1](../ratings.md). This is one curator’s source-based judgment, not independent human calibration or a behavioral evaluation.

Developers working on this task: Building or reviewing an MCP server that wraps an external API or service. Declared hosts: any.

Current MCP SDK documentation and a small server built with its official examples, using the host’s ordinary code review.

Useful MCP design guidance; supporting implementation and evaluation material still needs inspection.

## Inspection and provenance

Pinned upstream revision: `b9e19e6f44773509fbdd7001d77ff41a49a486c1`. Exact file digests, source URLs, prior rating and inspection status are recorded under `mcp-builder` in the [assessment manifest](2026-10-29-catalog-assessment-sources.json). Linked source content was treated as data; no installer, upstream helper or integration was executed.

- [skills/mcp-builder/SKILL.md](https://raw.githubusercontent.com/anthropics/skills/b9e19e6f44773509fbdd7001d77ff41a49a486c1/skills/mcp-builder/SKILL.md) — read in full.

The listed excerpts support partial judgments only. Unlisted runtime, required references and transitive dependencies are outside coverage; no aggregate is assigned.

## Grades

| Criterion | Grade (0–4) | Rationale |
| --- | ---: | --- |
| Practical value | 3 | Tool-contract design and evaluation planning add structure beyond SDK examples. |
| Dependability | Not graded | Required best-practice guides, language references and evaluation scripts are uninspected. |
| Cognitive ease | 2 | Four phases and broad coverage requirements are costly for small servers. |
| Human control | 3 | Review and evaluation checkpoints expose decisions without establishing runtime approval boundaries. |
| Adoption cost | 3 | Python or TypeScript implementation needs the matching SDK and harness. |
| Compatibility | 3 | MCP concepts transfer but SDK examples and host integration vary. |
| Upkeep | 2 | Fast-moving SDK details create a recurring update burden. |

Aggregate: **incomplete — withheld**. Weights are provisional editorial choices. Expected developer benefit and burden are predictions from the artifact, not measured outcomes.

## Evidence and limits

Evidence remains **reviewed**. This pass adds no activation, installation or matched-outcome evidence. Existing records, where present, cover only the scope they describe. Host overlap is compared with the recorded catalog alternatives; this is not a fresh audit of every host release.

Previous curator notes, retained as history rather than newly verified facts: The best tool-design guidance found for MCP servers. It is linked because SDK details drift and upstream has not been updated since April 2026. Check its claims against the current MCP SDK documentation.

Open inspection gaps:

- Audit required language guides, best practices and evaluation harness before grading dependability; no server trial was performed.

## Disposition and next evidence

Pending further inspection; retain with an incomplete profile. No payload, installation policy, hooks or tool connections are changed by this rating.

Resolve the named inspection gaps first. A useful next trial would compare the intended task with the named baseline, recording completion, correction effort, interruptions, comprehension and retained human control. Revisit the grades after material source/host changes or consequential failures.
