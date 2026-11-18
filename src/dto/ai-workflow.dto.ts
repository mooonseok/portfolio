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
  reason: string;
}

export interface WorkflowRequest {
  id: string;
  label: string;
  stages: WorkflowStage[];
  issues: WorkflowIssue[];
}
