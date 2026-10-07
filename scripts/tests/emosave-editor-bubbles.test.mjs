import assert from 'node:assert/strict';
import { resolve } from 'node:path';
import { test } from 'node:test';
import { loadContent } from '../verification/content-loader.mjs';
import { fakeClock } from './emosave-editor-fixture.mjs';

const source = (path) =>
  loadContent(resolve(import.meta.dirname, '../../src', path));
const { createEditorBubbles } = source('lib/emosave-editor/bubbles');
const { EDITOR } = source('constants/emosave-editor');
function setup(t, options = {}) {
  const clock = fakeClock();
  const changes = [];
  const bubbles = createEditorBubbles((value) => changes.push(value), {
    clock,
    ...options,
  });
  t.after(() => {
    bubbles.dispose();
    assert.equal(clock.pending.size, 0);
  });
  return { bubbles, clock, changes };
}

test('one bubble at a time cycles through all characters with a real empty gap', (t) => {
  const { bubbles, clock } = setup(t);
  for (const expected of ['cloud', 'sprout', 'drop', 'cloud']) {
    assert.deepEqual(bubbles.get(), { itemId: expected, paused: false });
    assert.equal(clock.tick(), EDITOR.BUBBLE_DURATION);
    assert.deepEqual(bubbles.get(), { itemId: null, paused: false });
    assert.equal(clock.tick(), EDITOR.BUBBLE_GAP);
  }
  assert.equal(clock.pending.size, 1);
});

test('explicit pause freezes visible content and survives editing and reset-equivalent cycles', (t) => {
  const { bubbles, clock } = setup(t);
  bubbles.setPaused(true);
  const frozen = bubbles.get();
  assert.equal(frozen.itemId, 'cloud');
  assert.equal(clock.pending.size, 0);
  for (let index = 0; index < 3; index++) {
    bubbles.setEditing(true);
    assert.deepEqual(bubbles.get(), { itemId: null, paused: true });
    bubbles.setVisible(false);
    bubbles.setEditing(false);
    assert.equal(bubbles.get().itemId, null);
    bubbles.setVisible(true);
    assert.deepEqual(bubbles.get(), frozen);
    assert.equal(clock.pending.size, 0);
  }
  bubbles.setPaused(false);
  assert.deepEqual(bubbles.get(), { itemId: 'cloud', paused: false });
  assert.equal(clock.pending.size, 1);
});

test('editing hides automatic content and restarts at the next gap without catch-up', (t) => {
  const { bubbles, clock } = setup(t);
  const stale = clock.pending.values().next().value.callback;
  bubbles.setEditing(true);
  assert.equal(clock.pending.size, 0);
  assert.equal(bubbles.get().itemId, null);
  stale();
  assert.equal(clock.pending.size, 0);
  bubbles.setEditing(false);
  assert.deepEqual(bubbles.get(), { itemId: null, paused: false });
  assert.equal(clock.tick(), EDITOR.BUBBLE_GAP);
  assert.equal(bubbles.get().itemId, 'sprout');
});

test('pause made during editing remains paused when editing ends', (t) => {
  const { bubbles, clock } = setup(t);
  bubbles.setEditing(true);
  bubbles.setPaused(true);
  bubbles.setEditing(false);
  assert.equal(bubbles.get().paused, true);
  assert.equal(clock.pending.size, 0);
  bubbles.setPaused(false);
  assert.equal(clock.tick(), EDITOR.BUBBLE_GAP);
  assert.equal(bubbles.get().itemId, 'sprout');
});

test('hidden tab or offscreen pause prevents overdue callbacks and preserves cycle order', (t) => {
  const { bubbles, clock, changes } = setup(t);
  const stale = clock.pending.values().next().value.callback;
  bubbles.setVisible(false);
  const count = changes.length;
  stale();
  stale();
  assert.equal(changes.length, count);
  assert.equal(clock.pending.size, 0);
  bubbles.setVisible(true);
  assert.equal(bubbles.get().itemId, null);
  assert.equal(clock.tick(), EDITOR.BUBBLE_GAP);
  assert.equal(bubbles.get().itemId, 'sprout');
  assert.equal(clock.pending.size, 1);
});

test('an initially hidden preview starts with the first character when visible', (t) => {
  const { bubbles, clock } = setup(t, { visible: false });
  assert.equal(bubbles.get().itemId, null);
  assert.equal(clock.pending.size, 0);
  bubbles.setVisible(true);
  assert.equal(clock.tick(), EDITOR.BUBBLE_GAP);
  assert.equal(bubbles.get().itemId, 'cloud');
});

test('visibility and selection cannot accidentally resume each other', (t) => {
  const { bubbles, clock } = setup(t);
  bubbles.setEditing(true);
  bubbles.setVisible(false);
  bubbles.setEditing(false);
  assert.equal(clock.pending.size, 0);
  bubbles.setEditing(true);
  bubbles.setVisible(true);
  assert.equal(clock.pending.size, 0);
  bubbles.setEditing(false);
  assert.equal(clock.pending.size, 1);
});

test('reduced-motion starts static but allows explicit playback', (t) => {
  const { bubbles, clock } = setup(t, { reducedMotion: true });
  assert.deepEqual(bubbles.get(), { itemId: 'cloud', paused: true });
  assert.equal(clock.pending.size, 0);
  bubbles.setVisible(false);
  bubbles.setVisible(true);
  assert.equal(clock.pending.size, 0);
  bubbles.setPaused(false);
  assert.equal(clock.tick(), EDITOR.BUBBLE_DURATION);
  assert.equal(bubbles.get().itemId, null);
});

test('no-op updates do not starve a timer or produce duplicate notifications', (t) => {
  const { bubbles, clock, changes } = setup(t);
  const timer = [...clock.pending.keys()];
  const count = changes.length;
  for (let index = 0; index < 10; index++) {
    bubbles.setPaused(false);
    bubbles.setVisible(true);
    bubbles.setEditing(false);
  }
  assert.deepEqual([...clock.pending.keys()], timer);
  assert.equal(changes.length, count);
  changes.at(-1).itemId = 'drop';
  bubbles.get().paused = true;
  assert.deepEqual(bubbles.get(), { itemId: 'cloud', paused: false });
});

test('pausing the gap and resuming never creates simultaneous timeout loops', (t) => {
  const { bubbles, clock } = setup(t);
  clock.tick();
  bubbles.setPaused(true);
  assert.deepEqual(bubbles.get(), { itemId: null, paused: true });
  assert.equal(clock.pending.size, 0);
  for (let index = 0; index < 20; index++) {
    bubbles.setPaused(false);
    assert.equal(clock.pending.size, 1);
    bubbles.setPaused(true);
    assert.equal(clock.pending.size, 0);
  }
  bubbles.setPaused(false);
  clock.tick();
  assert.equal(bubbles.get().itemId, 'sprout');
});

test('deleted characters leave the speech cycle and empty villages stop timers', (t) => {
  const { bubbles, clock } = setup(t);
  const stale = clock.pending.values().next().value.callback;
  bubbles.setItems(['sprout']);
  assert.equal(bubbles.get().itemId, null);
  stale();
  assert.equal(clock.pending.size, 1);
  clock.tick();
  assert.equal(bubbles.get().itemId, 'sprout');
  clock.tick();
  clock.tick();
  assert.equal(bubbles.get().itemId, 'sprout');
  bubbles.setItems([]);
  assert.equal(bubbles.get().itemId, null);
  assert.equal(clock.pending.size, 0);
  bubbles.setPaused(true);
  bubbles.setItems(['cloud', 'sprout', 'drop']);
  assert.equal(clock.pending.size, 0);
  bubbles.setPaused(false);
  clock.tick();
  assert.equal(bubbles.get().itemId, 'cloud');
});
