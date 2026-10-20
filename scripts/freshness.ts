import type { Catalog, Entry } from './library.ts';

export interface UpstreamCommit { sha: string; date: string }
export type LatestCommit = (repository: string, path: string | undefined) => Promise<UpstreamCommit | undefined>;

export interface FreshnessRow {
  id: string;
  kind: Entry['source']['kind'];
  status: 'current' | 'behind' | 'unpinned' | 'unknown';
  pinned?: string;
  latest?: UpstreamCommit;
  reviewAgeDays: number;
}

const reviewLimitDays = 183;

// Each pinned revision is the last commit touching source.path (or the repository head when there is no path).
export async function checkFreshness(catalog: Catalog, latestCommit: LatestCommit, today = new Date()): Promise<FreshnessRow[]> {
  const rows: FreshnessRow[] = [];
  for (const entry of catalog.entries) {
    const reviewAgeDays = Math.floor((today.getTime() - Date.parse(`${entry.rating.reviewed}T00:00:00Z`)) / 86_400_000);
    const repository = /^https:\/\/github\.com\/([\w.-]+\/[\w.-]+?)(?:\.git)?\/?$/u.exec(entry.source.url ?? '')?.[1];
    if (!repository) {
      if (entry.source.kind === 'vendored' || entry.source.kind === 'linked') rows.push({ id: entry.id, kind: entry.source.kind, status: 'unknown', reviewAgeDays });
      else rows.push({ id: entry.id, kind: entry.source.kind, status: 'current', reviewAgeDays });
      continue;
    }
    if (!entry.source.revision) {
      rows.push({ id: entry.id, kind: entry.source.kind, status: 'unpinned', reviewAgeDays });
      continue;
    }
    const latest = await latestCommit(repository, entry.source.path);
    const status = !latest ? 'unknown' : latest.sha === entry.source.revision ? 'current' : 'behind';
    rows.push({ id: entry.id, kind: entry.source.kind, status, pinned: entry.source.revision, latest, reviewAgeDays });
  }
  return rows;
}

export function needsAttention(row: FreshnessRow): boolean {
  return row.status !== 'current' || row.reviewAgeDays > reviewLimitDays;
}

export function renderFreshness(rows: FreshnessRow[]): string {
  const flagged = rows.filter(needsAttention);
  const lines = flagged.map((row) => {
    const reasons = [];
    if (row.status === 'behind') reasons.push(`upstream moved: ${row.pinned!.slice(0, 7)} -> ${row.latest!.sha.slice(0, 7)} (${row.latest!.date.slice(0, 10)})`);
    if (row.status === 'unpinned') reasons.push('no pinned revision');
    if (row.status === 'unknown') reasons.push('upstream not checked (not GitHub, missing, or request failed)');
    if (row.reviewAgeDays > reviewLimitDays) reasons.push(`reviewed ${row.reviewAgeDays} days ago`);
    return `- ${row.id} (${row.kind}): ${reasons.join('; ')}`;
  });
  return [`${rows.length} entries checked, ${flagged.length} need attention.`, ...lines].join('\n');
}

export function githubLatestCommit(token?: string, fetcher: typeof fetch = fetch): LatestCommit {
  return async (repository, path) => {
    const query = new URLSearchParams({ per_page: '1', ...(path ? { path } : {}) });
    const response = await fetcher(`https://api.github.com/repos/${repository}/commits?${query}`, {
      headers: { Accept: 'application/vnd.github+json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    });
    if (!response.ok) return undefined;
    const [commit] = (await response.json()) as { sha: string; commit: { committer: { date: string } } }[];
    return commit ? { sha: commit.sha, date: commit.commit.committer.date } : undefined;
  };
}
