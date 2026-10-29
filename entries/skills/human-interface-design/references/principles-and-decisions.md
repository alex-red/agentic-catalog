# Principles and decisions

Use this reference for a new interface, a substantial redesign, or a disputed design choice. These are decision aids, not a scorecard or a required sequence. The eight principle names follow [Apple's design principles](https://developer.apple.com/design/human-interface-guidelines/design-principles); the operational guidance and examples below are our synthesis. Sources last reviewed October 29, 2026.

## Purpose: prioritize what the person came to do

Identify the task, the content or object it acts on, and what successful completion means. Let those determine the screen's hierarchy. A product name and decorative hero may communicate identity without explaining the current task; a useful title, selected destination, or object summary can supply the missing context.

Separate destinations from commands. A destination holds content or an ongoing workspace; a command creates, changes, or acts on something. Put contextual commands near the relevant object or in a familiar command surface. A prominent command can be appropriate without becoming a navigation tab.

Choose representation by the work. A table supports comparing the same attributes across records; a list supports scanning labeled items; a grid supports visual recognition. Do not turn comparison data into cards just to create whitespace. For a discovery-oriented product, browsing itself may be the primary task.

## Agency: make exploration and correction affordable

Keep exit, cancel, back, and recovery behavior predictable. Preserve selection, filters, scroll context, and drafts when appropriate as people move or resume work. Distinguish closing a view from abandoning data.

For a save or submission, decide what the interface can honestly promise. A press state acknowledges activation; pending status indicates ongoing work; a confirmed result establishes completion. A failed request should leave a useful recovery path. If success is uncertain, reconcile status before encouraging a retry that could duplicate the effect. Optimistic updates need a defined failure and reconciliation behavior.

Match interruption to consequence. Routine reversible deletion may need accessible Undo rather than a modal. Permanent deletion of a shared resource may need an explicit scope, preview, or confirmation. An Undo label must correspond to a real restoration mechanism, with its limits explained where material. Do not hide the only recovery control in a rapidly disappearing toast.

## Responsibility: make consequences understandable

Request permissions and personal information when their purpose becomes relevant; explain what the person gains and what is needed. Keep refusal and later changes understandable. Reuse the platform's permission flow instead of imitating it with a misleading custom prompt.

Describe consequential actions in the language of their effect: for example, whether deletion affects the person's view or everyone's resource. Pending, failed, partial, and completed operations must remain distinguishable. For AI suggestions, distinguish generated proposals from confirmed facts or committed changes when that distinction affects a decision.

Apply these choices to the actual product risk. A harmless preference toggle does not need the same ceremony as an irreversible transaction.

## Familiarity: preserve meaningful conventions

Keep recurring labels, icons, placement, and behavior consistent. Use the destination platform's familiar controls and navigation expectations. A component library can provide a good starting point, but inspect its configured behavior rather than assuming its name guarantees accessibility.

An icon's novelty rarely helps someone predict a common action. Keep unfamiliar icons labeled where their meaning is not established. A link, toggle, disclosure, and command have different contracts even when they share visual styling.

Familiarity does not require visual sameness. Brand expression can live in typography, imagery, color, tone, and composition while common interactions retain predictable meaning.

## Flexibility: preserve the task through change

Consider the supported contexts that can alter the design: smaller windows, larger text, long names, localization, right-to-left content, another input device, assistive technology, or interruption. Prioritize the ones that matter for this task. Reflow or replace a layout when squeezing it would make the task unusable.

Offer a visible or assistive alternative to an essential drag, hover, swipe, or multi-point gesture. Keep the underlying operation consistent across those paths. Personalization can help specialist workflows, but it should not compensate for an unusable default.

## Simplicity: lower effort while retaining useful information

Reduce redundant choices, vague wording, repeated entry, and unnecessary transitions. Group related information and make the relevant action clear. Reveal secondary detail when needed while keeping its entry point discoverable.

Minimal appearance alone does not establish simplicity. Hiding every command in one menu can increase recall and navigation effort. Removing a field label can make a short form harder to understand. A status label or preview may add an element while reducing uncertainty.

For comparison tasks, clarity can mean aligned columns, stable units, persistent headers, and visible filters. For an unfamiliar one-off flow, it can mean guidance and a focused sequence. Avoid universal limits on visible controls or steps.

## Craft: resolve details under real conditions

Use a coherent set of semantic text, spacing, color, surface, and component roles. Preserve existing tokens; introduce new roles only when the design needs a distinction the system cannot express. Test with realistic content rather than only ideal short labels and empty space.

Review hierarchy with actual type, data, and states. Check whether primary content competes with chrome, whether secondary text remains legible, and whether focus and disabled/pending states remain distinguishable. A successful build does not establish that a layout holds together.

Use motion to explain origin, continuity, hierarchy, or state. Keep it interruptible where possible and economical for repeated actions. If reducing motion removes the explanation, supply a quieter transition or persistent cue. Measure rendering cost before attributing a performance problem to a particular animation technique.

## Delight: choose an appropriate emotional tone

Decide what fits the experience: confidence in an editor, calm in a reading tool, energy in a game, or curiosity on a discovery page. Refine the details that support it. Saved work, a clear error, and a smooth resumption can carry as much character as an illustration.

Expressive typography, unusual composition, and playful motion can be appropriate when the brief calls for them. Preserve readability, relevant controls, and an effective path with motion reduced. Do not add decorative effects merely to demonstrate that a design principle was applied.

## Worked contrast: one library, two surfaces

A media collection app on a phone can prioritize quick recognition, reachable item actions, and a focused detail view. Its desktop companion can expose a sidebar, sortable columns, multi-selection, and keyboard commands for collection management. Both preserve the same object names, save status, and recovery semantics. Sharing those contracts matters more than forcing identical layouts.

## Supporting sources

- [Principles of great design, WWDC26](https://developer.apple.com/videos/play/wwdc2026/250/): principle tradeoffs, contextual flexibility, and simplicity beyond minimal appearance.
- [Design foundations from idea to interface, WWDC25](https://developer.apple.com/videos/play/wwdc2025/359/): structure, navigation, content organization, and visual hierarchy.
- [Alerts](https://developer.apple.com/design/human-interface-guidelines/alerts): actionable interruptions and reversible versus irreversible actions.
- [Motion](https://developer.apple.com/design/human-interface-guidelines/motion) and [Reduced Motion evaluation criteria](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/reduced-motion-evaluation-criteria): purposeful feedback and alternatives that preserve understanding.
