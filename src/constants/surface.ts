export const IB_SYSTEM = {
  ADMIN: 'ADMIN',
  API: 'API',
  APP: 'APP',
  DATA: 'DATA',
} as const;

export type IbSystem = (typeof IB_SYSTEM)[keyof typeof IB_SYSTEM];

export const IB_EDGE = {
  ADMIN_API: 'admin-api',
  APP_API: 'app-api',
  API_DATA: 'api-data',
} as const;

export type IbEdge = (typeof IB_EDGE)[keyof typeof IB_EDGE];
