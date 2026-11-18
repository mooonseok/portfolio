export type RoutingTarget = 'primary' | 'support';
export type RoutingLane = 'development' | 'design';

export interface RoutingRequest {
  id: string;
  label: string;
  lane: RoutingLane;
  reason: string;
  decision: string;
  jobs: Partial<Record<RoutingTarget, string>>;
  work: string;
  proof: string;
  review: string;
  issue?: {
    owner: RoutingTarget;
    back: string;
  };
  finish: string;
}

export type RoutingPhase =
  | 'judge'
  | 'route'
  | 'work'
  | 'join'
  | 'review'
  | 'issue'
  | 'back'
  | 'fix'
  | 'retry'
  | 'recheck'
  | 'exit'
  | 'done'
  | 'restart';

export interface RoutingPainter {
  lengths: ReadonlyMap<string, number>;
  paint(phase: RoutingPhase, fraction: number): void;
}
