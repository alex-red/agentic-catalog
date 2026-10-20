import { readState, selectItems, stateSearch } from './model.js';

// DOM Selectors
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const icons = (name) => `<svg class="icon" aria-hidden="true"><use href="#i-${name}"/></svg>`;
const escape = (value) => String(value ?? '').replace(/[&<>"']/gu, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[character]);

const labels = { all: 'All Components', skill: 'Skills', rule: 'Rules', profile: 'Profiles' };

// Application State
let state = readState(location.search);
let collection;
let entries;
let activeId;
let lastTrigger;
let toastTimer;

// Disable interactive controls until catalog data loads
const controls = $$('#search, #sort, [data-type], [data-view]');
controls.forEach((control) => { control.disabled = true; });

// Detect OS for shortcut hint (Cmd vs Ctrl)
const isMac = typeof navigator !== 'undefined' && (/Mac|iPhone|iPad|iPod/i).test(navigator.platform || navigator.userAgent);
$$('.cmd-symbol').forEach((el) => { el.textContent = isMac ? '⌘' : 'Ctrl+'; });

/* --- Apple Dynamic Island Toast --- */
function notice(message) {
  clearTimeout(toastTimer);
  const toast = $('#toast');
  toast.innerHTML = `${icons('check')}<span>${escape(message)}</span>`;
  toast.hidden = false;
  toastTimer = setTimeout(() => { toast.hidden = true; }, 2600);
}

/* --- Theme Management (Apple Dynamic Appearance) --- */
const THEME_KEY = 'ar-theme-mode';
function getSavedTheme() {
  return localStorage.getItem(THEME_KEY) || 'system';
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem(THEME_KEY, theme);
}

function cycleTheme() {
  const current = getSavedTheme();
  const next = current === 'system' ? 'light' : current === 'light' ? 'dark' : 'system';
  applyTheme(next);
  const themeNames = { system: 'System Appearance', light: 'Light Mode', dark: 'Dark Mode' };
  notice(`Theme: ${themeNames[next]}`);
}

applyTheme(getSavedTheme());
$('#theme-toggle')?.addEventListener('click', cycleTheme);

/* --- Sidebar Drawer (Responsive) --- */
function toggleSidebar(open) {
  const sidebar = $('#sidebar');
  const backdrop = $('#sidebar-backdrop');
  const shouldOpen = open ?? !sidebar.classList.contains('open');
  sidebar.classList.toggle('open', shouldOpen);
  backdrop.classList.toggle('active', shouldOpen);
}

$('#toggle-sidebar')?.addEventListener('click', () => toggleSidebar(true));
$('#close-sidebar')?.addEventListener('click', () => toggleSidebar(false));
$('#sidebar-backdrop')?.addEventListener('click', () => toggleSidebar(false));

/* --- Keyboard Shortcuts Modal --- */
function toggleShortcuts(show) {
  const modal = $('#shortcuts-modal');
  if (!modal) return;
  if (show ?? !modal.open) {
    modal.showModal();
  } else {
    modal.close();
  }
}

$('#open-shortcuts')?.addEventListener('click', () => toggleShortcuts(true));
$('#close-shortcuts')?.addEventListener('click', () => toggleShortcuts(false));
$('#shortcuts-modal')?.addEventListener('click', (e) => {
  if (e.target === $('#shortcuts-modal')) toggleShortcuts(false);
});

/* --- URL State Management --- */
function updateUrl() {
  history.replaceState(null, '', `${location.pathname}${stateSearch(state)}${location.hash}`);
}

function setState(next) {
  state = { ...state, ...next };
  updateUrl();
  renderCards();
}

/* --- Catalog Card Rendering --- */
function renderCards() {
  const items = selectItems(collection.items, state);
  const searchInput = $('#search');
  const sortSelect = $('#sort');
  const clearBtn = $('#clear-search');

  searchInput.value = state.query;
  sortSelect.value = state.sort;
  clearBtn.hidden = !state.query;

  $('#catalog-items').classList.toggle('is-list', state.view === 'list');
  $('#breadcrumb-type').textContent = state.type === 'all' ? 'CATALOG' : labels[state.type].toUpperCase();

  const titlePrefix = state.type === 'all' ? 'Explore the collection ' : `Explore ${labels[state.type].toLowerCase()} `;
  $('#catalog-title').firstChild.textContent = titlePrefix;

  const countForType = state.type === 'all'
    ? collection.items.length
    : collection.items.filter((item) => item.kind === state.type).length;

  $('#total-count').textContent = countForType;
  $('#result-count').textContent = `${items.length} ${items.length === 1 ? 'component' : 'components'}${state.type === 'all' ? ' in library' : ` · ${labels[state.type].toLowerCase()}`}`;

  $('#reset-filters').hidden = state.type === 'all' && !state.query;
  $('#empty-state').hidden = items.length > 0;
  $('#empty-title').textContent = state.query.trim()
    ? `No matches for “${state.query.trim()}”`
    : 'No components found';

  $$('[data-type]').forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.type === state.type)));
  $$('[data-view]').forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.view === state.view)));

  $('#catalog-items').innerHTML = items.map((item, index) => {
    const featured = item.kind === 'skill' && state.type === 'all' && state.sort === 'kind' && !state.query;
    const meta = item.kind === 'skill'
      ? `${item.maturity || 'experimental'} · on demand`
      : item.kind === 'profile'
        ? `${item.related?.length || 0} components included`
        : 'Project-wide rule';
    const summary = item.description.split(/(?<=[.!?])\s+/u)[0] || item.description;

    return `
      <article class="component-card ${item.kind}${featured ? ' featured' : ''}">
        <button type="button" class="card-open" data-open="${escape(item.id)}" aria-label="Open ${escape(item.title)} ${item.kind}">
          <span class="card-top">
            <span class="card-kind">${icons(item.kind)}${item.kind}</span>
            <span class="card-index">${String(index + 1).padStart(2, '0')}</span>
          </span>
          <h3>${escape(item.title)}</h3>
          <p class="card-description">${escape(summary)}</p>
          <span class="card-bottom">
            <span class="card-meta">${escape(meta)}</span>
            <span class="card-action-icon">${icons('up-right')}</span>
          </span>
        </button>
      </article>
    `;
  }).join('');

  $$('.component-card').forEach((card, index) => {
    card.style.setProperty('--index', String(index));
  });

  $('#catalog-items').setAttribute('aria-busy', 'false');
}

/* --- Apple macOS Sheet Reader --- */
function routeItem(id, trigger) {
  if (!entries?.has(id)) {
    notice('Component or document not found.');
    return;
  }
  if (trigger && !$('#reader').open) lastTrigger = trigger;
  const next = new URL(location.href);
  next.hash = `item=${encodeURIComponent(id)}`;
  history.pushState(null, '', next);
  renderReader();
}

function enhanceCodeBlocks() {
  const preBlocks = $$('#reader-content pre');
  preBlocks.forEach((pre) => {
    if (pre.closest('.code-window')) return;
    const code = pre.querySelector('code');
    const text = code ? code.innerText : pre.innerText;

    // Detect likely shell or code type
    let lang = 'code';
    if (/^\s*(bun|bunx|npm|npx|cp|mkdir|git|ar_)/m.test(text)) lang = 'sh';
    else if (text.trim().startsWith('{') || text.trim().startsWith('[')) lang = 'json';
    else if (/^\s*(import|export|function|const|let)\b/m.test(text)) lang = 'ts';

    const wrapper = document.createElement('div');
    wrapper.className = 'code-window';
    wrapper.innerHTML = `
      <div class="code-window-header">
        <div class="code-traffic-lights">
          <span class="c-red"></span>
          <span class="c-yellow"></span>
          <span class="c-green"></span>
        </div>
        <span class="code-lang-label">${lang}</span>
        <button type="button" class="code-copy-btn" aria-label="Copy snippet">
          ${icons('copy')}<span>Copy</span>
        </button>
      </div>
    `;

    pre.parentNode.insertBefore(wrapper, pre);
    wrapper.appendChild(pre);

    const copyBtn = wrapper.querySelector('.code-copy-btn');
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(text);
        copyBtn.innerHTML = `${icons('check')}<span>Copied!</span>`;
        setTimeout(() => {
          copyBtn.innerHTML = `${icons('copy')}<span>Copy</span>`;
        }, 2000);
        notice('Code copied to clipboard.');
      } catch {
        notice('Failed to copy code.');
      }
    });
  });
}

function renderReader() {
  const id = new URLSearchParams(location.hash.slice(1)).get('item');
  const entry = entries.get(id);

  if (!entry) {
    if ($('#reader').open) $('#reader').close();
    return;
  }
  if (activeId === id && $('#reader').open) return;
  activeId = id;

  $('#reader-kind').textContent = entry.kind === 'document'
    ? 'FIELD GUIDE / REFERENCE'
    : `COLLECTION / ${entry.kind.toUpperCase()}`;

  $('#reader-title').textContent = entry.title;
  $('#reader-description').textContent = entry.description || '';

  const metadata = [
    entry.maturity ? `<span class="maturity">${escape(entry.maturity)}</span>` : '',
    entry.category ? `<span>Category: ${escape(entry.category)}</span>` : '',
    entry.license ? `<span>${escape(entry.license)} License</span>` : '',
    entry.kind === 'rule' ? '<span>Project-wide guidance</span>' : '',
    entry.kind === 'profile' ? `<span>${entry.related?.length || 0} Components</span><span>Atomic profile</span>` : '',
  ];
  $('#reader-metadata').innerHTML = metadata.filter(Boolean).join('');

  // Profile membership links
  $('#reader-members').innerHTML = entry.related?.length ? `
    <section class="reader-members">
      <h3>Components Included in this Profile</h3>
      <div class="member-list">
        ${entry.related.map((relatedId) => {
          const related = entries.get(relatedId);
          if (!related) return '';
          return `
            <a href="#item=${encodeURIComponent(relatedId)}" data-open="${escape(relatedId)}">
              ${icons(related.kind)}
              <span>${escape(related.title)}</span>
              ${icons('up-right')}
            </a>
          `;
        }).join('')}
      </div>
      <p class="profile-instruction">
        Follow the <a href="#item=document%2Fdocs%2Finstallation.md" data-open="document/docs/installation.md">manual installation guide</a> to configure this profile.
      </p>
    </section>
  ` : '';

  $('#reader-content').innerHTML = entry.html;
  $('#reader-path').textContent = entry.path;
  $('#reader-source').href = `./source/${entry.path.split('/').map(encodeURIComponent).join('/')}`;

  enhanceCodeBlocks();

  const scrollContainer = $('.reader-scroll');
  scrollContainer.scrollTop = 0;
  $('#reader-progress').style.width = '0%';

  if (!$('#reader').open) $('#reader').showModal();
  document.body.classList.add('reader-open');
  $('#reader-title').focus({ preventScroll: true });
}

function closeReader() {
  const next = new URL(location.href);
  next.hash = '';
  history.pushState(null, '', next);
  $('#reader').close();
}

/* --- Reading Progress Bar --- */
$('.reader-scroll')?.addEventListener('scroll', () => {
  const el = $('.reader-scroll');
  const scrollTotal = el.scrollHeight - el.clientHeight;
  const progress = scrollTotal > 0 ? (el.scrollTop / scrollTotal) * 100 : 0;
  const bar = $('#reader-progress');
  if (bar) bar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
});

/* --- Copy Guidance / Markdown Action --- */
$('#reader-copy-content')?.addEventListener('click', async () => {
  if (!activeId) return;
  const entry = entries.get(activeId);
  if (!entry) return;

  try {
    // If there is source content, fetch or use the prose text
    const textToCopy = `# ${entry.title}\n\n${entry.description ? `${entry.description}\n\n` : ''}${entry.path ? `Source: ${entry.path}\n` : ''}`;
    await navigator.clipboard.writeText(textToCopy);
    notice('Guidance summary copied.');
  } catch {
    notice('Failed to copy to clipboard.');
  }
});

/* --- Event Delegation --- */
document.addEventListener('click', (event) => {
  const link = event.target.closest('[data-open], .prose a[href^="#item="]');
  if (link && !event.metaKey && !event.ctrlKey && !event.shiftKey && event.button === 0) {
    event.preventDefault();
    const id = link.dataset.open ?? new URLSearchParams(link.getAttribute('href').slice(1)).get('item');
    routeItem(id, link);
    toggleSidebar(false);
  }

  // Tag chip clicks
  const tagChip = event.target.closest('[data-search]');
  if (tagChip) {
    const term = tagChip.dataset.search;
    setState({ query: term });
    toggleSidebar(false);
    $('#search')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  // Window control traffic dots on reader
  const trafficRed = event.target.closest('.traffic-dot.red');
  const trafficYellow = event.target.closest('.traffic-dot.yellow');
  if (trafficRed || trafficYellow) {
    closeReader();
  }
});

// Segmented controls & filter buttons
$$('[data-type]').forEach((button) => button.addEventListener('click', () => setState({ type: button.dataset.type })));
$$('[data-view]').forEach((button) => button.addEventListener('click', () => setState({ view: button.dataset.view })));

$('#search').addEventListener('input', (event) => setState({ query: event.target.value }));
$('#sort').addEventListener('change', (event) => setState({ sort: event.target.value }));

$('#clear-search')?.addEventListener('click', () => {
  setState({ query: '' });
  $('#search').focus();
});

$('#topbar-search-trigger')?.addEventListener('click', () => {
  $('#search')?.focus();
  $('#search')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
});

for (const id of ['#reset-filters', '#empty-reset']) {
  $(id)?.addEventListener('click', () => setState({ type: 'all', query: '' }));
}

$('#reload')?.addEventListener('click', () => location.reload());
$('#close-reader')?.addEventListener('click', closeReader);

$('#reader')?.addEventListener('cancel', (event) => {
  event.preventDefault();
  closeReader();
});

$('#reader')?.addEventListener('close', () => {
  document.body.classList.remove('reader-open');
  activeId = undefined;
  if (lastTrigger?.isConnected) lastTrigger.focus({ preventScroll: true });
});

// Click outside modal content to close
$('#reader')?.addEventListener('click', (event) => {
  if (event.target !== $('#reader')) return;
  const bounds = $('#reader').getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) {
    closeReader();
  }
});

// Share link button
$('#copy-link')?.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(location.href);
    notice('Direct link copied to clipboard.');
  } catch {
    notice('Copy URL address to share this item.');
  }
});

/* --- Keyboard Shortcuts (Apple HCI Engine) --- */
document.addEventListener('keydown', (event) => {
  const isTyping = event.target.closest('input, textarea, select, [contenteditable]');

  // Cmd+K or Ctrl+K or / to search
  if ((event.key === '/' || ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k')) && !$('#reader')?.open && !isTyping) {
    event.preventDefault();
    $('#search')?.focus();
    $('#search')?.select();
    return;
  }

  // Escape closes open dialogs
  if (event.key === 'Escape') {
    if ($('#shortcuts-modal')?.open) {
      toggleShortcuts(false);
      return;
    }
    if ($('#reader')?.open) {
      closeReader();
      return;
    }
  }

  // Quick navigation when not typing in fields
  if (!isTyping && !$('#reader')?.open && !$('#shortcuts-modal')?.open) {
    if (event.key === '1') setState({ type: 'all' });
    else if (event.key === '2') setState({ type: 'skill' });
    else if (event.key === '3') setState({ type: 'rule' });
    else if (event.key === '4') setState({ type: 'profile' });
    else if (event.key.toLowerCase() === 'g') setState({ view: 'grid' });
    else if (event.key.toLowerCase() === 'l') setState({ view: 'list' });
    else if (event.key.toLowerCase() === 't') cycleTheme();
    else if (event.key === '?') toggleShortcuts(true);
  }
});

function restoreRoute() {
  if (!collection) return;
  state = readState(location.search);
  renderCards();
  renderReader();
}

window.addEventListener('popstate', restoreRoute);
window.addEventListener('hashchange', restoreRoute);

/* --- Initialization --- */
try {
  const response = await fetch('./catalog.json');
  if (!response.ok) throw new Error('Catalog response failed');
  collection = await response.json();
  entries = new Map([...collection.items, ...collection.documents].map((entry) => [entry.id, entry]));

  $$('[data-count]').forEach((element) => {
    element.textContent = element.dataset.count === 'all'
      ? collection.items.length
      : collection.items.filter((entry) => entry.kind === element.dataset.count).length;
  });

  renderCards();
  renderReader();
  controls.forEach((control) => { control.disabled = false; });
} catch (error) {
  $('#error-state').hidden = false;
  $('#result-count').textContent = 'Catalog data unavailable';
  $('#catalog-items').setAttribute('aria-busy', 'false');
  controls.forEach((control) => { control.disabled = true; });
  console.error(error);
}
