export const pickValid = (
  ids: readonly string[],
  id: string | undefined
): string | undefined => (id !== undefined && ids.includes(id) ? id : ids[0]);

export const shiftSelection = (
  ids: readonly string[],
  current: string | undefined,
  delta: number
): string | undefined => {
  const n = ids.length;
  if (!n) return undefined;
  const from = current === undefined ? -1 : ids.indexOf(current);
  const base = from < 0 ? (delta > 0 ? -1 : 0) : from;
  return ids[(((base + delta) % n) + n) % n];
};

const stepRow = (
  ids: readonly string[],
  current: string | undefined,
  delta: number
): string | undefined => {
  const i = current === undefined ? -1 : ids.indexOf(current);
  if (i < 0) return ids[delta > 0 ? 0 : ids.length - 1];
  const next = i + delta;
  return next >= 0 && next < ids.length ? ids[next] : ids[i];
};

export const moveBy = (
  ids: readonly string[],
  current: string | undefined,
  dx: number,
  dy: number,
  cols: number
): string | undefined => {
  if (!ids.length) return undefined;
  if (dx) return cols > 1 ? shiftSelection(ids, current, dx) : undefined;
  if (!dy || cols >= ids.length) return undefined;
  return cols > 1
    ? stepRow(ids, current, dy * cols)
    : shiftSelection(ids, current, dy);
};

export interface Choice {
  open: string | null;
  last: string | undefined;
}

export const initialChoice = (ids: readonly string[]): Choice => ({
  open: ids[0] ?? null,
  last: ids[0],
});

export const pickChoice = (
  ids: readonly string[],
  c: Choice,
  id: string
): Choice => (ids.includes(id) ? { open: id, last: id } : c);

export const toggleChoice = (
  ids: readonly string[],
  c: Choice,
  id: string
): Choice =>
  c.open === id ? { open: null, last: c.last } : pickChoice(ids, c, id);

export const shownChoice = (
  ids: readonly string[],
  c: Choice
): string | undefined => pickValid(ids, c.open ?? c.last);

export const openChoice = (ids: readonly string[], c: Choice): string | null =>
  c.open !== null && ids.includes(c.open) ? c.open : null;
