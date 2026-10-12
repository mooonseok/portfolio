import type { ReactNode, RefObject } from 'react';
import type { SurfaceLabel } from '@/constants/case';
import type { AccentTone } from '@/constants/tone';
import type { StatusKind } from '@/constants/status';
import type { NavId } from '@/constants/navigation';
import type { ContentsGroup } from '@/dto/navigation.dto';
import type { Project, ProjectLink } from '@/dto/project.dto';
import type { StatusItem } from '@/dto/status.dto';

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
  navLabel?: string;
}

export interface CaseStudyTemplateProps {
  project: Project;
  darkHeader?: boolean;
  children: ReactNode;
  surfaceLabel?: SurfaceLabel;
  role?: string;
}

export interface CaseHeader {
  title: string;
  period?: string;
  status?: StatusItem[];
  summary?: string;
  role?: string[];
  links?: ProjectLink[];
}

export interface CaseNav {
  back: boolean;
  current?: NavId;
}

export interface CaseHeaderViewProps {
  header: CaseHeader;
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
  nav?: CaseNav;
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
