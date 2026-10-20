import data from "../../catalog/index.json";
import "./styles.css";

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
  score: number;
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

const kinds: Kind[] = ["skill", "rule", "workflow", "hook", "subagent", "mcp", "plugin", "collection"];
const kindLabels: Record<Kind, string> = {
  skill: "Skills",
  rule: "Rules",
  workflow: "Workflows",
  hook: "Hooks",
  subagent: "Subagents",
  mcp: "MCP Servers",
  plugin: "Plugins",
  collection: "Collections",
};

const hostOptions = ["any", "claude-code", "codex"];
const evidenceTiers = ["evaluated", "tested", "used", "reviewed"];

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

const list = $("#list");
const viewer = $("#viewer");
const introDialog = $<HTMLDialogElement>("#intro-dialog");
const introToggle = $<HTMLButtonElement>("#intro-toggle");
const introClose = $<HTMLButtonElement>("#intro-close");
const treeToggleAllBtn = $<HTMLButtonElement>("#tree-toggle-all");

const activeHosts = new Set<string>();
const activeEvidence = new Set<string>();

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
  return activeHosts.size > 0 || activeEvidence.size > 0 || input.value.trim().length > 0;
}

function clearFilters() {
  activeHosts.clear();
  activeEvidence.clear();
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
}

function renderList() {
  const { item: current } = route();
  list.replaceChildren();
  const shown = visible();

  for (const kind of kinds) {
    const group = shown.filter((e) => e.kind === kind).sort((a, b) => (b.score ?? 0) - (a.score ?? 0) || a.id.localeCompare(b.id));
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

      treeItems.append(a);
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

function installSnippet(e: CatalogEntry, host: "claude" | "codex" | "portable"): { text: string; note?: string } {
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
      switch (e.type) {
        case "skill":
          if (host === "claude") text = `cp -r ${e.path} .claude/skills/${e.id}`;
          else if (host === "codex") text = `cp -r ${e.path} .agents/skills/${e.id}`;
          else text = `cp -r ${e.path} .agents/skills/${e.id}`;
          break;
        case "rule":
          if (host === "claude") text = `cp ${e.path}/RULE.md .claude/rules/${e.id}.md`;
          else text = `<!-- agentic-catalog:begin id=${e.id} -->\n# Add contents of ${e.path}/RULE.md to AGENTS.md\n<!-- agentic-catalog:end -->`;
          break;
        case "workflow":
          text = `# Follow workflow instructions:\ncat ${e.path}/WORKFLOW.md`;
          break;
        case "hook":
          if (host === "claude") text = `# Copy hook script to .claude/hooks/ and register in .claude/settings.json:\ncat ${e.path}/HOOK.md`;
          else text = `# Register hook in .codex/hooks.json:\ncat ${e.path}/HOOK.md`;
          break;
        case "subagent":
          if (host === "claude") text = `cp ${e.path}/AGENT.md .claude/agents/${e.id}.md`;
          else text = `# Add developer_instructions to .codex/agents/${e.id}.toml:\ncat ${e.path}/AGENT.md`;
          break;
        case "mcp":
          if (host === "claude") text = `claude mcp add ${e.id} --scope project ...`;
          else text = `# Configure in .codex/config.toml under [mcp_servers.${e.id}]:\ncat ${e.path}/MCP.md`;
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

function renderCollectionViewer(collection: Collection, activeFile?: string) {
  viewer.replaceChildren();
  viewer.scrollTop = 0;

  const header = el("div", undefined, "viewer-header");
  const titleRow = el("div", undefined, "viewer-title-row");
  const left = el("div", undefined, "viewer-title-left");

  const badges = el("div", undefined, "card-badges");
  badges.append(el("span", "Collection", "badge badge-collection"));
  left.append(badges, el("h2", collection.title));
  titleRow.append(left);
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

function renderSourceViewer(title: string, files: string[], activeFile: string) {
  const fileSection = el("div", undefined, "file-viewer-section");
  const tabsBar = el("div", undefined, "file-tabs-bar");
  const tabsList = el("div", undefined, "file-tabs-list");

  for (const f of files) {
    const tabName = f.split("/").slice(3).join("/") || f.split("/").pop() || f;
    const tabBtn = el("button", tabName, "file-tab");
    tabBtn.type = "button";
    tabBtn.setAttribute("aria-selected", String(f === activeFile));
    tabBtn.addEventListener("click", () => {
      const [path = ""] = location.hash.slice(2).split("?");
      location.hash = `#/${path}?file=${encodeURIComponent(f)}`;
    });
    tabsList.append(tabBtn);
  }

  const copyBtn = el("button", "📋 Copy File", "btn-action");
  copyBtn.type = "button";
  tabsBar.append(tabsList, copyBtn);

  const codeView = el("pre", "Loading…", "code-view");
  fileSection.append(tabsBar, codeView);
  viewer.append(fileSection);

  const load = sources[activeFile];
  if (load) {
    void load().then((text) => {
      codeView.textContent = text;
      copyBtn.onclick = async () => {
        await navigator.clipboard.writeText(text);
        copyBtn.textContent = "✓ Copied";
        setTimeout(() => (copyBtn.textContent = "📋 Copy File"), 1200);
      };
    });
  } else {
    codeView.textContent = `File content not found: ${activeFile}`;
  }
}

async function renderViewer() {
  const { item, file } = route();
  viewer.replaceChildren();

  if (!item) {
    const empty = el("div", undefined, "empty-state");
    empty.append(el("span", "🧭", "empty-icon"), el("p", "Select an item from the list to inspect ratings, rubric, and files."));
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

  for (const h of entry.hosts) {
    badges.append(el("span", h === "claude-code" ? "Claude Code" : h === "codex" ? "Codex" : "Portable", `badge badge-host-${h}`));
  }
  badges.append(el("span", entry.rating.evidence, `badge badge-ev-${entry.rating.evidence}`));
  badges.append(el("span", `Score ${entry.score.toFixed(1)}`, "score-pill"));

  left.append(badges, el("h2", entry.title));
  titleRow.append(left);

  const actions = el("div", undefined, "viewer-actions");
  if (entry.source.url) {
    const upstream = el("a", "Upstream ↗", "btn-action");
    upstream.href = entry.source.url;
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
  sourceRow.append(el("span", sourceText, "meta-val"));
  provCard.append(sourceRow);

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
  let selectedHost: "claude" | "codex" | "portable" =
    entry.hosts.includes("codex") && !entry.hosts.includes("claude-code") ? "codex" : "claude";

  const claudeTab = el("button", "Claude Code", "install-tab-btn");
  claudeTab.setAttribute("aria-selected", String(selectedHost === "claude"));
  const codexTab = el("button", "Codex", "install-tab-btn");
  codexTab.setAttribute("aria-selected", String(selectedHost === "codex"));
  const portableTab = el("button", "Portable", "install-tab-btn");
  portableTab.setAttribute("aria-selected", String(selectedHost === "portable"));

  installTabs.append(claudeTab, codexTab, portableTab);
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

  const updateSnippet = (host: "claude" | "codex" | "portable") => {
    selectedHost = host;
    claudeTab.setAttribute("aria-selected", String(host === "claude"));
    codexTab.setAttribute("aria-selected", String(host === "codex"));
    portableTab.setAttribute("aria-selected", String(host === "portable"));
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

  snippetBox.append(snippetText, copySnippetBtn);
  installCard.append(snippetBox, noteBox);
  viewer.append(installCard);

  // Source File Viewer
  renderSourceViewer(entry.title, item.files, currentFile);
}

function sync() {
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
sync();
