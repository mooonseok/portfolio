import assert from 'node:assert/strict';
import { resolve } from 'node:path';
import { test } from 'node:test';
import { loadContent } from '../verification/content-loader.mjs';

const source = (path) =>
  loadContent(resolve(import.meta.dirname, '../../src', path));
const { createEditorSession, initialEditorState } = source(
  'lib/emosave-editor/state'
);
const { isEditorItemInside } = source('lib/emosave-editor/bounds');
const setup = () => {
  const notices = [];
  return {
    notices,
    session: createEditorSession((value, message) =>
      notices.push({ value, message })
    ),
  };
};

test('selection never changes a character scale or placement, including an edge', () => {
  const { session } = setup();
  session.select('cloud');
  session.resizeTo(1.4);
  session.place({ x: 0, y: 0.6 });
  const saved = session.get().items;
  session.select(null);
  session.select('cloud');
  assert.deepEqual(session.get().items, saved);
  assert.ok(isEditorItemInside(saved[0]));
});

test('delete affects only the selection and stale restore cannot resurrect it', () => {
  const { session, notices } = setup();
  session.select('cloud');
  const saved = session.get();
  session.remove();
  assert.equal(session.get().selectedId, null);
  assert.deepEqual(session.get().items, saved.items.slice(1));
  assert.match(notices.at(-1).message, /삭제/);
  const deleted = session.get();
  session.restore(saved);
  session.select('cloud');
  session.rotateTo(90);
  session.resizeTo(1.5);
  session.remove();
  assert.deepEqual(session.get(), deleted);
});

test('empty editor is valid and reset alone restores every original character', () => {
  const { session } = setup();
  for (const id of ['cloud', 'sprout', 'drop']) {
    session.select(id);
    session.remove();
  }
  assert.deepEqual(session.get(), { items: [], selectedId: null });
  session.place({ x: 0.5, y: 0.5 });
  session.move(1, 0);
  session.rotate(1);
  session.resize(1);
  session.restore(initialEditorState());
  assert.equal(session.get().items.length, 0);
  session.reset();
  assert.deepEqual(session.get(), initialEditorState());
});

test('restore accepts a valid subset or empty set without sharing nested objects', () => {
  const { session } = setup();
  const saved = session.get();
  saved.items = [saved.items[1]];
  saved.selectedId = 'sprout';
  session.restore(saved);
  assert.deepEqual(session.get(), saved);
  saved.items[0].scale = 0;
  assert.equal(session.get().items[0].scale, 1);
  session.restore({ items: [], selectedId: null });
  assert.deepEqual(session.get(), { items: [], selectedId: null });
});

test('absolute rotation normalizes finite angles and keeps the centre fixed', () => {
  const { session } = setup();
  session.select('cloud');
  session.place({ x: 0.5, y: 0.5 });
  for (const [input, expected] of [
    [-15, 345],
    [735, 15],
    [-720, 0],
    [360, 0],
  ]) {
    session.rotateTo(input);
    const item = session.get().items[0];
    assert.equal(item.angle, expected);
    assert.equal(item.x, 0.5);
    assert.equal(item.y, 0.5);
  }
});

test('resize clamps to minimum and maximum while keeping every centre fixed', () => {
  const { session } = setup();
  session.select('cloud');
  session.place({ x: 0.5, y: 0.5 });
  const others = session.get().items.slice(1);
  for (const [input, expected] of [
    [10, 1.6],
    [-1, 0.75],
    [1.3, 1.3],
  ]) {
    session.resizeTo(input);
    const item = session.get().items[0];
    assert.equal(item.scale, expected);
    assert.equal(item.x, 0.5);
    assert.equal(item.y, 0.5);
    assert.deepEqual(session.get().items.slice(1), others);
  }
  session.resize(-1);
  assert.equal(session.get().items[0].scale, 1.2);
  session.resize(1);
  assert.equal(session.get().items[0].scale, 1.3);
});

test('rotated resize stops exactly at the dome boundary without moving the centre', () => {
  const { session } = setup();
  session.select('cloud');
  session.place({ x: 0.27, y: 0.55 });
  session.rotateTo(45);
  session.resizeTo(1.6);
  const item = session.get().items[0];
  assert.equal(item.x, 0.27);
  assert.equal(item.y, 0.55);
  assert.ok(item.scale > 1 && item.scale < 1.1);
  assert.ok(isEditorItemInside(item));
  assert.equal(
    isEditorItemInside({ ...item, scale: item.scale + 1e-8 }),
    false
  );
  session.resizeTo(0.8);
  assert.equal(session.get().items[0].scale, 0.8);
});

test('rotation cannot force a resized character through a boundary or move its centre', () => {
  const { session, notices } = setup();
  session.select('cloud');
  session.resizeTo(1.3);
  session.place({ x: 0, y: 0.55 });
  const saved = session.get();
  session.rotateTo(45);
  assert.deepEqual(session.get(), saved);
  assert.match(notices.at(-1).message, /안쪽으로/);
});

test('resize and rotation previews stay silent until the matching final notice', () => {
  const { session, notices } = setup();
  session.select('cloud');
  session.place({ x: 0.5, y: 0.5 });
  notices.length = 0;
  session.rotateTo(30, true);
  session.resizeTo(1.2, true);
  assert.ok(notices.every(({ message }) => message === undefined));
  session.finish('rotate');
  assert.match(notices.at(-1).message, /기울기/);
  session.finish('resize');
  assert.match(notices.at(-1).message, /크기/);
});

test('resize at a limit announces the constraint rather than a change', () => {
  const { session, notices } = setup();
  session.select('cloud');
  session.place({ x: 0.5, y: 0.5 });
  session.resizeTo(1.6);
  const saved = session.get();
  session.resize(1);
  assert.deepEqual(session.get(), saved);
  assert.match(notices.at(-1).message, /크기 제한에 도달/);
});
