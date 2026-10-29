# Local desktop attention alerts

Use this when terminal attention signals are easy to miss while working in another application. If the app already provides suitable desktop notifications, keep that instead.

## Install

Requires Python 3 and either macOS `osascript` or Linux `notify-send` with a desktop notification daemon. Copy [notify.py](notify.py) to `.claude/hooks/desktop-attention/notify.py`. Merge [settings.example.json](settings.example.json) into `.claude/settings.json`, preserving other hooks. The config uses exec-form arguments; the script does not need executable permission. Inspect it in `/hooks` and test a harmless permission request.

The handler filters `permission_prompt`, `idle_prompt`, and `elicitation_dialog`. It sends one fixed message through the local OS service. It never includes the prompt, command, path, or notification body and makes no network requests. Errors are advisory and do not change permissions.

macOS may require enabling notifications for Script Editor in system settings. Linux needs an active graphical session; SSH and headless containers commonly lack one. Windows is outside this implementation's scope. Remove this handler to disable it; no persistent state is created by the script.
