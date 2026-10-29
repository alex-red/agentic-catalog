# Monorepo and Bun workspace research and admission

## Scope and baseline

**As of and researched:** October 28, 2026, America/Edmonton. The user requested a monorepo skill/workflow and a Bun-specific skill, authorizing creation if no good Bun option was available. This focused pass includes source research and the authorized admission.

Baseline: `PLAN.md`, `CONTRIBUTING.md`, [decisions 32–35](../decisions.md), the [frontend scout](2026-10-28-catalog-scout-6.md), and existing `repo-research`, `agents-md-authoring`, `verification-before-completion` and `bun-migration-verification`. These supply discovery, scoped project instructions and general/migration verification; none owns monorepo graph selection or ongoing Bun workspace management. The installed host skills include no dedicated monorepo skill.

Admitted two original MIT entries: `monorepo-change-verification` and `bun-workspaces`. Both start at evidence level `reviewed`. The source comparison below explains why the inspected upstream material was not copied unchanged. Including the concurrently admitted `harness-experiment-loop`, the catalog now has 64 entries: 29 skills and eight workflows, with seven collections. Existing uncommitted work is preserved.

## Coverage and observations

Searched GitHub/web leads and skills.sh for monorepo management, Turborepo, Nx, Bun workspaces and Bun validator skills. Inspected four pinned repositories selectively; screened official Nx workspace exploration and several template/integration leads. Primary official Bun, Turbo, Nx, pnpm and TypeScript docs were used to check consequential claims. This is a focused sample, not an exhaustive census or a universal ranking.

The [source record](2026-10-28-monorepo-sources.json) preserves repository HEADs, fetched/read scope, access errors and scratch results. HEAD is a research snapshot, not an admission pin for a specific upstream directory. No upstream installer, skill, hook, scanner or generator was executed. Only independently written disposable fixture scripts were run.

[skills.sh's Turborepo page](https://www.skills.sh/vercel/turborepo) displayed **85.5K aggregate installs**, crawled yesterday; [monorepo-management](https://www.skills.sh/wshobson/agents/monorepo-management) displayed **14.4K**, crawled last week. Accessed October 28. These are cached rounded CLI telemetry displays, not live counts, unique users or quality evidence. No reliable per-skill popularity figure was established for the Bun candidates; missing figures are not zero. No momentum or outcome ranking is inferred.

## Recommend adding — applied

| Entry | Kind | Distinct job |
| --- | --- | --- |
| [Monorepo change verification](../../entries/workflows/monorepo-change-verification/WORKFLOW.md) | Original workflow | Separate package, task and release graphs; choose affected consumers and prerequisites; validate package and cache contracts |
| [Bun monorepo workspaces](../../entries/skills/bun-workspaces/SKILL.md) | Original skill | Bun membership, local protocols, catalogs, linker policy, scoped filters, task ordering and package delivery |

Both entries contain all installable files inside their directories and carry MIT licenses. No third-party skill expression, examples, scripts or local runtime are copied. Ordinary links to version-appropriate product documentation are references, not mandatory remote instruction playbooks.

The workflow is useful across task runners, portable as Markdown and moderately novel beyond native graph commands: it connects three different graphs to conservative selection and consumer evidence. The Bun skill is useful for Bun workspace changes, portable across agent hosts with Bun as a prerequisite, and moderately novel beyond the official docs: it concentrates the command/version and consumer-scope traps. These are curator judgments recorded in metadata, not measured agent improvements.

Overlap is explicit. `repo-research` discovers conventions, `agents-md-authoring` handles local instruction boundaries, and `verification-before-completion` requires evidence. `bun-migration-verification` selects migration layers. The new workflow owns cross-package evidence selection; the new skill owns ongoing Bun workspace contracts. They do not install a runner, convert the current catalog into a monorepo, activate caching/services, or publish a package.

## Review next

### Official Turborepo skill: a good specialist, not a generic baseline

[Exact artifact](https://github.com/vercel/turborepo/blob/e158e859f804019fa48dd1af15bc247e4759d81e/skills/turborepo/SKILL.md), repository HEAD `e158e859f804019fa48dd1af15bc247e4759d81e`. Full entrypoint and actual root MIT license read. The skill routes consumers to the documentation bundled in their installed `turbo` package, resolving the real package location for non-flat layouts. It avoids copying a large manual at a potentially mismatched version.

Good fit for an existing Turbo repository; modest novelty beyond using its installed docs, and not a tool-neutral monorepo workflow. Required installed-package docs were not retrieved or reviewed in this pass; support across historical package versions remains unverified. **Review next if a Turbo-specific entry is requested**, resolving the last path commit and matching package/docs availability first. A linked entry could state the prerequisite clearly; do not add Turbo to an unrelated repository simply to use this skill. The independent workflow covers the requested general job now.

### Official Nx workspace exploration

The current [Nx Console entrypoint](https://github.com/nrwl/nx-console/blob/master/.github/skills/nx-workspace/SKILL.md) was screened through the primary web page, not a complete pinned source/license/closure review. Resolved project configuration is valuable because `project.json` alone can omit inferred targets. However, the read-only description sits alongside troubleshooting commands such as `nx sync` and `nx reset`, which can mutate state. **Specialist follow-up**, not admitted. Review command effects, references, exact revision and rights before recommending installation. The general workflow uses the existing runner's resolved graph rather than requiring Nx.

## Watch / hold / skip

### wshobson monorepo-management — hold unchanged

[Exact directory](https://github.com/wshobson/agents/tree/0874a27b17a22e2b7c2e2bcd725768e0803cad06/plugins/developer-essentials/skills/monorepo-management), HEAD `0874a27b17a22e2b7c2e2bcd725768e0803cad06`. Read full `SKILL.md`, its `references/details.md`, and actual MIT license. No bundled executable is required for the static skill; commands would require its chosen package managers/runners, and remote-cache/release examples introduce optional services and credentials.

The skill has useful package/task topics but contains concrete errors:

- `pnpm --filter "...web" build` is described as building dependencies. Prefix ellipsis selects **dependents**; dependencies use a suffix. See [pnpm's selectors](https://pnpm.io/filtering).
- `pnpm add -D eslint -w` is labelled installation in all packages, but `-w` targets the workspace root.
- Custom Turbo build inputs list source and manifest but omit other output-affecting configuration/assets. [Turbo documents](https://turborepo.dev/docs/crafting-your-repository/configuring-tasks#specifying-inputs) that explicit inputs replace default behavior; narrowing them without a complete contract risks stale hits.
- The package exposes a button subpath while its shown build only names the index entry. A clean consumer needs actual emitted subpath/type files, not just a plausible manifest.

Prescriptive tool choices, old tool versions and adjacent deployment setup need a separate compatibility pass as well. Usefulness broad, quality mixed, portability dependent on chosen tools, novelty modest against official docs. **Do not vendor or adapt the examples wholesale.** This artifact's findings are separate from the earlier Python-testing hold; one does not establish the other.

### shepherdjerred bun-workspaces — useful local guidance, poor unchanged portability

[Exact directory](https://github.com/shepherdjerred/monorepo/tree/ad7466e9f46d7529eb078794d0f088121e90f1a6/packages/dotfiles/dot_agents/skills/bun-workspaces), HEAD `ad7466e9f46d7529eb078794d0f088121e90f1a6`. Read full entrypoint and all three local references: releases, linkers/dependencies/lockfiles, and scripts/builds/publishing. Root license identifies GPLv3; no permissive copying/adaptation permission is inferred. The release ledger says its author inspected 49 documentation pages; that is an author claim, not our inspection of those pages or independent outcome evidence.

Good topics include linker history, catalog naming, frozen installs, peer resolution and artifact exports. But the August 3 baseline targets Bun 1.3.14 and categorically says filtered `bun add` is unavailable. [Current official filters](https://bun.com/docs/pm/filter) support it, and our local Bun 1.4.3 fixture exercised it successfully. The skill also mandates its own monorepo's Turbo build path, warns about thousands of processes at “this monorepo's root,” and carries a local shared-store CI rule. Those may be appropriate there, but are not transferable defaults.

**Hold unchanged for this catalog.** A linked local-policy example could be considered for a different job, after applicability/rights review. Our original skill derives from official contracts rather than editing or paraphrasing this payload. It does not inherit the author's local policies or assume a global store is appropriate.

### shipshitdev bun-validator — current source unavailable at the advertised paths

Repository HEAD `5813ea28a554d8b759453fd547c7f70c6424c01f`. Marketplace search led to `bun-validator`, but raw requests for both likely skill paths returned 404. A complete, untruncated current repository tree contained no Bun validator directory. A Bun reference exists under the stack skill, but it is not the advertised validator and was not substituted for it. The only fetched license was scoped to an unrelated Git skill and establishes no rights for missing content.

**Unavailable candidate**, not a negative quality verdict. Reopen if a canonical current artifact and applicable license can be located. Do not install a similarly named third-party mirror to fill the gap.

## Revisit existing entries

Retain `bun-migration-verification` unchanged: selecting a migration layer differs from maintaining a Bun monorepo. The new skill's overlap field and related links name it. Existing repository research, scoped instruction and generic verification entries remain complementary; no new collection is needed. No existing upstream pin, vendored payload or rating was changed.

## Changes since baseline

Added first dedicated monorepo verification and ongoing Bun workspace coverage. Distinguished a good tool-specific documentation router from a general workflow. Verified current filtered-add support against both official docs and a local binary rather than carrying an older prohibition forward. Preserved earlier frontend, Rust and initialization admissions and their evidence levels. Outstanding upstream holds from the [frontend report](2026-10-28-catalog-scout-6.md) remain open; this pass does not resolve them.

## Verification and limits

In disposable `/tmp/bun-monorepo-7avbeme9`, created three named workspaces on local **Bun 1.4.3** using an explicit isolated linker. Root catalogs pinned `is-number` 7.0.0 and named-catalog `is-odd` 3.0.1; the app consumed an internal core package through `workspace:*`. External dependency installation used `--ignore-scripts`. All executed build/probe scripts were independently written fixture code, not fetched instructions or upstream scripts.

Ten checks passed:

1. Filtered add updated the selected consumer manifest.
2. Root dependency ownership was unchanged.
3. Frozen install preserved the shared lockfile.
4. Dependency selection built core before app and omitted the unrelated package.
5. Reverse-dependent selection included app and omitted the unrelated package.
6. Exact-name selection ran only the selected app.
7. A declared package import and built app resolved from the consumer's scope.
8. Local packing included public output and rewrote the internal version.
9. A fresh disposable copy installed default/named catalogs with a frozen lockfile.
10. The clean dependency-aware build succeeded without prior artifacts.

An initial probe imported the app from the root, which did not declare it, and correctly failed under isolation. The probe was corrected to execute from the consumer's scope; no root dependency or linker relaxation was added to conceal the issue. Both documented command selection and the negative case inform the new skill.

The fixture does not test every linker, Node/browser consumer, lifecycle script, OS, peer combination, cache, CI provider or publishing path. Package packing was local; nothing was published. No representative Turbo/Nx cache test or agent trigger/outcome evaluation was performed. Structural and repository validation do not raise evidence above `reviewed`.

## Top priorities

1. **Applied: monorepo-change-verification.** The general contract works with existing tooling and avoids treating package filtering as complete affected analysis.
2. **Applied: bun-workspaces.** Current Bun command and dependency-scope behavior is captured in a small original skill with conditional reference material.
3. **Optional follow-up: official Turborepo specialist.** Verify its installed-doc prerequisites and path pin if a dedicated Turbo entry is wanted. Do not introduce it merely because a repository has multiple packages.
4. **Future evidence:** use the admitted entries on a real cross-package change and record consumer selection, installation friction and missed checks. This requires a representative project; the scratch checks establish only the listed contracts.
