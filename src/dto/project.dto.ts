import type { CaseLength, ProjectSlug, ProjectTier } from '@/constants/project';
import type { CaseContent } from '@/dto/case.dto';
import type { WorkArea } from '@/dto/explorer.dto';
import type { Flow } from '@/dto/flow.dto';
import type { StatusItem, Zone } from '@/dto/status.dto';
import type { WorkItem } from '@/dto/work.dto';
import type { Visuals } from '@/dto/visual.dto';

export interface ProjectHome {
  features: WorkItem[];
  scope: string[];
  scopeMobile?: string[];
  flows: Flow[];
  areas?: WorkArea[];
  zones?: Zone[];
  cta: string;
}

export interface ProjectLink {
  label: string;
  href: string;
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
  links?: ProjectLink[];
  home: ProjectHome;
  visuals: Visuals;
  case: CaseContent;
}
