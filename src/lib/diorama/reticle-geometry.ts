export const DIORAMA_RETICLE = { stroke: 1.5, gap: 10, arm: 12 } as const;

export type ReticleRect = readonly [number, number, number, number];

const CORNERS = [
  [-1, -1],
  [1, -1],
  [1, 1],
  [-1, 1],
] as const;

const rect = (ax: number, ay: number, bx: number, by: number): ReticleRect => [
  Math.min(ax, bx),
  Math.min(ay, by),
  Math.max(ax, bx),
  Math.max(ay, by),
];

export function reticleRects(
  halfWidth: number,
  halfHeight: number,
  arm: number,
  stroke: number
): ReticleRect[] {
  const half = stroke / 2;
  const armX = Math.min(arm, halfWidth);
  const armY = Math.min(arm, halfHeight);
  return CORNERS.flatMap(([sx, sy]) => {
    const x = sx * halfWidth;
    const y = sy * halfHeight;
    return [
      rect(x - sx * armX, y - half, x + sx * half, y + half),
      rect(x - half, y - sy * armY, x + half, y - sy * half),
    ];
  });
}

export function reticleFrame(
  halfWidth: number,
  halfHeight: number,
  pixelsPerUnit: number
): ReticleRect[] | null {
  if (!Number.isFinite(pixelsPerUnit) || pixelsPerUnit <= 0) return null;
  const unit = 1 / pixelsPerUnit;
  return reticleRects(
    halfWidth + DIORAMA_RETICLE.gap * unit,
    halfHeight + DIORAMA_RETICLE.gap * unit,
    DIORAMA_RETICLE.arm * unit,
    DIORAMA_RETICLE.stroke * unit
  );
}
