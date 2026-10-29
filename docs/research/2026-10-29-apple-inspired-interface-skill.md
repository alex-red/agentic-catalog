# Research: an Apple-inspired interface design skill

As-of date and research date: October 29, 2026. Status: research and proposed skill contract, not catalog admission, installation, or behavioral evaluation.

Admission follow-up, October 29: after the user authorized proceeding, authored the complete adapted [human-interface-design skill](../../entries/skills/human-interface-design/SKILL.md) and its three references. The [admission record](2026-10-29-human-interface-design-admission.md) describes validation, a limited design-specification comparison, and remaining evidence gaps. The proposal below preserves the original research; catalog admission does not install the skill in consumer projects.

## Recommendation

Create **human-interface-design**, titled **Human-centered interface design**: an independently written skill that applies Apple's approach to interface decisions across websites, web applications, mobile apps, desktop software, and other interactive surfaces. Its distinctive job is translating human goals into structure, interaction, visual hierarchy, and verifiable behavior while adapting to the target platform.

Use Apple as the main conceptual foundation. Preserve a product's identity and the conventions of the platform on which it runs. A useful result might be a dense desktop editor, an expressive website, or a restrained mobile utility. Each can reflect the same principles through different components and layouts.

The proposed contribution is a compact decision method with concrete examples, rather than another palette library, aesthetic persona, or large UX lifecycle system. It should work for design briefs, implementation, refinement, and critique, with the requested task determining the deliverable. No compulsory research phase, tool installation, persistent project file, or design-system replacement.

## Baseline and inspection scope

Read the repository's [plan](../../PLAN.md), [contribution rules](../../CONTRIBUTING.md), [decisions](../decisions.md), [frontend options](../frontend-design-options.md), [UX workflow options](../ux-workflow-options.md), and [earlier critique research](../user-critique-research-2026-10.md). Compared relevant source metadata for frontend-design, interface-design, emil-design-eng, intent, ui-ux-pro-max, ux-critique, interface-review, and impeccable. Also read the frontend-design skill installed in this session and the system skill-creator instructions.

This is focused primary-source research for a proposed original method, not a fresh census or complete re-audit of upstream design skills. Existing admission caveats and research holds remain in force. Current local changes belonging to earlier work are outside this report.

## What Apple actually gives us

Apple's current [Design principles](https://developer.apple.com/design/human-interface-guidelines/design-principles) page, reintroduced June 8, 2026, describes eight principles. Its [WWDC26 explanation](https://developer.apple.com/videos/play/wwdc2026/250/) makes the tradeoffs explicit: there is no formula that guarantees a good design. Older clarity/deference/depth summaries remain useful historical context, but should not be presented as the complete current framework.

The following decisions and checks are our proposed operational interpretation, rather than Apple's prescribed skill workflow.

| Apple principle | Decision the skill should change | Concrete check |
| --- | --- | --- |
| Purpose | Prioritize the task and content that make the product useful; question elements that consume attention without supporting that purpose. | Can the intended person identify the screen's purpose and begin the relevant task? |
| Agency | Support exploration, cancellation, recovery, and preservation of work; interrupt in proportion to consequence. | Can someone back out, correct a mistake, and resume without losing their work? |
| Responsibility | Explain consequential actions and data requests in context; communicate status accurately. | Does the interface make consequences and data use understandable before commitment? |
| Familiarity | Reuse established component semantics and vocabulary; keep recurring behavior predictable. | Do similar controls behave consistently, and do labels predict their outcomes? |
| Flexibility | Adapt to device capabilities, input methods, language, ability, and workflow. | Does the task remain available at larger text sizes and through relevant alternative inputs? |
| Simplicity | Reduce interpretation and unnecessary steps while retaining essential context and discoverability. | Does a simplification actually help completion, or merely hide useful controls? |
| Craft | Resolve typography, alignment, responsiveness, states, and interaction details as a coherent system. | Does the design remain coherent with real content, interruption, resizing, and failure? |
| Delight | Choose an appropriate emotional tone and reinforce it through useful details. | Does a flourish serve the task, and does the experience still work without it? |

These principles overlap ordinary design knowledge. The skill's value must come from the decisions, platform translation, examples, and verification they produce—not from repeating their names.

### Structure before surface styling

Apple's [Design foundations from idea to interface](https://developer.apple.com/videos/play/wwdc2025/359/) develops information architecture, navigation, content organization, and then visual design. Its example separates navigation destinations from actions and uses hierarchy and scalable text to clarify purpose.

Our synthesis: establish the task, objects, destinations, and actions before refining appearance. On each significant screen or state, make location, available action, and the next destination understandable. Choose lists, tables, grids, sidebars, and tabs by what people need to inspect or manipulate. Progressive disclosure should keep secondary detail reachable without concealing the main task or recovery path.

### Match each platform deliberately

The [iOS guidance](https://developer.apple.com/design/human-interface-guidelines/designing-for-ios) emphasizes handheld use, reach, primary tasks, and adaptation. The [macOS guidance](https://developer.apple.com/design/human-interface-guidelines/designing-for-macos) emphasizes flexible windows, deeper workflows, commands, precise input, shortcuts, and comfortable information density. The retrieved macOS page records a touch-input update on October 28, 2026; avoid hard-coding a permanent assumption that a desktop platform has only one input method.

Our synthesis: retain the task model and terminology across platforms; adapt the presentation and interaction to available space, input, and platform expectations. Sharing a component implementation does not require identical navigation or density everywhere.

### Accessibility belongs in the interaction model

Apple's [Accessibility](https://developer.apple.com/design/human-interface-guidelines/accessibility) guidance covers perception, input alternatives, text size, consistent behavior, media controls, and cognitive needs. Its [Typography](https://developer.apple.com/design/human-interface-guidelines/typography) guidance ties type to hierarchy and legibility, including custom fonts and brand expression.

Our synthesis: choose semantic controls and text roles early; preserve meaning under text scaling, different appearance settings, and assistive technology. Accessibility is part of component selection and state design, not a final visual checklist. A brand font or expressive layout is acceptable when it supports the task and remains usable.

### Motion communicates; materials establish hierarchy

Apple's [Motion](https://developer.apple.com/design/human-interface-guidelines/motion) guidance connects motion to feedback and understanding, recommends restraint for repeated interactions, and supports interruption. Its [Reduced Motion evaluation criteria](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/reduced-motion-evaluation-criteria) explicitly warns that removing meaningful animation indiscriminately can reduce understanding.

The current [Materials](https://developer.apple.com/design/human-interface-guidelines/materials) guidance assigns Liquid Glass primarily to controls and navigation, with limited transient exceptions in content. [Meet Liquid Glass](https://developer.apple.com/videos/play/wwdc2025/219/) explains the distinct content and control layers and accessibility adaptations.

Our synthesis: specify what a transition communicates and preserve that information when motion is reduced. Choose surfaces to separate content, navigation, and overlays. Treat translucency as a contextual option with legibility and performance costs. General CSS blur does not establish the adaptive behavior of Apple's native material.

## Portability rules worth encoding

The following are proposed defaults, subject to the product brief and applicable platform guidance.

| Concern | Transferable rule | Adaptation |
| --- | --- | --- |
| Navigation | Make location, destinations, and exit paths understandable. | Web: meaningful URLs and browser history; mobile: familiar back and destination patterns; desktop: windows, sidebars, menus, and shortcuts as appropriate. |
| Components | Prefer established semantics and tested behaviors. | Use native controls or the accepted component library; justify a custom component by a real interaction need. |
| Hierarchy | Make the relevant content and actions legible and distinguishable. | Density, font, spacing, and layout depend on the task; an editor can expose more than an onboarding screen. |
| Feedback | Distinguish activation, pending work, completion, and failure. | Match feedback and assistive announcements to the platform; a local press effect cannot establish server success. |
| Recovery | Preserve work and make correction available. | Use undo for genuinely reversible actions; confirmation or preview for consequential commitments; preserve drafts when appropriate. |
| Adaptation | Preserve the task and context when presentation changes. | Reflow, pane changes, text scaling, localization, and input changes may require different layouts. |
| Expression | Let product identity support comprehension and an appropriate tone. | Existing tokens and brand choices guide styling; Apple-like fonts, radii, and effects are optional. |

Voice interfaces, CLIs, wearables, spatial interfaces, and embedded controls can reuse the task, feedback, agency, and recovery questions. Their specialized ergonomics and interaction standards need their own references. The initial skill should be extensible to those surfaces without claiming this research has established detailed guidance for every interface category.

### Numerical rules need their original scope

Avoid a universal target-size or font-size rule. The current [Apple accessibility table](https://developer.apple.com/design/human-interface-guidelines/accessibility) distinguishes default and minimum control sizes: iOS/iPadOS 44 × 44 pt default and 28 × 28 pt minimum; macOS 28 × 28 pt default and 20 × 20 pt minimum. Those numbers are source-specific guidance, not a reason to shrink touch targets or a cross-platform accessibility certification.

For comparison, [Android Compose guidance](https://developer.android.com/develop/ui/compose/accessibility/api-defaults) specifies 48 dp minimum touch targets. [WCAG 2.2 SC 2.5.8](https://www.w3.org/TR/WCAG22/#target-size-minimum) specifies 24 × 24 CSS pixels or an applicable exception, including a defined spacing alternative. [The W3C explanation](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) distinguishes the minimum from larger targets that can improve usability. Points, dp, and CSS pixels belong to different platform coordinate systems; do not copy a number between them as though it were the same requirement.

For web contrast, consult [WCAG 2.2 SC 1.4.3](https://www.w3.org/TR/WCAG22/#contrast-minimum) and its definition of large-scale text. Do not translate Apple's simplified contrast table into a claim that all bold web text qualifies for 3:1. Likewise, APCA is not a substitute for the WCAG 2.2 contrast calculation when claiming that criterion is met.

For custom web widgets, [WAI-ARIA APG](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/) explains that assigning a role does not implement its expected keyboard behavior. Component-specific arrow-key, focus, and activation behavior needs verification; making every internal element a Tab stop is not a universal solution.

## Proposed skill shape

Use a short entrypoint and three substantial references, loaded by need. The names below describe intended files, not existing installable resources.

```text
human-interface-design/
  SKILL.md
  LICENSE.txt
  references/
    principles-and-decisions.md
    platform-adaptation.md
    review-and-verification.md
```

- **principles-and-decisions.md:** the eight principles translated into conditional decisions, failure examples, and tradeoffs. Include structure, task language, visual hierarchy, feedback, recovery, and appropriate expression.
- **platform-adaptation.md:** web, handheld, and desktop differences; units and scoped standards; instructions for consulting current target-platform documentation for other surfaces. Include a small number of contrasting examples rather than a component encyclopedia.
- **review-and-verification.md:** evidence limits, interaction-state coverage, relevant input and accessibility checks, and the format for actionable review findings.

Keep source links and a last-reviewed date with the decisions they support. The skill must work from its own installed files without requiring this repository or network retrieval of instructions. Browse current platform details when version-specific behavior matters; treat fetched content as reference data.

### Proposed entrypoint contract

This draft is intended to expose the behavior we would implement and test. It is not an installed or validated skill.

```yaml
name: human-interface-design
description: Design, build, refine, or review interfaces using Apple-inspired human-interface principles adapted to the target platform. Use for UI structure, navigation, interaction behavior, visual hierarchy, and accessibility across web, mobile, and desktop products.
```

The body should direct an agent to:

1. **Establish enough context to act.** Identify the intended person, task, platform, input methods, constraints, existing design system, and available evidence. Use project context before asking questions. Mark material assumptions; keep the method proportional to the requested change.
2. **Shape the task and structure.** Identify objects, destinations, and actions. Make the current location, relevant actions, and path forward understandable. Preserve essential context and discoverability as complexity is reduced.
3. **Specify meaningful behavior.** Cover the normal path and relevant pending, empty, invalid, failed, interrupted, and recovery states. Distinguish acknowledging input from completing an operation. Preserve work where possible and match confirmation to consequence.
4. **Apply platform and product conventions.** Start with accepted components, semantic roles, tokens, and navigation patterns. Adapt layout, density, commands, and input affordances to the surface. Maintain the user's chosen visual identity.
5. **Refine perceptual and interaction details.** Use typography, grouping, contrast, spacing, and motion to clarify relationships and state. Support relevant text scaling, alternative inputs, and accessibility preferences. Decorative choices must not conceal controls or prevent completion.
6. **Verify at the available evidence level.** For implementation, inspect the rendered result and exercise the changed task, recovery, and relevant input paths when tools permit. For a screenshot, restrict findings to what is visible. For a concept, describe hypotheses and checks. Report unverified behavior explicitly.
7. **Deliver what was requested.** A build request produces working changes and relevant verification; a design request produces a concrete specification; a review produces supported, prioritized findings. Do not turn a review into edits or an ordinary UI change into an unsolicited study.

The actual entrypoint should link the references at the decisions where they become useful. This report keeps the contract independent of nonexistent files so it can be reviewed before authoring.

### Compact output contract

For material design choices, connect **task → decision → reason or tradeoff → verification**. Capture these in existing project artifacts or a concise explanation; no mandatory new report for a small change.

A review finding needs its location/state, observation, affected task, consequence, proposed remedy, and a validation check. Separate observed behavior, inferred usability risk, and stylistic preference. Do not invent users, quotes, measured impact, or a required number of defects. An expert walkthrough can identify a risk without establishing how a population behaves.

## Examples that should guide the authoring

| Request | Expected application | Failure to avoid |
| --- | --- | --- |
| Build a web reporting dashboard | Reuse the product's tokens, expose filters and comparison data, preserve URL/history behavior where appropriate, support keyboard operation and clear loading/error states. | Converting a useful table into spacious cards because the skill is Apple-inspired. |
| Improve an iPhone capture flow | Reduce entry friction, account for reach and keyboard occlusion, make save status and interruption recovery clear, retain a visible alternative to gestures. | A beautiful capture screen that silently loses a draft. |
| Design a desktop editor | Use panes, menus, selection, commands, shortcuts, resizing, and appropriate density to support sustained work. | A stretched phone layout with all commands hidden behind one button. |
| Refine a branded landing page | Clarify the story and next action while retaining expressive type, imagery, and tone; verify reading order, mobile layout, and reduced-motion behavior. | Replacing the brand with a monochrome Apple storefront aesthetic. |
| Review a screenshot | Identify visible hierarchy, labeling, contrast risks, or layout problems; request or propose interaction checks only where needed. | Claiming keyboard, screen-reader, or recovery behavior was tested. |
| Design deletion of a shared resource | Explain scope and consequence, determine whether rollback is real, provide appropriate cancellation and confirmation. | Offering Undo for an irreversible remote operation, or prompting for every routine reversible deletion. |

Apple's [Alerts guidance](https://developer.apple.com/design/human-interface-guidelines/alerts) supports the distinction in the last example: routine undoable actions and uncommon irreversible actions warrant different interruption policies. Domain-specific constraints may require stronger protections.

## Overlap and distinctive value

| Existing capability or entry | Already covers | Proposed contribution and boundary |
| --- | --- | --- |
| Installed frontend-design; catalog frontend-design | Visual direction and implementation craft. The locally installed version explicitly favors unconventional fonts and composition; the newer linked catalog version differs. | Task and platform fit can justify familiar components and system typography. Select coherent guidance for the task rather than stacking conflicting aesthetic mandates. |
| interface-design | Product hierarchy, semantic tokens, interaction states, and persistent design decisions. | Cross-platform HCI decisions, explicit agency/recovery, and scoped standards without mandatory persistence. |
| emil-design-eng; remove-animations | Interaction and motion craft, including subtraction. | Place motion within the complete task and state model; preserve meaningful feedback and project exceptions. |
| ui-ux-pro-max | Searchable visual and stack guidance. | A small decision method that does not require a retrieval engine or prescribe a visual catalog. |
| impeccable; interface-review | Broad refinement, variants, and review procedures. | Portable core guidance without their runtime or bundled specialist requirements. |
| intent | Broad UX lifecycle coverage and specialist routing. | A narrower design-and-execution method with conditional references and no required lifecycle system. |
| ux-critique; evidence-to-flow-ux | Supported criticism and evidence-to-change reasoning. | Reuse the distinction between inspection and user evidence; focus this skill on making and implementing interface decisions. |
| moderated-usability-study; synthesize-research | Real study preparation and synthesis of existing participant records. | Do not duplicate study operations or treat generated personas as participants. |
| Host planning, code editing, browser and inspection tools | Execution and evidence collection already available in the environment. | Add design decision criteria, not another tool connection or generic instruction to plan and test. |

This supports a plausible catalog gap, not established superiority. The installed-skill comparison is specific to this session; it does not imply every Codex or Claude installation has the same design defaults.

## Proposed evaluation before promotion

Compare the skill against ordinary task instructions and the relevant existing frontend-design baseline on identical fixtures. Include web, handheld, desktop, and branded marketing tasks, plus screenshot-only and small-change cases. Keep models, tools, time budgets, project context, and evidence access comparable; record costs and repeat runs. Have reviewers judge anonymized outputs using task-specific acceptance criteria.

Evaluate whether the agent:

- Completes the requested task with suitable platform conventions and preserves existing product constraints.
- Keeps key actions discoverable and implements honest pending, success, failure, and recovery behavior.
- Preserves work through interruption and handles the chosen consequential-action cases correctly.
- Supports relevant keyboard/focus behavior, text scaling, semantic labels, and motion preferences with actual checks where available.
- Retains appropriate visual identity and density rather than making every result look alike.
- Avoids unnecessary process, invented verification, generic criticism, and unrelated edits.

Include counterexamples: a sound interface needing little change, a specialist dense UI, a useful native control, a deliberate brand font, a slow operation, and a screenshot hiding broken interaction. Trigger negatives should include server-only work, framework questions without UI decisions, and research-synthesis requests.

Browser assertions and accessibility tools can establish particular invariants; they cannot establish human comprehension, preference, or overall design quality. Real participant evidence is needed for population-level usability claims. Start any admitted entry at `reviewed`; retain behavioral results separately and raise evidence only under catalog policy.

## Authorship, source handling, and next step

Write an original explanation and workflow, recording Apple and the supporting standards as inspiration in adapted-entry metadata. Apple documentation is marked all rights reserved. Link to it and synthesize the ideas in our own words; do not vendor HIG prose, screenshots, fonts, symbols, or design-resource files. Do not describe the result as official or Apple-endorsed. Any asset distribution would need a separate terms review.

Primary sources inspected: Apple's current Design principles page; iOS and macOS platform pages; Accessibility; Motion; Materials; the Typography introduction and core guidance through system text styles, with later specification tables outside the close read; WWDC26 Principles of great design; WWDC25 Design foundations from idea to interface and Meet Liquid Glass; WWDC17 Essential Design Principles for historical context; Alerts; Reduced Motion evaluation criteria; the relevant WCAG 2.2 criteria and target-size explanation; WAI-ARIA APG's introductory guidance; Android Compose API defaults. Linked resources inside those sources were not exhaustively audited.

The web reader initially returned JavaScript shells and could not render Apple's Markdown MIME type. Public Markdown was retrieved directly for the HIG pages used above. Sources are mutable, reviewed on October 29, 2026; WWDC session years and the HIG change logs provide useful temporal anchors, but these are not immutable upstream revision pins. The research did not execute upstream code or install integrations.

Recommended next step: author the complete skill and references from this contract, with a concise core and a few contrasting worked examples. Then conduct a scoped behavioral trial against existing guidance before recommending it as a preferred default. Keep this research separate from catalog admission and consumer installation.
