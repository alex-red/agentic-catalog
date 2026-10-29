# Bounded intake and observed task completion

Use this pattern when a receiver owns a finite stream of jobs and accepted async jobs should finish after all senders close. It limits active tasks, handles closed intake, and aborts and drains remaining async tasks if a join error occurs. It returns results in completion order, not input order. The operation below is supplied by the caller, so production work and tests can share the same lifecycle.

```rust
use std::{future::Future, num::NonZeroUsize};
use tokio::{
    sync::mpsc,
    task::{JoinError, JoinSet},
};

pub async fn drain_jobs<F, Fut>(
    mut input: mpsc::Receiver<u64>,
    limit: NonZeroUsize,
    mut run: F,
) -> Result<Vec<u64>, JoinError>
where
    F: FnMut(u64) -> Fut,
    Fut: Future<Output = u64> + Send + 'static,
{
    let mut intake_open = true;
    let mut tasks = JoinSet::new();
    let mut results = Vec::new();

    while intake_open || !tasks.is_empty() {
        tokio::select! {
            job = input.recv(), if intake_open && tasks.len() < limit.get() => {
                match job {
                    Some(job) => { tasks.spawn(run(job)); }
                    None => intake_open = false,
                }
            }
            Some(joined) = tasks.join_next(), if !tasks.is_empty() => {
                match joined {
                    Ok(value) => results.push(value),
                    Err(error) => {
                        tasks.abort_all();
                        while tasks.join_next().await.is_some() {}
                        return Err(error);
                    }
                }
            }
        }
    }

    Ok(results)
}
```

Requires Tokio's `rt`, `sync` and `macros` features. Use the project's existing runtime to call it. A nonzero capacity keeps intake enabled when the set is empty; on full capacity, completion remains enabled. A receiver that reports None is disabled for subsequent iterations, allowing active tasks to drain without a permanently ready receive branch.

Decide these policies before adapting it:

- **Application failures:** the example's jobs return u64. If they return `Result<T, E>`, decide whether an inner error is collected, retried or cancels the batch. A `JoinError` concerns task panic/cancellation and is a separate layer.
- **Supervisor cancellation:** dropping this function drops the JoinSet, aborting its tasks without awaiting cleanup. If that violates requirements, keep a supervisor alive to own and observe cleanup rather than assuming Drop can run async code.
- **Blocking or non-yielding work:** abort-and-drain can wait indefinitely if a job cannot yield or awaits started blocking work. The caller's operation must fit the intended shutdown policy.
- **Total memory:** the task set is bounded, but the returned Vec grows with completed jobs. Stream results to an output consumer when the job count is unbounded, and account for output backpressure.

Useful regression cases are an already closed empty input, closed input with queued jobs, more jobs than active capacity, and a panic while another task is pending. Use explicit coordination for the pending-task case and assert that cleanup was observed before the function returns. See the skill's primary-contract links for the operation-specific guarantees.
