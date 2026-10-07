import assert from 'node:assert/strict';
import { resolve } from 'node:path';
import { test } from 'node:test';
import { loadContent } from '../verification/content-loader.mjs';

const source = (path) =>
  loadContent(resolve(import.meta.dirname, '../../src', path));
const { createEditorSession } = source('lib/emosave-editor/state');
const { createEditorPointer } = source('lib/emosave-editor/pointer-controller');
const { EDITOR } = source('constants/emosave-editor');
const event = (values = {}) => ({
  pointerId: 1,
  pointerType: 'mouse',
  button: 0,
  isPrimary: true,
  clientX: 100,
  clientY: 100,
  ...values,
});
const hit = (x = 0, z = 0, item = true, inside = true) => ({
  point: { x, z },
  item,
  inside,
});
const setup = () => {
  const session = createEditorSession(() => {});
  return { session, pointer: createEditorPointer(session) };
};

test('a house click with small jitter selects without moving', () => {
  const { session, pointer } = setup();
  pointer.down(event(), hit());
  pointer.move(event({ clientX: 100 + EDITOR.DRAG_THRESHOLD }), hit(0.1));
  pointer.up(event(), hit(0.1));
  assert.deepEqual(session.get(), { x: 0, z: 0, turn: 0, selected: true });
});

test('empty-ground click placement requires an existing selection', () => {
  const { session, pointer } = setup();
  for (const selected of [false, true]) {
    session.select(selected);
    pointer.down(event(), hit(1, -1, false));
    pointer.up(event(), hit(1, -1, false));
    assert.equal(session.get().x, selected ? 1 : 0);
    assert.equal(session.get().z, selected ? -1 : 0);
  }
});

test('mouse dragging preserves the grab offset and commits once', () => {
  const { session, pointer } = setup();
  session.select(true);
  session.place({ x: 0.5, z: -0.5 });
  pointer.down(event(), hit(0.75, -0.25));
  pointer.move(event({ clientX: 120 }), hit(1, 0.25, false));
  pointer.up(event({ clientX: 120 }), hit(1, 0.25, false));
  const saved = session.get();
  assert.deepEqual(saved, { x: 0.75, z: 0, turn: 0, selected: true });
  pointer.cancel();
  pointer.up(event(), hit(-1, -1, false));
  assert.deepEqual(session.get(), saved);
});

for (const outside of [null, hit(10, 10, false, false)]) {
  test(`invalid drag release restores the full snapshot: ${!!outside}`, () => {
    const { session, pointer } = setup();
    session.select(true);
    session.rotate();
    session.place({ x: 0.5, z: 0.5 });
    const saved = session.get();
    pointer.down(event(), hit());
    pointer.move(event({ clientX: 120 }), hit(1, 1));
    pointer.up(event({ clientX: 140 }), outside);
    assert.deepEqual(session.get(), saved);
  });
}

test('cancel restores an initially unselected house and ignores late up', () => {
  const { session, pointer } = setup();
  const saved = session.get();
  pointer.down(event(), hit());
  pointer.move(event({ clientX: 120 }), hit(1, 1));
  assert.equal(session.get().selected, true);
  pointer.cancel();
  pointer.cancel();
  pointer.up(event(), hit(1, 1));
  assert.deepEqual(session.get(), saved);
  pointer.down(event(), hit());
  pointer.up(event(), hit());
  assert.equal(session.get().selected, true);
});

test('touch taps select then place; a swipe returning to its start is no tap', () => {
  const { session, pointer } = setup();
  const touch = event({ pointerType: 'touch' });
  pointer.down(touch, hit());
  pointer.up(touch, hit());
  pointer.down(touch, hit(0.5, 0.5, false));
  pointer.up(touch, hit(0.5, 0.5, false));
  const saved = session.get();
  for (const item of [true, false]) {
    pointer.down(touch, hit(0.5, 0.5, item));
    pointer.move({ ...touch, clientY: 150 }, hit(1, 1, item));
    pointer.move(touch, hit(0.5, 0.5, item));
    pointer.up(touch, hit(0.5, 0.5, item));
    assert.deepEqual(session.get(), saved);
  }
});

test('unrelated move and up cannot hijack or end an active gesture', () => {
  const { session, pointer } = setup();
  pointer.down(event(), hit());
  pointer.move(event({ pointerId: 2, clientX: 160 }), hit(1, 1));
  pointer.up(event({ pointerId: 2 }), hit());
  assert.equal(session.get().selected, false);
  pointer.up(event(), hit());
  assert.equal(session.get().selected, true);
});

test('a second touch cancels the first gesture without a late selection', () => {
  const { session, pointer } = setup();
  const touch = event({ pointerType: 'touch' });
  pointer.down(touch, hit());
  pointer.down({ ...touch, pointerId: 2, isPrimary: false }, hit());
  pointer.up(touch, hit());
  assert.equal(session.get().selected, false);
});

test('right button, nonprimary pointer and outside starts are ignored', () => {
  const { session, pointer } = setup();
  for (const [input, target] of [
    [event({ button: 2 }), hit()],
    [event({ isPrimary: false }), hit()],
    [event(), null],
    [event(), hit(10, 10, false, false)],
  ]) {
    assert.equal(pointer.down(input, target), false);
    pointer.up(event(), hit());
    assert.equal(session.get().selected, false);
  }
});
