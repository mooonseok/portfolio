import type { CaseNextLink } from '@/dto/case-template.dto';
import type { ProjectLink } from '@/dto/project.dto';

export interface AiPracticeHome {
  title: string;
  items: string[];
  link: ProjectLink;
}

export interface AiPractice {
  title: string;
  description: string;
  next: CaseNextLink;
  home: AiPracticeHome;
}

export interface AiPracticeViewProps {
  content: AiPractice;
}

export interface AiPracticeSummaryViewProps {
  home: AiPracticeHome;
}
