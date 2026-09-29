import { ExperienceAxisView } from './components/experience-axis-view';
import { ExperienceTimelineView } from './components/experience-timeline-view';
import { SectionHeading } from '@/components/molecules/section-heading';
import { ScrollScene } from '@/components/organisms/scroll-scene';
import type { ExperienceViewProps } from '@/dto/profile.dto';
import { BREAKPOINT } from '@/constants/breakpoint';
import { HEADING, TAG } from '@/constants/tag';

export function ExperienceView({ years, timeline }: ExperienceViewProps) {
  return (
    <ScrollScene
      as={TAG.SECTION}
      steps={false}
      id='experience'
      className='container pt-30 tab:pt-40 lap:pt-(--section)'
      aria-labelledby='exp-h'
    >
      <SectionHeading
        id='exp-h'
        label='—'
        title='Experience'
        size={HEADING.H3}
        rule={false}
        railFrom={BREAKPOINT.DESKTOP}
        labelFrom={BREAKPOINT.DESKTOP}
      />
      <ExperienceAxisView years={years} />
      <ExperienceTimelineView years={timeline} />
    </ScrollScene>
  );
}
