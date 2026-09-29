import type { CaseLength, ProjectSlug, ProjectTier } from '@/constants/project';
import type { CaseContent } from '@/dto/case.dto';
import type { Flow } from '@/dto/flow.dto';
import type { StatusItem } from '@/dto/status.dto';
import type { Visuals } from '@/dto/visual.dto';

export interface ProjectHome {
  scope: string[];
  scopeMobile?: string[];
  flows: Flow[];
  cta: string;
}

export interface Project {
  slug: ProjectSlug;
  num: string;
  title: string;
  category: string;
  period: string;
  tier: ProjectTier;
  caseLength: CaseLength;
  status: StatusItem[];
  surfaces: string;
  summary: string;
  home: ProjectHome;
  visuals: Visuals;
  case: CaseContent;
}
