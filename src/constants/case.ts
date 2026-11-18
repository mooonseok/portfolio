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
  [GROUP_ID.OVERVIEW]: '개요',
  [GROUP_ID.SYSTEM]: '기능 간 연결',
  [GROUP_ID.INTERACTION]: '편집 상태 예시',
  [GROUP_ID.WORK]: '담당 기능',
  [GROUP_ID.ENGINEERING]: '대표 구현 사례',
  [GROUP_ID.CURRENT_STATE]: '결과',
} as const satisfies Record<GroupId, string>;
