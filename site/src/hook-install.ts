/** Hook setup is executable only for reviewed standalone registration routes. */
export interface HookInstallEntry {
  id: string;
  type: string;
  path: string;
  files: string[];
  hosts?: string[];
  source: { kind: string; url?: string; path?: string; revision?: string };
}

const LINKED = new Set(["config-guard", "config-watch", "git-safety", "protect-tests", "case-insensitive-guard", "context-hogs"]);

export function canInstallHook(entry: HookInstallEntry, host: "claude-code" | "codex"): boolean {
  if (entry.type !== "hook" || !entry.hosts?.includes(host)) return false;
  if (entry.source.kind === "linked") {
    return LINKED.has(entry.id) && entry.source.url === "https://github.com/karanb192/claude-code-hooks"
      && entry.source.path === `plugins/${entry.id}` && /^[a-f0-9]{40}$/.test(entry.source.revision ?? "");
  }
  return entry.files.includes(`${entry.path}/${host === "claude-code" ? "settings.example.json" : "codex-hooks.example.json"}`);
}

function quote(value: string): string {
  return `'${value.replace(/'/g, `'\\''`)}'`;
}

export function hookInstallCommand(entry: HookInstallEntry, host: "claude-code" | "codex", revision: string, rawRoot: string): string {
  if (!canInstallHook(entry, host)) throw new Error("No standalone hook registration for this host");
  if (!/^(?:main|[a-f0-9]{7,40})$/.test(revision)) throw new Error("Invalid catalog revision");
  const base = `${rawRoot}/${revision}`;
  return [
    "(",
    "  set -eu",
    "  hook_stage=$(mktemp -d)",
    `  trap 'rm -rf "$hook_stage"' EXIT`,
    `  curl -fsSL ${quote(`${base}/scripts/install-hook.py`)} -o "$hook_stage/install-hook.py"`,
    `  python3 "$hook_stage/install-hook.py" ${quote(entry.id)} --host ${quote(host)} --revision ${quote(revision)} --raw-base ${quote(base)}`,
    ")",
  ].join("\n");
}
