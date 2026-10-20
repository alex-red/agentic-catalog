# Ralph loop

Run the same prompt over and over in fresh agent sessions. Each pass reads the specs and a plan file, does one task, runs the tests, commits, and updates the plan, until a completion signal or an iteration cap. Fresh context each pass keeps long runs from degrading. The tests and the plan file keep it on track.

Use it only with strong backpressure (tests, types) and in a sandboxed checkout or container, never in your main working tree.

## Files in the repository

- `specs/*.md`: one per job or topic, written with a human first.
- `IMPLEMENTATION_PLAN.md`: the prioritized task list the loop maintains.
- `PROMPT_plan.md` and `PROMPT_build.md`: the two fixed prompts.
- `AGENTS.md`: build and test commands only, kept short.

## Prompts

`PROMPT_build.md`:

```text
Read specs/ and IMPLEMENTATION_PLAN.md. Pick the single most important unfinished task.
Search the code before assuming something is missing. Implement it, run the tests and
typecheck, and fix until green. Update IMPLEMENTATION_PLAN.md (done, discoveries, new tasks)
and commit. If every task is done and all checks pass, print RALPH_DONE.
```

`PROMPT_plan.md`: compare the specs with the code and rewrite the plan only. No code and no commits.

## Loop

```bash
for i in $(seq 1 30); do
  out=$(claude -p "$(cat PROMPT_build.md)" --permission-mode acceptEdits)
  # Codex: out=$(codex exec "$(cat PROMPT_build.md)")
  printf '%s\n' "$out" | tail -5
  printf '%s\n' "$out" | grep -q RALPH_DONE && break
done
```

## Rules

- Always cap iterations, and set a spending limit where the host supports one.
- One task per pass. Regenerate the plan with `PROMPT_plan.md` when it drifts.
- Review the commits before merging anything the loop produced.
- For an in-session variant, use the host's `/goal` command or the stop-gate-checks hook instead.
