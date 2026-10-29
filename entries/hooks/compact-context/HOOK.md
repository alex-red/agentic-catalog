# Restore a small compaction note

Use this only for details demonstrably lost after compaction. Existing `CLAUDE.md`, rules, and auto memory should remain the primary project instructions.

## Claude Code install

Requires Python 3.9+. Copy [restore.py](restore.py) to `.claude/hooks/compact-context/restore.py`. Merge [settings.example.json](settings.example.json) into `.claude/settings.json`, preserving existing hooks. It runs only on `SessionStart` with source `compact`.

Maintain `.claude/compact-context.md` yourself using the project's normal authorization and document conventions. Keep it under 6000 UTF-8 bytes. Suitable content includes a short pointer to an active plan, an unresolved constraint, and a reminder to verify current files. Do not duplicate whole instruction files, transcripts, or credentials. A missing note is a no-op, so no placeholder note is installed.

The script reads that one note, rejects symlinks outside `CLAUDE_PROJECT_DIR`, and returns it as model-visible `additionalContext`. It performs no writes, shell calls, remote requests, or automatic memory extraction. Notes that are too large or malformed produce only a local generic diagnostic. Re-injection cannot guarantee fresh task state; revise or delete stale notes.

Validate through `/hooks` and a scratch session's compaction. Disable by removing this handler; remove the note only if it is no longer needed.

## Codex install

Copy the same [restore.py](restore.py) to `.codex/hooks/compact-context/restore.py` and merge [codex-hooks.example.json](codex-hooks.example.json) into `.codex/hooks.json`. Review and trust the project and exact definition through `/hooks`. The registration uses `SessionStart` with `source: compact`, whose context reaches the next model request after compaction. Do not register a duplicate `PostCompact` handler.

The Codex command adds `--harness codex`. This selects `.codex/compact-context.md` and infers the project root from the script's installed location, even when the event cwd is a subdirectory. It does not load the Claude note. Keep this exact project-local layout; user-wide installs and symlinked hook code outside that layout are not supported by this adapter. The same size, path-boundary and freshness rules apply. Codex receives the note as extra developer context; this cannot edit or remove pre-existing host instructions.

The example resolves the script from the Git root and therefore requires a local Git project with Python 3.9+. Remove the handler to disable it. Source and scratch-payload checks do not prove invocation in every Codex client or cloud mode. See the [official contract](https://learn.chatgpt.com/docs/hooks#sessionstart).
