/** Shared by the catalog generator and browser. Evidence never changes arithmetic. */
export type Evidence = 'reviewed' | 'used' | 'tested' | 'evaluated';

export const humanAxes = [
  { key: 'value', label: 'Practical value', weight: 25 },
  { key: 'dependability', label: 'Dependability', weight: 20 },
  { key: 'cognitiveEase', label: 'Cognitive ease', weight: 15 },
  { key: 'control', label: 'Human control', weight: 15 },
  { key: 'adoption', label: 'Adoption cost', weight: 10 },
  { key: 'compatibility', label: 'Compatibility', weight: 10 },
  { key: 'upkeep', label: 'Upkeep', weight: 5 },
] as const;
export type HumanAxis = typeof humanAxes[number]['key'];

interface Review {
  evidence: Evidence;
  reviewed: string;
  notes: string;
}
export interface LegacyRating extends Review {
  rubric: 'legacy-v1';
  usefulness: number;
  quality: number;
  portability: number;
  novelty: number;
}
export interface HumanRating extends Review {
  rubric: 'human-v1';
  /** Missing grades are unknown, never zero or an imputed midpoint. */
  dimensions: Partial<Record<HumanAxis, number>>;
  context: string;
  baseline: string;
  /** Repository-relative curator assessment; not behavioral evidence. */
  review: string;
  unknowns?: string[];
  blockers?: { scope: string; reason: string }[];
}
export type Rating = LegacyRating | HumanRating;

export function entryScore(rating: Rating): number | null {
  if (rating.rubric === 'legacy-v1') {
    return Math.round((2 * rating.usefulness + rating.quality + rating.portability + rating.novelty) * 2) / 10;
  }
  if (humanAxes.some(({ key }) => rating.dimensions[key] === undefined)) return null;
  const total = humanAxes.reduce((sum, { key, weight }) => sum + rating.dimensions[key]! * weight, 0);
  return Math.round(total / 4) / 10;
}

export function scoreLabel(entry: { rating: Rating; score: number | null }): string {
  const { rating, score } = entry;
  const label = rating.rubric === 'legacy-v1'
    ? `${score?.toFixed(1)}/5 · legacy`
    : score === null ? 'Assessment incomplete' : `${score.toFixed(1)}/10`;
  return rating.rubric === 'human-v1' && rating.blockers?.length ? `${label} · blocker` : label;
}

/** Group by rubric before score; never numerically compare /5 with /10. */
export function compareRatings(a: { rating: Rating; score: number | null }, b: { rating: Rating; score: number | null }): number {
  const group = ({ rating, score }: typeof a) => {
    if (rating.rubric === 'legacy-v1') return 1;
    if (rating.blockers?.length) return 3;
    return score === null ? 2 : 0;
  };
  return group(a) - group(b) || (b.score ?? -1) - (a.score ?? -1);
}
