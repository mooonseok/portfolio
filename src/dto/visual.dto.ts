import type { NodeState } from '@/constants/flow';
import type { VisualId } from '@/constants/visual';

export interface PinPoint {
  x: number;
  y: number;
}

export interface Pin extends PinPoint {
  label: string;
  link?: string;
  state?: NodeState;
  tablet?: PinPoint;
  mobile?: PinPoint;
  hideOnMobile?: boolean;
  hideOnTablet?: boolean;
}

export interface Visual {
  id: VisualId;
  alt: string;
  brief: string;
  src?: string;
  srcMobile?: string;
  sizes?: string;
  position?: string;
  scale?: number;
  origin?: string;
  pins?: Pin[];
}

export type Visuals = Record<string, Visual>;

export type MetaPair = [string, string];
