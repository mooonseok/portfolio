import type { RoutingPhase, RoutingRequest } from '@/dto/request-routing.dto';

type Beat = readonly [phase: RoutingPhase, duration: number];

export function routingTimeline(request: RoutingRequest): readonly Beat[] {
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
  steps.push(['exit', 320]);
  return steps;
}

export function advanceRoutingTime(elapsed: number, frameDelta: number) {
  return elapsed + Math.min(frameDelta, 80);
}

export function routingPacketOpacity(
  phase: RoutingPhase,
  fraction: number,
  hasIssue: boolean
) {
  switch (phase) {
    case 'review':
      if (hasIssue) return 1;
      break;
    case 'judge':
    case 'work':
    case 'recheck':
      break;
    case 'route':
    case 'join':
    case 'exit':
      return Math.min(1, fraction / 0.22);
    default:
      return 1;
  }
  return Math.max(0, Math.min(1, (0.94 - fraction) / 0.13));
}

export function routingFrame(timeline: readonly Beat[], elapsed: number) {
  let remaining = Math.max(0, elapsed);
  for (const [phase, duration] of timeline) {
    if (remaining < duration) return { phase, fraction: remaining / duration };
    remaining -= duration;
  }
  return { phase: 'done' as const, fraction: 1 };
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
      return first ? ['entry', 0] : undefined;
    case 'entry':
      return first ? ['entry', fraction] : undefined;
    case 'judge':
      return first ? ['entry', 1] : undefined;
    case 'route':
      return [`in-${id}`, fraction];
    case 'work':
      return [`in-${id}`, 1];
    case 'join':
      return [`join-${id}`, fraction];
    case 'review':
      return first ? [`join-${id}`, 1] : undefined;
    case 'issue':
    case 'recheck':
      return owner === id ? [`join-${id}`, 1] : undefined;
    case 'back':
      return owner === id ? [`join-${id}`, 1 - fraction] : undefined;
    case 'fix':
      return owner === id ? [`join-${id}`, 0] : undefined;
    case 'retry':
      return owner === id ? [`join-${id}`, fraction] : undefined;
    case 'exit':
      return first ? ['exit', fraction] : undefined;
    case 'done':
      return first ? ['exit', 1] : undefined;
  }
}
