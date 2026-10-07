export const EDITOR = {
  HALF_GROUND: 2.5,
  LIMIT: 1.6,
  STEP: 0.35,
  DRAG_THRESHOLD: 6,
} as const;

export const EDITOR_MOVE = [
  { label: '왼쪽', x: -1, z: 0, angle: 180 },
  { label: '위', x: 0, z: -1, angle: -90 },
  { label: '아래', x: 0, z: 1, angle: 90 },
  { label: '오른쪽', x: 1, z: 0, angle: 0 },
] as const;

export const EDITOR_KEYS: Record<string, readonly [number, number]> = {
  ArrowLeft: [-1, 0],
  ArrowUp: [0, -1],
  ArrowDown: [0, 1],
  ArrowRight: [1, 0],
};

export const EDITOR_FRONT = [
  '오른쪽 아래',
  '오른쪽 위',
  '왼쪽 위',
  '왼쪽 아래',
] as const;
