import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  readDioramaHistory,
  withDioramaHistory,
} from '../../src/lib/diorama-history.ts';
const slugs = ['apc', 'emosave'];
const value = { selected: 'apc', enabled: false, scrollY: 533 };

test('workshop history preserves router state and user 3D preference', () => {
  const router = { __NA: true, tree: ['home'] };
  const state = withDioramaHistory(router, value);
  assert.deepEqual(readDioramaHistory(state, slugs), value);
  assert.equal(state.tree, router.tree);
  assert.equal(state.__NA, true);
  assert.equal(router.portfolioWorkshop, undefined);
});
test('missing or invalid history is ignored', () => {
  for (const bad of [
    null,
    {},
    { ...value, selected: 'unknown' },
    { ...value, scrollY: -1 },
    { ...value, scrollY: Infinity },
    { ...value, enabled: 'false' },
  ]) {
    assert.equal(readDioramaHistory({ portfolioWorkshop: bad }, slugs), null);
  }
});
test('closed selection and automatic 3D mode round trip', () => {
  const closed = { selected: null, enabled: null, scrollY: 0 };
  assert.deepEqual(
    readDioramaHistory(withDioramaHistory(null, closed), slugs),
    closed
  );
});
