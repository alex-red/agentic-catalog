from dataclasses import dataclass, field

from .money import format_money
from .pricing import order_total


@dataclass
class Cart:
    lines: list[dict] = field(default_factory=list)

    def add(self, sku: str, unit_price, quantity: int = 1) -> None:
        if quantity < 1:
            raise ValueError("quantity must be positive")
        self.lines.append({"sku": sku, "unit_price": unit_price, "quantity": quantity})


def preview(cart: Cart, code: str | None = None) -> str:
    return format_money(order_total(cart.lines, code))


def place_order(cart: Cart, code: str | None = None) -> dict:
    total = order_total(cart.lines, code)
    return {"skus": [line["sku"] for line in cart.lines], "charged": total, "display": format_money(total)}
