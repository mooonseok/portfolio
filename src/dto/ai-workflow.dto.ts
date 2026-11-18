export interface WorkflowStage {
  label: string;
  owner: string;
  body: string;
}

export interface WorkflowIssue {
  id: string;
  label: string;
  target: 0 | 1 | 2;
  reason: string;
}

export interface WorkflowRequest {
  id: string;
  label: string;
  stages: [
    WorkflowStage,
    WorkflowStage,
    WorkflowStage,
    WorkflowStage,
    WorkflowStage,
  ];
  issues: WorkflowIssue[];
}
