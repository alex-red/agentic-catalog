# Evaluation

This scaffold contains structural validation, trigger examples, and a deliberately broken Python pagination fixture. No agent baseline/treatment runs have been performed.

## Structural checks

`bun run check` validates schemas, catalog freshness, profile references, and skill resource portability. Tests also copy the skill into an isolated temporary directory and check it independently. These checks do not execute the skill in an agent host.

The local skill-frontmatter schema implements the required names, descriptions, limits, optional fields, and metadata value types from the [Agent Skills specification](https://agentskills.io/specification). Library-specific metadata has separate schemas.

Required runtime resources must use Markdown links inside the bundle. Inline and reference-style links are parsed as Markdown, including images; code examples are ignored. Network links are not fetched, fragments are not validated, and arbitrary file paths inside scripts or prose cannot be inferred as dependencies. Review those manually before publishing a scripted skill. Symlinks are rejected by this scaffold's portability convention.

## First debugging case

The [case definition](../evals/cases/systematic-debugging.yaml) points to the [pagination fixture](../evals/fixtures/python-pagination/README.md). Its first- and second-page checks intentionally fail on the source fixture.

Copy the fixture into a temporary working directory before asking an agent to fix it. Leave this repository's seed unchanged. Use a fresh copy and fresh host session for every condition.

Hold the task, model, permissions, tools, project instructions, and fixture state constant. Compare the host's ordinary behavior with the same host using the selected skill and rules. Run trigger-only prompts separately from the end-to-end correction.

Check the resulting behavior, relevant regressions, unrelated changes, completion claims, and activation. Record time and token usage when available. A passing hidden grader alone does not establish a good explanation or correct scope; inspect those separately.

## Record results

For each run, record:

- Case ID, fixture/source revision, condition, host and model versions, settings, OS, and surface.
- Exact request, installed selection, available tools, and permission boundary.
- Observed changes, checks, exit status, and acceptance outcomes.
- Measured time or usage, missing measurements, and environment limitations.
- Unexpected side effects or misleading completion claims.

Store reviewed, non-sensitive evidence in `evals/results/` and link it from `component.yaml` when it supports a maturity claim. Keep exploratory notes distinct from comparative results.

The full six-case, two-host comparison and real-project pilot remain in [PLAN.md](../PLAN.md). Establish an evaluation budget before launching those runs. The first component remains experimental until evidence supports promotion.
