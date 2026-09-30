export const EMO_STATE = {
  DEFAULT: 'default',
  SELECTED: 'selected',
  PLACED: 'placed',
} as const;

export type EmoState = (typeof EMO_STATE)[keyof typeof EMO_STATE];

export const SLOT_SHAPE = {
  ROUND: 'round',
  SQUARE: 'square',
  PILL: 'pill',
} as const;

export type SlotShape = (typeof SLOT_SHAPE)[keyof typeof SLOT_SHAPE];

export const SKETCH_SLOTS = [
  SLOT_SHAPE.ROUND,
  null,
  SLOT_SHAPE.PILL,
  null,
  null,
  SLOT_SHAPE.ROUND,
] as const;

export const SKETCH_TRAY = [
  SLOT_SHAPE.ROUND,
  SLOT_SHAPE.SQUARE,
  SLOT_SHAPE.PILL,
] as const;

export const SKETCH_PICK = 1;

export const SKETCH_DROP = 3;
