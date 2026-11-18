import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  routingCaption,
  routingRequests,
} from '../../src/content/request-routing.ts';
import { routingFrame } from '../../src/lib/request-routing.ts';

const [button, panel] = routingRequests;

test('요청에서 바꿀 내용에 따라 한 담당 또는 세 담당에게 작업을 보낸다', () => {
  assert.deepEqual(button.jobs, { screen: '버튼 배치' });
  assert.deepEqual(panel.jobs, {
    screen: '패널 배치',
    data: '항목 조회',
    motion: '펼침 효과',
  });
});

test('점이 판단 지점에 도착해 머무른 뒤 담당 쪽으로 출발한다', () => {
  for (const request of routingRequests) {
    assert.deepEqual(routingFrame(request, 450), {
      phase: 'request',
      fraction: 0,
    });
    assert.deepEqual(routingFrame(request, 1800), {
      phase: 'request',
      fraction: 1,
    });
    assert.deepEqual(routingFrame(request, 2000), {
      phase: 'judge',
      fraction: 1,
    });
    assert.deepEqual(routingFrame(request, 4799), {
      phase: 'judge',
      fraction: 1,
    });
    assert.deepEqual(routingFrame(request, 4800), {
      phase: 'outlet',
      fraction: 0,
    });
    assert.deepEqual(routingFrame(request, 5600), {
      phase: 'route',
      fraction: 0,
    });
    assert.deepEqual(routingFrame(request, 6300), {
      phase: 'route',
      fraction: 0.5,
    });
    assert.equal(routingFrame(request, 7000).phase, 'work');
    assert.equal(routingFrame(request, 8450).phase, 'join');
  }
});

test('문제가 없는 요청은 검토에서 끝나고, 데이터 오류는 데이터 담당에게만 돌아간다', () => {
  assert.equal(button.issue, undefined);
  assert.equal(routingFrame(button, 10000).phase, 'done');
  assert.equal(routingFrame(button, 12200), null);
  assert.equal(panel.issue.owner, 'data');
  assert.ok(panel.jobs[panel.issue.owner]);
  for (const [at, phase] of [
    [10000, 'issue'],
    [11800, 'back'],
    [13250, 'fix'],
    [14650, 'retry'],
    [16100, 'done'],
  ])
    assert.deepEqual(routingFrame(panel, at), { phase, fraction: 0 });
  assert.equal(routingFrame(panel, 18500), null);
});

test('움직임 줄이기에서도 분담 이유와 오류를 고칠 담당을 읽을 수 있다', () => {
  assert.equal(routingCaption(button, 'work', true), button.decision);
  const summary = routingCaption(panel, 'work', true);
  assert.ok(summary.includes(panel.decision));
  assert.ok(summary.includes(panel.issue.back));
  assert.ok(summary.includes(panel.issue.retry));
});
