export const BREAKPOINT = {
  ALL: 'all',
  TABLET: 'tablet',
  DESKTOP: 'desktop',
} as const;

export type Breakpoint = (typeof BREAKPOINT)[keyof typeof BREAKPOINT];

export type RailFrom = typeof BREAKPOINT.TABLET | typeof BREAKPOINT.DESKTOP;

export type LabelFrom = typeof BREAKPOINT.ALL | typeof BREAKPOINT.DESKTOP;

export const MEDIA = {
  MOBILE: '(max-width: 743px)',
  TABLET_UP: '(min-width: 744px)',
  REDUCED_MOTION: '(prefers-reduced-motion: reduce)',
  FINE_MOTION:
    '(hover: hover) and (pointer: fine) and (min-width: 1024px) and (prefers-reduced-motion: no-preference)',
} as const;

export type MediaQuery = (typeof MEDIA)[keyof typeof MEDIA];
