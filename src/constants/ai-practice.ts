export const LOOP_DIR = {
  RIGHT: 'right',
  LEFT: 'left',
} as const;

export type LoopDir = (typeof LOOP_DIR)[keyof typeof LOOP_DIR];

export const AI_LOOP_COLS = 3;
export const AI_LOOP_TITLE_ID = 'ai-loop-title';
