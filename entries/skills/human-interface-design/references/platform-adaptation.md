# Platform adaptation

Use this reference when choosing platform patterns, input behavior, layout adaptations, or numerical criteria. The shared design method applies across surfaces; implementation details depend on supported devices, framework versions, and the accepted design system. Sources last reviewed October 29, 2026.

## Web and responsive applications

Preserve meaningful URL, history, linking, refresh, and browser input behavior where the task warrants it. A filter or selection worth sharing or resuming may belong in navigable state; transient local control state may not. Do not turn browser Back into an unpredictable command or hijack a familiar shortcut without a strong reason.

Use semantic HTML and accepted accessible components before creating custom widgets. A role supplies meaning, not the interaction implementation. For composite widgets such as tabs, menus, and grids, use the relevant keyboard and focus pattern: Tab navigation and arrow-key navigation have different jobs. A visual CSS grid does not automatically warrant an ARIA grid.

Adapt to available space, text scaling, and input capability rather than assuming a narrow viewport means touch or a wide one means a mouse. Keep critical controls available without hover. A compact table may need column prioritization or a scrollable comparison region; replacing it with cards can make comparisons harder. Explain any information deferred from the compact presentation.

For an expressive website, preserve the intended story, imagery, type, and tone while making the next action and reading order clear. Test the layout with long content and motion preferences. An Apple-inspired method does not require Apple-style marketing composition.

## Handheld and touch-oriented applications

Account for reach, touch accuracy, orientation, keyboard occlusion, safe areas, and interrupted sessions as relevant. Keep the main task accessible without a precision gesture. A swipe shortcut can coexist with a visible action or an assistive action for the same operation.

Use the target platform's expected navigation and back behavior. Keep top-level destinations distinct from transient commands. Preserve entered work and current context when someone changes orientation, switches away, or returns from a permission prompt, according to the product's persistence requirements.

Use native text-scaling and appearance capabilities where available. A screen that technically enlarges text but clips the task's action has not preserved the experience. Test the content and controls together.

Consult [Designing for iOS](https://developer.apple.com/design/human-interface-guidelines/designing-for-ios) for Apple handheld conventions. On Android, preserve the app's Android/Material conventions and consult its platform guidance rather than importing an iOS component arrangement.

## Desktop and sustained work

Use larger and resizable spaces deliberately: simultaneous views, comparison data, inspectors, menus, toolbars, and panes can reduce navigation and modality. Choose density that supports the actual work. Touch-friendly spacing can be offered where needed without turning every specialist workspace into a phone layout.

Preserve keyboard commands, discoverable command names, selection, focus, and window behavior. Test narrow windows and text scaling as well as the ideal large display. Treat keyboard, pointer, touch, and assistive input as capabilities to support where relevant, not permanent device categories.

For a desktop editor, a useful design might retain a labeled layer list, central canvas, properties inspector, and Undo/Redo commands. A narrow layout can collapse an inspector into a reachable panel while preserving the active selection. The check is whether editing and recovery remain understandable, not whether all panes stay visible.

Consult [Designing for macOS](https://developer.apple.com/design/human-interface-guidelines/designing-for-macos) for Mac-specific windows, commands, and input expectations. Preserve Windows or other platform conventions when targeting those systems.

## Other interactive surfaces

Carry over the questions about purpose, orientation, feedback, control, and recovery. Adapt the representation to the modality: a CLI can communicate scope and completion through commands and output; a voice flow needs understandable choices and correction; a wearable needs appropriate brevity and input effort. Do not invent visual controls for a nonvisual interaction.

For wearables, television, kiosks, spatial interfaces, or embedded devices, establish viewing distance, input precision, time pressure, comfort, and environment first. Consult current official guidance for the target surface before choosing detailed sizing, focus, motion, or ergonomic rules. This reference supplies no universal spatial or embedded safety specification.

## Apply measurements in context

Select the relevant standard, platform unit, interaction area, and exception before declaring a defect. A visible icon and its interactive bounds may differ. Do not shrink an existing comfortable control simply because a source permits a smaller minimum.

| Context | Source-specific guidance | Interpretation |
| --- | --- | --- |
| iOS/iPadOS | Apple's accessibility table lists 44 × 44 pt default and 28 × 28 pt minimum control size. | Distinguish default from minimum and consider spacing, input, and task. |
| macOS | The same table lists 28 × 28 pt default and 20 × 20 pt minimum. | Desktop density and touch support need contextual decisions. |
| Android Compose | Official guidance specifies at least 48 dp touch targets. | Check actual interactive bounds and component behavior. |
| Web WCAG 2.2 AA, SC 2.5.8 | 24 × 24 CSS pixels, or an applicable exception, including the defined spacing alternative. | This criterion is not a universal comfortable touch-size recommendation. |

Points, dp, and CSS pixels are platform-specific coordinate units. Do not transfer their numeric values as though they express one interchangeable requirement. Prefer a useful control size over optimizing to an allowed exception.

For web text contrast under WCAG 2.2 SC 1.4.3, the usual minimum is 4.5:1; qualifying large-scale text uses 3:1, with the criterion's exceptions. Large-scale text is at least 18 point, or at least 14 point bold, or an equivalent size as defined by the standard. Bold weight alone does not qualify every text size. Apply non-text contrast criteria separately where relevant. APCA does not replace the WCAG 2.2 contrast calculation for a conformance claim.

Do not treat a different appearance mode as a blanket fix for an unreadable default. Check the applicable criteria and the actual colors in relevant states, including focus and selection. A contrast ratio does not establish the readability of the overall layout.

## Typography, materials, and motion

Use the project's typography and icon system when it fits; system fonts and familiar icons can reduce implementation and learning costs. Custom fonts can express the brand while text roles and scaling preserve hierarchy. Font sizes and tracking tables for one platform are not cross-platform design tokens.

Use surfaces to distinguish content, controls, and overlays. Apple's Liquid Glass is a native, adaptive material primarily for controls and navigation; arbitrary CSS blur does not reproduce that system. On other platforms, choose a surface treatment that preserves legibility and fits the product. Check transparent surfaces over real backgrounds and with relevant appearance preferences; use an opaque alternative when it works better.

Specify what motion communicates and how that meaning survives reduced motion. Avoid making people wait through repeated decorative transitions or requiring a moving cue to understand completion. Measure performance on supported environments when a technique is in question.

## Sources

- [Apple Accessibility](https://developer.apple.com/design/human-interface-guidelines/accessibility) and [Typography](https://developer.apple.com/design/human-interface-guidelines/typography).
- [Apple Materials](https://developer.apple.com/design/human-interface-guidelines/materials) and [Motion](https://developer.apple.com/design/human-interface-guidelines/motion).
- [Android Compose accessibility API defaults](https://developer.android.com/develop/ui/compose/accessibility/api-defaults).
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/), particularly SC 1.4.3, 1.4.11, and 2.5.8, and the [target-size explanation](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html).
- [WAI-ARIA Authoring Practices introduction](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/) and its component patterns. Test the relevant browser and assistive-technology combinations; example code alone does not establish compatibility.
