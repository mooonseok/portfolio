export const ARIA_CURRENT = {
  TRUE: 'true',
  LOCATION: 'location',
} as const;

export type AriaCurrent = (typeof ARIA_CURRENT)[keyof typeof ARIA_CURRENT];

export const SELECT_KEY = {
  NEXT: 'ArrowRight',
  PREV: 'ArrowLeft',
  DOWN: 'ArrowDown',
  UP: 'ArrowUp',
  FIRST: 'Home',
  LAST: 'End',
} as const;

export type SelectKey = (typeof SELECT_KEY)[keyof typeof SELECT_KEY];

export const ORIENTATION = {
  HORIZONTAL: 'horizontal',
  VERTICAL: 'vertical',
} as const;

export type Orientation = (typeof ORIENTATION)[keyof typeof ORIENTATION];
