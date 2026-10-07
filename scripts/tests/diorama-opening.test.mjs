import assert from 'node:assert/strict';
import { test } from 'node:test';
import { canPlayOpening } from '../../src/lib/diorama-opening.ts';

const firstVisit = {
  seen: null,
  navigationType: 'navigate',
  hash: '',
  scrollY: 0,
  reduced: false,
};

test('an unseen normal navigation at the top can play the opening', () => {
  assert.equal(canPlayOpening(firstVisit), true);
});

test('a saved visit prevents another automatic opening regardless of stored value', () => {
  for (const seen of ['1', '2026-10-07', '0', ''])
    assert.equal(canPlayOpening({ ...firstVisit, seen }), false);
});

test('reload and history restoration skip the opening', () => {
  for (const navigationType of ['reload', 'back_forward'])
    assert.equal(canPlayOpening({ ...firstVisit, navigationType }), false);
});

test('missing or unknown navigation evidence does not trigger an opening', () => {
  for (const navigationType of ['', 'unknown'])
    assert.equal(canPlayOpening({ ...firstVisit, navigationType }), false);
});

test('a direct section link remains available without an opening', () => {
  for (const hash of ['#work', '#contact', '#overview'])
    assert.equal(canPlayOpening({ ...firstVisit, hash }), false);
});

test('an already scrolled page is not interrupted by the opening', () => {
  for (const scrollY of [200, 900, 2400])
    assert.equal(canPlayOpening({ ...firstVisit, scrollY }), false);
});

test('reduced motion suppresses the first-visit opening', () => {
  assert.equal(canPlayOpening({ ...firstVisit, reduced: true }), false);
});

test('normal navigation does not override a simultaneous skip condition', () => {
  assert.equal(
    canPlayOpening({
      ...firstVisit,
      seen: '1',
      hash: '#work',
      scrollY: 900,
      reduced: true,
    }),
    false
  );
});
