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
        id='work'
        className='container pt-16 pb-0 tab:pt-40 tab:pb-16 lap:pt-(--section) lap:pb-20'
        aria-labelledby='selected-h'
      >
        <SectionHeading
          id='selected-h'
          anchor={false}
          label='01—03'
          title='Selected Work'
          aside={
            <Column as={TAG.OL} className='mono leading-[1.6]'>
              {index.map((e) => (
                <ListItem key={e.slug}>
                  <Anchor href={e.href} className='inline-block py-0.5'>
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
      <SmartFarmBlockView {...smartFarm} />
    </>
  );
}
