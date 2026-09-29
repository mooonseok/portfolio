import type { WorkAreasProps } from '@/dto/explorer.dto';
import type { Flow } from '@/dto/flow.dto';
import type { Project } from '@/dto/project.dto';
import type { MetaPair } from '@/dto/visual.dto';

export interface WorkIndexEntry {
  slug: string;
  href: string;
  num: string;
  title: string;
}

export interface WorkBlock {
  project: Project;
  href: string;
  caseLabel: string;
  flowLabel: string;
  surfaces: string;
  meta: MetaPair;
}

export interface FarmFamWorkBlock extends WorkBlock {
  areas: WorkAreasProps;
  hasAreas: boolean;
}

export interface ApcWorkBlock extends WorkBlock {
  material: Flow;
  secondary: Flow[];
}

export interface SmartFarmWorkBlock extends WorkBlock {
  titleFirst: string;
  titleRest: string;
  hasTitleRest: boolean;
}

export interface SelectedWorkViewProps {
  index: WorkIndexEntry[];
  farmfam: FarmFamWorkBlock;
  apc: ApcWorkBlock;
  smartFarm: SmartFarmWorkBlock;
}
