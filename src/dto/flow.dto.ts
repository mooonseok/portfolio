import type { NodeState } from '@/constants/flow';

export interface FlowNode {
  label: string;
  sub?: string;
  state?: NodeState;
  hideOnMobile?: boolean;
}

export interface Flow {
  id: string;
  label?: string;
  nodes: FlowNode[];
}
