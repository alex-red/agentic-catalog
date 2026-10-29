#!/usr/bin/env python3
"""Atomically reserve Claude Agent/Task or Codex spawn_agent calls per session."""
import hashlib
import json
import os
from pathlib import Path
import sqlite3
import sys


def main():
    event = json.load(sys.stdin)
    tool = event.get("tool_name")
    if tool not in {"Agent", "Task", "spawn_agent"}:
        print("{}")
        return 0
    session = event.get("session_id")
    if not isinstance(session, str) or not session:
        raise ValueError("missing session ID")
    limit = int(os.environ.get("AGENTIC_SPAWN_LIMIT", "20"))
    if not 1 <= limit <= 10000:
        raise ValueError("invalid limit")
    directory = Path(os.environ.get(
        "AGENTIC_HOOK_STATE_DIR", str(Path.home() / ".local/state/agentic-catalog/subagent-budget")
    ))
    if tool == "spawn_agent":
        directory = directory / "codex"
    directory.mkdir(parents=True, exist_ok=True, mode=0o700)
    # Preserve existing Claude ledgers and isolate Codex's session-ID namespace.
    key = hashlib.sha256(session.encode()).hexdigest()
    database = directory / (key + ".sqlite3")
    with sqlite3.connect(database, timeout=2) as connection:
        connection.execute("CREATE TABLE IF NOT EXISTS budget (id INTEGER PRIMARY KEY CHECK(id = 1), used INTEGER NOT NULL)")
        connection.execute("BEGIN IMMEDIATE")
        row = connection.execute("SELECT used FROM budget WHERE id = 1").fetchone()
        used = row[0] if row else 0
        if used < limit:
            connection.execute("INSERT OR REPLACE INTO budget VALUES (1, ?)", (used + 1,))
        connection.commit()
    if used >= limit:
        print(json.dumps({"hookSpecificOutput": {
            "hookEventName": "PreToolUse", "permissionDecision": "deny",
            "permissionDecisionReason": "Session subagent-call budget exhausted. Continue with existing results; report any remaining work to the user.",
        }}))
    else:
        # Leave the host's ordinary approval flow in place.
        print("{}")
    return 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except (ValueError, AttributeError, TypeError, OSError, sqlite3.Error):
        print("Subagent budget unavailable; no new reservation was granted. Check the state directory, limit, and session ID.", file=sys.stderr)
        sys.exit(2)
