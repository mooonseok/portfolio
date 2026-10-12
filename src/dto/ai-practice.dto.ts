import type { CaseMetaRow, CaseNextLink } from '@/dto/case-template.dto';
import type { TechNote } from '@/dto/field.dto';
import type { ContentsGroup, GroupTag } from '@/dto/navigation.dto';
import type { ProjectLink } from '@/dto/project.dto';
import type { WorkItem } from '@/dto/work.dto';

export interface AiRule {
  title: string;
  summary: string;
  example: string;
}

export interface AiPracticeHome {
  title: string;
  items: string[];
  link: ProjectLink;
}

export interface AiPractice {
  title: string;
  description: string;
  summary: string;
  meta: CaseMetaRow[];
  rulesLabel: string;
  rules: AiRule[];
  rulesNote: string[];
  workTitle: string;
  work: WorkItem[];
  reviewTitle: string;
  review: AiRule[];
  reviewNote: string[];
  engineeringTitle: string;
  techNotes: TechNote[];
  collaborationTitle: string;
  collaboration: string[];
  next: CaseNextLink;
  home: AiPracticeHome;
}

export interface AiPracticeTags {
  work?: GroupTag;
  review?: GroupTag;
  engineering?: GroupTag;
  collaboration?: GroupTag;
}

export interface AiPracticeViewProps {
  content: AiPractice;
  groups: ContentsGroup[];
  tags: AiPracticeTags;
}

export interface AiPracticeSummaryViewProps {
  home: AiPracticeHome;
}
