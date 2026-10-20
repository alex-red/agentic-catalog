import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join } from 'node:path';
import { buildWiki } from './wiki-build.ts';
import { repositoryRoot, safePath } from './library.ts';

const portArg = process.argv.indexOf('--port');
const port = portArg < 0 ? 4173 : Number(process.argv[portArg + 1]);
if (!Number.isInteger(port) || port < 0 || port > 65535) throw new Error('Expected a valid --port number.');
buildWiki();
const root = join(repositoryRoot, 'dist/wiki');
const mime: Record<string, string> = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8', '.woff2': 'font/woff2', '.svg': 'image/svg+xml',
};
const server = createServer(async (request, response) => {
  try {
    if (!['GET', 'HEAD'].includes(request.method ?? '')) {
      response.writeHead(405, { Allow: 'GET, HEAD' }).end();
      return;
    }
    const url = new URL(request.url ?? '/', 'http://localhost');
    const path = decodeURIComponent(url.pathname);
    const file = safePath(root, join(root, path === '/' ? 'index.html' : path));
    if (!(await stat(file)).isFile()) throw new Error('Not a file');
    const content = await readFile(file);
    response.writeHead(200, {
      'Content-Type': mime[extname(file)] ?? 'text/plain; charset=utf-8',
      'X-Content-Type-Options': 'nosniff',
      'Cache-Control': 'no-store',
      'Content-Length': content.length,
      'Content-Security-Policy': "default-src 'self'; script-src 'self'; style-src 'self'; font-src 'self'; img-src 'self' data:; connect-src 'self'; base-uri 'self'; frame-ancestors 'none'",
    });
    response.end(request.method === 'HEAD' ? undefined : content);
  } catch {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Not found');
  }
});
server.on('error', (error) => { console.error(error.message); process.exitCode = 1; });
server.listen(port, '127.0.0.1', () => {
  const address = server.address();
  console.log(`Local: http://127.0.0.1:${typeof address === 'object' && address ? address.port : port}/`);
});
for (const signal of ['SIGINT', 'SIGTERM'] as const) process.on(signal, () => server.close());
