# Evaluation results

Claude Code sandbox trigger results for the library skills and trigger checks for the pilot project's skills are recorded in [the October 20 report](triggers-2026-10-20.md). No matched outcome evaluation or fresh marketplace or copy-install check has been recorded. Trigger results describe activation behavior only; they do not establish task outcomes or install compatibility. A local Codex browser was used to check the running-app fixture, but no headless Codex browser integration or host A/B run has been recorded.

`bun run eval:run` writes raw run records to `runs/`, which Git ignores. Promote reviewed, non-sensitive summaries into this directory using the fields in [the evaluation guide](../../docs/evaluation.md). Link a record from a component's metadata only when it supports the claim being made.

[Local harness checks](harness-checks-2026-10-20.md) document grading regressions and fixture QA. They do not establish a component's benefit.
