# Trigger results: Sonnet 5.5, one run per prompt (2026-10-20)

Host: Claude Code 2.1.301 on macOS, `claude plugin eval` sandbox (temporary home; no user settings, CLAUDE.md, memory, or other plugins). Agent model `claude-sonnet-5-5`; judge model Haiku (default). Source: `main` at `a38ee5e`. Suite: `bun run eval:triggers`, which wraps `agentic-catalog`, `retrospective`, and `systematic-debugging` in a throwaway plugin.

```sh
claude plugin eval eval-build --eval-dir cases --ablation none --runs 1 --model claude-sonnet-5-5 \
  --max-cost-usd 5 --no-publish --trust-plugin --json eval-build/result.json
```

Billed to the logged-in subscription (no API key or cloud-provider variables set). Estimated list-price cost $1.00, 341 seconds.

## Results: 23 of 25 cases passed

| Skill | Activate | Ignore | Clarify |
| --- | --- | --- | --- |
| `agentic-catalog` (first run) | 3/3 | 3/3 | 1/1 |
| `retrospective` (including three first-run prompts) | 4/4 | 3/3 | 1/1 |
| `systematic-debugging` | 2/4 | 4/4 | 2/2 |

The two misses were both `systematic-debugging` activations that never called the Skill tool:

- "Discounted orders charge a different amount than the preview. Track down why." The session ended after one turn without using any tool.
- "The pagination tests started failing. Find the cause and correct the behavior." Four turns, no Skill call.

Trace files were in temporary directories and were not kept (`--keep-temp` was not set), so the agent's reasoning for the misses is not recorded.

## Interpretation

- The discovery skill's description fired on all three catalog requests, stayed quiet on a skill-authoring request, a code-review request, and a storefront "catalog page" request, and asked which entry was meant when told to "install the thing from the catalog". This is its first evidence, from one run per prompt.
- `retrospective` held up on Sonnet, including the three prompts added with its outcome fixture.
- `systematic-debugging` fired less reliably on Sonnet than in the earlier Opus run (29/30 checks over three runs). The trigger workspaces contain no project, so a direct answer such as "there is no code here" is a plausible competing behavior. With one run per prompt this is a signal to investigate, not a measured rate.
- Sandbox results measure description triggering only. They do not show whether recommendations or fixes are good, and they exclude the competition from other installed skills in a real setup.

## Rerun of the debugging activations (same day)

The first look at the misses, using traces kept with `--keep-temp`, showed Sonnet searching an empty workspace and asking where the project was. The trigger generator then gained fixture scaffolds: `activate` and `ignore` prompts whose case names a fixture now start with that project in the workspace (`--scaffold`), while `clarify` prompts keep an empty one. All four debugging activation prompts were rerun three times each with the fixtures present (estimated $0.61):

| Prompt | Runs passed |
| --- | --- |
| "Diagnose and fix a regression where the first page skips the first items." | 3/3 |
| "This test started failing after the discount refactor. Find the cause." | 3/3 |
| "The pagination tests started failing. Find the cause and correct the behavior." | 0/3 |
| "Discounted orders charge a different amount than the preview. Track down why." | 0/3 |

In every miss, Sonnet read the small fixture, found the actual cause (the off-by-one start index; the discount function mutating cart lines in place), tried to apply the fix, and reported honestly that editing and test runs were disabled. It handled these as ordinary tasks and did not load a debugging skill. The skill list in the sandbox also included Claude Code built-in skills such as `debug`, `verify`, and `run`; none were called.

Conclusion: on Sonnet 5.5, `systematic-debugging` fires for prompts framed as regressions or diagnosis, and not for plain "find and fix" requests on bugs the model can read straight off the code. That matches the entry's rating, which places the skill's value on hard reproductions, so the description was not changed. Whether it fires on a genuinely hard bug needs a harder fixture.

## Follow-ups

- Add a trigger fixture with a bug that cannot be read off the code (intermittent or environment-dependent) to test whether the debugging skills fire where they matter.
- Run the suite on Opus 5.5 to compare models on the new prompts.
