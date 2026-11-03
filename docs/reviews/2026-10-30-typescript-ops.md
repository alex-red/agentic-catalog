# TypeScript Operations: human-focused assessment

Reviewed October 30, 2026 (America/Edmonton) by Codex, an AI curator, using [human-v1](../ratings.md). Evidence: **reviewed**. This is a source assessment with bounded compiler checks, not independent human calibration, an activation trial or a measured developer outcome.

## Context and baseline

Intended user: a developer reviewing TypeScript types or planning native TypeScript 7 adoption, particularly configuration, compiler API consumers and transitional compiler installs. The simpler baseline is ordinary model assistance, the project-local compiler and official release documentation. This session's installed skill inventory has no dedicated general TypeScript skill; this observation does not claim universal host coverage.

Existing `monorepo-change-verification` handles package/task graphs; `secret-serialization` and `workers-best-practices` cover narrower TypeScript risks; `create-adaptable-composable` and `vue-async-state` own Vue-specific behavior. Those remain complementary. This skill adds consolidated type examples and a dedicated native-compiler adoption reference, but examples need checking rather than automatic reuse.

## Inspection and provenance

Reviewed the complete [upstream skill](https://github.com/0xDarkMatter/claude-mods/tree/dd21becd241fbd0132a1e783062b27283e9fec4e/skills/typescript-ops) at `dd21becd241fbd0132a1e783062b27283e9fec4e`, the last commit affecting `skills/typescript-ops` returned by GitHub's path-scoped commit API. Downloaded the archive at that commit. Read all ten subtree files and the root MIT license in full:

- `SKILL.md`.
- `references/config-strict.md`, `ecosystem.md`, `generics-patterns.md`, `ts7-native-compiler.md`, `type-system.md`, `utility-types.md`.
- `assets/typescript-facts.json`.
- `scripts/check-typescript-facts.py` and `tests/run.sh`.
- Root `LICENSE`, packaged unchanged as `LICENSE.txt`.

The [inspection manifest](2026-10-30-typescript-ops-sources.json) records immutable URLs and SHA-256 digests. The pinned tree has no applicable nested license or NOTICE. No packaged file remains unread. Optional third-party libraries illustrated in examples were not installed, audited or exercised; unrelated plugin infrastructure was not reviewed or copied.

All ten subtree files remain byte-identical. Root plugin hooks, agents, rules and sibling skills are not dependencies of the selected package. Sibling names in metadata and See Also are suggestions, not required resources. References to upstream protocol/design documents appear in helper comments, not as runtime imports. No remote instruction loader was found.

## Useful coverage and confirmed limits

The TS7 reference identifies the missing 7.0 programmatic API, config deprecations, fallback compiler collisions, and embedded-language compatibility as adoption concerns. These topics agree with the [official TS7 release announcement](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/). That announcement also provides a TS6 compatibility package with a separate executable, a simpler alternative to the guide's TS5 fallback in suitable projects. The reference dates its ecosystem claims to August 8 and asks readers to recheck them. A promised 7.1 API is a roadmap statement, not a guarantee that a particular current tool has ported.

Source defects prevent an unconditional recommendation:

1. **Configuration examples conflict with TS7.** `config-strict.md` still uses `moduleResolution: "Node"` in its CommonJS and monorepo templates. The official TS7 announcement says `node`/`node10` resolution is no longer supported. The TS6 discussion also conflates deprecation with outright removal. Its staged strict migration omits an explicit temporary `strict: false`, despite discussing the new strict default.
2. **Variance explanation is reversed.** The `strictFunctionTypes` section calls `dogCb = animalCb` unsafe. This is the safe direction; `animalCb = dogCb` is unsafe. The [official variance example](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-6.html) shows the same relation. A local TS7.0.2 probe accepted the upstream-marked assignment and reported TS2322 only for the reverse.
3. **Literal preservation is overstated.** `type-system.md` says `myPlugin.name` remains the literal `"my-plugin"` after `satisfies PluginConfig`. A local TS7.0.2 probe appending `const literalName: "my-plugin" = myPlugin.name` produced TS2322 because it is `string`. Literal preservation depends on contextual typing and const assertions.
4. **Function utility constraints reject intended inputs.** The exact `Promisify` block in `utility-types.md` rejects its own `SyncFn = (x: number) => string` with TS2344 under strict TS7.0.2 because `unknown` parameters are too restrictive. The same pattern appears in other helpers. The purported callback promisification actually wraps a return value, without removing a callback parameter. Other elaborate helpers, including the recursive Pipe and state builder, need their own verification before reuse; no blanket correctness claim is made.
5. **Migration readiness claims are too strong.** A leaf in `npm ls typescript` does not rule out a local script importing the API. Plain TS/TSX projects can still use API-dependent linters or generators. Inspect scripts/imports, dependency compatibility, actual typecheck and emit paths. Regex-based AST-free linting is a limited option, not a semantic substitute for parsing. The checklist's rule that every diagnostic difference is a bug also conflicts with documented intentional TS7 changes; classify discrepancies before concluding migration is safe or defective.
6. **Optional ecosystem examples are not current turnkey recipes.** Next.js `experimental.typedRoutes` is obsolete according to the [current official option reference](https://nextjs.org/docs/app/api-reference/config/next-config-js/typedRoutes). The testing section does not wire up typechecking; [Vitest documents explicit typecheck configuration](https://vitest.dev/guide/testing-types). Running the local playground through `tsx` does not establish type correctness. API-client, ORM, Effect and routing examples were read but not integration-tested. Deep merge/memoization examples need their own runtime contracts; typed signatures alone do not prove their behavior.

Compiler probes used the repository's installed **TypeScript 7.0.2**, independent temporary files extracted from the relevant upstream code fences, and per-probe configs with `strict`, `noEmit`, `skipLibCheck`, `types: []`, and `target: ES2022`. The variance probe appended both assignments; the satisfies probe appended the literal assignment; the Promisify probe used its block unchanged. All three produced the specific diagnostics above. They verify these defects, not the skill's effect on an agent. No upstream script was executed.

The author's 12.1× adoption benchmark concerns one described Workers/React project; underlying raw benchmark data and the project were not independently verified. It is not evidence of this skill improving outcomes. No catalog speedup claim is made.

## Effects, packaging and freshness

The Python helper uses the standard library. Offline mode reads the packaged JSON and prose and checks package-name presence plus a dated currency note. It does **not** compare the documented major to the prose's numeric claims. Live mode queries the configured registry's `latest` endpoint and flags newer majors or missing packages; it neither verifies minor-version API compatibility nor validates technical examples. It only reads data and prints results; it does not load returned text as instructions. No scheduled check or network integration is activated by admission.

The optional Bash self-test reads the package, creates temporary fixtures, invokes Python, and may create Python bytecode. It tests structure and helper exit behavior, not TypeScript examples. It resolves resources relative to itself and needs no upstream checkout. The ten-file package and MIT license are self-contained. Library examples introduce dependencies only if deliberately adopted in a consumer project. `allowed-tools` is host-specific frontmatter; it cannot override the consumer's permissions or project policy.

## Grades

| Criterion | Grade | Rationale |
| --- | ---: | --- |
| Practical value | 3 | Useful consolidated TS7 migration concerns beyond routine syntax help. |
| Dependability | 1 | Confirmed configuration and type-example defects; helper checks do not catch them. |
| Cognitive ease | 2 | References are organized, but a broad trigger and mixed correctness demand extra supervision. |
| Human control | 3 | No automatic hook or installer; migration and fallback prescriptions still need project-scoped judgment. |
| Adoption cost | 3 | Complete portable package; optional Python/Bash helpers and a large reference corpus add some burden. |
| Compatibility | 2 | Main workflow is portable, but legacy templates and API-consumer assumptions conflict with some TS7 projects. |
| Upkeep | 3 | Immutable source and explicit freshness helper aid updates; minor/tool API drift still requires manual review. |

Provisional aggregate: **5.9/10**. Benefit and burden are source-based predictions. Scoped blockers cover unchanged configuration/type recipes and migration-readiness/diagnostic-parity claims. No score clears them.

## Disposition and next evidence

Admit the user-selected skill as a **vendored experimental** option with evidence `reviewed`. Preserve the source unchanged and surface defects in metadata; do not install it into a consumer project or expand collections. This supersedes the earlier chat's preliminary unqualified recommendation, which did not include full resource inspection.

Re-review a newer pinned revision when it corrects these examples and narrows migration claims. A later authorized trial should compare a real TS7 migration or type-review task with official documentation plus the existing compiler, recording correction effort, missed dependencies, comprehension and outcomes. Source checks and catalog validation do not establish that comparison.
