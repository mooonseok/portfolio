import type { RoutingPhase, RoutingRequest } from '@/dto/request-routing.dto';

type Beat = readonly [phase: RoutingPhase, duration: number];

export function routingTimeline(request: RoutingRequest) {
  const branches = Object.keys(request.jobs).length;
  const branchTravel = branches > 1 ? 460 : 320;
  const steps: Beat[] = [
    ['request', request.quote.length > 40 ? 4200 : 3200],
    ['entry', 320],
    ['judge', 3400],
    ['route', branchTravel],
    ['work', branches > 1 ? 3400 : 2800],
    ['join', branchTravel],
    ['review', 3200],
  ];
  if (request.issue) {
    steps.push(
      ['issue', 2800],
      ['back', 400],
      ['fix', 3200],
      ['retry', 400],
      ['recheck', 3200]
    );
  }
  steps.push(['exit', 320], ['done', 3200], ['restart', 1200]);
  return { steps, duration: steps.reduce((sum, [, ms]) => sum + ms, 0) };
}

export function advanceRoutingTime(elapsed: number, frameDelta: number) {
  return elapsed + Math.min(frameDelta, 80);
}

export function routingFrame(
  timeline: ReturnType<typeof routingTimeline>,
  elapsed: number
) {
  let remaining = Math.max(0, elapsed) % timeline.duration;
  for (const [phase, duration] of timeline.steps) {
    if (remaining < duration) return { phase, fraction: remaining / duration };
    remaining -= duration;
  }
  return { phase: 'request' as const, fraction: 0 };
}

export function routingPacket(
  phase: RoutingPhase,
  fraction: number,
  id: string,
  first: boolean,
  owner?: string
): readonly [edge: string, position: number] | undefined {
  switch (phase) {
    case 'request':
    case 'entry':
    case 'judge':
    case 'exit':
    case 'restart':
      return first ? [phase, fraction] : undefined;
    case 'route':
      return [`in-${id}`, fraction];
    case 'work':
      return [`work-${id}`, fraction];
    case 'join':
      return [`join-${id}`, fraction];
    case 'review':
      return first ? ['review', owner ? fraction / 2 : fraction] : undefined;
    case 'issue':
      return owner === id ? ['review', (1 - fraction) / 2] : undefined;
    case 'back':
      return owner === id ? [`join-${id}`, 1 - fraction] : undefined;
    case 'fix':
      return owner === id ? [`fix-${id}`, fraction] : undefined;
    case 'retry':
      return owner === id ? [`join-${id}`, fraction] : undefined;
    case 'recheck':
      return owner === id ? ['review', fraction] : undefined;
    case 'done':
      return first ? ['result', fraction] : undefined;
  }
}
