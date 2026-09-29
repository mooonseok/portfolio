export const NAV_ID = {
  WORK: 'work',
  EXPERIENCE: 'experience',
  ABOUT: 'about',
  CONTACT: 'contact',
} as const;

export type NavId = (typeof NAV_ID)[keyof typeof NAV_ID];

export const NAV_LABEL = {
  [NAV_ID.WORK]: 'WORK',
  [NAV_ID.EXPERIENCE]: 'EXPERIENCE',
  [NAV_ID.ABOUT]: 'ABOUT',
  [NAV_ID.CONTACT]: 'CONTACT',
} as const satisfies Record<NavId, string>;

export const NAV_SPY = [NAV_ID.WORK, NAV_ID.EXPERIENCE, NAV_ID.ABOUT] as const;
