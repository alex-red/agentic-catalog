import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, extname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { gfmFromMarkdown } from 'mdast-util-gfm';
import { gfm } from 'micromark-extension-gfm';
import { checkCatalog, frontmatter, repositoryRoot, safePath } from './library.ts';
import type { Catalog } from './library.ts';

interface MarkdownNode {
  type: string;
  value?: string;
  url?: string;
  identifier?: string;
  alt?: string | null;
  depth?: number;
  ordered?: boolean | null;
  start?: number | null;
  checked?: boolean | null;
  children?: MarkdownNode[];
}

export interface WikiEntry {
  id: string;
  kind: 'skill' | 'rule' | 'profile' | 'document';
  name: string;
  title: string;
  description: string;
  path: string;
  html: string;
  tags?: string[];
  category?: string;
  maturity?: string;
  license?: string;
  maintainer?: string;
  members?: string[];
  related?: string[];
  evidenceCount?: number;
}

export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/gu, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]!);
}

export function markdownTree(source: string): MarkdownNode {
  return fromMarkdown(source, { extensions: [gfm()], mdastExtensions: [gfmFromMarkdown()] });
}

export function renderMarkdown(source: string, rewriteLink: (url: string) => string): string {
  const tree = markdownTree(source);
  const definitions = new Map<string, string>();
  function collect(node: MarkdownNode): void {
    if (node.type === 'definition') definitions.set(node.identifier!, node.url!);
    node.children?.forEach(collect);
  }
  collect(tree);
  if (tree.children?.[0]?.type === 'heading' && tree.children[0].depth === 1) tree.children.shift();
  function render(node: MarkdownNode): string {
    const content = () => (node.children ?? []).map(render).join('');
    switch (node.type) {
      case 'root': return content();
      case 'text': return escapeHtml(node.value ?? '');
      case 'heading': return `<h${Math.min(node.depth ?? 2, 6)}>${content()}</h${Math.min(node.depth ?? 2, 6)}>`;
      case 'paragraph': return `<p>${content()}</p>`;
      case 'strong': return `<strong>${content()}</strong>`;
      case 'emphasis': return `<em>${content()}</em>`;
      case 'delete': return `<del>${content()}</del>`;
      case 'inlineCode': return `<code>${escapeHtml(node.value ?? '')}</code>`;
      case 'code': return `<pre><code>${escapeHtml(node.value ?? '')}</code></pre>`;
      case 'list': return node.ordered ? `<ol start="${node.start ?? 1}">${content()}</ol>` : `<ul>${content()}</ul>`;
      case 'listItem': return `<li>${typeof node.checked === 'boolean' ? `<input type="checkbox" disabled${node.checked ? ' checked' : ''} aria-label="Task status"> ` : ''}${content()}</li>`;
      case 'blockquote': return `<blockquote>${content()}</blockquote>`;
      case 'thematicBreak': return '<hr>';
      case 'break': return '<br>';
      case 'link':
      case 'linkReference': {
        const url = node.url ?? definitions.get(node.identifier!) ?? '';
        if (!url || /^(?!https?:|mailto:)[a-z][a-z0-9+.-]*:/iu.test(url) || url.startsWith('//')) return content();
        const external = /^https?:/iu.test(url);
        return `<a href="${escapeHtml(rewriteLink(url))}"${external ? ' target="_blank" rel="noopener noreferrer"' : ''}>${content()}</a>`;
      }
      case 'image':
      case 'imageReference': return `<span class="image-description">${escapeHtml(node.alt ?? 'Image')}</span>`;
      case 'table': return `<div class="table-scroll"><table>${(node.children ?? []).map((row, index) => `<${index ? 'tbody' : 'thead'}><tr>${(row.children ?? []).map((cell) => `<${index ? 'td' : 'th'}>${(cell.children ?? []).map(render).join('')}</${index ? 'td' : 'th'}>`).join('')}</tr></${index ? 'tbody' : 'thead'}>`).join('')}</table></div>`;
      case 'definition':
      case 'html': return '';
      default: return node.children ? content() : escapeHtml(node.value ?? '');
    }
  }
  return render(tree);
}

function title(name: string): string {
  const words = name.replace(/^ar-/u, '').replace(/-/gu, ' ');
  return words.charAt(0).toUpperCase() + words.slice(1);
}

export function buildWiki(root = repositoryRoot, destination = join(root, 'dist/wiki')): { items: WikiEntry[]; documents: WikiEntry[] } {
  checkCatalog(root);
  const catalog = JSON.parse(readFileSync(join(root, 'catalog/index.json'), 'utf8')) as Catalog;
  const items: WikiEntry[] = [
    ...catalog.skills.map((skill) => ({
      id: skill.id, kind: 'skill' as const, name: skill.name, title: title(skill.name), description: skill.description,
      path: skill.path, html: '', category: skill.category, tags: skill.tags, maturity: skill.maturity,
      license: skill.license, maintainer: skill.maintainer, evidenceCount: skill.evidence.length,
    })),
    ...catalog.rules.map((rule) => ({ id: `rule/${rule.id}`, kind: 'rule' as const, name: rule.id, title: title(rule.id), description: rule.description, path: rule.path, html: '' })),
    ...catalog.profiles.map((profile) => ({
      id: `profile/${profile.id}`, kind: 'profile' as const, name: profile.id, title: title(profile.id), description: profile.description,
      path: profile.path, html: '', members: [...profile.skills, ...profile.rules], related: [...profile.skills.map((name) => `skill/${name}`), ...profile.rules.map((id) => `rule/${id}`)],
    })),
  ];
  const paths = new Set([
    ...items.map((item) => item.path), 'README.md', 'docs/installation.md', 'docs/compatibility.md', 'docs/evaluation.md',
  ]);
  const renderedPaths = new Map<string, string>();
  const documentIds = new Map(items.map((item) => [item.path, item.id]));
  const body = (path: string) => {
    const source = readFileSync(safePath(root, resolve(root, path)), 'utf8');
    return source.startsWith('---\n') ? frontmatter(source, path).body : source;
  };
  const localTarget = (sourcePath: string, url: string): string | null => {
    if (/^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/iu.test(url)) return null;
    const path = decodeURIComponent(url.split(/[?#]/u)[0]);
    if (path.startsWith('/') || path.includes('\\')) throw new Error(`Nonportable wiki link in ${sourcePath}: ${url}`);
    return relative(root, safePath(root, resolve(root, dirname(sourcePath), path))).split(sep).join('/');
  };
  // Follow document links so exported readers and their source files remain self-contained.
  for (const path of paths) {
    if (extname(path) !== '.md' && !path.endsWith('.md.tmpl')) continue;
    const source = body(path);
    renderedPaths.set(path, source);
    if (!documentIds.has(path)) documentIds.set(path, `document/${path}`);
    function collect(node: MarkdownNode): void {
      if (['link', 'definition', 'image'].includes(node.type) && node.url) {
        const target = localTarget(path, node.url);
        if (target) paths.add(target);
      }
      node.children?.forEach(collect);
    }
    collect(markdownTree(source));
  }
  const html = (path: string) => renderMarkdown(renderedPaths.get(path) ?? '', (url) => {
    const target = localTarget(path, url);
    if (!target) return url;
    const id = documentIds.get(target);
    return id ? `#item=${encodeURIComponent(id)}` : `./source/${target.split('/').map(encodeURIComponent).join('/')}`;
  });
  items.forEach((item) => {
    item.html = item.kind === 'profile' ? '' : html(item.path);
  });
  const documents: WikiEntry[] = [...renderedPaths.keys()].filter((path) => !items.some((item) => item.path === path)).map((path) => {
    const source = renderedPaths.get(path)!;
    const heading = /^# (.+)$/mu.exec(source)?.[1] ?? title(path.split('/').pop()!.replace(/\.md(?:\.tmpl)?$/u, ''));
    return { id: documentIds.get(path)!, kind: 'document', name: path, title: heading, description: '', path, html: html(path) };
  });
  const output = resolve(destination);
  const local = relative(resolve(root, 'dist'), output);
  if (!local || local.startsWith('..') || local.includes(sep) || local === '.') throw new Error('Wiki output must be a direct child of dist/.');
  mkdirSync(safePath(root, join(root, 'dist'), true), { recursive: true });
  safePath(root, output, true);
  rmSync(output, { recursive: true, force: true });
  mkdirSync(output, { recursive: true });
  for (const name of ['index.html', 'styles.css', 'app.js', 'model.js', 'favicon.svg', 'fonts']) {
    cpSync(safePath(root, join(root, 'wiki', name)), join(output, name), { recursive: true });
  }
  writeFileSync(join(output, 'catalog.json'), `${JSON.stringify({ schemaVersion: 1, items, documents })}\n`);
  writeFileSync(join(output, 'catalog-index.json'), readFileSync(join(root, 'catalog/index.json')));
  for (const path of paths) {
    const target = join(output, 'source', path);
    mkdirSync(dirname(target), { recursive: true });
    cpSync(safePath(root, resolve(root, path)), target);
  }
  return { items, documents };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const { items } = buildWiki();
    console.log(`Built dist/wiki with ${items.length} catalog items.`);
  } catch (error) {
    console.error((error as Error).message);
    process.exitCode = 1;
  }
}
