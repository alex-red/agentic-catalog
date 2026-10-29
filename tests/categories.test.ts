import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { belongsToTreeGroup, categoryOf, matchesCategories, primaryTreeGroup } from '../site/src/categories.ts';

interface Entry {
  id: string;
  type: string;
  tags: string[];
  experimental?: boolean;
  custom?: boolean;
  featured?: boolean;
}
const entries = (JSON.parse(readFileSync(new URL('../catalog/index.json', import.meta.url), 'utf8')) as { entries: Entry[] }).entries;
const items = entries.map((entry) => ({ kind: entry.type, tags: entry.tags, entry }));

test('game category includes every admitted game method while retaining types and unique primary placement', () => {
  const games = items.filter((item) => matchesCategories(item, new Set(['game-design'])));
  assert.deepEqual(games.map((item) => item.entry.id).sort(), [
    'game-balance-review', 'game-feel', 'gameplay-playtesting', 'level-design', 'mechanic-prototyping', 'mmorpg-design',
  ]);
  assert.ok(games.some((item) => item.kind === 'skill'));
  assert.ok(games.some((item) => item.kind === 'workflow'));
  for (const item of games) {
    assert.equal(primaryTreeGroup(item), 'game-design');
    assert.equal(belongsToTreeGroup(item, item.kind), false);
    assert.equal(belongsToTreeGroup(item, 'game-design'), true);
    assert.equal(item.kind, item.entry.type);
  }
  assert.equal(games.filter((item) => item.kind === 'workflow').length, 3);
});

test('category filtering handles unrelated items, clearing and existing status groups', () => {
  const ordinary = { kind: 'skill', tags: ['design'], entry: {} };
  assert.equal(categoryOf(ordinary), undefined);
  assert.equal(matchesCategories(ordinary, new Set(['game-design'])), false);
  assert.equal(matchesCategories(ordinary, new Set()), true);
  assert.equal(primaryTreeGroup(ordinary), 'skill');
  for (const flag of ['custom', 'experimental'] as const) {
    const item = { kind: 'skill', tags: ['game-design'], entry: { [flag]: true, featured: true } };
    assert.equal(primaryTreeGroup(item), flag);
    assert.equal(matchesCategories(item, new Set(['game-design'])), true);
    assert.equal(belongsToTreeGroup(item, 'game-design'), false);
    assert.equal(belongsToTreeGroup(item, 'featured'), true);
  }
});

test('system design exposes the taxonomy skill without changing its install type', () => {
  const design = items.filter((item) => matchesCategories(item, new Set(['system-design'])));
  assert.ok(design.some((item) => item.entry.id === 'catalog-taxonomy'));
  const taxonomy = design.find((item) => item.entry.id === 'catalog-taxonomy')!;
  assert.equal(taxonomy.kind, 'skill');
  assert.equal(primaryTreeGroup(taxonomy), 'system-design');
  assert.equal(belongsToTreeGroup(taxonomy, 'system-design'), true);
  assert.equal(belongsToTreeGroup(taxonomy, 'skill'), false);
});

test('cross-topic filters match either topic independently of unique tree placement', () => {
  const item = { kind: 'workflow', tags: ['game-design', 'system-design'], entry: { featured: true } };
  assert.equal(matchesCategories(item, new Set(['game-design'])), true);
  assert.equal(matchesCategories(item, new Set(['system-design'])), true);
  assert.equal(matchesCategories(item, new Set(['game-design', 'system-design'])), true);
  assert.equal(matchesCategories(item, new Set(['unknown-topic'])), false);
  assert.equal(primaryTreeGroup(item), 'game-design');
  assert.equal(belongsToTreeGroup(item, 'system-design'), false);
  assert.equal(belongsToTreeGroup(item, 'featured'), true);
});
