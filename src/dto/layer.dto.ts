import type { Floor } from '@/constants/floor';
import type { StatusKind } from '@/constants/status';

export interface Layer {
  floor: Floor;
  summary: string;
  lines: string[];
  tech?: string;
  kind?: StatusKind;
}
