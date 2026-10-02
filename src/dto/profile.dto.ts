import type { LabelValue } from '@/dto/field.dto';
import type { ExperienceYear } from '@/dto/site.dto';
import type { Story } from '@/dto/story.dto';

export interface StoryCard {
  story: Story;
}

export interface EngineeringStoriesViewProps {
  cards: StoryCard[];
}

export interface ExperienceViewProps {
  years: ExperienceYear[];
  timeline: ExperienceYear[];
}

export interface ToolsViewProps {
  about: string;
  rows: LabelValue[];
}
