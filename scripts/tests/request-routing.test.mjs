import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  advanceRoutingFrame,
  ROUTING_PIXELS_PER_SECOND,
  routingPacket,
  routingTrack,
} from '../../src/lib/request-routing.ts';

import {
  assigned,
  correctionSteps,
  developmentFlow,
  measuredEdges,
  reading,
  routes,
  workflows,
} from './request-routing-cases.mjs';

test('개발과 디자인 유형별 한 흐름에 작업과 검토 근거 및 실제 끝점이 있다', () => {
  assert.deepEqual(
    workflows.map((request) => request.lane),
    ['development', 'design']
  );
  for (const request of workflows) {
    assert.ok(Object.keys(request.jobs).length > 0);
    assert.ok(
      request.decision &&
        request.proof &&
        request.review &&
        request.decisionTest &&
        request.finish
    );
    if (request.issue) {
      assert.ok(request.jobs[request.issue.owner] && request.issue.finding);
    }
    for (const job of Object.values(request.jobs)) {
      assert.ok(job.label && job.action && job.finish);
    }
  }
});

const beginning = { phase: 'judge', fraction: 0 };
const travelTime = (distance) => (distance * 1000) / ROUTING_PIXELS_PER_SECOND;

test('직접 통과와 수정 경로가 판단부터 시작해 여러 바퀴 뒤에도 같은 위치로 이어진다', () => {
  for (const request of routes()) {
    const track = routingTrack(request, measuredEdges(request));
    const phases = [
      ...assigned,
      ...correctionSteps(request.issue),
      'exit',
      'done',
      'restart',
    ];
    assert.deepEqual(
      track.steps.map(({ phase }) => phase),
      phases
    );
    for (const cycles of [0, 1, 2, 1000]) {
      let cursor = advanceRoutingFrame(
        track,
        beginning,
        cycles * track.duration
      );
      for (const [stepIndex, { phase, duration }] of track.steps.entries()) {
        assert.deepEqual(cursor, { stepIndex, phase, fraction: 0 });
        cursor = advanceRoutingFrame(track, cursor, duration / 2);
        assert.deepEqual(cursor, { stepIndex, phase, fraction: 0.5 });
        cursor = advanceRoutingFrame(track, cursor, duration / 2);
      }
      assert.deepEqual(cursor, { ...beginning, stepIndex: 0 });
    }
  }
});

test('카드를 강조하는 동안 점을 숨기고 연결선의 길이와 관계없이 읽을 시간을 둔다', () => {
  for (const request of routes()) {
    const ids = Object.keys(request.jobs);
    const { steps } = routingTrack(request, measuredEdges(request));
    for (const { phase, duration } of steps.filter((step) =>
      reading.includes(step.phase)
    )) {
      assert.ok(duration >= 1000 && duration <= 2000);
      for (const [i, id] of ids.entries()) {
        for (const at of [0, 0.5, 1]) {
          assert.equal(
            routingPacket(phase, at, id, i === 0, request.issue?.owner),
            undefined
          );
        }
      }
    }
  }
});

test('분기·합류·담당 복귀·재검토·순환의 모든 실제 연결선에서 점이 같은 속도로 이동한다', () => {
  for (const request of routes()) {
    const ids = Object.keys(request.jobs);
    const edges = measuredEdges(request);
    const track = routingTrack(request, edges);
    for (const { phase } of track.steps.filter(
      (step) => !reading.includes(step.phase)
    )) {
      const state = { phase, fraction: 0.1 };
      const next = advanceRoutingFrame(track, state, 100);
      assert.equal(next.phase, phase);
      const expected = ['route', 'handoff', 'join'].includes(phase)
        ? ids
        : ['back', 'retry'].includes(phase)
          ? [request.issue.owner]
          : [ids[0]];
      for (const [index, id] of ids.entries()) {
        const packet = (fraction) =>
          routingPacket(phase, fraction, id, index === 0, request.issue?.owner);
        if (!expected.includes(id)) {
          assert.equal(packet(next.fraction), undefined);
          continue;
        }
        const [edge, start] = packet(state.fraction);
        const [endEdge, end] = packet(next.fraction);
        assert.equal(edge, endEdge);
        const speed = (edges.get(edge) * (end - start)) / 0.1;
        assert.ok(Math.abs(speed - ROUTING_PIXELS_PER_SECOND) < 1e-8, phase);
      }
    }
  }
});

test('담당 작업에 문제가 있으면 해당 담당만 전용선으로 복귀하고 합류선에서 재검토한다', () => {
  for (const request of routes()) {
    if (!request.issue || request.issue.scope === 'plan') continue;
    const ids = Object.keys(request.jobs);
    for (const [index, id] of ids.entries()) {
      const packet = (phase, at) =>
        routingPacket(phase, at, id, index === 0, request.issue.owner);
      for (const at of [0, 0.5, 1]) {
        if (id === request.issue.owner) {
          assert.deepEqual(packet('back', at), [`back-${id}`, at]);
          assert.deepEqual(packet('retry', at), [`join-${id}`, at]);
        } else {
          assert.equal(packet('back', at), undefined);
          assert.equal(packet('retry', at), undefined);
        }
      }
    }
  }
});

test('경로를 다시 측정하면 현재 단계와 진행률에서 새 길이에 맞춰 계속 이동한다', () => {
  const edges = measuredEdges(developmentFlow);
  const first = routingTrack(developmentFlow, edges);
  const mid = advanceRoutingFrame(
    first,
    { phase: 'restart', fraction: 0 },
    travelTime(157.5)
  );
  assert.deepEqual(mid, {
    stepIndex: first.steps.length - 1,
    phase: 'restart',
    fraction: 0.5,
  });
  edges.set('restart', 630);
  const resized = routingTrack(developmentFlow, edges);
  assert.deepEqual(advanceRoutingFrame(resized, mid, 0), mid);
  assert.equal(advanceRoutingFrame(resized, mid, travelTime(63)).fraction, 0.6);
});

test('각 담당의 두 작업을 연결하고, 수정 뒤에도 검토와 판정은 같은 선을 따라간다', () => {
  for (const request of routes()) {
    const ids = Object.keys(request.jobs);
    for (const [index, id] of ids.entries()) {
      const packet = (phase) =>
        routingPacket(phase, 0.4, id, index === 0, request.issue?.owner);
      assert.deepEqual(packet('handoff'), [`task-${id}`, 0.4]);
      assert.deepEqual(
        packet('prepareLink'),
        index === 0 ? ['prepare-link', 0.4] : undefined
      );
      for (const [first, repeated, edge] of [
        ['verifyLink', 'reverifyLink', 'verify-link'],
        ['inspectLink', 'reinspectLink', 'inspect-link'],
        ['decideLink', 'redecideLink', 'decide-link'],
      ]) {
        assert.deepEqual(packet(first), index === 0 ? [edge, 0.4] : undefined);
        assert.deepEqual(packet(repeated), packet(first));
      }
    }
  }
});

test('측정 전이나 길이가 없는 경로에서는 시계를 시작하지 않는다', () => {
  const edges = measuredEdges(developmentFlow);
  assert.equal(routingTrack(developmentFlow, new Map()), undefined);
  for (const edge of edges.keys()) edges.set(edge, 0);
  assert.equal(routingTrack(developmentFlow, edges), undefined);
});
