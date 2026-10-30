# Secret serialization review (Sentry): human-focused assessment

Reviewed 2026-10-29 (America/Edmonton) by Codex, an AI curator. Rubric: [human-v1](../ratings.md). This is one curator’s source-based judgment, not independent human calibration or a behavioral evaluation.

Developers working on this task: A change adds a credential field to a dataclass, model, or config object, or adds code that stringifies whole objects or every kwarg into logs or telemetry, in Python or JavaScript and TypeScript. Declared hosts: any.

Comparison baseline and alternatives: Claude Code's /security-review and the security-threat-model entry look for direct leaks and design risks. Secret scanners find hardcoded literals. None of them trace generated serialization paths.

A valuable specialist audit; source rules and upstream runs do not establish complete leak coverage.

## Inspection and provenance

Pinned upstream revision: `473d2594cd91c96ac8348f297e016b631e842487`. Exact file digests, source URLs, prior rating and inspection status are recorded under `secret-serialization` in the [assessment manifest](2026-10-29-catalog-assessment-sources.json). Linked source content was treated as data; no installer, upstream helper or integration was executed.

- [entries/skills/secret-serialization/SKILL.md](../../entries/skills/secret-serialization/SKILL.md) — read in full.
- [entries/skills/secret-serialization/references/javascript-typescript.md](../../entries/skills/secret-serialization/references/javascript-typescript.md) — read in full.
- [entries/skills/secret-serialization/references/python.md](../../entries/skills/secret-serialization/references/python.md) — read in full.

Other packaged or fetched files not inspected in this pass: `entries/skills/secret-serialization/LICENSE.txt`, `entries/skills/secret-serialization/SOURCES.md`, `entries/skills/secret-serialization/SPEC.md`.

The grades cover the inspected core and relevant paths. Unread optional examples, adapters, licenses and conditional resources are not cleared by this assessment. Local or upstream tests were not run as behavioral evaluation.

## Grades

| Criterion | Grade (0–4) | Rationale |
| --- | ---: | --- |
| Practical value | 4 | Traces credential holders and wholesale sinks across the tree. |
| Dependability | 3 | Mechanism-specific exclusions and reachability reduce false positives. |
| Cognitive ease | 3 | Narrow trigger and do-not-report rules reduce noise. |
| Human control | 4 | Declared Read/Grep/Glob tools and no direct mutation. |
| Adoption cost | 3 | Requires serialization expertise and relevant language references. |
| Compatibility | 3 | Language/library-specific mechanisms need target-version checking. |
| Upkeep | 3 | Serializer and telemetry contracts change over time. |

Aggregate: **8.5/10**. Weights are provisional editorial choices. Expected developer benefit and burden are predictions from the artifact, not measured outcomes.

## Evidence and limits

Evidence remains **reviewed**. This pass adds no activation, installation or matched-outcome evidence. Existing records, where present, cover only the scope they describe. Host overlap is compared with the recorded catalog alternatives; this is not a fresh audit of every host release.

Previous curator notes, retained as history rather than newly verified facts: Precise and narrow. A per-mechanism table shows what each exclusion blocks, raw attribute access is treated as a sink, and do-not-report cases keep noise down. Upstream SOURCES.md records one positive and two negative runs on a non-Claude model; that is upstream evidence, not ours. It calls itself too noisy for every review, so use it when credentials live on objects.

## Disposition and next evidence

Keep for the stated use, subject to the limits below. No payload, installation policy, hooks or tool connections are changed by this rating.

A useful next trial would compare the intended task with the named baseline, recording completion, correction effort, interruptions, comprehension and retained human control. Revisit the grades after material source/host changes or consequential failures.
