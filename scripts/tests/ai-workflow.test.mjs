import { test } from 'node:test';
import assert from 'node:assert/strict';
import { resolve } from 'node:path';
import { loadContent } from '../verification/content-loader.mjs';
import { workflowRoute } from '../../src/lib/ai-workflow.ts';

const { workflows, developmentExamples } = loadContent(
  resolve(import.meta.dirname, '../../src/content/ai-workflow')
);

const design = workflows.find(({ id }) => id === 'design');
const feature = workflows.find(({ id }) => id === 'feature');
const [buttonLayout, detailPanel] = developmentExamples;

test('버튼 배치 요청은 화면 담당만 거쳐 검사하고 화면 오류만 되돌린다', () => {
  assert.deepEqual(
    buttonLayout.workers.map(({ id }) => id),
    ['screen']
  );
  assert.deepEqual(
    buttonLayout.issues.map(({ owner }) => owner),
    ['screen']
  );
  const [issue] = buttonLayout.issues;
  assert.equal(buttonLayout.stages[issue.target].label, '화면 작업');
  assert.deepEqual(workflowRoute(buttonLayout), [0, 1, 2, 3, 4, 5, 6, 7]);
  assert.deepEqual(
    workflowRoute(buttonLayout, issue),
    [0, 1, 2, 3, 4, 5, 6, 3, 4, 5, 6, 7]
  );
});

test('두 개발 예시는 구별되는 이름으로 선택하고 상세 패널은 병렬 경로를 사용한다', () => {
  assert.equal(buttonLayout.id, detailPanel.id);
  assert.ok(buttonLayout.exampleLabel && detailPanel.exampleLabel);
  assert.notEqual(buttonLayout.exampleLabel, detailPanel.exampleLabel);
  assert.equal(detailPanel, feature);
});

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
