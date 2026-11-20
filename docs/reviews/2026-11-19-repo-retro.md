# Repo Retro human-v1 assessment

- Reviewer and date — AI curator, November 19, 2026, with portability review on November 20, 2026
- Scope — Read the complete adapted [skill](../../entries/skills/repo-retro/SKILL.md), its [license](../../entries/skills/repo-retro/LICENSE.txt), and the existing [Retrospective skill](../../entries/skills/retrospective/SKILL.md).
- Reviewed payload — `SKILL.md` SHA-256 `7633f1758359bfa630eb83e2b350b9d531c9b02caeaa77c65d2bb3bca1434f38`
- Upstream — [Pinned Dev Catalog skill](https://github.com/alex-red/dev-catalog/blob/b583768ccd0703d1c445075770009089f96ebb14/entries/workflows/repo-retro/SKILL.md) and [MIT notice](https://github.com/alex-red/dev-catalog/blob/b583768ccd0703d1c445075770009089f96ebb14/LICENSE), both read in full.

Repo Retro is for developers deciding what to improve after recurring friction across sessions in one repository. It can use Claude Code's session reader or exports, Antigravity's conversation references, Codex's history tools, or equivalent sources on other harnesses. Repository notes and supplied excerpts cover gaps in history access. For a just-finished task, Retrospective already covers turning lessons into project guidance and verifying skills trigger. A manual lessons review is a lighter baseline when the notes already establish what happened and which check or instruction needs changing.

## Grades

| Criterion | Grade (0–4) | Rationale |
| --- | ---: | --- |
| Practical value | 3 | Connects repeated incidents to ranked, verifiable changes. Adds little when a short notes file already identifies the fix. |
| Dependability | 3 | Checks original turns and current guidance, groups related retries, and reports coverage gaps. Sparse notes and missing repo metadata limit the conclusions. |
| Cognitive ease | 3 | Caps the output and gives each proposal the same evidence, target, and verification requirements. History selection still takes judgment. |
| Human control | 4 | Respects the requested scope, treats past text as evidence, keeps private details out of the report, and requires a follow-up before edits. |
| Adoption cost | 3 | Ships as one Markdown skill with no setup scripts. Notes or excerpts may need preparation when history is unavailable. |
| Compatibility | 3 | Works with ordinary repository files and the history surfaces each harness exposes. Access can depend on the installed interface, retained transcripts, and user-supplied evidence. |
| Upkeep | 4 | Has a pinned source and no required runtime dependencies. The history examples use documented interfaces and the shared workflow accepts notes or excerpts when those interfaces are unavailable. |

Aggregate **8.0/10** under `human-v1`. The tradeoff is time spent checking historical evidence in exchange for proposals the user can trace and evaluate. The score is a curator judgment about this adaptation. Dev Catalog's 8.3/10 used a different rubric.

Evidence remains **reviewed**. The portability review checked the history paths against the host documentation linked in the skill. Live cross-harness performance, trigger accuracy, and redaction reliability remain unmeasured. Revisit the grades if host history changes or after a matched comparison with manual review on the same repo evidence.
