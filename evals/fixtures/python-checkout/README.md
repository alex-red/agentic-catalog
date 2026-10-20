# Checkout discount fixture

A deliberately broken, dependency-free Python fixture for debugging evaluations. It is not application code and is excluded from the library's passing test suite.

Reported symptom: customers who use a discount code are charged less than the checkout preview showed. Support suspects rounding in the money formatting.

Run from this directory with Python 3.10 or later:

```sh
python3 -m unittest -v
```

The source seed fails the preview-versus-charge check for discounted orders. The other checks describe behavior a correction must preserve.

Hidden grader tests live outside this directory, in `evals/graders/python-checkout/`. The evaluation runner copies them in only after the agent finishes. A correction that only satisfies the visible test, such as caching the preview or adjusting rounding, should fail them. Run agent experiments only on a temporary copy; do not fix the seed in this repository.
