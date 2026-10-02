import type { Project } from '@/dto/project.dto';

export interface FeaturedBlock {
  project: Project;
  href: string;
}

export type IndianBobBlock = FeaturedBlock;
export type EmosaveBlock = FeaturedBlock;

export interface FeaturedWorkViewProps {
  indianBob: IndianBobBlock;
  emosave: EmosaveBlock;
}
