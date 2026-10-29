# Catch recognizable credentials in prompts

Catch a narrow set of accidental credential pastes before a submitted prompt reaches the model: private-key headers, AWS access-key IDs, and classic GitHub token shapes. It deliberately reports only the category. Example credentials can trigger it too; replace them with clear placeholders.

## Claude Code install

Requires Python 3 and Claude Code 2.1.295+ for `onFailure: "block"`. Copy [check.py](check.py) to `.claude/hooks/prompt-secret-check/check.py`. Merge [settings.example.json](settings.example.json) into `.claude/settings.json` without replacing other hooks. It runs synchronously on `UserPromptSubmit` and exits 2 on a match or malformed input. Missing/crashing/timed-out handlers also withhold the prompt under the configured host failure policy.

Test in a scratch session with a fake private-key header and no key material. Confirm the prompt is withheld and the diagnostic contains only a category, then resubmit with a placeholder. Removing this handler disables it. There is no bypass phrase for prompt content to exploit and no state or network call.

This is a recognizable-format check, not comprehensive DLP. It misses arbitrary passwords, personal data, new token formats and split/encoded strings. It does not inspect files, attachments, tool outputs, host-injected context or every auxiliary request. It also cannot erase content already pasted into the UI, stored locally by the host, or sent earlier. `no-email-context` covers one separate host-injected identity block. Prefer existing managed DLP if it already covers this job.

## Codex install

Copy the same [check.py](check.py) to `.codex/hooks/prompt-secret-check/check.py`. Merge [codex-hooks.example.json](codex-hooks.example.json) into `.codex/hooks.json` and trust the project and exact definition in `/hooks`. The example uses the Git root to locate the script, so requires a local Git project and Python 3.

Codex's `UserPromptSubmit` supplies the same `prompt` field and honors exit 2 with stderr as a rejection reason. This script therefore needs no payload rewrite. Its deliberate rejections and redacted diagnostics are shared across both hosts; no allow decision or prompt context is emitted.

Claude's `onFailure: "block"` is deliberately absent from the Codex registration: host timeout, missing interpreter or startup failure may proceed without a blocking result. Test a harmless synthetic marker in the actual client; do not infer fail-closed DLP from a valid settings file. The same data-path and local-history limits apply. See the [official event contract](https://learn.chatgpt.com/docs/hooks#userpromptsubmit).
