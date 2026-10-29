# Human-interface-design admission

Date: October 29, 2026. Follow-up to the [Apple-inspired interface skill research](2026-10-29-apple-inspired-interface-skill.md), authorized by the user's request to proceed.

## Payload and scope

Admitted adapted [human-interface-design](../../entries/skills/human-interface-design/SKILL.md), titled **Human-centered interface design**, at evidence level `reviewed`. The package contains a short entrypoint, MIT license, and three conditional references: principles and decisions, platform adaptation, and review and verification. All installable content is inside the entry directory and requires no sibling skill, engine, network-loaded instructions, or persistent project artifact.

The method turns Apple's eight design principles into decisions about structure, navigation, honest operation states, recovery, visual hierarchy, platform fit, and accessibility. It accommodates familiar desktop controls, a dense table, a quick capture flow, or expressive branding. Detailed adaptations cover web, handheld, and desktop; other modalities reuse the core questions and consult relevant official guidance for specialized conventions.

The prose and examples were independently written. No Apple wording, screenshots, design resources, fonts, symbols, or code were vendored. Metadata records inspiration links and the October 29 source-review date. These mutable pages are not immutable revision pins; dated WWDC sessions anchor the conceptual framework. This is not official or Apple-endorsed guidance.

## Overlap and rating

Existing host design reasoning, frontend-design, interface-design, and interaction-craft guidance overlap substantially. The distinction is a compact cross-platform decision method with explicit state/recovery semantics and scoped standards. ux-critique and evidence-to-flow-ux remain alternatives for evidence-led review; study and synthesis entries serve different tasks.

Curator ratings are usefulness 4, quality 4, portability 5, and novelty 3. They describe scope and source review, not measured benefits. No existing entry, collection membership, upstream pin, or evidence level was replaced or promoted. Admission does not install the skill in this checkout's active skill directory or a consumer project, nor activate hooks, accounts, studies, or services.

## Limited independent exercise

The skill-creator instructions recommend independent forward testing when complexity justifies it. Two independent subagents received the same [Fieldnote brief](human-interface-design-trial-2026-10-29/brief.md), an 800-word maximum, and a request for a proposed implementation-ready specification without code, browsing, product edits, or studies. Neither inherited this conversation. One used the new skill; the other used frontend-design currently installed in this session. They were told not to inspect research, decisions, or the other answer.

Retained artifacts:

- [New skill response](human-interface-design-trial-2026-10-29/answer-a.txt).
- [Installed frontend-design response](human-interface-design-trial-2026-10-29/answer-b.txt).
- [Input hashes, reference-read reports, settings and limitations](human-interface-design-trial-2026-10-29/metadata.json).

The brief supplied realistic design constraints and failure conditions. The following is the author's qualitative inspection of the returned specifications, not an automated score or blinded outcome judgment.

| Design concern | New skill response | Existing guidance response |
| --- | --- | --- |
| Destinations versus creation command | Separates Library/Collections from New record. | Also separates them. |
| Dense comparison and brand continuity | Preserves the labeled table and serif/warm-neutral identity. | Also preserves both. |
| Resizing and narrow capture | Adapts panes, retains comparison fields, preserves drafts and context. | Adapts layout and capture, retains comparison fields and return context. |
| Delayed and uncertain save | Separates pending, confirmed success, definite rejection and unknown outcome; identifies the unsettled reconciliation contract. | Also distinguishes those states and calls out the contract dependency. |
| Concurrent editing | Proposes version-aware writes and reviewed conflict resolution. | Also proposes conflict detection and explicit resolution. |
| Recovery and permanent deletion | Distinguishes archive Undo from irreversible collection deletion. | Also distinguishes them. |
| Evidence limits | Describes proposed checks without claiming runtime or participant validation. | Does the same. |

Both addressed the main concerns. Neither proves that its proposal works: suggested dimensions, storage, and API behavior need validation. Both propose typed-name confirmation for permanent deletion; that contextual proposal is not a universal skill rule. Both favor approximately 44 CSS pixel touch areas for web capture; that is a design choice, not a WCAG AA requirement.

The new-skill subagent reported reading the principles and platform references, not the review reference. That is consistent with a concept-specification task; it does not establish selective loading on other requests.

There is **no demonstrated superiority** in this exercise. Limitations include one run per arm, one written concept, no no-skill control, no implementation or participant outcomes, and review by the author with identities visible. The comparator is the locally installed frontend-design version, not the newer linked catalog revision. The collaboration tool did not return an exact runtime model ID, usage, cost, or full tool-read traces. Input hashes preserve which local guidance was used, but do not replace that missing evidence. This is not a matched host outcome benchmark and does not raise the evidence level.

## Validation and remaining work

The skill-creator quick validator checks the entrypoint. The catalog build and repository checks validate metadata, local resource closure, Markdown, generated indexes and the existing harness. These structural checks do not prove usability, activation or accessibility conformance.

Added eight [trigger cases](../../evals/cases/human-interface-design.yaml): web/desktop design, mobile recovery, screenshot review, branded page implementation and CLI interaction as positives; server-only optimization, a framework concept question and participant-note synthesis as negatives. The trigger suite is prepared but has not been run against a model.

Initial quick-validator attempts failed because the selected Python environments lacked PyYAML. The same validator subsequently passed with a cached PyYAML package on its process-local import path; no package was installed or dependency changed. The first full repository check encountered known sandbox restrictions on local fixture servers and temporary install locations. The permitted rerun passed type checking, Markdown lint, validation of 81 entries and seven collections, generated-index freshness, and all 96 tests. No plugin manifest changed.

Before claiming a preferred default or raising evidence, run repeatable triggers and matched implementation tasks across platforms with pinned host/model settings, retained traces, task-specific acceptance checks and independent review. Include a sound interface needing no redesign, a dense specialist workspace, screenshot-only limitations, interruption/recovery, and branded expressive design. Add real participants when the claim concerns human comprehension or population behavior.
