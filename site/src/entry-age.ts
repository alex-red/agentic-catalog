const newWindowMs = 7 * 24 * 60 * 60 * 1000;

export function isNewSkill(entry: { type: string; added?: string }, now: number): boolean {
  if (entry.type !== "skill" || !entry.added) return false;

  const addedAt = Date.parse(`${entry.added}T00:00:00Z`);
  const age = now - addedAt;
  return age >= 0 && age < newWindowMs;
}
