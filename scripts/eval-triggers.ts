import { writeTriggerSuite } from './evals.ts';

try {
  if (process.argv.length !== 2) throw new Error('Usage: bun run eval:triggers');
  const directory = writeTriggerSuite();
  console.log(`Generated a plugin of catalog skill entries and trigger cases in ${directory}/. Run them with Claude Code (this uses model credits):\n`);
  console.log(`  claude plugin eval ${directory} --eval-dir cases --ablation none --no-publish --trust-plugin --json ${directory}/result.json`);
} catch (error) {
  console.error((error as Error).message);
  process.exitCode = 1;
}
