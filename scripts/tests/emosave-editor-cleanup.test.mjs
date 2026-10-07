import assert from 'node:assert/strict';
import { test } from 'node:test';
import { fixture } from './emosave-editor-fixture.mjs';

const hit = { point: { x: 0.29, y: 0.61 }, item: 'cloud', inside: true };

test('repeated DOM input mount/dispose never retains listeners or capture', () => {
  const f = fixture();
  for (let index = 0; index < 10; index++) {
    const input = f.bind();
    f.emit('pointerdown', { hit });
    assert.equal(f.captures.size, 1);
    input.dispose();
    input.dispose();
    f.assertClean();
  }
});

test('pointer capture failure cancels the gesture before a stray release', () => {
  const f = fixture();
  const input = f.bind();
  f.failCapture();
  assert.doesNotThrow(() => f.emit('pointerdown', { hit }));
  f.emit('pointerup', { hit });
  assert.equal(f.session.get().selectedId, null);
  assert.equal(f.captures.size, 0);
  input.dispose();
  f.assertClean();
});

test('bubble disposal clears browser timeout and rejects queued or future work', () => {
  const f = fixture();
  const changes = [];
  const bubbles = f.bubbles((value) => changes.push(value));
  assert.equal(f.clock.pending.size, 1);
  const stale = f.clock.pending.values().next().value.callback;
  const count = changes.length;
  bubbles.dispose();
  bubbles.dispose();
  stale();
  bubbles.setPaused(false);
  bubbles.setEditing(false);
  bubbles.setVisible(true);
  assert.equal(changes.length, count);
  assert.equal(bubbles.get().itemId, null);
  f.assertClean();
});

test('recreating schedulers does not allow callbacks from prior instances', () => {
  const f = fixture();
  let notifications = 0;
  const stale = [];
  for (let index = 0; index < 10; index++) {
    const bubbles = f.bubbles(() => notifications++);
    stale.push(f.clock.pending.values().next().value.callback);
    bubbles.dispose();
    f.assertClean();
  }
  const count = notifications;
  stale.forEach((callback) => callback());
  assert.equal(notifications, count);
  f.assertClean();
});
