export const AI_CHECK_KIND = {
  GUIDE: 'guide',
  DECISION: 'decision',
  HOOK: 'hook',
  CHECK: 'check',
  REVIEW: 'review',
  FEEDBACK: 'feedback',
} as const;

export type AiCheckKind = (typeof AI_CHECK_KIND)[keyof typeof AI_CHECK_KIND];

export const AI_CHECK_LABEL = {
  [AI_CHECK_KIND.GUIDE]: 'GUIDE',
  [AI_CHECK_KIND.DECISION]: 'DECISION',
  [AI_CHECK_KIND.HOOK]: 'HOOK',
  [AI_CHECK_KIND.CHECK]: 'CHECK',
  [AI_CHECK_KIND.REVIEW]: 'REVIEW',
  [AI_CHECK_KIND.FEEDBACK]: 'FEEDBACK',
} as const satisfies Record<AiCheckKind, string>;

export const LOOP_DIR = {
  RIGHT: 'right',
  LEFT: 'left',
} as const;

export type LoopDir = (typeof LOOP_DIR)[keyof typeof LOOP_DIR];

export const AI_LOOP_COLS = 3;
export const AI_LOOP_TITLE_ID = 'ai-loop-title';
