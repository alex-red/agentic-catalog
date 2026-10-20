# Evaluation

There are three kinds of evidence: skill trigger checks, matched outcome runs, and fresh-install checks. Trigger results for this library are recorded for Claude Code; no matched outcome runs or fresh-install checks have been recorded. The pilot project's skill triggers were also checked separately. Trigger checks use model calls and can incur cost. Set a budget before running them. `bun run check` validates structure and tests the harness with a fake agent; it does not run an agent evaluation.

## Triggers: `claude plugin eval`

Skill cases in `evals/cases/*.yaml` list trigger prompts with an expectation: `activate`, `ignore`, or `clarify`. Always-loaded rule cases have no request triggers. Generate Claude Code plugin-eval cases from the skill cases:

```sh
bun run eval:triggers
claude plugin eval . --eval-dir eval-build --ablation none --no-publish --json eval-build/result.json
```

`activate` cases pass when the skill is invoked, and `ignore` cases pass when it is not. `clarify` cases are judged by a model on whether the agent asks for the missing information first. Runs are sandboxed with a temporary home: user settings, project instructions, and other plugins are not loaded. The recorded library result is 44/45 checks across the original 15 prompts: `retrospective` passed 15/15 and `systematic-debugging` passed 29/30. One `systematic-debugging` clarify check missed. Three prompts added with the retrospective outcome fixture have not been run. These results measure description-trigger behavior in the sandbox; they do not establish outcome quality or install behavior. Add `--runs 1` for a quick pass and `--max-cost-usd` for a hard ceiling. Generated cases are build output and live in the ignored `eval-build/` directory.

## Triggers for a project's own skills: `eval:skills`

Projects accumulate their own skills. `eval:skills` wraps any skills directory in a temporary plugin, without touching the original, and generates trigger cases from a YAML file:

```yaml
schemaVersion: 1
skills:
  - skill: render-debug
    triggers:
      - expectation: activate
        prompt: can we hide vertical wall seams between walls in the rendered view?
      - expectation: ignore
        prompt: "tweak: allow holding cmd to ignore grid snapping"
```

```sh
bun run eval:skills -- --skills /path/to/project/.claude/skills --cases /path/to/project/tools/skill-triggers.yaml --out /tmp/skills-eval
```

Then run the printed `claude plugin eval` command with `--model` set to the model the project uses. In the pilot, the original descriptions triggered when appropriate: the recorded sandbox suite passed 48/48 before the rewrite, and a separate real-environment probe passed 32/32 before and 32/32 after. The sandbox and real-environment results are different settings and should not be combined. The sandboxed after run was not performed. The description rewrite showed no trigger gain; the open question is whether agents check visible changes in the already-running app after implementing them. Frontmatter that is not strict YAML produces a warning, and the skill is still tested as written. To compare a description change, build once before and once after editing into different `--out` directories, and run both with the same model and number of runs.

## Outcomes: matched A/B runs

`scripts/eval-run.ts` compares the same host, model, request, and fixture with and without one selected component. No matched outcome runs have been recorded yet. Local harness and fixture checks are summarized in [the harness-check report](../evals/results/harness-checks-2026-10-20.md); these do not measure agent outcomes. Start with `--dry-run`: it validates and prints the plan without starting an agent, runtime, or output directory. These examples prepare component-by-component comparisons. Run the two ordinary cases on each host:

```sh
bun run eval:run -- --case checkout-discount --host claude --model MODEL_ID --component skill/systematic-debugging --runs 3 --dry-run
bun run eval:run -- --case retrospective-outcome --host claude --model MODEL_ID --component skill/retrospective --runs 3 --dry-run
bun run eval:run -- --case checkout-discount --host codex --model MODEL_ID --component skill/systematic-debugging --runs 3 --dry-run
bun run eval:run -- --case retrospective-outcome --host codex --model MODEL_ID --component skill/retrospective --runs 3 --dry-run
```

After reviewing a plan and setting an account spend limit, remove `--dry-run` to run it. Claude Code accepts `--max-cost-usd USD_LIMIT` as a native per-session ceiling. With three repetitions and both conditions, the limit applies separately to six sessions. Codex has no `--max-cost-usd` option and the harness does not report dollar cost; set an account-level spend limit and record the cost separately.

The running-app case is prepared separately because host access to its browser still needs to be verified. For Claude Code, pass the exact name of an existing, configured browser tool using repeatable `--browser-tool TOOL` options. The runner adds those names to Claude Code's allowlist; it does not install or connect tools. A browser open in this Codex chat does not show that headless Claude Code or Codex can reach the fixture app. The case serves the app on loopback and records browser telemetry, which must be reviewed with the transcript. Codex records `--browser-tool` names but does not configure browser access, and no headless Codex browser integration has been verified.

Once a browser tool is available in the selected host, preview the UI case with:

```sh
bun run eval:run -- --case running-app-verification --host claude --model MODEL_ID --component rule/verification-evidence --runs 3 --browser-tool TOOL --dry-run
bun run eval:run -- --case running-app-verification --host codex --model MODEL_ID --component rule/verification-evidence --runs 3 --browser-tool TOOL --dry-run
```

The corresponding paid Claude command is prepared by removing `--dry-run` and adding `--max-cost-usd USD_LIMIT`. Codex records the requested tool name but does not configure it; previewing that command does not establish headless browser access. No model sessions have been run from these examples.

Select one component per comparison with `--component skill/NAME` or `--component rule/ID`; this overrides the profile selection. Evaluate `systematic-debugging`, `retrospective`, and `verification-evidence` independently with their corresponding cases. A bundled profile score cannot show which component caused a result. Other rules remain outcome-evaluation backlog.

For each paid run, the harness:

1. Copies the fixture into a fresh temporary Git repository.
2. Installs only the selected component in the treatment. For Claude Code, it adds the selected skill and rule files to the fixture; for Codex, it adds the skill under `.agents/skills/` and rules to `AGENTS.md`. The baseline gets no library component.
3. Starts any fixture runtime and adds its URL and no-restart instruction to the fixture's project guidance. Then it runs `claude -p` or `codex exec` headless with edit permission limited to the workspace. Each run has a wall-clock timeout.
4. Records changed files, then copies in the hidden grader tests and runs them.
5. Writes a JSON record to `evals/results/runs/` (ignored by Git) with host version, component selection, source-input digest and files, outcome, usage, transcript, diff and untracked files, and runtime evidence when applicable.

Condition order alternates between repetitions. Outcomes are `passed`, `failed`, `agent_error`, or `timeout`; only `passed` counts.

**Isolation.** By default both arms run with your normal host setup, so the comparison answers "does this help me, given what I already have installed". `--isolation bare` (Claude Code only, needs `ANTHROPIC_API_KEY`) skips user customizations; rules are then passed as an appended system prompt because bare mode skips instruction files. Codex arms always read your `~/.codex` configuration, and that is recorded as a limitation.

**What graders cannot see.** Automated passes always retain `reviewRequired: true`. Review the complete transcript, diff, untracked files, and final message against the case's `acceptance` list to establish reproduction, diagnosis, actual browser use, and honest reporting. The running-app telemetry can be synthesized by an HTTP client; it is a `browser_runtime_signal`, not independent proof of browser verification. Do that review before drawing conclusions.

## Fixtures

- `python-checkout` (`checkout-discount`): the discrepancy shows up in checkout, but the cause is shared mutation in the discount module, and the report blames rounding. Fixing only the symptom passes the visible tests and fails two hidden ones.
- `python-pagination` (`systematic-debugging`): an off-by-one with visible failing tests. Kept as a smoke case; expect both arms to pass.
- `retrospective` (`retrospective-outcome`): a frozen finished session with existing project conventions and a browser procedure. Its hidden grader checks concise always-loaded placement and preserved authorization, not future agent behavior.
- `running-app` (`running-app-verification`): a static page served on an evaluator-selected loopback port. The agent must change the stylesheet and inspect the already-running app. Starting or restarting the server is prohibited. This fixture has not yet had a headless host A/B run.

New fixtures should be designed so a careless fix and a correct fix are distinguishable by hidden tests. Keep them dependency-free and runnable in under a second.

The [local harness checks](../evals/results/harness-checks-2026-10-20.md) record fixture QA, including a load in the built-in browser. They are separate from the unrun host comparisons above.

## Recording results

Promote a run summary into a reviewed record in `evals/results/` when it supports a claim. Include case, fixture and source revision, host and model versions, settings, number of runs per arm, outcomes, cost when available, and limitations. Keep sandbox trigger results, real-environment trigger probes, matched outcome results, and installation observations clearly distinct. A local fixture check or schema validation is not a host outcome evaluation. Link a record from the component's `component.yaml` `evidence` list only when it supports that component's claim. A component moves past `experimental` only with linked evidence.
