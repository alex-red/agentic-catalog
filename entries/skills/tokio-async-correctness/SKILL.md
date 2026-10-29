---
name: tokio-async-correctness
description: Review or fix Tokio task lifecycle, cancellation, backpressure and shutdown bugs. Use for select! loops, detached tasks, JoinSet ownership, lost partial progress, closed-channel spins, or unbounded spawning. Not a general Rust style guide or an atomic-memory-model checker.
license: MIT
---

# Tokio async correctness

Trace who owns each task and each piece of progress before proposing a fix. Match the project's Tokio version/features and runtime configuration. Preserve intended cancellation, data-loss, retry and shutdown semantics; do not introduce a different runtime, service or background process.

## Map the lifecycle

For the affected flow, identify the producer, queues, spawned futures, handles, result consumers and shutdown signal. State what must finish, what may be discarded, how errors are observed, and what bounds memory and active work. A bounded channel does not bound tasks if a receiver immediately spawns every job without limiting in-flight work.

Follow the relevant path through callers and tests. Distinguish a documented lifecycle from assumptions inferred from one example. Ask only about unresolved product behavior that changes the fix, such as whether accepted jobs must finish on shutdown.

## Check cancellation at the operation boundary

- At every relevant `select!`, timeout or early return, identify the actual future being dropped and where its state lives. Dropping a wrapper future may lose progress even when an inner operation is cancel-safe.
- Consult the operation's contract. Tokio `read` and channel `recv` can be restarted without losing progress; `read_exact`, `read_to_end` and `write_all` need special care when restarted after cancellation. Keep completed progress in the owner, or retain the same future across iterations when that matches the intended behavior.
- Separate data loss from queue fairness. Cancelling a pending Tokio Mutex lock or semaphore acquisition loses the waiter's queue position even though no guard/permit was obtained.
- Handle EOF (`Ok(0)` for a nonempty read buffer) and closed receivers (`None`) deliberately. A permanently ready terminal branch can spin or starve other work. `select!`'s `else` runs when all branches are disabled; it is not a test that no future is ready.
- Treat `biased;` as a scheduling choice requiring a starvation argument. Do not use it to hide an incorrect loop termination or progress condition.

## Own tasks, capacity and shutdown

- Dropping an ordinary `JoinHandle` detaches its task. Awaiting `&mut JoinHandle` in `select!` can preserve ownership across a losing branch; spawning a task solely to avoid cancellation can instead create an orphan.
- Dropping a `JoinSet` aborts its tasks. If completion/cleanup must be observed, explicitly await/drain them before returning. `abort_all()` requests cancellation; it does not itself wait for termination. Handle `JoinError` separately from an application's inner `Result`.
- Distinguish closing intake from dropping accepted work. Define the order: stop accepting, signal or drain workers, handle results, and escalate after the intended deadline if needed. Cancellation of the supervisor itself needs a policy too; async cleanup cannot simply be awaited from Drop.
- Bound both queued and active work. Make capacity meaningful at the actual expensive operation, and define behavior for overload and closed channels. Avoid spawning unlimited waiters around a semaphore.
- Move blocking work away from the async executor, but remember started `spawn_blocking` work cannot be aborted through the handle. Use cooperative stopping where required; do not promise a deadline that waits forever for non-yielding or blocking work.
- Inspect what a guard protects across an await. A standard mutex held across suspension can block progress; Tokio's async mutex supports that use but may serialize work. Choose from the invariant and runtime needs rather than applying a blanket lock rule.

For a concrete bounded intake/drain pattern, read [references/task-lifecycle.md](references/task-lifecycle.md). It handles closed input and observes aborted async jobs after a join error; it is not a universal graceful-shutdown implementation.

## Prove the relevant behavior

Create the smallest regression that fails for the suspected lifecycle bug. Use channels, barriers, bounded queues or deliberately controlled futures to establish ordering instead of hoping a sleep exposes a race. Keep a timeout as a test failure guard, not evidence that a particular interleaving occurred. Use paused time only when the test/runtime supports it and the property concerns Tokio time.

Choose tests relevant to the change: partial progress across cancellation, EOF/closed-channel termination, capacity under load, no lost/duplicated accepted jobs, join-error handling, and the specified shutdown policy. Compile/run examples against the actual dependency and features. For atomic ordering or lock-free state, use an appropriate instrumented model rather than treating a Tokio test as exhaustive schedule exploration.

Report the affected owner/operation, the demonstrated failure, the fix and observed verification. Label untested interleavings and remaining shutdown limits. A successful test does not prove all possible schedules correct.

## Primary contracts

Check the project's version when an API detail matters:

- [select! cancellation and fairness](https://docs.rs/tokio/latest/tokio/macro.select.html#cancellation-safety)
- [JoinHandle ownership and cancellation](https://docs.rs/tokio/latest/tokio/task/struct.JoinHandle.html)
- [JoinSet cancellation and draining](https://docs.rs/tokio/latest/tokio/task/struct.JoinSet.html)
- [Bounded mpsc and clean shutdown](https://docs.rs/tokio/latest/tokio/sync/mpsc/index.html)
- [spawn_blocking limits](https://docs.rs/tokio/latest/tokio/task/fn.spawn_blocking.html)
- [Async mutex tradeoffs](https://docs.rs/tokio/latest/tokio/sync/struct.Mutex.html)
