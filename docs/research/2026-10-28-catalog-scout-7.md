# Harness²: distilling a harness experiment workflow

## Scope and baseline

**As of:** 2026-10-28. **Researched:** 2026-10-28, America/Edmonton. Focused live review of [google-research/harness2](https://github.com/google-research/harness2) and its paper, answering whether the method can become a useful catalog workflow or skill.

**Recommendation:** develop one portable **Harness experiment loop** workflow, with proposed ID `harness-experiment-loop`. Its distinct job is to test changes to agent guidance against an unchanged harness on replayable tasks. Start with a workflow; consider an explicitly invoked skill only after a real trial establishes the runner and evidence requirements. A concrete draft is below. No entry has been admitted or installed.

Baseline: [PLAN.md](../../PLAN.md), [contribution rules](../../CONTRIBUTING.md), [decisions 8, 11, 19, 26 and 30](../decisions.md), [compatibility review](../compatibility.md), the [latest scout queue](2026-10-28-catalog-scout-6.md), and the actual `improvement-loop`, `retrospective`, `self-improvement-loop`, and `ralph-loop` payloads. Source entries take precedence over the generated index. Existing unrelated working-tree changes were present before this research and were left intact.

## Coverage and observations

Reviewed repository HEAD: **`1cfe254e8d25b15f37048c3730134686abe60335`**, downloaded into a temporary directory for reading. This is a snapshot pin, not a claim about the last commit affecting each file. No upstream code, installer, demo, benchmark, or model-backed evaluation was executed.

Primary sources:

- [README at the reviewed commit](https://github.com/google-research/harness2/blob/1cfe254e8d25b15f37048c3730134686abe60335/README.md).
- [Stage prompts](https://github.com/google-research/harness2/blob/1cfe254e8d25b15f37048c3730134686abe60335/harness2/core/prompts.py), especially proposal/composition and experience reflection.
- [Recursion implementation](https://github.com/google-research/harness2/blob/1cfe254e8d25b15f37048c3730134686abe60335/harness2/core/recursion.py), [selection](https://github.com/google-research/harness2/blob/1cfe254e8d25b15f37048c3730134686abe60335/harness2/core/selection.py), [schedule](https://github.com/google-research/harness2/blob/1cfe254e8d25b15f37048c3730134686abe60335/harness2/core/schedule.py), [library](https://github.com/google-research/harness2/blob/1cfe254e8d25b15f37048c3730134686abe60335/harness2/core/library.py), and [budget ledger](https://github.com/google-research/harness2/blob/1cfe254e8d25b15f37048c3730134686abe60335/harness2/core/ledger.py).
- [Experiment guide](https://github.com/google-research/harness2/blob/1cfe254e8d25b15f37048c3730134686abe60335/docs/EXPERIMENTS.md), [Apache-2.0 license](https://github.com/google-research/harness2/blob/1cfe254e8d25b15f37048c3730134686abe60335/LICENSE), and [third-party inventory](https://github.com/google-research/harness2/blob/1cfe254e8d25b15f37048c3730134686abe60335/third_party/README.md).
- [Paper v1](https://arxiv.org/html/2610.14224v1), method §§2.1–2.3, experimental setup, baseline descriptions, and limitations.

**Inspection boundary:** read the experiment guide, license, third-party inventory, package manifest, method interface (`core/spec.py`), library and ledger. Read proposal/composition/reflection prompts and host-surface text selectively; parallel/sequential recursion and rollout functions; selection-pool construction, rendering, selection, reflection and parsing; schedule's adoption/library call path; and the first 130 lines of the Codex adapter. Remaining prompt variants, full proposer/context/tree validators, benchmark adapters, launchers, installation/setup scripts, tests and third-party implementation closure were not fully reviewed. This supports an independent procedure proposal, not a claim that the runtime is audited or ready to vendor.

GitHub's primary page displayed approximately **21.0k stars and 2.1k forks** when checked on October 28. These rounded repository attention figures do not establish adoption or efficacy. Third-party counters were discovery leads only; no installation metric or comparable growth series was established. Search was confined to the named repository, its paper and local catalog overlap; this was not a broad ecosystem census.

## What the method contributes

Harness² changes the files around a fixed model. A task-level round creates two hypotheses: one about execution procedure and one about domain knowledge. Both are run on the same task, then a composer uses their execution differences to create another harness and run it. A separate library retains supported experience for future refinement. These are the paper's method claims; behavioral contrasts cannot establish correctness or transfer by themselves. [Method and limitations](https://arxiv.org/html/2610.14224v1)

The code supplies several useful details for a distillation:

1. **Proposals must name an observed failure.** Link each edit to a particular trajectory event. Fixing an imagined weakness or restating existing instructions adds cost without evidence.
2. **Separate process from expertise.** One proposal addresses tool use, repetition or completion; another addresses the domain operation or artifact contract. These are two reasoning passes and do not require two live subagents.
3. **Probe executable behavior.** Compare what the agent actually did and produced, rather than asking whether the new prompt sounds better.
4. **Compose selectively and execute again.** A union of attractive instructions is not a tested composition. Preserve, revise or discard edits with explicit reasons.
5. **Reflect on edits, including rejected candidates.** The experience prompt distinguishes apparent benefit, harm, no observed effect and confounding. Adoption of a deliverable does not show that every edit in its harness helped.
6. **Decline unsupported memory.** The reflector can emit no durable lesson; the library requires a cue, lesson and supporting evidence before retaining the harness.
7. **Separate local facts from reusable procedure.** Facts verified for this workspace may help the current task but must be rechecked before reuse elsewhere.

The reflection record is especially valuable: a reusable lesson needs an applicability cue, an operation on a named component, evidence and uncertainty. This is stronger than accumulating maxims after a successful run. These findings come from the pinned code linked above, not an outcome evaluation here.

## Recommend adding

### 1. Harness experiment loop — independently written workflow

**Identity:** proposed local artifact `entries/workflows/harness-experiment-loop/WORKFLOW.md`; proposed title **Harness experiment loop**. This path is a proposal, not an existing entry. Inspiration is the pinned method implementation above. Proposed source kind: `adapted`, with immutable `inspiredBy` references. Write original prose and preserve applicable Apache notices/license if upstream expression or code is reused; do not treat the repository's MIT default as relicensing copied Google material.

**Job:** decide whether changing an existing skill, rule, instruction or helper addresses a recurring agent failure before making it persistent. Most useful for reusable procedures with replayable inputs and observable failures. Low value for a one-off fix, changing requirements, or tasks whose side effects cannot be isolated.

**Qualitative fit:** high usefulness for guidance maintainers, narrower usefulness for ordinary feature work; strong evidence discipline in the inspected reflection design; portable as a manual procedure; meaningful novelty in controlled harness comparisons and selective composition. Costs and runner availability limit convenience. These are provisional judgments, not catalog ratings.

**Dependencies:** a host that can start fresh solver sessions, an isolated repeatable task snapshot, existing project checks, and storage for traces/diffs/artifacts. Manual execution is sufficient; no mandatory new service, hook, plugin, dependency, library directory or delegation topology. Use consumer project conventions for paths and authorization.

**Overlap:** `retrospective` identifies lessons and where they belong; `improvement-loop` implements process fixes; `self-improvement-loop` places and prunes guidance and already suggests matched comparisons. The additional value here is the detailed comparison procedure: fixed task inputs, separate candidate hypotheses, execution contrasts, composed replay, and a baseline retention decision. `ralph-loop` repeats product work toward completion rather than comparing harness changes. `verification-before-completion` and the verification rule establish checks but do not isolate the effect of a guidance change. Installed host capabilities provide skills, tools and session management; they do not establish a candidate's benefit merely by making it runnable. The workflow must use the actual host's supported surfaces.

**Disposition:** recommend authoring this one compact workflow. Do not add a separate generic self-improvement entry or bundle the full research runtime. Admission would start at `reviewed`; repository checks would not raise that level.

### Concrete workflow draft

This draft is an independently written adaptation for review. The baseline retention gate, conservative run policy and later transfer check are our proposed design choices, rather than a literal reproduction of the release.

#### 1. Establish the experiment

Name one failure and the guidance suspected of causing it. Record a concrete observation from a real run. State the intended behavioral change and how it will be observed. If the change belongs in application code rather than the agent's procedure, handle it as ordinary engineering work.

Freeze the task prompt, source files, starting code, model/settings, available tools, permissions and time/token limits. Preserve local changes in the snapshot. Use disposable copies and reset external state between runs. If an action sends messages, purchases, deploys or changes shared state, use an authorized dry-run/stub environment; otherwise choose a different replay task.

Set a total budget before starting. A full single round is four solver runs: baseline, process candidate, domain candidate, composition. Editing and reflection consume additional budget. Use additional baseline repetitions when variability matters and budget allows. If no clean rerun is possible, record the proposal as untested rather than simulating execution evidence.

#### 2. Preserve the baseline

Run the unchanged harness in a fresh solver session. Retain its configuration, trace, tool failures, deliverable and ordinary project check results. Existing traces are reusable only when their starting conditions match; label historical comparisons when they do not.

State exactly where behavior first went wrong. A successful write or successful agent exit does not prove a usable result. Keep the unchanged harness and its output available throughout the experiment.

#### 3. Propose two focused alternatives

Draft a process alternative and a domain alternative from the same baseline evidence. Run these reasoning passes serially unless delegation is already authorized and useful. Either pass may conclude that no change is justified.

For each edit, record: observed failure, proposed mechanism, file/component, expected observable effect and possible regression. Prefer one coherent change per candidate. Use an existing skill or script when it fits; keep universal instructions short. Preserve the user's task contract, project conventions and permission boundaries. Do not weaken checks or expand tool authority to manufacture a better run.

#### 4. Probe each alternative

Run each changed harness from the identical initial task snapshot in a fresh solver session. The solver must not receive previous answers, competing deliverables or reviewer commentary. Keep previous trajectories available to the experiment reviewer, separate from the solver's task context.

Record candidate diffs, traces, outputs, checks, elapsed time and cost where available. Confirm that the changed component actually loaded or ran. Keep failed and incomplete executions in the record. If permissions, dependencies or external inputs differ, mark the comparison confounded.

#### 5. Compare the mechanism

For each changed component, cite the baseline event and corresponding candidate event. Record the observed difference as apparent benefit, apparent harm, no observed change or confounded. A single lucky completion, multiple simultaneous edits or a polished final message is weak causal evidence. Agreement between model reviewers is not independent verification.

Use the task's normal tests, requirements and source checks wherever available. Preserve any hidden evaluation boundary: do not expose held-out answers or grading material to the solver. A model preference can guide exploration but cannot replace available correctness checks.

#### 6. Compose and rerun

Keep only supported changes; resolve contradictions and duplication. If neither alternative provides convincing evidence, retain the baseline. If a candidate already supplies the best supported harness, adopt it without a redundant merge.

When composing a new combination, execute it from the same initial snapshot. Candidate successes do not validate their combination. Recheck both the target failure and regressions in delivery, correctness, scope, time and cost.

#### 7. Decide separately for this task and future tasks

Compare the final output with the preserved baseline using the task contract and available checks. Hide candidate identities from a reviewer when practical. Keep the baseline when the change regresses behavior or offers no supported advantage. Report an inconclusive result when evidence is insufficient.

A change can be useful for this task while remaining unproven for reuse. Before calling it a general improvement, try a different representative task without carrying over this task's answer or local facts. Record the transfer check or explicitly leave transfer untested. Persist changes only within existing authorization; an experiment does not itself authorize installing hooks, plugins, services or broader permissions.

#### 8. Retain a small evidence record

Use the project's existing research or improvement log. Record task/configuration identifiers, candidate diffs, run/artifact links, observations, failures, cost/time, decision and rollback. For at most one reusable lesson, record:

| Field | Content |
| --- | --- |
| Cue | The recurring situation in which the lesson might apply |
| Component and operation | What to change and how to check it |
| Evidence | Specific runs and the behavioral difference |
| Limits | Confounders, uncertainty and untested transfer |
| Status | Retained, rejected or pending more evidence |

If there is no supported reusable lesson, keep the experiment result and add no standing instruction. Do not automatically install an entire earlier harness into the next task.

## Review next

### An explicitly invoked skill wrapper

A future skill could trigger on “compare these two skills,” “test whether this instruction helps,” or “improve our agent harness from these failed runs.” It should stay quiet for ordinary bug fixing, routine verification, session retrospectives and requests to build an agent framework.

The wrapper would collect experiment inputs, prepare candidate diffs, request/run fresh sessions through existing host capabilities, and produce the evidence record. Before authoring it, settle how the target host provides clean task copies and solver context, how budgets are enforced, and how existing user authorization covers the runs. A skill that merely says “launch multiple agents and compare them” would omit the hard part.

**Next inspection/trial:** use one existing fixture with an observable procedural failure and compare the unchanged guidance, one focused edit and a separate transfer task. Record full traces and costs. Add the second hypothesis/composition only when both are warranted. This smaller admission trial is a deviation from the paper's full round and should be labeled accordingly. No paid or nested agent runs were launched by this research.

## Watch / hold / skip

- **Hold wholesale runtime admission.** The research framework is usable upstream, but full script/adapter/third-party closure remains unread. Linux/Python, model/executor setup and benchmark dependencies greatly exceed a portable workflow's requirements. A linked framework entry would need a separate concrete user job and full operational review.
- **Do not equate an unchanged composed harness with a baseline-output selection gate.** `selection_pool()` excludes reference executions; at `k=1`, `trivial_selection()` returns the single composed result without a selector. The composer may preserve the baseline tree, but its rerun is a different execution. Our proposed workflow deliberately retains the original baseline output as a candidate.
- **Do not copy host assumptions as universal facts.** The Codex surface imposes an 8,000-character always-on cap and requires skill names in `AGENTS.md`. These are framework policies, not portable requirements demonstrated for all hosts. The installed session already advertises skill names/descriptions separately. Hook trust, payloads and failure behavior require host-specific review; see the existing compatibility report.
- **Do not describe hooks as infallible.** Prompt language saying a hook cannot be ignored does not establish that a hook loaded, matched, succeeded or failed closed. Prefer the catalog's event-specific contract and preserve permissions.
- **Keep benchmark evidence qualified.** The paper reports improvements across three benchmarks and four model/harness configurations. These are author results, not results for this distilled workflow. The release's experiment guide also documents a validation rollout retrieving a public task rubric and advises external network restrictions. That is a reproducibility concern for unrestricted reruns, not proof that every published result was contaminated.
- **Keep the cost explicit.** The ledger counts `4k` solver executions and `3k` improvement stages, with retries, selection and reflection accounted separately. Parallelism reduces elapsed time when available; it does not remove inference work. Fewer executor steps in an output session do not establish lower total system cost.
- **Avoid simplistic noise rules.** The composition prompt dismisses a failure seen in only one reference run as noise. Our adaptation should report frequency and severity; a rare data-loss or contract violation can still matter. One observed failure is insufficient to estimate a reliable rate, not automatically irrelevant.

## Revisit existing entries

Keep `retrospective`, `improvement-loop` and `self-improvement-loop` in their current roles. If the experiment workflow is admitted, link the self-improvement workflow's existing “measure when it matters” step to it. Do not copy the whole procedure into three entries or replace the custom improvement-loop prompt during research. No existing entry needs retirement on this evidence.

## Changes since baseline

Adds a focused method review and a concrete workflow draft beyond the previous specialist skill queues. No existing holds were resolved or reopened; the [latest scout report](2026-10-28-catalog-scout-6.md) and its linked earlier queues retain their status. No catalog entries, ratings, pins, generated indexes, manifests or durable repository policy decisions changed.

## Top priorities

1. **Authoring recommendation:** admit one compact workflow after reviewing this draft, with explicit overlap and evidence level `reviewed`. This captures the distinctive method without importing the framework.
2. **Validation priority:** run a small matched comparison plus a separate transfer case when execution is requested. Preserve unchanged-baseline fallback and distinguish task success from reusable guidance benefit.
3. **Packaging priority:** consider an explicit skill only if real use shows orchestration value beyond reading the workflow. Reuse existing session/evaluation tools before creating a runner or persistent library.

The research supports distillation. It does not establish a performance gain for the draft, a universal cost advantage, or readiness to vendor the upstream runtime.

## Repository verification

`bun run check` passed type checking and the configured Markdown lint stage, then stopped in catalog validation because the concurrently changing working tree lacked `entries/skills/react-component-composition/entry.yaml`. That unrelated entry was not created or modified by this research. Catalog freshness and tests did not run after that failure. A separate configured Markdown lint invocation and `git diff --check` exited successfully. No behavioral evaluation was performed.
