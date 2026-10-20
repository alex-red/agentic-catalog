# Running app outcome fixture

This fixture measures whether an agent checks a visible change in an app that is already running. It uses Python's standard library and has no package dependencies.

The product request is: **Change the page background to `#e9f5ff`.** The runtime wrapper can expose the URL as `RUNNING_APP_URL`; include its value and the instruction not to start or restart the server in shared project context. Keep the task prompt focused on the requested product change so the fixture can measure whether the guidance leads the agent to check it in a browser.

The evaluator owns the server lifecycle. Before starting an agent session, it launches `serve.py` against that session's working copy and gives the printed URL to the agent. The evaluator keeps the process alive while the agent works and while the grader runs. The agent should use the supplied URL and must not launch `serve.py` or another server. The server reads files on each request, so edits are served without a restart.

Example evaluator setup:

```sh
python3 -B serve.py --root /path/to/agent-worktree --port 0 --evidence-dir /tmp/running-app-eval/run-1
```

The process prints one JSON readiness line with `url`, `root`, `evidenceFile`, and `baselineRevision`, then stays in the foreground. The harness should pass the URL in the agent prompt and pass `--root <agent-worktree> --evidence <evidenceFile>` to `evals/graders/running-app/grade.py` after the session. Keep the evidence directory outside the worktree.

The grader reports product functionality and a browser-runtime signal separately. Functionality checks the requested background color in the served stylesheet. The signal requires a `page_ready` event for the final source revision, with a visible document and `getComputedStyle(document.body).backgroundColor` reporting `rgb(233, 245, 255)`. A static HTTP fetch does not execute the page JavaScript or create an event, but an agent can synthesize the event with an HTTP client. Treat the signal as a prompt for transcript review; transcript review is required to establish actual browser use.
