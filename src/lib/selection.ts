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
