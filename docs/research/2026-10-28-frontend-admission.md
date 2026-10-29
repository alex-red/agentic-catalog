# Vue, React and Bun admission

**Date:** October 28, 2026, America/Edmonton.

The user authorized adding the strongest findings from the [frontend scout](2026-10-28-catalog-scout-6.md). Admitted three independently written MIT entries, each at evidence level `reviewed`:

| Entry | Job | Why this form |
| --- | --- | --- |
| `vue-async-state` | Request invalidation, guarded completion, watcher ownership and reused routes | Narrower than adding another core Vue bundle alongside the installed Vue skill; fills the concrete stale-data gap found in upstream examples |
| `react-component-composition` | Component contracts, variants, state/context ownership and preservation of interaction | Complements existing React performance coverage while avoiding invalid API bans and React 19-only defaults |
| `bun-migration-verification` | Independent migration layers, preserved resolution inputs, lifecycle trust and scoped evidence | More reliable than importing the inspected broad migration/setup examples unchanged |

These are original implementations based on official API contracts, not edited vendored entries or copied third-party skills. No upstream expression or examples are reproduced. The original licenses are packaged inside each entry. Vite, Vue testing, Router/Pinia bundles, Elysia baseline/licensing, React Doctor triage and profiling/runtime questions remain in their existing research dispositions. The existing Vercel performance entry is retained without a new source pin or rating.

## Contracts and review

- Vue's [watcher contract](https://vuejs.org/guide/essentials/watchers.html) establishes invalidation, callback cleanup, synchronous `onWatcherCleanup`, automatic setup ownership and batched scheduling. The skill preserves the callback form and explains that abort is insufficient for non-cooperative work. The [Router flow](https://router.vuejs.org/guide/advanced/navigation-guards.html) distinguishes guard order and route reuse; the [SSR contract](https://vuejs.org/guide/scaling-up/ssr.html) motivates request isolation. No beta/Vapor dependency is introduced.
- React's [shared-state guidance](https://react.dev/learn/sharing-state-between-components), [context contract](https://react.dev/reference/react/useContext), [provider versions](https://react.dev/reference/react/createContext), and [state identity](https://react.dev/learn/preserving-and-resetting-state) ground the composition skill. It does not require context, `use()`, render callback removal or memoization. There is no executable example requiring a particular React package installation.
- Bun's [lockfile migration](https://bun.com/docs/pm/lockfile), [lifecycle trust](https://bun.com/docs/pm/lifecycle), [initialization](https://bun.com/docs/runtime/templating/init), [bundler](https://bun.com/docs/bundler), [mocking](https://bun.com/docs/test/mocks) and [coverage](https://bun.com/docs/test/code-coverage) docs establish the workflow's version-dependent checks. Ordinary documentation lookup does not load a remote instruction playbook. Commands must match the consumer's installed version; no claimed universal speedup or automatic runtime/runner switch.

Overlap is recorded in each metadata file: installed Vue core guidance, `create-adaptable-composable`, `react-best-practices`, `repo-research`, browser testing and generic verification already cover neighboring jobs. The new entries are selected by their distinct failure mode. No broad frontend collection is expanded and no consumer dependency, hook, MCP, scanner, instruction file or toolchain is activated.

## Scratch verification

Extracted the exact TypeScript code block from the Vue latest-request reference into `/tmp/frontend-admission/latest-request.ts`. Used pinned Vue **3.5.22**, TypeScript **7.0.2**, Bun types **1.3.0**, and local Bun **1.4.3**. Dependencies were installed only in the disposable directory with lifecycle scripts disabled. This intentionally checks a stable Vue 3 baseline, not the current beta or every supported version.

The example passes strict no-emit type checking and six coordinated tests (20 assertions): late success after a newer result; stale rejection while newer work remains pending; explicit stop before late completion; effect-scope disposal before late rejection; current failure; and independent instances. Deferred promises control order; the loader deliberately ignores abort. No timing sleeps or network server were needed. The reference discloses batched invalidation, previous-result clearing and omitted cache/retry/SSR policies.

The React entry is contract guidance without executable snippets; no browser/keyboard interaction or React outcome evaluation is claimed. The Bun workflow was reviewed against current docs; no consumer migration or deployment was performed. Structural validation and repository checks are separate from agent trigger and outcome evidence. All three entries remain `reviewed`.
