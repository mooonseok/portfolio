import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  isSameDocumentHash,
  pendingFrom,
  popDecision,
  settleClick,
  shouldCopyState,
} from '../../src/lib/history.ts';

const page = 'https://example.test/work/apc';
const router = { __NA: true };
const click = (href, extra = {}) => ({
  href,
  button: 0,
  modified: false,
  target: '',
  download: false,
  ...extra,
});

test('hash links on the current page are same-document moves', () => {
  assert.equal(isSameDocumentHash('#overview', page), true);
  assert.equal(isSameDocumentHash(`${page}#system`, `${page}#overview`), true);
  assert.equal(isSameDocumentHash('/work/apc#work', page), true);
});
test('other pages, queries, origins and empty hashes are not', () => {
  assert.equal(isSameDocumentHash('/work/smart-farm#mqtt', page), false);
  assert.equal(isSameDocumentHash('/work/apc?x=1#work', page), false);
  assert.equal(
    isSameDocumentHash('https://other.test/work/apc#work', page),
    false
  );
  assert.equal(isSameDocumentHash('#', page), false);
  assert.equal(isSameDocumentHash('/work/apc', page), false);
});
test('a plain hash click keeps smooth scrolling and copies router state', () => {
  let pending = pendingFrom(click(`${page}#engineering`), page, router);
  pending = settleClick(pending, false);
  const pop = popDecision(pending, '#engineering');
  assert.equal(pop.pause, false);
  assert.equal(shouldCopyState(pop.pending, null, '#engineering'), true);
  assert.equal(shouldCopyState(pop.pending, router, '#engineering'), false);
});
test('clicks that open elsewhere save nothing, so Back pauses', () => {
  const current = `${page}#system`;
  for (const extra of [
    { modified: true },
    { button: 1 },
    { target: '_blank' },
    { download: true },
  ]) {
    const pending = pendingFrom(
      click(`${page}#engineering`, extra),
      current,
      router
    );
    assert.equal(pending, null);
    assert.equal(popDecision(pending, '#engineering').pause, true);
  }
  assert.notEqual(
    pendingFrom(
      click(`${page}#engineering`, { target: '_self' }),
      current,
      router
    ),
    null
  );
});
test('a cancelled click is dropped before the next Back', () => {
  const pending = settleClick(
    pendingFrom(click(`${page}#engineering`), `${page}#system`, router),
    true
  );
  assert.equal(pending, null);
  assert.equal(popDecision(pending, '#engineering').pause, true);
});
test('re-clicking the current hash is consumed by its own popstate', () => {
  const current = `${page}#engineering`;
  const pending = pendingFrom(click(current), current, router);
  assert.equal(pending.same, true);
  const first = popDecision(pending, '#engineering');
  assert.deepEqual(first, { pause: false, pending: null });
  assert.equal(popDecision(first.pending, '#engineering').pause, true);
});
test('a traversal to another hash pauses and clears the saved click', () => {
  const pending = pendingFrom(click(`${page}#work`), page, router);
  assert.deepEqual(popDecision(pending, '#system'), {
    pause: true,
    pending: null,
  });
});
test('router state is copied only onto the new stateless entry', () => {
  const saved = { hash: '#overview', state: router, same: false };
  assert.equal(shouldCopyState(saved, null, '#system'), false);
  assert.equal(
    shouldCopyState({ ...saved, state: null }, null, '#overview'),
    false
  );
  assert.equal(shouldCopyState(null, null, '#overview'), false);
});
