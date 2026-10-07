import assert from 'node:assert/strict';
import { resolve } from 'node:path';
import { test } from 'node:test';
import { loadContent } from '../verification/content-loader.mjs';

const source = (path) =>
  loadContent(resolve(import.meta.dirname, '../../src', path));
const { createEditorSession } = source('lib/emosave-editor/state');
const { createEditorPointer } = source('lib/emosave-editor/pointer-controller');
const event = (x = 100, pointerType = 'mouse') => ({
  pointerId: 1,
  pointerType,
  button: 0,
  isPrimary: true,
  clientX: x,
  clientY: 100,
});
const hit = (x, y, mode = 'rotate', withinStage = true) => ({
  point: { x, y },
  item: 'cloud',
  mode,
  inside: true,
  withinStage,
});
function setup() {
  const changes = [];
  const session = createEditorSession((value, message) =>
    changes.push({ value, message })
  );
  session.select('cloud');
  session.place({ x: 0.5, y: 0.5 });
  const requested = [];
  const pointer = createEditorPointer({
    ...session,
    rotateTo: (angle, transient) => {
      requested.push(angle);
      session.rotateTo(angle, transient);
    },
  });
  return { session, pointer, requested, changes };
}
const around = (degrees) =>
  hit(
    0.5 + 0.2 * Math.cos((degrees * Math.PI) / 180),
    0.5 + 0.2 * Math.sin((degrees * Math.PI) / 180)
  );

for (const pointerType of ['mouse', 'touch', 'pen']) {
  test(`${pointerType} handle click rotates or resizes once without dragging`, () => {
    const { session, pointer } = setup();
    for (const mode of ['rotate', 'resize']) {
      const point = hit(0.65, 0.35, mode);
      pointer.down(event(100, pointerType), point);
      pointer.up(event(100, pointerType), point);
    }
    assert.equal(session.get().items[0].angle, 15);
    assert.equal(session.get().items[0].scale, 1.1);
  });
}

test('rotation is continuous across both ±180 seams and repeated full turns', () => {
  const { session, pointer, requested } = setup();
  session.rotateTo(45);
  pointer.down(event(), around(170));
  const angles = [190, 350, 370, 530, 550, 710, 730, 890, 1050, 910, 890];
  for (const [index, angle] of angles.entries()) {
    pointer.move(event(120 + index * 20), around(angle));
    assert.ok(Math.abs(requested.at(-1) - (45 + angle - 170)) < 1e-8);
  }
  pointer.up(event(400), around(890));
  assert.equal(session.get().items[0].x, 0.5);
  assert.equal(session.get().items[0].y, 0.5);
});

test('rotation ignores undefined centre direction and rejects nonfinite points', () => {
  const { pointer, session } = setup();
  pointer.down(event(), around(0));
  pointer.move(event(120), hit(0.5, 0.5));
  pointer.move(event(140), hit(NaN, 0.5));
  pointer.move(event(160), around(90));
  assert.equal(session.get().items[0].angle, 90);
  pointer.cancel();
  assert.equal(session.get().items[0].angle, 0);
});

for (const mode of ['rotate', 'resize']) {
  test(`${mode} release outside dome but within stage commits; outside stage cancels`, () => {
    const { pointer, session } = setup();
    pointer.down(event(), hit(0.6, 0.4, mode));
    const target = { ...hit(0.95, 0.05, mode), inside: false };
    pointer.move(event(150), target);
    pointer.up(event(150), target);
    const saved = session.get();
    pointer.down(event(), hit(0.6, 0.4, mode));
    pointer.move(event(160), hit(0.4, 0.7, mode));
    pointer.up(event(180), hit(1.1, 0.5, mode, false));
    assert.deepEqual(session.get(), saved);
  });
  test(`${mode} cancellation restores scale, angle, subset and selection`, () => {
    const { pointer, session } = setup();
    session.select('sprout');
    session.remove();
    session.select('cloud');
    session.rotateTo(30);
    session.resizeTo(1.2);
    const saved = session.get();
    pointer.down(event(), hit(0.65, 0.35, mode));
    pointer.move(event(140), hit(0.4, 0.7, mode));
    pointer.cancel();
    pointer.up(event(150), hit(0.4, 0.7, mode));
    assert.deepEqual(session.get(), saved);
  });
}

test('resize derives scale from original radius rather than compounding each move', () => {
  const { pointer, session } = setup();
  pointer.down(event(), hit(0.6, 0.6, 'resize'));
  for (const position of [0.61, 0.62, 0.63, 0.64])
    pointer.move(event(position * 1000), hit(position, position, 'resize'));
  assert.ok(Math.abs(session.get().items[0].scale - 1.4) < 1e-10);
  pointer.move(event(180), hit(0.53, 0.53, 'resize'));
  assert.equal(session.get().items[0].scale, 0.75);
  pointer.move(event(200), hit(0.9, 0.9, 'resize'));
  assert.equal(session.get().items[0].scale, 1.6);
  pointer.up(event(200), hit(0.9, 0.9, 'resize'));
});

test('no handle can operate an unselected or deleted character', () => {
  const { pointer, session } = setup();
  session.select(null);
  for (const mode of ['rotate', 'resize']) {
    assert.equal(pointer.down(event(), hit(0.65, 0.35, mode)), false);
    pointer.up(event(), hit(0.65, 0.35, mode));
  }
  session.select('cloud');
  session.remove();
  assert.equal(pointer.down(event(), hit(0.65, 0.35)), false);
  assert.equal(session.get().items.length, 2);
});
