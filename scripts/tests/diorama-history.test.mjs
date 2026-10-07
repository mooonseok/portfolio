import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  readDioramaHistory,
  withDioramaHistory,
} from '../../src/lib/diorama-history.ts';
const slugs = ['apc', 'emosave'];
const value = { selected: 'apc', scrollY: 533 };

test('workshop history preserves router state, selection and scroll position', () => {
  const router = { __NA: true, tree: ['home'] };
  const state = withDioramaHistory(router, value);
  assert.deepEqual(readDioramaHistory(state, slugs), value);
  assert.equal(state.tree, router.tree);
  assert.equal(state.__NA, true);
  assert.equal(router.portfolioWorkshop, undefined);
});
test('legacy 3D preferences are ignored and omitted when history is saved', () => {
  for (const selected of ['apc', null]) {
    const expected = { ...value, selected };
    for (const enabled of [undefined, false, null, true, 'false']) {
      const legacy = { ...expected, enabled };
      const source = { portfolioWorkshop: legacy };
      assert.deepEqual(readDioramaHistory(source, slugs), expected);
      assert.deepEqual(
        withDioramaHistory(source, legacy).portfolioWorkshop,
        expected
      );
      assert.equal(source.portfolioWorkshop, legacy);
      assert.equal(legacy.enabled, enabled);
    }
  }
});
test('missing or invalid history is ignored', () => {
  for (const bad of [
    null,
    {},
    { scrollY: 533 },
    { ...value, selected: 'unknown' },
    { ...value, selected: 1 },
    { selected: 'apc' },
    { ...value, scrollY: '533' },
    { ...value, scrollY: -1 },
    { ...value, scrollY: Infinity },
    { ...value, scrollY: NaN },
  ]) {
    assert.equal(readDioramaHistory({ portfolioWorkshop: bad }, slugs), null);
  }
});
test('closed selection and scroll position round trip without a 3D preference', () => {
  const closed = { selected: null, scrollY: 0 };
  assert.deepEqual(
    readDioramaHistory(withDioramaHistory(null, closed), slugs),
    closed
  );
});
