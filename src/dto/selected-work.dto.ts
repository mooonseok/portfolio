import type { Project } from '@/dto/project.dto';

export interface WorkIndexEntry {
  slug: string;
  href: string;
  num: string;
  title: string;
}

export interface WorkBlock {
  project: Project;
  href: string;
}

export type FarmFamWorkBlock = WorkBlock;
export type ApcWorkBlock = WorkBlock;
export type SmartFarmWorkBlock = WorkBlock;

export interface SelectedWorkViewProps {
  index: WorkIndexEntry[];
  farmfam: FarmFamWorkBlock;
  apc: ApcWorkBlock;
  smartFarm: SmartFarmWorkBlock;
}
