import assert from 'node:assert/strict';
import { cpSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, relative } from 'node:path';
import { test } from 'node:test';
import type { TestContext } from 'node:test';
import { stringify } from 'yaml';
import {
  checkCatalog, loadCatalog, loadEvaluationCases, readYaml, renderCatalog, renderRuleBlock,
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

const skillPath = 'skills/systematic-debugging';
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
  const installed = join(root, 'isolated/systematic-debugging');
  cpSync(join(root, skillPath), installed, { recursive: true });
  rmSync(join(root, 'skills'), { recursive: true });
  rmSync(join(root, 'evals'), { recursive: true });
  validateSkillBundle(installed);
});

test('profiles cannot select an unpublished skill', (context) => {
  const root = sandbox(context);
  updateYaml(root, 'profiles/debugging.yaml', (profile) => { profile.skills = ['missing-skill']; });
  assert.throws(() => loadCatalog(root), /unknown skill missing-skill/u);
});

test('profiles cannot silently include a missing rule', (context) => {
  const root = sandbox(context);
  updateYaml(root, 'profiles/debugging.yaml', (profile) => { profile.rules = ['missing']; });
  assert.throws(() => loadCatalog(root), /unknown rule missing/u);
});

test('duplicate profile selections are rejected', (context) => {
  const root = sandbox(context);
  updateYaml(root, 'profiles/debugging.yaml', (profile) => {
    profile.skills = ['systematic-debugging', 'systematic-debugging'];
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
  updateYaml(root, 'evals/cases/systematic-debugging.yaml', (evaluation) => { evaluation.skill = 'retrospective'; });
  assert.throws(() => loadCatalog(root), /wrong skill/u);
});

test('rule outcome cases are discovered without skill trigger prompts', (context) => {
  const root = sandbox(context);
  const path = 'evals/cases/checkout-discount.yaml';
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
  updateYaml(root, companionPath, (component) => { component.name = 'different-skill'; });
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
