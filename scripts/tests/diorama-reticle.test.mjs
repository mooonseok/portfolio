import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  DIORAMA_RETICLE,
  reticleFrame,
  reticleRects,
} from '../../src/lib/diorama/reticle-geometry.ts';

const area = ([x0, y0, x1, y1]) => (x1 - x0) * (y1 - y0);
const overlap = (a, b) =>
  Math.max(0, Math.min(a[2], b[2]) - Math.max(a[0], b[0])) *
  Math.max(0, Math.min(a[3], b[3]) - Math.max(a[1], b[1]));

test('four square corner brackets with a constant stroke and no overlap', () => {
  const rects = reticleRects(3, 2, 0.5, 0.1);
  assert.equal(rects.length, 8);
  for (const [x0, y0, x1, y1] of rects) {
    assert.ok(x1 > x0 && y1 > y0);
    assert.ok(Math.abs(Math.min(x1 - x0, y1 - y0) - 0.1) < 1e-9);
  }
  for (let i = 0; i < rects.length; i += 1)
    for (let j = i + 1; j < rects.length; j += 1)
      assert.equal(overlap(rects[i], rects[j]), 0);
  const total = rects.reduce((sum, rect) => sum + area(rect), 0);
  assert.ok(Math.abs(total - 4 * (0.5 * 0.1 + 0.5 * 0.1)) < 1e-9);
});

test('brackets sit on the frame corners and stay symmetric', () => {
  const rects = reticleRects(3, 2, 0.5, 0.1);
  const xs = rects.flatMap(([x0, , x1]) => [x0, x1]);
  const ys = rects.flatMap(([, y0, , y1]) => [y0, y1]);
  assert.ok(Math.abs(Math.max(...xs) - 3.05) < 1e-9);
  assert.ok(Math.abs(Math.min(...xs) + 3.05) < 1e-9);
  assert.ok(Math.abs(Math.max(...ys) - 2.05) < 1e-9);
  assert.ok(Math.abs(Math.min(...ys) + 2.05) < 1e-9);
});

test('arms never cross the middle of a small frame', () => {
  const rects = reticleRects(0.2, 0.1, 0.5, 0.02);
  for (const [x0, y0, x1, y1] of rects) {
    assert.ok(!(x0 < 0 && x1 > 0));
    assert.ok(!(y0 < 0 && y1 > 0));
  }
});

test('pixel sizes convert through the current scale', () => {
  const rects = reticleFrame(1, 1, 100);
  const stroke = DIORAMA_RETICLE.stroke / 100;
  const reach = 1 + DIORAMA_RETICLE.gap / 100 + stroke / 2;
  const xs = rects.flatMap(([x0, , x1]) => [x0, x1]);
  assert.ok(Math.abs(Math.max(...xs) - reach) < 1e-9);
  assert.ok(
    rects.every(
      ([x0, y0, x1, y1]) => Math.abs(Math.min(x1 - x0, y1 - y0) - stroke) < 1e-9
    )
  );
  assert.equal(reticleFrame(1, 1, 0), null);
  assert.equal(reticleFrame(1, 1, Number.NaN), null);
});
