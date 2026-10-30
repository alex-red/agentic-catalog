# Human-focused v1: starter assessments

Reviewed October 29, 2026 by Codex (AI curator), following [the rating guide](../ratings.md). These are three initial source-based assessments, not the independent human calibration proposed in the [research](../research/2026-10-29-human-focused-rating.md). The weights remain provisional. No host run, installation test or matched outcome trial was performed during this review.

Inspection covered each complete `RULE.md`, its `entry.yaml`, the catalog's scope/authority conventions and the existing pilot record linked below. The installed host instructions in this session corroborate the general scope and authorization overlap; this is not a fresh audit of every host version. Scores apply to the stated audience and baseline, and are predictions where source review cannot establish behavior.

The payload SHA-256 values bind the review to the exact rule text. Metadata carries the review date and environment assumptions. Existing evidence levels are preserved; this document is a curator assessment and does not raise them.

## Focused changes

Artifact: [RULE.md](../../entries/rules/focused-changes/RULE.md). SHA-256: `f383d5f457164a989a4f065b4560ecb3586d02d2d0f7831b0813c325478332e1`.

Intended use: Developers seeing repeated over-reaching agent diffs; existing project patterns and commands remain authoritative.

Baseline: Current Claude Code/Codex scope guidance, recorded in overlap; use an explicit project-specific instruction if it suffices.

| Dimension | Grade and rationale |
| --- | --- |
| Practical value | 1: Host guidance already covers the core behavior; incremental value needs an observed project failure. |
| Dependability | 3: Coherent and concrete scope limits, but no demonstrated activation or outcome benefit. |
| Cognitive ease | 3: One short paragraph avoids a process artifact; interpreting the smallest coherent change still needs judgment. |
| Human control | 4: Preserves the requested outcome and project choices, and scales planning/testing to risk. |
| Adoption cost | 4: Plain text with no runtime, account, setup or cleanup beyond installing/removing the rule. |
| Compatibility | 4: Explicitly follows existing project patterns and commands; its open text can be merged into both primary hosts. |
| Upkeep | 4: Self-contained stable guidance, with no dependencies or version-specific command examples. |

Observed facts are the rule text and recorded metadata. Reduced steering, reduced review effort and improved outcomes remain predictions. No blocker was found in this narrow source review; that is not a runtime assurance.

What would change this assessment: updated host behavior or direct project observations showing that this rule changes the targeted behavior, adds friction, or is already fully covered. Prefer project-specific facts when generic guidance makes no observable difference.

Decision: retain as a scoped option. Its favorable aggregate does not make it a default recommendation: low additional value on the primary hosts is the decisive tradeoff.

## Scope and authority

Artifact: [RULE.md](../../entries/rules/scope-and-authority/RULE.md). SHA-256: `256e87b3f23d0ea31e068540beeb4d4c904ee0ca94398fad87b9ff31b9961590`.

Intended use: Developers needing explicit authorization boundaries in project instructions, especially with thinner host guidance.

Baseline: Current host authorization and scope instructions, recorded in overlap; existing project instructions may already suffice.

| Dimension | Grade and rationale |
| --- | --- |
| Practical value | 1: Mostly restates the primary hosts; stronger value for thinner hosts is a scoped hypothesis. |
| Dependability | 3: The boundaries are coherent, but determining authorization in practice remains contextual and untested here. |
| Cognitive ease | 3: Concise guidance discourages unnecessary questions; ambiguity still requires human judgment. |
| Human control | 4: Existing authorization, unrelated work and runtime permissions explicitly retain authority. |
| Adoption cost | 4: A single short text rule; installation and removal introduce no runtime dependencies. |
| Compatibility | 4: Defers to applicable project/host instructions and is usable as plain text across hosts. |
| Upkeep | 4: No runtime or external resources; maintaining or replacing it requires only a text edit. |

Observed facts are the rule text and recorded metadata. Reduced steering, reduced review effort and improved outcomes remain predictions. No blocker was found in this narrow source review; that is not a runtime assurance.

What would change this assessment: updated host behavior or direct project observations showing that this rule changes the targeted behavior, adds friction, or is already fully covered. Prefer project-specific facts when generic guidance makes no observable difference.

Decision: retain as a scoped option. Its favorable aggregate does not make it a default recommendation: low additional value on the primary hosts is the decisive tradeoff.

## Verify in the running app

Artifact: [RULE.md](../../entries/rules/verification-evidence/RULE.md). SHA-256: `48bcac179c9d0119f330c61b899e4132e1510fe97a2e877a79c853d2952d7ca4`.

Intended use: Developers receiving visible changes without app checks, with an already-running app and available inspection tools.

Baseline: Generic verification/reporting instructions and host browser tools; compare an explicit project-specific running-app pointer.

| Dimension | Grade and rationale |
| --- | --- |
| Practical value | 3: The pilot documents a concrete missed-app-check problem; improvement from this rule remains unmeasured. |
| Dependability | 3: Provides a visible-path check and honest fallback; no comparative demonstration that agents follow it. |
| Cognitive ease | 3: Makes the next check concrete and avoids a false server-start blocker, but inspection still consumes attention. |
| Human control | 4: Keeps checking an existing app distinct from permission to start a server; states unverified behavior clearly. |
| Adoption cost | 3: Text adoption is cheap, but obtaining the necessary app/browser access and running checks takes effort. |
| Compatibility | 3: Works with different hosts but depends on accessible running UI and appropriate tools; unavailable UI limits coverage. |
| Upkeep | 4: Small self-contained policy without pinned tool syntax, external services or runtime dependencies. |

Existing evidence: [pilot transcript review](../../evals/results/pilot-cha-floor-planner-2026-10.md), especially finding 2, including its approximate counts and stated limitations. Evidence remains `used`; it does not establish causal benefit from this rule.

Observed facts are the rule text and recorded metadata plus the existing exploratory pilot observations. Reduced steering, reduced review effort and improved outcomes remain predictions. No blocker was found in this narrow source review; that is not a runtime assurance.

What would change this assessment: updated host behavior or direct project observations showing that this rule changes the targeted behavior, adds friction, or is already fully covered. Compare repeated visible-change tasks with and without this rule before claiming outcome improvement.

Decision: retain as a scoped option. The score reflects low operational burden as well as the intended benefit.
