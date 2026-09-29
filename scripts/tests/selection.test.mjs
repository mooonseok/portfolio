import assert from 'node:assert/strict';
import { test } from 'node:test';
import { pickValid, shiftSelection } from '../../src/lib/selection.ts';

const ids = ['order', 'group-purchase', 'inventory'];

test('selects the first item by default', () => {
  assert.equal(pickValid(ids, undefined), 'order');
});

test('keeps a valid selection', () => {
  assert.equal(pickValid(ids, 'inventory'), 'inventory');
});

test('falls back to the first item for an unknown id', () => {
  assert.equal(pickValid(ids, 'settlement'), 'order');
});

test('returns nothing for empty data', () => {
  assert.equal(pickValid([], 'order'), undefined);
  assert.equal(shiftSelection([], 'order', 1), undefined);
});

test('a single item stays selected', () => {
  assert.equal(pickValid(['order'], undefined), 'order');
  assert.equal(shiftSelection(['order'], 'order', 1), 'order');
  assert.equal(shiftSelection(['order'], 'order', -1), 'order');
});

test('arrow keys wrap at both ends', () => {
  assert.equal(shiftSelection(ids, 'order', 1), 'group-purchase');
  assert.equal(shiftSelection(ids, 'inventory', 1), 'order');
  assert.equal(shiftSelection(ids, 'order', -1), 'inventory');
});

test('an unknown current id moves from the edges', () => {
  assert.equal(shiftSelection(ids, 'settlement', 1), 'order');
  assert.equal(shiftSelection(ids, 'settlement', -1), 'inventory');
});

test('rapid changes resolve to the last choice', () => {
  let picked;
  for (const next of ['group-purchase', 'inventory', 'settlement', 'inventory'])
    picked = next;
  assert.equal(pickValid(ids, picked), 'inventory');
  let key = 'order';
  for (const d of [1, 1, 1, -1, 1, 1]) key = shiftSelection(ids, key, d);
  assert.equal(key, 'group-purchase');
});
