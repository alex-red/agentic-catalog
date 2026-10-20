export const types = ['all', 'skill', 'rule', 'profile'];

export function readState(search) {
  const params = new URLSearchParams(search);
  return {
    type: types.includes(params.get('type')) ? params.get('type') : 'all',
    query: params.get('q') ?? '',
    sort: params.get('sort') === 'name' ? 'name' : 'kind',
    view: params.get('view') === 'list' ? 'list' : 'grid',
  };
}

/**
 * @template {{kind: string, title: string, name?: string, description?: string, category?: string, tags?: string[], members?: string[]}} T
 * @param {T[]} items
 * @param {{type: string, query: string, sort: string}} state
 * @returns {T[]}
 */
export function selectItems(items, state) {
  const words = state.query.toLocaleLowerCase('en').trim().split(/\s+/u).filter(Boolean);
  const order = { skill: 0, profile: 1, rule: 2 };
  return items.filter((item) => {
    const text = [item.title, item.name, item.description, item.category, ...(item.tags ?? []), ...(item.members ?? [])]
      .filter(Boolean).join(' ').toLocaleLowerCase('en');
    return (state.type === 'all' || item.kind === state.type) && words.every((word) => text.includes(word));
  }).sort((a, b) => {
    const group = state.sort === 'kind' ? order[a.kind] - order[b.kind] : 0;
    return group || a.title.localeCompare(b.title, 'en');
  });
}

export function stateSearch(state) {
  const params = new URLSearchParams();
  if (state.type !== 'all') params.set('type', state.type);
  if (state.query) params.set('q', state.query);
  if (state.sort !== 'kind') params.set('sort', state.sort);
  if (state.view !== 'grid') params.set('view', state.view);
  return params.size ? `?${params}` : '';
}
