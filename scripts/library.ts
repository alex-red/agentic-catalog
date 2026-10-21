import { lstatSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { basename, dirname, isAbsolute, join, relative, resolve, sep } from 'node:path';
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

export const entryTypes = ['skill', 'rule', 'workflow', 'hook', 'subagent', 'mcp', 'plugin'] as const;
export type EntryType = (typeof entryTypes)[number];
export type Evidence = 'reviewed' | 'used' | 'tested' | 'evaluated';

// The installable file each non-linked entry must carry; plugins are always linked.
export const primaryFiles: Record<EntryType, string | undefined> = {
  skill: 'SKILL.md', rule: 'RULE.md', workflow: 'WORKFLOW.md', hook: 'HOOK.md', subagent: 'AGENT.md', mcp: 'MCP.md', plugin: undefined,
};

export interface EntryMetadata {
  schemaVersion: 2;
  id: string;
  type: EntryType;
  title: string;
  summary: string;
  useWhen: string;
  tags: string[];
  hosts: ('any' | 'claude-code' | 'codex')[];
  /** Interesting but unproven; listed apart from established entries. */
  experimental?: true;
  /** A bespoke house item rather than one selected from outside research. */
  custom?: true;
  /** Also shown under a Featured group in the browser, in addition to its own type. */
  featured?: true;
  rating: { usefulness: number; quality: number; portability: number; novelty: number; evidence: Evidence; reviewed: string; notes: string };
  source: { kind: 'original' | 'adapted' | 'vendored' | 'linked'; url?: string; path?: string; revision?: string; retrieved?: string; license: string; author?: string; notes?: string };
  inspiredBy?: { title: string; url: string }[];
  install?: Partial<Record<'claude-code' | 'codex' | 'any' | 'notes', string>>;
  overlap?: string;
  related?: string[];
  evaluationCases?: string[];
  evidence?: string[];
}

export interface Entry extends EntryMetadata {
  /** Weighted curator score: usefulness counts twice. */
  score: number;
  /** Best link to where the entry came from: the pinned upstream path, else a cited source, GitHub first. */
  sourceUrl?: string;
  /** Repo-relative entry directory. */
  path: string;
  /** Repo-relative installable files (everything except entry.yaml); empty for linked entries. */
  files: string[];
}

export interface Collection {
  schemaVersion: 2;
  id: string;
  title: string;
  description: string;
  entries: string[];
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
  criteria?: string;
}

export interface Catalog {
  schemaVersion: 2;
  repository: string;
  rawBase: string;
  entries: Entry[];
  collections: Collection[];
}

const ajv = new Ajv({ allErrors: true, strict: true });
const validators = new Map(
  ['skill', 'entry', 'collection', 'evaluation-case', 'trigger-suite'].map((name) => [
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

// Relative links must resolve inside the bundle; machine-local links never travel.
function checkPortableLinks(directory: string, file: string, source: string): void {
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
  inspect(fromMarkdown(source));
}

export function validateSkillBundle(directory: string): Frontmatter {
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
    checkPortableLinks(directory, file, file === skill ? parsed.body : readFileSync(file, 'utf8'));
  }
  return metadata;
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

function loadEvaluationCaseFiles(root: string, known: { skill: string[]; rule: string[] }): LoadedEvaluationCase[] {
  const cases = directoryEntries(root, 'evals/cases').map((file) => {
    if (!file.endsWith('.yaml') || !lstatSync(file).isFile()) {
      throw new Error(`Evaluation cases must be YAML files: ${file}`);
    }
    const path = localName(root, file);
    const evaluation = validate<EvaluationCase>(
      'evaluation-case', readYaml(readFileSync(file, 'utf8'), path), path,
    );
    if (evaluation.skill && !known.skill.includes(evaluation.skill)) {
      throw new Error(`${path}: unknown skill ${evaluation.skill}`);
    }
    if (evaluation.rule && !known.rule.includes(evaluation.rule)) {
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

const github = (url: string) => url.startsWith('https://github.com/');

export function sourceUrl(entry: EntryMetadata): string | undefined {
  const { url, path, revision } = entry.source;
  if (url && github(url) && (path || revision)) {
    const view = path && /\.[A-Za-z0-9]+$/u.test(path) ? 'blob' : 'tree';
    return `${url.replace(/\/$/u, '')}/${view}/${revision ?? 'HEAD'}${path ? `/${path}` : ''}`;
  }
  const cited = [...(url ? [url] : []), ...(entry.inspiredBy ?? []).map((link) => link.url)];
  return cited.find(github) ?? cited[0];
}

export function entryScore(rating: EntryMetadata['rating']): number {
  return Math.round(((2 * rating.usefulness + rating.quality + rating.portability + rating.novelty) / 5) * 10) / 10;
}

// The published location comes from package.json so the index, llms.txt, and discovery skill agree.
export function repositoryLocation(root = repositoryRoot): { repository: string; rawBase: string } {
  const manifest = JSON.parse(readFileSync(repoFile(root, 'package.json'), 'utf8'));
  const url = String(manifest.repository?.url ?? '');
  const match = /^https:\/\/github\.com\/([\w.-]+\/[\w.-]+?)(?:\.git)?$/u.exec(url);
  if (!match) throw new Error('package.json: repository.url must be an https://github.com/OWNER/REPO URL');
  return { repository: `https://github.com/${match[1]}`, rawBase: `https://raw.githubusercontent.com/${match[1]}/main/` };
}

function loadEntry(root: string, directory: string, type: EntryType): Entry {
  const label = localName(root, directory);
  if (!lstatSync(directory).isDirectory()) throw new Error(`Expected an entry directory: ${label}`);
  const metadataFile = repoFile(root, `${label}/entry.yaml`);
  const entry = validate<EntryMetadata>('entry', readYaml(readFileSync(metadataFile, 'utf8'), `${label}/entry.yaml`), `${label}/entry.yaml`);
  if (entry.id !== basename(directory)) throw new Error(`${label}: entry ID must match its directory`);
  if (entry.type !== type) throw new Error(`${label}: type ${entry.type} belongs under entries/${entry.type}s/`);

  const files = filesWithin(directory).filter((file) => file !== metadataFile);
  const primary = primaryFiles[type];
  if (entry.source.kind === 'linked') {
    if (files.length) throw new Error(`${label}: linked entries hold only entry.yaml; vendor the content or remove ${localName(root, files[0])}`);
  } else {
    if (!primary) throw new Error(`${label}: ${type} entries must be linked`);
    const main = repoFile(root, `${label}/${primary}`);
    if (!readFileSync(main, 'utf8').trim()) throw new Error(`${label}/${primary}: content is empty`);
    if (type === 'skill') {
      const skill = validateSkillBundle(directory);
      if (skill.name !== entry.id) throw new Error(`${label}: skill name must match the entry ID`);
    } else {
      for (const file of files.filter((file) => /\.md$/iu.test(file))) checkPortableLinks(directory, file, readFileSync(file, 'utf8'));
    }
    if (entry.source.kind === 'vendored' && !files.some((file) => /^LICEN[CS]E(?:\.\w+)?$/iu.test(basename(file)))) {
      throw new Error(`${label}: vendored entries must include the upstream license file`);
    }
  }
  for (const path of entry.evidence ?? []) repoFile(root, path);
  const link = sourceUrl(entry);
  return { ...entry, score: entryScore(entry.rating), ...(link && { sourceUrl: link }), path: label, files: files.map((file) => localName(root, file)) };
}

export function loadCatalog(root = repositoryRoot): Catalog {
  const entries: Entry[] = [];
  for (const folder of directoryEntries(root, 'entries')) {
    const type = entryTypes.find((name) => `${name}s` === basename(folder));
    if (!type || !lstatSync(folder).isDirectory()) throw new Error(`Unknown entry folder: ${localName(root, folder)}`);
    for (const directory of directoryEntries(root, localName(root, folder))) entries.push(loadEntry(root, directory, type));
  }
  assertUnique(entries.map((entry) => entry.id), 'entry ID');
  assertUnique(entries.map((entry) => entry.title.toLowerCase()), 'entry title');
  const ids = new Set(entries.map((entry) => entry.id));

  const evaluations = loadEvaluationCaseFiles(root, {
    skill: [...entries.filter((entry) => entry.type === 'skill' && entry.source.kind !== 'linked').map((entry) => entry.id), ...pluginSkills(root)],
    rule: entries.filter((entry) => entry.type === 'rule' && entry.source.kind !== 'linked').map((entry) => entry.id),
  });
  for (const entry of entries) {
    for (const id of entry.related ?? []) {
      if (id === entry.id || !ids.has(id)) throw new Error(`${entry.path}: unknown related entry ${id}`);
    }
    for (const path of entry.evaluationCases ?? []) {
      repoFile(root, path);
      const evaluation = evaluations.find((loaded) => loaded.path === path)?.evaluation;
      if (!evaluation) throw new Error(`${path}: evaluation case is not in evals/cases`);
      if ((entry.type === 'skill' ? evaluation.skill : evaluation.rule) !== entry.id) {
        throw new Error(`${path}: evaluation targets the wrong ${entry.type}`);
      }
    }
  }

  const collections = directoryEntries(root, 'collections').map((file) => {
    const path = localName(root, file);
    if (!file.endsWith('.yaml') || !lstatSync(file).isFile()) throw new Error(`Expected a YAML collection: ${path}`);
    const collection = validate<Omit<Collection, 'path'>>('collection', readYaml(readFileSync(file, 'utf8'), path), path);
    if (basename(file) !== `${collection.id}.yaml`) throw new Error(`${path}: collection ID must match its filename`);
    for (const id of collection.entries) if (!ids.has(id)) throw new Error(`${path}: unknown entry ${id}`);
    return { ...collection, path };
  });
  assertUnique(collections.map((collection) => collection.id), 'collection ID');

  // The plugin ships only the discovery skill(s); they must point at the published catalog.
  const location = repositoryLocation(root);
  for (const directory of directoryEntries(root, 'skills')) {
    validateSkillBundle(directory);
    if (!readFileSync(join(directory, 'SKILL.md'), 'utf8').includes(`${location.rawBase}catalog/index.json`)) {
      throw new Error(`${localName(root, directory)}/SKILL.md: must reference ${location.rawBase}catalog/index.json`);
    }
  }

  const order = (entry: Entry) => entryTypes.indexOf(entry.type);
  entries.sort((a, b) => order(a) - order(b) || a.id.localeCompare(b.id));
  return { schemaVersion: 2, ...location, entries, collections };
}

export function loadEvaluationCases(root = repositoryRoot): EvaluationCase[] {
  const catalog = loadCatalog(root);
  const ids = (type: EntryType) => catalog.entries.filter((entry) => entry.type === type && entry.source.kind !== 'linked').map((entry) => entry.id);
  return loadEvaluationCaseFiles(root, { skill: [...ids('skill'), ...pluginSkills(root)], rule: ids('rule') }).map(({ evaluation }) => evaluation);
}

function pluginSkills(root: string): string[] {
  return directoryEntries(root, 'skills').map((directory) => basename(directory));
}

export function renderCatalog(catalog: Catalog): string {
  return `${JSON.stringify(catalog, null, 2)}\n`;
}

const sectionTitles: Record<EntryType, string> = {
  skill: 'Skills', rule: 'Rules', workflow: 'Workflows and loops', hook: 'Hooks', subagent: 'Subagents', mcp: 'MCP servers', plugin: 'Plugins',
};

// llms.txt (https://llmstxt.org): a compact, ranked index an agent can read in one fetch.
export function renderLlmsText(catalog: Catalog): string {
  const url = (path: string) => `${catalog.rawBase}${path}`;
  const lines = [
    '# Agentic Catalog',
    '',
    '> A curated, rated catalog of rules, skills, workflows, hooks, subagents, MCP servers, and plugins for coding agents, focused on Claude Code and Codex. Every entry records where it came from, its license, tags, and a curator rating.',
    '',
    `Full metadata for every entry is in [catalog/index.json](${url('catalog/index.json')}). Install steps by entry type are in the [install guide](${url('skills/agentic-catalog/references/install.md')}). Repository: ${catalog.repository}`,
    '',
    'Score (1-5) = (2 × usefulness + quality + portability + novelty) / 5, where novelty means value beyond host built-ins. Evidence, from weakest to strongest: reviewed, used, tested, evaluated. Hosts: `any` means portable through an open format. Entries are ranked by score within each section. Show users the score, the evidence level, and the source before installing anything.',
  ];
  const byScore = (a: Entry, b: Entry) => b.score - a.score || a.id.localeCompare(b.id);
  const line = (entry: Entry) => {
    const primary = primaryFiles[entry.type];
    const target = entry.source.kind === 'linked' || !primary ? entry.sourceUrl! : url(`${entry.path}/${primary}`);
    const origin = entry.source.kind === 'original'
      ? `original${entry.sourceUrl ? `, informed by ${entry.sourceUrl}` : ''}` : `${entry.source.kind} from ${entry.sourceUrl}`;
    const kind = entry.experimental || entry.custom ? `type ${entry.type}, ` : '';
    return `- [${entry.title}](${target}): ${entry.summary} Use when: ${entry.useWhen} — id \`${entry.id}\`, ${kind}score ${entry.score.toFixed(1)}, evidence ${entry.rating.evidence}, hosts ${entry.hosts.join('/')}, tags ${entry.tags.join(', ')}, ${origin}, [metadata](${url(`${entry.path}/entry.yaml`)})`;
  };
  for (const type of entryTypes) {
    const group = catalog.entries.filter((entry) => entry.type === type && !entry.experimental && !entry.custom).sort(byScore);
    if (!group.length) continue;
    lines.push('', `## ${sectionTitles[type]}`, '');
    lines.push(...group.map(line));
  }
  // An entry that is both custom and experimental is listed as experimental.
  const custom = catalog.entries.filter((entry) => entry.custom && !entry.experimental).sort(byScore);
  if (custom.length) {
    lines.push('', '## Custom', '', 'Bespoke house items written for this catalog rather than selected from outside research. Recommend them like any other entry when they fit, and say that they are custom.', '');
    lines.push(...custom.map(line));
  }
  const experimental = catalog.entries.filter((entry) => entry.experimental).sort(byScore);
  if (experimental.length) {
    lines.push('', '## Experimental', '', 'Interesting but unproven. Recommend these only when the user asks for experimental options, and say that they are experimental.', '');
    lines.push(...experimental.map(line));
  }
  if (catalog.collections.length) {
    lines.push('', '## Collections', '');
    for (const collection of catalog.collections) {
      lines.push(`- [${collection.title}](${url(collection.path)}): ${collection.description} Entries: ${collection.entries.join(', ')}`);
    }
  }
  return `${lines.join('\n')}\n`;
}

const generated = (catalog: Catalog) => [
  ['catalog/index.json', renderCatalog(catalog)],
  ['llms.txt', renderLlmsText(catalog)],
] as const;

export function checkCatalog(root = repositoryRoot): void {
  for (const [path, content] of generated(loadCatalog(root))) {
    if (readFileSync(repoFile(root, path), 'utf8') !== content) {
      throw new Error(`${path} is stale. Run bun run catalog:build and review the result.`);
    }
  }
}

export function writeCatalog(root = repositoryRoot): void {
  for (const [path, content] of generated(loadCatalog(root))) {
    writeFileSync(safePath(root, join(root, path), true), content);
  }
}

export function ruleBody(root: string, id: string): string {
  return readFileSync(repoFile(root, `entries/rules/${id}/RULE.md`), 'utf8').trim();
}

export function renderRuleBlock(collectionId: string, sourceRevision: string, root = repositoryRoot): string {
  if (!/^[A-Za-z0-9][A-Za-z0-9._/-]*$/u.test(sourceRevision)) {
    throw new Error('Source revision must be a single portable revision label.');
  }
  const catalog = loadCatalog(root);
  const collection = catalog.collections.find((entry) => entry.id === collectionId);
  if (!collection) throw new Error(`Unknown collection: ${collectionId}`);
  const rules = collection.entries.filter((id) => catalog.entries.find((entry) => entry.id === id)?.type === 'rule');
  if (!rules.length) throw new Error(`Collection ${collectionId} has no rules`);
  const bodies = rules.map((id) => ruleBody(root, id).replace(/^(#{1,5}) /gmu, '#$1 '));
  return `<!-- agentic-catalog:begin collection=${collectionId} source=${sourceRevision} -->\n${bodies.join('\n\n')}\n<!-- agentic-catalog:end -->\n`;
}
