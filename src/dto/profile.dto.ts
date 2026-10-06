import type { LabelValue } from '@/dto/field.dto';
import type { Story } from '@/dto/story.dto';

export interface StoryCard {
  story: Story;
}

export interface EngineeringStoriesViewProps {
  cards: StoryCard[];
}

export interface ToolsViewProps {
  about: string;
  rows: LabelValue[];
}
