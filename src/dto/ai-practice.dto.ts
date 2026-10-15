import type { CaseMetaRow, CaseNextLink } from '@/dto/case-template.dto';
import type { TechNote } from '@/dto/field.dto';
import type { ContentsGroup, GroupTag } from '@/dto/navigation.dto';
import type { ProjectLink } from '@/dto/project.dto';
import type { AiCheckKind, LoopDir } from '@/constants/ai-practice';

export interface AiRule {
  title: string;
  summary: string;
  example: string;
}

export interface AiCheckDevice {
  kind: AiCheckKind;
  name: string;
  items: string[];
}

export interface AiCheckStage {
  id: string;
  label: string;
  body: string;
  device: AiCheckDevice;
}

export interface AiCheckFlow {
  title: string;
  loopLabel: string;
  stages: AiCheckStage[];
}

export interface AiLoopMark {
  span?: string;
  head?: string;
  dir?: LoopDir;
  bend?: string;
  order: number;
}

export interface AiLoopMarks {
  stages: AiLoopMark[];
  back: { bend: string; head: string; order: number };
  down: { line: string; head: string };
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
  checks: AiCheckFlow;
  engineeringTitle: string;
  techNotes: TechNote[];
  collaborationTitle: string;
  collaboration: string[];
  next: CaseNextLink;
  home: AiPracticeHome;
}

export interface AiPracticeTags {
  work?: GroupTag;
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
