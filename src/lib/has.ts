export const has = <T>(v: T[] | string | undefined | null): boolean =>
  Array.isArray(v)
    ? v.length > 0
    : typeof v === 'string'
      ? v.trim().length > 0
      : false;
