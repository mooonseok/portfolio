import { ApcBlockView } from './components/apc-block-view';
import { FarmFamBlockView } from './components/farmfam-block-view';
import { SmartFarmBlockView } from './components/smart-farm-block-view';
import { Box } from '@/components/atoms/box';
import { SectionHeading } from '@/components/molecules/section-heading';
import type { SelectedWorkViewProps } from '@/dto/selected-work.dto';

export function SelectedWorkView({
  farmfam,
  apc,
  smartFarm,
}: SelectedWorkViewProps) {
  return (
    <>
      <Box
        id='web-work'
        className='container grid-page gap-y-16 pt-16 tab:gap-y-24 tab:pt-24'
      >
        <FarmFamBlockView {...farmfam} />
        <ApcBlockView {...apc} />
      </Box>
      <Box className='container pt-16 tab:pt-24'>
        <SectionHeading
          id='experiment-h'
          label=''
          title='센서·제어 실험'
          anchor={false}
        />
      </Box>
      <SmartFarmBlockView {...smartFarm} />
    </>
  );
}
