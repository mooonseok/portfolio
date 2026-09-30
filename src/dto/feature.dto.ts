import type { IbEdge, IbSystem } from '@/constants/surface';

export interface FeatureStep {
  id: string;
  label: string;
  surface: string;
  systems: IbSystem[];
  edges: IbEdge[];
  body: string;
}

export interface FeatureSystem {
  id: IbSystem;
  sub?: string;
}

export interface Feature {
  label: string;
  title: string;
  hint: string;
  note: string;
  systems: FeatureSystem[];
  steps: FeatureStep[];
}
