import type { WorkAreasProps } from '@/dto/explorer.dto';
import type { DomainExplorerProps } from '@/dto/domain.dto';
import type { Project } from '@/dto/project.dto';
import type { Zone } from '@/dto/status.dto';
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
  domains: DomainExplorerProps;
  domainsLabelId: string;
  hasDomains: boolean;
}

export interface SmartFarmWorkBlock extends WorkBlock {
  titleFirst: string;
  titleRest: string;
  hasTitleRest: boolean;
  zones: Zone[];
  hasZones: boolean;
}

export interface SelectedWorkViewProps {
  index: WorkIndexEntry[];
  farmfam: FarmFamWorkBlock;
  apc: ApcWorkBlock;
  smartFarm: SmartFarmWorkBlock;
}
