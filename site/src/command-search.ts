export interface SearchCommand {
  id: string;
  title: string;
  detail: string;
  group: string;
  keywords?: string;
  priority?: number;
  semantic?: { key: string; text: string; hosts?: readonly string[] };
  run: () => void;
}

export function isExactCommand(command: SearchCommand, query: string): boolean {
  const term = query.trim().toLowerCase();
  return command.title.toLowerCase() === term || command.semantic?.key === term;
}

/** Match every word, preferring titles over supporting metadata. */
export function searchCommands(commands: readonly SearchCommand[], query: string): SearchCommand[] {
  const words = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  return commands.map((command, index) => {
    const title = command.title.toLowerCase();
    const haystack = `${title} ${command.detail} ${command.keywords ?? ""}`.toLowerCase();
    const score = words.reduce((total, word) => total + (title === word ? 100 : title.startsWith(word) ? 50 : title.includes(word) ? 25 : 0), 0);
    return { command, index, score, matches: words.every((word) => haystack.includes(word)) };
  }).filter((result) => result.matches)
    .sort((a, b) => Number(isExactCommand(b.command, query)) - Number(isExactCommand(a.command, query)) ||
      b.score - a.score || (b.command.priority ?? 0) - (a.command.priority ?? 0) || a.index - b.index)
    .map((result) => result.command);
}

export function blendCommandResults(
  keywords: readonly SearchCommand[],
  semantic: readonly SearchCommand[],
  query: string,
): SearchCommand[] {
  const pinned = keywords.filter((command) => isExactCommand(command, query) || !command.semantic);
  const scores = new Map<string, { command: SearchCommand; score: number }>();
  const pinnedIds = new Set(pinned.map((command) => command.id));
  for (const [ranked, weight] of [[keywords, 1], [semantic, 0.8]] as const) {
    ranked.forEach((command, rank) => {
      if (pinnedIds.has(command.id)) return;
      const score = (scores.get(command.id)?.score ?? 0) + weight / (5 + rank);
      scores.set(command.id, { command, score });
    });
  }
  const ranked = [...scores.values()].sort((a, b) => b.score - a.score);
  return [...pinned, ...ranked.map(({ command }) => command)];
}
