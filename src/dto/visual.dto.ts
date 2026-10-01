import type { VisualId } from '@/constants/visual';

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
  caption?: string;
}

export type Visuals = Record<string, Visual>;
