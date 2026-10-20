from decimal import Decimal

RATES = {
    "SAVE10": Decimal("0.10"),
    "SPRING25": Decimal("0.25"),
}


def apply_discount(lines: list[dict], code: str | None) -> list[dict]:
    """Return priced lines with the discount for ``code`` applied.

    Unknown codes raise ``ValueError``. ``None`` means no discount.
    """
    if code is None:
        return lines
    if code not in RATES:
        raise ValueError(f"unknown discount code: {code}")
    keep = 1 - RATES[code]
    for line in lines:
        line["unit_price"] = line["unit_price"] * keep
    return lines
