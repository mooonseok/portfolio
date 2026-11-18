import assert from 'node:assert/strict';
import { test } from 'node:test';
import { designFlow } from '../../src/content/design-routing.ts';
import { developmentFlow } from '../../src/content/request-routing.ts';
import {
  advanceRoutingTime,
  routingFrame,
  routingPacket,
  routingTimeline,
} from '../../src/lib/request-routing.ts';

const workflows = [developmentFlow, designFlow];
const assigned = [
  'request',
  'entry',
  'judge',
  'route',
  'work',
  'join',
  'review',
];
const correction = ['issue', 'back', 'fix', 'retry', 'recheck'];

test('개발과 디자인 유형별 한 흐름에 작업과 검토 근거 및 실제 끝점이 있다', () => {
  assert.deepEqual(
    workflows.map((request) => request.lane),
    ['development', 'design']
  );
  for (const request of workflows) {
    assert.ok(Object.keys(request.jobs).length > 0);
    assert.ok(
      request.quote && request.decision && request.proof && request.finish
    );
    assert.ok(request.jobs[request.issue.owner]);
    assert.ok(request.issue.fix && request.issue.retry);
  }
});

function* routes() {
  for (const request of workflows) {
    yield { ...request, issue: undefined };
    yield request;
    for (const id of Object.keys(request.jobs)) {
      if (id !== request.issue.owner) {
        yield { ...request, issue: { ...request.issue, owner: id } };
      }
      yield { ...request, jobs: { [id]: request.jobs[id] }, issue: undefined };
    }
  }
}

test('직접 통과와 수정 경로 모두 결과를 거쳐 다음 회차의 정확한 위치로 이어진다', () => {
  for (const request of routes()) {
    const timeline = routingTimeline(request);
    assert.deepEqual(
      timeline.steps.map(([phase]) => phase),
      [
        ...assigned,
        ...(request.issue ? correction : []),
        'exit',
        'done',
        'restart',
      ]
    );
    for (const cycle of [0, 1, 2, 1000]) {
      let elapsed = cycle * timeline.duration;
      for (const [phase, duration] of timeline.steps) {
        assert.deepEqual(routingFrame(timeline, elapsed), {
          phase,
          fraction: 0,
        });
        assert.deepEqual(routingFrame(timeline, elapsed + duration / 2), {
          phase,
          fraction: 0.5,
        });
        assert.equal(
          routingFrame(timeline, elapsed + duration - 1).phase,
          phase
        );
        elapsed += duration;
      }
      assert.deepEqual(routingFrame(timeline, elapsed + 70), {
        phase: 'request',
        fraction: 70 / timeline.steps[0][1],
      });
    }
  }
});

test('카드를 읽는 시간과 짧은 연결 이동 및 회차 간 이동 시간을 분리한다', () => {
  const moving = new Set(['entry', 'route', 'join', 'back', 'retry', 'exit']);
  for (const request of routes()) {
    for (const [phase, duration] of routingTimeline(request).steps) {
      if (moving.has(phase)) {
        assert.ok(duration >= 250 && duration <= 500, phase);
      } else if (phase === 'restart') {
        assert.ok(duration >= 900 && duration <= 1500);
      } else {
        assert.ok(duration >= (phase === 'request' ? 3000 : 2400), phase);
      }
    }
  }
});

test('모든 단계에서 점이 이동하고 수정 구간은 검토에서 지목한 담당에게만 보인다', () => {
  for (const request of routes()) {
    const ids = Object.keys(request.jobs);
    for (const [phase] of routingTimeline(request).steps) {
      const expected = ['route', 'work', 'join'].includes(phase)
        ? ids
        : correction.includes(phase)
          ? [request.issue.owner]
          : [ids[0]];
      for (const id of ids) {
        const point = (fraction) =>
          routingPacket(
            phase,
            fraction,
            id,
            id === ids[0],
            request.issue?.owner
          );
        if (!expected.includes(id)) {
          assert.equal(point(0.5), undefined, phase);
          continue;
        }
        const [edge, start] = point(0.1);
        const [finishEdge, finish] = point(0.9);
        assert.equal(edge, finishEdge);
        assert.notEqual(start, finish, phase);
      }
    }
  }
});

function junction([edge, position]) {
  const ends = {
    request: ['cycle-origin', 'entry-origin'],
    entry: ['entry-origin', 'judge-top'],
    judge: ['judge-top', 'judge-bottom'],
    review: ['review-top', 'review-bottom'],
    exit: ['review-bottom', 'result-top'],
    result: ['result-top', 'result-bottom'],
    restart: ['result-bottom', 'cycle-origin'],
  };
  const [kind, id] = edge.split('-');
  if (id) {
    const ports = {
      in: ['judge-bottom', id + '-top'],
      work: [id + '-top', id + '-bottom'],
      join: [id + '-bottom', 'review-top'],
      fix: [id + '-bottom', id + '-bottom'],
    };
    return ports[kind][position];
  }
  if (edge === 'review' && position === 0.5) return 'review-mid';
  return ends[edge][position];
}

test('단일 경로·분기·합류·수정·재시작의 전환에서 점의 끝점과 다음 시작점이 일치한다', () => {
  for (const request of routes()) {
    const ids = Object.keys(request.jobs);
    const { steps } = routingTimeline(request);
    const ports = (phase, fraction) =>
      new Set(
        ids.flatMap((id, index) => {
          const packet = routingPacket(
            phase,
            fraction,
            id,
            index === 0,
            request.issue?.owner
          );
          return packet ? [junction(packet)] : [];
        })
      );
    for (const [index, [phase]] of steps.entries()) {
      const [next] = steps[(index + 1) % steps.length];
      const end = ports(phase, 1);
      assert.ok(end.size > 0 && !end.has(undefined), phase);
      assert.deepEqual(end, ports(next, 0), phase + ' → ' + next);
    }
  }
});

test('프레임 지연으로 한 번에 여러 단계를 건너뛰지 않는다', () => {
  assert.equal(advanceRoutingTime(1000, 16), 1016);
  assert.equal(advanceRoutingTime(1000, 250), 1080);
});
