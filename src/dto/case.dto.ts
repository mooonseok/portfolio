import type { VisualSlot } from '@/constants/visual';
import type {
  EngineeringNote,
  ControlExperiment,
  Experiment,
} from '@/dto/experiment.dto';
import type { TechNote } from '@/dto/field.dto';
import type { RelationMap, StateScope } from '@/dto/explorer.dto';
import type { Flow } from '@/dto/flow.dto';
import type { Track } from '@/dto/status.dto';
import type { SurfaceRelationContent, SurfaceTile } from '@/dto/surface.dto';
import type { Decision, WorkItem } from '@/dto/work.dto';

export interface RolePhase {
  year: string;
  title: string;
  scope: string;
}

export interface InteractionFocus {
  title: string;
  body: string[];
  visual: VisualSlot;
}

export interface CurrentStateTracks {
  monitoring: string[];
  control: string[];
}

export interface CaseContent {
  role: string[];
  rolePhases?: RolePhase[];
  roleSurfaces?: SurfaceTile[];
  roleTracks?: Track[];
  stateScope?: StateScope;
  contextProblem: string[];
  systemFlows: Flow[];
  monitoringFlow?: Flow;
  featureFlow?: Flow;
  surfaceRelation?: SurfaceRelationContent;
  work: WorkItem[];
  workParagraphs?: string[];
  decisions: Decision[];
  techIntro?: string;
  techNotes: TechNote[];
  relationMap?: RelationMap;
  engineeringNote?: EngineeringNote;
  experiment?: Experiment;
  controlExperiment?: ControlExperiment;
  currentState: string[];
  currentStateTracks?: CurrentStateTracks;
  interactionFocus?: InteractionFocus[];
  stateFlow?: string[];
  stateFlowNote?: string;
}
