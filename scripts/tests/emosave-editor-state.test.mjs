import assert from 'node:assert/strict';
import { resolve } from 'node:path';
import { test } from 'node:test';
import * as THREE from 'three';
import { loadContent } from '../verification/content-loader.mjs';

const source = (path) =>
  loadContent(resolve(import.meta.dirname, '../../src', path));
const { createEditorSession, initialEditorState } = source(
  'lib/emosave-editor/state'
);
const { createEditorModel } = source('lib/emosave-editor/create-model');
const { disposeModel } = source('lib/diorama/create-model');
const { EDITOR } = source('constants/emosave-editor');

test('unselected commands do not move or rotate the house', () => {
  const changes = [];
  const session = createEditorSession((value) => changes.push(value));
  session.place({ x: 1, z: 1 });
  session.move(1, -1);
  session.rotate();
  assert.deepEqual(session.get(), initialEditorState());
  assert.equal(changes.length, 0);
});

test('placement and repeated directional movement stay bounded', () => {
  const session = createEditorSession(() => {});
  session.select(true);
  for (const x of [-1, 1]) {
    for (const z of [-1, 1]) {
      session.place({ x: x * 100, z: z * 100 });
      assert.equal(session.get().x, x * EDITOR.LIMIT);
      assert.equal(session.get().z, z * EDITOR.LIMIT);
      for (let i = 0; i < 20; i++) session.move(x, z);
      assert.equal(session.get().x, x * EDITOR.LIMIT);
      assert.equal(session.get().z, z * EDITOR.LIMIT);
    }
  }
  session.place({ x: 0, z: 0 });
  session.move(1, -1);
  assert.deepEqual(session.get(), {
    x: EDITOR.STEP,
    z: -EDITOR.STEP,
    turn: 0,
    selected: true,
  });
});

test('nonfinite placement never corrupts a valid editor state', () => {
  const changes = [];
  const session = createEditorSession((value) => changes.push(value));
  session.select(true);
  session.place({ x: 0.5, z: -0.5 });
  const saved = session.get();
  const count = changes.length;
  for (const value of [NaN, Infinity, -Infinity]) {
    session.place({ x: value, z: 0 });
    session.place({ x: 0, z: value });
  }
  assert.deepEqual(session.get(), saved);
  assert.equal(changes.length, count);
});

test('four rotations preserve placement and reset clears selection and turn', () => {
  const session = createEditorSession(() => {});
  session.select(true);
  session.place({ x: 1, z: -1 });
  const saved = session.get();
  for (let i = 1; i <= 4; i++) {
    session.rotate();
    assert.equal(session.get().turn, i % 4);
    assert.equal(session.get().x, saved.x);
    assert.equal(session.get().z, saved.z);
  }
  assert.deepEqual(session.get(), saved);
  session.rotate();
  session.reset();
  assert.deepEqual(session.get(), initialEditorState());
  session.reset();
  assert.deepEqual(session.get(), initialEditorState());
});

test('snapshots and notifications cannot mutate the internal state', () => {
  const changes = [];
  const session = createEditorSession((value) => changes.push(value));
  session.select(true);
  session.place({ x: 0.5, z: -0.5 });
  const saved = session.get();
  changes.at(-1).x = 99;
  session.get().z = 99;
  assert.deepEqual(session.get(), saved);
  session.move(1, 0);
  session.restore(saved);
  saved.x = 99;
  assert.equal(session.get().x, 0.5);
});

test('transient drag positions do not announce every pointer movement', () => {
  const changes = [];
  const session = createEditorSession((value, message) =>
    changes.push({ value, message })
  );
  session.select(true);
  changes.length = 0;
  session.place({ x: 0.5, z: 0 }, true);
  session.place({ x: 1, z: 0 }, true);
  assert.ok(changes.every(({ message }) => message === undefined));
  session.finish();
  assert.ok(changes.at(-1).message);
  assert.equal(changes.at(-1).value.x, 1);
});

test('actual house geometry stays on the ground at every corner and turn', () => {
  const { scene, house } = createEditorModel();
  try {
    for (const x of [-EDITOR.LIMIT, EDITOR.LIMIT]) {
      for (const z of [-EDITOR.LIMIT, EDITOR.LIMIT]) {
        for (let turn = 0; turn < 4; turn++) {
          house.position.set(x, 0, z);
          house.rotation.y = Math.PI / 4 + (turn * Math.PI) / 2;
          const bounds = new THREE.Box3().setFromObject(house, true);
          for (const axis of ['x', 'z']) {
            assert.ok(bounds.min[axis] >= -EDITOR.HALF_GROUND);
            assert.ok(bounds.max[axis] <= EDITOR.HALF_GROUND);
          }
        }
      }
    }
  } finally {
    disposeModel(scene);
  }
});
