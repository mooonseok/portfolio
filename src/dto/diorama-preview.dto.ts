import type { KeyboardEvent, MouseEvent, RefObject } from 'react';
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
  projects: DioramaProject[];
  project: DioramaProject | null;
  hostRef: RefObject<HTMLDivElement | null>;
  labelRefs: RefObject<Partial<Record<ProjectSlug, HTMLButtonElement | null>>>;
  selected: ProjectSlug | null;
  enabled: boolean;
  ready: boolean;
  failed: boolean;
  reduced: boolean;
  onSelect: (slug: ProjectSlug, event: MouseEvent<HTMLButtonElement>) => void;
  onClose: () => void;
  onToggle: () => void;
  onKeyDown: (event: KeyboardEvent) => void;
}
