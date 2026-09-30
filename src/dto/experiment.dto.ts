import type { Field } from '@/dto/field.dto';
import type { FlowNode } from '@/dto/flow.dto';

export interface ControlExperiment {
  flow: FlowNode[];
  rows: Field[];
}

export interface Experiment {
  title: string;
  notShipped: boolean;
  conclusion: string;
  flow: FlowNode[];
  rows: Field[];
}

export interface EngineeringNote {
  title: string;
  flow: FlowNode[];
  fields: Field[];
}
