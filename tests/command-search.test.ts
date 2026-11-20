import assert from 'node:assert/strict';
import { test } from 'node:test';
import { blendCommandResults, searchCommands, type SearchCommand } from '../site/src/command-search.ts';

const commands: SearchCommand[] = [
  { id: 'metadata', title: 'Other guidance', detail: 'Debugging tools', keywords: 'codex', group: 'Entries', priority: 5, run() {} },
  { id: 'title', title: 'Debugging', detail: 'Find the cause', keywords: 'codex', group: 'Entries', priority: 1, run() {} },
  { id: 'collection', title: 'Starter collection', detail: 'Portable guidance', group: 'Collections', run() {} },
];

test('palette search ranks title matches above metadata and requires every query word', () => {
  assert.deepEqual(searchCommands(commands, '  DEBUGGING   codex ').map((c) => c.id), ['title', 'metadata']);
  assert.deepEqual(searchCommands(commands, 'starter portable').map((c) => c.id), ['collection']);
  assert.deepEqual(searchCommands(commands, 'debugging missing'), []);
  assert.deepEqual(searchCommands(commands, '<script>'), []);
});

test('palette search uses priority for ties and never mutates the available commands', () => {
  const original = [...commands];
  assert.deepEqual(searchCommands(commands, 'codex').map((c) => c.id), ['metadata', 'title']);
  assert.deepEqual(commands, original);
  assert.deepEqual(searchCommands([], ''), []);
});

test('hybrid search keeps exact IDs and actions reachable and counts shared results once', () => {
  const action: SearchCommand = { id: 'reset', title: 'Reset', detail: 'Debugging filters', group: 'Quick actions', run() {} };
  const [metadata, entry, semanticOnly] = commands.map((command) => ({
    ...command, semantic: { key: command.id === 'title' ? 'debugging' : command.id, text: command.detail },
  }));
  const keywordResults = searchCommands([metadata, action, entry], 'debugging');
  assert.equal(keywordResults[0].id, 'title');
  const blended = blendCommandResults(keywordResults, [semanticOnly, metadata, entry], 'debugging');
  assert.deepEqual(blended.map((command) => command.id), ['title', 'reset', 'metadata', 'collection']);
  assert.deepEqual(blendCommandResults([], [semanticOnly], 'why does this keep failing?'), [semanticOnly]);
});
