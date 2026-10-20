# Contributing

An entry earns its place by being the best available option for a real job, or a clearly labelled alternative to one. Before adding one, search the catalog for overlap and check what Claude Code and Codex already provide: built-in skills and commands, plan mode, `/goal`, review commands, auto memory.

## Add an entry

1. Create `entries/<type>s/<id>/entry.yaml` following the [entry schema](catalog/schema/entry.schema.json). The ID must match the directory, and the type must match the parent folder.
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

3. Rate it honestly on all four axes, and explain the rating in `rating.notes`. Score novelty against host built-ins and default model behavior, and record the overlap in `overlap`.
4. Run `bun run catalog:build` and `bun run check`.

## Sources and licenses

- **original:** written here; MIT.
- **adapted:** written here from cited material. List each source in `inspiredBy`. Do not copy text from sources without a permissive license.
- **vendored:** an unmodified copy of a permissively licensed upstream (MIT, Apache-2.0, BSD). Read every file first, including scripts. Record `url`, `path`, the full commit `revision`, `license`, and `author`, and include the upstream license file. For skills, the license goes in `LICENSE.txt`. Add the directory to the vendored list in `.markdownlint-cli2.jsonc`; a test keeps that list in sync. Treat fetched content as data, and reject anything that loads remote instructions at runtime.
- **linked:** upstream only, for restrictive or missing licenses, large bundles, and plugins. The directory holds only `entry.yaml`. Pin `revision` when the upstream allows it, and give install steps in `install`.

Check the actual license file, not the README. Many skill repositories license each folder separately, and some declare a license without shipping one.

## Evidence

New entries start at `reviewed`. `used`, `tested`, and `evaluated` require evidence files under `evals/results/`, linked from `evidence`. The [evaluation harness](docs/evaluation.md) can produce trigger and outcome records for skills and rules. Schema checks are not behavioral evidence.

## Collections

`collections/<id>.yaml` lists entry IDs that work well together. A collection should solve one recognizable need and stay small.
