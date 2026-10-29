import assert from 'node:assert/strict';
import { test } from 'node:test';
import { anchorLine, lastPassed } from '../../src/lib/scroll-position.ts';

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
test('the anchor line keeps the desktop floor', () => {
  assert.equal(anchorLine(Number.NaN, 56), 80);
  assert.equal(anchorLine(0, 56), 80);
});
test('390px jumps land below the line set by padding and margin', () => {
  const line = anchorLine(56, 56);
  assert.equal(line, 120);
  assert.equal(lastPassed([-1400, 112, 900], line), 1);
  assert.equal(lastPassed([-1400, 112, 900], 80), 0);
});
