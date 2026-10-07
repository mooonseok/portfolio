import type { KeyboardEvent, MouseEvent, ReactNode, RefObject } from 'react';
import type { ProjectSlug } from '@/constants/project';

export interface DioramaLayer {
  label: string;
  summary: string;
  lines: string[];
}

export interface DioramaProject {
  slug: ProjectSlug;
  title: string;
  service: string;
  summary: string;
  period: string;
  href: string;
  experiment: boolean;
  layers: DioramaLayer[];
}

export interface DioramaPreviewProps {
  home?: boolean;
  children?: ReactNode;
  headline?: string;
  github?: string;
  projects: DioramaProject[];
  project: DioramaProject | null;
  hostRef: RefObject<HTMLDivElement | null>;
  labelRefs: RefObject<Partial<Record<ProjectSlug, HTMLButtonElement | null>>>;
  selected: ProjectSlug | null;
  wide: boolean;
  ready: boolean;
  failed: boolean;
  reduced: boolean;
  onSelect: (slug: ProjectSlug, event: MouseEvent<HTMLButtonElement>) => void;
  onClose: () => void;
  onKeyDown: (event: KeyboardEvent) => void;
}

export interface DioramaContainerProps {
  home?: boolean;
  header?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
}
