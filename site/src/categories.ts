export const catalogCategories = [{ id: "game-design", label: "Game design" }] as const;

interface CategorizedItem {
  kind: string;
  tags: readonly string[];
  entry?: { featured?: boolean; experimental?: boolean; custom?: boolean };
}

export function categoryOf(item: Pick<CategorizedItem, "tags">): string | undefined {
  return catalogCategories.find((category) => item.tags.includes(category.id))?.id;
}

export function matchesCategories(item: Pick<CategorizedItem, "tags">, active: ReadonlySet<string>): boolean {
  const category = categoryOf(item);
  return active.size === 0 || (category !== undefined && active.has(category));
}

export function primaryTreeGroup(item: CategorizedItem): string {
  if (item.entry?.experimental) return "experimental";
  if (item.entry?.custom) return "custom";
  return categoryOf(item) ?? item.kind;
}

export function belongsToTreeGroup(item: CategorizedItem, group: string): boolean {
  return group === "featured" ? !!item.entry?.featured : primaryTreeGroup(item) === group;
}
