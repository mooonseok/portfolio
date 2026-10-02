import type { VisualSlot } from '@/constants/visual';
import type {
  EngineeringNote,
  ControlExperiment,
  Experiment,
} from '@/dto/experiment.dto';
import type { Domain } from '@/dto/domain.dto';
import type { Feature } from '@/dto/feature.dto';
import type { StateExample } from '@/dto/state-example.dto';
import type { TechNote } from '@/dto/field.dto';
import type { RelationMap, StateScope } from '@/dto/explorer.dto';
import type { Flow } from '@/dto/flow.dto';
import type { Track } from '@/dto/status.dto';
import type { SurfaceRelationContent, SurfaceTile } from '@/dto/surface.dto';
import type { Decision, WorkItem } from '@/dto/work.dto';

export interface InteractionFocus {
  title: string;
  body: string[];
  visual: VisualSlot;
  withStates?: boolean;
}

export interface CurrentStateTracks {
  monitoring: string[];
  control: string[];
}

export interface CaseContent {
  role: string[];
  roleSurfaces?: SurfaceTile[];
  roleTracks?: Track[];
  stateScope?: StateScope;
  contextProblem: string[];
  systemFlows: Flow[];
  domainsTitle?: string;
  domains?: Domain[];
  monitoringFlow?: Flow;
  feature?: Feature;
  surfaceRelation?: SurfaceRelationContent;
  work: WorkItem[];
  connections?: WorkItem[];
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
  stateExample?: StateExample;
}
