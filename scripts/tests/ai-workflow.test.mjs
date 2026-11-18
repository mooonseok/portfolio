import { test } from 'node:test';
import assert from 'node:assert/strict';
import { workflows } from '../../src/content/ai-workflow.ts';
import { workflowRoute } from '../../src/lib/ai-workflow.ts';

const design = workflows.find(({ id }) => id === 'design');
const feature = workflows.find(({ id }) => id === 'feature');
for (const [request, expected] of [
  [design, [0, 1, 2, 3, 4, 5, 6]],
  [feature, [0, 1, 2, 3, 4, 5, 6, 7]],
]) {
  test(`${request.label} 검토를 통과하면 마지막 단계까지 순서대로 진행한다`, () => {
    assert.deepEqual(workflowRoute(request), expected);
  });
}

const expectedRoutes = [
  ['design', 'draft', [0, 1, 2, 3, 2, 3, 4, 5, 6]],
  ['design', 'direction', [0, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 6]],
  ['feature', 'implementation', [0, 1, 2, 3, 4, 5, 6, 3, 4, 5, 6, 7]],
  ['feature', 'contract', [0, 1, 2, 3, 4, 5, 3, 4, 5, 6, 7]],
  ['feature', 'animation', [0, 1, 2, 3, 4, 5, 6, 3, 4, 5, 6, 7]],
];

for (const [requestId, issueId, expected] of expectedRoutes) {
  const request = workflows.find(({ id }) => id === requestId);
  const issue = request.issues.find(({ id }) => id === issueId);
  test(`${request.label} · ${issue.label} 발생 단계에서 담당 단계로 복귀한 뒤 재검토한다`, () => {
    assert.deepEqual(workflowRoute(request, issue), expected);
  });
}

test('개발 검토 결과마다 병렬 작업 중 하나의 담당만 수정한 뒤 합류한다', () => {
  const owners = {
    implementation: 'screen',
    contract: 'data',
    animation: 'motion',
  };
  assert.deepEqual(
    feature.workers.map(({ id }) => id),
    Object.values(owners)
  );
  assert.equal(feature.issues.length, feature.workers.length);
  for (const issue of feature.issues) {
    assert.equal(issue.owner, owners[issue.id]);
    assert.equal(feature.stages[issue.target].label, '병렬 작업');
    assert.equal(feature.stages[issue.target + 1].label, '결과 합류');
  }
});
