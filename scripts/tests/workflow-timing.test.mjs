import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  workflowFrame,
  workflowTravelMs,
} from '../../src/lib/workflow-timing.ts';

test('중간 단계 경계에서 남은 프레임 시간으로 바로 다음 구간을 진행한다', () => {
  const travel = workflowTravelMs(150);
  const arrival = workflowFrame(travel + 7, travel, false, false);
  assert.deepEqual(arrival, { progress: 1, opacity: 1, remaining: 7 });
  const next = workflowFrame(arrival.remaining, travel, false, false);
  assert.equal(next.progress, 7 / travel);
  assert.equal(next.opacity, 1);
});

test('짧은 경로도 읽을 시간을 두며 긴 경로는 거리에 따라 이동한다', () => {
  assert.equal(workflowTravelMs(40), 1050);
  assert.equal(workflowTravelMs(220), 2000);
  assert.equal(workflowTravelMs(550), 3200);
});

test('마지막에서만 머문 뒤 사라지고 다음 바퀴 첫 구간에서 나타난다', () => {
  const travel = 1200;
  const hold = workflowFrame(travel + 500, travel, false, true);
  assert.deepEqual(hold, { progress: 1, opacity: 1, remaining: null });
  assert.equal(workflowFrame(travel + 830, travel, false, true).opacity, 0.5);
  const end = workflowFrame(travel + 940, travel, false, true);
  assert.deepEqual(end, { progress: 1, opacity: 0, remaining: 0 });
  assert.equal(workflowFrame(end.remaining, travel, true, false).opacity, 0);
  assert.equal(workflowFrame(110, travel, true, false).opacity, 0.5);
});
