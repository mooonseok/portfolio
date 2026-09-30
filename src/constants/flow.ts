export const FLOW_ORIENT = {
  VERTICAL: 'vertical',
  AUTO: 'auto',
  SEQUENCE: 'sequence',
} as const;

export type FlowOrient = (typeof FLOW_ORIENT)[keyof typeof FLOW_ORIENT];

export const FLOW_ROLE = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  STATIC: 'static',
} as const;

export type FlowRole = (typeof FLOW_ROLE)[keyof typeof FLOW_ROLE];

export const NODE_STATE = {
  IDLE: 'idle',
  ACTIVE: 'active',
  EXPERIMENT: 'experiment',
} as const;

export type NodeState = (typeof NODE_STATE)[keyof typeof NODE_STATE];
