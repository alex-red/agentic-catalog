import { spawn } from 'node:child_process';
import { closeSync, existsSync, mkdtempSync, openSync, readFileSync, realpathSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve, sep } from 'node:path';

export interface Runtime {
  url: string;
  graderEnv: NodeJS.ProcessEnv;
  evidence(): string;
  stop(): void;
}

// The evaluator starts the fixture before the agent. Readiness is written to a file so
// the existing synchronous agent executor cannot block the server's stdout reader.
export function startRuntime(command: string[], work: string): Runtime {
  const directory = realpathSync(mkdtempSync(join(tmpdir(), 'agentic-rules-runtime-')));
  const readyFile = join(directory, 'ready.jsonl');
  const errorFile = join(directory, 'stderr.txt');
  const stdout = openSync(readyFile, 'w');
  const stderr = openSync(errorFile, 'w');
  let child;
  try {
    const expanded = command.map((part) => part.replaceAll('${EVIDENCE_DIR}', directory));
    child = spawn(expanded[0], expanded.slice(1), { cwd: work, stdio: ['ignore', stdout, stderr] });
    child.on('error', () => {}); // Startup failures are reported with readiness diagnostics below.
  } finally {
    closeSync(stdout);
    closeSync(stderr);
  }
  const stop = () => {
    child?.kill('SIGTERM');
    rmSync(directory, { recursive: true, force: true });
  };
  try {
    const deadline = Date.now() + 4_000;
    let line = '';
    const sleeper = new Int32Array(new SharedArrayBuffer(4));
    while (Date.now() < deadline) {
      const contents = readFileSync(readyFile, 'utf8');
      if (contents.includes('\n')) {
        line = contents.split('\n')[0];
        break;
      }
      if (!child.pid) break;
      if (readFileSync(errorFile, 'utf8').includes('Traceback (most recent call last)')) break;
      Atomics.wait(sleeper, 0, 0, 25);
    }
    if (!line) throw new Error(`Fixture runtime did not become ready: ${readFileSync(errorFile, 'utf8')}`);
    const ready = JSON.parse(line) as { url: string; evidenceFile: string };
    const url = new URL(ready.url);
    if (url.protocol !== 'http:' || !['127.0.0.1', 'localhost', '[::1]'].includes(url.hostname)) {
      throw new Error('Fixture runtime must use a loopback HTTP URL.');
    }
    const evidenceFile = resolve(ready.evidenceFile);
    if (!evidenceFile.startsWith(`${directory}${sep}`)) throw new Error('Runtime evidence must stay in the evaluator directory.');
    return {
      url: ready.url,
      graderEnv: { ...process.env, RUNNING_APP_URL: ready.url, RUNNING_APP_EVIDENCE: evidenceFile },
      evidence: () => existsSync(evidenceFile) ? readFileSync(evidenceFile, 'utf8') : '',
      stop,
    };
  } catch (error) {
    stop();
    throw error;
  }
}
