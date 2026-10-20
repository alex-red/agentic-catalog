import { lstatSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, isAbsolute, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Ajv } from 'ajv';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { parseDocument } from 'yaml';

export const repositoryRoot = fileURLToPath(new URL('../', import.meta.url));

interface Frontmatter {
  name: string;
  description: string;
  license?: string;
}

interface Component {
  schemaVersion: number;
  category: string;
  tags: string[];
  maturity: 'experimental' | 'candidate' | 'stable';
  maintainer: string;
  provenance: { kind: string; notices?: string[] };
  evaluationCases: string[];
  evidence: string[];
}

interface Rule {
  id: string;
  description: string;
  path: string;
}

interface Profile {
  schemaVersion: number;
  id: string;
  description: string;
  rules: string[];
  skills: string[];
  path: string;
}

export interface EvaluationCase {
  schemaVersion: number;
  id: string;
  skill?: string;
  rule?: string;
  fixture?: string;
  request?: string;
  grader?: { files?: string; command: string[] };
  runtime?: { command: string[] };
  acceptance?: string[];
  triggers?: EvaluationTrigger[];
}

export interface EvaluationTrigger {
  expectation: 'activate' | 'ignore' | 'clarify';
  prompt: string;
}

interface Skill extends Frontmatter, Component {
  id: string;
  path: string;
}

export interface Catalog {
  schemaVersion: number;
  rules: Rule[];
  skills: Skill[];
  profiles: Profile[];
}

const ajv = new Ajv({ allErrors: true, strict: true });
const validators = new Map(
  ['skill', 'component', 'rule', 'profile', 'evaluation-case', 'trigger-suite'].map((name) => [
    name,
    ajv.compile(JSON.parse(readFileSync(join(repositoryRoot, 'catalog/schema', `${name}.schema.json`), 'utf8'))),
  ]),
);

export function validate<T>(schema: string, data: unknown, label: string): T {
  const validator = validators.get(schema)!;
  if (!validator(data)) {
    throw new Error(`${label}: ${ajv.errorsText(validator.errors, { separator: '; ' })}`);
  }
  return data as T;
}

export function readYaml(source: string, label: string): unknown {
  const document = parseDocument(source, { uniqueKeys: true });
  if (document.errors.length) {
    throw new Error(`${label}: ${document.errors.map((error) => error.message).join('; ')}`);
  }
  return document.toJS({ maxAliasCount: 50 });
}

export function frontmatter(source: string, label: string): { data: unknown; body: string } {
  const match = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/u.exec(source);
  if (!match) throw new Error(`${label}: expected YAML frontmatter`);
  const body = source.slice(match[0].length).trim();
  if (!body) throw new Error(`${label}: instruction body is empty`);
  return { data: readYaml(match[1], label), body };
}

// Check every path segment before reading, including symlinks whose target stays inside the tree.
export function safePath(scope: string, candidate: string, allowMissingLeaf = false): string {
  const root = resolve(scope);
  const target = resolve(candidate);
  const local = relative(root, target);
  if (local === '..' || local.startsWith(`..${sep}`) || isAbsolute(local)) {
    throw new Error(`Path escapes its content root: ${candidate}`);
  }
  const segments = local ? local.split(sep) : [];
  let current = root;
  for (let index = -1; index < segments.length; index++) {
    if (index >= 0) current = join(current, segments[index]);
    let entry;
    try {
      entry = lstatSync(current);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        if (allowMissingLeaf && index === segments.length - 1) return target;
        throw new Error(`Missing path: ${current}`);
      }
      throw error;
    }
    if (entry.isSymbolicLink()) throw new Error(`Symlinks are not portable content: ${current}`);
    if (!entry.isDirectory() && !entry.isFile()) throw new Error(`Unsupported file type: ${current}`);
  }
  return target;
}

function repoFile(root: string, path: string): string {
  if (isAbsolute(path) || path.includes('\\') || /^[A-Za-z]:/u.test(path)) {
    throw new Error(`Expected a portable relative path: ${path}`);
  }
  const file = safePath(root, resolve(root, path));
  if (!lstatSync(file).isFile()) throw new Error(`Expected a file: ${path}`);
  return file;
}

function localName(root: string, file: string): string {
  return relative(root, file).split(sep).join('/');
}

function directoryEntries(root: string, directory: string): string[] {
  const folder = safePath(root, join(root, directory));
  return readdirSync(folder).sort().map((name) => safePath(root, join(folder, name)));
}

function filesWithin(directory: string): string[] {
  return directoryEntries(directory, '').flatMap((file) =>
    lstatSync(file).isDirectory() ? filesWithin(file) : [file],
  );
}

export function validateSkillBundle(directory: string): void {
  const skill = safePath(directory, join(directory, 'SKILL.md'));
  const parsed = frontmatter(readFileSync(skill, 'utf8'), skill);
  const metadata = validate<Frontmatter>('skill', parsed.data, skill);
  if (metadata.name !== relative(dirname(directory), directory)) {
    throw new Error(`${skill}: skill name must match its directory`);
  }
  const license = safePath(directory, join(directory, 'LICENSE.txt'));
  if (!lstatSync(license).isFile() || !readFileSync(license, 'utf8').trim()) {
    throw new Error(`${directory}: LICENSE.txt must contain the license notice`);
  }
  for (const file of filesWithin(directory).filter((file) => /\.md$/iu.test(file))) {
    const source = file === skill ? parsed.body : readFileSync(file, 'utf8');
    const tree = fromMarkdown(source);
    function inspect(node: { type: string; url?: string; children?: unknown[] }): void {
      if (node.url && /^(?:file:|[a-z]:[\\/])/iu.test(node.url)) {
        throw new Error(`${file}: machine-local resource links are not portable: ${node.url}`);
      }
      if (node.url && !/^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/iu.test(node.url)) {
        const destination = decodeURIComponent(node.url.split(/[?#]/u)[0]);
        if (isAbsolute(destination) || destination.includes('\\')) {
          throw new Error(`${file}: expected a portable resource link: ${node.url}`);
        }
        safePath(directory, resolve(dirname(file), destination));
      }
      for (const child of node.children ?? []) inspect(child as Parameters<typeof inspect>[0]);
    }
    inspect(tree);
  }
}

function assertUnique(values: string[], label: string): void {
  const seen = new Set<string>();
  for (const value of values) {
    if (seen.has(value)) throw new Error(`Duplicate ${label}: ${value}`);
    seen.add(value);
  }
}

interface LoadedEvaluationCase {
  path: string;
  evaluation: EvaluationCase;
}

function loadEvaluationCaseFiles(root: string): LoadedEvaluationCase[] {
  const skillNames = directoryEntries(root, 'skills')
    .filter((directory) => lstatSync(directory).isDirectory())
    .map((directory) => directory.slice(directory.lastIndexOf(sep) + 1));
  const ruleIds = directoryEntries(root, 'rules')
    .filter((file) => lstatSync(file).isFile() && file.endsWith('.md'))
    .map((file) => file.slice(file.lastIndexOf(sep) + 1, -3));
  const cases = directoryEntries(root, 'evals/cases').map((file) => {
    if (!file.endsWith('.yaml') || !lstatSync(file).isFile()) {
      throw new Error(`Evaluation cases must be YAML files: ${file}`);
    }
    const path = localName(root, file);
    const evaluation = validate<EvaluationCase>(
      'evaluation-case', readYaml(readFileSync(file, 'utf8'), path), path,
    );
    if (evaluation.skill && !skillNames.includes(evaluation.skill)) {
      throw new Error(`${path}: unknown skill ${evaluation.skill}`);
    }
    if (evaluation.rule && !ruleIds.includes(evaluation.rule)) {
      throw new Error(`${path}: unknown rule ${evaluation.rule}`);
    }
    for (const [label, directory] of [['fixture', evaluation.fixture], ['grader', evaluation.grader?.files]] as const) {
      if (directory === undefined) continue;
      if (isAbsolute(directory) || directory.includes('\\')) throw new Error(`${path}: ${label} path must be relative`);
      const resolved = safePath(root, resolve(root, directory));
      if (!lstatSync(resolved).isDirectory()) throw new Error(`${path}: expected a ${label} directory`);
      filesWithin(resolved);
    }
    return { path, evaluation };
  });
  assertUnique(cases.map(({ evaluation }) => evaluation.id), 'evaluation case ID');
  return cases;
}

export function loadEvaluationCases(root = repositoryRoot): EvaluationCase[] {
  return loadEvaluationCaseFiles(root).map(({ evaluation }) => evaluation);
}

export function loadCatalog(root = repositoryRoot): Catalog {
  const rules = directoryEntries(root, 'rules').map((file) => {
    if (!file.endsWith('.md') || !lstatSync(file).isFile()) {
      throw new Error(`Rules must be Markdown files: ${file}`);
    }
    const parsed = frontmatter(readFileSync(file, 'utf8'), file);
    const rule = validate<Omit<Rule, 'path'>>('rule', parsed.data, file);
    if (file !== join(root, 'rules', `${rule.id}.md`)) throw new Error(`${file}: rule ID must match its filename`);
    return { ...rule, path: localName(root, file) };
  });

  const evaluations = loadEvaluationCaseFiles(root);
  const skills = directoryEntries(root, 'skills').map((directory) => {
    if (!lstatSync(directory).isDirectory()) throw new Error(`Expected a skill directory: ${directory}`);
    validateSkillBundle(directory);
    const file = join(directory, 'SKILL.md');
    const definition = validate<Frontmatter>('skill', frontmatter(readFileSync(file, 'utf8'), file).data, file);
    const companion = repoFile(root, localName(root, join(directory, 'component.yaml')));
    const metadata = validate<Component>('component', readYaml(readFileSync(companion, 'utf8'), companion), companion);
    for (const path of [...metadata.evaluationCases, ...metadata.evidence]) repoFile(root, path);
    for (const notice of metadata.provenance.notices ?? []) {
      if (isAbsolute(notice)) throw new Error(`${companion}: notices must be relative to the skill`);
      safePath(directory, resolve(directory, notice));
    }
    for (const path of metadata.evaluationCases) {
      repoFile(root, path);
      const evaluation = evaluations.find((entry) => entry.path === path)?.evaluation;
      if (!evaluation) throw new Error(`${path}: evaluation case is not in evals/cases`);
      if (evaluation.skill !== definition.name) throw new Error(`${path}: evaluation targets the wrong skill`);
    }
    return { ...definition, ...metadata, id: `skill/${definition.name}`, path: localName(root, file) };
  });

  const profiles = directoryEntries(root, 'profiles').map((file) => {
    if (!file.endsWith('.yaml') || !lstatSync(file).isFile()) throw new Error(`Expected a YAML profile: ${file}`);
    const profile = validate<Omit<Profile, 'path'>>('profile', readYaml(readFileSync(file, 'utf8'), file), file);
    if (file !== join(root, 'profiles', `${profile.id}.yaml`)) throw new Error(`${file}: profile ID must match its filename`);
    for (const id of profile.rules) {
      if (!rules.some((rule) => rule.id === id)) throw new Error(`${file}: unknown rule ${id}`);
    }
    for (const name of profile.skills) {
      if (!skills.some((skill) => skill.name === name)) throw new Error(`${file}: unknown skill ${name}`);
    }
    return { ...profile, path: localName(root, file) };
  });

  assertUnique(rules.map((rule) => rule.id), 'rule ID');
  assertUnique(skills.map((skill) => skill.name), 'skill ID');
  assertUnique(profiles.map((profile) => profile.id), 'profile ID');
  assertUnique(skills.map((skill) => skill.description.toLowerCase().replace(/\s+/gu, ' ').trim()), 'skill description');
  return { schemaVersion: 1, rules, skills, profiles };
}

export function renderCatalog(catalog: Catalog): string {
  return `${JSON.stringify(catalog, null, 2)}\n`;
}

export function checkCatalog(root = repositoryRoot): void {
  const actual = readFileSync(repoFile(root, 'catalog/index.json'), 'utf8');
  if (actual !== renderCatalog(loadCatalog(root))) {
    throw new Error('Catalog is stale. Run bun run catalog:build and review catalog/index.json.');
  }
}

export function writeCatalog(root = repositoryRoot): void {
  const catalog = loadCatalog(root);
  const output = safePath(root, join(root, 'catalog/index.json'), true);
  writeFileSync(output, renderCatalog(catalog));
}

export function renderRuleBlock(profileId: string, sourceRevision: string, root = repositoryRoot): string {
  if (!/^[A-Za-z0-9][A-Za-z0-9._/-]*$/u.test(sourceRevision)) {
    throw new Error('Source revision must be a single portable revision label.');
  }
  const catalog = loadCatalog(root);
  const profile = catalog.profiles.find((entry) => entry.id === profileId);
  if (!profile) throw new Error(`Unknown profile: ${profileId}`);
  const bodies = profile.rules.map((id) => {
    const rule = catalog.rules.find((entry) => entry.id === id)!;
    const { body } = frontmatter(readFileSync(repoFile(root, rule.path), 'utf8'), rule.path);
    return body.replace(/^(#{1,5}) /gmu, '#$1 ');
  });
  return `<!-- agentic-rules:begin profile=${profileId} source=${sourceRevision} -->\n${bodies.join('\n\n')}\n<!-- agentic-rules:end -->\n`;
}
