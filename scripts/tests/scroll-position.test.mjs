import assert from 'node:assert/strict';
import { test } from 'node:test';
import { lastPassed } from '../../src/lib/scroll-position.ts';

test('instant jumps use the last group above the anchor line', () => {
  assert.equal(lastPassed([200, 900, 1600], 80), 0);
  assert.equal(lastPassed([-1600, -900, -200], 80), 2);
  assert.equal(lastPassed([64, 800, 1500], 80), 0);
});
test('missing elements preserve original group indices', () => {
  assert.equal(lastPassed([-900, Infinity, 64], 80), 2);
});
test('a short section stays current until the next heading passes', () => {
  assert.equal(lastPassed([-500, 64, 150], 80), 1);
});
