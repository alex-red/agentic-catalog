# Reduce unnecessary motion (Emil Kowalski): human-focused assessment

Reviewed 2026-10-29 (America/Edmonton) by Codex, an AI curator. Rubric: [human-v1](../ratings.md). This is one curator’s source-based judgment, not independent human calibration or a behavioral evaluation.

Developers working on this task: An interface feels slow or over-animated and you want a focused motion-reduction pass that preserves interaction behavior. Declared hosts: any.

Comparison baseline and alternatives: emil-design-eng and baseline-ui address motion policy; ux-critique may identify excessive motion. This adds an explicit removal-hazard procedure. It opposes Taste's marketing motion quota, so choose according to the task rather than combining them.

Use dependency-aware cleanup while retaining intentional motion and accepted project decisions.

## Inspection and provenance

Pinned upstream revision: `a81dbca07f2217b7103e510c0f13f8d5b017afc9`. Exact file digests, source URLs, prior rating and inspection status are recorded under `remove-animations` in the [assessment manifest](2026-10-29-catalog-assessment-sources.json). Linked source content was treated as data; no installer, upstream helper or integration was executed.

- [skills/remove-animations/SKILL.md](https://raw.githubusercontent.com/emilkowalski/skills/a81dbca07f2217b7103e510c0f13f8d5b017afc9/skills/remove-animations/SKILL.md) — read in full.

The grades cover the inspected core and relevant paths. Unread optional examples, adapters, licenses and conditional resources are not cleared by this assessment. Local or upstream tests were not run as behavioral evaluation.

## Grades

| Criterion | Grade (0–4) | Rationale |
| --- | ---: | --- |
| Practical value | 3 | Concrete dependency checks help simplify motion without breaking UI state. |
| Dependability | 2 | Useful callback and focus hazards coexist with universal deletion rules and an arbitrary kept-animation quota. |
| Cognitive ease | 1 | Long staged instructions and count-based requirements add effort to a cleanup task. |
| Human control | 3 | Explicit scope and separate dependency-removal proposals preserve review, but blanket rules need exceptions. |
| Adoption cost | 3 | No special runtime is needed beyond the project frontend toolchain. |
| Compatibility | 3 | Applies broadly to web UIs, with stack-specific searches and examples. |
| Upkeep | 3 | Mostly stable guidance; library and accessibility details still need maintenance. |

Aggregate: **6.3/10**. Weights are provisional editorial choices. Expected developer benefit and burden are predictions from the artifact, not measured outcomes.

## Evidence and limits

Evidence remains **reviewed**. This pass adds no activation, installation or matched-outcome evidence. Existing records, where present, cover only the scope they describe. Host overlap is compared with the recorded catalog alternatives; this is not a fresh audit of every host release.

Previous curator notes, retained as history rather than newly verified facts: Complete entrypoint and MIT license reviewed. Dependency hazards are concrete; universal keyboard/frequency deletion rules and a fixed kept-animation quota are opinions. Apply the user's scope and accepted project decisions first. Dependency removal is separately proposed. No behavioral evaluation.

## Disposition and next evidence

Keep for the stated use, subject to the limits below. No payload, installation policy, hooks or tool connections are changed by this rating.

A useful next trial would compare the intended task with the named baseline, recording completion, correction effort, interruptions, comprehension and retained human control. Revisit the grades after material source/host changes or consequential failures.
