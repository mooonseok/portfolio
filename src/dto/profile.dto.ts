import type { FlowOrient } from '@/constants/flow';
import type { FlowTone } from '@/constants/tone';
import type { LabelValue } from '@/dto/field.dto';
import type { ExperienceYear } from '@/dto/site.dto';
import type { Story } from '@/dto/story.dto';

export interface StoryCard {
  story: Story;
  experiment: boolean;
  flowTone: FlowTone;
  flowOrient: FlowOrient;
}

export interface EngineeringStoriesViewProps {
  cards: StoryCard[];
}

export interface ExperienceViewProps {
  years: ExperienceYear[];
  timeline: ExperienceYear[];
}

export interface ToolsViewProps {
  rows: LabelValue[];
}

export interface ThisWebsiteViewProps {
  rows: LabelValue[];
  note: string;
}
