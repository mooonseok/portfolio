import type { RoutingPhase, RoutingRequest } from '@/dto/request-routing.dto';

export const ROUTING_PIXELS_PER_SECOND = 90;

interface RoutingPosition {
  phase: RoutingPhase;
  fraction: number;
}

interface RoutingTrack {
  steps: { phase: RoutingPhase; length: number }[];
  length: number;
}

export function routingTrack(
  request: RoutingRequest,
  lengths: ReadonlyMap<string, number>
): RoutingTrack | undefined {
  const ids = Object.keys(request.jobs);
  const owner = request.issue?.owner;
  const phases: RoutingPhase[] = ['judge', 'route', 'work', 'join', 'review'];
  if (owner) phases.push('issue', 'back', 'fix', 'retry', 'recheck');
  phases.push('exit', 'done', 'restart');

  const steps: RoutingTrack['steps'] = [];
  let total = 0;
  for (const phase of phases) {
    const [edge, start, end] = routingSegment(phase, owner ?? ids[0], owner);
    const edgeLength = lengths.get(edge);
    if (edgeLength === undefined) return;
    const length = edgeLength * Math.abs(end - start);
    steps.push({ phase, length });
    total += length;
  }
  if (total > 0) return { steps, length: total };
}

export function advanceRoutingFrame(
  track: RoutingTrack,
  current: RoutingPosition,
  elapsedMs: number
): RoutingPosition {
  let index = track.steps.findIndex((step) => step.phase === current.phase);
  let step = track.steps[index];
  const travelled = (elapsedMs * ROUTING_PIXELS_PER_SECOND) / 1000;
  let distance = current.fraction * step.length + (travelled % track.length);
  while (distance >= step.length) {
    distance -= step.length;
    index = (index + 1) % track.steps.length;
    step = track.steps[index];
  }
  return { phase: step.phase, fraction: distance / step.length };
}

function routingSegment(
  phase: RoutingPhase,
  id: string,
  owner?: string
): readonly [edge: string, start: number, end: number] {
  switch (phase) {
    case 'judge':
    case 'exit':
    case 'restart':
      return [phase, 0, 1];
    case 'route':
      return [`in-${id}`, 0, 1];
    case 'work':
      return [`work-${id}`, 0, 1];
    case 'join':
    case 'retry':
      return [`join-${id}`, 0, 1];
    case 'review':
      return ['review', 0, owner ? 0.5 : 1];
    case 'issue':
      return ['review', 0.5, 0];
    case 'back':
      return [`join-${id}`, 1, 0];
    case 'fix':
      return [`fix-${id}`, 0, 1];
    case 'recheck':
      return ['review', 0, 1];
    case 'done':
      return ['result', 0, 1];
  }
}

export function routingPacket(
  phase: RoutingPhase,
  fraction: number,
  id: string,
  first: boolean,
  owner?: string
): readonly [edge: string, position: number] | undefined {
  switch (phase) {
    case 'route':
    case 'work':
    case 'join':
      break;
    case 'issue':
    case 'back':
    case 'fix':
    case 'retry':
    case 'recheck':
      if (id !== owner) return;
      break;
    default:
      if (!first) return;
  }
  const [edge, start, end] = routingSegment(phase, id, owner);
  return [edge, start + fraction * (end - start)];
}
