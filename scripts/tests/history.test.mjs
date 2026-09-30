import assert from 'node:assert/strict';
import { test } from 'node:test';
import { isSameDocumentHash, shouldCopyState } from '../../src/lib/history.ts';

const page = 'https://example.test/work/apc';

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
test('router state is copied only onto the new stateless entry', () => {
  const saved = { hash: '#overview', state: { __NA: true } };
  assert.equal(shouldCopyState(saved, null, '#overview'), true);
  assert.equal(shouldCopyState(saved, { __NA: true }, '#overview'), false);
  assert.equal(shouldCopyState(saved, null, '#system'), false);
  assert.equal(
    shouldCopyState({ hash: '#overview', state: null }, null, '#overview'),
    false
  );
  assert.equal(shouldCopyState(null, null, '#overview'), false);
});
