import assert from 'node:assert/strict';
import { cpSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, relative } from 'node:path';
import { test } from 'node:test';
import type { TestContext } from 'node:test';
import { stringify } from 'yaml';
import {
  checkCatalog, loadCatalog, readYaml, renderCatalog, renderRuleBlock,
  repositoryRoot, validateSkillBundle, writeCatalog,
} from '../scripts/library.ts';

function sandbox(context: TestContext): string {
  const root = mkdtempSync(join(tmpdir(), 'agentic-rules-test-'));
  context.after(() => rmSync(root, { recursive: true, force: true }));
  for (const name of ['rules', 'skills', 'profiles', 'evals', 'catalog']) {
    cpSync(join(repositoryRoot, name), join(root, name), { recursive: true });
  }
  return root;
}

function updateYaml(root: string, path: string, update: (data: Record<string, unknown>) => void): void {
  const file = join(root, path);
  const data = readYaml(readFileSync(file, 'utf8'), file) as Record<string, unknown>;
  update(data);
  writeFileSync(file, stringify(data));
}

function snapshot(root: string, current = root): Record<string, string> {
  return Object.assign({}, ...readdirSync(current, { withFileTypes: true }).map((entry) => {
    const path = join(current, entry.name);
    return entry.isDirectory() ? snapshot(root, path) : { [relative(root, path)]: readFileSync(path, 'utf8') };
  }));
}

const skillPath = 'skills/ar-systematic-debugging';
const companionPath = `${skillPath}/component.yaml`;

test('catalog generation is deterministic and changes only the generated file', (context) => {
  const root = sandbox(context);
  const before = snapshot(root);
  const generated = renderCatalog(loadCatalog(root));
  assert.equal(generated, renderCatalog(loadCatalog(root)));
  writeCatalog(root);
  assert.equal(readFileSync(join(root, 'catalog/index.json'), 'utf8'), generated);
  const after = snapshot(root);
  delete before[join('catalog', 'index.json')];
  delete after[join('catalog', 'index.json')];
  assert.deepEqual(after, before);
  checkCatalog(root);
});

test('an installed skill validates without the source checkout', (context) => {
  const root = sandbox(context);
  const installed = join(root, 'isolated/ar-systematic-debugging');
  cpSync(join(root, skillPath), installed, { recursive: true });
  rmSync(join(root, 'skills'), { recursive: true });
  rmSync(join(root, 'evals'), { recursive: true });
  validateSkillBundle(installed);
});

test('profiles cannot select an unpublished skill', (context) => {
  const root = sandbox(context);
  updateYaml(root, 'profiles/debugging.yaml', (profile) => { profile.skills = ['ar-missing']; });
  assert.throws(() => loadCatalog(root), /unknown skill ar-missing/u);
});

test('profiles cannot silently include a missing rule', (context) => {
  const root = sandbox(context);
  updateYaml(root, 'profiles/debugging.yaml', (profile) => { profile.rules = ['missing']; });
  assert.throws(() => loadCatalog(root), /unknown rule missing/u);
});

test('duplicate profile selections are rejected', (context) => {
  const root = sandbox(context);
  updateYaml(root, 'profiles/debugging.yaml', (profile) => {
    profile.skills = ['ar-systematic-debugging', 'ar-systematic-debugging'];
  });
  assert.throws(() => loadCatalog(root), /duplicate items/u);
});

test('non-string standard metadata is rejected', (context) => {
  const root = sandbox(context);
  const file = join(root, skillPath, 'SKILL.md');
  writeFileSync(file, readFileSync(file, 'utf8').replace('license: MIT', 'license: MIT\nmetadata:\n  count: 3'));
  assert.throws(() => loadCatalog(root), /must be string/u);
});

test('skill names must match their installed directory', (context) => {
  const root = sandbox(context);
  const file = join(root, skillPath, 'SKILL.md');
  writeFileSync(file, readFileSync(file, 'utf8').replace('name: ar-systematic-debugging', 'name: ar-different'));
  assert.throws(() => loadCatalog(root), /name must match/u);
});

test('duplicate YAML keys are rejected instead of choosing one value', (context) => {
  const root = sandbox(context);
  const file = join(root, companionPath);
  writeFileSync(file, `${readFileSync(file, 'utf8')}category: another\n`);
  assert.throws(() => loadCatalog(root), /unique/u);
});

test('missing required references fail validation', (context) => {
  const root = sandbox(context);
  rmSync(join(root, skillPath, 'references/difficult-reproductions.md'));
  assert.throws(() => loadCatalog(root), /Missing path/u);
});

test('a link to an existing file outside the skill still fails portability', (context) => {
  const root = sandbox(context);
  writeFileSync(join(root, 'outside.md'), '# Available only in the source checkout\n');
  const file = join(root, skillPath, 'SKILL.md');
  writeFileSync(file, `${readFileSync(file, 'utf8')}\n[Required](../../outside.md)\n`);
  assert.throws(() => loadCatalog(root), /escapes its content root/u);
});

test('Markdown links support reference definitions and encoded spaces but ignore code examples', (context) => {
  const root = sandbox(context);
  writeFileSync(join(root, skillPath, 'references/with space.md'), '# Included\n');
  const file = join(root, skillPath, 'SKILL.md');
  writeFileSync(file, `${readFileSync(file, 'utf8')}\n[Reference][details]\n\n[details]: <references/with space.md>\n\n[Encoded](references/with%20space.md)\n\n\`\`\`md\n[Example](missing.md)\n\`\`\`\n`);
  loadCatalog(root);
});

test('symlinked resources are rejected even when the target is in the bundle', (context) => {
  const root = sandbox(context);
  symlinkSync('difficult-reproductions.md', join(root, skillPath, 'references/alias.md'));
  assert.throws(() => loadCatalog(root), /Symlinks are not portable/u);
});

test('machine-local file URLs cannot bypass resource closure checks', (context) => {
  const root = sandbox(context);
  const file = join(root, skillPath, 'SKILL.md');
  writeFileSync(file, `${readFileSync(file, 'utf8')}\n[Local dependency](file:///tmp/reference.md)\n`);
  assert.throws(() => loadCatalog(root), /machine-local resource links/u);
});

test('standalone skills must retain a nonempty license notice', (context) => {
  const root = sandbox(context);
  writeFileSync(join(root, skillPath, 'LICENSE.txt'), '');
  assert.throws(() => loadCatalog(root), /must contain the license notice/u);
});

test('maturity promotion requires recorded evidence', (context) => {
  const root = sandbox(context);
  updateYaml(root, companionPath, (component) => { component.maturity = 'stable'; });
  assert.throws(() => loadCatalog(root), /evidence/u);
});

test('evidence paths must exist', (context) => {
  const root = sandbox(context);
  updateYaml(root, companionPath, (component) => { component.evidence = ['evals/results/missing.md']; });
  assert.throws(() => loadCatalog(root), /Missing path/u);
});

test('evaluation cases must target the component that declares them', (context) => {
  const root = sandbox(context);
  updateYaml(root, 'evals/cases/systematic-debugging.yaml', (evaluation) => { evaluation.skill = 'ar-other'; });
  assert.throws(() => loadCatalog(root), /wrong skill/u);
});

test('adapted content requires upstream revision, licensing, and notices', (context) => {
  const root = sandbox(context);
  updateYaml(root, companionPath, (component) => { component.provenance = { kind: 'adapted' }; });
  assert.throws(() => loadCatalog(root), /revision/u);
});

test('stale catalog checks fail without rewriting output', (context) => {
  const root = sandbox(context);
  writeFileSync(join(root, 'catalog/index.json'), '{}\n');
  assert.throws(() => checkCatalog(root), /Catalog is stale/u);
  assert.equal(readFileSync(join(root, 'catalog/index.json'), 'utf8'), '{}\n');
});

test('catalog writes reject a symlinked destination', (context) => {
  const root = sandbox(context);
  const target = join(root, 'untouched.json');
  writeFileSync(target, '{}\n');
  rmSync(join(root, 'catalog/index.json'));
  symlinkSync(target, join(root, 'catalog/index.json'));
  assert.throws(() => writeCatalog(root), /Symlinks are not portable/u);
  assert.equal(readFileSync(target, 'utf8'), '{}\n');
});

test('rule previews resolve the selected source text without writing files', (context) => {
  const root = sandbox(context);
  const before = snapshot(root);
  const preview = renderRuleBlock('debugging', 'local-unreleased', root);
  assert.ok(preview.startsWith('<!-- agentic-rules:begin profile=debugging source=local-unreleased -->'));
  assert.ok(preview.includes('## Verification evidence'));
  assert.ok(!preview.includes('description:'));
  assert.deepEqual(snapshot(root), before);
});

test('rule previews reject unknown profiles and multiline source labels', (context) => {
  const root = sandbox(context);
  assert.throws(() => renderRuleBlock('missing', 'main', root), /Unknown profile/u);
  assert.throws(() => renderRuleBlock('debugging', 'main\nextra', root), /revision label/u);
});

test('catalog identity is derived rather than duplicated in companion metadata', (context) => {
  const root = sandbox(context);
  updateYaml(root, companionPath, (component) => { component.name = 'ar-different'; });
  assert.throws(() => loadCatalog(root), /additional properties/u);
});

test('fixture links may not point outside the repository', (context) => {
  const root = sandbox(context);
  mkdirSync(join(root, 'unrelated'));
  updateYaml(root, 'evals/cases/systematic-debugging.yaml', (evaluation) => { evaluation.fixture = '../'; });
  assert.throws(() => loadCatalog(root), /escapes its content root/u);
});
