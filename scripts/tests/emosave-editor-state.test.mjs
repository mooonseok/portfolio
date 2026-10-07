import assert from 'node:assert/strict';
import { resolve } from 'node:path';
import { test } from 'node:test';
import { loadContent } from '../verification/content-loader.mjs';

const source = (path) =>
  loadContent(resolve(import.meta.dirname, '../../src', path));
const { createEditorSession, initialEditorState } = source(
  'lib/emosave-editor/state'
);
const { EDITOR, EDITOR_CHARACTERS } = source('constants/emosave-editor');
const item = (session, id = 'cloud') =>
  session.get().items.find((value) => value.id === id);

function setup() {
  const changes = [];
  const session = createEditorSession((value, message) =>
    changes.push({ value, message })
  );
  return { session, changes };
}

test('unselected commands and unknown selections leave all characters alone', () => {
  const { session, changes } = setup();
  session.place({ x: 0.5, y: 0.5 });
  session.move(1, -1);
  session.rotate(1);
  session.resize(1);
  session.resizeTo(1.4);
  session.rotateTo(90);
  session.remove();
  session.select('unknown');
  session.finish();
  assert.deepEqual(session.get(), initialEditorState());
  assert.equal(changes.length, 0);
});

test('each selected character moves and rotates without modifying its peers', () => {
  const { session } = setup();
  for (const { id } of EDITOR_CHARACTERS) {
    const others = session.get().items.filter((value) => value.id !== id);
    session.select(id);
    session.place({ x: 0.5, y: 0.5 });
    session.move(1, -1);
    session.rotate(-1);
    assert.deepEqual(item(session, id), {
      id,
      x: 0.5 + EDITOR.STEP,
      y: 0.5 - EDITOR.STEP,
      angle: 345,
      scale: 1,
    });
    assert.deepEqual(
      session.get().items.filter((value) => value.id !== id),
      others
    );
  }
});

test('nonfinite inputs cannot poison valid positions or rotations', () => {
  const { session, changes } = setup();
  session.select('cloud');
  const saved = session.get();
  const count = changes.length;
  for (const value of [NaN, Infinity, -Infinity]) {
    session.place({ x: value, y: 0.5 });
    session.place({ x: 0.5, y: value });
    session.move(value, 0);
    session.move(0, value);
    session.rotate(value);
    session.rotateTo(value);
    session.resizeTo(value);
    session.resize(value);
  }
  session.rotate(0);
  session.rotate(2);
  assert.deepEqual(session.get(), saved);
  assert.equal(changes.length, count);
});

test('full rotations preserve every initial position and reset all items repeatedly', () => {
  const { session } = setup();
  for (const { id } of EDITOR_CHARACTERS) {
    session.select(id);
    const saved = session.get();
    for (let index = 0; index < 24; index++) session.rotate(1);
    assert.deepEqual(session.get(), saved);
    session.rotate(-1);
    assert.equal(item(session, id).angle, 345);
  }
  for (let index = 0; index < 3; index++) {
    session.reset();
    assert.deepEqual(session.get(), initialEditorState());
  }
});

test('snapshots and notifications are deep copies, including after restore', () => {
  const { session, changes } = setup();
  session.select('sprout');
  const saved = session.get();
  changes.at(-1).value.items[1].x = 99;
  session.get().items.splice(0, 1);
  initialEditorState().items[0].x = 99;
  assert.deepEqual(session.get(), saved);
  session.move(1, 0);
  session.restore(saved);
  saved.items[1].x = 99;
  saved.selectedId = null;
  assert.equal(item(session, 'sprout').x, 0.71);
  assert.equal(session.get().selectedId, 'sprout');
});

test('restore rejects duplicate, unknown, invalid or out-of-dome items', () => {
  const { session } = setup();
  const saved = session.get();
  const invalid = [
    (value) => (value.items[0].id = 'sprout'),
    (value) => (value.items[0].id = 'unknown'),
    (value) => (value.items[0].scale = 0),
    (value) => (value.items[0].x = NaN),
    (value) => (value.items[1].angle = Infinity),
    (value) => (value.items[0].y = 0),
    (value) => (value.selectedId = 'unknown'),
  ];
  for (const mutate of invalid) {
    const candidate = session.get();
    mutate(candidate);
    session.restore(candidate);
    assert.deepEqual(session.get(), saved);
  }
});

test('transient positions are silent and selection/finish announce once', () => {
  const { session, changes } = setup();
  session.select('cloud');
  assert.match(changes.at(-1).message, /구름이/);
  session.select('cloud');
  assert.equal(changes.length, 1);
  changes.length = 0;
  session.place({ x: 0.5, y: 0.5 }, true);
  session.place({ x: 0.6, y: 0.5 }, true);
  assert.ok(changes.every(({ message }) => message === undefined));
  session.finish();
  assert.equal(changes.filter(({ message }) => message).length, 1);
  session.select(null);
  assert.equal(session.get().selectedId, null);
  assert.ok(changes.at(-1).message);
});
