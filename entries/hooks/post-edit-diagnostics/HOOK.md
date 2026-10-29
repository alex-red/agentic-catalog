# Run fast diagnostics after source edits

Use this for an already installed, read-only checker that finishes quickly. Formatting is covered by `format-after-edit`; completion checks are covered by `stop-gate-checks`.

## Claude Code install

Requires Python 3.9+ and the project's checker. Copy [check.py](check.py) and [command.json](command.json) together to `.claude/hooks/post-edit-diagnostics/`. Set `command.json` to the project's actual argument array; the supplied default is `bun run typecheck`. A Python example is `["mypy", "src"]`. Select one appropriate checker, not every tool in the examples. Do not install dependencies or start servers from this hook. `AGENTIC_DIAGNOSTICS_ARGV`, if set in the host environment, overrides the file with a JSON array.

Merge [settings.example.json](settings.example.json) into `.claude/settings.json`. It watches `Edit|Write` to `.ts`, `.tsx`, `.js`, `.jsx`, `.py`, `.go`, and `.rs` files resolved inside the project. Adjust the extension set if your project needs something else. File names and tool text never become shell code: the subprocess receives only the configured argument array, from the project root.

The check runs synchronously with a 20-second deadline. On failure, the last 6000 output bytes become model-visible feedback through exit 2. **The edit has already happened.** This does not block or roll back the edit and is not a replacement for a final verification run. A failed launch also reports generic feedback. Avoid emitting credentials from the selected checker. Temporary checker output is discarded after the run; the hook creates no permanent log.

Try a harmless type error in a scratch checkout and confirm feedback reaches Claude. Disable by removing the handler. Avoid running the same expensive suite after every edit and again at Stop; a heavyweight project should use its existing watch process or completion gate.

## Codex install

Copy [check.py](check.py) and the configured [command.json](command.json) together to `.codex/hooks/post-edit-diagnostics/`. Merge [codex-hooks.example.json](codex-hooks.example.json) into `.codex/hooks.json` and trust the project/definition in `/hooks`. Requires a local Git project and Python 3.9+.

The explicit `--harness codex` adapter accepts the canonical `apply_patch` name and selects Add/Update/Move paths from `tool_input.command`. Matching an `Edit` alias alone does not change that payload. Patch paths resolve against event `cwd`; the checker runs once per eligible patch from the root inferred from this project's installed script. Deletion-only patches, non-source paths, and paths outside the project do not trigger the checker. Arbitrary shell writes and other edit tools remain outside coverage.

The shared deadline and bounded feedback apply. In Codex, exit 2 can replace the original tool result with feedback; code-mode callers can see the tool promise reject **after the edit has occurred**. There is no rollback. Missing tools, script startup failure or a host timeout must not be treated as proof that verification passed. No Claude-only `args` or `onFailure` field is copied into the Codex example. See the [official event contract](https://learn.chatgpt.com/docs/hooks#posttooluse).
