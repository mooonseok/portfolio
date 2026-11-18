export type RoutingTarget = 'primary' | 'support';
export type RoutingLane = 'development' | 'design';

export interface RoutingRequest {
  id: string;
  label: string;
  lane: RoutingLane;
  reason: string;
  decision: string;
  prepare: string;
  jobs: Partial<
    Record<RoutingTarget, { label: string; action: string; finish: string }>
  >;
  gather: string;
  proof: string;
  review: string;
  decisionTest: string;
  issue?: {
    owner: RoutingTarget;
    finding: string;
    scope?: 'work' | 'plan';
  };
  planIssue: string;
  finish: string;
  handoff?: string;
}

export type RoutingPhase =
  | 'judge'
  | 'prepareLink'
  | 'prepare'
  | 'route'
  | 'work'
  | 'handoff'
  | 'implement'
  | 'join'
  | 'gather'
  | 'verifyLink'
  | 'review'
  | 'inspectLink'
  | 'inspect'
  | 'decideLink'
  | 'decide'
  | 'issue'
  | 'back'
  | 'fix'
  | 'retry'
  | 'regather'
  | 'reverifyLink'
  | 'recheck'
  | 'reinspectLink'
  | 'reinspect'
  | 'redecideLink'
  | 'passed'
  | 'exit'
  | 'done'
  | 'restart';

export interface RoutingPainter {
  lengths: ReadonlyMap<string, number>;
  paint(phase: RoutingPhase, fraction: number): void;
}
