import { EngineeringStoriesView } from './engineering-stories-view';
import { stories } from '@/content/site';
import type { StoryCard } from '@/dto/profile.dto';
import { FLOW_ORIENT } from '@/constants/flow';
import { STORY_KIND } from '@/constants/project';
import { TONE } from '@/constants/tone';

export function EngineeringStoriesContainer() {
  const cards: StoryCard[] = stories.map((story) => ({
    story,
    experiment: story.kind === STORY_KIND.EXPERIMENT,
    flowOrient:
      story.kind === STORY_KIND.SEQUENCE
        ? FLOW_ORIENT.SEQUENCE
        : FLOW_ORIENT.VERTICAL,
    flowTone: story.kind === STORY_KIND.SEQUENCE ? TONE.MUTED : TONE.DEFAULT,
  }));
  return <EngineeringStoriesView cards={cards} />;
}
