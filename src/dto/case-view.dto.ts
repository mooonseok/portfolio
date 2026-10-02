import type { InteractionFocus } from '@/dto/case.dto';
import type { RelationSection } from '@/dto/explorer.dto';
import type { DomainExplorerProps } from '@/dto/domain.dto';
import type { GroupTag } from '@/dto/navigation.dto';
import type { Project } from '@/dto/project.dto';
import type { WorkItem } from '@/dto/work.dto';

export interface CaseGroupTags {
  system?: GroupTag;
  interaction?: GroupTag;
  work?: GroupTag;
  engineering?: GroupTag;
  currentState?: GroupTag;
}

export interface CaseViewModel {
  p: Project;
  groups: CaseGroupTags;
}

export interface FarmFamPlusCaseViewProps extends CaseViewModel {
  relation?: RelationSection;
}

export interface ApcCaseViewProps extends CaseViewModel {
  domains: DomainExplorerProps;
  showDomains: boolean;
  showWork: boolean;
  showTech: boolean;
  showCurrent: boolean;
  experimentGroup?: GroupTag;
  experimentRail?: string;
}

export interface SmartFarmCaseViewProps extends CaseViewModel {
  monitoringWork: WorkItem[];
  controlWork: WorkItem[];
  showWork: boolean;
  showMonitoringWork: boolean;
  showControlWork: boolean;
  showCurrent: boolean;
  showCurrentMonitoring: boolean;
  showCurrentControl: boolean;
  currentMonitoring: string[];
  currentControl: string[];
}

export type IndianBobCaseViewProps = CaseViewModel;

export interface EmosaveCaseViewProps extends CaseViewModel {
  lead?: InteractionFocus;
  rest: InteractionFocus[];
}
