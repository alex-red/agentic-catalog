import { loadCatalog } from './library.ts';

try {
  if (process.argv.length !== 2) throw new Error('Usage: bun run validate');
  const catalog = loadCatalog();
  console.log(`Validated ${catalog.skills.length} skill(s), ${catalog.rules.length} rule(s), and ${catalog.profiles.length} profile(s).`);
  console.log('Structural validation only; no agent behavior was evaluated.');
} catch (error) {
  console.error((error as Error).message);
  process.exitCode = 1;
}
