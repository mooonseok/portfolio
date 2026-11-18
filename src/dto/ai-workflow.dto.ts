export type WorkflowOwner = 'screen' | 'data' | 'motion';

export interface WorkflowStage {
  label: string;
  owner: string;
  body: string;
}

export interface WorkflowIssue {
  id: string;
  label: string;
  source: number;
  target: number;
  owner?: WorkflowOwner;
  reason: string;
}

export interface WorkflowRequest {
  id: string;
  label: string;
  example?: string;
  exampleLabel?: string;
  stages: WorkflowStage[];
  workers?: { id: WorkflowOwner; label: string; task: string }[];
  issues: WorkflowIssue[];
}
