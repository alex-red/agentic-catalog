# Lightweight project initialization

The [project-initialization collection](../collections/project-initialization.yaml) supplies five complementary entries for understanding a repository or starting a new project. Select it instead of a full framework when existing host tools and a small set of reusable procedures are sufficient. Catalog selection does not install or activate guidance in a consumer project.

## Use the collection

1. [Research the repository and foundation](../entries/skills/repo-research/SKILL.md). Identify current capabilities, constraints, consequential unknowns and actual command status. In an empty project, research the first useful behavior and its technical needs instead of generating a codebase map.
2. [Clarify the goal](../entries/skills/grilling/SKILL.md). Resolve missing requirements and acceptance criteria that the repository cannot answer. Skip a separate interview when the request already supplies them.
3. [Write lean project instructions](../entries/skills/agents-md-authoring/SKILL.md). Record verified commands and non-obvious constraints, following the project's existing conventions. Keep detailed research in an ordinary document when it needs to persist.
4. [Explore, plan, implement and review](../entries/workflows/explore-plan-implement-review/WORKFLOW.md). Use the research to establish a repeatable setup and build one useful slice. Preserve existing tooling and authorization; do not add another approval gate for work the user has already authorized.
5. [Verify before claiming completion](../entries/skills/verification-before-completion/SKILL.md). Exercise the relevant setup, run and check commands and the slice's acceptance criteria. Report failures or unavailable prerequisites explicitly.

The order is adaptable: resolve a blocking goal question before researching downstream technology choices. The collection is a selection of entries, not an automatic orchestrator. Each entry remains independently usable, and host-provided planning or review can perform the relevant steps.

An example request after selecting the entries:

```text
Research this project's foundation, using the lightweight project-initialization
collection. Preserve existing conventions and work. Identify the consequential
unknowns, compare relevant options against current official documentation, and
distinguish discovered commands from checks you actually ran. Then initialize
the agreed foundation and verify one useful slice within the authorized scope.
```

For research alone, request the findings and setup recommendation without the initialization step.

## Add only what the project needs

| Need | Optional catalog entry | When to add it |
| --- | --- | --- |
| Ambiguous business terminology | `domain-modeling` | Important concepts or bounded contexts need explicit definitions |
| Work spanning sessions | `handoff` | A concrete state and next-action record will help the next session |
| Version-specific library documentation | `context7` | Native browsing leaves a real retrieval gap; review its external-service setup |
| Automatic formatting | `format-after-edit` | A project formatter is already installed and the host handler has been tested |
| Fast completion feedback | `stop-gate-checks` | A reliable fast gate exists; account for its bounded retry and whole-tree behavior |

These options are outside the collection. Hooks and connections require explicit selection and their documented setup; no hook runs merely because the collection is listed. Keep shared verification in CI. Add post-edit diagnostics or compaction notes only when actual latency or lost state warrants them.

The collection starts with curator-reviewed content. See the [research report](research/2026-10-28-catalog-scout-3.md) for framework alternatives and review limits; neither its recommendations nor structural checks establish improved coding outcomes.
