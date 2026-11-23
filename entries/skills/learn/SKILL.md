---
name: learn
description: Turn a correction, recurring constraint, or proven procedure from the current session into a proposed update to durable agent guidance. Use for /learn or explicit requests to retain a lesson for future work.
---

# Learn

Use the current conversation as evidence. A bare invocation reviews recent work. If the user names a lesson, focus on that lesson and check the turns or project evidence that support it.

## Find the lesson

- Start with the user's corrections, constraints, and overrides. Compare a failed attempt with the working fix. Identify what changed, why it mattered, and when it will matter again. Treat an explicit standing instruction as evidence of intent even when there was no failure.
- Read the guidance that already applies. If it already covers the lesson, check whether it loaded in the right scope and whether its trigger or wording needs a fix. Skip one-off workarounds and unsupported guesses. Keep secrets and private transcript details out of proposals and durable guidance.
- If no reusable change remains, briefly say why and stop. Ask a focused question only when missing evidence or unclear intent would change what gets saved or where it applies.

## Choose where it belongs

- **Rule.** Use the narrowest loaded instruction file for a constraint that should apply whenever its scope matches, such as an approval boundary or a project invariant.
- **Skill.** Use an on-demand `SKILL.md` for procedures, command flags, and troubleshooting steps that matter only for a recognizable task. If the project already has a workflow guide that people or agents consult for the procedure, update it where they will find it.
- Read the target files and the host's relevant customization guide before drafting. Check discovery, scope, precedence, naming, frontmatter, and documented size limits. Prefer the smallest applicable project or directory scope. Propose user-wide scope only when the lesson applies across projects and the user intends that reach.
- Update an existing target when it fits. If the file is near its budget, oversized, or truncated when loaded, propose tightening it or moving task-specific detail into scoped guidance. Create a file when there is no suitable home or when splitting makes the guidance load at the right time.

## Propose, then apply

1. Draft `learning_proposal.md` as a review artifact when the host supports it. Enable the artifact's request-feedback option when available. Otherwise present the same Markdown proposal in chat. For each change, include the evidence and rationale, classification and scope, exact target path, exact diff or full text for a new file, and a way to verify it will load or be found in the intended situation.
2. Wait for explicit approval of the proposed edits. A request to learn, feedback on wording, or silence does not approve a patch. If the user revises the proposal, show the updated diff for review.
3. Before writing, recheck the affected sections against the approved diff. If intervening changes affect the patch, show the revised proposal and wait for approval. Apply only the approved edits, verify the resulting diff and the relevant format, size, and discovery checks, and report what was applied and verified.
