# Human-focused catalog ratings

The rating asks: **For the intended developer and task, how much better does this item make the work, after accounting for the effort and responsibility it introduces?**

`human-v1` is the current rubric. Its score is a curator judgment out of 10, with evidence and project fit shown separately. It is not a measured productivity gain or a probability of success. The [research and rationale](research/2026-10-29-human-focused-rating.md) explain its sources and proposed calibration. The weights remain provisional until that calibration is complete.

## Establish the comparison

Before grading, read the complete required artifact and relevant resources. Identify its revision, intended developer, task and supported environment. State the baseline: current host behavior, existing project tools and the best simpler alternative, including doing nothing. Use `useWhen`, `hosts` and `overlap` alongside the rating context; audience breadth does not establish quality.

Inspect source correctness and dependencies. A linked entry's metadata is not a full review of its runtime. Do not run installers, integrations or external evaluations merely to assign a rating. Record inspection limits in the linked assessment.

## Seven criteria

Every dimension uses integer grades from 0 to 4. Higher always means better for the developer, including lower adoption and maintenance costs. Use 1 for substantial shortcomings and 3 for strong behavior with a meaningful limitation; the table anchors 0, 2 and 4.

| Dimension / metadata key | Weight | 0 | 2 | 4 |
| --- | ---: | --- | --- | --- |
| Practical value / `value` | 25% | No useful additional value, or net extra work | Real need with modest or conditional improvement | Consequential benefit over the best simpler alternative |
| Dependability / `dependability` | 20% | Incorrect core behavior or opaque failure | Coherent method with documented gaps and workable recovery | Correct bounded method, useful verification, visible failure and clear recovery |
| Cognitive ease / `cognitiveEase` | 15% | Confusion, interruptions or supervision burden | Understandable but needs repeated steering or avoidable ceremony | Easy-to-understand actions/results, lower routine mental effort and preserved comprehension |
| Human control / `control` | 15% | Overrides intent or hides consequential effects | Visible effects but weak redirection, boundaries or reversal | Respects authorization and scope; supports proportionate redirection, stopping and recovery |
| Adoption cost / `adoption` | 10% | Undocumented work prevents first useful result | Several setup steps or meaningful learning effort | Clear first value, complete requirements, economical resources and straightforward removal |
| Compatibility / `compatibility` | 10% | Conflicts with supported environment or conventions | Documented constraints and manageable overlaps | Reuses existing tools and fits declared environment without conflicting policies |
| Upkeep / `upkeep` | 5% | Cannot reasonably maintain, update or replace it | Update path and ownership with some drift burden | Traceable version/source, bounded dependencies, realistic updates and easy replacement |

Grade practical value within the intended task. A rare but severe failure can justify a specialist tool. Host specificity is a fit constraint rather than an automatic deduction. Originality, stars, installs, author reputation and recent commits receive no points by themselves.

Count the complete developer burden: setup, learning, accounts, permissions, context, tokens, waiting, prompting, review, correction, interruptions and future maintenance. Preserve comprehension and inspectable results rather than rewarding maximum automation. Repeated unnecessary approval prompts can reduce cognitive ease without improving control.

Avoid double counting the same consequence: value measures incremental benefit; dependability measures correctness and recovery; cognitive ease covers recurring attention; control covers authority; adoption covers setup/removal and direct resource costs; compatibility covers coexistence; upkeep covers future drift and updates. Explain distinct consequences if a root issue affects more than one grade.

## Score and presentation

```text
score = (25 × value + 20 × dependability + 15 × cognitiveEase
       + 15 × control + 10 × adoption + 10 × compatibility
       + 5 × upkeep) / 40
```

The generator computes the score and displays one decimal. The ordered grades are treated as equal intervals for this editorial calculation; tiny numerical gaps do not establish meaningful superiority. Always expose the dimension breakdown and decisive tradeoff.

- **9–10:** exceptional overall balance for the stated use.
- **7–8.9:** strong overall balance, with worthwhile tradeoffs.
- **5–6.9:** conditional option; explain the specific reason to choose it.
- **3–4.9:** weak option in its present form.
- **0–2.9:** little defensible value or substantial problems.

These bands describe the aggregate, not admission or recommendation. An easy-to-adopt but redundant rule can have a favorable aggregate while still being a poor default recommendation. Select for task fit, meaningful additional value and blockers before using the total to compare choices.

## Evidence, unknowns and blockers

Keep `reviewed`, `used`, `tested` and `evaluated` independent of the number. Higher evidence levels retain the existing linked-record requirements under `evals/results/`. State what the evidence covers: source, installation, activation, failures or matched outcomes. Schema checks and curator assessments never raise an evidence level. Source-reviewed grades are provisional judgments where outcomes have not been observed.

Unknown grades are omitted from `dimensions`, with the missing information listed in `unknowns`. The generated `score` is `null` until all seven grades exist. Do not assign zero, a midpoint, or a partial average to missing information. Use zero only for an assessed unacceptable property. Do not describe score ranges as statistical confidence intervals.

Record serious unresolved defects or authority violations in `blockers`, with the affected `scope` and a concrete `reason`. Missing required resources, secret exposure and prohibited unpinned remote instructions are examples. A high average cannot clear them. An optional-path defect can block only that path; explain any usable alternative. Apply the catalog's existing hold, experimental and installation policies. Scores do not grant authorization.

## Metadata and review records

```yaml
rating:
  rubric: human-v1
  dimensions:
    value: 3
    dependability: 3
    cognitiveEase: 4
    control: 4
    adoption: 2
    compatibility: 3
    upkeep: 2
  context: Developers doing the stated task in its supported environment.
  baseline: Existing host capability and the best simpler project tool.
  review: docs/reviews/2026-10-29-example-review.md
  evidence: reviewed
  reviewed: 2026-10-29
  notes: Explain the additional benefit, decisive tradeoff and evidence limits.
```

This illustrative complete profile computes to 7.9/10. Optional fields:

```yaml
  unknowns:
    - Failure recovery could not be inspected; omit its grade until assessed.
  blockers:
    - scope: Optional external export
      reason: Exports credentials without redaction; keep that path disabled.
```

The `review` file must exist, be nonempty and live under `docs/reviews/`. Record the reviewer, date, rubric, exact revision or payload digest, files read, intended person/job/environment, baseline, per-grade rationales, facts versus predictions, evidence links and limits, decisive tradeoff, blockers and what would change the judgment. AI curator reviews must identify themselves; they do not substitute for independent human calibration. Keep review records outside installable entry payloads and separate from behavioral evidence.

Existing examples: [starter assessments](reviews/2026-10-29-human-v1-starter.md).

## Migration and ranking

The reader still supports historical four-axis reviews explicitly labeled `legacy-v1`. They retain their original grades and formula `(2 × usefulness + quality + portability + novelty) / 5`, out of 5. They remain historical curator judgments; all active entries have now been substantively reassessed. Never double them or invent seven new grades from four old ones. New admissions and substantive re-reviews use `human-v1`.

The index preserves `schemaVersion: 2`; `rating.rubric` versions the rating model. `score` can now be null for incomplete human assessments. Consumers must branch on the rubric and inspect the scale; they must not combine legacy and human-focused scores into one numerical ranking.

The browser's Score sort and `llms.txt` group complete human reviews first, legacy reviews second, incomplete human reviews third, and human reviews with blockers last. Scores rank only within these groups; this grouping is a migration display policy, not evidence that a newly reviewed item is better than every legacy entry. Evidence sorting remains a separate browsing preference. Fit and caveats take precedence in recommendations.

The [catalog-wide assessment](research/2026-10-29-catalog-prune.md) covers all 108 active entries: 76 complete scores, 32 incomplete profiles with explicit gaps, and 9 scoped blockers (overlapping those groups). No active legacy reviews remain. The full independent calibration remains outstanding: review 10–12 varied entries with independent human judgments where feasible, investigate dimension disagreements, vary the weights to check rank reversals and compare a small authorized subset with their actual baselines. Record scope and limitations before claiming validation. Reassess after material artifact/host changes, consequential failures or the existing periodic review window.
