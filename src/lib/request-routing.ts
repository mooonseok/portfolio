import type { RoutingPhase, RoutingRequest } from '@/dto/request-routing.dto';

type Beat = readonly [RoutingPhase, number];

const assignment: readonly Beat[] = [
  ['request', 2000],
  ['judge', 4800],
  ['outlet', 5600],
  ['route', 7000],
  ['work', 8450],
  ['join', 10000],
];

const direct: readonly Beat[] = [...assignment, ['done', 12200]];
const correction: readonly Beat[] = [
  ...assignment,
  ['issue', 11800],
  ['back', 13250],
  ['fix', 14650],
  ['retry', 16100],
  ['done', 18500],
];

export function routingFrame(request: RoutingRequest, elapsed: number) {
  let start = 0;
  for (const [phase, end] of request.issue ? correction : direct) {
    if (elapsed < end) {
      let fraction = (elapsed - start) / (end - start);
      if (phase === 'request')
        fraction = Math.min(1, Math.max(0, (elapsed - 450) / 1350));
      if (phase === 'judge') fraction = 1;
      return { phase, fraction };
    }
    start = end;
  }
  return { phase: 'done' as const, fraction: 1 };
}
