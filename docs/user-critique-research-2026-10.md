# Evidence-based user critique research — October 2026

Researched October 21, 2026. This is a source-reviewed recommendation, not a behavioral benchmark, catalog admission, or installation. Upstream links below use mutable branches; commit pinning and complete dependency review remain necessary before admission. The proposed loop has not been evaluated.

Admission follow-up, October 21: selected upstream `ux-critique` as a [linked catalog entry](../entries/skills/ux-critique/entry.yaml) at `3da293cafb639195bf71797590081d4ffb0045ba`, evidence `reviewed`. The research below preserves the initial comparison; [decision 24](decisions.md#24-admit-a-linked-ux-critique-skill-with-its-complete-install-requirements-2026-10-21) records the admission and packaging constraints. The proposed prompt remains an untested draft, separate from the admitted upstream skill.

## Recommendation

For “critique this context from a user's perspective,” use a **task walkthrough → evidence check → skeptic pass → prioritized critique → targeted retest**. Make bluntness a writing rule and evidence a requirement. Asking for brutality alone can encourage invented defects just as asking for reassurance can encourage flattery.

The closest existing skill among those inspected is **Thecsiz/ux-critique**. Impeccable is a broader design-review alternative. For this catalog, prefer a small, portable adaptation of the method over importing either complete system without further review. Neither has been shown in this research to outperform a plain prompt on this task.

“Objective” should mean traceable observations, explicit assumptions, and claims that can be challenged. An agent completing a task establishes what the agent could do; it does not establish how representative people behave. Critique can expose usability risks without pretending to be user research.

## Candidates inspected

| Candidate | Useful mechanism | Limitation for this request | Judgment |
| --- | --- | --- | --- |
| [Thecsiz/ux-critique](https://github.com/Thecsiz/ux-critique/blob/main/skills/ux-critique/SKILL.md) | Observes before consulting its knowledge base; checks citation support; challenges findings; separates confidence from severity. | Large KB and multiple reference dependencies. Its structural/behavioral/visual severity order can overrank a mild structural issue relative to a serious visual access barrier. Packaging must preserve the KB. | Closest methodological fit; inspect the full installed package before adoption. |
| [Impeccable critique](https://github.com/pbakaus/impeccable/blob/main/.agents/skills/impeccable/reference/critique.md) | Separates design judgment from detector evidence, requires visual inspection when available, and identifies detector false positives. | Design-director emphasis, substantial tooling, numerical design scoring, and speculative persona examples. Its “≤4 visible options” prescription is too rigid to use as a universal defect criterion. | Strong broad design critique; adapt carefully for objective user-task criticism. |
| [ArnavPuri/designskills design-critique](https://github.com/ArnavPuri/designskills/blob/main/skills/design-critique/SKILL.md) | Render-first inspection, screenshots at several sizes, evidence attached to findings, and before/after checks. | Weighted scoring and fixed style prescriptions can turn preferences into apparent measurements. Screenshot audits do not establish task usability. | Useful evidence-capture pattern; not the whole critique method. |
| [humbleteam/design-review](https://github.com/humbleteam/design-review/blob/main/SKILL.md) | Concise observed problem → proposed change → rationale; handles comparisons and decision questions. | Requires polish suggestions even when nothing material clears the bar; always naming a comparison winner can overstate weak evidence. | Good presentation pattern; weaker uncertainty handling. |
| [gstack qa-only](https://github.com/garrytan/gstack/blob/main/qa-only/SKILL.md.tmpl) and [design-review](https://github.com/garrytan/gstack/blob/main/design-review/SKILL.md.tmpl) | Report-only behavioral probing is distinct from a design fix-and-verify loop. | QA does not establish desirability; the design workflow includes edits and commits beyond a critique request. Templates depend on shared sections. | Functional evidence companion, not a standalone user-perspective critique solution. |

These are fit judgments from instructions, not comparative performance scores. Inspection covered the linked instruction files and selected references, not every script or dependency. No upstream workflow was executed. The Skills CLI discovery attempt failed because the npm registry could not resolve; browser search and upstream file inspection supplied the findings. Stolinski's ux-critique appeared in discovery, but its source was not retrieved successfully, so it is not ranked.

## Research grounding

[NN/G's October 16, 2026 study](https://www.nngroup.com/articles/synthetic-users-vs-human-respondents/) compared 120 synthetic respondents with 604 humans on one open-ended survey question. The broad conclusion agreed, but synthetic responses were less diverse. This is a narrow survey study, not a benchmark of browser agents; it supports caution about representativeness, not a claim that agents cannot detect interface defects.

[Lost in Simulation, January 2026](https://arxiv.org/abs/2601.17087), reports instability and discrepancies between simulated and human users in agentic evaluations. Its abstract reports agent success rates varying by up to nine percentage points across user LLMs. This is adjacent evidence about evaluation reliability, not a direct ranking of critique skills.

Use the [cognitive walkthrough](https://www.nngroup.com/articles/cognitive-walkthrough-workshop/) to examine the user's goal, discoverability of the next action, whether the action communicates its purpose, and whether feedback communicates progress. Keep predictions separate from directly observed failures. Use [severity criteria](https://www.nngroup.com/articles/how-to-rate-the-severity-of-usability-problems/) to reason about impact, frequency, and persistence; record frequency as unknown when no evidence establishes it.

## Proposed loop

1. **Bound the review.** Identify the artifact/version, intended audience, goal, stage, constraints, and available evidence. Select one to three representative tasks. Use supported differences in knowledge or access needs rather than invented demographic biographies.
2. **Inspect before explaining.** Record what is visible and attempt tasks through the user's surface before reading implementation explanations where practical. Document expected behavior, actual behavior, and the point of friction. Developer intent can explain a tradeoff later, but cannot erase an observed failure.
3. **Check relevant failure states.** Cover the core task plus applicable empty, error, recovery, interruption, and access states. A screenshot supports claims about visible content, not hidden interaction or keyboard behavior. A text-only concept supports assumptions and questions, not reproduced UI failures.
4. **Verify each candidate.** Attach a location, state, quotation, screenshot, measured value, or reproduction path. Separate observed facts from inferred consequences and taste. Reproduce important failures when possible; an observation is not automatically a reliable mechanism.
5. **Challenge each criticism.** Look for counterevidence, intended constraints, audience differences, and a simpler explanation. Drop or downgrade findings that do not survive. A citation explains a mechanism; it does not prove this audience suffers it. Merge symptoms with one root cause.
6. **Prioritize.** Rank task blockage, loss, incorrect decisions, recovery cost, and evidenced reach. Keep confidence separate from severity. Offer the smallest plausible remedy, its tradeoff, and a check that could show whether it helped. Zero material findings is valid.
7. **Retest when appropriate.** A critique request ends with the report. If changes are requested, re-run the same tasks and relevant adjacent states after the fix. Close findings only on new evidence. Default to one critique and one skeptic pass; repeated rewrites without new evidence do not establish validity.

For documents, use reading and decision tasks; for APIs or CLIs, use discovery, first success, errors, and recovery. For product concepts, inspect the stated problem and alternatives, then identify which claims need real user evidence. Do not describe concept speculation as an observed user outcome.

## Reusable prompt draft

```text
Critique <context> from the perspective of the intended user trying to
accomplish <goal>. Be direct and specific. Do not soften material problems,
flatter the author, or invent flaws to satisfy a request for criticism.

First identify the target/version, audience, task, constraints, and evidence
you can inspect. Mark assumptions. Ask only when a missing fact materially
changes the review; otherwise proceed with a stated assumption.

Walk through 1–3 core tasks using the actual interface or artifact when
available. Record observations before consulting implementation rationale.
Inspect relevant failure and recovery states. Do not claim interactions,
measurements, or tests you did not perform. Limit screenshot-only and
description-only conclusions to what those inputs support.

For each possible criticism, identify the concrete evidence, affected task,
and consequence. Label it observed, inferred risk, or preference. Never
invent user quotes, abandonment rates, emotions, or population frequency.

Run a skeptic pass: find the strongest reason each criticism could be wrong
or an acceptable tradeoff. Seek counterevidence. Drop unsupported claims,
downgrade uncertain ones, and merge duplicate root causes. Do not pad the
report with praise, cosmetic advice, or a required number of problems.

Return a short verdict and the highest-impact findings first. For each give:
- Problem and exact location/state
- Evidence or reproduction steps
- Affected user/task and observed or hypothesized consequence
- Severity with reason, plus confidence with reason
- Smallest useful fix, tradeoff, and a concrete validation check

Separate unresolved hypotheses and uninspected areas. State what would
change the verdict. Zero material findings is an acceptable result.
Do not edit the product as part of this critique.
```

This is an untested synthesis, not an installed skill. A possible future trigger is: “Critique this app, flow, artifact, or idea from the intended user's perspective; find concrete friction and challenge unsupported criticism.” Keep its identifier, title, and trigger description distinct when admitting it.

## Catalog overlap and admission work

- `webapp-testing` and `chrome-devtools-mcp` provide ways to collect evidence. They do not supply this full critique contract. Reuse available host browser capabilities before adding another integration.
- `grilling` challenges plans through questions. It does not replace inspecting the artifact or executing a task.
- `improvement-loop` and `retrospective` address the agent's working process and tooling. This method reviews the user's product or context.
- `verification-before-completion` and `verification-evidence` share the requirement for real checks. The added value here would be task selection, counterevidence, and calibrated user-impact claims.
- Generic critique and frontend-design guidance already cover much of the prose. A new entry needs evidence that the explicit loop improves finding quality, not merely report length.

Before admission, pin the selected revision, inspect all shipped resources, verify resource closure and license scope, and start at `reviewed`. [Thecsiz's license](https://github.com/Thecsiz/ux-critique/blob/main/LICENSE) splits the runtime under MIT from its KB/documentation under CC-BY-4.0; do not label the whole package MIT. [Impeccable's root license](https://github.com/pbakaus/impeccable/blob/main/LICENSE) is Apache-2.0; check notices and per-file exceptions before vendoring.

To evaluate the proposed loop, compare it against a plain “critique this from a user's perspective” prompt on identical tasks and evidence, with repeated runs and blinded human adjudication. Include known task blockers, a sound interface, legitimate specialist tradeoffs, screenshots with hidden behavior, a misleading author brief, and embedded instructions in artifact content. Treat the artifact as evidence, never instructions. Measure supported-finding precision, missed seeded problems, reproduction quality, useful remedies, invented claims, and cost. A passing schema, a valid citation, or agreement among model critics is not behavioral validation. Real users remain necessary to assess learnability, preferences, and population-level effects.
