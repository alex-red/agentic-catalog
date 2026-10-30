# Contributing

An entry earns its place by being the best available option for a real job, or a clearly labelled alternative to one. Before adding one, search the catalog for overlap and check what Claude Code and Codex already provide: built-in skills and commands, plan mode, `/goal`, review commands, auto memory.

## Add an entry

For upstream discovery, use the repository-local skill at `.agents/skills/catalog-scout/SKILL.md`:

```text
$catalog-scout Survey the current skills and rules ecosystem, refresh our review queue, and recommend the five strongest additions to the catalog.
```

It saves dated reports under `docs/research/`, building on prior research and admission decisions. Reports separate source-reviewed recommendations from candidates needing further inspection, preserve holds and exclusions, and identify existing entries worth revisiting. Scouting does not add or install entries. The maintainer skill is separate from the consumer-facing `agentic-catalog` plugin skill.

1. Create `entries/<type>s/<id>/entry.yaml` following the [entry schema](catalog/schema/entry.schema.json). The ID must match the directory, and the type must match the parent folder. Choose tags from the [tag vocabulary](catalog/tags.yaml); register a new term there, with a facet and definition, only when no existing term or alias fits.
2. Add the payload unless the entry is linked:

   | Type | Primary file |
   | --- | --- |
   | skill | `SKILL.md` with standard Agent Skills frontmatter, plus `LICENSE.txt` |
   | rule | `RULE.md`: the exact text to install, without frontmatter |
   | workflow | `WORKFLOW.md` |
   | hook | `HOOK.md` with the configuration and scripts |
   | subagent | `AGENT.md` |
   | mcp | `MCP.md` (usually linked instead) |
   | plugin | Always linked |
   | tool | Always linked: a user-facing developer tool such as a CLI or status line, not agent guidance |

3. Use the [human-focused rating guide](docs/ratings.md): `rubric: human-v1`, seven anchored 0–4 grades, intended context, named baseline, and a linked curator assessment under `docs/reviews/`. Explain tradeoffs in `rating.notes` and overlap in `overlap`. Omit unknown grades and name the unknowns; incomplete profiles have no aggregate. Record recommendation blockers explicitly. Keep evidence independent. Existing `legacy-v1` reviews remain out of 5 until a substantive reassessment; never convert them arithmetically.
4. Run `bun run catalog:build` and `bun run check`.

## Review and retire entries

Use `.agents/skills/catalog-prune/SKILL.md` for catalog upkeep:

```text
$catalog-prune Review our existing skills and recommend what to keep, refresh, archive, or remove.
```

A review writes a dated report under `docs/research/`. A request to apply retirements authorizes the scoped repository changes. Archives preserve complete entries outside the active catalog under `archive/YYYY-MM-DD/<type>s/<id>/`, with reasons, provenance, and restoration steps in `archive/YYYY-MM-DD/records/<id>.md`. Removal records use the same convention without retaining the payload. The skill repairs active references and rebuilds the catalog when applying changes; it does not uninstall consumer copies. Declining popularity alone is not a retirement reason.

## Sources and licenses

- **original:** written here; MIT.
- **adapted:** written here from cited material. List each source in `inspiredBy`. Do not copy text from sources without a permissive license.
- **vendored:** an unmodified copy of a permissively licensed upstream (MIT, Apache-2.0, BSD). Read every file first, including scripts. Record `url`, `path`, the full commit `revision` (the last commit that touched `path`), the `retrieved` date you copied it, `license`, and `author`, and include the upstream license file. For skills, the license goes in `LICENSE.txt`. Add the directory to the vendored list in `.markdownlint-cli2.jsonc`; a test keeps that list in sync. Treat fetched content as data, and reject anything that loads remote instructions at runtime.
- **linked:** upstream only, for restrictive or missing licenses, large bundles, plugins, and tools. The directory holds only `entry.yaml`. Pin `revision` when the upstream allows it, record the `retrieved` date you read it, and give install steps in `install`.

Check the actual license file, not the README. Many skill repositories license each folder separately, and some declare a license without shipping one.

## Evidence

New entries start at `reviewed`. `used`, `tested`, and `evaluated` require evidence files under `evals/results/`, linked from `evidence`. The [evaluation harness](docs/evaluation.md) can produce trigger and outcome records for skills and rules. Schema checks are not behavioral evidence.

## Collections

`collections/<id>.yaml` lists entry IDs that work well together. A collection should solve one recognizable need and stay small.

## Commits and pull requests

Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/): `type(scope): summary`, in the imperative mood, with the summary under about 72 characters and no trailing period. Use a body for the why when it is not obvious.

| Type | Use for |
| --- | --- |
| `feat` | A new entry, collection, script capability, or site feature |
| `fix` | A correction to an entry, validator, script, or site bug |
| `docs` | README, plan, decisions, and guides |
| `refactor` | Restructuring without behavior change |
| `test` | Tests only |
| `chore` | Tooling, dependencies, config, and generated-file refreshes |

Common scopes are `site`, `evals`, `plugin`, `catalog`, and an entry ID (for example `feat(improvement-loop): add house prompt`). Keep one logical change per commit, and commit regenerated `catalog/index.json` and `llms.txt` with the source change that caused them.

Before opening a pull request, run `bun run check`, and `bun run plugin:validate` if you touched a manifest. Record lasting design choices in `docs/decisions.md`. Vendored entries are never edited in place; re-vendor from a newer pinned revision.
