import type { LabelValue } from '@/dto/field.dto';
import type { Story } from '@/dto/story.dto';

export interface StoryCard {
  story: Story;
}

export interface HomeSectionProps {
  compact?: boolean;
}

export interface EngineeringStoriesViewProps extends HomeSectionProps {
  cards: StoryCard[];
}

export interface ToolsViewProps extends HomeSectionProps {
  about: string;
  rows: LabelValue[];
}
