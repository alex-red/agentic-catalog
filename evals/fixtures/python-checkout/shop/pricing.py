from decimal import Decimal

from .discounts import apply_discount
from .money import to_cents


def line_total(line: dict) -> Decimal:
    return to_cents(line["unit_price"] * line["quantity"])


def order_total(lines: list[dict], code: str | None = None) -> Decimal:
    return sum((line_total(line) for line in apply_discount(lines, code)), Decimal("0.00"))
