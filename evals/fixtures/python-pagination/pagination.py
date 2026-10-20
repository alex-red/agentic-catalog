"""A small one-based pagination API used as a deliberately faulty fixture."""


def page_items(items, page, page_size):
    if page < 1 or page_size < 1:
        raise ValueError("page and page_size must be positive")
    start = page * page_size
    return list(items[start : start + page_size])
