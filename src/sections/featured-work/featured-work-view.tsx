import { EmosaveBlockView } from './components/emosave-block-view';
import { IndianBobBlockView } from './components/indian-bob-block-view';
import { Box } from '@/components/atoms/box';
import { SectionHeading } from '@/components/molecules/section-heading';
import { ScrollScene } from '@/components/organisms/scroll-scene';
import type { FeaturedWorkViewProps } from '@/dto/featured-work.dto';
import { RULE } from '@/constants/rule';
import { TAG } from '@/constants/tag';

export function FeaturedWorkView({
  indianBob,
  emosave,
}: FeaturedWorkViewProps) {
  return (
    <ScrollScene
      as={TAG.SECTION}
      steps={false}
      className='container pt-20 tab:pt-24 lap:pt-30'
      id='work'
      aria-labelledby='featured-h'
    >
      <SectionHeading
        id='featured-h'
        label='01—02'
        title='Flutter 앱 개발'
        rule={RULE.MOBILE}
      />
      <Box
        id='flutter-work'
        className='mt-10 grid-page gap-y-16 tab:mt-14 tab:gap-y-24'
      >
        <IndianBobBlockView {...indianBob} />
        <EmosaveBlockView {...emosave} />
      </Box>
    </ScrollScene>
  );
}
