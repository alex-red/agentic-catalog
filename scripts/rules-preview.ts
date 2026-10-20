import { renderRuleBlock } from './library.ts';

try {
  const args = process.argv.slice(2);
  if (args.length !== 2) throw new Error('Usage: bun run rules:preview -- COLLECTION SOURCE_REVISION');
  process.stdout.write(renderRuleBlock(args[0], args[1]));
} catch (error) {
  console.error((error as Error).message);
  process.exitCode = 1;
}
