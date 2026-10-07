import { EngineeringStoriesView } from './engineering-stories-view';
import { stories } from '@/content/site';
import type { StoryCard, HomeSectionProps } from '@/dto/profile.dto';

export function EngineeringStoriesContainer({
  compact = false,
}: HomeSectionProps) {
  const cards: StoryCard[] = stories.map((story) => ({ story }));
  return <EngineeringStoriesView cards={cards} compact={compact} />;
}
