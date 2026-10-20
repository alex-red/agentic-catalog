# Manual installation

The scaffold provides one skill and a `debugging` pilot profile. Installation is project-local. It does not change global agent settings, activate tools, or install a runtime.

## Select and copy

Choose an exact source revision once this repository has version control or a release tag. Until then, record a local snapshot as unreleased. Inspect the [profile](../profiles/debugging.yaml) and selected content before copying.

For Codex, use a project `.agents/skills/` directory. For Claude Code, use `.claude/skills/`. These are documented discovery locations; actual discovery is still untested for this scaffold. [Codex skills](https://learn.chatgpt.com/docs/build-skills), [Claude Code skills](https://code.claude.com/docs/en/skills)

Adapt the source, project, and host directory below. Run once for each host you deliberately select:

```sh
ar_source=/absolute/path/to/agentic-rules
ar_project=/absolute/path/to/your-project
ar_host_directory=.agents
ar_destination="$ar_project/$ar_host_directory/skills/ar-systematic-debugging"

if [ -e "$ar_destination" ] || [ -L "$ar_destination" ]; then
  printf 'Already exists; inspect before updating: %s\n' "$ar_destination" >&2
else
  mkdir -p "$ar_project/$ar_host_directory/skills"
  cp -R "$ar_source/skills/ar-systematic-debugging" "$ar_destination"
fi
```

For Claude Code, change `ar_host_directory` to `.claude`. Copy the whole skill, including its references and license. `component.yaml` describes library provenance and evaluation paths; those repository-side paths are not runtime dependencies.

## Merge the rules

The three rule modules are plain Markdown source. Copy their bodies, omitting YAML frontmatter, into the project's existing `AGENTS.md`. An optional read-only preview prints the selected bodies as one marked block:

```sh
bun run rules:preview -- debugging YOUR_SOURCE_REVISION
```

Review and paste that block into the existing instructions. The preview does not write to your project. Replace `YOUR_SOURCE_REVISION` with the actual source revision; before version control exists, use `local-unreleased` and retain the source snapshot. Use [the bootstrap template](../templates/AGENTS.md.tmpl) only when there is no existing instruction file, and replace its project-specific prompts with real facts.

Resolve contradictions with project-owned guidance explicitly. Keep always-needed instructions in the file itself rather than depending on a link to load them.

Claude Code's direct `AGENTS.md` loading depends on version, settings, and existing instruction files. When necessary, add an `@AGENTS.md` import to the project's existing `CLAUDE.md`, preserving its content. Confirm the loaded instructions in a fresh session. [Claude Code project instructions](https://code.claude.com/docs/en/memory)

Record the source revision, installed paths, selected profile, and local modifications in the project's normal development records.

## Check the installation

1. Start a fresh host session in the project.
2. Confirm the intended project instructions are loaded.
3. Confirm `ar-systematic-debugging` is available in the skill selector.
4. Explicitly invoke it on a disposable reproduction using the host's skill picker.
5. Try a plain-language debugging request and check whether it is selected appropriately.
6. Record host version, model, operating system, session surface, and observed result. A directory copy alone is not a host discovery test.

Use the [compatibility matrix](compatibility.md) to record clean-repository, existing-instructions, nested-directory, and worktree cases.

## Update or remove

Compare the installed directory against the selected new source before an update:

```sh
diff -ru "$ar_destination" "$ar_source/skills/ar-systematic-debugging"
```

Review changes and retain local edits. Do not run the initial copy over an existing installation. To remove the selection, remove only the copied skill directory and its marked rule block after checking for local changes. Preserve all project-owned instructions and other installed skills.
