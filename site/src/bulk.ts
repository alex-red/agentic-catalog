// Bulk install: turns a selection of catalog entries into a reviewable bash script and a YAML config.
// No DOM access here, so the logic is shared by the browser and the tests.
import { parse, stringify } from "yaml";
import { canInstallHook } from "./hook-install.ts";

export type BulkHost = "claude-code" | "codex";
/** `project` installs into the repository the script runs in; `user` installs under $HOME for every project. */
export type BulkScope = "project" | "user";

/** The subset of a catalog entry that installation needs. */
export interface BulkEntry {
  id: string;
  type: string;
  title?: string;
  path: string;
  files: string[];
  hosts?: string[];
  source: { kind: string; url?: string; path?: string; revision?: string };
  install?: { "claude-code"?: string; codex?: string; any?: string; notes?: string };
}

export interface InstallConfig {
  schemaVersion: 1;
  /** Catalog commit the files are fetched from. */
  revision: string;
  host: BulkHost;
  scope: BulkScope;
  /** Install catalog skills with the skills CLI (skills.sh) instead of copying files. */
  skillsCli: boolean;
  entries: { id: string; type: string }[];
  /** Collections the selection started from; `entries` stays the source of truth. */
  collections?: string[];
}

export interface BulkOptions {
  /** e.g. https://github.com/alex-red/agentic-catalog */
  repository: string;
  /** Raw file root without a ref, e.g. https://raw.githubusercontent.com/alex-red/agentic-catalog */
  rawRoot: string;
  /** Where people upload the config to edit it. */
  siteUrl: string;
}

export type StepKind = "install" | "manual" | "remove";

export interface Step {
  id: string;
  type: string;
  kind: StepKind;
  /** Shell lines; manual steps are comments only. */
  lines: string[];
  /** Short human summary for the review list. */
  summary: string;
}

export const CONFIG_NAME = "agentic-catalog.yaml";
export const CONFIG_SCHEMA_PATH = "catalog/schema/install-config.schema.json";

const ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const REVISION = /^(?:[0-9a-f]{7,40}|main)$/;
const SAFE = /^[\w./:@=+-]+$/;
const SKILLS_ADD = /^npx skills add [\w./:@-]+ --skill [\w.-]+$/;

export function skillDir(host: BulkHost, id: string): string {
  return `${host === "claude-code" ? ".claude" : ".agents"}/skills/${id}`;
}

/** Where the config lives for a scope, as shown to people. */
export function configPath(scope: BulkScope): string {
  return scope === "user" ? `~/.agents/${CONFIG_NAME}` : `.agents/${CONFIG_NAME}`;
}

interface Where {
  /** Shell word for the path. Project paths are relative to the directory the script runs in. */
  sh: string;
  /** Path as shown in the review list. */
  show: string;
}

function at(scope: BulkScope, rel: string): Where {
  return scope === "user" ? { sh: `"$HOME/${rel}"`, show: `~/${rel}` } : { sh: rel, show: rel };
}

/** The file Codex reads instructions from: the repository's AGENTS.md, or the global one in CODEX_HOME. */
function codexInstructions(scope: BulkScope): Where {
  return scope === "user" ? { sh: `"\${CODEX_HOME:-$HOME/.codex}/AGENTS.md"`, show: "~/.codex/AGENTS.md" } : { sh: "AGENTS.md", show: "AGENTS.md" };
}

function agentFile(e: BulkEntry, file: string): string {
  const rel = file.slice(e.path.length + 1);
  return rel === "AGENT.md" ? `${e.id}.md` : `${e.id}.${rel.replace(/\//g, "-")}`;
}

function sh(value: string): string {
  return SAFE.test(value) ? value : `'${value.replace(/'/g, `'\\''`)}'`;
}

function comment(text: string): string[] {
  return text.split("\n").map((line) => `# ${line}`.trimEnd());
}

/** Entries whose files this repository serves directly. */
function hosted(e: BulkEntry): boolean {
  return e.source.kind !== "linked";
}

function primaryFile(e: BulkEntry): string | undefined {
  return e.files.find((f) => /\/(?:SKILL|RULE|WORKFLOW|HOOK|AGENT|MCP)\.md$/.test(f)) ?? e.files[0];
}

function guidance(e: BulkEntry, host: BulkHost, opts: BulkOptions, revision: string): string {
  const text = e.install?.[host] ?? e.install?.any;
  const read = primaryFile(e);
  const where = read ? `${opts.rawRoot}/${revision}/${read}` : e.source.url;
  return [text, where && `See ${where}`].filter(Boolean).join("\n");
}

function installStep(e: BulkEntry, config: InstallConfig, opts: BulkOptions): Step {
  const { host, scope, revision } = config;
  const head = `# ${e.id} (${e.type})`;
  const rel = (f: string) => f.slice(e.path.length + 1);
  const step = (summary: string, lines: string[]): Step => ({ id: e.id, type: e.type, kind: "install", summary, lines: [head, ...lines] });
  const cliFlags = `-a ${host}${scope === "user" ? " -g" : ""}`;

  if (e.type === "skill" && hosted(e)) {
    if (config.skillsCli) return step("skills CLI", [`npx skills add ${opts.repository}/tree/${revision}/${e.path} ${cliFlags}`]);
    const dest = at(scope, skillDir(host, e.id));
    return step(dest.show, [...e.files.map((f) => `fetch ${sh(f)} ${sh(`${e.id}/${rel(f)}`)}`), `place ${e.id} "$STAGE/${e.id}" ${dest.sh}`]);
  }
  if (e.type === "skill" && e.install?.any && SKILLS_ADD.test(e.install.any)) {
    return step("skills CLI (upstream, unpinned)", [`${e.install.any} ${cliFlags}`]);
  }
  if (e.type === "rule" && hosted(e)) {
    const fetch = `fetch ${sh(`${e.path}/RULE.md`)} ${e.id}.md`;
    if (host === "claude-code") {
      const dest = at(scope, `.claude/rules/${e.id}.md`);
      return step(dest.show, [fetch, `place ${e.id} "$STAGE/${e.id}.md" ${dest.sh}`]);
    }
    const file = codexInstructions(scope);
    return step(`block in ${file.show}`, [fetch, `block ${e.id} "$STAGE/${e.id}.md" ${file.sh}`]);
  }
  if (e.type === "subagent" && hosted(e) && host === "claude-code") {
    // Claude Code loads agents/*.md; companion files such as a license sit next to it under the entry's name.
    const lines = e.files.flatMap((f) => {
      const name = agentFile(e, f);
      return [`fetch ${sh(f)} ${sh(`agents/${name}`)}`, `place ${e.id} "$STAGE/agents/${name}" ${at(scope, `.claude/agents/${name}`).sh}`];
    });
    return step(at(scope, `.claude/agents/${e.id}.md`).show, lines);
  }
  if (scope === "project" && canInstallHook(e, host)) {
    return step(`copy runtime and merge ${host === "claude-code" ? ".claude/settings.json" : ".codex/hooks.json"}`, [
      'fetch scripts/install-hook.py hook-installer.py',
      `python3 "$STAGE/hook-installer.py" ${sh(e.id)} --host ${sh(host)} --revision ${sh(revision)} --raw-base "$BASE"`,
    ]);
  }
  // Unsupported/global hooks, MCP servers, workflows, plugins and prose installers stay manual.
  return { id: e.id, type: e.type, kind: "manual", summary: e.type === "hook" || e.type === "mcp" ? "review and configure by hand" : "follow the steps by hand", lines: [head, ...comment(`manual: ${guidance(e, host, opts, revision)}`)] };
}

function removeStep(id: string, e: BulkEntry | undefined, baseline: InstallConfig): Step {
  const head = `# ${id} (${e?.type ?? "no longer in the catalog"})`;
  const manual = (text: string): Step => ({ id, type: e?.type ?? "unknown", kind: "remove", summary: "remove by hand", lines: [head, ...comment(`manual: ${text}`)] });
  const step = (summary: string, lines: string[]): Step => ({ id, type: e?.type ?? "unknown", kind: "remove", summary, lines: [head, ...lines] });
  if (!e) return manual(`undo whatever you installed for ${id}.`);
  const { host, scope } = baseline;
  if (e.type === "skill" && hosted(e) && !baseline.skillsCli) {
    const dest = at(scope, skillDir(host, id));
    return step(dest.show, [`remove ${id} ${dest.sh}`]);
  }
  if (e.type === "skill" && (hosted(e) || (e.install?.any && SKILLS_ADD.test(e.install.any)))) {
    return manual(`run npx skills remove${scope === "user" ? " -g" : ""} and pick this skill.`);
  }
  if (e.type === "rule" && hosted(e)) {
    if (host === "claude-code") {
      const dest = at(scope, `.claude/rules/${id}.md`);
      return step(dest.show, [`remove ${id} ${dest.sh}`]);
    }
    const file = codexInstructions(scope);
    return step(`block in ${file.show}`, [`unblock ${id} ${file.sh}`]);
  }
  if (e.type === "subagent" && hosted(e) && host === "claude-code") {
    return step(at(scope, `.claude/agents/${id}.md`).show, e.files.map((f) => `remove ${id} ${at(scope, `.claude/agents/${agentFile(e, f)}`).sh}`));
  }
  return manual(`undo the steps you followed to install ${id}.`);
}

/**
 * Works out what the script does. Entries in `baseline` but not in `config` are removed; when the host, scope,
 * or skills CLI choice changed, everything from the baseline is removed from its old location first.
 */
export function planSteps(catalog: BulkEntry[], config: InstallConfig, opts: BulkOptions, baseline?: InstallConfig): Step[] {
  const byId = new Map(catalog.map((e) => [e.id, e]));
  const steps: Step[] = [];
  if (baseline) {
    const moved = baseline.host !== config.host || baseline.scope !== config.scope || baseline.skillsCli !== config.skillsCli;
    const keep = new Set(config.entries.map((e) => e.id));
    for (const { id } of baseline.entries) {
      if (moved || !keep.has(id)) steps.push(removeStep(id, byId.get(id), baseline));
    }
  }
  for (const { id } of config.entries) {
    const e = byId.get(id);
    if (e) steps.push(installStep(e, config, opts));
  }
  return steps;
}

const PRELUDE = `set -euo pipefail

FORCE="\${FORCE:-0}"
STAGE="$(mktemp -d)"
skipped=0

# fetch PATH NAME: download one catalog file into the staging directory.
fetch() { mkdir -p "$(dirname "$STAGE/$2")"; curl -fsSL "$BASE/$1" -o "$STAGE/$2"; }

# place ID STAGED DEST: copy a staged file or directory into place. Existing content that differs
# (local edits or an upstream update) is left alone unless FORCE=1.
place() {
  if [ -e "$3" ]; then
    if diff -rq "$2" "$3" >/dev/null 2>&1; then echo "unchanged $1 ($3)"; return; fi
    if [ "$FORCE" != 1 ]; then
      echo "skipped $1: $3 differs. Compare with: diff -ru $3 $2" >&2
      skipped=1; return
    fi
    rm -rf "$3"
  fi
  mkdir -p "$(dirname "$3")"; cp -R "$2" "$3"; echo "installed $1 ($3)"
}

# block ID STAGED FILE: add or replace the marked block for ID in FILE.
block() {
  local new="$STAGE/$1.block" old="$STAGE/$1.old"
  { echo "<!-- agentic-catalog:begin id=$1 source=$REVISION -->"; cat "$2"; [ -z "$(tail -c1 "$2")" ] || echo; echo "<!-- agentic-catalog:end -->"; } > "$new"
  mkdir -p "$(dirname "$3")"; touch "$3"
  awk -v p="<!-- agentic-catalog:begin id=$1 " 'index($0, p) == 1 { b = 1 } b { print } b && $0 == "<!-- agentic-catalog:end -->" { b = 0 }' "$3" > "$old"
  if [ -s "$old" ]; then
    if [ "$(tail -n +2 "$old")" = "$(tail -n +2 "$new")" ]; then echo "unchanged $1 ($3)"; return; fi
    if [ "$FORCE" != 1 ]; then
      echo "skipped $1: its block in $3 differs. Compare with: diff $old $new" >&2
      skipped=1; return
    fi
    unblock "$1" "$3" >/dev/null
  fi
  cat "$new" >> "$3"; echo "installed $1 ($3)"
}

# unblock ID FILE: delete the marked block for ID from FILE.
unblock() {
  [ -f "$2" ] || return 0
  awk -v p="<!-- agentic-catalog:begin id=$1 " 'index($0, p) == 1 { b = 1 } !b { print } b && $0 == "<!-- agentic-catalog:end -->" { b = 0 }' "$2" > "$STAGE/unblock" && cat "$STAGE/unblock" > "$2"
  echo "removed $1 ($2)"
}

# remove ID PATH
remove() { if [ -e "$2" ]; then rm -rf "$2"; echo "removed $1 ($2)"; fi; }
`;

export function configToScript(catalog: BulkEntry[], config: InstallConfig, opts: BulkOptions, baseline?: InstallConfig): string {
  const steps = planSteps(catalog, config, opts, baseline);
  const section = (kind: StepKind, title: string) => {
    const chosen = steps.filter((s) => s.kind === kind);
    return chosen.length ? [`# --- ${title} ---`, "", ...chosen.flatMap((s) => [...s.lines, ""])] : [];
  };
  return [
    "#!/usr/bin/env bash",
    `# Generated by Agentic Catalog (${opts.siteUrl}).`,
    `# Catalog revision ${config.revision}, host ${config.host}, scope ${config.scope}.`,
    config.scope === "user"
      ? "# Installs for every project under your home folder; it can run from any directory. Read it first."
      : "# Installs into one repository: read it, then run it from that repository's root.",
    "# Re-running is safe: existing files that differ are skipped unless you run it with FORCE=1.",
    PRELUDE,
    config.scope === "user" ? 'echo "Installing for all projects under $HOME"' : 'echo "Installing into $(pwd)"',
    `REVISION=${sh(config.revision)}`,
    `BASE="\${CATALOG_RAW_BASE:-${opts.rawRoot}/${config.revision}}"`,
    "",
    ...section("remove", "Remove entries dropped from the config"),
    ...section("install", "Install"),
    ...section("manual", "Manual steps (unsupported/global hooks, MCP servers, workflows, plugins, and prose installers)"),
    "# --- Record the selection ---",
    "",
    `mkdir -p ${at(config.scope, ".agents").sh}`,
    `cat > ${at(config.scope, `.agents/${CONFIG_NAME}`).sh} <<'AGENTIC_CATALOG_CONFIG'`,
    configToYaml(config, opts).trimEnd(),
    "AGENTIC_CATALOG_CONFIG",
    `echo "wrote ${configPath(config.scope)}"`,
    "",
    `if [ "$skipped" = 0 ]; then rm -rf "$STAGE"; else echo "Some entries were skipped; their catalog copies are in $STAGE" >&2; fi`,
    "",
  ].join("\n");
}

export function configToYaml(config: InstallConfig, opts: BulkOptions): string {
  const body: Record<string, unknown> = {
    schemaVersion: config.schemaVersion,
    revision: config.revision,
    host: config.host,
    scope: config.scope,
    skillsCli: config.skillsCli,
    entries: config.entries.map(({ id, type }) => ({ id, type })),
  };
  if (config.collections?.length) body.collections = config.collections;
  return [
    `# yaml-language-server: $schema=${opts.rawRoot}/main/${CONFIG_SCHEMA_PATH}`,
    `# Agentic Catalog selection. Upload it at ${opts.siteUrl} to change it and get a new install script.`,
    stringify(body),
  ].join("\n");
}

const TYPE_ORDER = ["skill", "rule", "workflow", "hook", "subagent", "mcp", "plugin"];

export function makeConfig(catalog: BulkEntry[], ids: Iterable<string>, settings: { revision: string; host: BulkHost; scope: BulkScope; skillsCli: boolean; collections?: Iterable<string> }): InstallConfig {
  const wanted = new Set(ids);
  const entries = catalog
    .filter((e) => wanted.has(e.id))
    .sort((a, b) => TYPE_ORDER.indexOf(a.type) - TYPE_ORDER.indexOf(b.type) || a.id.localeCompare(b.id))
    .map(({ id, type }) => ({ id, type }));
  const collections = [...(settings.collections ?? [])].sort();
  return { schemaVersion: 1, revision: settings.revision, host: settings.host, scope: settings.scope, skillsCli: settings.skillsCli, entries, ...(collections.length ? { collections } : {}) };
}

export interface ParsedConfig {
  config: InstallConfig;
  /** Entries the current catalog can install; unknown IDs stay in `config` so they can be removed. */
  known: string[];
  warnings: string[];
}

/** Parses and validates an uploaded config. Throws on anything malformed; unknown entries are warnings. */
export function parseConfig(text: string, catalog: BulkEntry[]): ParsedConfig {
  let data: unknown;
  try {
    data = parse(text);
  } catch (err) {
    throw new Error(`Not valid YAML: ${(err as Error).message.split("\n")[0]}`);
  }
  const fail = (msg: string): never => {
    throw new Error(`Not an Agentic Catalog config: ${msg}`);
  };
  if (!data || typeof data !== "object" || Array.isArray(data)) fail("expected a mapping at the top level");
  const d = data as Record<string, unknown>;
  const allowed = new Set(["schemaVersion", "revision", "host", "scope", "skillsCli", "entries", "collections"]);
  for (const key of Object.keys(d)) if (!allowed.has(key)) fail(`unknown field "${key}"`);
  if (d.schemaVersion !== 1) fail(`schemaVersion must be 1, got ${JSON.stringify(d.schemaVersion)}`);
  if (typeof d.revision !== "string" || !REVISION.test(d.revision)) fail("revision must be a commit SHA or main");
  if (d.host !== "claude-code" && d.host !== "codex") fail('host must be "claude-code" or "codex"');
  if (d.scope !== undefined && d.scope !== "project" && d.scope !== "user") fail('scope must be "project" or "user"');
  if (d.skillsCli !== undefined && typeof d.skillsCli !== "boolean") fail("skillsCli must be true or false");
  if (!Array.isArray(d.entries)) fail("entries must be a list");
  const seen = new Set<string>();
  const entries = (d.entries as unknown[]).map((item, i) => {
    if (!item || typeof item !== "object" || Array.isArray(item)) return fail(`entries[${i}] must be a mapping with id and type`);
    const { id, type, ...rest } = item as Record<string, unknown>;
    if (Object.keys(rest).length) fail(`entries[${i}] has unknown field "${Object.keys(rest)[0]}"`);
    if (typeof id !== "string" || !ID.test(id)) fail(`entries[${i}].id must be a lowercase entry ID`);
    if (typeof type !== "string" || !TYPE_ORDER.includes(type)) fail(`entries[${i}].type must be one of ${TYPE_ORDER.join(", ")}`);
    if (seen.has(id as string)) fail(`entry "${id}" is listed twice`);
    seen.add(id as string);
    return { id: id as string, type: type as string };
  });
  if (d.collections !== undefined && (!Array.isArray(d.collections) || d.collections.some((c) => typeof c !== "string" || !ID.test(c)))) {
    fail("collections must be a list of collection IDs");
  }
  const config: InstallConfig = {
    schemaVersion: 1,
    revision: d.revision as string,
    host: d.host as BulkHost,
    scope: (d.scope as BulkScope | undefined) ?? "project",
    skillsCli: (d.skillsCli as boolean | undefined) ?? false,
    entries,
    ...(d.collections ? { collections: d.collections as string[] } : {}),
  };
  const byId = new Map(catalog.map((e) => [e.id, e]));
  const warnings: string[] = [];
  const known: string[] = [];
  for (const { id, type } of entries) {
    const e = byId.get(id);
    if (!e) warnings.push(`"${id}" is no longer in the catalog; the script lists it for manual removal.`);
    else {
      if (e.type !== type) warnings.push(`"${id}" is now a ${e.type}, not a ${type}.`);
      known.push(id);
    }
  }
  return { config, known, warnings };
}
