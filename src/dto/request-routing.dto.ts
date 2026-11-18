import type { WorkflowOwner } from './ai-workflow.dto';

export interface RoutingRequest {
  id: string;
  quote: string;
  reason: string;
  decision: string;
  jobs: Partial<Record<WorkflowOwner, string>>;
  issue?: {
    owner: WorkflowOwner;
    label: string;
    fix: string;
    back: string;
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
