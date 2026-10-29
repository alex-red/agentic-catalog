---
name: vue-async-state
description: Review or fix Vue 3 async state that becomes stale during rapid input, route changes, or disposal. Use for watcher cancellation, request ownership, reused route components, and shared state lifetime.
license: MIT
---

# Vue async state ownership

Trace which component, composable, store instance, or request owns each effect and which result is still allowed to commit. Preserve the project's Vue version, Options/Composition API style, router and data-fetching library. Use the library's existing query cancellation/cache mechanism where it already owns the job.

## Establish the lifetime

- Find the reactive source, effect creation, invalidation, and disposal. A watcher created synchronously in setup belongs to that component; one created later in an async callback needs explicit disposal. An external effect scope needs an owner that stops it.
- Keep independent component state separate. Calling a composable twice usually creates two instances; share an instance explicitly when consumers must coordinate. In SSR, create user-specific stores per request rather than retaining them at module scope.
- Choose the watch source precisely. Watch a route parameter or query getter when that field drives the request. A component reused for a parameter change does not mount again.

## Control completion, not just cancellation

Register cleanup before starting work that can yield. The watch callback's `onCleanup` argument is a valid API; it may be passed to helpers. Vue 3.5+ `onWatcherCleanup` is another option, but must be called in the synchronous watcher stack, before an `await`.

Abort cooperative work and also invalidate its right to update state. A loader may ignore abort, or a completion may already be queued. Guard success, error, and `finally` writes so an old operation cannot replace current results, show an old error, or clear a newer loading indicator. Include response parsing in the protected operation. Aborting does not undo server-side mutations.

For a complete Vue 3 example with an explicitly disposable watcher, read [latest request](references/latest-request.md). It is a local client-state pattern, not an SSR fetch/cache abstraction or a mutation retry policy.

## Keep navigation and data ownership distinct

For Vue Router 4/5, global `beforeEach` runs before reused components' `beforeRouteUpdate`; per-route `beforeEnter` does not run for parameter/query/hash changes within the same route. Use an update guard when navigation must wait or be rejected, and a watcher when data follows an accepted route change. Do not implement the same load in both by accident. Router guards do not replace authorization at the server.

Prefer return-based guards for new code; valid `next`-based guards need not be rewritten just for style. If a guard updates external state while awaiting, ensure that a superseding or cancelled navigation cannot publish obsolete state.

## Verify the failure that matters

Use controlled promises rather than sleeps. Exercise a newer request finishing before an older one, a stale rejection, disposal during work, and a loader that ignores abort. Assert data, error and loading together. For routing bugs, navigate between two parameters using the same component. Use browser tests only where rendering or interaction is material.

Record the tested Vue/router versions and any untested SSR, caching, or navigation paths. A passing race fixture is not evidence about every possible schedule.

## Contracts

- [Vue watcher cleanup and ownership](https://vuejs.org/guide/essentials/watchers.html)
- [Vue Router guard contracts](https://router.vuejs.org/guide/advanced/navigation-guards.html)
- [Vue SSR state isolation](https://vuejs.org/guide/scaling-up/ssr.html#cross-request-state-pollution)
