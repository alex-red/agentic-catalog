# Repo Retro human-v1 assessment

- Reviewer and date — AI curator, November 19, 2026
- Scope — Read the complete adapted [skill](../../entries/skills/repo-retro/SKILL.md), its [license](../../entries/skills/repo-retro/LICENSE.txt), and the existing [Retrospective skill](../../entries/skills/retrospective/SKILL.md).
- Reviewed payload — `SKILL.md` SHA-256 `8399968c2d6be454afb8be31174af1e7cf01b1d0f8a9ea702122691499ef2071`
- Upstream — [Pinned Dev Catalog skill](https://github.com/alex-red/dev-catalog/blob/b583768ccd0703d1c445075770009089f96ebb14/entries/workflows/repo-retro/SKILL.md) and [MIT notice](https://github.com/alex-red/dev-catalog/blob/b583768ccd0703d1c445075770009089f96ebb14/LICENSE), both read in full.

Repo Retro is for developers deciding what to improve after recurring friction across sessions in one repository. Codex history helps retrieve original turns. Other hosts can work from repo notes or supplied repo-scoped excerpts. For a just-finished task, Retrospective already covers turning lessons into project guidance and verifying skills trigger. A manual lessons review is a lighter baseline when the notes already establish what happened and which check or instruction needs changing.

## Grades

| Criterion | Grade (0–4) | Rationale |
| --- | ---: | --- |
| Practical value | 3 | Connects repeated incidents to ranked, verifiable changes. Adds little when a short notes file already identifies the fix. |
| Dependability | 3 | Checks original turns and current guidance, groups related retries, and reports coverage gaps. Sparse notes and missing repo metadata limit the conclusions. |
| Cognitive ease | 3 | Caps the output and gives each proposal the same evidence, target, and verification requirements. History selection still takes judgment. |
| Human control | 4 | Respects the requested scope, treats past text as evidence, keeps private details out of the report, and requires a follow-up before edits. |
| Adoption cost | 3 | Ships as one Markdown skill with no setup scripts. Notes or excerpts may need preparation when history is unavailable. |
| Compatibility | 3 | Works with ordinary repository files and optional Codex tools. The depth of history coverage varies by host. |
| Upkeep | 4 | Has a pinned source and no runtime dependencies. Host-specific instructions are limited to a documented history path with a file-based fallback. |

Aggregate **8.0/10** under `human-v1`. The tradeoff is time spent checking historical evidence in exchange for proposals the user can trace and evaluate. The score is a curator judgment about this adaptation. Dev Catalog's 8.3/10 used a different rubric.

Evidence remains **reviewed**. The procedure and its boundaries are visible in the source. Relative productivity, trigger accuracy, and the reliability of redaction across hosts have not been measured. Revisit the grades if host history changes, or after a matched comparison with manual review on the same repo evidence.
