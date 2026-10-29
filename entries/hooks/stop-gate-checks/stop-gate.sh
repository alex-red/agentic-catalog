#!/usr/bin/env bash
GATE=${GATE:-"npm run -s typecheck && npm test --silent"}
input=$(cat)
# Allow the stop with an empty JSON object; Codex rejects plain text on exit 0.
allow() { echo '{}'; exit 0; }
# If this stop was already blocked once, let it end.
[[ $(jq -r '.stop_hook_active // false' <<<"$input") == "true" ]] && allow
# Skip turns that changed nothing, such as questions and answers.
if git diff --quiet && git diff --cached --quiet && [[ -z $(git ls-files --others --exclude-standard) ]]; then
  allow
fi
if ! out=$(bash -c "$GATE" 2>&1); then
  echo "Checks failed; fix them before finishing:" >&2
  tail -n 40 <<<"$out" >&2
  exit 2
fi
allow
