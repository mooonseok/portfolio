import assert from 'node:assert/strict';
import { test } from 'node:test';
import { fixture } from './emosave-editor-fixture.mjs';

function setup(t) {
  const f = fixture();
  const stage = f.create();
  t.after(() => {
    stage.dispose();
    stage.dispose();
    f.assertClean();
  });
  return f;
}
function tap(f, x, y, values = {}) {
  const event = { ...f.point(x, y), ...values };
  f.emit('pointerdown', event);
  f.emit('pointerup', event);
}
function node(f, id) {
  return f.nodes.find((value) => value.dataset.editorItem === id);
}

test('DOM paint aligns selected state, centre anchor, rotation and coordinates', (t) => {
  const f = setup(t);
  f.session.select('cloud');
  f.session.place({ x: 0.5, y: 0.5 });
  f.session.rotate(-1);
  const cloud = node(f, 'cloud');
  assert.equal(cloud.style.left, '50%');
  assert.equal(cloud.style.top, '50%');
  assert.equal(
    cloud.style.transform,
    'translate(-50%, -50%) rotate(345deg) scale(1)'
  );
  assert.equal(cloud.style.zIndex, '10');
  assert.equal(cloud.getAttribute('aria-pressed'), 'true');
  assert.equal(node(f, 'sprout').getAttribute('aria-pressed'), 'false');
  f.session.select(null);
  assert.equal(cloud.style.zIndex, '1');
  assert.equal(cloud.getAttribute('aria-pressed'), 'false');
});

test('overlapping hit order matches temporary selection and restores normal order', (t) => {
  const f = setup(t);
  for (const id of ['cloud', 'sprout', 'drop']) {
    f.session.select(id);
    f.session.place({ x: 0.5, y: 0.5 });
  }
  f.session.select(null);
  tap(f, 0.5, 0.5);
  assert.equal(f.session.get().selectedId, 'drop');
  f.session.select('cloud');
  tap(f, 0.5, 0.5);
  assert.equal(f.session.get().selectedId, 'cloud');
  assert.equal(node(f, 'cloud').style.zIndex, '10');
  f.session.select('sprout');
  tap(f, 0.5, 0.5);
  assert.equal(f.session.get().selectedId, 'sprout');
  f.session.select(null);
  assert.deepEqual(
    f.nodes.map((value) => value.style.zIndex),
    ['1', '2', '3']
  );
  tap(f, 0.5, 0.5);
  assert.equal(f.session.get().selectedId, 'drop');
});

test('rotated-square hit uses the visible orientation rather than its old box', (t) => {
  const f = setup(t);
  f.session.select('cloud');
  f.session.place({ x: 0.5, y: 0.5 });
  for (let index = 0; index < 3; index++) f.session.rotate(1);
  f.session.select(null);
  tap(f, 0.62, 0.5);
  assert.equal(f.session.get().selectedId, 'cloud');
  f.session.select(null);
  tap(f, 0.59, 0.59);
  assert.equal(f.session.get().selectedId, null);
});

test('normalized hits track resizing and page position at all required widths', (t) => {
  const f = setup(t);
  for (const width of [390, 744, 1024, 1440]) {
    Object.assign(f.rect, { width, height: width, left: 137, top: 83 });
    f.session.reset();
    const cloud = f.session.get().items[0];
    tap(f, cloud.x, cloud.y, { pointerType: 'touch' });
    assert.equal(f.session.get().selectedId, 'cloud');
    f.emit('pointerdown', {
      ...f.point(cloud.x, cloud.y),
      pointerType: 'touch',
    });
    f.emit('pointermove', { ...f.point(0.5, 0.5), pointerType: 'touch' });
    f.emit('pointerup', { ...f.point(0.5, 0.5), pointerType: 'touch' });
    assert.ok(Math.abs(f.session.get().items[0].x - 0.5) < 1e-10);
    assert.ok(Math.abs(f.session.get().items[0].y - 0.5) < 1e-10);
    assert.ok(Math.abs(parseFloat(node(f, 'cloud').style.left) - 50) < 1e-8);
  }
});

test('zero-size and outside-dome surfaces do not start a captured gesture', (t) => {
  const f = setup(t);
  tap(f, 0.13, 0.1);
  assert.equal(f.captures.size, 0);
  assert.equal(f.session.get().selectedId, null);
  f.rect.width = 0;
  tap(f, 0.29, 0.61);
  assert.equal(f.captures.size, 0);
  assert.equal(f.session.get().selectedId, null);
});

test('transient drag paints immediately and outside release restores DOM and peers', (t) => {
  const f = setup(t);
  f.session.select('sprout');
  const saved = f.session.get();
  const start = saved.items[0];
  f.emit('pointerdown', f.point(start.x, start.y));
  f.emit('pointermove', f.point(0.5, 0.5));
  assert.equal(node(f, 'cloud').style.left, '50%');
  assert.equal(node(f, 'cloud').getAttribute('aria-pressed'), 'true');
  assert.equal(f.changes.at(-1).message, undefined);
  f.emit('pointerup', f.point(1.1, 1.1));
  assert.deepEqual(f.session.get(), saved);
  assert.equal(node(f, 'cloud').style.left, `${start.x * 100}%`);
  assert.equal(node(f, 'cloud').getAttribute('aria-pressed'), 'false');
  assert.equal(node(f, 'sprout').getAttribute('aria-pressed'), 'true');
  assert.equal(f.captures.size, 0);
});

test('stage disposal leaves the DOM placement stable and stops new input', (t) => {
  const f = fixture();
  const stage = f.create();
  t.after(() => stage.dispose());
  tap(f, 0.29, 0.61);
  const saved = f.session.get();
  stage.dispose();
  f.assertClean();
  tap(f, 0.5, 0.5);
  assert.deepEqual(f.session.get(), saved);
  assert.equal(f.captures.size, 0);
});
