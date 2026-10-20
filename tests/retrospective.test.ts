import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { cpSync, mkdtempSync, readFileSync, rmSync, writeFileSync, mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import { repositoryRoot } from '../scripts/library.ts';

function workspace(context: import('node:test').TestContext): string {
  const root = mkdtempSync(join(tmpdir(), 'retrospective-outcome-'));
  context.after(() => rmSync(root, { recursive: true, force: true }));
  cpSync(join(repositoryRoot, 'evals/fixtures/retrospective'), root, { recursive: true });
  cpSync(join(repositoryRoot, 'evals/graders/retrospective'), root, { recursive: true });
  return root;
}

function grade(root: string): { status: number | null; output: string } {
  const result = spawnSync('python3', ['-B', '-m', 'unittest'], { cwd: root, encoding: 'utf8' });
  return { status: result.status, output: `${result.stdout ?? ''}${result.stderr ?? ''}` };
}

const pointer = '- After user-visible changes, check them in the Browser pane when the app is already running; follow `.agents/skills/browser-verify/SKILL.md`.';

test('the concise AGENTS pointer passes the retrospective outcome grader', (context) => {
  const root = workspace(context);
  const agents = join(root, 'AGENTS.md');
  writeFileSync(agents, `${readFileSync(agents, 'utf8')}\n${pointer}\n`);
  const result = grade(root);
  assert.equal(result.status, 0, result.output);
});

test('no change or a procedure dump in a new skill does not pass', (context) => {
  const root = workspace(context);
  const unchanged = grade(root);
  assert.notEqual(unchanged.status, 0);
  assert.match(unchanged.output, /always-loaded instruction pointing/u);

  const newSkill = join(root, '.agents/skills/retrospective-app-check');
  mkdirSync(newSkill, { recursive: true });
  writeFileSync(join(newSkill, 'SKILL.md'), `# Check the app\n\n${pointer}\nUse the browser pane and inspect the changed screen.\n`);
  const dumped = grade(root);
  assert.notEqual(dumped.status, 0);
  assert.match(dumped.output, /always-loaded instruction pointing/u);
});

test('an app-check pointer that weakens the server authorization rule fails', (context) => {
  const root = workspace(context);
  const agents = join(root, 'AGENTS.md');
  const text = readFileSync(agents, 'utf8').replace(
    "- Do not start the dev server or a build without the user's permission.",
    '- Start the dev server whenever a browser check is needed.',
  );
  writeFileSync(agents, `${text}\n${pointer}\n`);
  const result = grade(root);
  assert.notEqual(result.status, 0);
  assert.match(result.output, /preserve existing project convention/u);
});
