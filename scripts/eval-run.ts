import { mkdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { parseArgs } from 'node:util';
import type { Condition, Host, RunOptions } from './evals.ts';
import { previewEvaluation, runEvaluation, summarize } from './evals.ts';
import { repositoryRoot } from './library.ts';

const usage = `Usage: bun run eval:run -- --case ID --host claude|codex --model MODEL [options]

Runs real agent sessions on fresh fixture copies. Each run costs model usage.

  --runs N              Repetitions per condition (default 1)
  --condition C         baseline, treatment, or both (default both)
  --collection ID       Collection installed for the treatment (default debugging)
  --component ID        Isolate skill/NAME or rule/ID instead of a collection
  --dry-run             Print the comparison and prerequisites; start nothing
  --max-cost-usd USD    Native per-session dollar ceiling (Claude only)
  --browser-tool TOOL   Existing browser tool name (repeatable); adds Claude allowance
  --isolation MODE      environment (default) keeps your host setup in both arms;
                        bare (Claude only) skips user customizations; needs ANTHROPIC_API_KEY
  --timeout SECONDS     Wall-clock limit per run (default 900)
  --keep                Keep workspaces for inspection
  --out DIR             Result directory (default evals/results/runs)`;

try {
  const { values } = parseArgs({
    args: process.argv[2] === '--' ? process.argv.slice(3) : process.argv.slice(2),
    options: {
      case: { type: 'string' }, host: { type: 'string' }, model: { type: 'string' },
      runs: { type: 'string', default: '1' }, condition: { type: 'string', default: 'both' },
      collection: { type: 'string', default: 'debugging' }, isolation: { type: 'string', default: 'environment' },
      component: { type: 'string' }, 'dry-run': { type: 'boolean', default: false },
      'max-cost-usd': { type: 'string' }, 'browser-tool': { type: 'string', multiple: true },
      timeout: { type: 'string', default: '900' }, keep: { type: 'boolean', default: false },
      out: { type: 'string', default: 'evals/results/runs' }, help: { type: 'boolean', default: false },
    },
  });
  if (values.help) {
    console.log(usage);
    process.exit(0);
  }
  if (!values.case || !values.model || !['claude', 'codex'].includes(values.host ?? '')) throw new Error(usage);
  if (!['baseline', 'treatment', 'both'].includes(values.condition!)) throw new Error('--condition must be baseline, treatment, or both');
  if (!['environment', 'bare'].includes(values.isolation!)) throw new Error('--isolation must be environment or bare');
  const runs = Number(values.runs);
  const timeoutSeconds = Number(values.timeout);
  if (!Number.isInteger(runs) || runs < 1 || !Number.isFinite(timeoutSeconds) || !(timeoutSeconds > 0)) throw new Error('--runs and --timeout must be finite positive numbers');
  const maxCostUsd = values['max-cost-usd'] === undefined ? undefined : Number(values['max-cost-usd']);
  if (maxCostUsd !== undefined && (!Number.isFinite(maxCostUsd) || maxCostUsd <= 0)) throw new Error('--max-cost-usd must be finite and positive');

  const options: RunOptions = {
    caseId: values.case, host: values.host as Host, model: values.model, collection: values.collection!, runs, timeoutSeconds,
    isolation: values.isolation as RunOptions['isolation'], keep: values.keep,
    component: values.component, maxCostUsd, browserTools: values['browser-tool'],
    conditions: values.condition === 'both' ? ['baseline', 'treatment'] : [values.condition as Condition],
  };
  // Always validate and present the exact plan before any agent or runtime starts.
  const preview = previewEvaluation(options);
  if (values['dry-run']) {
    console.log(JSON.stringify(preview, null, 2));
    process.exit(0);
  }
  const output = resolve(repositoryRoot, values.out!);
  mkdirSync(output, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/gu, '-');
  const records = runEvaluation(options, undefined, (record) => {
    const file = join(output, `${stamp}-${record.case}-${record.host}-${record.condition}-r${record.repetition}.json`);
    writeFileSync(file, `${JSON.stringify(record, null, 2)}\n`);
    console.log(`${record.condition} r${record.repetition}: ${record.outcome} (${Math.round(record.durationMs / 1000)}s) -> ${file}`);
  });
  console.log(`\n${summarize(records)}`);
  console.log('\nReview the saved transcript, diff, and final message against the acceptance criteria before drawing conclusions.');
} catch (error) {
  console.error((error as Error).message);
  process.exitCode = 1;
}
