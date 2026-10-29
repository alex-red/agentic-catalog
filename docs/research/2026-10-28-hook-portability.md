# Hook portability review — October 28, 2026

**Research date / as of:** 2026-10-28, America/Edmonton. Scope: generalize the twelve new Claude hooks for Codex where usable, preserving the three existing Codex hook entries. Baseline: [admission research](2026-10-28-catalog-scout-2.md), [decision 29](../decisions.md#29-admit-twelve-opt-in-claude-code-hooks-2026-10-28), and existing source payloads. No new entries or host activations are needed.

## Result

Six additional entries now list Codex. Four share Python runtime code; two use unchanged linked upstream scripts. Nine of the catalog's fifteen hooks therefore document Codex setup. This means a source-reviewed installation route and protocol adaptation, not measured host effectiveness. Every entry remains `reviewed`.

The complete [compatibility matrix](../compatibility.md#hook-portability-review-october-28-2026) includes unsupported cases so discovery cannot silently recommend an incompatible hook. Catalog metadata and generated indexes reflect only implemented routes.

## Contract checked

Read the complete current [official Codex hook documentation](https://learn.chatgpt.com/docs/hooks) and the relevant [configuration reference](https://learn.chatgpt.com/docs/config-file/config-reference). The local installed CLI identifies itself as 0.163.0. No authenticated model run, trust bypass, personal configuration change, approval handler, or host integration was started.

Material distinctions checked against the current documentation:

- Canonical hook names remain `apply_patch` and `spawn_agent` even when their matchers accept `Edit|Write` or `Agent` aliases.
- Shell/unified-exec events use canonical `Bash` with `tool_input.command`; pre-tool deny JSON is compatible with the two selected Bash guards.
- Context can be added after compaction through `SessionStart` with source `compact`. Adding context is not removing a host identity block.
- Exit 2 can reject a submitted prompt or a pending supported tool. Post-tool feedback happens after side effects and can replace the original result; code-mode calls may reject after execution.
- Hook definitions need project/definition trust. Local sources merge and multiple matching handlers can run concurrently.
- Claude's exec-form `args` and `onFailure` configuration were not established as Codex contracts; the new examples omit them. Native TUI notification configuration is documented separately.
- No documented Codex event equivalent for `Notification`, `ConfigChange`, or the Claude mod API's `prompt.context` was found. SessionEnd is advisory rather than a place to steer the next model response.

No upstream code was re-vendored or edited. The linked source inspection and MIT terms remain those recorded at admission. There is no need to create a second wrapper plugin for the scripts using the common Bash protocol.

## Implemented routes

| Entry | Implementation | Scope and verification |
| --- | --- | --- |
| `compact-context` | Shared `restore.py`, explicit `--harness codex`, separate `.codex` note, new Codex registration | Scratch installed-project fixture verifies a nested event cwd still loads only the Codex note. Size and symlink bounds remain. |
| `post-edit-diagnostics` | Shared checker; canonical patch Add/Update/Move selection and one checker invocation | Scratch fixture resolves relative paths from nested cwd, runs from project root, reports failure, and skips deletions/non-source/outside paths. Arbitrary Bash writes are not observed. |
| `subagent-budget` | Shared SQLite reservations accept `spawn_agent`; separate `codex/` state directory | Scratch fixture checks canonical-name counting, deny shape, ordinary permission preservation and harness isolation. Existing concurrency fixture remains. No global billing guarantee. |
| `prompt-secret-check` | Same script and `prompt` field; host-specific command registration | Scratch fixture verifies Codex-shaped rejection without echoing the marker and absence of Claude-only config fields. Startup/timeout failures are disclosed. |
| `git-safety` | Direct Node invocation of unchanged pinned upstream script in Codex PreToolUse/Bash | Source-compatible common input/output shape. No new live runtime check. Existing branch-policy/cwd/regex limits and full-command local logs remain. |
| `case-insensitive-guard` | Direct Node invocation of unchanged pinned upstream script in Codex PreToolUse/Bash | Keep optional ask mode off because Codex pre-tool ask is unsupported. Dynamic-target limits and full-command local logs remain. No new live runtime check. |

The four local adapters ship complete code/config resources within their entry directories. Their Codex commands locate scripts using the Git root, require manual trust and preserve normal approvals. Context/diagnostics infer the project root from the exact installed `.codex/hooks/<id>/` script layout. They therefore intentionally document project-local Git installs rather than pretending the same command covers user-global, arbitrary symlinked, remote, or cloud layouts. No permanent logs or additional tool connections are introduced.

## Remain Claude-only

| Entry | Why copying configuration is insufficient | Next useful step |
| --- | --- | --- |
| `no-email-context` | Requires structured block removal through Claude's mod API; a prompt reminder cannot remove transmitted data | Review an actual Codex request-transformation interface if one becomes available; do not imply Codex injects the same email block |
| `desktop-attention` | No documented Notification lifecycle event | Prefer the current client's native notifications; TUI exposes `tui.notifications`, condition and method settings |
| `config-watch` | No ConfigChange event or equivalent reload veto established | A filesystem watcher is a separate workflow with different semantics, not a direct port |
| `config-guard` | Upstream protects Claude paths and CLI mutation forms; it misses Codex configuration and patch representation | Author a scoped Codex configuration policy and patch-aware adapter, including trust-file semantics |
| `protect-tests` | Upstream expects old/new strings or whole-file content; Codex sends a patch | Implement and test operation-aware deletion/rename/skip analysis rather than labeling all patch text as an Edit replacement |
| `context-hogs` | Upstream attribution expects Claude tools, the skill uses Claude paths, and SessionEnd rendering differs | Build a Codex attribution/explicit-report route with honest estimate limits; do not simply copy the plugin |

The three original hook entries already list Codex; this review does not claim their earlier synthetic tests prove actual host invocation. Their explicit path, shell-heuristic and bounded-retry limitations remain in the entries.

## Other harnesses and next steps

The useful generalization boundary is policy code plus explicit event/input/output adapters, not a universal hooks.json. Other harnesses must separately establish event timing, payload representation, decision precedence, failure handling, configuration trust and available surfaces. Adding support for one named harness does not justify `hosts: [any]`.

For a later Cursor or Gemini port, start with shared prompt checks, explicit edit diagnostics and post-compaction context; verify their current schemas and host-native overlap before implementing. The earlier [cross-agent investigation](2026-10-28-catalog-scout.md#cross-agent-comparison) supplies leads, not current support claims. No additional harness is advertised by this change.

Next integration work should run harmless, synthetic fixtures in the actual supported client, record its version and surface, exercise disabled/untrusted/error/timeout states, and verify final decisions rather than only parsing config. That evidence can be recorded separately without reclassifying scratch checks as behavioral evaluation.
