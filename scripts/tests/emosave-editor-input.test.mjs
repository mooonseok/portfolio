import assert from 'node:assert/strict';
import { test } from 'node:test';
import { dispatch, fixture } from './emosave-editor-fixture.mjs';

const hit = (x = 0, z = 0, item = true, inside = true) => ({
  point: { x, z },
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
  f.emit('pointermove', { clientX: 130, hit: hit(1, 0.5, false) });
}

test('normal capture release and synthetic click do not undo a drag', (t) => {
  const { f } = setup(t);
  drag(f);
  f.emit('pointerup', { clientX: 140, hit: hit(1.25, 0.5, false) });
  const committed = f.session.get();
  assert.equal(committed.x, 1.25);
  assert.equal(f.captures.size, 0);
  const count = f.changes.length;
  f.emit('lostpointercapture');
  f.emit('click', { hit: hit(-1, -1, false) });
  f.emit('pointerup', { hit: hit(-1, -1, false) });
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
  test(`${reason} rolls back a drag and ignores the late up`, (t) => {
    const { f } = setup(t);
    f.session.select(true);
    f.session.rotate();
    f.session.place({ x: -0.5, z: 0.25 });
    const saved = f.session.get();
    drag(f);
    assert.notDeepEqual(f.session.get(), saved);
    if (reason === 'Escape') {
      dispatch(f.window, 'keydown', { key: 'Escape' });
      dispatch(f.document, 'keydown', { key: 'Escape' });
    } else if (reason === 'visibilitychange') {
      f.document.hidden = true;
      dispatch(f.document, reason);
    } else if (reason === 'blur' || reason === 'scroll') {
      dispatch(f.window, reason);
    } else {
      f.emit(reason);
    }
    assert.deepEqual(f.session.get(), saved);
    assert.equal(f.captures.size, 0);
    const count = f.changes.length;
    f.emit('pointerup', { clientX: 140, hit: hit(1.5, 1, false) });
    assert.deepEqual(f.session.get(), saved);
    assert.equal(f.changes.length, count);
  });
}

test('unrelated pointer events and visible notifications do not cancel', (t) => {
  const { f } = setup(t);
  drag(f);
  const pending = f.session.get();
  for (const type of [
    'pointermove',
    'pointerup',
    'pointercancel',
    'lostpointercapture',
  ]) {
    f.emit(type, { pointerId: 2, hit: hit(-1, -1, false) });
  }
  dispatch(f.document, 'visibilitychange');
  assert.deepEqual(f.session.get(), pending);
  assert.ok(f.captures.has(1));
  f.emit('pointerup', { clientX: 130, hit: hit(1, 0.5, false) });
  assert.deepEqual(f.session.get(), pending);
  assert.equal(f.captures.size, 0);
});

test('scroll cancels a pending touch tap without selecting or placing', (t) => {
  const { f } = setup(t);
  for (const selected of [false, true]) {
    f.session.select(selected);
    const saved = f.session.get();
    f.emit('pointerdown', {
      pointerType: 'touch',
      hit: hit(1, 1, !selected),
    });
    dispatch(f.window, 'scroll');
    f.emit('pointerup', {
      pointerType: 'touch',
      hit: hit(1, 1, !selected),
    });
    assert.deepEqual(f.session.get(), saved);
    assert.equal(f.captures.size, 0);
  }
});

test('pointerup displacement distinguishes touch swipe from small jitter', (t) => {
  const { f } = setup(t);
  for (const clientY of [140, 103]) {
    f.session.reset();
    const down = f.emit('pointerdown', {
      pointerType: 'touch',
      hit: hit(),
    });
    const up = f.emit('pointerup', {
      pointerType: 'touch',
      clientY,
      hit: hit(),
    });
    assert.equal(f.session.get().selected, clientY === 103);
    assert.equal(down.defaultPrevented, false);
    assert.equal(up.defaultPrevented, false);
    assert.equal(f.captures.size, 0);
  }
});

test('a second touch releases capture and invalidates both pending ups', (t) => {
  const { f } = setup(t);
  f.emit('pointerdown', { pointerType: 'touch', hit: hit() });
  f.emit('pointerdown', {
    pointerType: 'touch',
    pointerId: 2,
    isPrimary: false,
    hit: hit(),
  });
  assert.equal(f.captures.size, 0);
  f.emit('pointerup', { pointerType: 'touch', hit: hit() });
  f.emit('pointerup', {
    pointerType: 'touch',
    pointerId: 2,
    isPrimary: false,
    hit: hit(),
  });
  assert.equal(f.session.get().selected, false);
});

test('cancel before a control command prevents late up from undoing reset', (t) => {
  const { f, input } = setup(t);
  drag(f);
  input.cancel();
  f.session.reset();
  const reset = f.session.get();
  const count = f.changes.length;
  f.emit('pointerup', { clientX: 140, hit: hit(1.5, 1, false) });
  f.emit('lostpointercapture');
  assert.deepEqual(f.session.get(), reset);
  assert.equal(f.changes.length, count);
});

test('disposing during drag restores state and detaches every input listener', (t) => {
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

test('inactive Escape and page arrow keys are not intercepted by canvas input', (t) => {
  const { f } = setup(t);
  const count = f.changes.length;
  for (const target of [f.window, f.document]) {
    for (const key of [
      'Escape',
      'ArrowLeft',
      'ArrowRight',
      'ArrowUp',
      'ArrowDown',
    ]) {
      const event = dispatch(target, 'keydown', { key });
      assert.equal(event.defaultPrevented, false);
    }
  }
  assert.equal(f.changes.length, count);
});
