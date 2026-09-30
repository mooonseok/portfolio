import type { ControlZone } from '@/constants/control';
import type { Field } from '@/dto/field.dto';
import type { FlowNode } from '@/dto/flow.dto';

export interface ControlCondition {
  id: string;
  label: string;
  zone: ControlZone;
  location: string;
  fields: Field[];
}

export interface ControlNode {
  code: string;
  sub: string;
}

export interface ControlExperiment {
  title: string;
  subtitle: string;
  rows: Field[];
  hint: string;
  command: ControlNode;
  controller: ControlNode;
  equipment: ControlNode;
  zones: Record<ControlZone, string>;
  link: { id: string; label: string; body: string };
  caption: string;
  conditions: ControlCondition[];
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
