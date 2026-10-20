# Block "done" until checks pass

A Stop hook that runs the project's fast gate when the agent tries to finish. If the gate fails, the hook blocks and returns the output, so the agent keeps fixing. It needs a fast gate, ideally under a minute, and the `stop_hook_active` guard, or it can loop and burn tokens.

Save as `.claude/hooks/stop-gate.sh` and make it executable. Set `GATE` to the project's real fast check:

```bash
#!/usr/bin/env bash
GATE=${GATE:-"npm run -s typecheck && npm test --silent"}
input=$(cat)
# Allow the stop with an empty JSON object; Codex rejects plain text on exit 0.
allow() { echo '{}'; exit 0; }
# If this stop was already blocked once, let it end.
[[ $(jq -r '.stop_hook_active // false' <<<"$input") == "true" ]] && allow
# Skip turns that changed nothing, such as questions and answers.
git diff --quiet && git diff --cached --quiet && allow
if ! out=$(bash -c "$GATE" 2>&1); then
  echo "Checks failed; fix them before finishing:" >&2
  tail -n 40 <<<"$out" >&2
  exit 2
fi
allow
```

Register it in `.claude/settings.json` under `Stop`, with no matcher:

```json
{ "hooks": { "Stop": [{ "hooks": [{ "type": "command", "command": ".claude/hooks/stop-gate.sh" }] }] } }
```

For Codex, register the same script under `Stop` in `.codex/hooks.json` and trust it with `/hooks`. Codex expects JSON on stdout when a Stop hook exits 0, which is why the script prints `{}`.

Do not use this hook where the gate needs a build or server the agent is not allowed to start.
