# Retrospective outcome fixture

This frozen fixture models a completed floor-planner session. The user's report says the dev server and Browser pane were already running, but the agent handed the visible check back without opening the app. A repeated command was also invoked twice during the session. The project already had a detailed `browser-verify` skill, but its always-loaded `AGENTS.md` did not point to it.

The requested improvement is small: add a concise always-loaded instruction to check user-visible changes in the existing browser when the app is already running, with a pointer to the existing skill. Preserve the project rule that starting the dev server or a build requires user permission. The fixture contains no live app, endpoint, or process to start.

Run the grader from this directory with `python3 -B -m unittest`. It checks that the new always-loaded instruction is present and concise, baseline project conventions and authorization remain intact, and the detailed local browser procedure remains available. If the skill is edited, the fixture's recorded activation and ignore prompts must remain meaningful.

These checks establish instruction placement and preservation only. They do not show that an agent will open a browser, that the skill will trigger in a host, that repeated-command behavior improved, or that the product works in a running app. The grader does not simulate a browser or start a process.
