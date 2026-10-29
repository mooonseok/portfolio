export const NAV_ID = {
  ACTIVITY: 'activity',
  HISTORY: 'history',
  WORK: 'work',
  ABOUT: 'about',
  AI: 'ai',
  CONTACT: 'contact',
} as const;

export type NavId = (typeof NAV_ID)[keyof typeof NAV_ID];

export const NAV_LABEL = {
  [NAV_ID.ACTIVITY]: '작업 현황',
  [NAV_ID.HISTORY]: '이력',
  [NAV_ID.WORK]: '프로젝트',
  [NAV_ID.ABOUT]: '소개',
  [NAV_ID.AI]: 'AI 활용',
  [NAV_ID.CONTACT]: '연락',
} as const satisfies Record<NavId, string>;

export const NAV_SPY = [NAV_ID.WORK] as const;

export const ROUTE = {
  HOME: '/',
  HISTORY: '/portfolio',
  AI_PRACTICE: '/ai',
} as const;
