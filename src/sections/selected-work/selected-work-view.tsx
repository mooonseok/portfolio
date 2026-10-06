import { ApcBlockView } from './components/apc-block-view';
import { FarmFamBlockView } from './components/farmfam-block-view';
import { SmartFarmBlockView } from './components/smart-farm-block-view';
import { Anchor } from '@/components/atoms/anchor';
import { Box } from '@/components/atoms/box';
import { Column } from '@/components/atoms/column';
import { ListItem } from '@/components/atoms/list';
import { SectionHeading } from '@/components/molecules/section-heading';
import type { SelectedWorkViewProps } from '@/dto/selected-work.dto';
import { TAG } from '@/constants/tag';

export function SelectedWorkView({
  index,
  farmfam,
  apc,
  smartFarm,
}: SelectedWorkViewProps) {
  return (
    <>
      <Box
        as={TAG.SECTION}
        id='web-work'
        className='container pt-16 pb-0 tab:pt-40 tab:pb-16 lap:pt-(--section) lap:pb-20'
        aria-labelledby='selected-h'
      >
        <SectionHeading
          id='selected-h'
          anchor={false}
          label='03—04'
          title='업무 시스템'
          aside={
            <Column as={TAG.OL} className='mono leading-[1.6]'>
              {index.map((e) => (
                <ListItem key={e.slug}>
                  <Anchor
                    href={e.href}
                    className='inline-flex min-h-11 items-center'
                  >
                    {e.num} {e.title}
                  </Anchor>
                </ListItem>
              ))}
            </Column>
          }
        />
      </Box>
      <FarmFamBlockView {...farmfam} />
      <ApcBlockView {...apc} />
      <Box className='container pt-16 tab:pt-24'>
        <SectionHeading
          id='experiment-h'
          label='05'
          title='센서·제어 실험'
          anchor={false}
        />
      </Box>
      <SmartFarmBlockView {...smartFarm} />
    </>
  );
}
