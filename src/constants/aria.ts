export const ARIA_CURRENT = {
  TRUE: 'true',
  LOCATION: 'location',
} as const;

export type AriaCurrent = (typeof ARIA_CURRENT)[keyof typeof ARIA_CURRENT];
