import assert from 'node:assert/strict';
import { test } from 'node:test';
import { dispatch, fixture } from './emosave-editor-fixture.mjs';

const hit = (x = 0.29, y = 0.61, item = 'cloud', inside = true) => ({
  point: { x, y },
  item,
  inside,
});
function setup(t) {
  const f = fixture();
  const input = f.bind();
  t.after(() => {
    input.dispose();
    input.dispose();
    f.assertClean();
  });
  return { f, input };
}
function drag(f) {
  f.emit('pointerdown', { hit: hit() });
  f.emit('pointermove', { clientX: 130, hit: hit(0.5, 0.5, null) });
}

test('normal capture release and synthetic click cannot undo committed movement', (t) => {
  const { f } = setup(t);
  drag(f);
  f.emit('pointerup', { clientX: 140, hit: hit(0.6, 0.5, null) });
  const committed = f.session.get();
  assert.ok(Math.abs(committed.items[0].x - 0.6) < 1e-10);
  assert.equal(f.captures.size, 0);
  const count = f.changes.length;
  f.emit('lostpointercapture');
  f.emit('click', { hit: hit() });
  f.emit('pointerup', { hit: hit() });
  assert.deepEqual(f.session.get(), committed);
  assert.equal(f.changes.length, count);
});

for (const reason of [
  'pointercancel',
  'lostpointercapture',
  'blur',
  'scroll',
  'visibilitychange',
  'Escape',
]) {
  test(`${reason} restores a complete multi-item snapshot and ignores late up`, (t) => {
    const { f } = setup(t);
    f.session.select('sprout');
    f.session.rotate(1);
    const saved = f.session.get();
    drag(f);
    assert.notDeepEqual(f.session.get(), saved);
    if (reason === 'Escape') {
      const event = dispatch(f.window, 'keydown', { key: 'Escape' });
      assert.equal(event.defaultPrevented, true);
    } else if (reason === 'visibilitychange') {
      f.document.hidden = true;
      dispatch(f.document, reason);
    } else if (reason === 'blur' || reason === 'scroll') {
      dispatch(f.window, reason);
    } else f.emit(reason);
    assert.deepEqual(f.session.get(), saved);
    assert.equal(f.captures.size, 0);
    const count = f.changes.length;
    f.emit('pointerup', { clientX: 140, hit: hit(0.6, 0.5, null) });
    assert.deepEqual(f.session.get(), saved);
    assert.equal(f.changes.length, count);
  });
}

test('unrelated pointer events and visible notifications leave the active drag intact', (t) => {
  const { f } = setup(t);
  drag(f);
  const pending = f.session.get();
  for (const type of [
    'pointermove',
    'pointerup',
    'pointercancel',
    'lostpointercapture',
  ])
    f.emit(type, { pointerId: 2, hit: hit() });
  dispatch(f.document, 'visibilitychange');
  assert.deepEqual(f.session.get(), pending);
  assert.ok(f.captures.has(1));
  f.emit('pointerup', { clientX: 130, hit: hit(0.5, 0.5, null) });
  assert.deepEqual(f.session.get(), pending);
  assert.equal(f.captures.size, 0);
});

test('scroll cancels a pending touch selection or placement without blocking scroll', (t) => {
  const { f } = setup(t);
  for (const selected of [null, 'cloud']) {
    f.session.select(selected);
    const saved = f.session.get();
    const target = hit(0.5, 0.5, selected ? null : 'cloud');
    const down = f.emit('pointerdown', { pointerType: 'touch', hit: target });
    dispatch(f.window, 'scroll');
    const up = f.emit('pointerup', { pointerType: 'touch', hit: target });
    assert.deepEqual(f.session.get(), saved);
    assert.equal(f.captures.size, 0);
    assert.equal(down.defaultPrevented || up.defaultPrevented, false);
  }
});

test('release displacement catches touch swipes when no move event was delivered', (t) => {
  const { f } = setup(t);
  for (const clientY of [140, 103]) {
    f.session.reset();
    f.emit('pointerdown', { pointerType: 'touch', hit: hit() });
    const up = f.emit('pointerup', {
      pointerType: 'touch',
      clientY,
      hit: hit(),
    });
    assert.equal(f.session.get().selectedId, clientY === 103 ? 'cloud' : null);
    assert.equal(up.defaultPrevented, false);
    assert.equal(f.captures.size, 0);
  }
});

test('a second pointer releases capture even when reported as primary', (t) => {
  const { f } = setup(t);
  for (const isPrimary of [false, true]) {
    f.emit('pointerdown', { pointerType: 'touch', hit: hit() });
    f.emit('pointerdown', {
      pointerType: 'touch',
      pointerId: 2,
      isPrimary,
      hit: hit(),
    });
    assert.equal(f.captures.size, 0);
    f.emit('pointerup', { pointerType: 'touch', hit: hit() });
    f.emit('pointerup', { pointerType: 'touch', pointerId: 2, hit: hit() });
    assert.equal(f.session.get().selectedId, null);
  }
});

test('cancel before reset or a selection change prevents late release mutations', (t) => {
  const { f, input } = setup(t);
  for (const command of [
    () => f.session.reset(),
    () => f.session.select('drop'),
  ]) {
    drag(f);
    input.cancel();
    command();
    const saved = f.session.get();
    const count = f.changes.length;
    f.emit('pointerup', { clientX: 140, hit: hit(0.6, 0.5, null) });
    f.emit('lostpointercapture');
    assert.deepEqual(f.session.get(), saved);
    assert.equal(f.changes.length, count);
  }
});

test('input disposal during drag rolls back and detaches every event listener', (t) => {
  const { f, input } = setup(t);
  const saved = f.session.get();
  drag(f);
  input.dispose();
  assert.deepEqual(f.session.get(), saved);
  f.assertClean();
  const count = f.changes.length;
  f.emit('pointerdown', { hit: hit() });
  f.emit('pointerup', { hit: hit() });
  dispatch(f.window, 'scroll');
  assert.equal(f.changes.length, count);
});

test('inactive Escape and page arrow keys are never intercepted', (t) => {
  const { f } = setup(t);
  for (const target of [f.window, f.document]) {
    for (const key of [
      'Escape',
      'ArrowLeft',
      'ArrowRight',
      'ArrowUp',
      'ArrowDown',
    ])
      assert.equal(
        dispatch(target, 'keydown', { key }).defaultPrevented,
        false
      );
  }
  assert.equal(f.changes.length, 0);
});
