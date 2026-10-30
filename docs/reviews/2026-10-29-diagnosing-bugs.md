# Diagnosing bugs with a tight feedback loop: human-focused assessment

Reviewed 2026-10-29 (America/Edmonton) by Codex, an AI curator. Rubric: [human-v1](../ratings.md). This is one curator’s source-based judgment, not independent human calibration or a behavioral evaluation.

Developers working on this task: Hard, flaky, or performance bugs where the cause is not obvious and guessing has already failed. Declared hosts: any.

Comparison baseline and alternatives: Same job as systematic-debugging; install one of them. This one is stronger on building the reproduction.

Choose for hard bugs; refusing hypotheses without a tight loop and fixed phase counts can slow simpler work.

## Inspection and provenance

Pinned upstream revision: `f3fc5632f401156837ee3872f14fe33ccf1024ea`. Exact file digests, source URLs, prior rating and inspection status are recorded under `diagnosing-bugs` in the [assessment manifest](2026-10-29-catalog-assessment-sources.json). Linked source content was treated as data; no installer, upstream helper or integration was executed.

- [entries/skills/diagnosing-bugs/SKILL.md](../../entries/skills/diagnosing-bugs/SKILL.md) — read in full.
- [entries/skills/diagnosing-bugs/scripts/hitl-loop.template.sh](../../entries/skills/diagnosing-bugs/scripts/hitl-loop.template.sh) — read in full.

Other packaged or fetched files not inspected in this pass: `entries/skills/diagnosing-bugs/LICENSE.txt`, `entries/skills/diagnosing-bugs/agents/openai.yaml`.

The grades cover the inspected core and relevant paths. Unread optional examples, adapters, licenses and conditional resources are not cleared by this assessment. Local or upstream tests were not run as behavioral evaluation.

## Grades

| Criterion | Grade (0–4) | Rationale |
| --- | ---: | --- |
| Practical value | 4 | Concrete feedback-loop construction targets difficult defects. |
| Dependability | 3 | Requires exact symptoms, minimization and regression seams. |
| Cognitive ease | 2 | Mandatory phases and ranked hypotheses impose ceremony. |
| Human control | 3 | Redacts secrets and asks when environment access is missing. |
| Adoption cost | 3 | Repro construction and a HITL helper add effort. |
| Compatibility | 3 | Portable commands but rigid no-loop stops can conflict. |
| Upkeep | 3 | Stable method with a small helper dependency. |

Aggregate: **7.8/10**. Weights are provisional editorial choices. Expected developer benefit and burden are predictions from the artifact, not measured outcomes.

## Evidence and limits

Evidence remains **reviewed**. This pass adds no activation, installation or matched-outcome evidence. Existing records, where present, cover only the scope they describe. Host overlap is compared with the recorded catalog alternatives; this is not a fresh audit of every host release.

Previous curator notes, retained as history rather than newly verified facts: The most actionable debugging skill reviewed. It sets concrete completion criteria for each phase, ranks ten ways to build a repro loop, and explains how to raise the reproduction rate for flaky bugs. It uses no host-specific tools. Widely installed through skills.sh.

## Disposition and next evidence

Keep for the stated use, subject to the limits below. No payload, installation policy, hooks or tool connections are changed by this rating.

A useful next trial would compare the intended task with the named baseline, recording completion, correction effort, interruptions, comprehension and retained human control. Revisit the grades after material source/host changes or consequential failures.
