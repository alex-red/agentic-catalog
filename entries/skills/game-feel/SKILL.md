---
name: game-feel
description: Improve the responsiveness, readability and impact of existing gameplay actions through timing and audiovisual feedback. Use for weak hits, jumps, pickups, camera effects or feedback polish; not implementing combat rules or redesigning menus alone.
---

# Game feel

Make an action's cause, outcome and recovery perceptible without obscuring play. Preserve the intended tone and existing control behavior; more effects do not automatically produce better feedback.

## Diagnose the event

Identify the action, expected response and observed problem. Inspect input-to-action timing, anticipation, contact, outcome and return to control. A delayed controller, incorrect collision, missing sound and unreadable damage event need different fixes. Reproduce the problem before adding presentation over a simulation defect.

Use the actual play camera, representative action frequency and supported input method. A dramatic single hit can become tiring or confusing when repeated hundreds of times.

## Choose feedback that carries information

Assign feedback to the event's meaning: confirmation, damage, defense, interruption, pickup, failure or a major milestone. Start with the few channels that communicate it clearly, such as a pose change, sound, local effect, displacement or HUD response. Add channels only when they improve the intended reading.

Differentiate routine actions from consequential events through proportionate timing, intensity and duration. Preserve important enemy tells, hit boundaries, player silhouettes and interface state. Feedback should not imply damage, success or invulnerability that the rules did not grant.

Choose curves and rhythm for the action. Linear motion can be appropriate for a steady signal; easing, anticipation and overshoot serve other intentions. Treat durations, amplitudes and effect counts as tuning parameters, not universal recipes.

## Keep ownership and recovery explicit

- Attach presentation to well-defined events; avoid firing impact feedback every frame of a sustained input unless that is the intended effect.
- Move a visual pivot or camera effect without displacing collision bodies solely to create shake. Account for aiming and camera ownership.
- Handle overlapping effects deliberately: combine, cap, replace or queue them according to meaning. Restore the correct baseline when the owner stops, a scene changes or an effect is cancelled.
- Do not default to global time changes for hit-stop. In multiplayer, presentation usually needs a local treatment that preserves authoritative simulation. In a single-player implementation that changes shared time state, coordinate ownership with pause and slow-motion systems and use a suitable unscaled completion mechanism. Restoring a literal normal speed can overwrite another system's state.
- Keep input handling and buffering consistent with the game's intended control model. A dramatic response must not accidentally swallow commands or extend lockout.

Do not introduce a tween library, camera package, global event bus or engine switch solely to add feedback. Use the project's existing tools and verify target-version APIs when implementation is required.

## Tune for repeated use and access

Offer appropriate controls for camera motion and flashing, and test the reduced-effects state. Preserve essential information through alternate channels; disabling shake should not erase the only damage cue. Avoid relying on a generic flash-rate rule as proof of photosensitivity safety; assess the actual effect and relevant platform guidance when that claim matters.

Compare the action with effects disabled and enabled. Check recognition, apparent timing, return to rest, rapid repetition, concurrent impacts, pause/resume and transitions. Inspect at gameplay scale and in motion, not only in a screenshot.

Report what changed, its intended information or feeling, what was observed and any unresolved input, lifecycle or accessibility issue. Developer or agent inspection verifies the observed behavior; claims about player comfort or satisfaction need suitable player evidence.
