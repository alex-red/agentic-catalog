# Plan

Updated: October 20, 2026
Status: experimental. Two skills, three rules, plugin packaging, and an evaluation harness exist. Claude Code trigger results are recorded; matched outcome evaluations and fresh-session installation checks remain pending.

Decisions and their reasons live in [docs/decisions.md](docs/decisions.md). The previous long-form review is in Git history (`5b2edf6`).

## Product

Agentic Rules is a small set of agent guidance that has been shown to help in real projects. A component is kept only when it targets an observed failure and beats both the host's default behavior and the host's built-in skills in a matched comparison. Generic best-practice text that current models already follow is not shipped.

Targets: Claude Code and Codex. Distribution: a plugin marketplace for both hosts, with copying skill directories as the fallback. Rules are installed manually because neither host's plugins can add project instructions.

## Inventory

"Native coverage" records what the hosts already provide. A planned component that duplicates a built-in is dropped unless an evaluation shows a clear gain over it.

| Component | Status | Native coverage (Oct 2026) | Decision |
| --- | --- | --- | --- |
| `systematic-debugging` skill | Experimental | No built-in debugging skill in either host core; optional third-party plugins exist | Keep; evaluate first |
| `scope-and-authority` rule | Experimental | Largely restated by both hosts' system prompts | Keep only if the A/B run shows an effect |
| `focused-changes` rule | Experimental | Partly covered by host prompts | Same |
| `verification-evidence` rule | Experimental; rewritten for the pilot's gap (checking in an already-running app) | Honest reporting already covered; checking a running app is not | Evaluate with a UI fixture |
| `plan-implementation` | Dropped | Plan mode in both hosts | Revisit only from a pilot failure |
| `implement-change` | Dropped | Default agent behavior | — |
| `verify-changes` | Folded into the `verification-evidence` rule | — | — |
| `code-review` | Dropped | Claude Code `/code-review`, `/security-review`; Codex `/review` | Revisit only with a project-specific review checklist |
| `session-handoff` | Backlog | Compaction and session resume in both hosts | Candidate if the pilot shows lost context across sessions |
| `retrospective` skill | Experimental (pilot finding 4); triggers 15/15 | None; users paste the prompt by hand | Use in the pilot's next retrospective and review the output |
| Trigger evals for project skills | Done: `bun run eval:skills` | `/skill-doctor` reports usage but does not test descriptions | Pilot skills: 48/48 sandboxed, 32/32 live ([results](evals/results/triggers-2026-10-20.md)) |

New components come from the pilot, not from this table.

## Next steps

1. ~~**Pilot project.**~~ `cha-floor-planner` (selected 2026-10-20).
2. ~~**Mine failures.**~~ Done: [pilot findings](evals/results/pilot-cha-floor-planner-2026-10.md). Main results: visible changes are handed back unverified, shared working trees make commits expensive, and the user repeatedly pastes a retrospective prompt. Corrected trigger analysis found the original skill descriptions worked on matching requests; low invocation counts alone were not evidence of bad descriptions.
3. **Baseline the current content.** Historical trigger results recorded ([2026-10-20](evals/results/triggers-2026-10-20.md)): retrospective 15/15; systematic debugging 29/30. Grading is fixed, component selection and run evidence are implemented, and the checkout, retrospective, and running-app fixtures are ready. Three new retrospective trigger prompts remain unrun. [Comparison commands](docs/evaluation.md#outcomes-matched-ab-runs) were checked in dry-run mode on both hosts. **User direction (2026-10-20): prepare commands only; do not start paid evaluations.** Next: establish built-in-browser access in each evaluation host, then run and review the comparisons when authorized.
4. **Write targeted content.** Partly done: the retrospective skill and revised verification rule address recorded pilot failures, with outcome fixtures and graders now in place. Their benefit remains unmeasured. The two generic rules still need separate outcome coverage before any component-level keep/cut decision.
5. **Install in the pilot** through the marketplace and use it for two weeks. Record benefit and friction in `evals/results/`.
6. **Keep or cut.** Delete components with no measured benefit. Promote to `candidate` only with linked evidence.
7. **Publish.** Add a Git remote, fill in the marketplace install line in the README, and tag `v0.1.0` once steps 3–6 have recorded results.

## Current implementation work (2026-10-20)

- [x] Require explicit outcome grading; an unchanged failing pagination fixture now fails.
- [x] Support comparisons of one skill or rule, with the installed treatment recorded.
- [x] Add a running-app fixture that separates product behavior from browser runtime telemetry; actual browser use still requires transcript review.
- [x] Preserve source inputs and digest, host version, selection, settings, full agent output, diff, untracked contents, and runtime evidence.
- [x] Reconcile evaluation and compatibility status with the recorded trigger results.
- [x] Prepare commands for both hosts and record remaining prerequisites; no paid runs.

Validation: `bun run check` passed (59 tests; local server tests need loopback permission), the catalog was regenerated, and strict validation passed for both the marketplace and plugin manifests. The built-in browser loaded the edited UI fixture and produced the expected final-revision runtime signal. See [local harness checks](evals/results/harness-checks-2026-10-20.md); this is fixture QA, not component outcome evidence.

## Release gate for v0.1

- `bun run check` and `bun run plugin:validate` pass.
- Each shipped skill has trigger results; always-loaded rules have load checks. Each shipped component has at least three matched outcome runs per host, with cost recorded and the component's contribution isolated.
- Installation was checked in a fresh session for each host: marketplace install, copy fallback, and rules.
- Known limitations are written down. Experimental results are not described as proof.

## Out of scope until evidence asks for it

A custom installer, autonomous runners, hooks, MCP servers, a hosted catalog or wiki, per-component versions, and hosts beyond Claude Code and Codex.
