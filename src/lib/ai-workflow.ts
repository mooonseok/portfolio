import type { WorkflowIssue, WorkflowRequest } from '@/dto/ai-workflow.dto';

export function workflowRoute(
  request: WorkflowRequest,
  issue?: WorkflowIssue
): number[] {
  const forward = request.stages.map((_, index) => index);
  if (!issue) return forward;

  return [
    ...forward.slice(0, issue.source + 1),
    ...forward.slice(issue.target),
  ];
}
