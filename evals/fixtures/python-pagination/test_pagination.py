import unittest

from pagination import page_items


class PaginationTests(unittest.TestCase):
    def test_first_page(self):
        self.assertEqual(page_items([1, 2, 3, 4, 5], 1, 2), [1, 2])

    def test_second_page(self):
        self.assertEqual(page_items([1, 2, 3, 4, 5], 2, 2), [3, 4])

    def test_page_beyond_items(self):
        self.assertEqual(page_items([1, 2], 5, 2), [])

    def test_empty_input(self):
        self.assertEqual(page_items([], 1, 2), [])

    def test_invalid_page(self):
        with self.assertRaises(ValueError):
            page_items([1, 2], 0, 2)

    def test_invalid_page_size(self):
        with self.assertRaises(ValueError):
            page_items([1, 2], 1, 0)


if __name__ == "__main__":
    unittest.main()
