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
