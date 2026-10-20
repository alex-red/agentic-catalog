import assert from 'node:assert/strict';
import { cpSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, relative } from 'node:path';
import { test } from 'node:test';
import type { TestContext } from 'node:test';
import { stringify } from 'yaml';
import {
  checkCatalog, entryScore, loadCatalog, loadEvaluationCases, readYaml, renderCatalog, renderLlmsText, renderRuleBlock,
  repositoryRoot, validateSkillBundle, writeCatalog,
} from '../scripts/library.ts';

const sandboxPaths = ['entries', 'skills', 'collections', 'evals', 'catalog', 'package.json', 'llms.txt'];

function sandbox(context: TestContext): string {
  const root = mkdtempSync(join(tmpdir(), 'agentic-rules-test-'));
  context.after(() => rmSync(root, { recursive: true, force: true }));
  for (const name of sandboxPaths) cpSync(join(repositoryRoot, name), join(root, name), { recursive: true });
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

const skillPath = 'entries/skills/systematic-debugging';
const metadataPath = `${skillPath}/entry.yaml`;
const rulePath = 'entries/rules/focused-changes';

function addLinkedEntry(root: string, overrides: Record<string, unknown> = {}): string {
  const directory = join(root, 'entries/plugins/example-plugin');
  mkdirSync(directory, { recursive: true });
  writeFileSync(join(directory, 'entry.yaml'), stringify({
    schemaVersion: 2, id: 'example-plugin', type: 'plugin', title: 'Example plugin',
    summary: 'An upstream plugin.', useWhen: 'Testing.', tags: ['example'], hosts: ['claude-code'],
    rating: { usefulness: 3, quality: 3, portability: 2, novelty: 3, evidence: 'reviewed', reviewed: '2026-10-20', notes: 'Test entry.' },
    source: { kind: 'linked', url: 'https://github.com/example/plugin', license: 'MIT', author: 'Example' },
    ...overrides,
  }));
  return directory;
}

test('catalog generation is deterministic and changes only the generated files', (context) => {
  const root = sandbox(context);
  const before = snapshot(root);
  const generated = renderCatalog(loadCatalog(root));
  assert.equal(generated, renderCatalog(loadCatalog(root)));
  writeCatalog(root);
  assert.equal(readFileSync(join(root, 'catalog/index.json'), 'utf8'), generated);
  assert.equal(readFileSync(join(root, 'llms.txt'), 'utf8'), renderLlmsText(loadCatalog(root)));
  const after = snapshot(root);
  for (const generatedFile of [join('catalog', 'index.json'), 'llms.txt']) {
    delete before[generatedFile];
    delete after[generatedFile];
  }
  assert.deepEqual(after, before);
  checkCatalog(root);
});

test('scores weight usefulness twice and drive llms.txt ranking', (context) => {
  assert.equal(entryScore({ usefulness: 5, quality: 4, portability: 3, novelty: 2, evidence: 'reviewed', reviewed: '2026-10-20', notes: 'x' }), 3.8);
  const root = sandbox(context);
  const catalog = loadCatalog(root);
  const rules = renderLlmsText(catalog).split('## Rules')[1].split('##')[0];
  const order = catalog.entries.filter((entry) => entry.type === 'rule').sort((a, b) => b.score - a.score || a.id.localeCompare(b.id));
  const positions = order.map((entry) => rules.indexOf(`id \`${entry.id}\``));
  assert.deepEqual([...positions].sort((a, b) => a - b), positions);
  assert.ok(positions.every((position) => position >= 0));
});

test('entries must live under the folder for their type and match their ID', (context) => {
  const root = sandbox(context);
  updateYaml(root, `${rulePath}/entry.yaml`, (entry) => { entry.type = 'workflow'; });
  assert.throws(() => loadCatalog(root), /belongs under entries\/workflows/u);
  const other = sandbox(context);
  updateYaml(other, `${rulePath}/entry.yaml`, (entry) => { entry.id = 'renamed'; });
  assert.throws(() => loadCatalog(other), /must match its directory/u);
});

test('unknown entry folders are rejected', (context) => {
  const root = sandbox(context);
  mkdirSync(join(root, 'entries/prompts'));
  assert.throws(() => loadCatalog(root), /Unknown entry folder/u);
});

test('non-linked entries require their primary file', (context) => {
  const root = sandbox(context);
  rmSync(join(root, rulePath, 'RULE.md'));
  assert.throws(() => loadCatalog(root), /Missing path/u);
});

test('linked entries hold only metadata', (context) => {
  const root = sandbox(context);
  const directory = addLinkedEntry(root);
  loadCatalog(root);
  writeFileSync(join(directory, 'README.md'), '# Copied upstream text\n');
  assert.throws(() => loadCatalog(root), /linked entries hold only entry.yaml/u);
});

test('plugins must be linked and linked entries must name upstream and author', (context) => {
  const root = sandbox(context);
  addLinkedEntry(root, { source: { kind: 'original', license: 'MIT' } });
  assert.throws(() => loadCatalog(root), /must be equal to constant/u);
  const other = sandbox(context);
  addLinkedEntry(other, { source: { kind: 'linked', license: 'MIT' } });
  assert.throws(() => loadCatalog(other), /must have required property 'url'/u);
});

test('vendored entries require a pinned revision and the upstream license file', (context) => {
  const root = sandbox(context);
  const vendored = { kind: 'vendored', url: 'https://github.com/example/rules', author: 'Example', license: 'MIT' };
  updateYaml(root, `${rulePath}/entry.yaml`, (entry) => { entry.source = vendored; });
  assert.throws(() => loadCatalog(root), /revision/u);
  updateYaml(root, `${rulePath}/entry.yaml`, (entry) => { entry.source = { ...vendored, revision: 'a'.repeat(40) }; });
  assert.throws(() => loadCatalog(root), /must include the upstream license file/u);
  writeFileSync(join(root, rulePath, 'LICENSE'), 'MIT License\n');
  loadCatalog(root);
});

test('adapted entries must cite their inspiration', (context) => {
  const root = sandbox(context);
  updateYaml(root, `${rulePath}/entry.yaml`, (entry) => { entry.source = { kind: 'adapted', license: 'MIT' }; });
  assert.throws(() => loadCatalog(root), /inspiredBy/u);
});

test('related entries must exist', (context) => {
  const root = sandbox(context);
  updateYaml(root, metadataPath, (entry) => { entry.related = ['missing-entry']; });
  assert.throws(() => loadCatalog(root), /unknown related entry missing-entry/u);
});

test('rating axes are bounded integers', (context) => {
  const root = sandbox(context);
  updateYaml(root, metadataPath, (entry) => { (entry.rating as Record<string, unknown>).usefulness = 6; });
  assert.throws(() => loadCatalog(root), /must be <= 5/u);
});

test('the discovery skill must point at the published catalog', (context) => {
  const root = sandbox(context);
  const manifest = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
  manifest.repository.url = 'https://github.com/someone-else/agentic-rules';
  writeFileSync(join(root, 'package.json'), JSON.stringify(manifest));
  assert.throws(() => loadCatalog(root), /must reference https:\/\/raw.githubusercontent.com\/someone-else/u);
});

test('an installed skill validates without the source checkout', (context) => {
  const root = sandbox(context);
  const installed = join(root, 'isolated/systematic-debugging');
  cpSync(join(root, skillPath), installed, { recursive: true });
  rmSync(join(installed, 'entry.yaml'));
  rmSync(join(root, 'entries'), { recursive: true });
  rmSync(join(root, 'evals'), { recursive: true });
  validateSkillBundle(installed);
});

test('collections cannot select a missing entry', (context) => {
  const root = sandbox(context);
  updateYaml(root, 'collections/debugging.yaml', (collection) => { collection.entries = ['missing-entry']; });
  assert.throws(() => loadCatalog(root), /unknown entry missing-entry/u);
});

test('duplicate collection selections are rejected', (context) => {
  const root = sandbox(context);
  updateYaml(root, 'collections/debugging.yaml', (collection) => {
    collection.entries = ['systematic-debugging', 'systematic-debugging'];
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
  writeFileSync(file, readFileSync(file, 'utf8').replace('name: systematic-debugging', 'name: different-skill'));
  assert.throws(() => loadCatalog(root), /name must match/u);
});

test('duplicate YAML keys are rejected instead of choosing one value', (context) => {
  const root = sandbox(context);
  const file = join(root, metadataPath);
  writeFileSync(file, `${readFileSync(file, 'utf8')}title: Another\n`);
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

test('evidence above reviewed requires recorded evidence files', (context) => {
  const root = sandbox(context);
  updateYaml(root, `${rulePath}/entry.yaml`, (entry) => { (entry.rating as Record<string, unknown>).evidence = 'evaluated'; });
  assert.throws(() => loadCatalog(root), /evidence/u);
});

test('evidence paths must exist', (context) => {
  const root = sandbox(context);
  updateYaml(root, metadataPath, (entry) => { entry.evidence = ['evals/results/missing.md']; });
  assert.throws(() => loadCatalog(root), /Missing path/u);
});

test('evaluation cases must target the component that declares them', (context) => {
  const root = sandbox(context);
  updateYaml(root, 'evals/cases/systematic-debugging.yaml', (evaluation) => { evaluation.skill = 'retrospective'; });
  assert.throws(() => loadCatalog(root), /wrong skill/u);
});

test('rule outcome cases are discovered without skill trigger prompts', (context) => {
  const root = sandbox(context);
  const path = 'evals/cases/checkout-discount.yaml';
  updateYaml(root, metadataPath, (entry) => { entry.evaluationCases = ['evals/cases/systematic-debugging.yaml']; });
  updateYaml(root, path, (evaluation) => {
    evaluation.id = 'verification-running-app';
    evaluation.rule = 'verification-evidence';
    delete evaluation.skill;
    delete evaluation.triggers;
  });
  const evaluation = loadEvaluationCases(root).find((entry) => entry.id === 'verification-running-app');
  assert.equal(evaluation?.rule, 'verification-evidence');
  assert.equal(evaluation?.triggers, undefined);
  assert.equal(evaluation?.fixture, 'evals/fixtures/python-checkout');
});

test('evaluation cases reject unknown rule and skill targets', (context) => {
  const root = sandbox(context);
  updateYaml(root, 'evals/cases/checkout-discount.yaml', (evaluation) => {
    evaluation.rule = 'missing-rule';
    delete evaluation.skill;
    delete evaluation.triggers;
  });
  assert.throws(() => loadCatalog(root), /unknown rule missing-rule/u);

  const otherRoot = sandbox(context);
  updateYaml(otherRoot, 'evals/cases/checkout-discount.yaml', (evaluation) => { evaluation.skill = 'missing-skill'; });
  assert.throws(() => loadEvaluationCases(otherRoot), /unknown skill missing-skill/u);
});

test('evaluation case IDs must be unique across the case directory', (context) => {
  const root = sandbox(context);
  updateYaml(root, 'evals/cases/checkout-discount.yaml', (evaluation) => { evaluation.id = 'systematic-debugging'; });
  assert.throws(() => loadEvaluationCases(root), /Duplicate evaluation case ID: systematic-debugging/u);
});

test('skill trigger cases require at least three prompts', (context) => {
  const root = sandbox(context);
  updateYaml(root, 'evals/cases/systematic-debugging.yaml', (evaluation) => { evaluation.triggers = []; });
  assert.throws(() => loadEvaluationCases(root), /must NOT have fewer than 3 items/u);
});

test('runtime commands require an outcome fixture', (context) => {
  const root = sandbox(context);
  updateYaml(root, 'evals/cases/retrospective.yaml', (evaluation) => {
    evaluation.runtime = { command: ['python3', 'serve.py'] };
  });
  assert.throws(() => loadEvaluationCases(root), /fixture/u);
});

test('an evaluation case cannot target both a skill and a rule', (context) => {
  const root = sandbox(context);
  updateYaml(root, 'evals/cases/checkout-discount.yaml', (evaluation) => {
    evaluation.rule = 'verification-evidence';
  });
  assert.throws(() => loadEvaluationCases(root), /must match exactly one schema in oneOf/u);
});

test('stale catalog checks fail without rewriting output', (context) => {
  const root = sandbox(context);
  writeFileSync(join(root, 'catalog/index.json'), '{}\n');
  assert.throws(() => checkCatalog(root), /index.json is stale/u);
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
  assert.ok(preview.startsWith('<!-- agentic-rules:begin collection=debugging source=local-unreleased -->'));
  assert.ok(preview.includes('## Verification evidence'));
  assert.ok(!preview.includes('Systematic debugging'));
  assert.deepEqual(snapshot(root), before);
});

test('rule previews reject unknown collections and multiline source labels', (context) => {
  const root = sandbox(context);
  assert.throws(() => renderRuleBlock('missing', 'main', root), /Unknown collection/u);
  assert.throws(() => renderRuleBlock('debugging', 'main\nextra', root), /revision label/u);
});

test('entry metadata rejects unknown fields', (context) => {
  const root = sandbox(context);
  updateYaml(root, metadataPath, (entry) => { entry.name = 'different-skill'; });
  assert.throws(() => loadCatalog(root), /additional properties/u);
});

test('hidden grader directories may not point outside the repository', (context) => {
  const root = sandbox(context);
  updateYaml(root, 'evals/cases/checkout-discount.yaml', (evaluation) => {
    evaluation.grader = { files: '../', command: ['true'] };
  });
  assert.throws(() => loadCatalog(root), /escapes its content root/u);
});

test('an outcome request without a fixture is rejected', (context) => {
  const root = sandbox(context);
  updateYaml(root, 'evals/cases/retrospective.yaml', (evaluation) => { evaluation.request = 'Do the task.'; });
  assert.throws(() => loadCatalog(root), /fixture/u);
});

test('an outcome case without an explicit grader is rejected', (context) => {
  const root = sandbox(context);
  updateYaml(root, 'evals/cases/systematic-debugging.yaml', (evaluation) => { delete evaluation.grader; });
  assert.throws(() => loadCatalog(root), /grader/u);
});

test('fixture links may not point outside the repository', (context) => {
  const root = sandbox(context);
  mkdirSync(join(root, 'unrelated'));
  updateYaml(root, 'evals/cases/systematic-debugging.yaml', (evaluation) => { evaluation.fixture = '../'; });
  assert.throws(() => loadCatalog(root), /escapes its content root/u);
});

test('plugin manifests for both hosts agree on name and version', () => {
  const read = (path: string) => JSON.parse(readFileSync(join(repositoryRoot, path), 'utf8'));
  const claude = read('.claude-plugin/plugin.json');
  const codex = read('plugin.json');
  const version = read('package.json').version;
  assert.equal(claude.name, 'agentic-rules');
  assert.equal(codex.name, claude.name);
  assert.equal(claude.version, version);
  assert.equal(codex.version, version);
  const claudeMarket = read('.claude-plugin/marketplace.json').plugins;
  const codexMarket = read('.agents/plugins/marketplace.json').plugins;
  assert.deepEqual(claudeMarket.map((entry: { name: string; source: string }) => [entry.name, entry.source]), [[claude.name, './']]);
  assert.deepEqual(codexMarket.map((entry: { name: string; source: { path: string } }) => [entry.name, entry.source.path]), [[codex.name, './']]);
});

test('markdown lint skips exactly the vendored entries, which must stay byte-identical to upstream', () => {
  const config = readFileSync(join(repositoryRoot, '.markdownlint-cli2.jsonc'), 'utf8');
  const ignores = (JSON.parse(config.replace(/^\s*\/\/.*$/gmu, '')).ignores as string[]).filter((glob) => glob.startsWith('entries/'));
  const vendored = loadCatalog().entries.filter((entry) => entry.source.kind === 'vendored').map((entry) => `${entry.path}/**`);
  assert.deepEqual(ignores.sort(), vendored.sort());
});
