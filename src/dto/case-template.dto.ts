import type { ReactNode, RefObject } from 'react';
import type { SurfaceLabel } from '@/constants/case';
import type { AccentTone } from '@/constants/tone';
import type { StatusKind } from '@/constants/status';
import type { ContentsGroup } from '@/dto/navigation.dto';
import type { Project } from '@/dto/project.dto';

export interface CaseMetaRow {
  key: string;
  value: string;
  status?: StatusKind;
  wide?: boolean;
  span?: boolean;
}

export interface CaseNextLink {
  href: string;
  title: string;
}

export interface CaseStudyTemplateProps {
  project: Project;
  darkHeader?: boolean;
  children: ReactNode;
  surfaceLabel?: SurfaceLabel;
  role?: string;
}

export interface CaseHeaderViewProps {
  project: Project;
  darkHeader?: boolean;
  titleTone: AccentTone;
  showSummary: boolean;
  meta: CaseMetaRow[];
}

export interface CaseStudyTemplateViewProps extends CaseHeaderViewProps {
  hero: ReactNode;
  children: ReactNode;
  groups: ContentsGroup[];
  next: CaseNextLink;
}

export interface CaseContentsItem {
  id: string;
  label: string;
  num: string;
}

export interface CaseContentsViewProps {
  items: CaseContentsItem[];
  currentIndex: number;
  currentNum: string;
  currentLabel?: string;
  stuck: boolean;
  listRef: RefObject<HTMLElement | null>;
  detailsRef: RefObject<HTMLDetailsElement | null>;
  onClose: () => void;
}
