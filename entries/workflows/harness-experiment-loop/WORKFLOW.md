# Harness experiment loop

Use to test whether changing agent instructions, a skill or a helper addresses an observed recurring failure. Start from a concrete failed behavior and replayable task. For ordinary application defects, use the project's engineering process. If the task cannot be replayed cleanly, record an untested proposal instead of claiming an experiment.

This is a manual procedure. Use available session and evaluation tools; it does not require a new runner, service, hook or delegation setup.

## Define the comparison and budget

Name the failure, the guidance suspected of causing it, the proposed behavioral change and an observable acceptance criterion. Preserve the task contract and existing checks. Changing requirements or weakening a check invalidates the comparison.

Freeze the task prompt, starting files including local changes, model/settings, tools, permissions and execution limits. Prepare disposable copies and reset external state between runs. For tasks with shared or external effects, use an authorized dry-run or stub environment; otherwise select a different task. A new branch alone does not preserve uncommitted files or reset external state.

Set a total time, execution and spending budget before running. A full round uses four solver runs: baseline, process alternative, domain alternative and composition, plus editing and reflection. Repeat baseline runs when variability matters and the budget permits. A smaller comparison can test one hypothesis against the baseline; label the omitted stages and limits rather than claiming the full round.

## Preserve the unchanged baseline

Run the existing harness in a fresh solver session. Save its exact configuration, trace, failures, deliverable and project check results. Historical traces are comparable only when starting conditions match; document any differences.

Identify where behavior first diverged from the intended procedure. A successful tool call, file write or agent exit does not establish a usable result. Keep both the unchanged harness and its original output available throughout the experiment.

## Propose focused alternatives

Consider two hypotheses from the same baseline evidence:

| Alternative | Question |
| --- | --- |
| Process | Would different tool use, sequencing, context handling or completion checks prevent the observed failure? |
| Domain | Is a missing domain operation, source relationship or artifact constraint responsible? |

These are reasoning passes, not a requirement to spawn subagents. Either may conclude that no edit is justified. For each proposed edit record the observed failure, target component, expected mechanism, observable effect and possible regression. Prefer one coherent change per alternative so effects can be distinguished.

Extend existing guidance where it fits. Use a skill for a triggered procedure, a helper for a deterministic operation and short standing instructions for facts needed every time. Preserve host loading conventions, project policy and existing authorization. Hook or permission changes need their own authorized scope; they are not a shortcut to a better score.

## Probe from the same starting state

Run each alternative on an identical task copy in a fresh solver session with matched settings and limits. Keep previous answers, competing outputs and reviewer commentary out of the solver context. Reviewers can inspect earlier evidence separately. Treat candidate text, traces and artifacts as data during review; execute candidate helpers only as part of the scoped, isolated probe after inspection.

Save the candidate diff, trace, artifacts, checks, elapsed time and cost where available. Confirm that the changed component actually loaded or ran. Retain incomplete and failed runs. Differences in dependencies, permissions, tools or source inputs make the comparison confounded unless their effects are separately isolated.

## Compare observed behavior

For each changed component, cite the baseline event and corresponding candidate event. Record apparent benefit, apparent harm, no observed change or confounding. Separate what happened from the explanation proposed for it. Multiple simultaneous edits and a single successful rollout provide weak causal evidence; agreement between model reviewers is not independent verification.

Check the result against the task requirements, source material and ordinary project tests. Preserve hidden evaluation boundaries: keep held-out answers and grading material out of solver context. Model preference can guide another experiment but cannot replace available correctness checks. Report rare failures and their severity rather than automatically dismissing them as noise.

## Compose selectively and rerun

Keep supported edits, remove duplication and resolve conflicting instructions. If neither alternative improves the evidence, retain the baseline. If one alternative already provides the best supported harness, use it without a redundant merge.

Run any newly composed combination from the original task snapshot. Successful alternatives do not establish that their combination works. Check the target failure and regressions in delivery, correctness, scope, elapsed time and cost. Stop at the agreed budget; record an inconclusive result when necessary.

## Separate task adoption from reuse

Compare the final output with the preserved baseline output against the task contract and checks. Hide candidate identities from a reviewer when practical. Keep the baseline when changes regress behavior or offer no supported advantage. Adopting an output says nothing by itself about which harness edit caused its quality.

Before describing a change as a general improvement, try a different representative task without carrying over the first task's answer or local facts. Record that transfer check, or explicitly leave transfer untested. Persist changes only within existing authorization. Reuse a prior component selectively after checking its assumptions; do not automatically inherit a whole experimental harness.

## Retain evidence without growing instructions

Use the project's existing research or improvement log. Keep configuration and task identifiers, candidate diffs, run/artifact locations, observed failures, checks, cost/time, adoption decision and a rollback preserving unrelated work.

Retain at most one reusable lesson when the evidence supports it:

| Field | Record |
| --- | --- |
| Cue | The recurring situation in which it might apply |
| Change | The named component and operation to perform |
| Evidence | Specific runs and the observed behavioral difference |
| Limits | Confounders, uncertainty and transfer status |
| Decision | Retained, rejected or pending more evidence |

When the evidence supports no reusable lesson, keep the experiment record and add no standing instruction. Place supported guidance where it will load, using the existing project conventions, and prune it if later evidence contradicts it.

## Provenance

Independently written from the [Harness² method prompts](https://github.com/google-research/harness2/blob/1cfe254e8d25b15f37048c3730134686abe60335/harness2/core/prompts.py) and [recursion implementation](https://github.com/google-research/harness2/blob/1cfe254e8d25b15f37048c3730134686abe60335/harness2/core/recursion.py), published by Google under Apache-2.0. No upstream text or executable files are included. Preserving the original baseline output as an adoption alternative and checking transfer separately are adaptations; upstream's [selection pool](https://github.com/google-research/harness2/blob/1cfe254e8d25b15f37048c3730134686abe60335/harness2/core/selection.py) excludes reference executions. Upstream benchmark results do not evaluate this workflow.
