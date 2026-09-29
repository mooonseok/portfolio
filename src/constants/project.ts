export const PROJECT_SLUG = {
  FARMFAM_PLUS: 'farmfam-plus',
  APC: 'apc',
  SMART_FARM: 'smart-farm',
  INDIAN_BOB: 'indian-bob',
  EMOSAVE: 'emosave',
} as const;

export type ProjectSlug = (typeof PROJECT_SLUG)[keyof typeof PROJECT_SLUG];

export const PROJECT_TIER = {
  SELECTED: 'selected',
  FEATURED: 'featured',
} as const;

export type ProjectTier = (typeof PROJECT_TIER)[keyof typeof PROJECT_TIER];

export const CASE_LENGTH = {
  FULL: 'full',
  MEDIUM: 'medium',
  SHORT: 'short',
} as const;

export type CaseLength = (typeof CASE_LENGTH)[keyof typeof CASE_LENGTH];

export const WORK_TRACK = {
  MONITORING: 'monitoring',
  CONTROL: 'control',
} as const;

export type WorkTrack = (typeof WORK_TRACK)[keyof typeof WORK_TRACK];

export const DECISION_VARIANT = {
  DECISION: 'decision',
  ADOPTED: 'adopted',
  NOT_USED: 'not-used',
} as const;

export type DecisionVariant =
  (typeof DECISION_VARIANT)[keyof typeof DECISION_VARIANT];

export const STORY_KIND = {
  FLOW: 'flow',
  SEQUENCE: 'sequence',
  EXPERIMENT: 'experiment',
} as const;

export type StoryKind = (typeof STORY_KIND)[keyof typeof STORY_KIND];
