import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  initialChoice,
  moveBy,
  openChoice,
  pickChoice,
  shownChoice,
  toggleChoice,
} from '../../src/lib/selection.ts';

const ids = ['order', 'group-purchase', 'inventory'];
const four = ['admin', 'api', 'app', 'reward'];

test('the first item starts open and shown', () => {
  const c = initialChoice(ids);
  assert.equal(openChoice(ids, c), 'order');
  assert.equal(shownChoice(ids, c), 'order');
});

test('empty data has nothing open or shown', () => {
  const c = initialChoice([]);
  assert.equal(openChoice([], c), null);
  assert.equal(shownChoice([], c), undefined);
});

test('tapping the open item closes every item', () => {
  const c = toggleChoice(ids, initialChoice(ids), 'order');
  assert.equal(openChoice(ids, c), null);
});

test('opening another item closes the previous one', () => {
  const c = toggleChoice(ids, initialChoice(ids), 'inventory');
  assert.equal(openChoice(ids, c), 'inventory');
});

test('when all are closed the tabs show the last valid choice', () => {
  let c = toggleChoice(ids, initialChoice(ids), 'group-purchase');
  c = toggleChoice(ids, c, 'group-purchase');
  assert.equal(openChoice(ids, c), null);
  assert.equal(shownChoice(ids, c), 'group-purchase');
});

test('closing the default item still restores the first item', () => {
  const c = toggleChoice(ids, initialChoice(ids), 'order');
  assert.equal(shownChoice(ids, c), 'order');
});

test('an unknown id changes nothing', () => {
  const start = pickChoice(ids, initialChoice(ids), 'inventory');
  assert.deepEqual(pickChoice(ids, start, 'settlement'), start);
  assert.deepEqual(toggleChoice(ids, start, 'settlement'), start);
});

test('a tab pick after closing reopens and becomes the last choice', () => {
  let c = toggleChoice(ids, initialChoice(ids), 'order');
  c = pickChoice(ids, c, 'inventory');
  assert.equal(openChoice(ids, c), 'inventory');
  assert.equal(shownChoice(ids, c), 'inventory');
});

test('horizontal tabs wrap with left and right, ignore up and down', () => {
  assert.equal(moveBy(ids, 'inventory', 1, 0, ids.length), 'order');
  assert.equal(moveBy(ids, 'order', -1, 0, ids.length), 'inventory');
  assert.equal(moveBy(ids, 'order', 0, 1, ids.length), undefined);
});

test('vertical tabs wrap with up and down, ignore left and right', () => {
  assert.equal(moveBy(four, 'reward', 0, 1, 1), 'admin');
  assert.equal(moveBy(four, 'admin', 0, -1, 1), 'reward');
  assert.equal(moveBy(four, 'admin', 1, 0, 1), undefined);
});

test('a 2x2 grid moves by rows without leaving the grid', () => {
  assert.equal(moveBy(four, 'admin', 0, 1, 2), 'app');
  assert.equal(moveBy(four, 'api', 0, 1, 2), 'reward');
  assert.equal(moveBy(four, 'app', 0, 1, 2), 'app');
  assert.equal(moveBy(four, 'admin', 0, -1, 2), 'admin');
});

test('a 2x2 grid reads left to right across rows', () => {
  assert.equal(moveBy(four, 'api', 1, 0, 2), 'app');
  assert.equal(moveBy(four, 'reward', 1, 0, 2), 'admin');
  assert.equal(moveBy(four, 'app', -1, 0, 2), 'api');
});

test('moves on empty data return nothing', () => {
  assert.equal(moveBy([], 'x', 1, 0, 2), undefined);
});
