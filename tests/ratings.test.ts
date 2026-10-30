import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';
import { compareRatings, entryScore, humanAxes, scoreLabel, type HumanRating, type LegacyRating } from '../catalog/ratings.ts';
import { readYaml, repositoryRoot, validate } from '../scripts/library.ts';

const review = { evidence: 'reviewed' as const, reviewed: '2026-10-29', notes: 'Source review; outcome improvement is unmeasured.' };
const human: HumanRating = {
  ...review, rubric: 'human-v1',
  dimensions: { value: 3, dependability: 3, cognitiveEase: 4, control: 4, adoption: 2, compatibility: 3, upkeep: 2 },
  context: 'A developer doing the intended task.', baseline: 'Existing project tools.',
  review: 'docs/reviews/2026-10-29-human-v1-starter.md',
};
const legacy: LegacyRating = { ...review, rubric: 'legacy-v1', usefulness: 5, quality: 4, portability: 3, novelty: 2 };

test('human scores cover 0–10 and evidence does not create a numerical bonus', () => {
  assert.equal(humanAxes.reduce((total, axis) => total + axis.weight, 0), 100);
  assert.equal(entryScore(human), 7.9);
  assert.equal(entryScore({ ...human, evidence: 'evaluated' }), 7.9);
  assert.equal(entryScore(legacy), 3.8);
  assert.equal(entryScore({ ...human, dimensions: Object.fromEntries(humanAxes.map(({ key }) => [key, 0])) }), 0);
  assert.equal(entryScore({ ...human, dimensions: Object.fromEntries(humanAxes.map(({ key }) => [key, 4])) }), 10);
});

test('an unknown grade withholds the aggregate while an assessed zero remains a grade', () => {
  const incomplete = { ...human, dimensions: { ...human.dimensions }, unknowns: ['Recovery has not been inspected.'] };
  delete incomplete.dimensions.dependability;
  assert.equal(entryScore(incomplete), null);
  assert.equal(scoreLabel({ rating: incomplete, score: entryScore(incomplete) }), 'Assessment incomplete');
  assert.equal(entryScore({ ...human, dimensions: { ...human.dimensions, dependability: 0 } }), 6.4);
});

test('ranking separates rubric scales, incomplete profiles and scoped blockers', () => {
  const blocked = { ...human, blockers: [{ scope: 'Optional export', reason: 'Leaks credentials.' }] };
  const incomplete = { ...human, dimensions: {}, unknowns: ['All grades pending.'] };
  const entries = [
    { id: 'blocked', rating: blocked, score: 10 },
    { id: 'legacy', rating: legacy, score: 5 },
    { id: 'incomplete', rating: incomplete, score: null },
    { id: 'human-low', rating: human, score: 2 },
    { id: 'human-high', rating: human, score: 8 },
  ];
  assert.deepEqual(entries.sort(compareRatings).map(({ id }) => id), ['human-high', 'human-low', 'legacy', 'incomplete', 'blocked']);
  assert.equal(scoreLabel({ rating: legacy, score: 3.8 }), '3.8/5 · legacy');
  assert.equal(scoreLabel({ rating: blocked, score: 10 }), '10.0/10 · blocker');
  assert.equal(entryScore(blocked), entryScore(human));
});

test('rating schema rejects unsupported versions, mixed scales, invalid grades and unnamed unknowns', () => {
  const file = join(repositoryRoot, 'entries/rules/focused-changes/entry.yaml');
  const metadata = readYaml(readFileSync(file, 'utf8'), file) as Record<string, unknown>;
  const check = (rating: unknown) => validate('entry', { ...metadata, rating }, 'rating fixture');
  check(human);
  check(legacy);
  check({ ...human, dimensions: {}, unknowns: ['Pending inspection.'] });
  for (const rating of [
    { ...human, rubric: 'human-v2' },
    { ...human, usefulness: 4 },
    { ...human, dimensions: {} },
    { ...human, dimensions: {}, unknowns: [] },
    { ...human, dimensions: {}, unknowns: [' '] },
    { ...human, dimensions: { ...human.dimensions, control: 5 } },
    { ...human, dimensions: { ...human.dimensions, control: -1 } },
    { ...human, dimensions: { ...human.dimensions, control: 2.5 } },
    { ...human, dimensions: { ...human.dimensions, novelty: 3 } },
    { ...human, context: ' ' },
    { ...human, baseline: '' },
    { ...human, review: '../outside.md' },
    { ...human, blockers: [{ scope: 'Optional export' }] },
    { ...human, blockers: [{ scope: '', reason: 'Leaks credentials.' }] },
    { ...legacy, rubric: undefined },
  ]) assert.throws(() => check(rating), /rating fixture/u);
});
