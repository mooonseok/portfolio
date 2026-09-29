import type { HTMLAttributes, ReactNode } from 'react';
import type { TAG } from '@/constants/tag';

export type SceneTag = typeof TAG.DIV | typeof TAG.SECTION | typeof TAG.ARTICLE;

export interface FlowState {
  steps: HTMLElement[];
  index: number;
}

export interface Scene {
  primary: FlowState[];
  secondary: FlowState[];
  linked: HTMLElement[];
  labels: string;
}

export type ScrollSceneProps = {
  as?: SceneTag;
  steps?: boolean;
  children: ReactNode;
} & Omit<HTMLAttributes<HTMLElement>, 'children'>;
