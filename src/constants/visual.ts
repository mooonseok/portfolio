export const VISUAL_ID = {
  FARMFAM_HOME: 'farmfam-home',
  FARMFAM_HERO: 'farmfam-hero',
  FARMFAM_DETAIL: 'farmfam-detail',
  APC_HOME: 'apc-home',
  APC_HERO: 'apc-hero',
  SMART_HOME: 'smart-home',
  SMART_SENSOR: 'smart-sensor',
  SMART_EQUIPMENT: 'smart-equipment',
  SMART_HERO: 'smart-hero',
  SMART_MONITOR: 'smart-monitor',
  INDIANBOB_HOME: 'indianbob-home',
  INDIANBOB_APP: 'indianbob-app',
  INDIANBOB_ADMIN: 'indianbob-admin',
  EMOSAVE_HOME: 'emosave-home',
  EMOSAVE_MAIN: 'emosave-main',
  EMOSAVE_CUSTOM: 'emosave-custom',
  EMOSAVE_VILLAGE: 'emosave-village',
  EMOSAVE_STORE: 'emosave-store',
} as const;

export type VisualId = (typeof VISUAL_ID)[keyof typeof VISUAL_ID];

export const VISUAL_SLOT = {
  HOME: 'home',
  HERO: 'hero',
  DETAIL: 'detail',
  SENSOR: 'sensor',
  EQUIPMENT: 'equipment',
  MONITOR: 'monitor',
  APP: 'app',
  ADMIN: 'admin',
  MAIN: 'main',
  CUSTOM: 'custom',
  VILLAGE: 'village',
  STORE: 'store',
} as const;

export type VisualSlot = (typeof VISUAL_SLOT)[keyof typeof VISUAL_SLOT];

export const IMAGE_SIZES = {
  FULL: '(min-width: 1440px) 1440px, 100vw',
  HALF_DESKTOP: '(min-width: 1024px) 50vw, 100vw',
} as const;

export type ImageSizes = (typeof IMAGE_SIZES)[keyof typeof IMAGE_SIZES];
