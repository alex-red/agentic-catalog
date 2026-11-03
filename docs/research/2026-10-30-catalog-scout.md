# TypeScript skill admission follow-up

As of and researched: October 30, 2026 (America/Edmonton). Focused live research and source review by Codex, an AI curator. The user selected `0xDarkMatter/claude-mods`'s `typescript-ops` and explicitly requested its addition.

## Scope and baseline

Follow [PLAN](../../PLAN.md), [contributing policy](../../CONTRIBUTING.md), [rating policy](../ratings.md), and [decisions](../decisions.md). No existing entry provides a general TypeScript type/configuration reference with TS7 adoption coverage. `monorepo-change-verification`, `secret-serialization`, `workers-best-practices`, and the Vue skills cover adjacent narrower jobs. Ordinary model assistance, installed compiler diagnostics and official TypeScript documentation are the simpler baseline. This session's installed skill inventory contains no dedicated general TypeScript skill; this is not a comprehensive audit of host releases.

## Coverage and observations

The preceding search sampled general TypeScript skills, explicit TS7/native-compiler mentions, skills.sh listings, original GitHub entrypoints and official Microsoft release documentation. Leads included PyModel, Jeffallan, Remix, martinffx, saschb2b, and 0xDarkMatter. Only the selected 0xDarkMatter package received complete source inspection in this admission follow-up. This is a focused selection, not an ecosystem-wide best-skill benchmark. No popularity or growth signal is used to assign grades.

GitHub's path-scoped commit API resolved `skills/typescript-ops` to `dd21becd241fbd0132a1e783062b27283e9fec4e`. The pinned recursive tree, archive and root license were fetched read-only. Full inspection covers all ten subtree files and root MIT license; immutable URLs and digests are in the [manifest](../reviews/2026-10-30-typescript-ops-sources.json). Technical findings, dependencies, effects, named overlap and seven criterion grades are in the [assessment](../reviews/2026-10-30-typescript-ops.md).

Initial sandbox DNS failed; public-source downloads succeeded through the permitted shell network path. Several web-reader raw/reference URLs returned cache misses. The earlier Skills CLI search produced no usable output and was stopped; no installation-count comparison is claimed. No upstream installer or helper, plugin, hook, sibling skill, dependency installation or consumer connection was activated.

## Recommend adding

There is **no unconditional best-skill endorsement** after complete inspection. The user-selected [TypeScript Operations](https://github.com/0xDarkMatter/claude-mods/tree/dd21becd241fbd0132a1e783062b27283e9fec4e/skills/typescript-ops) is admitted as a vendored **experimental** alternative at evidence `reviewed`. Its concrete contribution is type references plus TS7 compiler API/configuration/fallback considerations. Its MIT license and local resource closure permit complete unchanged packaging, including the optional Python helper and Bash self-test.

The complete review found TS7-incompatible configuration templates, reversed variance guidance, an incorrect satisfies inference claim, a function utility failing its own example, and overbroad migration-readiness claims. Three local TS7.0.2 compiler probes confirmed the variance, inference and function-constraint findings. These checks establish source defects, not behavioral improvement. The metadata carries scoped blockers, and the provisional human-v1 rating is 5.9/10. User authorization to add the selected entry does not resolve those defects.

## Review next

If a corrected default is needed, inspect the complete [PyModel TypeScript package](https://github.com/PyModel/react-frontend-skills/tree/main/skills/typescript), particularly its TS7 migration reference, CLI and licensing. Its main entrypoint lists 44 rules, but the full package was not reviewed in this run and is not cleared for admission. Alternatively re-review a newer `typescript-ops` pin that fixes the documented defects.

## Watch / hold / skip

- [Jeffallan typescript-pro](https://github.com/jeffallan/claude-skills/blob/main/skills/typescript-pro/SKILL.md): general alternative, with a TypeScript 5.0+ knowledge reference and no explicit TS7 section in the inspected entrypoint; not selected for this TS7 request.
- [Remix typescript-expert](https://github.com/remix-run/remix/blob/main/.agents/skills/typescript-expert/SKILL.md): useful concise type-quality lead but explicitly scoped to the Remix repository, without inspected TS7 migration depth. Not selected.
- [martinffx/typescript-skills](https://github.com/martinffx/typescript-skills) and [saschb2b/skills](https://github.com/saschb2b/skills): TS7-aware discovery leads; required source inspection remains incomplete. No admission or comparative quality claim.

Prior unrelated holds remain in the [October queue](../research-2026-10.md) and subsequent reports; this request does not reopen them.

## Revisit existing entries

No existing source pins or ratings need changing for this addition. Reuse the narrower entries for their actual jobs rather than loading every TypeScript-related entry together.

## Changes since baseline and top priorities

The preliminary chat recommendation becomes a qualified experimental admission after full inspection. This addition saves the complete upstream package and license, assessment and provenance, and records the decision. No collection or plugin manifest changes.

1. Keep the listed blockers visible when selecting or installing this entry.
2. Re-review corrected upstream examples before promoting it to a default recommendation.
3. If warranted later, run an authorized task comparison against official documentation and project tools. Current validation remains structural and evidence stays `reviewed`.
