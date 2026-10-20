# Pagination debugging fixture

This is a deliberately broken, dependency-free Python fixture for a future debugging evaluation. It is not application code and is excluded from the library's passing test suite.

Public contract: `page_items(items, page, page_size)` uses one-based page numbers, returns a list, returns an empty list beyond the available items, and rejects non-positive pages or page sizes with `ValueError`.

Run from this directory with Python 3:

```sh
python3 -m unittest -v
```

The source seed should fail the first- and second-page checks. The remaining checks describe behavior a correction must preserve. Run agent experiments only on a temporary copy; do not fix the seed in this repository.
