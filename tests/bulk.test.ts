import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { createServer } from 'node:http';
import type { AddressInfo } from 'node:net';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import type { TestContext } from 'node:test';
import { promisify } from 'node:util';
import { Ajv } from 'ajv';
import { parse } from 'yaml';
import { CONFIG_NAME, configToScript, configToYaml, makeConfig, parseConfig, planSteps } from '../site/src/bulk.ts';
import type { BulkEntry, InstallConfig } from '../site/src/bulk.ts';
import { repositoryRoot } from '../scripts/library.ts';

const catalog = (JSON.parse(readFileSync(join(repositoryRoot, 'catalog/index.json'), 'utf8')) as { entries: BulkEntry[] }).entries;
const opts = {
  repository: 'https://github.com/alex-red/agentic-catalog',
  rawRoot: 'https://raw.githubusercontent.com/alex-red/agentic-catalog',
  siteUrl: 'https://alex-red.github.io/agentic-catalog/',
};
const schema = new Ajv({ allErrors: true, strict: true }).compile(
  JSON.parse(readFileSync(join(repositoryRoot, 'catalog/schema/install-config.schema.json'), 'utf8')),
);
const run = promisify(execFile);

function config(ids: string[], host: InstallConfig['host'] = 'claude-code', skillsCli = false, scope: InstallConfig['scope'] = 'project'): InstallConfig {
  return makeConfig(catalog, ids, { revision: 'abc1234', host, scope, skillsCli });
}

test('generated configs round-trip through the parser and match the schema', () => {
  const original = makeConfig(catalog, ['retrospective', 'focused-changes', 'format-after-edit'], {
    revision: 'abc1234', host: 'codex', scope: 'user', skillsCli: true, collections: ['starter'],
  });
  const text = configToYaml(original, opts);
  assert.ok(schema(parse(text)), JSON.stringify(schema.errors));
  const { config, known, warnings } = parseConfig(text, catalog);
  assert.deepEqual(config, original);
  assert.deepEqual(known, ['retrospective', 'focused-changes', 'format-after-edit']);
  assert.deepEqual(warnings, []);
});

test('malformed configs are rejected by both the parser and the schema', () => {
  const valid = { schemaVersion: 1, revision: 'abc1234', host: 'claude-code', entries: [{ id: 'retrospective', type: 'skill' }] };
  const cases: [string, unknown][] = [
    ['top-level list', []],
    ['wrong schema version', { ...valid, schemaVersion: 2 }],
    ['unknown host', { ...valid, host: 'cursor' }],
    ['unknown scope', { ...valid, scope: 'global' }],
    ['revision with shell characters', { ...valid, revision: 'main; rm -rf /' }],
    ['unknown top-level field', { ...valid, extra: true }],
    ['entry without a type', { ...valid, entries: [{ id: 'retrospective' }] }],
    ['entry ID with a path', { ...valid, entries: [{ id: '../etc', type: 'skill' }] }],
    ['entry field the parser does not know', { ...valid, entries: [{ id: 'retrospective', type: 'skill', path: 'x' }] }],
    ['skillsCli as a string', { ...valid, skillsCli: 'yes' }],
  ];
  for (const [label, data] of cases) {
    assert.equal(schema(data), false, `schema accepted ${label}`);
    assert.throws(() => parseConfig(JSON.stringify(data), catalog), /Not an Agentic Catalog config/, label);
  }
  assert.throws(() => parseConfig('entries: [unclosed', catalog), /Not valid YAML/);
  assert.throws(
    () => parseConfig(JSON.stringify({ ...valid, entries: [valid.entries[0], valid.entries[0]] }), catalog),
    /listed twice/,
  );
});

test('entries missing from the catalog become warnings and manual removals', () => {
  const text = configToYaml({ ...config(['retrospective']), entries: [{ id: 'retrospective', type: 'skill' }, { id: 'gone-entry', type: 'skill' }] }, opts);
  const { config: baseline, known, warnings } = parseConfig(text, catalog);
  assert.deepEqual(known, ['retrospective']);
  assert.match(warnings.join('\n'), /gone-entry/);
  const removal = planSteps(catalog, config(['retrospective']), opts, baseline).find((s) => s.id === 'gone-entry');
  assert.equal(removal?.kind, 'remove');
  assert.ok(removal.lines.every((l) => l.startsWith('#')));
});

test('hooks, MCP servers, workflows, plugins, and prose installers never produce commands', () => {
  const ids = catalog.filter((e) => ['hook', 'mcp', 'workflow', 'plugin'].includes(e.type) || e.id === 'ux-critique').map((e) => e.id);
  for (const host of ['claude-code', 'codex'] as const) {
    for (const step of planSteps(catalog, config(ids, host), opts)) {
      assert.equal(step.kind, 'manual', step.id);
      assert.ok(step.lines.every((l) => l.startsWith('#')), `${step.id} has a command line`);
    }
  }
});

async function serveRepository(t: TestContext): Promise<string> {
  // Serves /<revision>/<path> from the checkout, like raw.githubusercontent.com.
  const server = createServer((req, res) => {
    const path = decodeURIComponent(req.url ?? '').split('/').slice(2).join('/');
    const file = join(repositoryRoot, path);
    if (!path || path.includes('..') || !existsSync(file)) {
      res.writeHead(404).end();
      return;
    }
    res.end(readFileSync(file));
  });
  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
  t.after(() => server.close());
  return `http://127.0.0.1:${(server.address() as AddressInfo).port}/abc1234`;
}

function project(t: TestContext): string {
  const dir = mkdtempSync(join(tmpdir(), 'agentic-catalog-bulk-'));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  return dir;
}

async function runScript(dir: string, base: string, script: string, env: Record<string, string> = {}) {
  writeFileSync(join(dir, 'install.sh'), script);
  return run('bash', ['install.sh'], { cwd: dir, env: { ...process.env, CATALOG_RAW_BASE: base, ...env } });
}

test('the script installs Claude Code files, records the config, and is safe to re-run', async (t) => {
  const base = await serveRepository(t);
  const dir = project(t);
  const selected = config(['retrospective', 'focused-changes', 'silent-failure-hunter', 'format-after-edit']);
  const script = configToScript(catalog, selected, opts);

  await runScript(dir, base, script);
  const skill = join(dir, '.claude/skills/retrospective');
  assert.equal(readFileSync(join(skill, 'SKILL.md'), 'utf8'), readFileSync(join(repositoryRoot, 'entries/skills/retrospective/SKILL.md'), 'utf8'));
  assert.ok(existsSync(join(skill, 'references/trigger-checks.md')));
  assert.ok(!existsSync(join(skill, 'entry.yaml')));
  assert.ok(existsSync(join(dir, '.claude/rules/focused-changes.md')));
  assert.ok(existsSync(join(dir, '.claude/agents/silent-failure-hunter.md')));
  assert.ok(!existsSync(join(dir, '.claude/hooks')), 'hooks must not be installed');
  assert.deepEqual(parseConfig(readFileSync(join(dir, '.agents', CONFIG_NAME), 'utf8'), catalog).config, selected);

  const again = await runScript(dir, base, script);
  assert.doesNotMatch(again.stdout, /^installed /m);
  assert.match(again.stdout, /unchanged retrospective/);

  // Local edits survive a re-run and are only replaced with FORCE=1.
  writeFileSync(join(skill, 'SKILL.md'), 'local edit\n');
  const skipped = await runScript(dir, base, script);
  assert.match(skipped.stderr, /skipped retrospective/);
  assert.equal(readFileSync(join(skill, 'SKILL.md'), 'utf8'), 'local edit\n');
  await runScript(dir, base, script, { FORCE: '1' });
  assert.notEqual(readFileSync(join(skill, 'SKILL.md'), 'utf8'), 'local edit\n');
});

test('Codex rule blocks are replaced rather than duplicated, and removed when dropped', async (t) => {
  const base = await serveRepository(t);
  const dir = project(t);
  writeFileSync(join(dir, 'AGENTS.md'), '# Project\n\nKeep this line.\n');
  const both = config(['focused-changes', 'verification-evidence'], 'codex');

  await runScript(dir, base, configToScript(catalog, both, opts));
  await runScript(dir, base, configToScript(catalog, both, opts));
  const installed = readFileSync(join(dir, 'AGENTS.md'), 'utf8');
  assert.equal(installed.match(/agentic-catalog:begin id=focused-changes /g)?.length, 1);
  assert.equal(installed.match(/agentic-catalog:end/g)?.length, 2);

  const baseline = parseConfig(readFileSync(join(dir, '.agents', CONFIG_NAME), 'utf8'), catalog).config;
  await runScript(dir, base, configToScript(catalog, config(['verification-evidence'], 'codex'), opts, baseline));
  const after = readFileSync(join(dir, 'AGENTS.md'), 'utf8');
  assert.doesNotMatch(after, /id=focused-changes/);
  assert.match(after, /id=verification-evidence/);
  assert.match(after, /Keep this line\./);
});

test('changing host removes entries from their old location', async (t) => {
  const base = await serveRepository(t);
  const dir = project(t);
  const claude = config(['retrospective'], 'claude-code');
  await runScript(dir, base, configToScript(catalog, claude, opts));
  await runScript(dir, base, configToScript(catalog, config(['retrospective'], 'codex'), opts, claude));
  assert.ok(!existsSync(join(dir, '.claude/skills/retrospective')));
  assert.ok(existsSync(join(dir, '.agents/skills/retrospective/SKILL.md')));
});

test('configs without a scope default to project', () => {
  const text = 'schemaVersion: 1\nrevision: abc1234\nhost: codex\nentries: []\n';
  assert.equal(parseConfig(text, catalog).config.scope, 'project');
});

test('user scope installs under HOME and records the config in ~/.agents', async (t) => {
  const base = await serveRepository(t);
  const home = project(t);
  const elsewhere = project(t);
  const user = config(['retrospective', 'focused-changes'], 'claude-code', false, 'user');
  await runScript(elsewhere, base, configToScript(catalog, user, opts), { HOME: home });
  assert.ok(existsSync(join(home, '.claude/skills/retrospective/SKILL.md')));
  assert.ok(existsSync(join(home, '.claude/rules/focused-changes.md')));
  assert.deepEqual(parseConfig(readFileSync(join(home, '.agents', CONFIG_NAME), 'utf8'), catalog).config, user);
  assert.deepEqual(readdirSync(elsewhere), ['install.sh'], 'nothing is written to the working directory');

  // Codex rules go to the global AGENTS.md in CODEX_HOME.
  const codexHome = join(home, 'codex-home');
  await runScript(elsewhere, base, configToScript(catalog, config(['focused-changes'], 'codex', false, 'user'), opts, user), { HOME: home, CODEX_HOME: codexHome });
  assert.match(readFileSync(join(codexHome, 'AGENTS.md'), 'utf8'), /agentic-catalog:begin id=focused-changes /);
  assert.ok(!existsSync(join(home, '.claude/rules/focused-changes.md')), 'the scope or host change removes the old copy');
});
