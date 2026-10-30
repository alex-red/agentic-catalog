# Cloudflare Workers best practices: human-focused assessment

Reviewed 2026-10-29 (America/Edmonton) by Codex, an AI curator. Rubric: [human-v1](../ratings.md). This is one curator’s source-based judgment, not independent human calibration or a behavioral evaluation.

Developers working on this task: Writing, reviewing, or configuring Cloudflare Workers code or Wrangler configuration. Declared hosts: any.

Comparison baseline and alternatives: context7 can fetch Cloudflare docs on request, and models know common Workers patterns, but neither supplies this review checklist or the version-aware baseline.

Useful platform checklist; fixed CPU-plan limits are stale and default logs/traces can affect privacy/cost. Recheck the actual target before applying recipes.

## Inspection and provenance

Pinned upstream revision: `cf56dd4c544917ca6692a475b65a181f2845d557`. Exact file digests, source URLs, prior rating and inspection status are recorded under `workers-best-practices` in the [assessment manifest](2026-10-29-catalog-assessment-sources.json). Linked source content was treated as data; no installer, upstream helper or integration was executed.

- [entries/skills/workers-best-practices/SKILL.md](../../entries/skills/workers-best-practices/SKILL.md) — read in full.
- [entries/skills/workers-best-practices/references/configuration.md](../../entries/skills/workers-best-practices/references/configuration.md) — read in full.
- [entries/skills/workers-best-practices/references/platform-apis.md](../../entries/skills/workers-best-practices/references/platform-apis.md) — read in full.
- [entries/skills/workers-best-practices/references/runtime-patterns.md](../../entries/skills/workers-best-practices/references/runtime-patterns.md) — read in full.

Other packaged or fetched files not inspected in this pass: `entries/skills/workers-best-practices/LICENSE.txt`.

The grades cover the inspected core and relevant paths. Unread optional examples, adapters, licenses and conditional resources are not cleared by this assessment. Local or upstream tests were not run as behavioral evaluation.

## Grades

| Criterion | Grade (0–4) | Rationale |
| --- | ---: | --- |
| Practical value | 4 | Targets Workers-specific lifetime and binding mistakes. |
| Dependability | 2 | Fixed CPU-plan limits and universal binding/config claims require correction against current docs. |
| Cognitive ease | 3 | Concrete anti-patterns aid diagnosis. |
| Human control | 2 | Default observability changes may affect data handling and cost. |
| Adoption cost | 3 | Requires Wrangler types and runtime-relevant verification. |
| Compatibility | 3 | Preserves compatibility settings but names unbundled sibling skills. |
| Upkeep | 2 | Cloudflare APIs, flags and configuration change frequently. |

Aggregate: **7.1/10**. Weights are provisional editorial choices. Expected developer benefit and burden are predictions from the artifact, not measured outcomes.

## Evidence and limits

Evidence remains **reviewed**. This pass adds no activation, installation or matched-outcome evidence. Existing records, where present, cover only the scope they describe. Host overlap is compared with the recorded catalog alternatives; this is not a fresh audit of every host release.

Previous curator notes, retained as history rather than newly verified facts: Concrete, platform-maintained anti-patterns with consequences and checks; three references load on demand. It asks the agent to verify claims against current Cloudflare docs, which is documentation lookup, not remote instructions. It enables logs and traces for production Workers by default, so check that against your cost and logging policy. It names sibling skills (durable-objects, cf-cli, wrangler) that are not included.

## Disposition and next evidence

Keep for the stated use, subject to the limits below. No payload, installation policy, hooks or tool connections are changed by this rating.

A useful next trial would compare the intended task with the named baseline, recording completion, correction effort, interruptions, comprehension and retained human control. Revisit the grades after material source/host changes or consequential failures.

The pinned reference’s fixed plan limits differ from the [current Cloudflare CPU limits](https://developers.cloudflare.com/workers/platform/limits/#cpu-time), checked on the review date. Treat numerical platform recipes as version-sensitive.
