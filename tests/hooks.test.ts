import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { test } from 'node:test';

test('hook scripts preserve privacy, serialize budgets, and handle real edit/gate edge cases', () => {
  const result = spawnSync('python3', [fileURLToPath(new URL('./hook_scripts_test.py', import.meta.url))], {
    encoding: 'utf8', env: { ...process.env, PYTHONDONTWRITEBYTECODE: '1' }, timeout: 30000,
  });
  assert.equal(result.status, 0, result.stdout + result.stderr + String(result.error ?? ''));
});
