import { test } from 'node:test';
import assert from 'node:assert/strict';
import { workflows } from '../../src/content/ai-workflow.ts';
import { workflowRoute } from '../../src/lib/ai-workflow.ts';

for (const request of workflows) {
  test(`${request.label} 검토를 통과하면 마지막 단계까지 순서대로 진행한다`, () => {
    assert.deepEqual(workflowRoute(request), [0, 1, 2, 3, 4, 5, 6]);
  });
}

const expectedRoutes = [
  ['design', 'draft', [0, 1, 2, 3, 2, 3, 4, 5, 6]],
  ['design', 'direction', [0, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 6]],
  ['feature', 'implementation', [0, 1, 2, 3, 4, 5, 3, 4, 5, 6]],
  ['feature', 'contract', [0, 1, 2, 3, 4, 2, 3, 4, 5, 6]],
];

for (const [requestId, issueId, expected] of expectedRoutes) {
  const request = workflows.find(({ id }) => id === requestId);
  const issue = request.issues.find(({ id }) => id === issueId);
  test(`${request.label} · ${issue.label} 발생 단계에서 담당 단계로 복귀한 뒤 재검토한다`, () => {
    assert.deepEqual(workflowRoute(request, issue), expected);
  });
}
