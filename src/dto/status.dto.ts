import type { StatusKind } from '@/constants/status';

export interface StatusItem {
  kind: StatusKind;
  label: string;
  note?: string;
}

export interface Track {
  kind: StatusKind;
  label: string;
  note: string;
  body: string[];
}

export interface ZoneStep {
  label: string;
  sub?: string;
}

export interface Zone {
  kind: StatusKind;
  label: string;
  note: string;
  caption: string;
  steps: ZoneStep[];
  footnote?: string;
}
