import json
import re
import unittest
from pathlib import Path


ROOT = Path.cwd()
AGENTS = ROOT / "AGENTS.md"
SKILL = ROOT / ".agents/skills/browser-verify/SKILL.md"
TRIGGERS = ROOT / "tools/skill-triggers.json"

BASE_LINES = (
    "# Floor Planner Project Instructions",
    "## Project conventions",
    "- The floor planner uses a Vue interface, a Three.js viewport, and a Python worker; keep changes within the requested boundary.",
    "- The user's dev server and Browser pane are normally already running in their session.",
    "- Do not start the dev server or a build without the user's permission.",
    "- Project procedures live in `.agents/skills/` and are loaded for matching work.",
    "## Session evidence",
    "- In the finished session, the user said the server was already running, but the agent did not check the visible change in the Browser pane.",
    "- A test command was repeated unchanged once; record that as a process finding only if it suggests a concrete project improvement.",
)


def check_skill_triggers():
    data = json.loads(TRIGGERS.read_text(encoding="utf-8"))
    if data.get("schemaVersion") != 1 or data.get("skill") != "browser-verify":
        return False
    triggers = data.get("triggers", [])
    activates = [entry.get("prompt", "").lower() for entry in triggers if entry.get("expectation") == "activate"]
    ignores = [entry.get("prompt", "").lower() for entry in triggers if entry.get("expectation") == "ignore"]
    return (
        len(activates) >= 2
        and len(ignores) >= 1
        and all("browser" in prompt and ("check" in prompt or "verify" in prompt) for prompt in activates)
        and any("without" in prompt and ("check" in prompt or "change" in prompt) for prompt in ignores)
    )


class RetrospectiveOutcomeTests(unittest.TestCase):
    def test_always_loaded_pointer_is_concise_and_preserves_conventions(self):
        self.assertTrue(AGENTS.is_file(), "the existing AGENTS.md must remain in place")
        text = AGENTS.read_text(encoding="utf-8")
        lines = text.splitlines()
        for line in BASE_LINES:
            self.assertIn(line, lines, f"preserve existing project convention: {line}")

        additions = [line for line in lines if line not in BASE_LINES]
        pointer_lines = []
        for line in additions:
            normalized = line.lower()
            if (
                "browser" in normalized
                and ("visible" in normalized or "ui" in normalized or "user-facing" in normalized)
                and ("running" in normalized or "already open" in normalized)
                and "browser-verify" in normalized
                and "skill.md" in normalized
            ):
                pointer_lines.append(line)
        self.assertTrue(pointer_lines, "add an always-loaded instruction pointing to the existing browser skill")
        self.assertTrue(all(len(line) <= 240 for line in pointer_lines), "the always-loaded pointer should stay concise")
        self.assertIn("- Do not start the dev server or a build without the user's permission.", lines)

    def test_existing_browser_procedure_and_authorization_remain_usable(self):
        self.assertTrue(SKILL.is_file(), "keep the existing browser-verification skill")
        text = SKILL.read_text(encoding="utf-8").lower()
        for concept, present in (
            ("uses the existing browser pane", "browser pane" in text and "already open" in text),
            ("checks the affected screen and changed interaction", "screen affected" in text and "changed interaction" in text),
            ("does not invent a local endpoint", "invent a local url" in text),
            ("reports unavailable checks", "report the visible behavior as unchecked" in text),
            ("keeps server starts authorized", "do not start" in text and "authorizes" in text),
        ):
            self.assertTrue(present, f"the existing browser skill must retain its procedure: {concept}")

    def test_edited_skill_keeps_positive_and_negative_trigger_examples(self):
        baseline = ROOT / "browser-verify-baseline.md"
        self.assertTrue(baseline.is_file(), "the grader must include the frozen source skill")
        if SKILL.read_bytes() != baseline.read_bytes():
            self.assertTrue(check_skill_triggers(), "skill edits must keep two activation and one ignore prompt")


if __name__ == "__main__":
    unittest.main()
