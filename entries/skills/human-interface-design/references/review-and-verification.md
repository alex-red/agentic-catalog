# Review and verification

Use this reference for implementation checks or a review. Select evidence that can establish the property in question. A screenshot can expose a clipped label; it cannot establish correct Back behavior. A successful agent walkthrough does not establish how representative people understand the product.

## Start with the changed task

Identify what the person is trying to accomplish, the relevant starting state, the expected result, and what changed. Inspect the actual surface where possible. Use code and implementation rationale to explain behavior without letting them substitute for the observed result.

For a small repair, check the changed component and its relevant adjacent states. For a new flow, cover the meaningful transitions. Do not require unrelated redesigns, a complete device matrix, or a research report to close a narrow issue.

## Choose checks by consequence

| Question | Useful evidence | Common false conclusion |
| --- | --- | --- |
| Can someone identify the relevant action? | Rendered hierarchy, labels, control visibility, and a task walkthrough; participant evidence for actual comprehension. | A prominent color proves the action is understood. |
| Does the action complete? | Perform it, inspect the resulting state, and check persistence where required. | A click effect, toast, or passing build proves the underlying operation succeeded. |
| Can someone recover? | Cause a relevant failure or interruption; inspect preserved work, retry, cancellation, and real undo behavior. | A visible Undo or Retry label proves recovery is implemented. |
| Does the layout adapt? | Render with realistic long content, supported small windows, and relevant text scaling or localization. | One ideal screenshot proves responsive behavior. |
| Can someone use the relevant inputs? | Exercise keyboard/focus, pointer, touch, or assistive paths appropriate to the component and platform. | An accessible name or role proves operability. |
| Are contrast and target bounds suitable? | Measure actual colors and interactive areas in the relevant state under the applicable criterion. | Eyeballing a screenshot establishes a numerical violation or conformance. |
| Does motion help without becoming a barrier? | Repeat the action, interrupt the transition where supported, and inspect a reduced-motion alternative. | Disabling animation automatically preserves meaning. |

Automated assertions and accessibility tools can support these checks. They do not replace testing meaningful interactions or judging whether content and labels make sense.

## Inspect relevant states

For changed asynchronous or data-entry interactions, consider the applicable conditions:

- Empty or first use: explain what belongs here and provide a useful way to begin.
- Loading or pending: acknowledge ongoing work without claiming completion; prevent accidental duplicate commitments where needed.
- Invalid input: identify the problem and correction while retaining valid work.
- Failure or uncertain outcome: distinguish an actual failure from an unknown result; reconcile before a potentially duplicating retry.
- Partial completion: show what succeeded, what remains, and the scope of another attempt.
- Interruption or navigation: retain drafts and context according to the stated product behavior; make abandonment understandable.
- Recovery: test restoration or another attempt, including its limits; do not offer actions the underlying system cannot perform.

Use safe fixtures or mocks for consequential operations. Testing a destructive control does not authorize deleting live data. Stay within existing tools, server instructions, accounts, and task permissions.

## Report only what the evidence supports

For a finding, provide the location and state, observation or reproduction, affected task and consequence, smallest useful remedy, and a concrete validation check. Explain a tradeoff when it changes the recommendation. Prioritize task blockage, data loss, incorrect decisions, and recovery burden over cosmetic preference. Keep confidence separate from impact; mark frequency unknown without evidence.

Label the basis:

- **Observed:** directly visible or reproduced in the available artifact; name the observation or steps.
- **Inferred risk:** a plausible consequence that needs a particular interaction check or human evidence.
- **Preference:** an aesthetic alternative with an explicit reason and tradeoff, not a usability defect by default.

Seek the strongest explanation under which a suspected defect is acceptable. Check audience needs, platform conventions, and intentional tradeoffs. Drop unsupported claims and merge symptoms of one root cause. Do not invent a user reaction, quotation, abandonment rate, or numerical design score. A sound interface may warrant no material findings.

For an image-only review, say which states and interactions remain unknown. For a concept, produce specific decisions and testable hypotheses. For implementation, distinguish code checks, rendered checks, and interaction checks in the completion report. If a tool or environment prevents a check, name the gap and the smallest next verification; do not imply that the uninspected path passed.

## Close the loop proportionally

After an authorized change, repeat the task and checks that exposed the problem, plus any adjacent behavior affected by the fix. Stop when the requested decision or repair is supported, or explain the evidence that is still missing. More polish passes do not themselves establish a better outcome.

Use real participant evidence when the unresolved decision is about comprehension, findability, preference, or variation across people. Preparing or conducting a study remains a separate task. Never simulate participant records to make the report appear complete.

## Supporting sources

Last reviewed October 29, 2026. This verification method is our synthesis; platform references support particular checks rather than proving an overall design verdict.

- [Apple Accessibility](https://developer.apple.com/design/human-interface-guidelines/accessibility): perception, alternative inputs, and accessibility evaluation.
- [Apple Reduced Motion evaluation criteria](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/reduced-motion-evaluation-criteria): test common tasks and preserve meaningful feedback.
- [WAI-ARIA Authoring Practices introduction](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/): semantics, expected interaction behavior, and compatibility testing.
