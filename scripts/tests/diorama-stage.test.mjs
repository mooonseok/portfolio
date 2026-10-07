import assert from 'node:assert/strict';
import { test } from 'node:test';
import { fixture } from './diorama-fixture.mjs';

test('initial resize failure releases the mounted canvas and resources', () => {
  const f = fixture('size');
  assert.throws(f.create, (error) => error === f.error);
  f.assertClean();
});

test('render failure reports fallback once and cancels further work', () => {
  const f = fixture('render');
  const stage = f.create();
  stage.setSelected('farmfam-plus');
  f.flush();
  assert.equal(f.counts.errors, 1);
  f.assertClean();
  stage.setSelected(null);
  stage.setReducedMotion(true);
  stage.dispose();
  f.flush();
  assert.equal(f.counts.errors, 1);
  f.assertClean();
});

test('context loss prevents default, reports fallback and removes its listener', () => {
  const f = fixture();
  const stage = f.create();
  const lost = new Event('webglcontextlost', { cancelable: true });
  f.canvas.dispatchEvent(lost);
  assert.equal(lost.defaultPrevented, true);
  assert.equal(f.counts.errors, 1);
  f.assertClean();
  f.canvas.dispatchEvent(new Event('webglcontextlost', { cancelable: true }));
  stage.dispose();
  f.flush();
  assert.equal(f.counts.errors, 1);
  f.assertClean();
});
