export const CASE_DEPTH = {
  L1: 1,
  L2: 2,
  L3: 3,
  L4: 4,
} as const;

export type CaseDepth = (typeof CASE_DEPTH)[keyof typeof CASE_DEPTH];

export const CASE_LAYOUT = {
  SPLIT: 'split',
  WIDE: 'wide',
  FREE: 'free',
} as const;

export type CaseLayout = (typeof CASE_LAYOUT)[keyof typeof CASE_LAYOUT];

export const CASE_SPACE = {
  SM: 120,
  MD: 160,
  LG: 200,
} as const;

export type CaseSpace = (typeof CASE_SPACE)[keyof typeof CASE_SPACE];

export const SURFACE_LABEL = {
  SURFACES: 'SURFACES',
  SURFACE: 'SURFACE',
} as const;

export type SurfaceLabel = (typeof SURFACE_LABEL)[keyof typeof SURFACE_LABEL];

export const TECH_COLS = {
  TWO: 2,
  THREE: 3,
} as const;

export type TechCols = (typeof TECH_COLS)[keyof typeof TECH_COLS];

export const GROUP_ID = {
  OVERVIEW: 'overview',
  SYSTEM: 'system',
  INTERACTION: 'interaction',
  WORK: 'work',
  ENGINEERING: 'engineering',
  CURRENT_STATE: 'current-state',
} as const;

export type GroupId = (typeof GROUP_ID)[keyof typeof GROUP_ID];

export const GROUP_LABEL = {
  [GROUP_ID.OVERVIEW]: 'Overview',
  [GROUP_ID.SYSTEM]: 'System',
  [GROUP_ID.INTERACTION]: 'Interaction',
  [GROUP_ID.WORK]: 'Work',
  [GROUP_ID.ENGINEERING]: 'Engineering',
  [GROUP_ID.CURRENT_STATE]: 'Current State',
} as const satisfies Record<GroupId, string>;
