import { blendCommandResults, isExactCommand, searchCommands, type SearchCommand } from "./command-search";
import type { SemanticRequest, SemanticResponse } from "./semantic-search";

const SEMANTIC_TAB_KEY = "agentic-catalog-semantic-search-v1";

function semanticEnabledInTab(): boolean {
  try { return sessionStorage.getItem(SEMANTIC_TAB_KEY) === "on"; }
  catch { return false; }
}

function rememberSemanticChoice(enabled: boolean) {
  try {
    if (enabled) sessionStorage.setItem(SEMANTIC_TAB_KEY, "on");
    else sessionStorage.removeItem(SEMANTIC_TAB_KEY);
  } catch { /* Search can still run for the current page. */ }
}

export function createCommandPalette(config: {
  trigger: HTMLButtonElement;
  commands: () => SearchCommand[];
  defaults: () => SearchCommand[];
  searchHosts: () => string[];
}) {
  const dialog = document.createElement("dialog");
  dialog.className = "dialog-modal command-palette";
  dialog.id = "command-palette";
  dialog.setAttribute("aria-label", "Search catalog and commands");
  dialog.innerHTML = `
    <div class="command-search-row">
      <span class="command-search-symbol" aria-hidden="true">⌕</span>
      <input class="command-input" type="text" role="combobox" aria-label="Search catalog and commands"
        aria-autocomplete="list" aria-expanded="true" aria-controls="command-results"
        placeholder="Search entries or run a command…" autocomplete="off" spellcheck="false" />
      <button class="btn-dialog-close" type="button" aria-label="Close command palette">×</button>
    </div>
    <details class="command-semantic">
      <summary>Semantic search <span class="command-semantic-state"></span></summary>
      <div class="command-semantic-controls">
        <p>The first download is about 30 MB from Hugging Face and jsDelivr. Search text stays on this device. Your browser may cache the download.</p>
        <button class="btn-subtle command-semantic-toggle" type="button">Download &amp; enable</button>
        <span class="command-semantic-status" role="status"></span>
      </div>
    </details>
    <div class="command-results" id="command-results" role="listbox" aria-label="Results"></div>
    <p class="command-status sr-only" role="status"></p>
    <div class="command-footer"><span><kbd>↑</kbd> <kbd>↓</kbd> navigate <kbd>↵</kbd> open</span><span><kbd>esc</kbd> close</span></div>`;
  document.body.append(dialog);
  const input = dialog.querySelector<HTMLInputElement>("input")!;
  const results = dialog.querySelector<HTMLDivElement>(".command-results")!;
  const status = dialog.querySelector<HTMLParagraphElement>(".command-status")!;
  const semanticState = dialog.querySelector<HTMLSpanElement>(".command-semantic-state")!;
  const semanticStatus = dialog.querySelector<HTMLSpanElement>(".command-semantic-status")!;
  const semanticToggle = dialog.querySelector<HTMLButtonElement>(".command-semantic-toggle")!;
  let shown: SearchCommand[] = [];
  let active = 0;
  let navigated = false;
  let previousFocus: HTMLElement | null = null;
  let worker: Worker | undefined;
  let semanticReady = false;
  let sequence = 0;
  let searchTimer: number | undefined;
  let semanticMatches: string[] = [];

  function setActive(index: number, scroll = true) {
    active = index;
    for (const [i, option] of [...results.querySelectorAll<HTMLElement>('[role="option"]')].entries()) {
      option.setAttribute("aria-selected", String(i === active));
      if (i === active) {
        input.setAttribute("aria-activedescendant", option.id);
        if (scroll) option.scrollIntoView({ block: "nearest" });
      }
    }
    if (!shown.length) input.removeAttribute("aria-activedescendant");
  }

  function choose(index: number) {
    const command = shown[index];
    if (!command) return;
    dialog.close();
    command.run();
  }

  function render(preserveSelection = false) {
    const selectedId = preserveSelection && navigated ? shown[active]?.id : undefined;
    const searching = input.value.trim().length > 0;
    const commands = searching ? config.commands() : [];
    let matches = searching ? searchCommands(commands, input.value) : config.defaults();
    if (searching && semanticMatches.length) {
      const byId = new Map(commands.map((command) => [command.id, command]));
      const semantic = semanticMatches.flatMap((id) => byId.get(id) ?? []);
      matches = blendCommandResults(matches, semantic, input.value);
    }
    shown = matches.slice(0, 30);
    results.replaceChildren();
    let lastGroup = "";
    shown.forEach((command, index) => {
      const group = semanticMatches.length && command.semantic ? "Catalog results" : command.group;
      if (group !== lastGroup) {
        const heading = document.createElement("div");
        heading.className = "command-group";
        heading.setAttribute("role", "presentation");
        heading.textContent = group;
        results.append(heading);
        lastGroup = group;
      }
      const option = document.createElement("div");
      option.id = `command-option-${index}`;
      option.className = "command-option";
      option.setAttribute("role", "option");
      const title = document.createElement("span");
      title.className = "command-title";
      title.textContent = command.title;
      const detail = document.createElement("span");
      detail.className = "command-detail";
      detail.textContent = command.detail;
      option.append(title, detail);
      option.addEventListener("pointermove", () => {
        navigated = true;
        setActive(index, false);
      });
      option.addEventListener("mousedown", (event) => event.preventDefault());
      option.addEventListener("click", () => choose(index));
      results.append(option);
    });
    if (!shown.length) {
      const empty = document.createElement("p");
      empty.className = "command-empty";
      empty.textContent = "No matching entries or commands. Try a title, tag, or host.";
      results.append(empty);
    }
    status.textContent = `${matches.length} results${matches.length > shown.length ? `; showing the first ${shown.length}. Keep typing to narrow your search` : ""}.`;
    const selectedIndex = shown.findIndex((command) => command.id === selectedId);
    if (selectedIndex < 0) results.scrollTop = 0;
    setActive(Math.max(0, selectedIndex), selectedIndex >= 0);
  }

  function resetQuery() {
    window.clearTimeout(searchTimer);
    sequence++;
    semanticMatches = [];
    navigated = false;
  }

  function refresh(allowSemantic = true) {
    resetQuery();
    render();
    const query = input.value.trim();
    if (!allowSemantic || !semanticReady || query.length < 4 || shown.some((command) => isExactCommand(command, query))) return;
    // Prefer the instant keyword list for short queries that already have several matches.
    if (query.split(/\s+/).length < 3 && shown.length >= 3) return;
    searchTimer = window.setTimeout(() => {
      const request: SemanticRequest = { kind: "search", sequence, query: query.slice(0, 512), hosts: config.searchHosts() };
      worker?.postMessage(request);
    }, 180);
  }

  function stopSemantic(message = "") {
    worker?.terminate();
    worker = undefined;
    semanticReady = false;
    rememberSemanticChoice(false);
    semanticState.textContent = "";
    semanticStatus.textContent = message;
    semanticToggle.textContent = "Download & enable";
    refresh();
  }

  function loadSemantic() {
    const fail = () => stopSemantic("Couldn’t load semantic search. Keyword search is available.");
    try {
      const current = new Worker(new URL("./semantic-search.worker.ts", import.meta.url), { type: "module" });
      worker = current;
      semanticState.textContent = "· Loading";
      semanticToggle.textContent = "Cancel";
      semanticStatus.textContent = "Loading model…";
      current.addEventListener("error", () => {
        if (worker === current) fail();
      });
      current.addEventListener("message", ({ data }: MessageEvent<SemanticResponse>) => {
        if (worker !== current) return;
        switch (data.kind) {
          case "download":
            semanticStatus.textContent = `Downloading model… ${data.percent}%`;
            break;
          case "index":
            semanticStatus.textContent = `Indexing catalog… ${data.completed} of ${data.total}`;
            break;
          case "ready":
            semanticReady = true;
            rememberSemanticChoice(true);
            semanticState.textContent = "· On";
            semanticToggle.textContent = "Turn off";
            semanticStatus.textContent = "Ready in this tab.";
            if (dialog.open) refresh();
            break;
          case "results":
            if (!dialog.open || data.sequence !== sequence) return;
            semanticMatches = data.ids;
            if (semanticMatches.length) render(true);
            break;
          case "error":
            fail();
        }
      });
      const documents = config.commands().flatMap(({ id, semantic }) =>
        semantic ? [{ id, text: semantic.text, hosts: semantic.hosts }] : []);
      const request: SemanticRequest = { kind: "load", documents };
      current.postMessage(request);
    } catch {
      fail();
    }
  }

  function open() {
    if (dialog.open || document.querySelector("dialog[open]")) return;
    previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    input.value = "";
    refresh();
    dialog.showModal();
    input.focus();
    if (!worker && semanticEnabledInTab()) loadSemantic();
  }
  config.trigger.setAttribute("aria-controls", dialog.id);
  config.trigger.addEventListener("click", open);
  dialog.querySelector("button")!.addEventListener("click", () => dialog.close());
  dialog.addEventListener("close", () => {
    resetQuery();
    previousFocus?.focus({ preventScroll: true });
  });
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
    }
  });
  semanticToggle.addEventListener("click", () => worker ? stopSemantic() : loadSemantic());
  input.addEventListener("input", (event) => refresh(!(event as InputEvent).isComposing));
  input.addEventListener("compositionend", () => refresh());
  input.addEventListener("keydown", (event) => {
    if (event.isComposing) return;
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      navigated = true;
      if (shown.length) setActive((active + (event.key === "ArrowDown" ? 1 : -1) + shown.length) % shown.length);
    } else if (event.key === "Enter") {
      event.preventDefault();
      choose(active);
    }
  });
  window.addEventListener("keydown", (event) => {
    if ((event.metaKey || event.ctrlKey) && !event.altKey && event.key.toLowerCase() === "k" && !event.isComposing) {
      event.preventDefault();
      if (dialog.open) dialog.close();
      else open();
    }
  });
}
