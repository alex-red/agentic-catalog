#!/usr/bin/env python3
"""Send a fixed local desktop alert; never forward prompt or tool contents."""
import json
import shutil
import subprocess
import sys


def main():
    event = json.load(sys.stdin)
    if event.get("notification_type") not in {
        "permission_prompt", "idle_prompt", "elicitation_dialog"
    }:
        return
    if sys.platform == "darwin":
        command = ["osascript", "-e", 'display notification "Claude Code needs your attention" with title "Claude Code"']
    elif sys.platform.startswith("linux") and shutil.which("notify-send"):
        command = ["notify-send", "Claude Code", "Claude Code needs your attention"]
    else:
        print("Desktop notification unavailable on this platform.", file=sys.stderr)
        return
    subprocess.run(command, check=True, timeout=5, capture_output=True)


if __name__ == "__main__":
    try:
        main()
    except (ValueError, AttributeError, OSError, subprocess.SubprocessError):
        print("Desktop notification failed; check local notification permissions.", file=sys.stderr)
