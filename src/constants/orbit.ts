export const ORBIT_SKIN = {
  SITE: 'site',
  TEXT: 'text',
  ALBUM: 'album',
  CANDLE: 'candle',
} as const;

export type OrbitSkin = (typeof ORBIT_SKIN)[keyof typeof ORBIT_SKIN];

export const ACTIVITY = {
  TAG: 'github-activity',
  REVALIDATE: 3600,
  WINDOW_DAYS: 30,
  COMMITS: 3,
  PROJECTS: 4,
  FETCH_COMMITS: 6,
  REPOS: 50,
} as const;

export const ORBIT = {
  PANEL_ID: 'orbit-panel',
  REDUCED: '(prefers-reduced-motion: reduce)',
  TALL: '(max-aspect-ratio: 3/4)',
  OPENER_KEY: 'pf-opener',
  HISTORY_HREF: '/portfolio',
} as const;
