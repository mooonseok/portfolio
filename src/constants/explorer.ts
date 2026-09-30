export const EXPLORER_MODE = {
  HOME: 'home',
  DETAIL: 'detail',
} as const;

export type ExplorerMode = (typeof EXPLORER_MODE)[keyof typeof EXPLORER_MODE];
