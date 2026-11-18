export const AI_LOOP_TITLE_ID = 'ai-loop-title';

export const PLAZA_EXAMPLE = {
  OVERLAP: 'overlap',
  FIXED: 'fixed',
} as const;

export type PlazaExampleState =
  (typeof PLAZA_EXAMPLE)[keyof typeof PLAZA_EXAMPLE];
