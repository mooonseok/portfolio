import { StoryCardView } from './components/story-card-view';
import { Grid } from '@/components/atoms/grid';
import { SectionHeading } from '@/components/molecules/section-heading';
import { ScrollScene } from '@/components/organisms/scroll-scene';
import type { EngineeringStoriesViewProps } from '@/dto/profile.dto';
import { BREAKPOINT } from '@/constants/breakpoint';
import { HEADING, TAG } from '@/constants/tag';

export function EngineeringStoriesView({ cards }: EngineeringStoriesViewProps) {
  return (
    <ScrollScene
      as={TAG.SECTION}
      steps={false}
      className='container pt-30 tab:pt-40 lap:pt-(--section)'
      aria-labelledby='stories-h'
    >
      <SectionHeading
        id='stories-h'
        label='S01—S03'
        title='Small Engineering Stories'
        size={HEADING.H3}
        rule={false}
        railFrom={BREAKPOINT.DESKTOP}
      />
      <Grid className='mt-10 grid-cols-[minmax(0,1fr)] gap-10 tab:grid-cols-3 tab:[align-items:start] tab:gap-(--gutter) lap:mt-16 lap:ml-[calc((100%_-_11_*_var(--gutter))_/_6_+_2_*_var(--gutter))]'>
        {cards.map((card) => (
          <StoryCardView key={card.story.id} {...card} />
        ))}
      </Grid>
    </ScrollScene>
  );
}
