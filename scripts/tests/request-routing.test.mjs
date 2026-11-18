import assert from 'node:assert/strict';
import { test } from 'node:test';
import { designRoutingRequests } from '../../src/content/design-routing.ts';
import { routingRequests } from '../../src/content/request-routing.ts';
import { routingFrame } from '../../src/lib/request-routing.ts';

const [panel, button] = routingRequests;
const [postal, checkout] = designRoutingRequests;

test('요청에서 바꿀 내용에 따라 한 담당 또는 세 담당에게 작업을 보낸다', () => {
  assert.equal(
    button.quote,
    '“폰에서 배송지를 고치면 저장하려고 맨 위까지 다시 올라가야 해. 마지막 입력칸 바로 아래에서 저장하게 해줘.”'
  );
  assert.deepEqual(button.jobs, { screen: '버튼 배치' });
  assert.deepEqual(panel.jobs, {
    screen: '패널 배치',
    data: '항목 조회',
    motion: '펼침 효과',
  });
});

test('점이 판단 지점에 도착해 머무른 뒤 담당 쪽으로 출발한다', () => {
  for (const request of [...routingRequests, ...designRoutingRequests]) {
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

test('결제 금액은 위계와 배치를 고친 뒤 위계만 다시 보고 우편번호는 안내 문구만 검토한다', () => {
  assert.deepEqual(checkout.jobs, {
    hierarchy: '금액 강조',
    layout: '버튼 위 배치',
  });
  assert.equal(checkout.issue.owner, 'hierarchy');
  assert.deepEqual(routingFrame(checkout, 11800), {
    phase: 'back',
    fraction: 0,
  });
  assert.match(checkout.issue.repair, /할인액의 굵기/);
  assert.match(checkout.issue.retry, /같은 쿠폰/);
  assert.deepEqual(postal.jobs, { copy: '입력 예시 작성' });
  assert.equal(postal.issue, undefined);
  assert.equal(routingFrame(postal, 10000).phase, 'done');
});

test('우편번호 안내는 입력값과 변경 전후의 문구로 확인한다', () => {
  assert.deepEqual(postal.sample, {
    input: '1234',
    before: '형식 오류',
    after: '우편번호 다섯 자리를 입력해 주세요',
  });
  assert.ok(postal.review.includes(postal.sample.input));
  assert.ok(postal.work.includes(postal.sample.after));
  assert.match(postal.proof, /네 자리/);
});

test('문제가 없는 요청은 검토에서 끝나고, 데이터 오류는 데이터 담당에게만 돌아간다', () => {
  assert.equal(button.issue, undefined);
  assert.equal(routingFrame(button, 10000).phase, 'done');
  assert.deepEqual(routingFrame(button, 12200), { phase: 'done', fraction: 1 });
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
  assert.deepEqual(routingFrame(panel, 18500), { phase: 'done', fraction: 1 });
});

test('정지 상태에서도 모든 예시의 경로와 검사 결과를 읽고 다른 요청을 직접 선택할 수 있다', () => {
  assert.deepEqual(
    routingRequests.map((item) => item.label),
    ['상세 패널', '저장 버튼 위치']
  );
  assert.deepEqual(
    designRoutingRequests.map((item) => item.label),
    ['우편번호 안내', '결제 금액 강조']
  );
  for (const request of [...routingRequests, ...designRoutingRequests]) {
    assert.deepEqual(routingFrame(request, 60000), {
      phase: 'done',
      fraction: 1,
    });
    assert.ok(
      request.decision && request.proof && request.review && request.finish
    );
    if (request.issue) {
      assert.ok(request.jobs[request.issue.owner]);
      assert.ok(request.issue.back && request.issue.retry);
    }
  }
});
