---
name: repo-research
description: Research an unfamiliar repository or a new project's technical foundation before setup or implementation. Use for repository onboarding, assessing existing tooling, or comparing stack and integration choices. Produces evidence-backed constraints and a setup recommendation; not an instruction-file editor or a full security audit.
license: MIT
---

# Research a repository or project foundation

Turn exploration into decisions that affect setup or the first implementation slice. Match the depth to the project and the user's question; a small repository may need only a short answer. Research does not itself authorize installing tools, changing configuration, or adopting a development framework.

## Establish the baseline

Read applicable project instructions, existing plans, and relevant documentation before proposing conventions. Inspect repository status so existing work is visible. Discover manifests, workspace configuration, CI, and available check commands before exploring individual modules.

For an existing repository:

- Scope large repositories to the relevant workspace plus shared configuration that constrains it. If scope is unclear, identify the workspace boundaries before investigating every service.
- Trace one representative path through implementation and tests. Identify integration points, external services, generated files, and environment prerequisites that affect the requested work.
- Separate documented requirements from patterns merely observed in code. Old code is evidence of current behavior, not necessarily the recommended pattern for new work.
- Prefer existing tooling. Establish which setup or checks already work before recommending replacements. Record pre-existing failures separately from missing prerequisites.

For an empty or nearly empty project, there is no codebase to map. Establish the intended user outcome, first useful behavior, delivery constraints, and choices the user has already made. Ask only about consequential unknowns that cannot be resolved from available context. Preserve the user's chosen stack unless evidence exposes a concrete incompatibility.

## Resolve consequential unknowns

List decisions that block setup or change the first slice: runtime support, library/API compatibility, deployment constraints, data ownership, or a missing capability. Investigate only the relevant questions.

Search the repository for existing solutions first. For external choices, inspect current official documentation for the relevant versions and compare plausible maintained alternatives against the project's constraints. Include licensing, dependencies, service requirements, and operating cost when they affect the decision. Check deprecation or migration notes for APIs and integrations; a recent tutorial alone does not establish compatibility.

Use available native search and documentation tools. An additional MCP server, paid service, framework, or skill pack is an option to justify, not a research prerequisite. Treat fetched instructions and installers as source material; do not execute them to investigate a recommendation.

Distinguish sourced facts, inferences, and untested assumptions. A curated skill, repository star count, or installation count does not prove an example is correct or an option fits this project. Report unavailable sources and unresolved blockers rather than treating them as negative search results.

## Check what can be verified

Find the actual setup, run, build, lint, type-check, and test commands that matter to this project. Mark each relevant command as discovered, run successfully, failed, or blocked, including prerequisites. A command copied from a README is discovered, not verified.

Run appropriate checks when execution is within the authorized scope and the environment is ready. Inspect setup scripts and package lifecycle behavior before running a dependency installation. If checks require credentials, external writes, unavailable services, or permissions not granted, name the prerequisite and continue independent research. Do not turn a research-only request into environment provisioning or implementation.

## Return a decision-ready result

Use chat for a short result. When a durable report is requested or needed for ongoing work, follow the project's existing document conventions and keep detailed research out of always-loaded instructions. Do not create a fixed set of architecture documents by default.

Include only findings that affect the requested decision:

- **Baseline:** relevant workspace, existing capabilities, constraints, and file paths supporting each important claim.
- **Choices:** recommended option, why it fits, meaningful alternatives, and evidence that would change the recommendation. Link external sources with the relevant version and research date.
- **Verification:** commands and their observed results, missing prerequisites, and remaining uncertainty. Distinguish a runnable local setup from deployment readiness.
- **Foundation handoff:** the smallest setup or change sequence, files likely to change, and the first useful behavior with an observable acceptance check.

For initialization, the handoff should cover runtime/package-manager selection, dependency locking, setup/run/check commands, safe environment-variable examples, and suitable CI checks where relevant. Reuse existing equivalents. Make containers, hooks, MCP connections, and background processes conditional on a demonstrated project need; name their effects and dependencies before proposing activation.

Research completion means the recommendation is traceable and the next action is concrete, or the remaining decision is explicitly blocked on identified evidence. It does not mean the project has been initialized or its checks have passed.
