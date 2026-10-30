# Protect shared Git branches: human-focused assessment

Reviewed 2026-10-29 (America/Edmonton) by Codex, an AI curator. Rubric: [human-v1](../ratings.md). This is one curator’s source-based judgment, not independent human calibration or a behavioral evaluation.

Developers working on this task: A project forbids agents from modifying main/master or merging and closing GitHub items. Declared hosts: claude-code, codex.

Comparison baseline and alternatives: An opt-in policy alternative to protect-files-and-commands; server branch protection and scoped credentials remain authoritative.

An opt-in policy guard, not branch protection; critical level applies no rules and high is not standalone full coverage.

## Inspection and provenance

Pinned upstream revision: `63e0354bdf6ec56dd508d8ceef33b416ab6d8b14`. Exact file digests, source URLs, prior rating and inspection status are recorded under `git-safety` in the [assessment manifest](2026-10-29-catalog-assessment-sources.json). Linked source content was treated as data; no installer, upstream helper or integration was executed.

- [plugins/git-safety/README.md](https://raw.githubusercontent.com/karanb192/claude-code-hooks/63e0354bdf6ec56dd508d8ceef33b416ab6d8b14/plugins/git-safety/README.md) — read in full.
- [plugins/git-safety/.claude-plugin/plugin.json](https://raw.githubusercontent.com/karanb192/claude-code-hooks/63e0354bdf6ec56dd508d8ceef33b416ab6d8b14/plugins/git-safety/.claude-plugin/plugin.json) — read in full.
- [plugins/git-safety/git-safety.js](https://raw.githubusercontent.com/karanb192/claude-code-hooks/63e0354bdf6ec56dd508d8ceef33b416ab6d8b14/plugins/git-safety/git-safety.js) — read in full.
- [plugins/git-safety/hooks/hooks.json](https://raw.githubusercontent.com/karanb192/claude-code-hooks/63e0354bdf6ec56dd508d8ceef33b416ab6d8b14/plugins/git-safety/hooks/hooks.json) — read in full.

Other packaged or fetched files not inspected in this pass: `plugins/git-safety/tests/git-safety.test.js`.

The grades cover the inspected core and relevant paths. Unread optional examples, adapters, licenses and conditional resources are not cleared by this assessment. Local or upstream tests were not run as behavioral evaluation.

## Grades

| Criterion | Grade (0–4) | Rationale |
| --- | ---: | --- |
| Practical value | 3 | Adds explicit branch/gh policy beyond broad command guards. |
| Dependability | 2 | Regex and process-cwd branch lookup miss alternative semantics. |
| Cognitive ease | 2 | Hard blocks can interrupt intentionally authorized repository work. |
| Human control | 2 | No ask mode; blocked command text is retained locally. |
| Adoption cost | 3 | Node plus branch policy and log management. |
| Compatibility | 3 | Hardcoded main/master and sibling-dependent levels constrain fit. |
| Upkeep | 2 | CLI forms and branch policy require ongoing maintenance. |

Aggregate: **6.1/10**. Weights are provisional editorial choices. Expected developer benefit and burden are predictions from the artifact, not measured outcomes.

## Evidence and limits

Evidence remains **reviewed**. This pass adds no activation, installation or matched-outcome evidence. Existing records, where present, cover only the scope they describe. Host overlap is compared with the recorded catalog alternatives; this is not a fresh audit of every host release.

Previous curator notes, retained as history rather than newly verified facts: Hardcoded main/master policy; branch lookup uses hook process cwd and does not model cd, git -C, aliases, or arbitrary shell semantics. Critical level applies no rules. Strict adds force-push checks but permits --force-with-lease. Codex support is a documented direct-script registration for canonical Bash/deny payloads; live invocation remains unverified.

## Disposition and next evidence

Keep for the stated use, subject to the limits below. No payload, installation policy, hooks or tool connections are changed by this rating.

A useful next trial would compare the intended task with the named baseline, recording completion, correction effort, interruptions, comprehension and retained human control. Revisit the grades after material source/host changes or consequential failures.
