import assert from 'node:assert/strict';
import { test } from 'node:test';
import * as THREE from 'three';
import { dispatch, fixture } from './emosave-editor-fixture.mjs';

function setup(t) {
  const f = fixture();
  const stage = f.create();
  t.after(() => {
    stage.dispose();
    f.assertClean();
  });
  return { f, stage };
}
function screen(f, point) {
  const { camera } = f.flush();
  const projected = point.clone().project(camera);
  const rect = f.canvas.getBoundingClientRect();
  return {
    clientX: rect.left + ((projected.x + 1) * rect.width) / 2,
    clientY: rect.top + ((1 - projected.y) * rect.height) / 2,
  };
}

test('renders coalesce and no idle RAF remains after paint, hover or resize', (t) => {
  const { f, stage } = setup(t);
  assert.equal(f.pending(), 1);
  f.session.select(true);
  f.session.move(1, 0);
  f.session.rotate();
  assert.equal(f.pending(), 1);
  f.flush();
  assert.equal(f.counts.renders, 1);
  assert.equal(f.pending(), 0);
  f.emit('pointermove', { clientX: 400, clientY: 250 });
  assert.equal(f.pending(), 0);
  f.flush();
  assert.equal(f.counts.renders, 1);
  f.resize(500, 300);
  f.resize(600, 350);
  assert.equal(f.pending(), 1);
  f.flush();
  assert.equal(f.pending(), 0);
  assert.equal(f.counts.renders, 2);
  assert.equal(f.counts.pixelRatio, 2);
  assert.equal(f.attributes.get('aria-hidden'), 'true');
  assert.match(f.canvas.style.cssText, /touch-action:pan-y/);
  stage.dispose();
  stage.paint(f.session.get());
  f.resize(700, 400);
  assert.equal(f.pending(), 0);
});

test('hidden documents cancel RAF and resume with only one render', (t) => {
  const { f } = setup(t);
  f.document.hidden = true;
  dispatch(f.document, 'visibilitychange');
  f.session.select(true);
  f.session.move(1, 0);
  assert.equal(f.pending(), 0);
  f.flush();
  assert.equal(f.counts.renders, 0);
  f.document.hidden = false;
  dispatch(f.document, 'visibilitychange');
  assert.equal(f.pending(), 1);
  f.flush();
  assert.equal(f.counts.renders, 1);
  assert.equal(f.pending(), 0);
});

test('real raycasting selects the house and click-places on the ground', (t) => {
  const { f } = setup(t);
  const house = screen(f, new THREE.Vector3(0, 0.4, 0));
  f.emit('pointerdown', house);
  f.emit('pointerup', house);
  assert.equal(f.session.get().selected, true);
  const ground = screen(f, new THREE.Vector3(1.2, 0, 1.2));
  f.emit('pointerdown', ground);
  f.emit('pointerup', ground);
  assert.ok(Math.abs(f.session.get().x - 1.2) < 1e-6);
  assert.ok(Math.abs(f.session.get().z - 1.2) < 1e-6);
  f.flush();
  assert.equal(f.pending(), 0);
});

test('release outside the canvas restores the pre-drag pose', (t) => {
  const { f } = setup(t);
  f.session.select(true);
  const saved = f.session.get();
  const house = screen(f, new THREE.Vector3(0, 0.4, 0));
  f.emit('pointerdown', house);
  f.emit('pointermove', { clientX: 1000, clientY: 280 });
  assert.notDeepEqual(f.session.get(), saved);
  f.emit('pointerup', { clientX: 1000, clientY: 280 });
  assert.deepEqual(f.session.get(), saved);
  assert.equal(f.captures.size, 0);
});

test('resize cancels a drag and its late up cannot commit a stale position', (t) => {
  const { f } = setup(t);
  const saved = f.session.get();
  const house = screen(f, new THREE.Vector3(0, 0.4, 0));
  f.emit('pointerdown', house);
  f.emit('pointermove', {
    clientX: house.clientX + 70,
    clientY: house.clientY,
  });
  assert.notDeepEqual(f.session.get(), saved);
  f.resize(600, 350);
  assert.deepEqual(f.session.get(), saved);
  f.emit('pointerup', house);
  assert.deepEqual(f.session.get(), saved);
  assert.equal(f.captures.size, 0);
});

test('paint applies quarter turns and selection without rebuilding resources', (t) => {
  const { f } = setup(t);
  const resources = [...f.resources.keys()];
  f.session.select(true);
  f.session.place({ x: 1, z: -1 });
  for (let turn = 1; turn <= 4; turn++) {
    f.session.rotate();
    f.flush();
    const { house, ring } = f.model;
    assert.deepEqual(house.position.toArray(), [1, 0, -1]);
    assert.equal(house.rotation.y, Math.PI / 4 + ((turn % 4) * Math.PI) / 2);
    assert.equal(ring.visible, true);
    assert.deepEqual(ring.position.toArray(), [1, 0.008, -1]);
    assert.equal(f.pending(), 0);
  }
  f.session.reset();
  f.flush();
  assert.equal(f.model.ring.visible, false);
  assert.deepEqual(f.model.house.position.toArray(), [0, 0, 0]);
  assert.deepEqual([...f.resources.keys()], resources);
  assert.ok([...f.resources.values()].every((count) => count === 0));
});
