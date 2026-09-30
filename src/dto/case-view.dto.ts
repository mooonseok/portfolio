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
  showScope: boolean;
  showStateScope: boolean;
  showContext: boolean;
  showWork: boolean;
  showTech: boolean;
  showCurrent: boolean;
}

export interface ApcCaseViewProps extends CaseViewModel {
  domains: DomainExplorerProps;
  showContext: boolean;
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
  showContext: boolean;
  showWork: boolean;
  showMonitoringWork: boolean;
  showControlWork: boolean;
  showCurrent: boolean;
  showCurrentMonitoring: boolean;
  showCurrentControl: boolean;
  currentMonitoring: string[];
  currentControl: string[];
}

export interface IndianBobCaseViewProps extends CaseViewModel {
  showContext: boolean;
  showRelation: boolean;
  showWork: boolean;
  showNoteFields: boolean;
  showCurrent: boolean;
}

export interface EmosaveCaseViewProps extends CaseViewModel {
  showInteraction: boolean;
  showWork: boolean;
  showCurrent: boolean;
  interactionFocus: InteractionFocus[];
  workParagraphs: string[];
}
