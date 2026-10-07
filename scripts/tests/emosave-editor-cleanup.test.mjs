import assert from 'node:assert/strict';
import { test } from 'node:test';
import { dispatch, fixture } from './emosave-editor-fixture.mjs';

for (const failure of ['constructor', 'size', 'observe']) {
  test(`${failure} failure releases all allocated model and stage resources`, () => {
    const f = fixture(failure);
    assert.throws(
      () => f.create(),
      (error) => error === f.error
    );
    assert.ok(f.resources.size > 0);
    f.assertClean();
    assert.equal(f.counts.disposed, failure === 'constructor' ? 0 : 1);
    assert.equal(f.counts.contextLost, failure === 'constructor' ? 0 : 1);
  });
}

test('render failure reports once and all later work is inert', () => {
  const f = fixture('render');
  const stage = f.create();
  f.session.select(true);
  f.flush();
  assert.equal(f.counts.errors, 1);
  f.assertClean();
  stage.paint(f.session.get());
  stage.cancel();
  stage.dispose();
  f.flush();
  f.resize(400, 300);
  assert.equal(f.counts.errors, 1);
  assert.equal(f.counts.renders, 1);
  assert.equal(f.counts.disposed, 1);
  assert.equal(f.counts.contextLost, 1);
  assert.equal(f.counts.disconnected, 1);
  f.assertClean();
});

test('context loss releases resources once and detaches the failure listener', () => {
  const f = fixture();
  const stage = f.create();
  const event = dispatch(f.canvas, 'webglcontextlost');
  assert.equal(event.defaultPrevented, true);
  assert.equal(f.counts.errors, 1);
  f.assertClean();
  const ignored = dispatch(f.canvas, 'webglcontextlost');
  assert.equal(ignored.defaultPrevented, false);
  stage.dispose();
  f.flush();
  assert.equal(f.counts.errors, 1);
  assert.equal(f.counts.disposed, 1);
  assert.equal(f.counts.contextLost, 1);
  assert.equal(f.counts.disconnected, 1);
  f.assertClean();
});

test('dispose cancels pending RAF, is repeatable and allows a fresh stage', () => {
  const first = fixture();
  const firstStage = first.create();
  assert.equal(first.pending(), 1);
  firstStage.dispose();
  firstStage.dispose();
  first.flush();
  first.assertClean();
  assert.equal(first.counts.renders, 0);
  assert.equal(first.counts.disposed, 1);
  assert.equal(first.counts.contextLost, 1);
  assert.equal(first.counts.disconnected, 1);
  const second = fixture();
  const secondStage = second.create();
  try {
    second.flush();
    assert.equal(second.counts.renders, 1);
    assert.equal(second.host.children.length, 1);
    assert.ok(
      [...second.resources.keys()].every((r) => !first.resources.has(r))
    );
  } finally {
    secondStage.dispose();
    second.assertClean();
  }
});
