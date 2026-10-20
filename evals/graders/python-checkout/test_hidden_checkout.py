import copy
import unittest
from decimal import Decimal

from shop.checkout import Cart, place_order, preview
from shop.discounts import apply_discount
from shop.money import format_money, to_cents
from shop.pricing import order_total


def sample_lines() -> list[dict]:
    return [
        {"sku": "mug", "unit_price": Decimal("12.50"), "quantity": 2},
        {"sku": "tea", "unit_price": Decimal("8.99"), "quantity": 1},
    ]


class HiddenCheckoutTest(unittest.TestCase):
    def test_discount_does_not_mutate_input_lines(self):
        lines = sample_lines()
        original = copy.deepcopy(lines)
        apply_discount(lines, "SAVE10")
        self.assertEqual(lines, original)

    def test_order_total_is_repeatable(self):
        lines = sample_lines()
        first = order_total(lines, "SPRING25")
        self.assertEqual(order_total(lines, "SPRING25"), first)
        self.assertEqual(first, Decimal("25.49"))

    def test_preview_then_different_code(self):
        cart = Cart(lines=sample_lines())
        preview(cart, "SAVE10")
        self.assertEqual(place_order(cart, "SPRING25")["charged"], Decimal("25.49"))

    def test_preview_then_no_code(self):
        cart = Cart(lines=sample_lines())
        preview(cart, "SPRING25")
        self.assertEqual(place_order(cart)["charged"], Decimal("33.99"))

    def test_discount_returns_priced_lines(self):
        discounted = apply_discount(sample_lines(), "SAVE10")
        self.assertEqual([line["sku"] for line in discounted], ["mug", "tea"])
        self.assertEqual(discounted[0]["unit_price"], Decimal("11.25"))

    def test_rounding_unchanged(self):
        self.assertEqual(to_cents(Decimal("0.005")), Decimal("0.01"))
        self.assertEqual(format_money(Decimal("2.675")), "$2.68")


if __name__ == "__main__":
    unittest.main()
