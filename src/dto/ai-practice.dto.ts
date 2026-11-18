import type { CaseMetaRow, CaseNextLink } from '@/dto/case-template.dto';
import type { ContentsGroup } from '@/dto/navigation.dto';
import type { ProjectLink } from '@/dto/project.dto';

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
  collaborationTitle: string;
  collaboration: string[];
  next: CaseNextLink;
  home: AiPracticeHome;
}

export interface AiPracticeViewProps {
  content: AiPractice;
  groups: ContentsGroup[];
}

export interface AiPracticeSummaryViewProps {
  home: AiPracticeHome;
}
