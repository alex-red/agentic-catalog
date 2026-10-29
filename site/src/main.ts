import data from "../../catalog/index.json";
import "./styles.css";
import { createCombobox, type ComboOption } from "./combobox";
import { canInstallHook, hookInstallCommand } from "./hook-install";
import { installPrompt } from "./llm-prompt";
import {
  CONFIG_NAME, configPath, configToScript, configToYaml, makeConfig, parseConfig, planSteps, skillDir,
  type BulkHost, type BulkScope, type InstallConfig, type StepKind,
} from "./bulk";

declare const __CATALOG_REVISION__: string;

interface Rating {
  usefulness: number;
  quality: number;
  portability: number;
  novelty: number;
  evidence: string;
  reviewed: string;
  notes: string;
}

interface Source {
  kind: string;
  license: string;
  author?: string;
  url?: string;
  path?: string;
  revision?: string;
  retrieved?: string;
}

interface InstallGuide {
  "claude-code"?: string;
  codex?: string;
  any?: string;
  notes?: string;
}

interface CatalogEntry {
  id: string;
  type: string;
  title: string;
  summary: string;
  useWhen: string;
  tags: string[];
  hosts: string[];
  experimental?: boolean;
  custom?: boolean;
  featured?: boolean;
  score: number;
  sourceUrl?: string;
  path: string;
  files: string[];
  rating: Rating;
  source: Source;
  install?: InstallGuide;
  inspiredBy?: { title: string; url: string }[];
  overlap?: string;
  related?: string[];
}

interface Collection {
  id: string;
  title: string;
  description: string;
  path: string;
  entries: string[];
}

const catalog = data as unknown as {
  entries: CatalogEntry[];
  collections: Collection[];
};

type Kind = string;

interface Item {
  kind: Kind;
  id: string;
  title: string;
  summary: string;
  score?: number;
  tags: string[];
  hosts: string[];
  evidence?: string;
  reviewed?: string;
  sourceKind?: string;
  files: string[];
  entry?: CatalogEntry;
  collection?: Collection;
}

// Lazy raw imports keyed by repo-relative path; HMR reloads them on edit.
const sources = Object.fromEntries(
  Object.entries(
    import.meta.glob(["../../entries/**/*", "../../collections/*.yaml"], { query: "?raw", import: "default" }) as Record<
      string,
      () => Promise<string>
    >,
  ).map(([path, load]) => [path.replace("../../", ""), load]),
);

// Custom and experimental entries form their own tree groups after the established types.
const kinds: Kind[] = ["featured", "skill", "rule", "workflow", "hook", "subagent", "mcp", "plugin", "custom", "experimental", "collection"];
const kindLabels: Record<Kind, string> = {
  skill: "Skills",
  rule: "Rules",
  workflow: "Workflows",
  hook: "Hooks",
  subagent: "Subagents",
  mcp: "MCP Servers",
  plugin: "Plugins",
  featured: "Featured",
  custom: "Custom",
  experimental: "Experimental",
  collection: "Collections",
};

const hostOptions = ["any", "claude-code", "codex"];
const evidenceTiers = ["evaluated", "tested", "used", "reviewed"];
const typeOptions = ["skill", "rule", "workflow", "hook", "subagent", "mcp", "plugin", "collection"];
const sourceKinds = ["original", "adapted", "vendored", "linked"];

type SortKey = "score" | "name" | "evidence" | "reviewed";
const sorters: Record<SortKey, (a: Item, b: Item) => number> = {
  score: (a, b) => (b.score ?? 0) - (a.score ?? 0),
  name: (a, b) => a.title.localeCompare(b.title),
  evidence: (a, b) => evidenceTiers.indexOf(a.evidence ?? "") - evidenceTiers.indexOf(b.evidence ?? "") || (b.score ?? 0) - (a.score ?? 0),
  reviewed: (a, b) => (b.reviewed ?? "").localeCompare(a.reviewed ?? ""),
};

const items: Item[] = [
  ...catalog.entries.map((e) => ({
    kind: e.type,
    id: e.id,
    title: e.title,
    summary: e.summary,
    score: e.score,
    tags: e.tags,
    hosts: e.hosts,
    evidence: e.rating.evidence,
    reviewed: e.rating.reviewed,
    sourceKind: e.source.kind,
    files: [`${e.path}/entry.yaml`, ...e.files],
    entry: e,
  })),
  ...catalog.collections.map((c) => ({
    kind: "collection",
    id: c.id,
    title: c.title,
    summary: c.description,
    tags: ["collection"],
    hosts: ["any"],
    files: [c.path],
    collection: c,
  })),
];

const $ = <T extends HTMLElement>(sel: string) => document.querySelector<T>(sel)!;
const input = $<HTMLInputElement>("#q");
const clearInputBtn = $<HTMLButtonElement>("#q-clear");
const matchCount = $<HTMLSpanElement>("#match-count");
const clearAllFiltersBtn = $<HTMLButtonElement>("#clear-all-filters");

const hostsBox = $("#hosts");
const evidenceBox = $("#evidence");
const sidebarControls = $("#sidebar-controls");
const comboRow = $("#combo-row");
const filterTokens = $("#filter-tokens");
const showExperimental = { checked: true };

const list = $("#list");
const viewer = $("#viewer");
const introDialog = $<HTMLDialogElement>("#intro-dialog");
const introToggle = $<HTMLButtonElement>("#intro-toggle");
const introClose = $<HTMLButtonElement>("#intro-close");
const treeToggleAllBtn = $<HTMLButtonElement>("#tree-toggle-all");

const activeHosts = new Set<string>();
const activeEvidence = new Set<string>();
const activeTypes = new Set<string>();
const activeSourceKinds = new Set<string>();
let sortKey: SortKey = "score";

// Remember the sort order per viewer; storage can be unavailable, so it is best effort.
try {
  const saved = localStorage.getItem("catalog-sort");
  if (saved && saved in sorters) sortKey = saved as SortKey;
} catch {}

// Bulk selection, kept per viewer in localStorage so it survives reloads.
const selected = new Set<string>();
const selectedCollections = new Set<string>();
let bulkHost: BulkHost = "claude-code";
let bulkScope: BulkScope = "project";
let bulkSkillsCli = false;
// The config the viewer uploaded; entries dropped from it get removal steps.
let baseline: InstallConfig | undefined;
let uploadWarnings: string[] = [];

const SELECTION_KEY = "catalog-selection";
const entryIds = new Set(catalog.entries.map((e) => e.id));

function saveSelection() {
  try {
    localStorage.setItem(SELECTION_KEY, JSON.stringify({
      ids: [...selected], collections: [...selectedCollections], host: bulkHost, scope: bulkScope, skillsCli: bulkSkillsCli, baseline,
    }));
  } catch {}
}

try {
  const saved = JSON.parse(localStorage.getItem(SELECTION_KEY) ?? "null") as {
    ids?: string[]; collections?: string[]; host?: string; scope?: string; skillsCli?: boolean; baseline?: InstallConfig;
  } | null;
  if (saved) {
    for (const id of saved.ids ?? []) if (entryIds.has(id)) selected.add(id);
    for (const id of saved.collections ?? []) if (catalog.collections.some((c) => c.id === id)) selectedCollections.add(id);
    if (saved.host === "claude-code" || saved.host === "codex") bulkHost = saved.host;
    if (saved.scope === "project" || saved.scope === "user") bulkScope = saved.scope;
    bulkSkillsCli = saved.skillsCli === true;
    // Re-validate the stored baseline; drop it if it no longer parses.
    if (saved.baseline) baseline = parseConfig(JSON.stringify(saved.baseline), catalog.entries).config;
  }
} catch {}

function el<K extends keyof HTMLElementTagNameMap>(tag: K, text?: string, className?: string): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  if (text) node.textContent = text;
  if (className) node.className = className;
  return node;
}

function chip(label: string, active: Set<string>, onChange: () => void, displayLabel?: string) {
  const b = el("button", displayLabel ?? label, "chip");
  b.type = "button";
  b.setAttribute("aria-pressed", String(active.has(label)));
  b.addEventListener("click", () => {
    active.has(label) ? active.delete(label) : active.add(label);
    onChange();
  });
  return b;
}

function hasFilters(): boolean {
  return activeHosts.size > 0 || activeEvidence.size > 0 || activeTypes.size > 0 || activeSourceKinds.size > 0 ||
    !showExperimental.checked || input.value.trim().length > 0;
}

function clearFilters() {
  activeHosts.clear();
  activeEvidence.clear();
  activeTypes.clear();
  activeSourceKinds.clear();
  showExperimental.checked = true;
  input.value = "";
  clearInputBtn.hidden = true;
  renderControls();
  renderList();
  renderViewer();
}

function visible(): Item[] {
  const q = input.value.trim().toLowerCase();
  return items.filter((e) => {
    if (activeHosts.size > 0) {
      const matchesHost = [...activeHosts].some((h) => {
        if (h === "any") return e.hosts.includes("any");
        return e.hosts.includes(h) || e.hosts.includes("any");
      });
      if (!matchesHost) return false;
    }

    if (activeEvidence.size > 0 && (!e.evidence || !activeEvidence.has(e.evidence))) return false;
    if (activeTypes.size > 0 && !activeTypes.has(e.kind)) return false;
    if (activeSourceKinds.size > 0 && (!e.sourceKind || !activeSourceKinds.has(e.sourceKind))) return false;
    if (!showExperimental.checked && e.entry?.experimental) return false;
    if (!q) return true;
    const haystack = `${e.id} ${e.title} ${e.summary} ${e.entry?.useWhen ?? ""} ${e.tags.join(" ")}`.toLowerCase();
    return haystack.includes(q);
  });
}

function route(): { item?: Item; file?: string } {
  const [path = "", query = ""] = location.hash.slice(2).split("?");
  const [kind, id] = path.split("/");
  const item = items.find((e) => e.kind === kind && e.id === id);
  const primary = item?.files.find((f) => /\/(?:SKILL|RULE|WORKFLOW|HOOK|AGENT|MCP)\.md$/.test(f)) ?? item?.files[0];
  return { item, file: new URLSearchParams(query).get("file") ?? primary };
}

function link(text: string, href: string) {
  const a = el("a", text);
  a.href = href;
  a.target = "_blank";
  a.rel = "noreferrer";
  return a;
}

function renderControls() {
  const refresh = () => {
    renderControls();
    renderList();
  };

  const shown = visible();
  matchCount.textContent = `${shown.length}/${items.length}`;
  clearAllFiltersBtn.hidden = !hasFilters();
  clearInputBtn.hidden = input.value.length === 0;

  // Compact Host chips
  hostsBox.replaceChildren(
    ...hostOptions.map((h) => {
      const label = h === "claude-code" ? "Claude" : h === "codex" ? "Codex" : "Any";
      return chip(h, activeHosts, refresh, label);
    }),
  );

  // Compact Evidence chips
  evidenceBox.replaceChildren(...evidenceTiers.map((ev) => chip(ev, activeEvidence, refresh)));

  sortCombo.refresh();
  filterCombo.refresh();
  renderTokens();
}

const sortLabels: Record<SortKey, string> = {
  score: "Score, high to low",
  name: "Name, A to Z",
  evidence: "Evidence, strongest first",
  reviewed: "Recently reviewed",
};
const sortShort: Record<SortKey, string> = { score: "Score", name: "Name", evidence: "Evidence", reviewed: "Recent" };
const cap = (s: string) => s[0].toUpperCase() + s.slice(1);

function countBy(pick: (i: Item) => string | undefined, value: string) {
  return items.filter((i) => pick(i) === value).length;
}

const HIDE_EXPERIMENTAL = "hide-experimental";

const sortCombo = createCombobox({
  id: "sort",
  label: "Sort",
  multi: false,
  searchable: false,
  host: sidebarControls,
  options: () => (Object.keys(sorters) as SortKey[]).map((k) => ({ value: k, label: sortLabels[k] })),
  isSelected: (o) => o.value === sortKey,
  onSelect: (o) => {
    sortKey = o.value as SortKey;
    try {
      localStorage.setItem("catalog-sort", sortKey);
    } catch {}
    renderList();
  },
  summary: () => sortShort[sortKey],
});

const filterCombo = createCombobox({
  id: "filter",
  label: "Filter",
  multi: true,
  searchable: true,
  placeholder: "Filter by type or source…",
  host: sidebarControls,
  options: (): ComboOption[] => [
    ...typeOptions.map((t) => ({ value: `type:${t}`, label: kindLabels[t], group: "Type", count: countBy((i) => i.kind, t) })),
    ...sourceKinds.map((k) => ({ value: `source:${k}`, label: cap(k), group: "Source", count: countBy((i) => i.sourceKind, k) })),
    { value: HIDE_EXPERIMENTAL, label: "Hide experimental", group: "Show" },
  ],
  isSelected: (o) => {
    if (o.value === HIDE_EXPERIMENTAL) return !showExperimental.checked;
    const [group, v] = o.value.split(":");
    return (group === "type" ? activeTypes : activeSourceKinds).has(v);
  },
  onSelect: (o) => {
    if (o.value === HIDE_EXPERIMENTAL) {
      showExperimental.checked = !showExperimental.checked;
    } else {
      const [group, v] = o.value.split(":");
      const set = group === "type" ? activeTypes : activeSourceKinds;
      set.has(v) ? set.delete(v) : set.add(v);
    }
    renderControls();
    renderList();
  },
  summary: () => (sidebarFilterCount() === 0 ? "All" : ""),
  badge: sidebarFilterCount,
  onClear: () => {
    activeTypes.clear();
    activeSourceKinds.clear();
    showExperimental.checked = true;
    renderControls();
    renderList();
  },
});
comboRow.append(sortCombo.el, filterCombo.el);

function sidebarFilterCount() {
  return activeTypes.size + activeSourceKinds.size + (showExperimental.checked ? 0 : 1);
}

function renderTokens() {
  const tokens: { label: string; remove: () => void }[] = [
    ...[...activeTypes].map((t) => ({ label: kindLabels[t], remove: () => activeTypes.delete(t) })),
    ...[...activeSourceKinds].map((k) => ({ label: cap(k), remove: () => activeSourceKinds.delete(k) })),
    ...(showExperimental.checked ? [] : [{ label: "No experimental", remove: () => (showExperimental.checked = true) }]),
  ];
  filterTokens.hidden = tokens.length === 0;
  filterTokens.replaceChildren(
    ...tokens.map((t) => {
      const b = el("button", undefined, "filter-token");
      b.type = "button";
      b.title = `Remove ${t.label}`;
      b.setAttribute("aria-label", `Remove filter ${t.label}`);
      b.append(el("span", t.label), el("span", "×", "filter-token-x"));
      b.addEventListener("click", () => {
        t.remove();
        renderControls();
        renderList();
      });
      return b;
    }),
  );
}

function renderList() {
  const { item: current } = route();
  list.replaceChildren();
  const shown = visible();

  for (const kind of kinds) {
    const sorter = sorters[sortKey];
    const group = shown.filter((e) => (kind === "featured" ? !!e.entry?.featured : (e.entry?.experimental ? "experimental" : e.entry?.custom ? "custom" : e.kind) === kind)).sort((a, b) => sorter(a, b) || a.id.localeCompare(b.id));
    if (group.length === 0) continue;

    const details = el("details", undefined, "tree-group");
    // Keep groups open by default or if containing the active item
    const hasActive = group.some((e) => e === current);
    details.open = true;

    const summary = el("summary", undefined, "tree-group-summary");
    const chevron = el("span", "▸", "tree-chevron");
    const title = el("span", kindLabels[kind] ?? kind, "tree-group-title");
    const count = el("span", String(group.length), "tree-group-count");
    summary.append(chevron, title, count);
    details.append(summary);

    const treeItems = el("div", undefined, "tree-items");

    for (const item of group) {
      const a = el("a", undefined, "tree-item");
      a.href = `#/${item.kind}/${item.id}`;
      a.setAttribute("aria-current", String(item === current));
      a.title = `${item.title}\n${item.summary}`;

      // Host indicator dot
      const dot = el("span", undefined, "tree-dot");
      if (item.kind === "collection") {
        dot.className += " tree-dot-collection";
        dot.title = "Collection";
      } else if (item.hosts.includes("claude-code") && !item.hosts.includes("codex")) {
        dot.className += " tree-dot-claude";
        dot.title = "Claude Code";
      } else if (item.hosts.includes("codex") && !item.hosts.includes("claude-code")) {
        dot.className += " tree-dot-codex";
        dot.title = "Codex";
      } else {
        dot.className += " tree-dot-any";
        dot.title = "Portable (any host)";
      }

      const itemTitle = el("span", item.title, "tree-item-title");
      a.append(dot, itemTitle);

      if (item.score !== undefined) {
        a.append(el("span", item.score.toFixed(1), "tree-item-score"));
      }

      const row = el("div", undefined, "tree-row");
      row.append(selectBox(item), a);
      treeItems.append(row);
    }

    details.append(treeItems);
    list.append(details);

    if (hasActive) {
      details.open = true;
    }
  }

  if (shown.length === 0) {
    const empty = el("div", undefined, "empty-state");
    empty.style.padding = "2rem 1rem";
    empty.append(el("span", "🔍", "empty-icon"), el("p", "No matching entries found."));
    const resetBtn = el("button", "Reset filters", "btn-subtle");
    resetBtn.onclick = clearFilters;
    empty.append(resetBtn);
    list.append(empty);
  }
}

// A checkbox for an entry, or for all of a collection's members.
function selectBox(item: Item): HTMLInputElement {
  const box = el("input", undefined, "tree-check");
  box.type = "checkbox";
  box.setAttribute("aria-label", `Select ${item.title}`);
  const members = item.collection ? item.collection.entries.filter((id) => entryIds.has(id)) : [item.id];
  const count = members.filter((id) => selected.has(id)).length;
  box.checked = count === members.length;
  box.indeterminate = count > 0 && count < members.length;
  box.addEventListener("change", () => {
    for (const id of members) box.checked ? selected.add(id) : selected.delete(id);
    if (item.collection) box.checked ? selectedCollections.add(item.id) : selectedCollections.delete(item.id);
    selectionChanged();
  });
  return box;
}

function selectionChanged() {
  // A collection stays recorded only while all of its members are selected.
  for (const id of selectedCollections) {
    const c = catalog.collections.find((c) => c.id === id);
    if (!c || !c.entries.every((e) => selected.has(e))) selectedCollections.delete(id);
  }
  saveSelection();
  renderList();
  renderSelectionBar();
}

const selectionBar = $("#selection-bar");
const selectionCount = $("#selection-count");
const bulkDialog = $<HTMLDialogElement>("#bulk-dialog");
const bulkBody = $("#bulk-body");
const configFile = $<HTMLInputElement>("#config-file");

function renderSelectionBar() {
  selectionBar.hidden = selected.size === 0 && !baseline;
  selectionCount.textContent = `${selected.size} selected`;
}

function currentConfig(): InstallConfig {
  return makeConfig(catalog.entries, selected, {
    revision: __CATALOG_REVISION__, host: bulkHost, scope: bulkScope, skillsCli: bulkSkillsCli, collections: selectedCollections,
  });
}

const PAGES_URL = "https://alex-red.github.io/agentic-catalog/";
const SCRIPT_FILE = "install-agentic-catalog.sh";
let bulkTab: "script" | "config" = "script";

function download(name: string, text: string, type: string) {
  const url = URL.createObjectURL(new Blob([text], { type }));
  const a = el("a");
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function renderBulkDialog(error?: string) {
  const opts = { repository: REPO_URL, rawRoot: RAW_ROOT, siteUrl: PAGES_URL };
  const config = currentConfig();
  const steps = planSteps(catalog.entries, config, opts, baseline);
  bulkBody.replaceChildren();

  if (error) bulkBody.append(el("p", error, "bulk-error"));

  // Settings
  const settings = el("div", undefined, "bulk-settings");
  const segmented = <T extends string>(label: string, current: T, options: readonly (readonly [T, string])[], set: (v: T) => void) => {
    const group = el("div", undefined, "install-tabs");
    group.setAttribute("role", "group");
    group.setAttribute("aria-label", label);
    for (const [value, text] of options) {
      const b = el("button", text, "install-tab-btn");
      b.type = "button";
      b.setAttribute("aria-pressed", String(current === value));
      b.onclick = () => {
        set(value);
        saveSelection();
        renderBulkDialog();
      };
      group.append(b);
    }
    return group;
  };
  const cliLabel = el("label", undefined, "bulk-check");
  const cli = el("input");
  cli.type = "checkbox";
  cli.checked = bulkSkillsCli;
  cli.onchange = () => {
    bulkSkillsCli = cli.checked;
    saveSelection();
    renderBulkDialog();
  };
  cliLabel.append(cli, " Install skills with the skills CLI (skills.sh)");
  settings.append(
    segmented("Host", bulkHost, [["claude-code", "Claude Code"], ["codex", "Codex"]], (v) => (bulkHost = v)),
    segmented("Scope", bulkScope, [["project", "This repository"], ["user", "All my projects"]], (v) => (bulkScope = v)),
    cliLabel,
  );
  bulkBody.append(settings);

  // What each scope means, in terms of where things land.
  const scopeNote = el("p", undefined, "bulk-scope");
  if (bulkScope === "project") {
    scopeNote.append(
      "Installs into the repository you run the script in (", el("code", bulkHost === "claude-code" ? ".claude/" : ".agents/ and AGENTS.md"),
      "), so it can be committed and shared with everyone who clones it. The selection is saved to ", el("code", configPath("project")), ".",
    );
  } else {
    scopeNote.append(
      "Installs into your home folder (", el("code", bulkHost === "claude-code" ? "~/.claude/" : "~/.agents/ and ~/.codex/AGENTS.md"),
      "), so it applies to every project on this machine and only for you. The selection is saved to ", el("code", configPath("user")),
      ". Project entries load as well; if a project and a global entry disagree, the agent may follow either, so avoid installing the same entry in both.",
    );
  }
  bulkBody.append(scopeNote);

  // Where the files come from, and what removals are computed against.
  const meta = el("p", undefined, "bulk-meta");
  meta.append("Catalog revision ", el("code", __CATALOG_REVISION__.slice(0, 7)));
  if (baseline) {
    meta.append(". Removals are computed against the uploaded config");
    if (baseline.revision !== __CATALOG_REVISION__) meta.append(" from ", el("code", baseline.revision.slice(0, 7)));
    meta.append(". ");
    const forget = el("button", "Forget uploaded config", "btn-tree-action");
    forget.type = "button";
    forget.onclick = () => {
      baseline = undefined;
      uploadWarnings = [];
      saveSelection();
      renderSelectionBar();
      renderBulkDialog();
    };
    meta.append(forget);
  }
  bulkBody.append(meta);

  if (uploadWarnings.length) {
    const warn = el("ul", undefined, "bulk-warnings");
    for (const w of uploadWarnings) warn.append(el("li", w));
    bulkBody.append(warn);
  }

  // What the script will do
  const groups: [StepKind, string][] = [["install", "Installs"], ["remove", "Removes"], ["manual", "Manual steps"]];
  const plan = el("div", undefined, "bulk-plan");
  for (const [kind, title] of groups) {
    const chosen = steps.filter((s) => s.kind === kind);
    if (!chosen.length) continue;
    const col = el("div", undefined, "bulk-plan-group");
    col.append(el("h3", `${title} (${chosen.length})`));
    const ul = el("ul");
    for (const s of chosen) {
      const li = el("li");
      li.append(el("span", s.id, "bulk-plan-id"), el("span", s.summary, "bulk-plan-where"));
      ul.append(li);
    }
    col.append(ul);
    plan.append(col);
  }
  if (!steps.length) plan.append(el("p", "Nothing selected. Tick entries in the sidebar, or load a config.", "bulk-meta"));
  bulkBody.append(plan);

  // Script and config output
  const script = configToScript(catalog.entries, config, opts, baseline);
  const yaml = configToYaml(config, opts);
  const out = el("div", undefined, "bulk-output");
  const bar = el("div", undefined, "bulk-output-bar");
  const tabs = el("div", undefined, "install-tabs");
  tabs.setAttribute("role", "tablist");
  const pre = el("pre", bulkTab === "script" ? script : yaml, "code-view bulk-code");
  for (const [tab, label] of [["script", SCRIPT_FILE], ["config", configPath(bulkScope)]] as const) {
    const b = el("button", label, "install-tab-btn");
    b.type = "button";
    b.setAttribute("role", "tab");
    b.setAttribute("aria-selected", String(bulkTab === tab));
    b.onclick = () => {
      bulkTab = tab;
      renderBulkDialog();
    };
    tabs.append(b);
  }
  const actions = el("div", undefined, "bulk-output-actions");
  const copy = el("button", "Copy", "btn-snippet-copy");
  copy.type = "button";
  copy.onclick = async () => {
    await navigator.clipboard.writeText(pre.textContent ?? "");
    copy.textContent = "✓ Copied";
    setTimeout(() => (copy.textContent = "Copy"), 1200);
  };
  const save = el("button", "Download", "btn-snippet-copy");
  save.type = "button";
  save.onclick = () => (bulkTab === "script" ? download(SCRIPT_FILE, script, "text/x-shellscript") : download(CONFIG_NAME, yaml, "application/yaml"));
  actions.append(copy, save);
  bar.append(tabs, actions);
  out.append(bar, pre);
  bulkBody.append(out);

  const how = el("p", undefined, "bulk-meta");
  const run = `bash ${SCRIPT_FILE} && rm ${SCRIPT_FILE}`;
  how.append(
    bulkScope === "project" ? "Save the script in the repository root, read it, then run " : "Save the script anywhere, read it, then run ",
    el("code", run), ". It writes ", el("code", configPath(bulkScope)),
    "; choose Load config here later to update or remove entries. ",
    bulkScope === "user" ? "The file picker hides dot-folders such as ~/.agents; on macOS press ⌘⇧. to show them." : "",
  );
  bulkBody.append(how);
}

function openBulkDialog(error?: string) {
  renderBulkDialog(error);
  if (!bulkDialog.open) bulkDialog.showModal();
}

async function loadConfig(file: File) {
  try {
    const { config, known, warnings } = parseConfig(await file.text(), catalog.entries);
    selected.clear();
    for (const id of known) selected.add(id);
    selectedCollections.clear();
    for (const id of config.collections ?? []) selectedCollections.add(id);
    bulkHost = config.host;
    bulkScope = config.scope;
    bulkSkillsCli = config.skillsCli;
    baseline = config;
    uploadWarnings = warnings;
    selectionChanged();
    openBulkDialog();
  } catch (err) {
    openBulkDialog(`${file.name}: ${(err as Error).message}`);
  }
}

$("#config-load").addEventListener("click", () => configFile.click());
configFile.addEventListener("change", () => {
  const file = configFile.files?.[0];
  configFile.value = "";
  if (file) void loadConfig(file);
});
$("#selection-review").addEventListener("click", () => openBulkDialog());
$("#selection-clear").addEventListener("click", () => {
  selected.clear();
  selectedCollections.clear();
  selectionChanged();
});
$("#selection-shown").addEventListener("click", () => {
  for (const item of visible()) if (item.entry) selected.add(item.id);
  selectionChanged();
});
$("#bulk-close").addEventListener("click", () => bulkDialog.close());
bulkDialog.addEventListener("click", (e) => {
  if (e.target === bulkDialog) bulkDialog.close();
});

const REPO_URL = "https://github.com/alex-red/agentic-catalog";
const RAW_ROOT = "https://raw.githubusercontent.com/alex-red/agentic-catalog";
const RAW_BASE = "https://raw.githubusercontent.com/alex-red/agentic-catalog/main";

type InstallHost = "claude" | "codex" | "portable" | "skills";

function installSnippet(e: CatalogEntry, host: InstallHost): { text: string; note?: string } {
  const hookHost = host === "claude" ? "claude-code" : host === "codex" ? "codex" : undefined;
  if (hookHost && canInstallHook(e, hookHost)) {
    return {
      text: hookInstallCommand(e, hookHost, __CATALOG_REVISION__, RAW_ROOT),
      note: `Run from the target project. Requires Python 3.9+, Git and curl. Copies missing runtime files and merges only missing hooks into ${hookHost === "claude-code" ? ".claude/settings.json" : ".codex/hooks.json"}; preserves other settings, backs up changes, and stops on conflicting files. Review the hook and its dependencies before running. ${hookHost === "codex" ? "Then review and trust it in /hooks. " : ""}${e.install?.notes ?? ""}`,
    };
  }
  // skills.sh style: the skills CLI installs one directory by its tree URL. Linked skills use their upstream.
  if (host === "skills") {
    if (e.source.kind === "linked") return installSnippet(e, "portable");
    return {
      text: `npx skills add ${REPO_URL}/tree/main/${e.path}`,
      note: "Uses the skills CLI (skills.sh). It asks which agents to install for; add -a claude-code or -a codex to skip the prompt. The installed folder includes entry.yaml, which agents ignore.",
    };
  }
  const custom = e.install;
  let text = "";

  if (custom) {
    if (host === "claude" && custom["claude-code"]) text = custom["claude-code"];
    else if (host === "codex" && custom.codex) text = custom.codex;
    else if (custom.any) text = custom.any;
    else if (custom["claude-code"]) text = custom["claude-code"];
    else if (custom.codex) text = custom.codex;
  }

  if (!text) {
    if (e.source.kind === "linked" && e.source.url) {
      if (e.type === "skill" && e.source.path) {
        text = `npx skills add ${e.source.url} --skill ${e.source.path}`;
      } else {
        text = `# Refer to upstream install guide at:\n# ${e.source.url}`;
      }
    } else {
      // Commands fetch from the published repo, so they work without a local checkout.
      const raw = (path: string) => `${RAW_BASE}/${path}`;
      const primary = (name: string) => raw(`${e.path}/${name}`);
      switch (e.type) {
        case "skill": {
          const dest = skillDir(host === "claude" ? "claude-code" : "codex", e.id);
          const files = e.files.map((f) => f.slice(e.path.length + 1));
          const dirs = [...new Set(files.map((f) => f.split("/").slice(0, -1).join("/")))];
          const mkdirs = `mkdir -p ${dirs.map((d) => (d ? `${dest}/${d}` : dest)).join(" ")}`;
          text = [mkdirs, ...files.map((f) => `curl -fsSL ${primary(f)} -o ${dest}/${f}`)].join("\n");
          break;
        }
        case "rule":
          if (host === "claude") text = `mkdir -p .claude/rules\ncurl -fsSL ${primary("RULE.md")} -o .claude/rules/${e.id}.md`;
          else text = `{ echo '<!-- agentic-catalog:begin id=${e.id} -->'; curl -fsSL ${primary("RULE.md")}; echo '<!-- agentic-catalog:end -->'; } >> AGENTS.md`;
          break;
        case "workflow":
          text = `# Read the workflow, then follow it:\ncurl -fsSL ${primary("WORKFLOW.md")}`;
          break;
        case "hook":
          if (host === "claude") text = `# Review the script, copy it to .claude/hooks/, and register it in .claude/settings.json:\ncurl -fsSL ${primary("HOOK.md")}`;
          else text = `# Review the script, then register it in .codex/hooks.json:\ncurl -fsSL ${primary("HOOK.md")}`;
          break;
        case "subagent":
          if (host === "claude") text = `mkdir -p .claude/agents\ncurl -fsSL ${primary("AGENT.md")} -o .claude/agents/${e.id}.md`;
          else text = `# Add developer_instructions to .codex/agents/${e.id}.toml:\ncurl -fsSL ${primary("AGENT.md")}`;
          break;
        case "mcp":
          if (host === "claude") text = `claude mcp add ${e.id} --scope project ...`;
          else text = `# Configure in .codex/config.toml under [mcp_servers.${e.id}]:\ncurl -fsSL ${primary("MCP.md")}`;
          break;
        case "plugin":
          if (host === "claude") text = `claude plugin marketplace add alex-red/agentic-catalog\nclaude plugin install ${e.id}@agentic-catalog`;
          else text = `codex plugin marketplace add alex-red/agentic-catalog\ncodex plugin add ${e.id}@agentic-catalog`;
          break;
        default:
          text = `# Copy files from ${e.path}`;
      }
    }
  }

  return { text, note: custom?.notes };
}

function rubricMeter(r: Rating) {
  const box = el("div", undefined, "rubric-meter");
  const axes: { label: string; val: number }[] = [
    { label: "Usefulness", val: r.usefulness },
    { label: "Quality", val: r.quality },
    { label: "Portability", val: r.portability },
    { label: "Novelty", val: r.novelty },
  ];

  for (const axis of axes) {
    const row = el("div", undefined, "rubric-row");
    row.append(el("span", axis.label, "rubric-label"));

    const track = el("div", undefined, "rubric-bar-track");
    const fill = el("div", undefined, "rubric-bar-fill");
    fill.style.width = `${(axis.val / 5) * 100}%`;
    track.append(fill);
    row.append(track);

    row.append(el("span", axis.val.toFixed(1), "rubric-val"));
    box.append(row);
  }

  return box;
}

function copyForLlm(entry?: CatalogEntry, collection?: Collection) {
  const button = el("button", "Copy for LLM", "btn-action");
  button.type = "button";
  button.title = "Copy installation instructions to paste into your coding agent";
  button.onclick = async () => {
    const text = installPrompt({ revision: __CATALOG_REVISION__, entries: catalog.entries, entry, collection });
    try {
      await navigator.clipboard.writeText(text);
      button.textContent = "✓ Copied for LLM";
      setTimeout(() => (button.textContent = "Copy for LLM"), 1800);
    } catch {
      // Clipboard access can be denied or unavailable outside a secure context.
      const dialog = el("dialog", undefined, "dialog-modal");
      dialog.setAttribute("aria-label", "Copy instructions for LLM");
      const header = el("div", undefined, "dialog-header");
      const close = el("button", "×", "btn-dialog-close");
      close.type = "button";
      close.setAttribute("aria-label", "Close dialog");
      close.onclick = () => dialog.close();
      header.append(el("h2", "Copy for LLM"), close);
      const body = el("div", undefined, "llm-copy-body");
      const field = el("textarea", undefined, "llm-copy-text");
      field.value = text;
      field.readOnly = true;
      field.setAttribute("aria-label", "Installation instructions");
      body.append(el("p", "Clipboard access is unavailable. Copy these instructions and paste them into your coding agent."), field);
      dialog.append(header, body);
      dialog.addEventListener("close", () => dialog.remove(), { once: true });
      document.body.append(dialog);
      dialog.showModal();
      field.focus();
      field.select();
    }
  };
  return button;
}

function renderCollectionViewer(collection: Collection, activeFile?: string) {
  viewer.replaceChildren();
  viewer.scrollTop = 0;

  const header = el("div", undefined, "viewer-header");
  const titleRow = el("div", undefined, "viewer-title-row");
  const left = el("div", undefined, "viewer-title-left");

  const badges = el("div", undefined, "card-badges");
  badges.append(el("span", "Collection", "badge badge-collection"));
  left.append(badges, el("h2", collection.title));
  titleRow.append(left, copyForLlm(undefined, collection));
  header.append(titleRow);

  const desc = el("div", undefined, "callout-when");
  desc.append(el("div", "Collection Purpose", "callout-title"), el("p", collection.description, "callout-body"));

  viewer.append(header, desc);

  // Grid of member entries
  const memberSection = el("div", undefined, "inspector-card");
  memberSection.append(el("h4", `Curated Entries (${collection.entries.length})`));

  const grid = el("div", undefined, "collection-grid");
  for (const entryId of collection.entries) {
    const entryItem = items.find((i) => i.id === entryId && i.entry);
    if (!entryItem) continue;

    const card = el("a", undefined, "collection-member-card");
    card.href = `#/${entryItem.kind}/${entryItem.id}`;

    const top = el("div", undefined, "card-top");
    top.append(el("span", entryItem.kind, `badge badge-${entryItem.kind}`));
    if (entryItem.score !== undefined) {
      top.append(el("span", entryItem.score.toFixed(1), "score-pill"));
    }

    card.append(top, el("h4", entryItem.title), el("div", entryItem.summary, "card-summary"));
    grid.append(card);
  }
  memberSection.append(grid);
  viewer.append(memberSection);

  // File viewer for the collection definition
  renderSourceViewer(collection.path, [collection.path], activeFile ?? collection.path);
}

// Swaps the visible source file in place; set by renderSourceViewer.
let showFile: ((file: string) => void) | undefined;

// Formats a YYYY-MM-DD date as a <time> element, read as UTC so it never shifts a day.
function dateEl(date: string, className?: string) {
  const time = el("time", new Date(`${date}T00:00:00Z`).toLocaleDateString(undefined, { dateStyle: "medium", timeZone: "UTC" }), className);
  time.dateTime = date;
  return time;
}

// "Copied from upstream on <date> at <commit>" for vendored content; "Upstream read on …" for linked entries.
function retrievalNote(entry: CatalogEntry, className: string): HTMLElement | undefined {
  const { kind, retrieved, revision } = entry.source;
  if (!retrieved || (kind !== "vendored" && kind !== "linked")) return undefined;
  const note = el("p", undefined, className);
  note.append(kind === "vendored" ? "Copied from upstream on " : "Upstream read on ", dateEl(retrieved));
  if (revision) note.append(" at commit ", el("code", revision.slice(0, 7)));
  return note;
}

function renderSourceViewer(title: string, files: string[], activeFile: string, caption?: HTMLElement) {
  const fileSection = el("div", undefined, "file-viewer-section");
  const tabsBar = el("div", undefined, "file-tabs-bar");
  const tabsList = el("div", undefined, "file-tabs-list");
  const tabButtons = new Map<string, HTMLButtonElement>();

  for (const f of files) {
    const tabName = f.split("/").slice(3).join("/") || f.split("/").pop() || f;
    const tabBtn = el("button", tabName, "file-tab");
    tabBtn.type = "button";
    tabBtn.addEventListener("click", () => {
      const [path = ""] = location.hash.slice(2).split("?");
      location.hash = `#/${path}?file=${encodeURIComponent(f)}`;
    });
    tabButtons.set(f, tabBtn);
    tabsList.append(tabBtn);
  }

  const copyBtn = el("button", "📋 Copy to Clipboard", "btn-action");
  copyBtn.type = "button";
  tabsBar.append(tabsList, copyBtn);
  if (caption) fileSection.append(caption);

  const codeView = el("pre", "Loading…", "code-view");
  fileSection.append(tabsBar, codeView);
  viewer.append(fileSection);

  let token = 0;
  showFile = (file) => {
    const mine = ++token;
    for (const [f, btn] of tabButtons) btn.setAttribute("aria-selected", String(f === file));
    codeView.scrollTop = 0;
    const load = sources[file];
    if (!load) {
      codeView.textContent = `File content not found: ${file}`;
      copyBtn.onclick = null;
      return;
    }
    void load().then((text) => {
      if (mine !== token) return;
      codeView.textContent = text;
      copyBtn.onclick = async () => {
        await navigator.clipboard.writeText(text);
        copyBtn.textContent = "✓ Copied";
        setTimeout(() => (copyBtn.textContent = "📋 Copy to Clipboard"), 1200);
      };
    });
  };
  showFile(activeFile);
}

async function renderViewer() {
  const { item, file } = route();
  viewer.replaceChildren();

  if (!item) {
    const empty = el("div", undefined, "empty-state");
    empty.append(el("span", "🧭", "empty-icon"), el("p", "Select an item from the list to inspect ratings, rubric, and files."));
    empty.append(copyForLlm());
    viewer.append(empty);
    return;
  }

  if (item.collection) {
    renderCollectionViewer(item.collection, file);
    return;
  }

  viewer.scrollTop = 0;
  const entry = item.entry!;
  const currentFile = file ?? item.files[0];

  // Header & Action Bar
  const header = el("div", undefined, "viewer-header");
  const titleRow = el("div", undefined, "viewer-title-row");
  const left = el("div", undefined, "viewer-title-left");

  const badges = el("div", undefined, "card-badges");
  badges.append(el("span", entry.type, `badge badge-${entry.type}`));
  if (entry.featured) badges.append(el("span", "Featured", "badge badge-featured"));
  if (entry.custom) badges.append(el("span", "Custom", "badge badge-custom"));
  if (entry.experimental) badges.append(el("span", "Experimental", "badge badge-experimental"));

  for (const h of entry.hosts) {
    badges.append(el("span", h === "claude-code" ? "Claude Code" : h === "codex" ? "Codex" : "Portable", `badge badge-host-${h}`));
  }
  badges.append(el("span", entry.rating.evidence, `badge badge-ev-${entry.rating.evidence}`));
  badges.append(el("span", `Score ${entry.score.toFixed(1)}`, "score-pill"));

  left.append(badges, el("h2", entry.title));
  const retrieval = retrievalNote(entry, "viewer-retrieved");
  if (retrieval) left.append(retrieval);
  titleRow.append(left);

  const actions = el("div", undefined, "viewer-actions");
  actions.append(copyForLlm(entry));
  if (entry.sourceUrl) {
    const onGithub = entry.sourceUrl.startsWith("https://github.com/");
    const upstream = el("a", undefined, "btn-source");
    if (onGithub) {
      // GitHub mark, inline so it follows the button's text color.
      const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      icon.setAttribute("viewBox", "0 0 16 16");
      icon.setAttribute("aria-hidden", "true");
      const mark = document.createElementNS("http://www.w3.org/2000/svg", "path");
      mark.setAttribute("fill", "currentColor");
      mark.setAttribute("d", "M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z");
      icon.append(mark);
      upstream.append(icon);
    }
    upstream.append(onGithub ? "View source on GitHub" : "View source", el("span", "↗", "btn-source-arrow"));
    upstream.title = entry.sourceUrl;
    upstream.href = entry.sourceUrl;
    upstream.target = "_blank";
    upstream.rel = "noreferrer";
    actions.append(upstream);
  }
  titleRow.append(actions);
  header.append(titleRow);
  viewer.append(header);

  // When to Use Callout
  if (entry.useWhen) {
    const whenBox = el("div", undefined, "callout-when");
    whenBox.append(el("div", "When to Use", "callout-title"), el("p", entry.useWhen, "callout-body"));
    viewer.append(whenBox);
  }

  // Curation & Rubric Grid
  const grid = el("div", undefined, "inspector-grid");

  // Rubric Card
  const rubricCard = el("div", undefined, "inspector-card");
  rubricCard.append(el("h4", "Curator Rating Rubric"));
  rubricCard.append(rubricMeter(entry.rating));

  if (entry.rating.notes) {
    const notesBox = el("div", undefined, "review-notes");
    notesBox.append(el("strong", "Reviewer notes: "), document.createTextNode(entry.rating.notes));
    rubricCard.append(notesBox);
  }
  grid.append(rubricCard);

  // Provenance & Relationships Card
  const provCard = el("div", undefined, "inspector-card");
  provCard.append(el("h4", "Provenance & Context"));

  const sourceRow = el("div", undefined, "meta-row");
  sourceRow.append(el("span", "Source & License", "meta-label"));
  const sourceText = `${entry.source.kind} · ${entry.source.license}${entry.source.author ? ` · ${entry.source.author}` : ""}`;
  const sourceVal = el("span", sourceText, "meta-val");
  if (entry.sourceUrl) {
    // Short label: owner/repo/path @ revision for pinned GitHub sources, else host and path.
    const { url, path, revision } = entry.source;
    const label = url && entry.sourceUrl.startsWith(url) && url.startsWith("https://github.com/")
      ? `${url.slice("https://github.com/".length)}${path ? `/${path}` : ""}${revision ? ` @ ${revision.slice(0, 7)}` : ""}`
      : entry.sourceUrl.replace(/^https:\/\/(?:www\.)?/, "");
    sourceVal.append(" · ", link(label, entry.sourceUrl));
  }
  sourceRow.append(sourceVal);
  provCard.append(sourceRow);

  if (entry.source.retrieved) {
    const retrievedRow = el("div", undefined, "meta-row");
    retrievedRow.append(el("span", entry.source.kind === "vendored" ? "Copied" : "Upstream Read", "meta-label"));
    const retrievedVal = el("span", undefined, "meta-val");
    retrievedVal.append(dateEl(entry.source.retrieved));
    retrievedRow.append(retrievedVal);
    provCard.append(retrievedRow);
  }

  if (entry.overlap) {
    const overlapRow = el("div", undefined, "meta-row");
    overlapRow.append(el("span", "Built-in Overlap", "meta-label"));
    overlapRow.append(el("span", entry.overlap, "meta-val"));
    provCard.append(overlapRow);
  }

  if (entry.inspiredBy?.length) {
    const inspRow = el("div", undefined, "meta-row");
    inspRow.append(el("span", "Inspired By", "meta-label"));
    const inspVal = el("span", undefined, "meta-val");
    for (let i = 0; i < entry.inspiredBy.length; i++) {
      if (i > 0) inspVal.append(", ");
      inspVal.append(link(entry.inspiredBy[i].title, entry.inspiredBy[i].url));
    }
    inspRow.append(inspVal);
    provCard.append(inspRow);
  }

  if (entry.related?.length) {
    const relRow = el("div", undefined, "meta-row");
    relRow.append(el("span", "Related Guidance", "meta-label"));
    const chips = el("div", undefined, "related-chips");
    for (const relId of entry.related) {
      const relItem = items.find((i) => i.id === relId);
      const chipLink = el("a", relItem?.title ?? relId, "related-chip");
      chipLink.href = relItem ? `#/${relItem.kind}/${relItem.id}` : `#`;
      chips.append(chipLink);
    }
    relRow.append(chips);
    provCard.append(relRow);
  }

  grid.append(provCard);
  viewer.append(grid);

  // How to Install & Use Snippet Card
  const installCard = el("div", undefined, "install-card");
  const installHead = el("div", undefined, "install-header");
  installHead.append(el("h4", "How to Install / Use"));

  const installTabs = el("div", undefined, "install-tabs");
  let selectedHost = (entry.hosts.includes("codex") && !entry.hosts.includes("claude-code") ? "codex" : "claude") as InstallHost;

  const claudeTab = el("button", "Claude Code", "install-tab-btn");
  claudeTab.setAttribute("aria-selected", String(selectedHost === "claude"));
  const codexTab = el("button", "Codex", "install-tab-btn");
  codexTab.setAttribute("aria-selected", String(selectedHost === "codex"));
  const portableTab = el("button", "Portable", "install-tab-btn");
  portableTab.setAttribute("aria-selected", String(selectedHost === "portable"));

  const skillsTab = el("button", "skills.sh", "install-tab-btn");
  skillsTab.setAttribute("aria-selected", "false");
  installTabs.append(claudeTab, codexTab, portableTab);
  if (entry.type === "skill") installTabs.append(skillsTab);
  installHead.append(installTabs);
  installCard.append(installHead);

  const initialSnippet = installSnippet(entry, selectedHost);
  const snippetBox = el("div", undefined, "code-snippet-box");
  const snippetText = el("code", initialSnippet.text, "code-snippet-text");
  const copySnippetBtn = el("button", "Copy", "btn-snippet-copy");

  copySnippetBtn.onclick = async () => {
    await navigator.clipboard.writeText(snippetText.textContent ?? "");
    copySnippetBtn.textContent = "✓ Copied";
    setTimeout(() => (copySnippetBtn.textContent = "Copy"), 1200);
  };

  const noteBox = el("div", initialSnippet.note ? `Note: ${initialSnippet.note}` : "", "meta-val");
  noteBox.style.fontSize = "0.75rem";
  noteBox.style.color = "var(--text-muted)";
  noteBox.hidden = !initialSnippet.note;

  const updateSnippet = (host: InstallHost) => {
    selectedHost = host;
    claudeTab.setAttribute("aria-selected", String(host === "claude"));
    codexTab.setAttribute("aria-selected", String(host === "codex"));
    portableTab.setAttribute("aria-selected", String(host === "portable"));
    skillsTab.setAttribute("aria-selected", String(host === "skills"));
    const updated = installSnippet(entry, host);
    snippetText.textContent = updated.text;
    if (updated.note) {
      noteBox.textContent = `Note: ${updated.note}`;
      noteBox.hidden = false;
    } else {
      noteBox.hidden = true;
    }
  };

  claudeTab.onclick = () => updateSnippet("claude");
  codexTab.onclick = () => updateSnippet("codex");
  portableTab.onclick = () => updateSnippet("portable");
  skillsTab.onclick = () => updateSnippet("skills");

  snippetBox.append(snippetText, copySnippetBtn);
  installCard.append(snippetBox, noteBox);
  viewer.append(installCard);

  // Source File Viewer
  // Only vendored entries display upstream text in the file viewer, so only they get the copy date there.
  const caption = entry.source.kind === "vendored" ? retrievalNote(entry, "file-retrieved") : undefined;
  renderSourceViewer(entry.title, item.files, currentFile, caption);
}

let lastPath: string | undefined;

function sync() {
  const [path = ""] = location.hash.slice(2).split("?");
  // Only the ?file= changed: swap the file in place so the page doesn't flash or jump.
  if (path === lastPath && showFile && viewer.querySelector(".file-viewer-section")) {
    const { file } = route();
    if (file) showFile(file);
    return;
  }
  lastPath = path;
  showFile = undefined;
  renderList();
  void renderViewer();
}

// Search and clear handling
input.addEventListener("input", () => {
  clearInputBtn.hidden = input.value.length === 0;
  renderControls();
  renderList();
});

clearInputBtn.addEventListener("click", () => {
  input.value = "";
  clearInputBtn.hidden = true;
  input.focus();
  renderControls();
  renderList();
});

clearAllFiltersBtn.addEventListener("click", clearFilters);

// Hash routing
window.addEventListener("hashchange", sync);

// Keyboard shortcuts
window.addEventListener("keydown", (e) => {
  if ((e.target as Element | null)?.closest?.(".combo, .combo-pop")) return;
  // Open dialogs handle Escape themselves; don't also reset the page behind them.
  if (bulkDialog.open) return;
  const typing = document.activeElement === input;
  if (e.key === "/" && !typing) {
    e.preventDefault();
    input.focus();
  } else if (e.key === "Escape") {
    if (introDialog.open) {
      introDialog.close();
    } else if (typing) {
      input.blur();
    } else {
      clearFilters();
      location.hash = "";
    }
  } else if ((e.key === "ArrowDown" || e.key === "ArrowUp") && !typing) {
    const shown = [...list.querySelectorAll<HTMLAnchorElement>("a.tree-item")];
    const i = shown.findIndex((a) => a.getAttribute("aria-current") === "true");
    const next = shown[Math.min(shown.length - 1, Math.max(0, i + (e.key === "ArrowDown" ? 1 : -1)))];
    if (next) {
      e.preventDefault();
      location.hash = next.hash;
    }
  }
});

// Modal Dialog Handlers for About
introToggle.addEventListener("click", () => introDialog.showModal());
introClose.addEventListener("click", () => introDialog.close());
introDialog.addEventListener("click", (e) => {
  if (e.target === introDialog) introDialog.close();
});

// Sidebar Tree Fold/Unfold All
let allFolded = false;
treeToggleAllBtn.addEventListener("click", () => {
  allFolded = !allFolded;
  const groups = list.querySelectorAll<HTMLDetailsElement>("details.tree-group");
  for (const g of groups) g.open = !allFolded;
  treeToggleAllBtn.textContent = allFolded ? "Unfold all" : "Fold all";
});

$("#counts").textContent = `${catalog.entries.length}`;

renderControls();
renderSelectionBar();
sync();
