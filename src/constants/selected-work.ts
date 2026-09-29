import { PROJECT_SLUG } from '@/constants/project';

export const MONITOR_KEY = {
  TEMP: 'TEMP',
  HUMIDITY: 'HUMIDITY',
  SOIL: 'SOIL',
} as const;

export type MonitorKey = (typeof MONITOR_KEY)[keyof typeof MONITOR_KEY];

export const MONITOR_ROWS = [
  { key: MONITOR_KEY.TEMP, desktopOnly: false },
  { key: MONITOR_KEY.HUMIDITY, desktopOnly: false },
  { key: MONITOR_KEY.SOIL, desktopOnly: true },
] as const;

export const SELECTED_SLUGS = [
  PROJECT_SLUG.FARMFAM_PLUS,
  PROJECT_SLUG.APC,
  PROJECT_SLUG.SMART_FARM,
] as const;
