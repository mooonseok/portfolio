import { EngineeringStoriesView } from './engineering-stories-view';
import { stories } from '@/content/site';
import type { StoryCard } from '@/dto/profile.dto';

export function EngineeringStoriesContainer() {
  const cards: StoryCard[] = stories.map((story) => ({ story }));
  return <EngineeringStoriesView cards={cards} />;
}
