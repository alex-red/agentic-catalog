# Contributing

Start with a concrete recurring problem and a request that should trigger the proposed skill. Include at least one nearby request that should not trigger it.

## Author a skill

1. Add `skills/ar-<name>/SKILL.md` with standard frontmatter: `name`, `description`, and a license. The name must match the directory.
2. Keep its instructions proportional to the task. Define the expected outcome, evidence, and what to do when important inputs are missing.
3. Bundle required references and templates inside that directory and link them from the skill. Include `LICENSE.txt` with the applicable notice.
4. Add `component.yaml`, following the [companion schema](catalog/schema/component.schema.json). Do not duplicate the skill name or description there.
5. Add an evaluation case, including positive, negative, and ambiguous requests. Evaluation paths are repository metadata, not required runtime resources.
6. Run `bun run catalog:build` and `bun run check`.

Original content uses `provenance.kind: original`. Adaptations must record upstream URL, exact revision, license, notices, and adaptation notes. Check the actual upstream license before copying content.

## Rules and profiles

Rules use Markdown frontmatter containing `id` and `description`. Profiles select existing rule IDs and skill names. They do not install content or grant permissions. Keep the core rule text short enough to review as a single block.

Do not mark a component candidate or stable without evidence files. The validator checks that evidence exists; maintainers must assess its quality and support for the claim.

## Checks

```sh
bun install
bun run check
```

The check command typechecks scripts, lints Markdown, validates schemas and references, verifies catalog freshness, and runs isolated tooling tests. Behavioral evaluations are separate and must report host, model, content revision, environment, and limitations. See [evaluation](docs/evaluation.md).
