export type RoutingTarget = 'primary' | 'support';
export type RoutingLane = 'development' | 'design';

export interface RoutingRequest {
  id: string;
  label: string;
  lane: RoutingLane;
  quote: string;
  reason: string;
  decision: string;
  jobs: Partial<Record<RoutingTarget, string>>;
  work: string;
  proof: string;
  review: string;
  issue?: {
    owner: RoutingTarget;
    label: string;
    fix: string;
    back: string;
    retry: string;
  };
  finish: string;
}

export type RoutingPhase =
  | 'request'
  | 'entry'
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
  | 'done';
