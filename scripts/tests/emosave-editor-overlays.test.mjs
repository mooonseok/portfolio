import assert from 'node:assert/strict';
import { test } from 'node:test';
import { dispatch, fixture } from './emosave-editor-fixture.mjs';

function setup(t) {
  const f = fixture();
  const stage = f.create();
  t.after(() => {
    stage.dispose();
    f.assertClean();
  });
  f.session.select('cloud');
  f.session.place({ x: 0.5, y: 0.5 });
  return { f, stage };
}
function handle(f, mode) {
  return f.overlays.find((node) => node.dataset.editorOverlay === mode);
}
function start(f, mode) {
  const target = handle(f, mode);
  f.emit('pointerdown', { ...f.point(0.65, 0.35), target });
  f.emit('pointermove', f.point(0.35, 0.65));
}

test('corner controls follow rotated scaled bounds, clamp and hide when unselected', (t) => {
  const { f } = setup(t);
  f.session.rotateTo(45);
  f.session.resizeTo(1.4);
  const offset = 0.14 * Math.sqrt(2) + 0.065;
  for (const [mode, dx, dy] of [
    ['rotate', 1, -1],
    ['resize', -1, 1],
    ['delete', -1, -1],
  ]) {
    const node = handle(f, mode);
    assert.equal(node.hidden, false);
    assert.ok(
      Math.abs(parseFloat(node.style.left) - (0.5 + dx * offset) * 100) < 1e-8
    );
    assert.ok(
      Math.abs(parseFloat(node.style.top) - (0.5 + dy * offset) * 100) < 1e-8
    );
  }
  f.session.place({ x: 0, y: 0 });
  for (const node of f.overlays)
    for (const axis of ['left', 'top'])
      assert.ok(
        parseFloat(node.style[axis]) >= 7 && parseFloat(node.style[axis]) <= 93
      );
  f.session.select(null);
  assert.ok(f.overlays.every((node) => node.hidden));
});

test('native rotate and resize controls resolve nested targets without HTMLElement globals', (t) => {
  const { f } = setup(t);
  for (const mode of ['rotate', 'resize']) {
    const target = {
      closest: (selector) =>
        selector === `[data-editor-${mode}]` ? handle(f, mode) : null,
    };
    f.emit('pointerdown', {
      ...f.point(0.65, 0.35),
      target,
      pointerType: 'touch',
    });
    f.emit('pointerup', { ...f.point(0.65, 0.35), pointerType: 'touch' });
    assert.equal(f.captures.size, 0);
  }
  assert.equal(f.session.get().items[0].angle, 15);
  assert.equal(f.session.get().items[0].scale, 1.1);
});

test('delete target never captures a pointer or triggers movement before its click', (t) => {
  const { f } = setup(t);
  const saved = f.session.get();
  const target = handle(f, 'delete');
  f.emit('pointerdown', { ...f.point(0.35, 0.35), target });
  assert.equal(f.captures.size, 0);
  f.emit('pointermove', f.point(0.7, 0.7));
  f.emit('pointerup', f.point(0.7, 0.7));
  assert.deepEqual(f.session.get(), saved);
  f.session.remove();
  assert.equal(f.nodes[0].hidden, true);
  assert.ok(f.overlays.every((node) => node.hidden));
});

test('paint finds nodes remounted by reset and hit area follows scale without selection enlargement', (t) => {
  const { f, stage } = setup(t);
  const old = f.nodes[0];
  f.session.remove();
  f.nodes.splice(0, 1);
  f.session.reset();
  const replacement = f.makeNode({ editorItem: 'cloud' });
  f.nodes.unshift(replacement);
  stage.paint(f.session.get());
  f.session.select('cloud');
  f.session.place({ x: 0.5, y: 0.5 });
  f.session.resizeTo(1.4);
  f.session.select(null);
  const transform = replacement.style.transform;
  f.emit('pointerdown', f.point(0.63, 0.5));
  f.emit('pointerup', f.point(0.63, 0.5));
  assert.equal(f.session.get().selectedId, 'cloud');
  assert.equal(replacement.style.transform, transform);
  assert.match(transform, /scale\(1.4\)/);
  assert.equal(old.hidden, true);
});

for (const mode of ['rotate', 'resize']) {
  for (const reason of [
    'pointercancel',
    'lostpointercapture',
    'blur',
    'scroll',
    'visibilitychange',
    'Escape',
  ]) {
    test(`${mode} handle ${reason} restores its full starting snapshot and releases capture`, (t) => {
      const { f } = setup(t);
      const saved = f.session.get();
      start(f, mode);
      if (reason === 'Escape') dispatch(f.window, 'keydown', { key: 'Escape' });
      else if (reason === 'visibilitychange') {
        f.document.hidden = true;
        dispatch(f.document, reason);
      } else if (reason === 'blur' || reason === 'scroll')
        dispatch(f.window, reason);
      else f.emit(reason);
      f.emit('pointerup', f.point(0.35, 0.65));
      assert.deepEqual(f.session.get(), saved);
      assert.equal(f.captures.size, 0);
    });
  }
}

test('empty dome and outside-dome host taps clear selection without crosshair', (t) => {
  const { f } = setup(t);
  const items = f.session.get().items;
  for (const [x, y] of [
    [0.5, 0.3],
    [0.02, 0.02],
  ]) {
    f.session.select('cloud');
    f.emit('pointermove', f.point(x, y));
    assert.equal(f.element.style.cursor, 'default');
    f.emit('pointerdown', f.point(x, y));
    f.emit('pointerup', f.point(x, y));
    assert.equal(f.session.get().selectedId, null);
    assert.deepEqual(f.session.get().items, items);
  }
});
