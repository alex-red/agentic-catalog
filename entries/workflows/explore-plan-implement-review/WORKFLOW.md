# Explore, plan, implement, review

Skip the plan when the whole change fits in one sentence. Otherwise:

1. **Explore** in read-only or plan mode. Read the relevant code, tests, and configuration. Use a subagent for broad searches so the main context stays small. Do not edit yet.
2. **Plan.** Write down the files to change, the approach, the risks, and the check that proves each step. Get approval when the user is present.
3. **Implement.** Follow the plan and run each step's check. When reality differs from the plan, update the plan instead of silently diverging.
4. **Review in a fresh context.** Have a subagent, `/code-review` (Claude Code), or `/review` (Codex) read only the diff, the plan, and the acceptance criteria:

   ```text
   Review the diff against the plan. Check that every requirement is done, that the listed
   edge cases have tests, and that nothing outside the scope changed. Report only gaps that
   affect correctness or the stated requirements.
   ```

5. **Close out.** Fix the real gaps, rerun the checks, and report the evidence. Treat style suggestions as optional, and do not over-engineer to satisfy the reviewer.
