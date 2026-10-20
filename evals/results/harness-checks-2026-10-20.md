# Harness checks, October 20, 2026

These are local mechanical checks of evaluation tooling and fixtures. They are not matched agent outcomes, fresh-session installation results, or evidence for promoting a component. No paid evaluation sessions were started.

Source: the working tree based on `5b2edf6`, including the fixes and fixtures from the repository review. The local browser probe used a temporary fixture copy. Future version 2 raw outcome records retain their exact source inputs and digest.

Validation completed: `bun run check` passed all 59 tests, typechecking, Markdown lint, structural validation, and catalog freshness. The catalog was regenerated from source. Strict validation passed for both the Claude marketplace and direct plugin manifest. Local server integration tests required loopback permission. All six documented comparison previews passed with `--dry-run`; none started an agent or runtime or wrote outcome results.

## Grading regressions

The review reproduced a false pass: a fake agent made no pagination changes, two visible tests failed, and the old runner still returned `passed` because the case had no grader. Outcomes now require a grader. Regression coverage checks unchanged pagination fails, its offset correction passes, and missing graders and agent errors never count as success.

Retrospective fixture checks distinguish a concise instruction in the existing `AGENTS.md` from no change or a procedure placed only in a new skill. Weakening the existing server-start authorization fails the grader. These checks establish placement and preservation, not the future behavior of an agent.

## Built-in browser probe

An evaluator-owned Python server served a temporary copy of the running-app fixture. After its stylesheet changed to `#e9f5ff`, the Codex built-in browser opened the existing app URL through `open_in_codex`. The page emitted a visible `page_ready` event at the final source revision with computed background `rgb(233, 245, 255)`. The grader passed both its product check and its browser runtime signal. The server was stopped afterward.

A source edit alone failed the browser signal check. Static HTTP reads created no page event. Synthetic events are deliberately tested as grader inputs; they can also produce a signal, so the grader alone does not establish browser use. This local probe was reviewed against the actual built-in-browser action. No screenshot inspection or headless CLI browser compatibility was established.

## Remaining work

- Run and review matched component comparisons on each host, with cost recorded.
- Establish access to the built-in browser in each evaluation host; this chat's browser access does not prove a headless CLI can use it.
- Add separate outcome coverage for the two generic rules before making keep/cut claims about them.
- Perform fresh-session marketplace, copy, and rule-load checks on each host, followed by the two-week pilot.
