import type { RoutingPhase, RoutingRequest } from '@/dto/request-routing.dto';

export const ROUTING_PIXELS_PER_SECOND = 90;
const CARD_HIGHLIGHT_MS = 1500;

interface RoutingPosition {
  stepIndex?: number;
  phase: RoutingPhase;
  fraction: number;
}

interface RoutingTrack {
  steps: { phase: RoutingPhase; duration: number }[];
  duration: number;
}

function connection(phase: RoutingPhase, id: string) {
  switch (phase) {
    case 'prepareLink':
      return 'prepare-link';
    case 'route':
      return `in-${id}`;
    case 'handoff':
      return `task-${id}`;
    case 'join':
    case 'retry':
      return `join-${id}`;
    case 'back':
      return `back-${id}`;
    case 'verifyLink':
    case 'reverifyLink':
      return 'verify-link';
    case 'inspectLink':
    case 'reinspectLink':
      return 'inspect-link';
    case 'decideLink':
    case 'redecideLink':
      return 'decide-link';
    case 'exit':
    case 'restart':
      return phase;
  }
}

export function routingTrack(
  request: RoutingRequest,
  lengths: ReadonlyMap<string, number>
): RoutingTrack | undefined {
  const owner = request.issue?.owner;
  const id = owner ?? Object.keys(request.jobs)[0];
  const workAndReview: RoutingPhase[] = [
    'route',
    'work',
    'handoff',
    'implement',
    'join',
    'gather',
    'verifyLink',
    'review',
    'inspectLink',
    'inspect',
    'decideLink',
  ];
  const phases: RoutingPhase[] = [
    'judge',
    'prepareLink',
    'prepare',
    ...workAndReview,
    'decide',
  ];
  if (owner) {
    phases.push('issue', 'back', 'fix');
    if (request.issue?.scope === 'plan') {
      phases.push(...workAndReview);
    } else {
      phases.push(
        'retry',
        'regather',
        'reverifyLink',
        'recheck',
        'reinspectLink',
        'reinspect',
        'redecideLink'
      );
    }
    phases.push('passed');
  }
  phases.push('exit', 'done', 'restart');

  const steps: RoutingTrack['steps'] = [];
  let total = 0;
  for (const phase of phases) {
    const edge = connection(phase, id);
    let duration = CARD_HIGHLIGHT_MS;
    if (edge) {
      const distance = lengths.get(edge);
      if (distance === undefined || distance <= 0) return;
      duration = (distance * 1000) / ROUTING_PIXELS_PER_SECOND;
    }
    steps.push({ phase, duration });
    total += duration;
  }
  return { steps, duration: total };
}

export function advanceRoutingFrame(
  track: RoutingTrack,
  current: RoutingPosition,
  elapsedMs: number
) {
  let index =
    current.stepIndex ??
    track.steps.findIndex((step) => step.phase === current.phase);
  let step = track.steps[index];
  let elapsed = current.fraction * step.duration + (elapsedMs % track.duration);
  while (elapsed >= step.duration) {
    elapsed -= step.duration;
    index = (index + 1) % track.steps.length;
    step = track.steps[index];
  }
  return {
    stepIndex: index,
    phase: step.phase,
    fraction: elapsed / step.duration,
  };
}

export function routingPacket(
  phase: RoutingPhase,
  fraction: number,
  id: string,
  first: boolean,
  owner?: string
): readonly [edge: string, position: number] | undefined {
  const edge = connection(phase, id);
  if (!edge) return;
  switch (phase) {
    case 'route':
    case 'handoff':
    case 'join':
      break;
    case 'back':
    case 'retry':
      if (id !== owner) return;
      break;
    default:
      if (!first) return;
  }
  return [edge, fraction];
}
