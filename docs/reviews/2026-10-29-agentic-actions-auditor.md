# Audit AI agents in GitHub Actions (Trail of Bits): human-focused assessment

Reviewed 2026-10-29 (America/Edmonton) by Codex, an AI curator. Rubric: [human-v1](../ratings.md). This is one curator’s source-based judgment, not independent human calibration or a behavioral evaluation.

Developers working on this task: Reviewing workflows that invoke an AI agent action, especially ones triggered by issues, comments or pull_request_target. Declared hosts: any.

Comparison baseline and alternatives: github-actions-hardening covers general workflow hardening, including direct expression injection and pull_request_target checkout, which this also checks. This adds the agent-specific vectors and action settings. Host security review does not cover workflow configuration.

Useful specialist audit structure, but unsafe remediation and unreviewed required references prevent an aggregate.

## Inspection and provenance

Pinned upstream revision: `123037ec8aed26f0d86327cc39137ee5043e5deb`. Exact file digests, source URLs, prior rating and inspection status are recorded under `agentic-actions-auditor` in the [assessment manifest](2026-10-29-catalog-assessment-sources.json). Linked source content was treated as data; no installer, upstream helper or integration was executed.

- [plugins/agentic-actions-auditor/skills/agentic-actions-auditor/SKILL.md](https://raw.githubusercontent.com/trailofbits/skills/123037ec8aed26f0d86327cc39137ee5043e5deb/plugins/agentic-actions-auditor/skills/agentic-actions-auditor/SKILL.md) — read in full.
- [plugins/agentic-actions-auditor/skills/agentic-actions-auditor/references/vector-g-eval-of-ai-output.md](https://raw.githubusercontent.com/trailofbits/skills/123037ec8aed26f0d86327cc39137ee5043e5deb/plugins/agentic-actions-auditor/skills/agentic-actions-auditor/references/vector-g-eval-of-ai-output.md) — read in full.
- [plugins/agentic-actions-auditor/skills/agentic-actions-auditor/references/action-profiles.md](https://raw.githubusercontent.com/trailofbits/skills/123037ec8aed26f0d86327cc39137ee5043e5deb/plugins/agentic-actions-auditor/skills/agentic-actions-auditor/references/action-profiles.md) — read in full.

The listed excerpts support partial judgments only. Unlisted runtime, required references and transitive dependencies are outside coverage; no aggregate is assigned.

## Grades

| Criterion | Grade (0–4) | Rationale |
| --- | ---: | --- |
| Practical value | 4 | Adds agent-prompt dataflow and configuration-specific attack vectors. |
| Dependability | Not graded | A supplied SAFE output example is injectable; remaining vectors are unaudited. |
| Cognitive ease | 3 | Per-vector traces help explain cross-file risks. |
| Human control | 4 | Reports findings; fetched YAML is explicitly data. |
| Adoption cost | 3 | Many references and action/version knowledge are required. |
| Compatibility | 3 | GitHub-only and limited cross-file resolution. |
| Upkeep | 2 | Action input names and sandbox defaults drift quickly. |

Aggregate: **incomplete — withheld** · scoped blocker(s) remain. Weights are provisional editorial choices. Expected developer benefit and burden are predictions from the artifact, not measured outcomes.

## Evidence and limits

Evidence remains **reviewed**. This pass adds no activation, installation or matched-outcome evidence. Existing records, where present, cover only the scope they describe. Host overlap is compared with the recorded catalog alternatives; this is not a fresh audit of every host release.

Previous curator notes, retained as history rather than newly verified facts: All 17 files read at the pin. Covers agent-specific sinks a general reviewer misses. Defects verified at the pin. The AI-output remediation labelled SAFE puts model output in single quotes inside run:, which is still injectable, and names a wrong output (result, not response). Gemini sandbox defaults contradict across files. Vector H omits bypass-permission flags. Action input names will drift. Experimental for these reasons.

Open inspection gaps:

- Dependability: core plus vector G/action profiles were read; foundations, other vectors and cross-file-resolution remain uninspected in this pass.

Scoped blockers:

- **GitHub AI Inference remediation in references/action-profiles.md:** The example labeled SAFE interpolates model output into a single-quoted run script, which an embedded quote can escape; it also conflicts with vector G on the output field. Do not copy that remediation.

## Disposition and next evidence

Refresh affected paths; retain the entry with explicit blockers. No payload, installation policy, hooks or tool connections are changed by this rating.

Resolve the named inspection gaps first. Correct or independently verify the affected recipe/policy before using that path. A useful next trial would compare the intended task with the named baseline, recording completion, correction effort, interruptions, comprehension and retained human control. Revisit the grades after material source/host changes or consequential failures.
