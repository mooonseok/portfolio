import assert from 'node:assert/strict';
import { resolve } from 'node:path';
import { test } from 'node:test';
import { loadContent } from '../verification/content-loader.mjs';

const source = (path) =>
  loadContent(resolve(import.meta.dirname, '../../src', path));
const { createEditorSession } = source('lib/emosave-editor/state');
const { createEditorPointer } = source('lib/emosave-editor/pointer-controller');
const event = (values = {}) => ({
  pointerId: 1,
  pointerType: 'mouse',
  button: 0,
  isPrimary: true,
  clientX: 100,
  clientY: 100,
  ...values,
});
const hit = (x = 0.29, y = 0.61, item = 'cloud', inside = true) => ({
  point: { x, y },
  item,
  inside,
});
const setup = () => {
  const session = createEditorSession(() => {});
  return { session, pointer: createEditorPointer(session) };
};

test('small-jitter click selects an item without moving it or its peers', () => {
  const { session, pointer } = setup();
  const original = session.get().items;
  pointer.down(event(), hit());
  pointer.move(event({ clientX: 105 }), hit(0.36));
  pointer.up(event(), hit(0.36));
  assert.equal(session.get().selectedId, 'cloud');
  assert.deepEqual(session.get().items, original);
});

test('native non-enumerable pointer properties are retained through dragging', () => {
  const { session, pointer } = setup();
  const native = Object.create(event());
  assert.deepEqual(Object.keys(native), []);
  pointer.down(native, hit());
  pointer.move(Object.create(event({ clientX: 130 })), hit(0.45, 0.61, null));
  pointer.up(Object.create(event({ clientX: 130 })), hit(0.45, 0.61, null));
  assert.equal(session.get().selectedId, 'cloud');
  assert.ok(Math.abs(session.get().items[0].x - 0.45) < 1e-10);
});

test('empty host taps deselect without moving, including outside the dome', () => {
  const { session, pointer } = setup();
  const items = session.get().items;
  for (const target of [
    hit(0.5, 0.4, null),
    { ...hit(0.05, 0.05, null, false), withinStage: true },
  ]) {
    session.select('sprout');
    pointer.down(event(), target);
    pointer.up(event(), target);
    assert.equal(session.get().selectedId, null);
    assert.deepEqual(session.get().items, items);
  }
  session.select('cloud');
  pointer.down(event(), hit(0.5, 0.5, null));
  pointer.up(event(), hit(0.5, 0.5, 'sprout'));
  assert.equal(session.get().selectedId, 'cloud');
});

test('drag switches selection but preserves grab offset and every other item', () => {
  const { session, pointer } = setup();
  session.select('sprout');
  session.rotate(1);
  const before = session.get();
  pointer.down(event(), hit(0.4, 0.6));
  pointer.move(event({ clientX: 130 }), hit(0.5, 0.55, null));
  pointer.up(event({ clientX: 130 }), hit(0.5, 0.55, null));
  const committed = session.get();
  assert.equal(committed.selectedId, 'cloud');
  assert.ok(Math.abs(committed.items[0].x - 0.39) < 1e-10);
  assert.ok(Math.abs(committed.items[0].y - 0.56) < 1e-10);
  assert.deepEqual(committed.items.slice(1), before.items.slice(1));
  pointer.cancel();
  pointer.up(event(), hit());
  assert.deepEqual(session.get(), committed);
});

for (const outside of [null, hit(1, 1, null, false)]) {
  test(`outside release rolls back all items and previous selection: ${!!outside}`, () => {
    const { session, pointer } = setup();
    session.select('sprout');
    session.rotate(1);
    const saved = session.get();
    pointer.down(event(), hit());
    pointer.move(event({ clientX: 140 }), hit(0.6, 0.5, null));
    pointer.up(event({ clientX: 150 }), outside);
    assert.deepEqual(session.get(), saved);
  });
}

test('cancel restores initially unselected items and a new gesture still works', () => {
  const { session, pointer } = setup();
  const saved = session.get();
  pointer.down(event(), hit());
  pointer.move(event({ clientX: 130 }), hit(0.5, 0.5));
  assert.equal(session.get().selectedId, 'cloud');
  pointer.cancel();
  pointer.cancel();
  pointer.up(event(), hit(0.5, 0.5));
  assert.deepEqual(session.get(), saved);
  pointer.down(event(), hit());
  pointer.up(event(), hit());
  assert.equal(session.get().selectedId, 'cloud');
});

for (const pointerType of ['touch', 'pen']) {
  test(`${pointerType} scroll on an unselected item does not drag or become a tap`, () => {
    const { session, pointer } = setup();
    const touch = event({ pointerType });
    const saved = session.get();
    pointer.down(touch, hit());
    pointer.move({ ...touch, clientY: 150 }, hit(0.6, 0.7));
    pointer.move(touch, hit());
    pointer.up(touch, hit());
    assert.deepEqual(session.get(), saved);
  });
  test(`${pointerType} can drag only an already selected item and cancel it`, () => {
    const { session, pointer } = setup();
    const touch = event({ pointerType });
    pointer.down(touch, hit());
    pointer.up(touch, hit());
    const saved = session.get();
    pointer.down(touch, hit());
    pointer.move({ ...touch, clientY: 150 }, hit(0.5, 0.5));
    assert.equal(session.get().items[0].x, 0.5);
    pointer.cancel();
    pointer.up(touch, hit());
    assert.deepEqual(session.get(), saved);
  });
}

test('unrelated pointer events cannot end or redirect the current gesture', () => {
  const { session, pointer } = setup();
  pointer.down(event(), hit());
  pointer.move(event({ pointerId: 2, clientX: 160 }), hit(0.6, 0.7));
  pointer.up(event({ pointerId: 2 }), hit());
  assert.equal(session.get().selectedId, null);
  pointer.up(event(), hit());
  assert.equal(session.get().selectedId, 'cloud');
});

test('second touch invalidates the first tap and both later releases', () => {
  const { session, pointer } = setup();
  const touch = event({ pointerType: 'touch' });
  pointer.down(touch, hit());
  pointer.down({ ...touch, pointerId: 2, isPrimary: false }, hit());
  pointer.up(touch, hit());
  pointer.up({ ...touch, pointerId: 2 }, hit());
  assert.equal(session.get().selectedId, null);
});

test('secondary, invalid or outside starts and different-item releases do nothing', () => {
  const { session, pointer } = setup();
  for (const [input, target] of [
    [event({ button: 2 }), hit()],
    [event({ isPrimary: false }), hit()],
    [event(), null],
    [event(), hit(1, 1, null, false)],
    [event(), hit(NaN, 0.5)],
    [event(), hit(0.5, 0.5, 'unknown')],
  ]) {
    assert.equal(pointer.down(input, target), false);
    pointer.up(event(), hit());
    assert.equal(session.get().selectedId, null);
  }
  pointer.down(event(), hit());
  pointer.up(event(), hit(0.65, 0.65, 'sprout'));
  assert.equal(session.get().selectedId, null);
});
