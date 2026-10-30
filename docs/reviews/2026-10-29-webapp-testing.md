# Web app testing with Playwright: human-focused assessment

Reviewed 2026-10-29 (America/Edmonton) by Codex, an AI curator. Rubric: [human-v1](../ratings.md). This is one curator’s source-based judgment, not independent human calibration or a behavioral evaluation.

Developers working on this task: Verifying or debugging frontend behavior headlessly, especially on hosts without a built-in browser. Declared hosts: any.

Comparison baseline and alternatives: Claude Code's Chrome integration and built-in browser, and browser MCP servers, cover interactive checks. This is the headless, scriptable option.

Use the already-running-app path where suitable; the server helper has documented pipe/readiness/cleanup limitations.

## Inspection and provenance

Pinned upstream revision: `b9e19e6f44773509fbdd7001d77ff41a49a486c1`. Exact file digests, source URLs, prior rating and inspection status are recorded under `webapp-testing` in the [assessment manifest](2026-10-29-catalog-assessment-sources.json). Linked source content was treated as data; no installer, upstream helper or integration was executed.

- [entries/skills/webapp-testing/SKILL.md](../../entries/skills/webapp-testing/SKILL.md) — read in full.
- [entries/skills/webapp-testing/scripts/with_server.py](../../entries/skills/webapp-testing/scripts/with_server.py) — read in full.

Other packaged or fetched files not inspected in this pass: `entries/skills/webapp-testing/LICENSE.txt`, `entries/skills/webapp-testing/examples/console_logging.py`, `entries/skills/webapp-testing/examples/element_discovery.py`, `entries/skills/webapp-testing/examples/static_html_automation.py`.

The grades cover the inspected core and relevant paths. Unread optional examples, adapters, licenses and conditional resources are not cleared by this assessment. Local or upstream tests were not run as behavioral evaluation.

## Grades

| Criterion | Grade (0–4) | Rationale |
| --- | ---: | --- |
| Practical value | 3 | Provides headless scripted checks when native tools are insufficient. |
| Dependability | 1 | Unread pipes, readiness assumptions and cleanup weaken the helper. |
| Cognitive ease | 2 | Reconnaissance helps; networkidle can stall hot-reload apps. |
| Human control | 2 | Starts shells/servers without a built-in permission boundary. |
| Adoption cost | 2 | Requires Python Playwright and browser installation. |
| Compatibility | 2 | Fixed paths and server ownership can conflict with projects. |
| Upkeep | 3 | Helper process management needs corrective maintenance. |

Aggregate: **5.3/10** · scoped blocker(s) remain. Weights are provisional editorial choices. Expected developer benefit and burden are predictions from the artifact, not measured outcomes.

## Evidence and limits

Evidence remains **reviewed**. This pass adds no activation, installation or matched-outcome evidence. Existing records, where present, cover only the scope they describe. Host overlap is compared with the recorded catalog alternatives; this is not a fresh audit of every host release.

Previous curator notes, retained as history rather than newly verified facts: Proportional, with a clear decision tree. It requires Python Playwright. Its with_server.py helper starts servers, which conflicts with projects that forbid agents from starting dev servers. Say so when recommending it. One example writes to a fixed /mnt path. with_server.py pipes server output it never reads, so a chatty server can stall and its errors stay hidden; networkidle may never settle with hot reload.

Scoped blockers:

- **scripts/with_server.py server-management path:** Server stdout/stderr are piped but never drained; chatty servers can block and hide errors. Shell-only termination may also leave descendants. Avoid this helper until corrected or independently managed.

## Disposition and next evidence

Refresh affected paths; retain the entry with explicit blockers. No payload, installation policy, hooks or tool connections are changed by this rating.

Correct or independently verify the affected recipe/policy before using that path. A useful next trial would compare the intended task with the named baseline, recording completion, correction effort, interruptions, comprehension and retained human control. Revisit the grades after material source/host changes or consequential failures.
