import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { parseArgs } from 'node:util';
import { buildSkillsEval } from './evals.ts';

const usage = `Usage: bun run eval:skills -- --skills DIR --cases FILE [--out DIR]

Wraps a skills directory (for example a project's .claude/skills) in a temporary plugin with trigger cases
generated from FILE, then prints the claude plugin eval command. The skills directory is not modified.`;

try {
  const { values } = parseArgs({
    options: { skills: { type: 'string' }, cases: { type: 'string' }, out: { type: 'string' }, help: { type: 'boolean', default: false } },
  });
  if (values.help) {
    console.log(usage);
    process.exit(0);
  }
  if (!values.skills || !values.cases) throw new Error(usage);
  const output = resolve(values.out ?? mkdtempSync(join(tmpdir(), 'agentic-catalog-skills-eval-')));
  const { cases: count, warnings } = buildSkillsEval(values.skills, values.cases, output);
  for (const warning of warnings) console.warn(`warning: ${warning}`);
  console.log(`Built ${count} trigger case(s) in ${output}. Run them (uses model credits):\n`);
  console.log(`  claude plugin eval ${output} --eval-dir eval-build --ablation none --no-publish --trust-plugin --json ${output}/result.json`);
  console.log('\nAdd --model to match the model you work with, --runs N for repetitions, and --max-cost-usd for a ceiling.');
} catch (error) {
  console.error((error as Error).message);
  process.exitCode = 1;
}
