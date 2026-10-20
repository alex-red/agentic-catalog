# Contributing

A component starts from a failure you have seen an agent make, not from a best practice. Include an example of that failure, a request that should trigger the component, and nearby requests that should not.

Before writing it, check whether Claude Code or Codex already covers it: built-in skills and commands, plan mode, review commands. Record the overlap in the [plan's inventory](PLAN.md#inventory). If a built-in covers it, the new component must beat that built-in in an evaluation.

## Author a skill

1. Add `skills/<name>/SKILL.md` with standard frontmatter: `name`, `description`, and `license`. The name must match the directory. Write the description for triggering: what the skill does, when to use it, and when not to.
2. Keep the instructions proportional. Define the expected outcome, the evidence, and what to do when important inputs are missing. Put content the agent needs only sometimes in `references/`.
3. Bundle required references, scripts, and templates inside the skill directory and link them from the skill. Include `LICENSE.txt`.
4. Add `component.yaml` following the [companion schema](catalog/schema/component.schema.json). Do not duplicate the name or description there.
5. Add an evaluation case with trigger prompts (`activate`, `ignore`, `clarify`). Where outcomes can be graded mechanically, add a fixture and hidden grader tests that distinguish a careless fix from a correct one. See [evaluation](docs/evaluation.md).
6. Run `bun run catalog:build`, `bun run check`, and `bun run plugin:validate`.

Original content uses `provenance.kind: original`. Adapted content must record upstream URL, exact revision, license, notices, and adaptation notes. Check the actual upstream license before copying.

## Rules and profiles

Rules use Markdown frontmatter with `id` and `description`. They must work both as standalone `.claude/rules/` files and as part of a merged `AGENTS.md` block. Profiles select existing rule IDs and skill names; they do not install anything or grant permissions.

## Evidence

Every component starts `experimental`. The validator requires evidence files before `candidate` or `stable`. Maintainers judge whether that evidence supports the claim. Remove components whose evaluations show no benefit.
