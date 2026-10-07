import { StoryCardView } from './components/story-card-view';
import { Heading } from '@/components/atoms/heading';
import { cx } from '@/lib/cx';
import { Grid } from '@/components/atoms/grid';
import { SectionHeading } from '@/components/molecules/section-heading';
import { ScrollScene } from '@/components/organisms/scroll-scene';
import type { EngineeringStoriesViewProps } from '@/dto/profile.dto';
import { BREAKPOINT } from '@/constants/breakpoint';
import { HEADING, TAG } from '@/constants/tag';

export function EngineeringStoriesView({
  cards,
  compact,
}: EngineeringStoriesViewProps) {
  return (
    <ScrollScene
      as={TAG.SECTION}
      steps={false}
      className={
        compact
          ? 'container pt-10 tab:pt-16'
          : 'container pt-30 tab:pt-40 lap:pt-(--section)'
      }
      aria-labelledby='stories-h'
    >
      {compact ? (
        <Heading
          id='stories-h'
          level={HEADING.H2}
          className='text-h3 leading-[1.25] tracking-[-0.01em]'
        >
          대표 구현 사례
        </Heading>
      ) : (
        <SectionHeading
          id='stories-h'
          label=''
          title='대표 구현 사례'
          size={HEADING.H3}
          rule={false}
          railFrom={BREAKPOINT.DESKTOP}
        />
      )}
      <Grid
        className={cx(
          'mt-10 grid-cols-[minmax(0,1fr)] gap-10 tab:grid-cols-2 tab:[align-items:start] tab:gap-(--gutter)',
          compact
            ? 'lap:grid-cols-3'
            : 'lap:mt-16 lap:ml-[calc((100%_-_11_*_var(--gutter))_/_6_+_2_*_var(--gutter))] wide:grid-cols-3'
        )}
      >
        {cards.map((card) => (
          <StoryCardView key={card.story.id} {...card} />
        ))}
      </Grid>
    </ScrollScene>
  );
}
