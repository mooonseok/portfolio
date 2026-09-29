import type { DecisionVariant, WorkTrack } from '@/constants/project';

export interface WorkItem {
  title: string;
  body: string[];
  track?: WorkTrack;
}

export interface Decision {
  title: string;
  body: string[];
  variant?: DecisionVariant;
}
