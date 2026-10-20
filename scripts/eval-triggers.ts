import { writeTriggerSuite } from './evals.ts';

try {
  if (process.argv.length !== 2) throw new Error('Usage: bun run eval:triggers');
  const directory = writeTriggerSuite();
  console.log(`Generated trigger cases in ${directory}/. Run them with Claude Code (this uses model credits):\n`);
  console.log(`  claude plugin eval . --eval-dir ${directory} --ablation none --no-publish --json ${directory}/result.json`);
} catch (error) {
  console.error((error as Error).message);
  process.exitCode = 1;
}
