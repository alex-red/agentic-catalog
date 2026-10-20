import unittest
from decimal import Decimal

from shop.checkout import Cart, place_order, preview
from shop.money import format_money


def sample_cart() -> Cart:
    cart = Cart()
    cart.add("mug", Decimal("12.50"), 2)
    cart.add("tea", Decimal("8.99"))
    return cart


class CheckoutTest(unittest.TestCase):
    def test_total_without_code(self):
        self.assertEqual(place_order(sample_cart())["charged"], Decimal("33.99"))

    def test_preview_matches_charge_without_code(self):
        cart = sample_cart()
        shown = preview(cart)
        self.assertEqual(place_order(cart)["display"], shown)

    def test_discounted_order_on_fresh_cart(self):
        self.assertEqual(place_order(sample_cart(), "SAVE10")["charged"], Decimal("30.59"))

    def test_preview_matches_charge_with_code(self):
        cart = sample_cart()
        shown = preview(cart, "SAVE10")
        self.assertEqual(place_order(cart, "SAVE10")["display"], shown)

    def test_unknown_code_is_rejected(self):
        with self.assertRaises(ValueError):
            place_order(sample_cart(), "BOGUS")

    def test_money_formatting(self):
        self.assertEqual(format_money(Decimal("1234.5")), "$1,234.50")


if __name__ == "__main__":
    unittest.main()
