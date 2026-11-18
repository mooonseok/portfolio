import type { WorkflowOwner } from './ai-workflow.dto';

export type RoutingTarget = WorkflowOwner | 'hierarchy' | 'layout' | 'copy';
export type RoutingLane = 'development' | 'design';

export interface RoutingRequest {
  id: string;
  lane: RoutingLane;
  quote: string;
  reason: string;
  decision: string;
  jobs: Partial<Record<RoutingTarget, string>>;
  route: string;
  work: string;
  review: string;
  issue?: {
    owner: RoutingTarget;
    label: string;
    fix: string;
    finding?: string;
    back: string;
    repair: string;
    retry: string;
  };
  finish: string;
}

export type RoutingPhase =
  | 'request'
  | 'judge'
  | 'outlet'
  | 'route'
  | 'work'
  | 'join'
  | 'issue'
  | 'back'
  | 'fix'
  | 'retry'
  | 'done';
