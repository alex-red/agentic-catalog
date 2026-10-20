import data from "../../catalog/index.json";
import "./styles.css";

// Mirrors Entry in scripts/library.ts; the JSON import alone infers a union of literal shapes.
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
  rating: { usefulness: number; quality: number; portability: number; novelty: number; evidence: string; reviewed: string; notes: string };
  source: { kind: string; license: string; url?: string };
  inspiredBy?: { title: string; url: string }[];
  overlap?: string;
  related?: string[];
}

const catalog = data as unknown as {
  entries: CatalogEntry[];
  collections: { id: string; title: string; description: string; path: string; entries: string[] }[];
};
type Kind = string;

interface Item {
  kind: Kind;
  id: string;
  title: string;
  summary: string;
  score?: number;
  tags: string[];
  /** Repo-relative files shown in the viewer; empty for linked entries. */
  files: string[];
  entry?: CatalogEntry;
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

const items: Item[] = [
  ...catalog.entries.map((e) => ({
    kind: e.type,
    id: e.id,
    title: e.title,
    summary: e.summary,
    score: e.score,
    tags: [...e.tags, e.rating.evidence, ...e.hosts.map((h) => `host:${h}`)],
    files: [`${e.path}/entry.yaml`, ...e.files],
    entry: e,
  })),
  ...catalog.collections.map((c) => ({
    kind: "collection",
    id: c.id,
    title: c.title,
    summary: c.description,
    tags: [],
    files: [c.path],
  })),
];

const $ = <T extends HTMLElement>(sel: string) => document.querySelector<T>(sel)!;
const input = $<HTMLInputElement>("#q");
const kindsBox = $("#kinds");
const facetsBox = $("#facets");
const list = $("#list");
const viewer = $("#viewer");

const activeKinds = new Set<string>();
const activeFacets = new Set<string>();

function el<K extends keyof HTMLElementTagNameMap>(tag: K, text?: string, className?: string) {
  const node = document.createElement(tag);
  if (text) node.textContent = text;
  if (className) node.className = className;
  return node;
}

function chip(label: string, active: Set<string>, onChange: () => void) {
  const b = el("button", label, "chip");
  b.type = "button";
  b.setAttribute("aria-pressed", String(active.has(label)));
  b.addEventListener("click", () => {
    active.has(label) ? active.delete(label) : active.add(label);
    onChange();
  });
  return b;
}

function visible() {
  const q = input.value.trim().toLowerCase();
  return items.filter(
    (e) =>
      (activeKinds.size === 0 || activeKinds.has(e.kind)) &&
      [...activeFacets].every((f) => e.tags.includes(f)) &&
      `${e.id} ${e.title} ${e.summary} ${e.entry?.useWhen ?? ""} ${e.tags.join(" ")}`.toLowerCase().includes(q),
  );
}

// Route: #/<kind>/<id>[?file=<path>]
function route() {
  const [path = "", query = ""] = location.hash.slice(2).split("?");
  const [kind, id] = path.split("/");
  const item = items.find((e) => e.kind === kind && e.id === id);
  const primary = item?.files.find((f) => /\/(?:SKILL|RULE|WORKFLOW|HOOK|AGENT|MCP)\.md$/.test(f)) ?? item?.files[0];
  return { item, file: new URLSearchParams(query).get("file") ?? primary };
}

function go(item: Item, file?: string) {
  location.hash = `#/${item.kind}/${item.id}${file ? `?file=${encodeURIComponent(file)}` : ""}`;
}

function renderControls() {
  const refresh = () => { renderControls(); renderList(); };
  kindsBox.replaceChildren(...kinds.filter((k) => items.some((e) => e.kind === k)).map((k) => chip(k, activeKinds, refresh)));
  const all = [...new Set(items.flatMap((e) => e.tags))].sort();
  facetsBox.replaceChildren(...all.map((f) => chip(f, activeFacets, refresh)));
}

function renderList() {
  const { item: current } = route();
  list.replaceChildren();
  const shown = visible();
  for (const kind of kinds) {
    const group = shown.filter((e) => e.kind === kind).sort((a, b) => (b.score ?? 0) - (a.score ?? 0) || a.id.localeCompare(b.id));
    if (group.length === 0) continue;
    list.append(el("h2", `${kind} (${group.length})`));
    for (const e of group) {
      const a = el("a");
      a.href = `#/${e.kind}/${e.id}`;
      a.setAttribute("aria-current", String(e === current));
      const head = el("strong", e.title);
      if (e.score !== undefined) head.append(el("em", e.score.toFixed(1), "score"));
      a.append(head, el("span", e.summary));
      list.append(a);
    }
  }
  if (shown.length === 0) list.append(el("p", "No matches.", "empty"));
}

function link(text: string, href: string) {
  const a = el("a", text);
  a.href = href;
  a.target = "_blank";
  a.rel = "noreferrer";
  return a;
}

function details(e: CatalogEntry) {
  const box = el("div", undefined, "details");
  const r = e.rating;
  box.append(
    el("p", e.useWhen),
    el("p", `Score ${e.score.toFixed(1)} · usefulness ${r.usefulness} · quality ${r.quality} · portability ${r.portability} · novelty ${r.novelty} · evidence ${r.evidence} · reviewed ${r.reviewed}`, "meta"),
    el("p", r.notes),
  );
  const source = el("p", `Source: ${e.source.kind}, ${e.source.license}`, "meta");
  if (e.source.url) source.append(" · ", link(e.source.url, e.source.url));
  for (const inspiration of e.inspiredBy ?? []) source.append(" · inspired by ", link(inspiration.title, inspiration.url));
  box.append(source);
  if (e.overlap) box.append(el("p", `Overlap: ${e.overlap}`, "meta"));
  if (e.related?.length) box.append(el("p", `Related: ${e.related.join(", ")}`, "meta"));
  return box;
}

async function renderViewer() {
  const { item, file } = route();
  viewer.replaceChildren();
  if (!item || !file) {
    viewer.append(el("p", "Select an item to see its rating, source, and content.", "empty"));
    return;
  }
  const bar = el("div", undefined, "bar");
  bar.append(el("h2", item.title));
  for (const f of item.files) {
    const b = el("button", f.split("/").slice(3).join("/") || f.split("/").pop(), "chip");
    b.type = "button";
    b.setAttribute("aria-pressed", String(f === file));
    b.addEventListener("click", () => go(item, f));
    if (item.files.length > 1) bar.append(b);
  }
  const copy = el("button", "Copy", "chip");
  copy.type = "button";
  bar.append(copy);
  const pre = el("pre", "Loading…");
  viewer.append(bar);
  if (item.entry) viewer.append(details(item.entry));
  viewer.append(el("p", file, "empty"), pre);
  const load = sources[file];
  const text = load ? await load() : "Source not found.";
  if (route().file !== file) return; // navigated away while loading
  pre.textContent = text;
  copy.addEventListener("click", async () => {
    await navigator.clipboard.writeText(text);
    copy.textContent = "Copied";
    setTimeout(() => (copy.textContent = "Copy"), 1200);
  });
}

function sync() {
  renderList();
  void renderViewer();
}

input.addEventListener("input", renderList);
window.addEventListener("hashchange", sync);
window.addEventListener("keydown", (e) => {
  const typing = document.activeElement === input;
  if (e.key === "/" && !typing) { e.preventDefault(); input.focus(); }
  else if (e.key === "Escape") { input.blur(); location.hash = ""; }
  else if ((e.key === "ArrowDown" || e.key === "ArrowUp") && !typing) {
    const shown = [...list.querySelectorAll<HTMLAnchorElement>("a")];
    const i = shown.findIndex((a) => a.getAttribute("aria-current") === "true");
    const next = shown[Math.min(shown.length - 1, Math.max(0, i + (e.key === "ArrowDown" ? 1 : -1)))];
    if (next) { e.preventDefault(); location.hash = next.hash; }
  }
});

$("#counts").textContent = `${catalog.entries.length} entries and ${catalog.collections.length} collections`;
try {
  const intro = $<HTMLDetailsElement>("#intro");
  intro.open = localStorage.getItem("intro-open") !== "0";
  intro.addEventListener("toggle", () => localStorage.setItem("intro-open", intro.open ? "1" : "0"));
} catch {
  // storage unavailable: leave the intro open
}

renderControls();
sync();
