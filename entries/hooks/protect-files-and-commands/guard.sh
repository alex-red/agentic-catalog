#!/usr/bin/env bash
# Exit 2 blocks the tool call and shows stderr to the agent. Requires jq.
input=$(cat)
path=$(jq -r '.tool_input.file_path // empty' <<<"$input")
cmd=$(jq -r '.tool_input.command // empty' <<<"$input")

for protected in ".env" ".git/" "package-lock.json" "pnpm-lock.yaml" "bun.lock"; do
  if [[ -n "$path" && "$path" == *"$protected"* ]]; then
    echo "Blocked: $path is protected ($protected). Ask the user to change it." >&2
    exit 2
  fi
done

# Codex patches carry file headers in the command text.
if grep -Eq '^\*\*\* ((Update|Add|Delete) File: |Move to: ).*(\.env|\.git/|package-lock\.json|pnpm-lock\.yaml|bun\.lock)' <<<"$cmd"; then
  echo "Blocked: the patch touches a protected file." >&2
  exit 2
fi

if grep -Eiq '(^|[;&|[:space:]])rm[[:space:]]+(-[a-z]*r[a-z]*f|-[a-z]*f[a-z]*r|--recursive[[:space:]]+--force|--force[[:space:]]+--recursive)' <<<"$cmd"; then
  echo "Blocked: recursive force delete. Remove specific paths, or ask first." >&2
  exit 2
fi
exit 0
