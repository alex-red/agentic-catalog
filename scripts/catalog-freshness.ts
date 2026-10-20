import { spawnSync } from 'node:child_process';
import { checkFreshness, githubLatestCommit, needsAttention, renderFreshness } from './freshness.ts';
import { loadCatalog } from './library.ts';

// Network check against GitHub; not part of `bun run check`. Uses GITHUB_TOKEN, else the gh CLI token, else anonymous.
try {
  const strict = process.argv.slice(2).includes('--strict');
  const token = process.env.GITHUB_TOKEN ?? (spawnSync('gh', ['auth', 'token'], { encoding: 'utf8' }).stdout?.trim() || undefined);
  const rows = await checkFreshness(loadCatalog(), githubLatestCommit(token));
  console.log(renderFreshness(rows));
  if (rows.some(needsAttention)) {
    console.log('\nRe-read changed upstream content before re-vendoring or updating a revision; then re-rate and set rating.reviewed.');
    if (strict) process.exitCode = 1;
  }
} catch (error) {
  console.error((error as Error).message);
  process.exitCode = 1;
}
