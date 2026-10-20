# Difficult reproductions

Use this reference when a direct reproduction is intermittent or depends on an environment you cannot reproduce locally.

- Record the relevant version, configuration, input, timing, and environment differences. Remove secrets before retaining logs.
- Narrow the difference between passing and failing runs. Change one meaningful condition at a time rather than accumulating speculative fixes.
- Prefer a minimized input, recorded response, deterministic clock or random seed, or isolated dependency when it preserves the failure mechanism.
- Check whether apparent intermittency is a race, shared state, ordering, resource limit, or an unavailable external dependency; treat each as a hypothesis to test.
- If the environment cannot be reproduced, explain which observations support each remaining hypothesis and which check would distinguish them. Do not claim the failure is fixed from a local build alone.

Keep the diagnostic record as small as the investigation permits. Create a durable artifact only when it will help continue the work or prevent recurrence.
