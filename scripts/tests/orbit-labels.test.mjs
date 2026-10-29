import assert from 'node:assert/strict';
import { test } from 'node:test';
import { overlaps, placeLabels } from '../../src/lib/orbit/place-labels.ts';

const pad = ([l, t, r, b]) => [l - 8, t - 8, r + 8, b + 8];

const phone = {
  width: 390,
  height: 844,
  vertical: true,
  moon: { x: 195, y: 302, r: 20 },
  blocks: [
    pad([20, 505, 370, 811]),
    pad([20, 64, 98, 108]),
    pad([0, 0, 390, 56]),
  ],
  margin: 8,
};

const items = [
  [247, 321, 20, -35.92, 98],
  [160, 372, 17, -35.09, 113],
  [89, 261, 14, -36.64, 113],
  [249, 197, 18, -38.32, 88],
].map(([sx, sy, reach, depth, width], index) => ({
  sx,
  sy,
  reach,
  depth,
  width,
  height: 26,
  active: index === 0,
  previous: null,
}));

test('phone labels all find a free spot without overlapping', () => {
  const spots = placeLabels(items, phone);
  assert.deepEqual(
    spots.map((spot) => spot.clash),
    [false, false, false, false]
  );
  const boxes = spots.map((spot, i) => [
    spot.x,
    spot.y,
    spot.x + items[i].width,
    spot.y + items[i].height,
  ]);
  for (let a = 0; a < boxes.length; a += 1)
    for (let b = a + 1; b < boxes.length; b += 1)
      assert.equal(overlaps(boxes[a], boxes[b]), false);
  for (const box of boxes)
    for (const block of phone.blocks) assert.equal(overlaps(box, block), false);
});

test('a label keeps its previous spot while it still fits', () => {
  const first = placeLabels(items, phone);
  const again = placeLabels(
    items.map((item, i) => ({ ...item, previous: first[i].candidate })),
    phone
  );
  assert.deepEqual(
    again.map((spot) => spot.candidate),
    first.map((spot) => spot.candidate)
  );
});

test('the active label is never hidden even with no free spot', () => {
  const crowded = { ...phone, blocks: [[0, 0, 390, 844]] };
  const spots = placeLabels(items, crowded);
  assert.equal(spots[0].clash, false);
  assert.equal(spots[1].clash, true);
});
