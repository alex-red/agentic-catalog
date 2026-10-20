import assert from 'node:assert/strict';
import { spawn, spawnSync } from 'node:child_process';
import { cpSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createInterface } from 'node:readline';
import { test } from 'node:test';
import type { TestContext } from 'node:test';
import { repositoryRoot } from '../scripts/library.ts';

const fixture = join(repositoryRoot, 'evals/fixtures/running-app');
const grader = join(repositoryRoot, 'evals/graders/running-app/grade.py');

function temporaryFixture(context: TestContext): { root: string; evidenceDir: string; evidence: string } {
  const temp = mkdtempSync(join(tmpdir(), 'agentic-catalog-running-app-'));
  context.after(() => rmSync(temp, { recursive: true, force: true }));
  const root = join(temp, 'worktree');
  const evidenceDir = join(temp, 'evidence');
  cpSync(fixture, root, { recursive: true });
  return { root, evidenceDir, evidence: join(evidenceDir, 'events.jsonl') };
}

async function startServer(root: string, evidenceDir: string, context: TestContext): Promise<Record<string, unknown>> {
  const child = spawn('python3', ['-B', join(fixture, 'serve.py'), '--root', root, '--port', '0', '--evidence-dir', evidenceDir], {
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  context.after(() => child.kill());
  let stderr = '';
  child.stderr.setEncoding('utf8').on('data', (chunk: string) => { stderr += chunk; });
  const lines = createInterface({ input: child.stdout });
  const ready = await new Promise<Record<string, unknown>>((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error(`server readiness timed out; stderr: ${stderr}`)), 5000);
    child.once('error', (error) => {
      clearTimeout(timeout);
      reject(error);
    });
    child.once('exit', (code) => {
      clearTimeout(timeout);
      reject(new Error(`fixture server exited (${code}); stderr: ${stderr}`));
    });
    lines.once('line', (line) => {
      clearTimeout(timeout);
      try {
        resolve(JSON.parse(line) as Record<string, unknown>);
      } catch (error) {
        reject(new Error(`invalid readiness JSON: ${String(error)}; line: ${line}`));
      }
    });
  });
  lines.close();
  return ready;
}

function runGrader(root: string, evidence: string): { status: number; result: Record<string, unknown> } {
  const process = spawnSync('python3', ['-B', grader, '--root', root, '--evidence', evidence], { encoding: 'utf8' });
  assert.ok(process.stdout, process.stderr);
  return { status: process.status ?? -1, result: JSON.parse(process.stdout) as Record<string, unknown> };
}

test('the running-app grader separates source edits from a final-revision browser runtime signal', async (context) => {
  const { root, evidenceDir, evidence } = temporaryFixture(context);
  const ready = await startServer(root, evidenceDir, context);
  const url = String(ready.url);

  const health = await fetch(new URL('/__eval/health', url));
  assert.deepEqual(await health.json(), { ready: true });
  const page = await fetch(url);
  assert.match(await page.text(), /Task board/u);
  const initialMeta = await (await fetch(new URL('/__eval/meta', url))).json() as { revision: string; token: string };

  const unchanged = runGrader(root, evidence);
  assert.equal(unchanged.status, 1);
  assert.equal(unchanged.result.classification, 'no_change');
  assert.equal((unchanged.result.functionality as Record<string, unknown>).passed, false);
  assert.equal((unchanged.result.browser_check as Record<string, unknown>).passed, false);

  const stylesheet = join(root, 'styles.css');
  writeFileSync(stylesheet, readFileSync(stylesheet, 'utf8').replace(/(body\s*\{[^}]*background:\s*)#f4f5f7/u, '$1#e9f5ff'));
  const editedMeta = await (await fetch(new URL('/__eval/meta', url))).json() as { revision: string; token: string };
  assert.notEqual(editedMeta.revision, initialMeta.revision);

  // A static fetch does not create the runtime signal; the POST below is a synthetic client event.
  const sourceOnly = runGrader(root, evidence);
  assert.equal(sourceOnly.status, 1);
  assert.equal(sourceOnly.result.classification, 'source_only');
  assert.equal((sourceOnly.result.functionality as Record<string, unknown>).passed, true);
  assert.equal((sourceOnly.result.browser_check as Record<string, unknown>).passed, false);

  const browserEvent = await fetch(new URL('/__eval/event', url), {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      action: 'page_ready', background: 'rgb(233, 245, 255)', documentVisible: true,
      revision: editedMeta.revision, token: editedMeta.token,
    }),
  });
  assert.equal(browserEvent.status, 201);
  const browserRuntimeSignal = runGrader(root, evidence);
  assert.equal(browserRuntimeSignal.status, 0);
  assert.equal(browserRuntimeSignal.result.classification, 'browser_runtime_signal');
  assert.equal((browserRuntimeSignal.result.functionality as Record<string, unknown>).passed, true);
  assert.equal((browserRuntimeSignal.result.browser_check as Record<string, unknown>).passed, true);
});

test('the running-app server refuses evidence from a stale source revision', async (context) => {
  const { root, evidenceDir, evidence } = temporaryFixture(context);
  const ready = await startServer(root, evidenceDir, context);
  const url = String(ready.url);
  const meta = await (await fetch(new URL('/__eval/meta', url))).json() as { revision: string; token: string };
  const stylesheet = join(root, 'styles.css');
  writeFileSync(stylesheet, readFileSync(stylesheet, 'utf8').replace(/(body\s*\{[^}]*background:\s*)#f4f5f7/u, '$1#e9f5ff'));
  const response = await fetch(new URL('/__eval/event', url), {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      action: 'page_ready', background: 'rgb(233, 245, 255)', documentVisible: true,
      revision: meta.revision, token: meta.token,
    }),
  });
  assert.equal(response.status, 409);
  assert.equal(runGrader(root, evidence).result.classification, 'source_only');
});
