import type { Field } from '@/dto/field.dto';
import type { FlowNode } from '@/dto/flow.dto';

export interface ControlExperiment {
  flow: FlowNode[];
  rows: Field[];
}

export interface Experiment extends ControlExperiment {
  title: string;
  notShipped: boolean;
}

export interface EngineeringNote {
  title: string;
  flow: FlowNode[];
  fields: Field[];
}
