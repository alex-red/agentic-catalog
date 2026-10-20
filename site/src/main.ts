import catalog from "../../catalog/index.json";
import "./styles.css";

type Kind = "rules" | "skills" | "profiles";

interface Entry {
  kind: Kind;
  id: string;
  description: string;
  facets: string[];
  /** Repo-relative path of the main file, then any sibling files (skill references). */
  files: string[];
}

// Lazy raw imports keyed by repo-relative path; HMR reloads them on edit.
const sources = Object.fromEntries(
  Object.entries(
    import.meta.glob(
      ["../../rules/*.md", "../../skills/**/*.md", "../../profiles/*.yaml"],
      { query: "?raw", import: "default" },
    ) as Record<string, () => Promise<string>>,
  ).map(([path, load]) => [path.replace("../../", ""), load]),
);

const entries: Entry[] = [
  ...catalog.rules.map((r) => ({ kind: "rules" as const, id: r.id, description: r.description, facets: [], files: [r.path] })),
  ...catalog.skills.map((s) => {
    const dir = s.path.replace(/SKILL\.md$/, "");
    const extra = Object.keys(sources).filter((p) => p.startsWith(dir) && p !== s.path).sort();
    return {
      kind: "skills" as const,
      id: s.name,
      description: s.description,
      facets: [s.category, s.maturity, ...s.tags],
      files: [s.path, ...extra],
    };
  }),
  ...catalog.profiles.map((p) => ({ kind: "profiles" as const, id: p.id, description: p.description, facets: [], files: [p.path] })),
];

const $ = <T extends HTMLElement>(sel: string) => document.querySelector<T>(sel)!;
const input = $<HTMLInputElement>("#q");
const kindsBox = $("#kinds");
const facetsBox = $("#facets");
const list = $("#list");
const viewer = $("#viewer");

const activeKinds = new Set<Kind>();
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
  return entries.filter(
    (e) =>
      (activeKinds.size === 0 || activeKinds.has(e.kind)) &&
      [...activeFacets].every((f) => e.facets.includes(f)) &&
      `${e.id} ${e.description} ${e.facets.join(" ")}`.toLowerCase().includes(q),
  );
}

// Route: #/<kind>/<id>[?file=<path>]
function route() {
  const [path = "", query = ""] = location.hash.slice(2).split("?");
  const [kind, id] = path.split("/");
  const entry = entries.find((e) => e.kind === kind && e.id === id);
  return { entry, file: new URLSearchParams(query).get("file") ?? entry?.files[0] };
}

function go(entry: Entry, file?: string) {
  const q = file && file !== entry.files[0] ? `?file=${encodeURIComponent(file)}` : "";
  location.hash = `#/${entry.kind}/${entry.id}${q}`;
}

function renderControls() {
  kindsBox.replaceChildren(
    ...(["rules", "skills", "profiles"] as Kind[]).map((k) =>
      chip(k, activeKinds as Set<string>, () => { renderControls(); renderList(); }),
    ),
  );
  const all = [...new Set(entries.flatMap((e) => e.facets))].sort();
  facetsBox.replaceChildren(...all.map((f) => chip(f, activeFacets, () => { renderControls(); renderList(); })));
}

function renderList() {
  const { entry: current } = route();
  list.replaceChildren();
  const shown = visible();
  for (const kind of ["rules", "skills", "profiles"] as Kind[]) {
    const group = shown.filter((e) => e.kind === kind);
    if (group.length === 0) continue;
    list.append(el("h2", `${kind} (${group.length})`));
    for (const e of group) {
      const a = el("a");
      a.href = `#/${e.kind}/${e.id}`;
      a.setAttribute("aria-current", String(e === current));
      a.append(el("strong", e.id), el("span", e.description));
      list.append(a);
    }
  }
  if (shown.length === 0) list.append(el("p", "No matches.", "empty"));
}

async function renderViewer() {
  const { entry, file } = route();
  viewer.replaceChildren();
  if (!entry || !file) {
    viewer.append(el("p", "Select an item to view its source.", "empty"));
    return;
  }
  const bar = el("div", undefined, "bar");
  bar.append(el("h2", entry.id));
  for (const f of entry.files) {
    const b = el("button", f.slice(f.indexOf(entry.id) + entry.id.length + 1) || f, "chip");
    b.type = "button";
    b.setAttribute("aria-pressed", String(f === file));
    b.addEventListener("click", () => go(entry, f));
    if (entry.files.length > 1) bar.append(b);
  }
  const copy = el("button", "Copy", "chip");
  copy.type = "button";
  bar.append(copy);
  const pre = el("pre", "Loading…");
  viewer.append(bar, el("p", file, "empty"), pre);
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
    const shown = visible();
    const i = shown.indexOf(route().entry as Entry);
    const next = shown[Math.min(shown.length - 1, Math.max(0, i + (e.key === "ArrowDown" ? 1 : -1)))];
    if (next) { e.preventDefault(); go(next); }
  }
});

$("#counts").textContent =
  `${catalog.skills.length} skills, ${catalog.rules.length} rules, ${catalog.profiles.length} profiles`;
try {
  const intro = $<HTMLDetailsElement>("#intro");
  intro.open = localStorage.getItem("intro-open") !== "0";
  intro.addEventListener("toggle", () => localStorage.setItem("intro-open", intro.open ? "1" : "0"));
} catch {
  // storage unavailable: leave the intro open
}

renderControls();
sync();
