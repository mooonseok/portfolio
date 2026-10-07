export const EDITOR = {
  STEP: 0.035,
  ROTATION_STEP: 15,
  DRAG_THRESHOLD: 6,
  ITEM_WIDTH: 0.2,
  ITEM_HEIGHT: 0.2,
  MIN_SCALE: 0.75,
  MAX_SCALE: 1.6,
  SCALE_STEP: 0.1,
  DOME_LEFT: 0.12,
  DOME_RIGHT: 0.88,
  DOME_BOTTOM: 0.9,
  ARCH_X: 0.5,
  ARCH_Y: 0.4,
  ARCH_RADIUS_X: 0.38,
  ARCH_RADIUS_Y: 0.32,
  BUBBLE_DURATION: 3600,
  BUBBLE_GAP: 1400,
} as const;

export const EDITOR_GESTURE = {
  MOVE: 'move',
  ROTATE: 'rotate',
  RESIZE: 'resize',
} as const;

export const EDITOR_CHARACTER = {
  CLOUD: 'cloud',
  SPROUT: 'sprout',
  DROP: 'drop',
} as const;

export const EDITOR_CHARACTERS = [
  { id: EDITOR_CHARACTER.CLOUD, name: '구름이' },
  { id: EDITOR_CHARACTER.SPROUT, name: '새싹이' },
  { id: EDITOR_CHARACTER.DROP, name: '물방울이' },
] as const;

export const EDITOR_INITIAL_ITEMS = [
  { id: EDITOR_CHARACTER.CLOUD, x: 0.29, y: 0.61, angle: 0, scale: 1 },
  { id: EDITOR_CHARACTER.SPROUT, x: 0.71, y: 0.65, angle: 0, scale: 1 },
  { id: EDITOR_CHARACTER.DROP, x: 0.5, y: 0.74, angle: 0, scale: 1 },
] as const;

export const EDITOR_KEYS: Record<string, readonly [number, number]> = {
  ArrowLeft: [-1, 0],
  ArrowUp: [0, -1],
  ArrowDown: [0, 1],
  ArrowRight: [1, 0],
};
