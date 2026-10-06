import type { Project } from '@/dto/project.dto';

export interface WorkBlock {
  project: Project;
  href: string;
}

export type FarmFamWorkBlock = WorkBlock;
export type ApcWorkBlock = WorkBlock;
export type SmartFarmWorkBlock = WorkBlock;

export interface SelectedWorkViewProps {
  farmfam: FarmFamWorkBlock;
  apc: ApcWorkBlock;
  smartFarm: SmartFarmWorkBlock;
}
