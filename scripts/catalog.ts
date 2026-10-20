import { checkCatalog, writeCatalog } from './library.ts';

try {
  const args = process.argv.slice(2);
  if (args.length !== 1 || !['--write', '--check'].includes(args[0])) {
    throw new Error('Usage: node scripts/catalog.ts --write | --check');
  }
  if (args[0] === '--write') {
    writeCatalog();
    console.log('Generated catalog/index.json.');
  } else {
    checkCatalog();
    console.log('Catalog matches its source content.');
  }
} catch (error) {
  console.error((error as Error).message);
  process.exitCode = 1;
}
