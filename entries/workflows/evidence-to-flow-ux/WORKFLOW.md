# Evidence-to-flow UX workflow

Use this procedure to connect a specific product decision to task evidence, a proportionate design change and a meaningful retest. Start at the stage the available evidence supports; a narrow defect does not require a complete research program.

## 1. Bound the decision

State the user task, intended outcome, relevant audience, current product version and constraints. Define the surfaces and states in scope, the deliverable requested and what evidence would justify the decision. Reuse accepted design patterns and existing research. Separate a request for recommendations from an authorized implementation task.

## 2. Inspect the task and choose the evidence needed

Walk the task from entry through action, outcome, recovery and return where relevant. Include the permissions, empty/error/loading states, interruptions and accessibility paths that can affect this task. Record what was actually inspected and what could not be reached.

Choose the next step according to the uncertainty:

| Situation | Appropriate next step |
| --- | --- |
| A reproducible defect blocks an intended action | Make the authorized focused fix and verify the task and affected states |
| Existing participant records answer the question | Synthesize those records and identify contradictions or gaps |
| The unresolved question is human comprehension, findability or behavior | Prepare a realistic participant study; use actual observations when available |
| Only code, screenshots or an agent walkthrough are available | Give inspection findings and explicit human-behavior hypotheses |

An agent completing a browser task establishes that attempt in that environment. It does not establish representative human usability, demand, emotion or willingness to return. Generated personas can suggest cases to inspect; they are not participants or evidence of population coverage.

## 3. Keep an evidence ledger

For each consequential claim, record its source and scope:

| Claim | Source or locator | Evidence class | Boundary or counterevidence | Decision supported |
| --- | --- | --- | --- | --- |
| What happened or may be wrong | File/line, screenshot, session/task/time or record identifier | Interface observation, participant observation/report, analytics or hypothesis | Missing states, contradictory cases, sample and exposure limits | What this permits us to change or investigate |

Keep an observation distinct from its explanation. Trace quotes to actual records. Deduplicate participants and repeated reports; count exposed participants when reporting task frequencies. Do not convert qualitative sample counts into population rates. Prioritize consequences and recoverability alongside frequency, including rare severe barriers.

For participant research, prepare neutral scenarios, observable success criteria and a moderator/observation protocol. Use representative criteria appropriate to the decision and disclose gaps. If records or participants are unavailable, a ready protocol and pending evidence are the honest endpoint for that branch. This workflow does not authorize contacting people, recording, publishing or enabling new connections by itself.

## 4. Design the smallest supported change

Connect each proposed change to a supported finding or a clearly labelled hypothesis. Consider navigation, labels, ordering, feedback, permissions and recovery before assuming a visual restyle will resolve the task problem. Preserve product constraints and accepted components unless the evidence supports changing them.

Describe the expected task improvement and how it will be observed. Keep alternatives or contradictions visible when they could change the choice. Implement only within the user's authorized scope; otherwise return a concrete proposal or prototype for the requested decision.

## 5. Retest and stop at the evidence boundary

Verify the changed task from the same starting conditions and check affected states and shared consumers. Choose verification that matches the claim: code or browser checks can confirm a defect repair; claims about human comprehension need suitable participant evidence. A pilot of the script verifies preparation, not the product's usability.

Compare with the original evidence, recording environment, participant/task differences and assistance that weaken the comparison. If a retest contradicts the hypothesis, revise or reject the change. Reopen earlier stages only for a named unresolved question or new evidence, with a bounded next step that fits the task's time and scope. Stop when the requested decision is supported or the missing evidence prevents further conclusions; do not invent more personas or findings to force another round.

Deliver the decision, evidence links, inspected task/state coverage, changes or proposal, retest results and remaining uncertainty. Make clear whether the outcome is a verified repair, a supported research finding, an untested design hypothesis or a study ready to run. Carry material limitations with the artifact so another reader can assess it without the conversation.
