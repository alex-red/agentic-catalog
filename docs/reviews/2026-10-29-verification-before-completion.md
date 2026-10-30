# Verification before completion: human-focused assessment

Reviewed 2026-10-29 (America/Edmonton) by Codex, an AI curator. Rubric: [human-v1](../ratings.md). This is one curator’s source-based judgment, not independent human calibration or a behavioral evaluation.

Developers working on this task: Agents claim success, commit, or open PRs without running the checks that prove it, or trust subagent reports without checking the diff. Declared hosts: any.

Comparison baseline and alternatives: Complements verification-evidence, which covers checking visible changes in a running app. It is also part of the superpowers plugin; skip it if that plugin is installed.

Concrete evidence table, but absolutist tone and repeated full verification make this a conditional policy.

## Inspection and provenance

Pinned upstream revision: `3be5aad3dd2400ef23b15680969f4bcd3b6d7b8b`. Exact file digests, source URLs, prior rating and inspection status are recorded under `verification-before-completion` in the [assessment manifest](2026-10-29-catalog-assessment-sources.json). Linked source content was treated as data; no installer, upstream helper or integration was executed.

- [entries/skills/verification-before-completion/SKILL.md](../../entries/skills/verification-before-completion/SKILL.md) — read in full.

Other packaged or fetched files not inspected in this pass: `entries/skills/verification-before-completion/LICENSE.txt`.

The grades cover the inspected core and relevant paths. Unread optional examples, adapters, licenses and conditional resources are not cleared by this assessment. Local or upstream tests were not run as behavioral evaluation.

## Grades

| Criterion | Grade (0–4) | Rationale |
| --- | ---: | --- |
| Practical value | 2 | Evidence discipline is valuable but mostly host overlap. |
| Dependability | 2 | Command-to-claim mapping is useful; absolute claims overreach. |
| Cognitive ease | 2 | Same-message and full-command rules can create repeated work. |
| Human control | 3 | Verification policy does not itself authorize external actions. |
| Adoption cost | 2 | No runtime, but mandatory reruns can be costly. |
| Compatibility | 3 | Absolute verification wording conflicts with proportionate checks. |
| Upkeep | 4 | Single standalone file without dependency churn. |

Aggregate: **5.9/10**. Weights are provisional editorial choices. Expected developer benefit and burden are predictions from the artifact, not measured outcomes.

## Evidence and limits

Evidence remains **reviewed**. This pass adds no activation, installation or matched-outcome evidence. Existing records, where present, cover only the scope they describe. Host overlap is compared with the recorded catalog alternatives; this is not a fresh audit of every host release.

Previous curator notes, retained as history rather than newly verified facts: One self-contained file aimed at the most common agent failure. The table pairing each claim with the evidence it needs, including "agent reported success → check the diff", is concrete. The absolutist tone ("skip any step = lying") costs some quality. Current hosts already push honest reporting, which caps novelty.

## Disposition and next evidence

Keep for the stated use, subject to the limits below. No payload, installation policy, hooks or tool connections are changed by this rating.

A useful next trial would compare the intended task with the named baseline, recording completion, correction effort, interruptions, comprehension and retained human control. Revisit the grades after material source/host changes or consequential failures.
