import { test } from 'node:test';
import assert from 'node:assert/strict';
import { workflowRoute } from '../../src/lib/ai-workflow.ts';

test('검토를 통과하면 바로 완료한다', () => {
  assert.deepEqual(workflowRoute(), [0, 1, 2, 3, 4]);
});

test('문제가 발견된 단계로 돌아가 영향을 받은 단계를 거쳐 재검토한다', () => {
  for (const target of [0, 1, 2]) {
    const route = workflowRoute(target);
    assert.deepEqual(route.slice(0, 4), [0, 1, 2, 3]);
    assert.deepEqual(route.slice(4), [0, 1, 2, 3, 4].slice(target));
  }
});
