import { EmosaveBlockView } from './components/emosave-block-view';
import { IndianBobBlockView } from './components/indian-bob-block-view';
import { Box } from '@/components/atoms/box';
import { ScrollScene } from '@/components/organisms/scroll-scene';
import type { FeaturedWorkViewProps } from '@/dto/featured-work.dto';
import { TAG } from '@/constants/tag';

export function FeaturedWorkView({
  indianBob,
  emosave,
}: FeaturedWorkViewProps) {
  return (
    <ScrollScene
      as={TAG.DIV}
      steps={false}
      className='container pt-20 tab:pt-24 lap:pt-30'
      id='work'
    >
      <Box id='flutter-work' className='grid-page gap-y-16 tab:gap-y-24'>
        <EmosaveBlockView {...emosave} />
        <IndianBobBlockView {...indianBob} />
      </Box>
    </ScrollScene>
  );
}
