# Review and retirement procedures

## Evidence that changes the decision

| Signal | What to establish | Likely disposition |
| --- | --- | --- |
| A host now provides the capability | Name the exact built-in and verify it covers the entry's actual job on its supported hosts; account for portable or offline use | Archive if no useful distinction remains; otherwise keep or narrow |
| Another entry supersedes it | Compare instructions, dependencies, audience, and task coverage; identify incremental value rather than just comparing scores | Keep a labelled alternative or archive the redundant entry |
| Advice or examples are stale | Identify consequential errors at the pinned revision and verify current behavior against primary documentation | Refresh if repairable; archive if no viable maintained path remains |
| Context or process cost exceeds value | Cite broad triggers, duplicated instructions, unnecessary workflow ownership, or documented usage friction | Refresh scope or archive, explaining the tradeoff |
| Upstream archived, deleted, or inactive | Check whether the pinned local content still works, remains lawful to retain, and serves a distinct job | Review; upstream inactivity alone does not require retirement |
| Few installs, falling attention, or no recorded use | Establish what is actually measured and whether comparable dated observations exist; distinguish missing data from zero use | Investigate; do not retire solely on this signal |
| Repeated negative outcomes | Inspect tasks, host/model versions, conditions, and transcripts; distinguish trigger misses from outcome failures and weak fixtures | Refresh or archive based on the supported failure, not a benchmark headline |
| License, provenance, or harmful behavior issue | Identify the affected files and applicable evidence; avoid perpetuating content whose retention is inappropriate | Remove affected payload when warranted; retain only an appropriate factual record |

An old curator rating does not settle present usefulness. A featured or custom flag is not protection against retirement, and `experimental` is not a reason by itself to remove something. Avoid deleting a unique specialist capability just because a broad entry is more popular. When a replacement is not already admitted, state the coverage gap and assess retirement on its own merits; a scouting recommendation is not an installed replacement.

## Report contents

Include the as-of date, research date/timezone, authorization scope (review or apply), baseline report links, sources checked, and access limits. For a broad review, include all in-scope entry IDs in a disposition table with a concise reason and next step.

For proposed refreshes or retirements, add focused records with:

- Entry ID/type, current metadata path, pinned upstream artifact/revision where present, evidence level, and original admission rationale.
- What changed, supporting links with checked dates, files inspected, remaining unknowns, and confidence with an explanation.
- Named host or catalog overlap, replacement comparison, strongest remaining reason to keep the entry, and why the chosen disposition beats the alternatives.
- Collections, incoming `related` references, evaluation cases, lint exclusions, tests, inventory and documentation affected; exact intended movements or deletions when applying.
- Proposed archive/removal record, retained evidence, recovery method, remaining coverage gap, and evidence that would justify restoration.

Finish with up to five ranked actions; no minimum number of retirements. After applying changes, distinguish completed actions from proposals and pending items, and link verification results without describing structural checks as behavioral evaluation.

## Archive layout

Use a dated directory outside the active `entries/` tree:

```text
archive/YYYY-MM-DD/
  skills/example-skill/          Complete original entry directory, unchanged
  records/example-skill.md       Retirement reason, provenance, file map, restoration
  evals/cases/example-case.yaml  Exclusive case moved out of active discovery, if needed
```

Use the actual type folder (`rules/`, `workflows/`, and so on) and entry ID. The archive date is the date the change is applied, distinct from a historical review cutoff. If the target already exists, use a new date directory with a numeric suffix; never merge into or overwrite an earlier snapshot. Create only directories and records actually needed.

Keep `entry.yaml`, payloads, resources, and license/notice files unchanged within the snapshot. The record belongs outside the entry directory, including for linked entries that must contain only metadata. No new archive metadata field or loader is needed: the current catalog reads only `entries/`. Archives are historical source material, not active or installable recommendations.

The retirement record names the original path, current source pin and license, archive date, reason/evidence, user-request scope, previous status, replacement or remaining gap, and every move/reference change. Include a Git revision identifying the prior committed state when available, and note any uncommitted source changes captured in the snapshot. A Git revision alone cannot recover uncommitted files. Preserve IDs as historical identities; do not reuse an archived ID for an unrelated skill.

For removal, use the same dated `records/` convention without an entry snapshot. Describe exactly what was removed, why payload retention was inappropriate or declined, and whether the prior content is recoverable from Git. Do not claim removal purges Git history or copies installed elsewhere. Do not copy problematic material merely to make an archive complete.

## Applying a retirement without breaking the catalog

1. Inspect `git status`, the complete entry, and incoming references before changing anything. Search the ID and original path with `rg` across active source, collections, eval cases, scripts, tests, and docs. Read each relevant match: an ID in a historical report is not an active dependency. Preserve unrelated edits; do not discard uncommitted payload changes to match a prior commit.
2. Write the retirement record and move the complete directory for an archive, or remove the scoped payload for a removal. Verify archived file contents and licenses against the pre-move snapshot. Never reformat or patch vendored payloads, including archived ones.
3. Remove retired IDs from active collections and incoming `related` lists. If a collection loses its purpose, retire it explicitly and record the change; do not leave invalid empty collections or substitute unapproved entries. Check prose dependencies in other entry payloads. If a retained vendored entry depends on the retired content, resolve the dependency through an authorized supported path rather than editing that vendored copy or leaving it broken.
4. Move evaluation cases that target the retired entry out of `evals/cases/`, which validates against active IDs. Preserve their original contents and record original paths; keep shared fixtures, graders, and historical `evals/results/` evidence in place. Check other active evidence references before moving any shared artifact. Adapt tests that require an active retired ID to equivalent supported fixtures, preserving their meaningful invariants instead of deleting the coverage.
5. Remove the old active vendored-directory ignore from `.markdownlint-cli2.jsonc`. For archived vendored payloads, add a narrow ignore for the new archived entry directory so lint never rewrites or demands changes to the preserved source. Keep retirement records linted; do not ignore the entire archive.
6. Update the current inventory in `PLAN.md` and current descriptive references affected by the removal. Append the lasting decision to `docs/decisions.md`; leave historical reports and evidence intact. Record a coverage gap honestly instead of claiming a proposed replacement is already available.
7. Run `bun run catalog:build`, then `bun run check`. Check generated outputs for retired IDs, verify the archive against the pre-move inventory and contents, and review the final diff for unrelated deletions or unresolved active references. Fix failures within scope; do not hand-edit generated files to hide them. Report any blocked follow-up without claiming completion.

## Restoration

Read the retirement record and re-evaluate its reason against current host capabilities, upstream content, licenses, and catalog coverage. A request to inspect an archive does not reactivate it. For a requested restoration, restore the entry to its original active path only if the ID is available, reconcile changed dependencies and metadata under normal admission rules, restore appropriate evaluation cases and references, and reverse vendored lint exclusions as needed. Leave the archive and historical evidence intact. Rebuild and check the catalog; record why restoration is now justified without upgrading evidence beyond what the linked records support.
