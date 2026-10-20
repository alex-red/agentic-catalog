# Agentic Rules: review and implementation plan

Date: October 19, 2026  
Status: Foundation scaffold implemented; host compatibility and behavioral evaluation pending  
Source: User-provided “Repository architecture & implementation blueprint — October 19, 2026”

## 1. Confirmed direction

Build a curated library of reusable engineering guidance, with manual installation as the first delivery method. Use it in the maintainer's own projects before broadening into a public library. Test the first release in Codex and Claude Code.

These three decisions were confirmed in discussion. The component counts, schemas, profiles, and release gates below are recommendations for review.

The workspace was empty when reviewed and did not contain Git metadata, existing code, or repository instructions. The user subsequently authorized scaffolding. The current foundation includes one debugging skill, three core rules, a pilot profile, schemas, catalog tooling, tests, and CI. The broader inventory remains planned.

Scaffold choices: original content uses MIT licensing, and `profiles/debugging.yaml` selects only the first available skill. The planned `minimal` and `developer` profiles are deferred until their referenced skills exist. A real-project pilot has not yet been selected.

The first useful outcome is concrete: select a small set of guidance, install it into an existing project without damaging its conventions, and demonstrate a feature, bug fix, and refactor with recorded verification.

## 2. Review of the original blueprint

### Keep

- Canonical Markdown content, standard Agent Skills, and concise project instructions.
- Independent selection of practices, with small profiles for convenience.
- Progressive disclosure, explicit completion criteria, and curated learning.
- Provenance, attribution, reproducible evaluation, and preservation of existing project files.
- A library-first sequence, followed by installation tooling when needed.

### Change before implementation

| Priority | Issue in the blueprint | Recommended change |
| --- | --- | --- |
| High | Twelve to fifteen skills, several profiles, tools, and host adapters make the first release difficult to evaluate. | Start with one complete debugging example, then grow to six skills, three workflow recipes, and two profiles. |
| High | Selecting rule files does not define how their text reaches an agent. | Define manual materialization into a host-recognized instruction file. Links alone do not constitute installation. |
| High | Root-level templates and workflows can become missing dependencies when one skill is copied. | Keep required resources inside each installable skill. Validate the complete copied directory. |
| High | `LOOP.md` and workflow YAML have no automatic host discovery or enforcement. | Expose first-release workflows through discoverable skills; retain a human-facing workflow index. Defer executable orchestration. |
| High | Evaluation is foundational in the narrative but baseline comparisons arrive in v0.3. | Include a small controlled comparison in v0.1. Publish limitations alongside results. |
| High | Cross-agent support is described mostly as filenames. | Track host version, session surface, discovery, invocation, instruction loading, and observed results separately. |
| Medium | A resolver appears responsible for detecting general instruction conflicts. | Initially validate explicit IDs, references, and declared incompatibilities. Human review and evaluations assess semantic conflicts. |
| Medium | “Stable” appears in the example skill before its evidence requirements are met. | Begin every new component as experimental. Promote only on linked evidence. |
| Medium | Mandatory TDD, isolated worktrees, review agents, or approval stages could become unnecessary overhead. | Make these task-dependent techniques. Preserve existing authorization and project conventions. |
| Medium | Independent component versions and a monorepo add maintenance before there are consumers. | Use repository release tags and one validation package initially. Add independent versions only if needed. |
| Medium | Roadmap counts disagree: four core loops in one place, six contracts elsewhere; profile counts also vary. | Adopt one explicit release inventory and keep later ideas in a backlog. |
| Low | Star counts, installation counts, naming comparisons, and archival claims are volatile. | Keep them out of architectural justification. Verify and date any retained landscape research separately. |

The underlying product hypothesis still needs testing: selected guidance should improve outcomes or make a useful process more consistent at an acceptable cost. More installed instructions are not inherently better.

This review checked the shared skill specification and relevant host documentation. It did not independently verify every adoption count, upstream archival claim, or framework comparison in the source blueprint; those claims are excluded from the implementation rationale.

## 3. First-release scope

### Included

- Six original skills, initially experimental.
- Three short rule modules and an editable project-instruction template.
- Three workflow recipes accessible through those skills.
- Two declarative profiles with explicit manual installation instructions.
- A generated catalog, structural validation, and content contribution guidance.
- A lightweight static catalog wiki, added through the subsequent feature request.
- Installation smoke checks in Codex and Claude Code.
- A small evaluation pilot plus a real-project adoption report.

### Deferred

- A custom installer, terminal UI, hosted registry, or monorepo.
- An autonomous runner, lifecycle hooks, multi-agent scheduler, and executable loop schema.
- Automatic installation of external tools, dependencies, credentials, or MCP servers.
- Full OpenSpec, Spec Kit, BMAD, GSD, or other methodology implementations.
- Automatic project-memory updates and automatic semantic conflict resolution.
- A tested-support claim for Cursor, Copilot, Gemini, OpenCode, Windows, or cloud sessions.

Keep the original broader library as a backlog. Add a component when a pilot demonstrates a distinct recurring need, an existing component cannot cover it cleanly, and someone can maintain its evidence.

## 4. Content architecture

Retain the six conceptual roles from the blueprint. They do not all need their own runtime, schema, or top-level directory in v0.1.

| Concept | First-release representation | How it is used |
| --- | --- | --- |
| Rules | Short Markdown modules in `rules/` | Selected text is manually merged into project instructions. |
| Skills | Flat `skills/ar-*/SKILL.md` directories | Installed into the host's skill location. |
| Workflows | References inside the skill that owns the process | Loaded through that skill; indexed in `workflows/README.md`. |
| Tools | Existing project commands; documentation when necessary | Invoked within the host's existing permissions. |
| Templates | Skill-local assets and a bootstrap instruction template | Copied only when a task needs that artifact. |
| Profiles | Small YAML lists of rule and skill IDs | Guide explicit manual selection. They do not execute anything. |

### Proposed repository structure

Create these files as their implementation phase begins; avoid empty placeholder directories.

```text
agentic-rules/
├── PLAN.md
├── README.md
├── AGENTS.md
├── CONTRIBUTING.md
├── LICENSE
├── SECURITY.md
├── rules/
│   ├── scope-and-authority.md
│   ├── focused-changes.md
│   └── verification-evidence.md
├── skills/
│   ├── ar-plan-implementation/
│   ├── ar-implement-change/
│   │   ├── SKILL.md
│   │   ├── component.yaml
│   │   └── references/
│   │       ├── quick-change.md
│   │       └── feature-development.md
│   ├── ar-systematic-debugging/
│   ├── ar-verify-changes/
│   ├── ar-code-review/
│   └── ar-session-handoff/
├── workflows/
│   └── README.md
├── profiles/
│   ├── minimal.yaml
│   └── developer.yaml
├── templates/
│   └── AGENTS.md.tmpl
├── catalog/
│   ├── index.json
│   └── schema/
├── scripts/
├── tests/
├── evals/
│   ├── fixtures/
│   ├── cases/
│   └── results/
├── docs/
│   ├── installation.md
│   ├── compatibility.md
│   └── evaluation.md
├── package.json
└── .github/workflows/validate.yml
```

Every skill directory contains `SKILL.md` and `component.yaml`; the expanded implementation directory above illustrates optional resources. Bug fixing is owned by the debugging skill itself. The workflow index links to canonical procedures rather than maintaining copies.

The repository's root `AGENTS.md` governs contributors to this library. It is distinct from the bootstrap template installed into consumer projects. Keeping the template extension `.tmpl` also distinguishes sample instructions from active repository guidance.

## 5. Component and composition contracts

### Standard skills

Use the Agent Skills format. The specification requires `name` and `description`, constrains names, and requires the name to match the containing directory. Its `metadata` extension uses string values. Keep structured project-specific data in the companion manifest. [Agent Skills specification](https://agentskills.io/specification)

The `ar-` prefix reduces collisions; it does not guarantee global uniqueness. Flat directories are this project's portability convention, rather than a requirement imposed on every host.

Each skill should explain its trigger and boundaries, expected inputs, smallest useful procedure, output, completion evidence, and handling of missing information or failed checks. A skill should not force a planning document, test suite, or additional skill invocation for every small request.

Required references, scripts, and templates must live inside the skill directory and use portable paths. Optional external documentation can be linked explicitly. A copied skill must remain usable without the rest of this repository.

### Companion metadata

Use `component.yaml` for library metadata that is absent from standard skill frontmatter:

- `schemaVersion`: initially `1`.
- Category and tags.
- Maturity: `experimental`, `candidate`, or `stable`.
- Maintainer and provenance, including original authorship or adaptation details.
- Upstream repository, exact revision, and applicable notices when adapted.
- Links to evaluation cases and evidence.

Derive the skill ID, name, description, and license from its path and standard frontmatter. Do not maintain a second authoritative copy of those fields. Start all six skills as experimental.

A repository tag versions the complete catalog. Do not add per-skill semantic versioning in v0.1. Record exact repository revisions when reporting installations and evaluations.

### Profiles

Profiles have a schema version, ID, description, ordered rule IDs, and skill names. They contain explicit selections; recommended extras remain documentation. No inheritance or transitive dependency resolution is needed initially.

Proposed selections:

| Profile | Rules | Skills |
| --- | --- | --- |
| `minimal` | All three short core modules | Implement change; verify changes |
| `developer` | All three short core modules | Plan implementation; implement change; systematic debugging; verify changes; code review |

Session handoff is individually selectable. A profile does not require every selected skill to activate on every task. All initial skills work independently, with no required cross-skill dependencies.

### Rule installation

Rule source files are inert library content until selected. For manual installation, show the exact text to merge into `AGENTS.md`, with recognizable begin/end comments and source revision. Put always-needed guidance directly in that block; a link does not ensure the linked text is loaded.

Preserve existing project instructions and resolve contradictions explicitly. Do not invent a universal priority hierarchy or change host permissions. Respect authorization already granted by the user; new approval is needed only when the next action falls outside it or the host requires it.

Keep the selected core block within an initial target of roughly 500 words, then measure usefulness and actual context size. Avoid treating a line count as a universal limit. Codex uses layered instruction discovery and a configurable byte limit, so root-file length alone is insufficient. [Codex project instructions](https://learn.chatgpt.com/docs/agent-configuration/agents-md)

### Catalog generation

Generate `catalog/index.json` deterministically from skill frontmatter, companion manifests, rule metadata, and profiles. Keep authoring inputs authoritative. CI should fail when the checked-in generated catalog is stale.

Validate unique IDs, existing paths, profile references, schemas, and packaged resource completeness. Description overlap requires review and trigger testing; exact duplicate descriptions can be rejected mechanically.

## 6. Initial skill and workflow inventory

| Skill | Trigger and boundary | Expected result |
| --- | --- | --- |
| `ar-plan-implementation` | A substantial or ambiguous change needs an implementation plan. Skip for obvious small edits. | A proportional plan with assumptions, ordered tasks, and acceptance checks. |
| `ar-implement-change` | Implement an agreed feature, small edit, or constrained refactor. Does not own incident diagnosis. | A focused change with verification and a clear outcome report. |
| `ar-systematic-debugging` | Investigate a failure, regression, or incorrect behavior. | Reproduction or documented uncertainty, tested diagnosis, correction, and regression evidence. |
| `ar-verify-changes` | Establish whether changed behavior meets requirements. Does not claim to replace a code review. | Relevant checks mapped to acceptance criteria; unverified items explicitly identified. |
| `ar-code-review` | Assess an existing diff for actionable defects and regressions. | Prioritized, evidence-backed findings, or an honest no-findings result with limits. |
| `ar-session-handoff` | Explicitly transfer work or preserve continuity for a substantial task. | Concise state, decisions, completed checks, remaining work, and restart instructions. |

The workflow recipes are `quick-change`, `feature-development`, and `bug-fix`. Quick changes omit unnecessary planning and review stages. Feature work scales to ambiguity and risk. Bug fixing prioritizes reproduction and diagnosis before modification.

TDD is an optional implementation technique when it helps establish the behavior or prevent a regression. Worktrees and delegation are also conditional. A fresh review pass is useful, but “independent review” should be claimed only when the evaluator or context is actually independent.

Avoid competing default triggers: the implementation skill owns editing, debugging owns investigation, verification owns execution evidence, and review owns diff analysis. Test combinations as well as individual skills.

## 7. Installation and compatibility

### Manual installation procedure

1. Inspect existing project instructions and installed skills; choose a profile or individual components.
2. Select an exact release or source revision and review the selected content.
3. Copy whole skill directories into the documented project location. Check existing names before copying.
4. Merge the selected rule block into project instructions, preserving project-owned content.
5. Record source revision, installed paths, and local edits in a small installation note.
6. Start a fresh host session and verify instruction loading, skill discovery, explicit invocation, and a representative implicit trigger.
7. Document removal of the copied directories and managed block. Treat locally edited content separately.

Prefer directory copies for the initial project-scoped path so the installation travels with a checkout. Do not require machine-specific symlinks. Manual updates use a reviewed diff and never silently replace local edits.

The existing `skills` CLI already supports selecting skills and agents. Evaluate it as an optional convenience after the manual path works; its support for skills does not imply installation of this library's rule blocks or profiles. Pin and test any documented command before release. [Skills CLI](https://github.com/vercel-labs/skills/blob/main/README.md)

### Initial host matrix

Documentation establishes expected behavior, not a tested-support claim. Fill in exact host versions and observed evidence during implementation.

| Host | Expected local project mechanism | Initial status |
| --- | --- | --- |
| Codex | `AGENTS.md` and `.agents/skills/<name>/` | Required v0.1 target; not yet tested |
| Claude Code | Project instructions and `.claude/skills/<name>/` | Required v0.1 target; not yet tested |
| Cursor | Documented native rules and skill discovery | Later target; documentation review only |

Codex documents local skill discovery and progressive loading. Its current guidance also recommends plugins for broader reusable distribution. Evaluate that packaging after the project-local pilot without making it a prerequisite for manual use. [Codex skills](https://learn.chatgpt.com/docs/build-skills)

Claude Code's direct `AGENTS.md` support requires a compatible version and instruction settings. Under its documented default, an existing project or ancestor `CLAUDE.md`/`CLAUDE.local.md` can suppress direct `AGENTS.md` loading. An explicit `@AGENTS.md` import is a documented fallback. Test both the direct path and the existing-instructions case. [Claude Code project instructions](https://code.claude.com/docs/en/memory)

Claude Code documents `.claude/skills/` for project skills. Treat that installation path separately from shared project instructions. [Claude Code skills](https://code.claude.com/docs/en/skills)

Cursor documents `.agents/skills/` and also reads compatibility locations such as `.claude/skills/`. A future multi-host installer must test duplicate discovery before writing identical skills to both directories. [Cursor skills](https://cursor.com/docs/skills)

For each primary host, check a clean repository, existing instructions, a nested working directory, and a Git worktree. Record operating system and session surface. Cloud, remote, and other surfaces remain untested until exercised explicitly.

## 8. Validation and evidence

### Structural checks in CI

- Validate standard skill frontmatter using the reference validator or an equivalent pinned implementation.
- Validate companion metadata and profiles against local schemas.
- Reject duplicate IDs, missing selections, broken required local references, and stale catalog output.
- Copy each skill into an isolated temporary directory and check that required resources remain available.
- Lint Markdown and YAML; review skill descriptions for conflicting scope.
- Verify that validation and catalog generation do not modify source inputs or consumer projects.

Use a single small TypeScript/Node validation package, with a pinned toolchain and lockfile. Extract packages only when real reuse justifies it. Define exact commands during the foundation phase; none exist yet.

### Behavioral evaluation pilot

Start with six resettable cases across a TypeScript application and Python service. Include feature work, a seeded bug, and a behavior-preserving refactor in both starter and established-project contexts. Established fixtures include meaningful conventions and existing instructions.

| Case | Task | Context |
| --- | --- | --- |
| F1 | Small feature | TypeScript starter |
| F2 | Small feature | Existing Python service |
| B1 | Seeded defect | Python starter |
| B2 | Seeded regression | Existing TypeScript application |
| R1 | Constrained refactor | TypeScript starter |
| R2 | Constrained refactor | Existing Python service |

For each case, compare the same host, model, task, base revision, permissions, and available tools with and without selected library content. Keep native host behavior and project instructions in both conditions. Run fresh sessions and clean fixture copies. Alternate condition order where practical.

One baseline/treatment pair for six cases on two hosts is 24 runs for the core end-to-end matrix. That is an exploratory pilot, not strong statistical evidence. Three repetitions would be 72 runs. Budget focused skill checks separately. Set a time and spend budget before execution; record incomplete coverage instead of presenting it as a pass.

Measure task outcome, regressions, unrelated file changes, missing acceptance checks, skill activation, unnecessary activation, and observed authorization violations. Record time, token usage, and context size when the host exposes them; mark unavailable measurements as unavailable.

Add direct, indirect, ambiguous, and negative trigger prompts for every skill. A docs-only edit should not demand TDD; a review request should not modify the patch; a small fix should not require a specification workflow. Check the installed profiles together for unintended combinations.

Also check outputs beyond code changes: review a diff with known defects and a clean diff, assess a plan against its acceptance criteria, and resume work in a fresh session using only a handoff and the project checkout. Trigger accuracy alone does not establish that these skills work.

Store case definition, fixture revision, content revision, host/model version, settings, checks, and result summaries. Keep credentials and private project material out of public records. Distinguish observations from forecasts and failures of the environment from failures of the component.

### Evidence and release policy

- **Experimental:** Valid structure, reviewed content, documented examples, and honest evidence limitations.
- **Candidate:** Repeated matched comparisons demonstrate a defined benefit on documented tasks without a known serious regression; include combination and host checks.
- **Stable:** Maintained evidence across releases and representative projects, with explicit compatibility coverage and unresolved limitations.

The pilot may reveal no improvement. Simplify, revise, or remove ineffective guidance. Release v0.1 as experimental if it is useful in actual projects and its limitations are documented; do not describe its practices as proven.

Run deterministic checks on pull requests. Behavioral evaluations run deliberately when relevant content changes and the required host access and budget exist. Record stale or missing behavioral evidence explicitly.

## 9. Implementation sequence

### Phase 0: product decisions and pilot selection

- [x] Review the pasted blueprint and inspect the workspace.
- [x] Confirm content-first delivery, own-project pilots, and Codex/Claude Code targets.
- [x] Write this review and implementation proposal.
- [ ] Identify the first real project and its recurring agent failure modes.
- [ ] Review the proposed seed inventory, two profiles, license, and evaluation budget.

Exit: a concrete pilot and agreed initial inventory. Unanswered details remain recorded rather than being treated as approved decisions.

### Phase 1: one complete vertical slice

- [x] Establish repository documentation, contributor instructions, and the minimal validation toolchain.
- [x] Define skill companion and profile schemas using the debugging skill as the example.
- [x] Author `ar-systematic-debugging` with self-contained resources and provenance.
- [x] Write the three core rule modules and manual instruction-merging example.
- [x] Generate a one-skill catalog and validate an isolated copy.
- [ ] Install the example in disposable repositories and verify both primary hosts.
- [ ] Exercise one reproducible bug case and record failures or installation friction.

Scaffold verification: `npm run check` passes typechecking, Markdown linting, schema/resource validation, catalog freshness, 30 tooling tests including the catalog wiki, and a static wiki build. The seeded pagination fixture was run locally: two expected failing checks and four passing checks. This establishes its failure state, not an agent evaluation; both host checks and an end-to-end agent correction remain pending.

Exit: a new consumer can use one complete skill and selected guidance without a custom CLI or access to the source checkout.

### Phase 2: complete the small library

- [ ] Add the five remaining skills and three workflow entry paths.
- [ ] Add the two profiles and skill-local artifact templates where needed.
- [ ] Document scope boundaries, standalone use, existing-project installation, update, and removal.
- [ ] Cover schemas, profile references, resource closure, and catalog reproducibility in CI.
- [ ] Complete the local compatibility matrix, including existing instructions and worktrees.

Exit: the six-skill inventory is coherent, independently usable, and structurally validated.

### Phase 3: evaluate and revise

- [ ] Build the six controlled cases and outcome graders.
- [ ] Run the budgeted baseline comparisons and trigger cases.
- [ ] Use the library in the selected real project; record concrete benefits and friction.
- [ ] Revise overlapping triggers, unnecessary procedure, missing resources, and weak completion criteria.
- [ ] Re-run affected checks and publish a concise evidence report with limitations.

Exit: a documented decision about which components are worth shipping, supported by observed results.

### Phase 4: experimental v0.1 release

- [ ] Verify a fresh consumer can install, invoke, update by diff, and remove selected content.
- [ ] Ensure project-owned instructions and locally edited skills are preserved.
- [ ] Confirm documentation matches tested host versions and surfaces.
- [ ] Complete licensing, attribution, release notes, and known-limitations documentation.
- [ ] Prepare a tagged release; publishing follows the user's release authorization.

Release acceptance: all selected components pass structural checks; both primary hosts have recorded installation evidence; the six baseline/treatment cases on both hosts and the real-project pilot have recorded outcomes; remaining serious failures are fixed or affected components are withheld. Environment failures and unfinished runs do not satisfy the evaluation gate. If budget prevents the proposed matrix, revise the release scope explicitly before claiming completion. Experimental evidence must not be presented as a stable quality claim.

## 10. Later milestones and decision gates

### v0.2: installation tooling, if pilots justify it

Proceed when repeated manual-installation problems justify maintained tooling and existing installers cannot cover the need. Keep any CLI in one package initially. Implement a deterministic preview before mutation, project-local installation, ownership tracking, and modified-file conflicts before an interactive UI.

Record source revision and complete bundle hashes. A hash detects drift relative to a trusted source; it does not establish that an arbitrary source is trustworthy. Scope initial sources to this repository's releases.

Apply changes from a precomputed plan, reject path escapes and unsafe link traversal, and preserve unrelated files. If interrupted, recover to a documented state. Test repeat installation, local edits, partial failure, moves, updates, and removal before promising reversibility. Avoid cross-provider automatic permission changes.

### v0.3: optional bounded execution

Proceed only after a recurring task demonstrates the need for a runner. Define execution limits, check timeouts, cancellation, persisted state, and observable progress before writing orchestration code.

Separate `passed`, `failed`, `blocked`, `budget_exhausted`, and `cancelled` outcomes. A failed test suite is not successful completion merely because its output was inspected. Reserve verification time within the execution budget, and use host-enforced permissions for side effects. Preserve established user authorization instead of adding approval prompts to every iteration.

Treat checkpoints as task state, not an instruction hierarchy. Scope parallel writes and verify integration if delegation is later introduced.

### Broader ecosystem

Add host-native plugin packaging, more agents, domain packs, advanced specification methods, and learning workflows when evidence and maintenance capacity justify each addition. A local static catalog wiki is now available through `npm run wiki:dev`; hosted catalog services remain a later decision. Preserve existing OpenSpec or Spec Kit artifacts when integrating with those projects.

## 11. Open decisions

| Question | Recommendation | Needed by |
| --- | --- | --- |
| Which existing project is the first pilot, and which recurring failures matter? | Choose a project used regularly; seed content from observed problems. | Phase 0 |
| Is the proposed six-skill inventory the right starting set? | Validate debugging first, then expand only after the first installation works. | Phases 0–2 |
| What license should original material use? | MIT was selected for the scaffold; preserve upstream notices when adapting. | Resolved for original scaffold content |
| What time and spend budget is available for evaluations? | Start with the 24-run exploratory matrix; repeat selectively before stronger claims. | Phase 3 |
| Which OS and session surfaces must be supported? | Test the maintainer's actual local Codex and Claude Code environments first. | Compatibility checks |
| Should reusable installation eventually use native plugins? | Evaluate after local adoption; keep canonical content portable. | After v0.1 |

Next implementation step: select a real-project pilot and verify the scaffold's manual installation and debugging behavior in Codex and Claude Code. The custom CLI remains a later product decision.
