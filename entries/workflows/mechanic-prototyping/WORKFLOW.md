# Mechanic prototyping

Use this workflow when a playable experiment can resolve uncertainty about a mechanic, interaction or small gameplay loop. It produces a design decision and supporting observations; production implementation is a separate scope unless already requested.

## Choose the uncertainty

Start from the brief and existing build. Name the player action, intended experience, audience and uncertainty: for example, whether changing direction during a grapple creates useful control or makes landings unpredictable. A broad question such as “is the game fun?” usually needs a narrower observable question.

Identify the smallest conditions required to test it. Movement may need only a controller and a few surfaces; an audio interaction needs sound; a cooperative mechanic may need multiple participants or clearly labeled simulated partners. Do not remove the feature whose contribution the experiment is meant to examine.

Use a proportionate time or scope budget, respecting the user's constraints. Before building, state what would support keeping, revising or abandoning the idea. Treat these as provisional decision criteria, not universal enjoyment thresholds.

## Build only enough to expose the question

Prefer the existing engine, controls and project conventions. Decide whether the experiment belongs in the current build, an isolated scene, or a separate disposable project based on interference and reuse. Do not require a new engine, branch, architecture or rewrite solely because it is a prototype.

Keep unrelated content inexpensive. Stub rewards, inventories, enemy behavior or progression when they would obscure the question. Preserve them when the uncertainty depends on their interaction. Record simplifying assumptions so they do not become accidental production requirements.

Expose only the measurements that help interpret the result: an input trace, trajectory, failure location, resource change or repeat attempt. Instrumentation should explain behavior rather than create a second feature project.

## Observe an attempt

Exercise the interaction end to end, including failure and retry. Compare variants under reasonably comparable conditions; avoid changing controls, feedback, geometry and rewards simultaneously when trying to isolate one of them.

When real participants are available and their involvement is authorized, use an audience-appropriate task and observe before coaching. Record assistance separately. If they are unavailable, complete the developer or agent test and label its limits; do not fabricate human reactions or block all useful work waiting for recruitment.

Record the build or revision, scenario, variant, input method, what happened and what remains inferred. A successful automated sequence verifies that sequence; it does not establish enjoyment, learnability or demand. A short prototype does not establish a mature multiplayer economy or community.

## Make the bounded decision

Compare the observations with the intended experience and criteria:

- **Keep:** the evidence supports the mechanic under the tested conditions. State what still needs validation.
- **Revise:** name the likely cause and next discriminating change, rather than adding unrelated polish.
- **Stop:** the approach fails a consequential constraint or needs more investment than its value justifies. Preserve the useful lesson.
- **Inconclusive:** the test did not expose the question, the build failed, or evidence is insufficient. Name the missing condition.

Stop at the agreed budget or supported decision. Another experiment needs a new question or a material unresolved uncertainty, not indefinite tuning until the idea wins. Retain, refactor or replace prototype code based on its actual contracts and quality; a promising design does not automatically require either shipping the spike or rewriting it.

Report the question, experiment, observations, decision and next step at the scale requested. Preserve the difference between a proposed test, an executed test and a result from real players.
