#!/usr/bin/env python3
"""Serve the live fixture and collect lightweight UI interaction evidence."""

from __future__ import annotations

import argparse
import hashlib
import hmac
import json
import mimetypes
import os
import secrets
import sys
import time
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlsplit

SOURCE_FILES = ("index.html", "styles.css", "app.js")
MAX_EVENT_BYTES = 16_384


def source_snapshot(root: Path) -> tuple[str, dict[str, str]]:
    files: dict[str, str] = {}
    digest = hashlib.sha256()
    for name in SOURCE_FILES:
        path = root / name
        content = path.read_bytes()
        files[name] = hashlib.sha256(content).hexdigest()
        digest.update(name.encode("utf-8"))
        digest.update(b"\0")
        digest.update(content)
        digest.update(b"\0")
    return digest.hexdigest(), files


def append_record(path: Path, record: dict[str, object]) -> None:
    with path.open("a", encoding="utf-8") as stream:
        stream.write(json.dumps(record, sort_keys=True) + "\n")


class FixtureServer(ThreadingHTTPServer):
    daemon_threads = True
    allow_reuse_address = True

    def __init__(self, address: tuple[str, int], root: Path, evidence_file: Path):
        super().__init__(address, FixtureHandler)
        self.root = root
        self.evidence_file = evidence_file
        self.token = secrets.token_urlsafe(24)
        self.baseline_revision, _ = source_snapshot(root)
        append_record(evidence_file, {
            "type": "server_started",
            "timestamp": time.time(),
            "baseline_revision": self.baseline_revision,
        })


class FixtureHandler(SimpleHTTPRequestHandler):
    server: FixtureServer

    def __init__(self, *args, **kwargs):
        server = args[2]
        super().__init__(*args, directory=str(server.root), **kwargs)

    def log_message(self, _format: str, *_args: object) -> None:
        return

    def _json(self, status: int, value: dict[str, object]) -> None:
        body = json.dumps(value, sort_keys=True).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self) -> None:
        path = urlsplit(self.path).path
        if path == "/__eval/health":
            self._json(200, {"ready": True})
            return
        if path == "/__eval/meta":
            revision, files = source_snapshot(self.server.root)
            self._json(200, {"revision": revision, "files": files, "token": self.server.token})
            return
        if path == "/":
            self.path = "/index.html"
        super().do_GET()

    def do_POST(self) -> None:
        if urlsplit(self.path).path != "/__eval/event":
            self._json(404, {"error": "not_found"})
            return
        origin = self.headers.get("Origin", "")
        if origin and origin not in self._allowed_origins():
            self._json(403, {"error": "origin_rejected"})
            return
        try:
            length = int(self.headers.get("Content-Length", "0"))
        except ValueError:
            length = 0
        if length < 1 or length > MAX_EVENT_BYTES:
            self._json(413, {"error": "invalid_body_size"})
            return
        try:
            payload = json.loads(self.rfile.read(length))
        except (json.JSONDecodeError, UnicodeDecodeError):
            self._json(400, {"error": "invalid_json"})
            return
        if not isinstance(payload, dict) or not hmac.compare_digest(str(payload.get("token", "")), self.server.token):
            self._json(403, {"error": "invalid_token"})
            return
        revision, _ = source_snapshot(self.server.root)
        action = payload.get("action")
        if action == "page_ready":
            background = payload.get("background")
            visible = payload.get("documentVisible") is True
            if (payload.get("revision") != revision or not isinstance(background, str)
                    or len(background) > 80 or not visible):
                self._json(409, {"error": "event_does_not_match_current_page"})
                return
            record = {
                "type": "ui_event",
                "timestamp": time.time(),
                "action": action,
                "reported_background": background,
                "document_visible": visible,
                "revision": revision,
                "user_agent": self.headers.get("User-Agent", ""),
                "origin": origin,
            }
        elif action == "task_added":
            task_text = payload.get("taskText")
            task_count = payload.get("taskCount")
            if (payload.get("revision") != revision or not isinstance(task_text, str)
                    or not task_text.strip() or len(task_text) > 160
                    or payload.get("taskVisible") is not True or not isinstance(task_count, int) or task_count < 1):
                self._json(409, {"error": "event_does_not_match_current_page"})
                return
            record = {
                "type": "ui_event",
                "timestamp": time.time(),
                "action": action,
                "task_text": task_text,
                "task_visible": True,
                "task_count": task_count,
                "revision": revision,
                "user_agent": self.headers.get("User-Agent", ""),
                "origin": origin,
            }
        else:
            self._json(409, {"error": "event_does_not_match_current_page"})
            return
        append_record(self.server.evidence_file, record)
        self._json(201, {"recorded": True})

    def _allowed_origins(self) -> set[str]:
        host = self.headers.get("Host", "")
        return {f"http://{host}"} if host else set()


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--root", required=True, type=Path, help="agent worktree containing index.html")
    parser.add_argument("--host", default="127.0.0.1")
    parser.add_argument("--port", type=int, default=0, help="use 0 for an ephemeral port")
    parser.add_argument("--evidence-dir", required=True, type=Path, help="directory outside the agent worktree")
    args = parser.parse_args()
    root = args.root.resolve(strict=True)
    evidence_dir = args.evidence_dir.resolve()
    if not root.is_dir() or not (root / "index.html").is_file():
        parser.error("--root must be a fixture worktree containing index.html")
    try:
        evidence_dir.relative_to(root)
    except ValueError:
        pass
    else:
        parser.error("--evidence-dir must be outside --root")
    for name in SOURCE_FILES:
        if not (root / name).is_file():
            parser.error(f"fixture source is missing: {name}")
    evidence_dir.mkdir(parents=True, exist_ok=True)
    evidence_file = evidence_dir / "events.jsonl"
    server = FixtureServer((args.host, args.port), root, evidence_file)
    host, port = server.server_address[:2]
    url_host = f"[{host}]" if ":" in host else host
    print(json.dumps({
        "url": f"http://{url_host}:{port}/",
        "root": str(root),
        "evidenceFile": str(evidence_file),
        "baselineRevision": server.baseline_revision,
        "pid": os.getpid(),
    }), flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()
    return 0


if __name__ == "__main__":
    sys.exit(main())
