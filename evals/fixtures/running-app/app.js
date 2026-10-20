const form = document.querySelector('#task-form');
const input = document.querySelector('#task-input');
const list = document.querySelector('#task-list');
const count = document.querySelector('#task-count');
let sourceRevision = null;
let evidenceToken = null;

const pageMetaPromise = fetch('/__eval/meta')
  .then((response) => response.json())
  .then((meta) => {
    sourceRevision = meta.revision;
    evidenceToken = meta.token;
    return meta;
  })
  .catch(() => {});

window.addEventListener('load', async () => {
  const meta = await pageMetaPromise;
  if (!meta || !evidenceToken) return;
  fetch('/__eval/event', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      action: 'page_ready',
      background: getComputedStyle(document.body).backgroundColor,
      documentVisible: document.visibilityState === 'visible',
      revision: sourceRevision,
      token: evidenceToken,
    }),
  }).catch(() => {});
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const taskText = input.value.trim();
  if (!taskText) return;

  const item = document.createElement('li');
  item.textContent = taskText;
  list.append(item);
  count.textContent = `${list.children.length} ${list.children.length === 1 ? 'task' : 'tasks'}`;
  form.reset();
  input.focus();

  if (sourceRevision && evidenceToken) {
    fetch('/__eval/event', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        action: 'task_added',
        taskText,
        taskVisible: item.isConnected && item.textContent === taskText,
        taskCount: list.children.length,
        revision: sourceRevision,
        token: evidenceToken,
      }),
    }).catch(() => {});
  }
});
