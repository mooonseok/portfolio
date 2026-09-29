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
      className='container pt-30 tab:mt-40 tab:border-t tab:border-t-hairline tab:pt-16 lap:mt-(--section) lap:pt-20'
      aria-labelledby='featured-h'
    >
      <SectionHeading
        id='featured-h'
        label='04—05'
        title='Featured Work'
        rule={RULE.MOBILE}
      />
      <Box className='mt-12 grid-page gap-y-16 tab:mt-18 tab:gap-y-30 lap:mt-24'>
        <IndianBobBlockView {...indianBob} />
        <EmosaveBlockView {...emosave} />
      </Box>
    </ScrollScene>
  );
}
