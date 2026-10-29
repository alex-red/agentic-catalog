# Latest request owns the result

This client-side example uses Vue 3 APIs and the platform `AbortController`. Call it synchronously from setup or an owned effect scope; call `stop()` if its owner ends sooner. `load` receives a key and signal and returns parsed data. It must not mutate the exposed state itself.

```ts
import { readonly, shallowRef, watch, type WatchSource } from 'vue'

export function useLatestRequest<T>(
  source: WatchSource<string>,
  load: (key: string, signal: AbortSignal) => Promise<T>,
) {
  const data = shallowRef<T | undefined>(undefined)
  const error = shallowRef<unknown>(undefined)
  const pending = shallowRef(false)

  const stop = watch(source, async (key, _previous, onCleanup) => {
    let current = true
    const controller = new AbortController()
    onCleanup(() => {
      current = false
      controller.abort()
      pending.value = false
    })

    // Clear rather than display the previous key's result as current data.
    data.value = undefined
    error.value = undefined
    pending.value = true
    try {
      const result = await load(key, controller.signal)
      if (current) data.value = result
    } catch (cause) {
      if (current) error.value = cause
    } finally {
      if (current) pending.value = false
    }
  }, { immediate: true })

  return {
    data: readonly(data),
    error: readonly(error),
    pending: readonly(pending),
    stop,
  }
}
```

Cleanup invalidates each run before the next callback begins; a late `finally` cannot clear the next run's loading state. Stopping also clears `pending`. Default watcher scheduling is batched: invalidation happens when Vue reruns the watcher, not synchronously at every source assignment. If the UI must never show a result for a different key, keep a result key and check it at the rendering boundary. Choose synchronous watchers only when the source and performance cost justify them.

The example clears previous results on each run. A stale-while-revalidate UI needs a separate result key and an explicit stale indicator instead. Debouncing, caches, request deduplication, mutation idempotency and retries are separate policies. Use the project's existing fetching library when it supplies these.

[Vue cleanup contract](https://vuejs.org/guide/essentials/watchers.html#side-effect-cleanup) explains invalidation. Abort alone cannot guarantee that a non-cooperative loader stops or that an already completed server operation is reversed.
