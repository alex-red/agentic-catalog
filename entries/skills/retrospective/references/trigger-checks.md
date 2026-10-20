# Trigger checks

A trigger check runs short sessions with a request and records whether the agent loaded the skill. Use requests taken from real work, plus at least one nearby request that should not load the skill.

## Claude Code: `claude plugin eval`

Requires Claude Code 2.1.269 or later. It uses model credits, so tell the user the rough size first: cases × runs, with about 6 turns each.

`claude plugin eval` evaluates a plugin, so wrap the project's skills in a temporary plugin outside the project:

```text
/tmp/skills-eval/
├── .claude-plugin/plugin.json      {"name": "skills-under-test", "version": "0.0.0"}
├── skills/                         copy of the project's .claude/skills/
└── triggers/
    ├── render-debug-activate-1/
    │   ├── prompt.md
    │   └── graders/fired.md
    └── render-debug-ignore-1/
        ├── prompt.md
        └── graders/not-fired.md
```

`prompt.md`:

```markdown
---
tags: [trigger]
allowed_tools: [Read, Glob, Grep, Skill]
max_turns: 6
---

can we hide vertical wall seams between walls in the rendered view?
```

`graders/fired.md` passes when the skill was invoked:

```markdown
---
type: tool_used
tool: Skill
input_match: '"skill"\s*:\s*"(?:[\w-]+:)?render-debug"'
---
```

`graders/not-fired.md` passes when it was not:

```markdown
---
type: tool_used
tool: Skill
input_match: '"skill"\s*:\s*"(?:[\w-]+:)?render-debug"'
min: 0
max: 0
arm: both
---
```

Run it with the model the project normally uses:

```sh
claude plugin eval /tmp/skills-eval --eval-dir triggers --ablation none --no-publish \
  --trust-plugin --model MODEL --runs 3 --max-cost-usd 10 --json /tmp/skills-eval/result.json
```

The run is sandboxed: user settings, other plugins, and `CLAUDE.md` are not loaded, so it tests the description in isolation. The skill appears under the plugin namespace (`skills-under-test:render-debug`), which the pattern above allows for.

Read the score per case. A skill that fires in fewer than two of three runs on its own activation requests needs a better description. A skill that fires on its ignore request is too broad. Change only the description between runs, and compare before and after on the same cases.

## Codex and other hosts

Codex has no equivalent command. Start a fresh session in the project for each request, for example with `codex exec --sandbox read-only -C PROJECT "REQUEST"`, and check its output for the skill being used. Record the result by hand.

## Keep the cases

Store the requests in the project, for example `tools/skill-triggers.yaml`, so the next retrospective can re-run them after editing a description.
