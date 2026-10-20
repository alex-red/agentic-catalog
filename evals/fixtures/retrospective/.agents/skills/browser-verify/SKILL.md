---
name: browser-verify
description: "Check user-visible changes in the app already open in the Browser pane. Use after changing a screen or interaction, or when asked to check whether a UI change works. Do not use for backend-only changes or explanations that need no app check."
license: MIT
---

# Browser verification

Use the browser pane that is already open; do not navigate to or invent a local URL. The user's dev server is normally running there.

1. Inspect the screen affected by the change.
2. Exercise the changed interaction with the relevant state or data.
3. Check the visible result, including any nearby layout or state that could regress.
4. If the app or browser pane is unavailable, report the visible behavior as unchecked and name the quickest check. Do not start or rebuild the app unless the user authorizes it.

Keep the check focused on the requested change and report what you observed.
