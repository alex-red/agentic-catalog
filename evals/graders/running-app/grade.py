#!/usr/bin/env python3
"""Grade the running-app fixture's requested edit and browser-check evidence."""

from __future__ import annotations

import argparse
import hashlib
import json
import os
import re
import sys
from pathlib import Path

SOURCE_FILES = ("index.html", "styles.css", "app.js")
EXPECTED_BACKGROUND = "rgb(233, 245, 255)"


def source_revision(root: Path) -> str:
    digest = hashlib.sha256()
    for name in SOURCE_FILES:
        digest.update(name.encode("utf-8"))
        digest.update(b"\0")
        digest.update((root / name).read_bytes())
        digest.update(b"\0")
    return digest.hexdigest()


def body_background_is_expected(css: str) -> bool:
    """Check the effective simple body background, including a root CSS variable."""
    variables: dict[str, str] = {}
    for name, value in re.findall(r"(--[\w-]+)\s*:\s*([^;{}]+)", css):
        variables[name] = value.strip().lower()
    body_rules = re.findall(r"(?:^|})\s*body\s*\{([^}]*)\}", css, flags=re.IGNORECASE)
    background = None
    for rule in body_rules:
        for prop, value in re.findall(r"([\w-]+)\s*:\s*([^;]+)", rule):
            if prop.lower() in {"background", "background-color"}:
                background = value.strip().lower()
    if background is None:
        return False
    variable_match = re.fullmatch(r"var\(\s*(--[\w-]+)\s*\)", background)
    if variable_match:
        background = variables.get(variable_match.group(1), "")
    return background in {"#e9f5ff", "#e9f5ff !important"}


def load_records(evidence: Path) -> list[dict[str, object]]:
    records: list[dict[str, object]] = []
    try:
        lines = evidence.read_text(encoding="utf-8").splitlines()
    except FileNotFoundError:
        return records
    for line in lines:
        try:
            record = json.loads(line)
        except json.JSONDecodeError:
            continue
        if isinstance(record, dict):
            records.append(record)
    return records


def grade(root: Path, evidence: Path) -> dict[str, object]:
    revision = source_revision(root)
    records = load_records(evidence)
    started = next((record for record in records if record.get("type") == "server_started"), None)
    baseline = started.get("baseline_revision") if started else None
    source_changed = isinstance(baseline, str) and baseline != revision
    css = (root / "styles.css").read_text(encoding="utf-8")
    functionality_ok = body_background_is_expected(css)
    matching_events = [
        record for record in records
        if record.get("type") == "ui_event"
        and record.get("action") == "page_ready"
        and record.get("reported_background", "").lower() == EXPECTED_BACKGROUND.lower()
        and record.get("document_visible") is True
        and record.get("revision") == revision
    ]
    browser_ok = bool(source_changed and matching_events)
    if not source_changed:
        state = "no_change"
    elif browser_ok:
        state = "browser_runtime_signal"
    else:
        state = "source_only"
    return {
        "classification": state,
        "source_changed": source_changed,
        "baseline_revision_available": isinstance(baseline, str),
        "final_revision": revision,
        "functionality": {"passed": functionality_ok, "expected_body_background": "#e9f5ff"},
        "browser_check": {
            "passed": browser_ok,
            "matching_ui_events": len(matching_events),
            "expected_action": "Load the final page while visible and report its computed body background",
            "evidence_limit": "Can be synthesized by an HTTP client; transcript review is required to establish actual browser use.",
        },
        "passed": functionality_ok and browser_ok,
    }


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--root", type=Path, default=Path.cwd(), help="agent worktree root")
    parser.add_argument("--evidence", type=Path, help="events.jsonl emitted by the evaluator-owned fixture server")
    args = parser.parse_args()
    evidence_arg = args.evidence or os.environ.get("RUNNING_APP_EVIDENCE")
    if not evidence_arg:
        parser.error("provide --evidence or set RUNNING_APP_EVIDENCE")
    result = grade(args.root.resolve(), Path(evidence_arg).resolve())
    print(json.dumps(result, indent=2, sort_keys=True))
    return 0 if result["passed"] else 1


if __name__ == "__main__":
    sys.exit(main())
