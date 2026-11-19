import assert from 'node:assert/strict';
import { test } from 'node:test';
import { isNewSkill } from '../site/src/entry-age.ts';

test('the New badge spans exactly seven UTC calendar days', () => {
  const skill = { type: 'skill', added: '2026-11-19' };
  assert.equal(isNewSkill(skill, Date.parse('2026-11-18T23:59:59.999Z')), false);
  assert.equal(isNewSkill(skill, Date.parse('2026-11-19T00:00:00.000Z')), true);
  assert.equal(isNewSkill(skill, Date.parse('2026-11-25T23:59:59.999Z')), true);
  assert.equal(isNewSkill(skill, Date.parse('2026-11-26T00:00:00.000Z')), false);
});

test('undated skills and recently added non-skills have no New badge', () => {
  const now = Date.parse('2026-11-19T12:00:00Z');
  assert.equal(isNewSkill({ type: 'skill' }, now), false);
  assert.equal(isNewSkill({ type: 'workflow', added: '2026-11-19' }, now), false);
});
