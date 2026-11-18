import assert from 'node:assert/strict';
import { test } from 'node:test';
import { designFlow } from '../../src/content/design-routing.ts';
import { developmentFlow } from '../../src/content/request-routing.ts';
import {
  advanceRoutingTime,
  routingFrame,
  routingPacket,
  routingPacketOpacity,
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

test('직접 통과와 수정 경로는 모든 검토를 읽은 뒤 결과에 도착한다', () => {
  for (const source of workflows) {
    for (const issue of [undefined, source.issue]) {
      const timeline = routingTimeline({ ...source, issue });
      const phases = timeline.map(([phase]) => phase);
      assert.deepEqual(phases, [
        ...assigned,
        ...(issue ? correction : []),
        'exit',
      ]);
      let elapsed = 0;
      for (const [phase, duration] of timeline) {
        assert.equal(routingFrame(timeline, elapsed).phase, phase);
        assert.equal(
          routingFrame(timeline, elapsed + duration - 1).phase,
          phase
        );
        elapsed += duration;
      }
      assert.deepEqual(routingFrame(timeline, elapsed), {
        phase: 'done',
        fraction: 1,
      });
      assert.deepEqual(routingFrame(timeline, elapsed + 31000), {
        phase: 'done',
        fraction: 1,
      });
    }
  }
});

test('이동은 반 초 안에 끝나고 읽는 카드는 2.4초 이상 안정적으로 머문다', () => {
  const moving = new Set(['entry', 'route', 'join', 'back', 'retry', 'exit']);
  for (const request of workflows) {
    for (const [phase, duration] of routingTimeline(request)) {
      if (moving.has(phase)) {
        assert.ok(duration >= 250 && duration <= 500, phase);
      } else {
        assert.ok(duration >= (phase === 'request' ? 3000 : 2400), phase);
      }
    }
  }
});

test('점은 표시된 연결선 위에서만 이동하고 카드에 머무는 동안 위치가 고정된다', () => {
  for (const request of workflows) {
    const owners = Object.keys(request.jobs);
    const failed = request.issue.owner;
    const at = (phase, fraction, id) =>
      routingPacket(phase, fraction, id, id === owners[0], failed);
    for (const id of owners) {
      assert.deepEqual(at('route', 0.5, id), [`in-${id}`, 0.5]);
      assert.deepEqual(at('join', 0.5, id), [`join-${id}`, 0.5]);
      for (const phase of [
        'request',
        'judge',
        'work',
        'review',
        'issue',
        'fix',
        'recheck',
        'done',
      ]) {
        assert.deepEqual(at(phase, 0.1, id), at(phase, 0.9, id), phase);
      }
      if (id === failed) {
        assert.deepEqual(at('back', 0.25, id), [`join-${id}`, 0.75]);
        assert.deepEqual(at('fix', 0.5, id), [`join-${id}`, 0]);
        assert.deepEqual(at('retry', 0.25, id), [`join-${id}`, 0.25]);
      } else {
        assert.equal(at('back', 0.25, id), undefined);
        assert.equal(at('fix', 0.5, id), undefined);
        assert.equal(at('retry', 0.25, id), undefined);
      }
    }
    assert.deepEqual(at('entry', 0.5, owners[0]), ['entry', 0.5]);
    assert.deepEqual(at('exit', 0.5, owners[0]), ['exit', 0.5]);
    assert.deepEqual(at('done', 1, owners[0]), ['exit', 1]);
  }
});

test('다른 포트에서 출발하기 전 완전히 투명한 프레임이 낮은 프레임률에서도 남는다', () => {
  for (const source of workflows) {
    for (const issue of [undefined, source.issue]) {
      const timeline = routingTimeline({ ...source, issue });
      for (const [index, [phase, duration]] of timeline.entries()) {
        const nextPhase = timeline[index + 1]?.[0];
        if (!['route', 'join', 'exit'].includes(nextPhase)) continue;
        const opacity = (ms) =>
          routingPacketOpacity(phase, ms / duration, Boolean(issue));
        assert.equal(opacity(duration * 0.8), 1);
        assert.ok(opacity(duration * 0.88) < 1 && opacity(duration * 0.88) > 0);
        assert.equal(opacity(duration - 150), 0);
        let elapsed = duration * 0.8;
        const samples = [];
        while (elapsed < duration) {
          samples.push(opacity(elapsed));
          elapsed = advanceRoutingTime(elapsed, 250);
        }
        assert.ok(samples.includes(0), phase);
        assert.equal(routingPacketOpacity(nextPhase, 0, Boolean(issue)), 0);
        assert.equal(routingPacketOpacity(nextPhase, 0.3, Boolean(issue)), 1);
      }
    }
  }
  for (const phase of ['review', 'issue', 'back', 'fix', 'retry'])
    assert.equal(routingPacketOpacity(phase, 0.99, true), 1);
  assert.equal(advanceRoutingTime(1000, 16), 1016);
});
