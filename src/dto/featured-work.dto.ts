import type { Project } from '@/dto/project.dto';
import type { StateExample } from '@/dto/state-example.dto';
import type { SurfaceRow, SurfaceTile } from '@/dto/surface.dto';
import type { MetaPair } from '@/dto/visual.dto';

export interface FeaturedBlock {
  project: Project;
  href: string;
  meta: MetaPair;
}

export interface IndianBobBlock extends FeaturedBlock {
  surfaces: SurfaceTile[];
  relationLabel: string;
  rows: SurfaceRow[];
  hasSurfaces: boolean;
  hasRelation: boolean;
}

export interface EmosaveBlock extends FeaturedBlock {
  example?: StateExample;
  hasStates: boolean;
}

export interface FeaturedWorkViewProps {
  indianBob: IndianBobBlock;
  emosave: EmosaveBlock;
}
