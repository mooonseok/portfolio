import type { WorkflowIssue } from '@/dto/ai-workflow.dto';

const forward = [0, 1, 2, 3, 4] as const;

export function workflowRoute(target?: WorkflowIssue['target']): number[] {
  if (target === undefined) return [...forward];
  return [...forward.slice(0, 4), ...forward.slice(target)];
}
