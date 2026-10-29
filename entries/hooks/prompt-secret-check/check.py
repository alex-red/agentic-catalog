#!/usr/bin/env python3
"""Reject a few recognizable credential forms without echoing their values."""
import json
import re
import sys


PATTERNS = [
    ("private-key block", re.compile(r"-----BEGIN (?:RSA |EC |DSA |OPENSSH |ENCRYPTED )?PRIVATE KEY-----")),
    ("AWS access-key identifier", re.compile(r"\b(?:AKIA|ASIA)[A-Z0-9]{16}\b")),
    ("GitHub classic token", re.compile(r"\bgh[pousr]_[A-Za-z0-9]{36}\b")),
]


def main():
    event = json.load(sys.stdin)
    prompt = event.get("prompt")
    if not isinstance(prompt, str):
        raise ValueError("missing prompt")
    for category, pattern in PATTERNS:
        if pattern.search(prompt):
            print("Prompt withheld: possible " + category + ". Replace it with a placeholder and resubmit.", file=sys.stderr)
            return 2
    print("{}")
    return 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except (ValueError, AttributeError):
        print("Prompt credential check could not parse the event; resubmit after repairing the hook.", file=sys.stderr)
        sys.exit(2)
