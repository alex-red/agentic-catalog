import assert from 'node:assert/strict';
import { test } from 'node:test';
import { checkFreshness, githubLatestCommit, needsAttention, renderFreshness } from '../scripts/freshness.ts';
import { loadCatalog } from '../scripts/library.ts';

const catalog = loadCatalog();
const today = new Date('2026-10-21T00:00:00Z');

test('pinned revisions that match upstream are current; moved paths are flagged', async () => {
  const pinned = new Map(catalog.entries.filter((entry) => entry.source.revision).map((entry) => [`${entry.source.url}|${entry.source.path}`, entry.source.revision!]));
  const asked: string[] = [];
  const rows = await checkFreshness(catalog, async (repository, path) => {
    asked.push(`${repository}|${path}`);
    const revision = pinned.get(`https://github.com/${repository}|${path}`)!;
    return { sha: path === 'skills/grilling' || path === 'skills/productivity/grilling' ? 'f'.repeat(40) : revision, date: '2026-10-20T00:00:00Z' };
  }, today);
  assert.equal(asked.length, pinned.size, 'one request per pinned upstream');
  const grilling = rows.find((row) => row.id === 'grilling')!;
  assert.equal(grilling.status, 'behind');
  assert.ok(rows.filter((row) => row.id !== 'grilling').every((row) => !needsAttention(row)));
  assert.match(renderFreshness(rows), /grilling \(vendored\): upstream moved: 95249b0 -> fffffff/u);
});

test('failed lookups and stale reviews need attention', async () => {
  const rows = await checkFreshness(catalog, async () => undefined, new Date('2027-06-01T00:00:00Z'));
  const linked = rows.find((row) => row.id === 'superpowers')!;
  assert.equal(linked.status, 'unknown');
  const original = rows.find((row) => row.id === 'retrospective')!;
  assert.equal(original.status, 'current');
  assert.ok(needsAttention(original), 'a review older than six months is flagged even for original entries');
});

test('the GitHub lookup scopes the query to the entry path and tolerates errors', async () => {
  const urls: string[] = [];
  const ok = githubLatestCommit('token', (async (url: string) => {
    urls.push(url);
    return new Response(JSON.stringify([{ sha: 'a'.repeat(40), commit: { committer: { date: '2026-10-01T00:00:00Z' } } }]));
  }) as typeof fetch);
  assert.deepEqual(await ok('obra/superpowers', 'skills/test-driven-development'), { sha: 'a'.repeat(40), date: '2026-10-01T00:00:00Z' });
  assert.match(urls[0], /repos\/obra\/superpowers\/commits\?per_page=1&path=skills%2Ftest-driven-development/u);
  const failing = githubLatestCommit(undefined, (async () => new Response('rate limited', { status: 403 })) as typeof fetch);
  assert.equal(await failing('obra/superpowers', undefined), undefined);
});
