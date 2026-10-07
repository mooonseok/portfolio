import assert from 'node:assert/strict';
import { resolve } from 'node:path';
import { test } from 'node:test';
import { loadContent } from '../verification/content-loader.mjs';

const source = (path) =>
  loadContent(resolve(import.meta.dirname, '../../src', path));
const { createEditorSession } = source('lib/emosave-editor/state');
const { isInsideDome, isEditorItemInside } = source(
  'lib/emosave-editor/bounds'
);

function corners(item) {
  const angle = (item.angle * Math.PI) / 180;
  return [-0.1 * item.scale, 0.1 * item.scale].flatMap((dx) =>
    [-0.1 * item.scale, 0.1 * item.scale].map((dy) => ({
      x: item.x + dx * Math.cos(angle) - dy * Math.sin(angle),
      y: item.y + dx * Math.sin(angle) + dy * Math.cos(angle),
    }))
  );
}
function assertContained(item) {
  for (const { x, y } of corners(item)) {
    assert.ok(x >= 0.12 && x <= 0.88, `horizontal edge: ${x}`);
    assert.ok(y <= 0.9, `floor edge: ${y}`);
    if (y < 0.4)
      assert.ok(
        ((x - 0.5) / 0.38) ** 2 + ((y - 0.4) / 0.32) ** 2 <= 1,
        `arched edge: ${x}, ${y}`
      );
  }
}

test('dome excludes square top corners and accepts its lower sides', () => {
  assert.equal(isInsideDome({ x: 0.12, y: 0.08 }), false);
  assert.equal(isInsideDome({ x: 0.88, y: 0.08 }), false);
  assert.equal(isInsideDome({ x: 0.5, y: 0.081 }), true);
  assert.equal(isInsideDome({ x: 0.12, y: 0.8 }), true);
  for (const point of [
    { x: NaN, y: 0.5 },
    { x: 0.5, y: Infinity },
    { x: 0.5, y: -0.01 },
    { x: 0.5, y: 0.91 },
  ])
    assert.equal(isInsideDome(point), false);
});

test('every rotation and placement stays inside the arch, sides and floor', () => {
  const session = createEditorSession(() => {});
  session.select('cloud');
  for (let rotation = 0; rotation < 24; rotation++) {
    session.place({ x: 0.5, y: 0.5 });
    session.rotate(1);
    for (const x of [-1e200, 0.12, 0.35, 0.5, 0.75, 0.88, 1e200]) {
      for (const y of [-1e200, 0.08, 0.3, 0.4, 0.6, 0.9, 1e200]) {
        session.place({ x, y });
        assertContained(session.get().items[0]);
      }
    }
  }
});

test('many edge moves stay contained and can return inward immediately', () => {
  const session = createEditorSession(() => {});
  session.select('cloud');
  session.place({ x: 0.5, y: 0.5 });
  session.rotate(1);
  for (const [x, y] of [
    [-1, 0],
    [0, -1],
    [1, 0],
    [0, 1],
  ]) {
    for (let index = 0; index < 80; index++) session.move(x, y);
    const edge = session.get().items[0];
    assertContained(edge);
    session.move(-x, -y);
    const inward = session.get().items[0];
    assert.ok(Math.hypot(inward.x - edge.x, inward.y - edge.y) > 0.03);
    assertContained(inward);
  }
});

test('invalid boundary rotation gives feedback without moving the character', () => {
  const notices = [];
  const session = createEditorSession((_, message) => notices.push(message));
  session.select('cloud');
  session.place({ x: 0.12, y: 0.65 });
  const saved = session.get();
  session.rotate(1);
  assert.deepEqual(session.get(), saved);
  assert.match(notices.at(-1), /안쪽으로/);
  session.move(1, 0);
  session.rotate(1);
  assert.equal(session.get().items[0].angle, 15);
});

test('a centre inside the dome does not permit protruding corners', () => {
  const item = { id: 'cloud', x: 0.23, y: 0.5, angle: 45, scale: 1 };
  assert.equal(isInsideDome(item), true);
  assert.equal(isEditorItemInside(item), false);
  assert.equal(isEditorItemInside({ ...item, angle: 0 }), true);
});
