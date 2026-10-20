import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import type { TestContext } from 'node:test';
import type { Executor, OutcomeCase, RunOptions } from '../scripts/evals.ts';
import { buildSkillsEval, loadCases, writeTriggerSuite, parseAgentOutput, previewEvaluation, renderTriggerSuite, runEvaluation, runOnce, schedule, summarize } from '../scripts/evals.ts';
import { stringify } from 'yaml';
import { frontmatter, readYaml, repositoryRoot } from '../scripts/library.ts';

function sandbox(context: TestContext): string {
  const root = mkdtempSync(join(tmpdir(), 'agentic-rules-evals-'));
  context.after(() => rmSync(root, { recursive: true, force: true }));
  for (const name of ['entries', 'skills', 'collections', 'evals', 'catalog', 'package.json', 'llms.txt']) {
    cpSync(join(repositoryRoot, name), join(root, name), { recursive: true });
  }
  return root;
}

const options = (root: string, overrides: Partial<RunOptions> = {}): RunOptions => ({
  caseId: 'checkout-discount', host: 'claude', model: 'test-model', collection: 'debugging', runs: 1,
  timeoutSeconds: 60, isolation: 'environment', conditions: ['baseline', 'treatment'], root, ...overrides,
});

const claudeOutput = JSON.stringify({ result: 'done', total_cost_usd: 0.5, usage: { input_tokens: 10, output_tokens: 5 }, num_turns: 3 });

function editing(edit: (work: string) => void, seen: string[][] = []): Executor {
  return (command, cwd) => {
    seen.push(command);
    edit(cwd);
    return { exitCode: 0, timedOut: false, stdout: claudeOutput, stderr: '' };
  };
}

function replaceIn(file: string, from: string, to: string): void {
  const source = readFileSync(file, 'utf8');
  assert.ok(source.includes(from), `fixture no longer contains the expected text in ${file}`);
  writeFileSync(file, source.replace(from, to));
}

const rootCauseFix = (work: string) => replaceIn(join(work, 'shop/discounts.py'),
  '    for line in lines:\n        line["unit_price"] = line["unit_price"] * keep\n    return lines',
  '    return [{**line, "unit_price": line["unit_price"] * keep} for line in lines]');

const symptomFix = (work: string) => replaceIn(join(work, 'shop/checkout.py'),
  '    return format_money(order_total(cart.lines, code))',
  '    import copy\n    return format_money(order_total(copy.deepcopy(cart.lines), code))');

const paginationFix = (work: string) => replaceIn(join(work, 'pagination.py'),
  '    start = page * page_size',
  '    start = (page - 1) * page_size');

test('trigger prompts become one plugin-eval case per prompt with a matching grader', () => {
  const files = renderTriggerSuite(loadCases());
  const cases = loadCases().flatMap((evaluation) => (evaluation.triggers ?? []).map((trigger, index) => ({ evaluation, trigger, index })));
  assert.equal([...files.keys()].filter((path) => path.endsWith('/prompt.md')).length, cases.length);
  for (const { evaluation, trigger, index } of cases) {
    const name = `${evaluation.id}-${trigger.expectation}-${index + 1}`;
    const prompt = frontmatter(files.get(`${name}/prompt.md`)!, name);
    assert.equal(prompt.body, trigger.prompt);
    const graders = [...files.keys()].filter((path) => path.startsWith(`${name}/graders/`));
    assert.equal(graders.length, 1);
    const header = /^---\n([\s\S]*?)---\n/u.exec(files.get(graders[0])!)![1];
    const grader = readYaml(header, graders[0]) as Record<string, unknown>;
    if (trigger.expectation === 'clarify') assert.equal(grader.type, 'llm');
    else assert.equal(grader.max, trigger.expectation === 'ignore' ? 0 : undefined);
  }
});

test('repetitions alternate condition order', () => {
  assert.deepEqual(schedule(['baseline', 'treatment'], 3), [
    ['baseline', 1], ['treatment', 1], ['treatment', 2], ['baseline', 2], ['baseline', 3], ['treatment', 3],
  ]);
});

test('hidden graders pass a root-cause fix and fail a symptom fix or no change', (context) => {
  const root = sandbox(context);
  const outcome = (edit: (work: string) => void) =>
    runEvaluation(options(root, { conditions: ['baseline'] }), editing(edit))[0];
  const fixed = outcome(rootCauseFix);
  assert.equal(fixed.outcome, 'passed');
  assert.deepEqual(fixed.changedFiles, ['shop/discounts.py']);
  assert.equal(fixed.agent.usage.costUsd, 0.5);
  assert.equal(outcome(symptomFix).outcome, 'failed');
  const untouched = outcome(() => {});
  assert.equal(untouched.outcome, 'failed');
  assert.deepEqual(untouched.changedFiles, []);
});

test('pagination visible tests fail unchanged and pass after the one-based offset is fixed', (context) => {
  const root = sandbox(context);
  const outcome = (edit: (work: string) => void) => runEvaluation(options(root, {
    caseId: 'systematic-debugging', conditions: ['baseline'],
  }), editing(edit))[0];
  const unchanged = outcome(() => {});
  assert.equal(unchanged.outcome, 'failed');
  assert.equal(unchanged.grader?.passed, false);
  assert.match(unchanged.grader?.outputTail ?? '', /FAILED/u);
  const fixed = outcome(paginationFix);
  assert.equal(fixed.outcome, 'passed');
  assert.equal(fixed.grader?.passed, true);
  assert.deepEqual(fixed.changedFiles, ['pagination.py']);
});

test('outcome cases without graders fail closed in runEvaluation and direct runOnce', (context) => {
  const root = sandbox(context);
  const evaluation = loadCases(root).find((entry) => entry.id === 'systematic-debugging')!;
  const caseFile = join(root, 'evals/cases/systematic-debugging.yaml');
  const source = readFileSync(caseFile, 'utf8');
  writeFileSync(caseFile, source.replace(/grader:\n  command: \[python3, -B, -m, unittest\]\n/u, ''));
  assert.throws(() => runEvaluation(options(root, { caseId: 'systematic-debugging' }), editing(() => {})), /grader/u);

  let executed = false;
  const missingGrader = { ...evaluation, grader: undefined } as OutcomeCase;
  assert.throws(() => runOnce(options(root, { caseId: 'systematic-debugging' }), missingGrader,
    'baseline', 1, () => {
      executed = true;
      return { exitCode: 0, timedOut: false, stdout: '', stderr: '' };
    }), /grader/u);
  assert.equal(executed, false);
});

test('the Claude treatment loads the plugin and rule files; the baseline gets neither', (context) => {
  const root = sandbox(context);
  const seen: string[][] = [];
  const installed: boolean[] = [];
  const records = runEvaluation(options(root), editing((work) => {
    installed.push(existsSync(join(work, '.claude/rules/verification-evidence.md')));
  }, seen));
  assert.deepEqual(records.map((record) => record.condition), ['baseline', 'treatment']);
  assert.ok(!seen[0].includes('--plugin-dir'));
  const plugin = seen[1][seen[1].indexOf('--plugin-dir') + 1];
  assert.ok(plugin.endsWith('/.eval-plugin'));
  assert.deepEqual(installed, [false, true]);
  assert.deepEqual(records[1].changedFiles, [], 'installed treatment files are not counted as agent changes');
});

test('the Codex treatment installs project skills and a marked rule block', (context) => {
  const root = sandbox(context);
  const agentsFiles: string[] = [];
  runEvaluation(options(root, { host: 'codex', conditions: ['treatment'] }), (command, cwd) => {
    assert.equal(command[0], 'codex');
    assert.ok(existsSync(join(cwd, '.agents/skills/systematic-debugging/SKILL.md')));
    agentsFiles.push(readFileSync(join(cwd, 'AGENTS.md'), 'utf8'));
    return { exitCode: 0, timedOut: false, stdout: '{"type":"turn.completed","usage":{"input_tokens":7,"output_tokens":3}}\n', stderr: '' };
  });
  assert.match(agentsFiles[0], /<!-- agentic-rules:begin collection=debugging source=local-unreleased -->/u);
});

test('timeouts and agent failures are not reported as passes', (context) => {
  const root = sandbox(context);
  const result = (timedOut: boolean, exitCode: number | null) =>
    runEvaluation(options(root, { conditions: ['baseline'] }), (_, cwd) => {
      rootCauseFix(cwd);
      return { exitCode, timedOut, stdout: '', stderr: '' };
    })[0].outcome;
  assert.equal(result(true, null), 'timeout');
  assert.equal(result(false, 1), 'agent_error');
  const error = runEvaluation(options(root, { conditions: ['baseline'] }), (_, cwd) => {
    rootCauseFix(cwd);
    return { exitCode: 1, timedOut: false, stdout: '', stderr: 'agent failed' };
  })[0];
  assert.equal(error.grader?.passed, true);
  assert.equal(error.outcome, 'agent_error');
});

test('summaries mark unavailable measurements', (context) => {
  const root = sandbox(context);
  const records = runEvaluation(options(root, { host: 'codex', conditions: ['baseline'] }), (_, cwd) => {
    rootCauseFix(cwd);
    return { exitCode: 0, timedOut: false, stdout: '', stderr: '' };
  });
  assert.match(summarize(records), /baseline\s+passed 1\/1 {2}mean tokens n\/a {2}mean cost n\/a/u);
});

function projectSkills(context: TestContext): { skills: string; suite: string; out: string } {
  const root = mkdtempSync(join(tmpdir(), 'agentic-rules-project-'));
  context.after(() => rmSync(root, { recursive: true, force: true }));
  const skills = join(root, '.claude/skills');
  for (const [name, description] of [['render-debug', 'Diagnose seams: from a screenshot.'], ['browser-verify', '"Check changes in the open app."']]) {
    mkdirSync(join(skills, name), { recursive: true });
    writeFileSync(join(skills, name, 'SKILL.md'), `---\nname: ${name}\ndescription: ${description}\n---\n\n# ${name}\n`);
  }
  const suite = join(root, 'triggers.yaml');
  writeFileSync(suite, stringify({ schemaVersion: 1, skills: [
    { skill: 'render-debug', triggers: [{ expectation: 'activate', prompt: 'fix the wall seams' }, { expectation: 'ignore', prompt: 'add a shortcut' }] },
    { skill: 'browser-verify', triggers: [{ expectation: 'activate', prompt: 'check it in the browser tab' }] },
  ] }));
  return { skills, suite, out: join(root, 'eval') };
}

test('skills-directory trigger evals wrap the skills without modifying them', (context) => {
  const { skills, suite, out } = projectSkills(context);
  const before = readFileSync(join(skills, 'render-debug/SKILL.md'), 'utf8');
  const { cases, warnings } = buildSkillsEval(skills, suite, out);
  assert.equal(cases, 3);
  assert.equal(readFileSync(join(skills, 'render-debug/SKILL.md'), 'utf8'), before);
  assert.equal(readFileSync(join(out, 'skills/render-debug/SKILL.md'), 'utf8'), before);
  assert.equal(JSON.parse(readFileSync(join(out, '.claude-plugin/plugin.json'), 'utf8')).name, 'skills-under-test');
  assert.ok(existsSync(join(out, 'eval-build/render-debug-ignore-2/graders/skill-not-fired.md')));
  assert.equal(warnings.length, 1, 'an unquoted colon in a description is reported, not fatal');
  assert.match(warnings[0], /render-debug.*not valid/u);
  buildSkillsEval(skills, suite, out);
});

test('skills-directory evals refuse to replace a directory they did not create', (context) => {
  const { skills, suite, out } = projectSkills(context);
  mkdirSync(out);
  writeFileSync(join(out, 'keep.txt'), 'user data');
  assert.throws(() => buildSkillsEval(skills, suite, out), /Refusing to replace/u);
  assert.equal(readFileSync(join(out, 'keep.txt'), 'utf8'), 'user data');
});

test('trigger suites must name existing skills', (context) => {
  const { skills, suite, out } = projectSkills(context);
  writeFileSync(suite, stringify({ schemaVersion: 1, skills: [{ skill: 'missing', triggers: [{ expectation: 'activate', prompt: 'x' }] }] }));
  assert.throws(() => buildSkillsEval(skills, suite, out), /no skill missing/u);
});

test('trigger-only cases cannot be run as outcome comparisons', (context) => {
  const root = sandbox(context);
  assert.throws(() => runEvaluation(options(root, { caseId: 'retrospective' }), editing(() => {})), /trigger-only/u);
});

test('component selection isolates the same skill or rule in either host', (context) => {
  const root = sandbox(context);
  for (const host of ['claude', 'codex'] as const) {
    const records = runEvaluation(options(root, { host, component: 'rule/verification-evidence' }), (command, cwd) => {
      const isTreatment = existsSync(join(cwd, host === 'claude' ? '.claude/rules/verification-evidence.md' : 'AGENTS.md'));
      assert.equal(existsSync(join(cwd, '.eval-plugin')), false);
      assert.equal(existsSync(join(cwd, '.agents/skills/systematic-debugging')), false);
      if (host === 'claude') {
        assert.equal(command.includes('--plugin-dir'), false);
        assert.equal(existsSync(join(cwd, '.claude/rules/scope-and-authority.md')), false);
      }
      rootCauseFix(cwd);
      return { exitCode: 0, timedOut: false, stdout: host === 'claude' ? claudeOutput : '', stderr: String(isTreatment) };
    });
    assert.deepEqual(records[0].installed, { skills: [], rules: [] });
    assert.deepEqual(records[1].installed, { skills: [], rules: ['verification-evidence'] });
  }
  runEvaluation(options(root, { component: 'skill/systematic-debugging', conditions: ['treatment'] }), (command, cwd) => {
    const plugin = command[command.indexOf('--plugin-dir') + 1];
    assert.ok(existsSync(join(plugin, 'skills/systematic-debugging/SKILL.md')));
    assert.equal(existsSync(join(plugin, 'skills/retrospective')), false);
    assert.equal(existsSync(join(cwd, '.claude/rules')), false);
    return { exitCode: 0, timedOut: false, stdout: claudeOutput, stderr: '' };
  });
});

test('run artifacts retain source inputs, transcript, diff, and untracked file contents', (context) => {
  const root = sandbox(context);
  const [record] = runEvaluation(options(root, { component: 'skill/systematic-debugging', conditions: ['baseline'] }), editing((work) => {
    rootCauseFix(work);
    writeFileSync(join(work, 'notes.txt'), 'Reproduced before fixing.\n');
  }));
  assert.equal(record.schemaVersion, 2);
  assert.equal(record.agent.transcript, claudeOutput);
  assert.match(record.diff, /shop\/discounts.py/u);
  assert.equal(Buffer.from(record.untrackedFiles[0].contentBase64, 'base64').toString(), 'Reproduced before fixing.\n');
  assert.match(record.sourceInputs.digest, /^[0-9a-f]{64}$/u);
  assert.ok(record.sourceInputs.files.some((file) => file.path.endsWith('test_hidden_checkout.py')));
  assert.equal(record.sourceInputs.evaluation.id, 'checkout-discount');
});

test('Claude streaming results and model-reported failures are retained', (context) => {
  const stream = `{"type":"assistant","message":{"content":[]}}\n${JSON.stringify({ type: 'result', result: 'done', is_error: false, total_cost_usd: 0.5 })}\n`;
  assert.equal(parseAgentOutput('claude', stream).finalMessage, 'done');
  const root = sandbox(context);
  const [record] = runEvaluation(options(root, { conditions: ['baseline'] }), (_, cwd) => {
    rootCauseFix(cwd);
    return { exitCode: 0, timedOut: false, stdout: '{"type":"result","is_error":true,"result":"Budget exceeded"}\n', stderr: '' };
  });
  assert.equal(record.outcome, 'agent_error');
});

test('the dry-run CLI prints a running-app comparison without creating output', (context) => {
  const root = sandbox(context);
  const output = join(root, 'must-not-exist');
  const result = spawnSync(process.execPath, [join(repositoryRoot, 'scripts/eval-run.ts'), '--', '--case', 'running-app-verification',
    '--host', 'claude', '--model', 'not-a-real-model', '--component', 'rule/verification-evidence', '--runs', '3', '--dry-run', '--out', output], { encoding: 'utf8' });
  assert.equal(result.status, 0, result.stderr);
  const preview = JSON.parse(result.stdout);
  assert.equal(preview.dryRun, true);
  assert.equal(preview.sessions.length, 6);
  assert.equal(existsSync(output), false);
  assert.deepEqual(preview.selection, { skills: [], rules: ['verification-evidence'] });
});

test('budget ceilings reach Claude and cannot be silently ignored by Codex', (context) => {
  const root = sandbox(context);
  runEvaluation(options(root, { conditions: ['baseline'], maxCostUsd: 1.25 }), (command) => {
    assert.equal(command[command.indexOf('--max-budget-usd') + 1], '1.25');
    return { exitCode: 0, timedOut: false, stdout: claudeOutput, stderr: '' };
  });
  assert.throws(() => previewEvaluation(options(root, { host: 'codex', maxCostUsd: 1 })), /Claude-only/u);
});

test('runtime starts before the agent and source-only changes cannot pass', (context) => {
  const root = sandbox(context);
  let appUrl = '';
  const [record] = runEvaluation(options(root, { caseId: 'running-app-verification', component: 'rule/verification-evidence', conditions: ['treatment'] }), editing((work) => {
    const instructions = readFileSync(join(work, 'AGENTS.md'), 'utf8');
    appUrl = /http:\/\/127\.0\.0\.1:\d+\//u.exec(instructions)![0];
    assert.ok(instructions.includes('Do not start or restart a server'));
    const css = join(work, 'styles.css');
    writeFileSync(css, readFileSync(css, 'utf8').replace('#f4f5f7', '#e9f5ff'));
  }));
  assert.equal(record.outcome, 'failed');
  assert.match(record.grader!.outputTail, /source_only/u);
  assert.equal(record.runtime!.url, appUrl);
  assert.match(record.runtime!.evidence, /server_started/u);
  const probe = spawnSync('python3', ['-c', 'import sys, urllib.request; urllib.request.urlopen(sys.argv[1], timeout=1)', appUrl], { encoding: 'utf8' });
  assert.notEqual(probe.status, 0, 'the fixture server must stop after the run');
});

test('rule installation preserves the fixture instructions in Codex and bare Claude', (context) => {
  const root = sandbox(context);
  for (const host of ['claude', 'codex'] as const) {
    runEvaluation(options(root, { caseId: 'retrospective-outcome', component: 'rule/verification-evidence', host,
      isolation: host === 'claude' ? 'bare' : 'environment', conditions: ['treatment'] }), (command, cwd) => {
      const context = host === 'claude' ? command[command.indexOf('--append-system-prompt') + 1] : readFileSync(join(cwd, 'AGENTS.md'), 'utf8');
      assert.ok(context.includes("Do not start the dev server or a build without the user's permission."));
      assert.ok(context.includes('Check a change where its effect appears.'));
      return { exitCode: 0, timedOut: false, stdout: host === 'claude' ? claudeOutput : '', stderr: '' };
    });
  }
});

test('library trigger suites wrap catalog skill entries and the discovery skill', (context) => {
  const root = sandbox(context);
  const directory = writeTriggerSuite(root);
  const plugin = join(root, directory);
  assert.ok(existsSync(join(plugin, '.claude-plugin/plugin.json')));
  assert.ok(existsSync(join(plugin, 'skills/systematic-debugging/SKILL.md')));
  assert.ok(existsSync(join(plugin, 'skills/retrospective/SKILL.md')));
  assert.equal(existsSync(join(plugin, 'skills/systematic-debugging/entry.yaml')), false);
  assert.ok(existsSync(join(plugin, 'skills/agentic-catalog/SKILL.md')), 'the discovery skill is tested alongside the entries');
  assert.ok(existsSync(join(plugin, 'cases/agentic-catalog-ignore-6/graders/skill-not-fired.md')));
  assert.ok(existsSync(join(plugin, 'cases/systematic-debugging-activate-1/graders/skill-fired.md')));
});

test('clarify graders use the case criteria, defaulting to the missing-information check', () => {
  const files = renderTriggerSuite([{ id: 'example', skill: 'example', triggers: [
    { expectation: 'clarify', prompt: 'Install the thing.', criteria: 'PASS if it asks which entry.' },
    { expectation: 'clarify', prompt: 'It is broken.' },
  ] }]);
  assert.match(files.get('example-clarify-1/graders/asks-first.md')!, /PASS if it asks which entry\./u);
  assert.match(files.get('example-clarify-2/graders/asks-first.md')!, /asks for the missing project, error, or reproduction/u);
});

test('criteria are rejected on prompts that are not judged by a model', (context) => {
  const root = sandbox(context);
  const file = join(root, 'evals/cases/agentic-catalog.yaml');
  writeFileSync(file, readFileSync(file, 'utf8').replace(
    '    prompt: Write a new skill that formats our changelog entries.\n',
    '    prompt: Write a new skill that formats our changelog entries.\n    criteria: PASS always.\n'));
  assert.throws(() => loadCases(root), /boolean schema is false/u);
});
