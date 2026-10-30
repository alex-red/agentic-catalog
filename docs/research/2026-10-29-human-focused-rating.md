# A human-focused rating for catalog entries

As of and researched: October 29, 2026, America/Edmonton.

Status: proposal for discussion. No catalog ratings, schema, formula, evidence levels or installation behavior change. The weights, anchors and bands below are curator design choices, not a validated measurement instrument.

## Recommendation

Grade an entry on this question: **For its intended developer and task, how much better does it make the work, after accounting for the effort and responsibility it introduces?**

Publish a score out of 10 with its dimension breakdown, intended use, evidence scope and material caveats. Keep project compatibility and recommendation blockers visible beside the number. A score helps compare plausible choices; it cannot decide whether a tool belongs in a particular project.

Use seven dimensions: practical value, dependability, cognitive ease, human control, adoption cost, compatibility and upkeep. Pilot the rubric before adopting it. Do not simply double the existing score: that changes the scale without changing what the catalog values.

## Baseline and research scope

The current [plan](../../PLAN.md), [contribution rules](../../CONTRIBUTING.md), [decision 15](../decisions.md#15-pivot-to-a-curated-rated-catalog-2026-10-20), [evaluation guide](../evaluation.md) and source implementation in `scripts/library.ts` establish four 1–5 axes. The formula is `(2 × usefulness + quality + portability + novelty) / 5`. Evidence is already separate and must remain so.

Read the catalog-scout skill and its supporting criteria for research discipline; this is a focused rating-method study, not an upstream candidate survey. Reviewed the [Dev UX survey](2026-10-29-catalog-scout-3.md), [selection guide](../dev-ux-options.md), and metadata for `agents-md-authoring`, `webapp-testing` and `format-after-edit` to check whether the proposal addresses actual catalog distinctions. These were illustrative metadata checks, not new payload audits or entry evaluations.

Live research covered developer-experience frameworks, human–AI interaction, usability heuristics, empirical coding-assistance studies and composite-score methodology. Sources below are original research, researcher publications or originating guidance. This is a selected synthesis, not a systematic literature review. No participant study, host trial, agent outcome evaluation or statistical validation of the proposed rubric was conducted.

## Research findings and implications

1. **Developer experience includes attention and mental effort.** Noda, Storey, Forsgren and Greiler organize DevEx around feedback loops, cognitive load and flow state. They recommend combining developers' feedback with engineering-system observations and emphasize contextual differences. Implication: count interruptions, confusing feedback and supervision effort; raw task duration is insufficient. [DevEx paper, 2023](https://www.michaelagreiler.com/wp-content/uploads/2024/06/DevEx-WhatDrivesProductivity.pdf).

2. **Productivity has multiple dimensions.** The SPACE framework argues against reducing developer productivity to one metric or activity count. Implication: our number is a curator decision aid with visible components, not a measurement of developer productivity. [Forsgren et al., 2021](https://www.microsoft.com/en-us/research/publication/the-space-of-developer-productivity-theres-more-to-it-than-you-think/).

3. **Agency matters when automation fails.** Microsoft's human–AI guidelines emphasize capability boundaries, efficient dismissal and correction, explanations, and global controls. Implication: grade whether the human can understand, redirect, stop and recover from the workflow. Requiring confirmation for every trivial action does not itself establish good control. [Amershi et al., CHI 2019, originating summary](https://www.microsoft.com/en-us/research/articles/guidelines-for-human-ai-interaction-eighteen-best-practices-for-human-centered-ai-design/).

4. **Usability principles apply beyond graphical interfaces.** Nielsen's heuristics cover system status, consistency, recognition, error prevention and recovery. Implication: assess command feedback, skill activation, hook failures, installation instructions and uninstall paths as developer interactions. Applying these principles to catalog artifacts is our adaptation, not a validation of this score. [Nielsen's heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/).

5. **Perceived speed and observed speed can diverge.** METR's early-2025 randomized study involved 16 experienced developers and 246 tasks; AI access increased completion time by 19% in that setting despite participants' perceived speedup. Its February 2026 follow-up reports selection and timing problems that prevent a reliable current-effect estimate. Implication: distinguish felt effort, satisfaction and observed outcomes, and retain host/model/date boundaries. Neither report establishes the benefit of any catalog entry. [Original study](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/), [follow-up](https://metr.org/blog/2026-02-24-uplift-update/).

6. **Understanding is a human outcome.** Anthropic's randomized study of learning an unfamiliar Python library found lower mastery with AI assistance and no statistically significant overall speed benefit; interaction patterns differed. Implication: assess whether developers can inspect, explain and maintain the result. This short learning-task study does not show that every coding aid causes long-term skill loss. [Shen and Tamkin, 2026](https://www.anthropic.com/research/AI-assistance-coding-skills).

7. **Additional instructions can introduce real costs.** The September 2026 revision of Evaluating AGENTS.md reports no general improvement in task success and over 20% higher average inference cost in its tested settings. It distinguishes useful non-standard practices from unhelpful repository overviews. Implication: compare the entry with current defaults and charge for extra context or procedure; volume is not quality. This does not establish that skills, hooks or all context files are ineffective. [Gloaguen et al., v3](https://arxiv.org/abs/2602.11988v3).

8. **Weights can create misleading rankings.** OECD/JRC guidance emphasizes transparency, sensitivity analysis and access to underlying dimensions when constructing composite indicators. Implication: expose weights and breakdowns, test ranking sensitivity, and avoid interpreting small numerical gaps as meaningful. Its application domain is broader composite indicators, not coding-agent artifacts. [OECD/JRC handbook, 2008](https://www.oecd.org/en/publications/handbook-on-constructing-composite-indicators-methodology-and-user-guide_9789264043466-en.html).

These sources motivate the dimensions. They do not establish the proposed weights, cutoffs, or an entry's grade.

## Define the comparison before grading

Record one sentence each for:

- **Person:** the intended developer's relevant knowledge and responsibilities; avoid invented demographic personas.
- **Job:** the task, pain or failure the entry addresses, and how often or how consequentially it matters in this use case.
- **Baseline:** the current host/model, project tools, ordinary agent behavior and strongest simpler alternative.
- **Boundary:** the exact artifact revision, supported environment, required dependencies, optional extras and inspection scope.

Rate value within the stated job. A specialist reverse-engineering tool can earn a high score without helping ordinary web projects. Show that specialization through fit metadata. Do not count audience size as quality.

The baseline can be a host capability, an existing formatter, a small command, another catalog entry, or doing nothing. An original technique has no automatic advantage over a familiar one. What matters is the additional benefit the developer receives.

## Proposed dimensions and behavioral anchors

Use integer grades from 0 to 4. The table anchors 0, 2 and 4; use 1 for substantial shortcomings and 3 for strong behavior with a meaningful limitation. Higher always means better for the developer. A grade is a supported judgment about the artifact, not a measured success rate.

| Dimension | Weight | 0: unacceptable in its intended use | 2: adequate with material tradeoffs | 4: excellent in its intended use |
| --- | ---: | --- | --- | --- |
| Practical value | 25% | No useful improvement over the baseline, or adds net work | Addresses a real need with modest or conditional benefit | Addresses a consequential need with clear additional benefit over the best simpler alternative |
| Dependability | 20% | Core path is incorrect or fails opaquely | Core method is coherent, with documented gaps and workable recovery | Correct, bounded method with useful verification, visible failure and clear recovery |
| Cognitive ease | 15% | Creates confusion, interruptions or supervision burden | Understandable, but needs repeated steering or avoidable ceremony | Makes the next action and result easy to understand; reduces routine mental effort while preserving comprehension |
| Human control | 15% | Overrides intent or performs consequential hidden actions | Effects are visible but redirection, boundaries or reversal need work | Respects authorization and scope; consequential effects are clear; the human can redirect, stop and recover proportionately |
| Adoption cost | 10% | Cannot reach a useful first result without undocumented work | Usable with several explicit setup steps or meaningful learning effort | Clear route to first value, complete requirements, economical resource use and straightforward removal |
| Compatibility | 10% | Conflicts with supported project or host conventions | Works with documented constraints and manageable overlaps | Fits its declared environment, reuses existing tools and composes without conflicting policies |
| Upkeep | 5% | Cannot reasonably maintain, update or replace it | Ownership and update path exist, with some drift or dependency burden | Traceable source/version, bounded dependencies, realistic maintenance and easy replacement |

### Questions that make the dimensions concrete

- **Practical value:** What developer problem disappears? Does it improve correctness, decisions, effort, feedback, confidence or enjoyment? What remains if the host already does the obvious parts? Frequency and severity matter within the intended job; rare catastrophic failures may be worth preventing.
- **Dependability:** Are the technical claims sound? Does the core path work? Are limits and failure signals clear? Can the developer distinguish a valid result from a confident assertion? Trigger precision matters for automatically selected guidance; irrelevant activation is a failure, too.
- **Cognitive ease:** What must the developer remember, read, explain repeatedly or babysit? Is feedback timely and actionable? Are outputs concise and inspectable? Can the developer understand and maintain the resulting work? Consider keyboard access, readable status and non-color cues for interfaces where relevant.
- **Human control:** Does it preserve user choices and project scope? Are writes, credentials, network use and persistent changes disclosed? Can the human correct its direction and undo effects? Does the approval burden match consequence? An explicit authorized command does not need another approval merely to earn points.
- **Adoption cost:** What does first success require? Count packages, accounts, permissions, context, tokens, wall time, learning and uninstall effort. Heavy setup can be justified by exceptional value; it remains a cost, so buyers can see the tradeoff.
- **Compatibility:** Does it work in the environment it promises? Does it respect existing instructions, formatters, test commands and workflows? Are optional integrations genuinely optional? Host specificity is a fit constraint, not an automatic deduction. Open formats help when they reduce actual friction.
- **Upkeep:** Are dependencies and version assumptions inspectable? Is there an update and exit path? Does the installed artifact remain understandable without this checkout? A stable small rule can score well with no recent commits; popularity and release velocity are not maintenance quality.

Avoid double counting: put incremental benefit in practical value, correctness in dependability, recurring attention in cognitive ease, authority boundaries in human control, initial setup/removal and direct resource costs in adoption, coexistence in compatibility, and future drift/update work in upkeep. Cross-reference a root problem rather than independently penalizing its same consequence in several dimensions. Distinct consequences can justify distinct deductions if explained.

## Arithmetic and interpretation

Let each letter be its dimension grade from 0 to 4:

```text
score / 10 = (25V + 20D + 15C + 15H + 10A + 10F + 5U) / 40
```

Keep full precision for arithmetic; display at most one decimal. The 0–4 anchors are ordered judgments; the formula assumes equal steps for convenience and does not turn them into scientific measurements.

Illustrative calculation, not a catalog rating: grades `3, 3, 4, 4, 2, 3, 2` give `(75 + 60 + 60 + 60 + 20 + 30 + 10) / 40 = 7.875`, displayed as **7.9/10**.

Provisional interpretation bands:

| Score | Interpretation |
| --- | --- |
| 9–10 | Exceptional overall balance for the stated use |
| 7–8.9 | Strong option with worthwhile tradeoffs |
| 5–6.9 | Conditional option; explain the specific reason to choose it |
| 3–4.9 | Weak option in its present form |
| 0–2.9 | Little defensible value or substantial problems |

These bands summarize the arithmetic, not admission or recommendation. A strong specialist may have substantial adoption costs; a simple tool should not earn a high score merely by being easy to install. Do not present a tenth of a point as a meaningful quality difference. Use task fit and the underlying dimensions to resolve close comparisons.

## Keep evidence, fit and blockers beside the score

**Evidence:** preserve `reviewed`, `used`, `tested`, `evaluated` and their linked-record requirements. Always state what was reviewed or tested: source, activation, installation, failures or matched outcomes. An activation test does not substantiate practical benefit. Source review can support a provisional high judgment without establishing observed reliability or productivity. Do not multiply scores by an evidence factor or award points for merely having tests.

For each dimension, distinguish inspected facts, observed behavior and predicted benefit. Unknown is neither 0 nor the midpoint. If required information is missing, publish a partial profile with named unknowns and withhold the aggregate. A numerical range is appropriate only when the bounds can be justified; it is not a statistical confidence interval. During migration, unreviewed entries can retain an explicitly labeled legacy score rather than receive invented new grades.

**Fit:** show intended task, experience assumptions, host, operating system, project conventions and required services independently. A 9/10 tool outside its supported environment is a poor recommendation. Use fit to select candidates before comparing quality scores. If host behavior materially changes value, provide a scoped host assessment instead of implying universal superiority.

**Blockers:** serious unresolved authority violations, secret disclosure, core-path defects, missing required components, or prohibited unpinned remote instructions cannot be canceled out by strengths elsewhere. Record the affected path and conditions. A defect confined to an optional feature may block only that feature. Use hold, experimental or a scoped recommendation as appropriate under catalog policy; a favorable weighted average is never enough to clear a blocker. Licensing controls the permissible packaging path and is not a popularity or quality bonus.

This prevents a high average from hiding a serious weakness without inventing arbitrary numeric caps. Blocker policy and rating are related judgments with different purposes.

## Apply one rubric across entry types

| Entry type | Typical developer interaction to inspect |
| --- | --- |
| Skill or rule | Selection, scope, instruction burden, actionability, output inspection and conflicts |
| Workflow or loop | First useful result, checkpoints, human effort, retries, stop conditions and handoff |
| Hook | Installation, when it fires, false blocks, latency, failure feedback and disabling it |
| MCP server | Connection, tool discovery, permissions, data exposure, tool results and failure recovery |
| Plugin | Complete installed behavior, implicit additions, overlapping policies, updates and removal |
| Tool | First run, status visibility, keyboard/terminal interaction, errors, recurring cost and exit path |
| Subagent | Delegation boundary, context transfer, evidence in findings, coordination cost and human review |

Do not add optional integrations or broad installations just to assess an item. Source review comes first; runtime trials require the appropriate environment and existing authorization. Assess a bundle's required installed surface, not only its best component. For linked entries, record uninspected runtime or resources rather than describing the metadata as a full artifact review.

## Catalog examples that expose the change in judgment

- **`webapp-testing`:** current metadata gives quality 4/5 while recording a server-output pipe problem and a readiness condition that may not settle. A new review must distinguish the Playwright method from the affected helper path. Its value also depends on available host browser capabilities. This is a reason to revisit the judgment and scope, not a new finding from execution.
- **`format-after-edit`:** a project already covered by editor and commit formatting may receive little additional value. A project with persistent agent-generated style drift may benefit substantially. Narrow automatic edits, false activation and cheap disablement matter more than conceptual novelty.
- **`agents-md-authoring`:** on-demand loading is a plausible attention/resource advantage over always-on prose. Source rationale supports that design judgment; it does not prove that this particular skill improves task outcomes. A stated audit/approval procedure also deserves a proportionality check.
- **A host-specific status line:** can deserve a strong grade for its supported host even though it is not portable. The important questions are whether its status is useful, unobtrusive, accurate and inexpensive to maintain. Cross-host breadth belongs in fit metadata.

No examples above assign new official scores. They show what a review must resolve.

## Calibrate before changing the catalog

1. Select 10–12 entries spanning types, specialist and broad uses, easy and heavy setup, known defects, strong overlap and different evidence scopes. Include an entry whose main value is satisfaction or reduced effort, not speed.
2. Write the target person/job/baseline and grade them using the same anchors. Hide current scores and popularity during the first pass. Use two independent human reviewers where feasible; one curator can repeat later, but this is weaker evidence of consistency. Model assistance may organize citations and suggest grades; model agreement does not validate them.
3. Record per-dimension disagreements, especially differences of two or more grades. Resolve ambiguous anchors through concrete source examples. Preserve legitimate context disagreements instead of averaging away different assumed users.
4. Compare the proposed weights with equal weights and a practical-value-heavy alternative, each totaling 100%. Inspect rank reversals and explanations. If small changes flip the preferred entry, treat the options as close rather than publishing a confident winner.
5. For a small authorized subset, try first success, a normal repeated task, one plausible failure, redirection and removal. Compare with the existing baseline. Capture elapsed time, human interventions, unsupported outputs, review/rework effort and brief developer feedback. High-consequence tools deserve additional relevant failure checks; no universal test count certifies safety.
6. Ask whether the score's explanation predicts human preference and the observed tradeoffs. A short trial can inform a review, but reliable causal benefit claims need an appropriate comparative design. Link evidence and preserve its limits under current policy.
7. Revise dimensions or anchors that do not help decisions. Only then adopt a rubric version and record the lasting choice in `docs/decisions.md`.

If adopted, update source schema and rating fields, formula tests, contributor guidance, discovery instructions, browser labels and examples together; regenerate indexes from source. Keep legacy and new rubric versions distinct during regrading. A bulk arithmetic conversion cannot substitute for new reviews. Re-review after a material artifact or host change, a consequential failure, or the catalog's existing periodic review window; age alone is not evidence of decline.

## Suggested review card

```text
Item and revision:
Intended developer / task / environment:
Baseline and simpler alternative:
Score: __/10, provisional where applicable
Dimensions: value __; dependability __; cognitive ease __;
  human control __; adoption __; compatibility __; upkeep __
Evidence level, linked record and actual scope:
Observed facts versus predicted benefits:
Best reason to choose it:
Main cost or limitation:
Blocker or affected optional path:
Unknowns and what would change the judgment:
Reviewer / date / rubric version:
```

The public summary can be much shorter: **score + intended use + evidence + decisive tradeoff**. The supporting review should let another person reconstruct the judgment without trusting the number alone.
