import assert from 'node:assert/strict';
import { test } from 'node:test';
import { designFlow } from '../../src/content/design-routing.ts';
import { developmentFlow } from '../../src/content/request-routing.ts';
import {
  advanceRoutingFrame,
  ROUTING_PIXELS_PER_SECOND,
  routingPacket,
  routingTrack,
} from '../../src/lib/request-routing.ts';

const workflows = [developmentFlow, designFlow];
const assigned = ['judge', 'route', 'work', 'join', 'review'];
const correction = ['issue', 'back', 'fix', 'retry', 'recheck'];

test('개발과 디자인 유형별 한 흐름에 작업과 검토 근거 및 실제 끝점이 있다', () => {
  assert.deepEqual(
    workflows.map((request) => request.lane),
    ['development', 'design']
  );
  for (const request of workflows) {
    assert.ok(Object.keys(request.jobs).length > 0);
    assert.ok(request.decision && request.proof && request.finish);
    assert.ok(request.jobs[request.issue.owner]);
    assert.ok(request.issue.back);
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

function measuredEdges(request) {
  const edges = new Map([
    ['judge', 27],
    ['review', 90],
    ['result', 36],
    ['exit', 18],
    ['restart', 315],
  ]);
  for (const id of Object.keys(request.jobs)) {
    edges.set(`in-${id}`, 99);
    edges.set(`work-${id}`, 63);
    edges.set(`join-${id}`, 117);
    edges.set(`fix-${id}`, 72);
  }
  return edges;
}

const beginning = { phase: 'judge', fraction: 0 };
const travelTime = (distance) => (distance * 1000) / ROUTING_PIXELS_PER_SECOND;

test('직접 통과와 수정 경로가 판단부터 시작해 여러 바퀴 뒤에도 같은 위치로 이어진다', () => {
  for (const request of routes()) {
    const track = routingTrack(request, measuredEdges(request));
    assert.deepEqual(
      track.steps.map(({ phase }) => phase),
      [
        ...assigned,
        ...(request.issue ? correction : []),
        'exit',
        'done',
        'restart',
      ]
    );
    for (const cycles of [0, 1, 2, 1000]) {
      let time = cycles * travelTime(track.length);
      for (const { phase, length } of track.steps) {
        assert.deepEqual(advanceRoutingFrame(track, beginning, time), {
          phase,
          fraction: 0,
        });
        assert.deepEqual(
          advanceRoutingFrame(track, beginning, time + travelTime(length / 2)),
          { phase, fraction: 0.5 }
        );
        time += travelTime(length);
      }
    }
  }
});

test('카드·대칭 분기·담당 복귀·재검토·순환선에서 모든 점의 초당 이동 거리가 같다', () => {
  for (const request of routes()) {
    const ids = Object.keys(request.jobs);
    const edges = measuredEdges(request);
    const track = routingTrack(request, edges);
    for (const { phase } of track.steps) {
      const state = { phase, fraction: 0.1 };
      const next = advanceRoutingFrame(track, state, 100);
      assert.equal(next.phase, phase);
      const expected = ['route', 'work', 'join'].includes(phase)
        ? ids
        : correction.includes(phase)
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
        const speed = (edges.get(edge) * Math.abs(end - start)) / 0.1;
        assert.ok(Math.abs(speed - ROUTING_PIXELS_PER_SECOND) < 1e-8, phase);
      }
    }
  }
});

function junction([edge, position]) {
  const ends = {
    judge: ['judge-top', 'judge-bottom'],
    review: ['review-top', 'review-bottom'],
    exit: ['review-bottom', 'result-top'],
    result: ['result-top', 'result-bottom'],
    restart: ['result-bottom', 'judge-top'],
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
    const { steps } = routingTrack(request, measuredEdges(request));
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
    for (const [index, { phase }] of steps.entries()) {
      const next = steps[(index + 1) % steps.length].phase;
      const end = ports(phase, 1);
      assert.ok(end.size > 0 && !end.has(undefined), phase);
      assert.deepEqual(end, ports(next, 0), phase + ' → ' + next);
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
  assert.deepEqual(mid, { phase: 'restart', fraction: 0.5 });
  edges.set('restart', 630);
  const resized = routingTrack(developmentFlow, edges);
  assert.deepEqual(advanceRoutingFrame(resized, mid, 0), mid);
  assert.equal(advanceRoutingFrame(resized, mid, travelTime(63)).fraction, 0.6);
});

test('측정 전이나 길이가 없는 경로에서는 시계를 시작하지 않는다', () => {
  const edges = measuredEdges(developmentFlow);
  assert.equal(routingTrack(developmentFlow, new Map()), undefined);
  for (const edge of edges.keys()) edges.set(edge, 0);
  assert.equal(routingTrack(developmentFlow, edges), undefined);
});
