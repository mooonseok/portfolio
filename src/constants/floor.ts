export const FLOOR = {
  APP: 'app',
  ADMIN: 'admin',
  API: 'api',
  DB: 'db',
  DEVICE: 'device',
} as const;

export type Floor = (typeof FLOOR)[keyof typeof FLOOR];

export const FLOORS = [
  FLOOR.APP,
  FLOOR.ADMIN,
  FLOOR.API,
  FLOOR.DB,
  FLOOR.DEVICE,
] as const;

export const FLOOR_LABEL = {
  [FLOOR.APP]: '앱',
  [FLOOR.ADMIN]: '관리자 웹',
  [FLOOR.API]: '서버 API',
  [FLOOR.DB]: 'DB',
  [FLOOR.DEVICE]: '기기',
} as const satisfies Record<Floor, string>;

export const FLOOR_SHORT = {
  [FLOOR.APP]: 'APP',
  [FLOOR.ADMIN]: 'WEB',
  [FLOOR.API]: 'API',
  [FLOOR.DB]: 'DB',
  [FLOOR.DEVICE]: 'DEV',
} as const satisfies Record<Floor, string>;

export const FLOOR_LEVEL = {
  [FLOOR.APP]: '4F',
  [FLOOR.ADMIN]: '3F',
  [FLOOR.API]: '2F',
  [FLOOR.DB]: '1F',
  [FLOOR.DEVICE]: 'B1',
} as const satisfies Record<Floor, string>;
