---
name: level-design
description: Design or review playable maps, encounter spaces and traversal through measured movement, blockouts, gates and player observation. Use for level layout, platform spacing, encounter pacing, farming routes or wayfinding; not engine tilemap API work alone.
---

# Level design

Connect the intended player experience to traversable space. Use the game's existing movement, camera, genre and visual conventions; an authored challenge, repeatable farming map and social hub need different layouts.

## Establish the spatial task

Identify what the space must support: traversal, combat, exploration, gathering, teaching, repeated optimization or meeting other players. Establish the entry and exit conditions, expected capabilities, input methods, camera and relevant failure/recovery rules from the brief or build.

Measure the controller in a simple test space before treating theoretical distances as build constraints. Include standing versus running jumps, partial input, air control, collider clearance, landing height, slopes and camera visibility where relevant. Record a useful capability range rather than designing every required move at the best-case limit. If movement is still changing, mark dependent geometry for recheck instead of freezing discovery prematurely.

## Block out the consequential geometry

Use inexpensive geometry or tiles to expose reachability, sightlines, camera behavior and encounter decisions. Keep landmarks, silhouettes or audio when they are part of the test; expensive decoration can wait until the layout supports the intended behavior.

Think of the layout as connected spaces and transitions. Trace entry to goal, optional branches, loops, checkpoints and returns. For gated routes, track which abilities, keys or world states are obtainable before each gate. Simple connectivity is insufficient: consumable keys, one-way movement and mutually exclusive choices require reasoning about reachable states and recovery.

Size combat spaces against attack reach, enemy movement, crowding, escape options and camera coverage, not traversal alone. Inspect whether terrain creates choices, accidental safe exploits, unavoidable damage or options available only to one build. An intended specialist advantage differs from excluding other supported characters.

## Shape attention and encounters

Choose encounter and rest beats to support the game's intent. A rising tension curve is one option; a hub may favor calm recognition, and an open world may offer several difficulty routes. Do not force a boss climax or a single golden path into every space.

When teaching is intended, let players perceive a mechanic, try it, then apply it in a changed context. Make any deliberate surprise distinguishable from an unreadable hazard. Consider retry cost and what the player can learn from failure.

Guide through visible connections, composition, landmarks and consistent signals. Test these under the actual camera and supported display/input conditions. Avoid making color or sound the only carrier of required information. Signpost irreversible transitions when informed commitment matters.

For repeatable 2D grinding routes, read [platform maps and farming loops](references/platform-maps.md). Load it only when route execution, spawn layout or shared farming space is the design problem.

## Observe and revise

Test the route with supported capabilities, including failure, optional paths and recovery. Record where players or the test agent become lost, miss a jump, take unavoidable damage or exploit terrain. Distinguish measured behavior from predicted pacing and human observation from automated traversal.

Change the smallest relevant spatial variable, then revisit affected encounters and gates. When the controller or camera changes, recheck dependent geometry. Report the intended experience, consequential layout choices, evidence, unresolved constraints and next useful observation. A reachable map is not yet proof that the level is enjoyable.
