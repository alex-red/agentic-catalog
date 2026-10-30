# Find skills on skills.sh: human-focused assessment

Reviewed 2026-10-29 (America/Edmonton) by Codex, an AI curator. Rubric: [human-v1](../ratings.md). This is one curator’s source-based judgment, not independent human calibration or a behavioral evaluation.

Developers working on this task: You want to search the wider public skills registry, beyond this curated catalog. Declared hosts: any.

Comparison baseline and alternatives: The agentic-catalog skill in this repository covers curated discovery. Claude Code's plugin browser and Codex's skill installer cover installation.

Discovery utility with weak vetting heuristics; stars/installs do not establish safety or quality.

## Inspection and provenance

Pinned upstream revision: `773fb2c7bbf16781670a3520affc4abd0c6151ae`. Exact file digests, source URLs, prior rating and inspection status are recorded under `find-skills` in the [assessment manifest](2026-10-29-catalog-assessment-sources.json). Linked source content was treated as data; no installer, upstream helper or integration was executed.

- [skills/find-skills/SKILL.md](https://raw.githubusercontent.com/vercel-labs/skills/773fb2c7bbf16781670a3520affc4abd0c6151ae/skills/find-skills/SKILL.md) — read in full.

The grades cover the inspected core and relevant paths. Unread optional examples, adapters, licenses and conditional resources are not cleared by this assessment. Local or upstream tests were not run as behavioral evaluation.

## Grades

| Criterion | Grade (0–4) | Rationale |
| --- | ---: | --- |
| Practical value | 2 | Searches a broad ecosystem already partly covered by catalog discovery. |
| Dependability | 1 | Popularity and reputation are treated as quality evidence. |
| Cognitive ease | 2 | Specific queries help; leaderboard-first detours cost attention. |
| Human control | 1 | Default global -g -y recipe broadens installation scope. |
| Adoption cost | 3 | Requires npm/network and inspection of discovered sources. |
| Compatibility | 2 | Global installation can conflict with project conventions. |
| Upkeep | 3 | Registry commands and source trust must be maintained. |

Aggregate: **4.5/10** · scoped blocker(s) remain. Weights are provisional editorial choices. Expected developer benefit and burden are predictions from the artifact, not measured outcomes.

## Evidence and limits

Evidence remains **reviewed**. This pass adds no activation, installation or matched-outcome evidence. Existing records, where present, cover only the scope they describe. Host overlap is compared with the recorded catalog alternatives; this is not a fresh audit of every host release.

Previous curator notes, retained as history rather than newly verified facts: The most-installed skill on skills.sh. It treats popularity as trust, and it suggests global installs that skip confirmation (-g -y), which conflicts with explicit approval. skills.sh's own audit marks it medium risk. If you install it, drop -y.

Scoped blockers:

- **Default installation recipe:** The offered installation defaults to global scope and skips CLI confirmation; do not run it from approval for only a project-scoped install.

## Disposition and next evidence

Refresh affected paths; retain the entry with explicit blockers. No payload, installation policy, hooks or tool connections are changed by this rating.

Correct or independently verify the affected recipe/policy before using that path. A useful next trial would compare the intended task with the named baseline, recording completion, correction effort, interruptions, comprehension and retained human control. Revisit the grades after material source/host changes or consequential failures.
