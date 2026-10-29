import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { test } from 'node:test';
import { canInstallHook, hookInstallCommand } from '../site/src/hook-install.ts';
import type { HookInstallEntry } from '../site/src/hook-install.ts';

const entries = (JSON.parse(readFileSync(new URL('../catalog/index.json', import.meta.url), 'utf8')) as { entries: HookInstallEntry[] }).entries;

test('standalone hook setup preserves consumer settings, conflicts and pinned source boundaries', () => {
  const result = spawnSync('python3', [fileURLToPath(new URL('./install_hook_test.py', import.meta.url))], {
    encoding: 'utf8', env: { ...process.env, PYTHONDONTWRITEBYTECODE: '1' }, timeout: 30000,
  });
  assert.equal(result.status, 0, result.stdout + result.stderr + String(result.error ?? ''));
});

test('install snippets select supported host routes and pin setup code to the site revision', () => {
  const hook = entries.find(e => e.id === 'compact-context')!;
  assert.ok(canInstallHook(hook, 'claude-code'));
  assert.ok(canInstallHook(hook, 'codex'));
  assert.ok(!canInstallHook(entries.find(e => e.id === 'no-email-context')!, 'claude-code'));
  assert.ok(!canInstallHook(entries.find(e => e.id === 'desktop-attention')!, 'codex'));
  const command = hookInstallCommand(hook, 'codex', 'abcdef1', 'https://raw.example/repo');
  assert.match(command, /abcdef1\/scripts\/install-hook\.py/);
  assert.match(command, /--host 'codex'/);
  assert.match(command, /--revision 'abcdef1'/);
  assert.doesNotMatch(command, /\|\s*(?:bash|python)/);
  assert.throws(() => hookInstallCommand(hook, 'codex', 'main;echo injected', 'https://raw.example/repo'));
});
