import assert from 'node:assert/strict';
import { cpSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import type { TestContext } from 'node:test';
import { buildWiki, renderMarkdown } from '../scripts/wiki-build.ts';
import { repositoryRoot } from '../scripts/library.ts';
import { readState, selectItems, stateSearch } from '../wiki/model.js';

function sandbox(context: TestContext): string {
  const root = mkdtempSync(join(tmpdir(), 'agentic-rules-wiki-'));
  context.after(() => rmSync(root, { recursive: true, force: true }));
  for (const name of readdirSync(repositoryRoot)) {
    if (['node_modules', 'dist', '.git'].includes(name)) continue;
    cpSync(join(repositoryRoot, name), join(root, name), { recursive: true });
  }
  return root;
}

test('wiki exports every catalog item, profile membership, and linked reading material', (context) => {
  const root = sandbox(context);
  const output = buildWiki(root);
  const catalog = JSON.parse(readFileSync(join(root, 'catalog/index.json'), 'utf8'));
  assert.equal(output.items.length, catalog.skills.length + catalog.rules.length + catalog.profiles.length);
  assert.deepEqual(output.items.find((item) => item.kind === 'profile')!.related, [
    'skill/ar-systematic-debugging', 'rule/scope-and-authority', 'rule/focused-changes', 'rule/verification-evidence',
  ]);
  assert.ok(output.documents.some((entry) => entry.path === 'skills/ar-systematic-debugging/references/difficult-reproductions.md'));
  const installedSkill = output.items.find((item) => item.kind === 'skill')!;
  assert.ok(installedSkill.html.includes('#item=document%2Fskills%2Far-systematic-debugging%2Freferences%2Fdifficult-reproductions.md'));
  assert.equal(readFileSync(join(root, 'dist/wiki/source', installedSkill.path), 'utf8'), readFileSync(join(root, installedSkill.path), 'utf8'));
  const before = readFileSync(join(root, 'dist/wiki/catalog.json'), 'utf8');
  buildWiki(root);
  assert.equal(readFileSync(join(root, 'dist/wiki/catalog.json'), 'utf8'), before);
});

test('wiki refuses a stale catalog instead of publishing inaccurate content', (context) => {
  const root = sandbox(context);
  writeFileSync(join(root, 'catalog/index.json'), '{}');
  assert.throws(() => buildWiki(root), /Catalog is stale/u);
});

test('Markdown renders tables and task lists while dropping HTML and unsafe URLs', () => {
  const html = renderMarkdown('# Title\n\n<script>alert(1)</script>\n\n[bad](javascript:alert) [good](https://example.com)\n\n| A | B |\n| - | - |\n| 1 | 2 |\n\n- [x] Done\n\n`<img onerror=x>`', (url) => url);
  assert.ok(html.includes('<table>'));
  assert.ok(html.includes('type="checkbox" disabled checked'));
  assert.ok(html.includes('rel="noopener noreferrer"'));
  assert.ok(html.includes('&lt;img onerror=x&gt;'));
  assert.ok(!html.includes('<script>'));
  assert.ok(!html.includes('href="javascript:'));
});

test('search combines type and multiple terms across descriptions and tags', () => {
  const items = [
    { kind: 'skill', title: 'Systematic debugging', name: 'ar-debug', description: 'Find the cause', tags: ['regression'] },
    { kind: 'rule', title: 'Focused changes', name: 'focused-changes', description: 'Keep scope small' },
  ];
  const matches = selectItems(items, { type: 'skill', query: 'REGRESSION cause', sort: 'name' });
  assert.equal(matches.length, 1);
  assert.equal(matches[0].name, 'ar-debug');
  assert.equal(selectItems(items, { type: 'rule', query: 'regression', sort: 'kind' }).length, 0);
});

test('filter and layout URL state survives reloads and rejects unknown values', () => {
  const state = { type: 'rule', query: 'scope & authority', sort: 'name', view: 'list' };
  assert.deepEqual(readState(stateSearch(state)), state);
  assert.deepEqual(readState('?type=future&view=unknown&sort=unknown'), { type: 'all', query: '', sort: 'kind', view: 'grid' });
  assert.equal(stateSearch({ type: 'all', query: '', sort: 'kind', view: 'grid' }), '');
});

test('name sorting and type sorting give predictable, distinct orders', () => {
  const items = [
    { kind: 'rule', title: 'Alpha' },
    { kind: 'skill', title: 'Zulu' },
    { kind: 'profile', title: 'Middle' },
  ];
  assert.deepEqual(selectItems(items, { type: 'all', query: '', sort: 'name' }).map((item) => item.title), ['Alpha', 'Middle', 'Zulu']);
  assert.deepEqual(selectItems(items, { type: 'all', query: '', sort: 'kind' }).map((item) => item.kind), ['skill', 'profile', 'rule']);
});
