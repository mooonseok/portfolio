import assert from 'node:assert/strict';
import { test } from 'node:test';
import { treeSegments } from '../../src/lib/relation-path.ts';

const targets = ['group-purchase', 'inventory'];
const on = (segs) =>
  segs.map((s) => `${+s.upper}${+s.lower}${+s.branch}`).join(' ');

test('origin selected lights every connection', () => {
  assert.equal(on(treeSegments(targets, 'order', 'order')), '111 101');
});

test('first target lights the trunk to it and its branch only', () => {
  assert.equal(on(treeSegments(targets, 'order', 'group-purchase')), '101 000');
});

test('last target lights the whole trunk but not the other branch', () => {
  assert.equal(on(treeSegments(targets, 'order', 'inventory')), '110 101');
});

test('all closed lights nothing', () => {
  assert.equal(on(treeSegments(targets, 'order', null)), '000 000');
});

test('an unknown id lights nothing', () => {
  assert.equal(on(treeSegments(targets, 'order', 'settlement')), '000 000');
});

test('the last target never has a segment below it', () => {
  const three = ['a', 'b', 'c'];
  assert.equal(on(treeSegments(three, 'o', 'o')), '111 111 101');
  assert.equal(on(treeSegments(three, 'o', 'b')), '110 101 000');
});
