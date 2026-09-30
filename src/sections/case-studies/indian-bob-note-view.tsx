import { SequenceView } from './components/sequence-view';
import { Box } from '@/components/atoms/box';
import { Column } from '@/components/atoms/column';
import { Grid } from '@/components/atoms/grid';
import { Heading } from '@/components/atoms/heading';
import { Text } from '@/components/atoms/text';
import type { EngineeringNote } from '@/dto/experiment.dto';
import { HEADING, TAG } from '@/constants/tag';

export function IndianBobNoteView({
  note,
  showFields,
}: {
  note: EngineeringNote;
  showFields: boolean;
}) {
  return (
    <Grid className='grid-cols-[1fr] gap-y-7 px-5 py-7 surface-dark tab:p-10 lap:grid-cols-10 lap:gap-x-(--gutter) lap:gap-y-10'>
      <Column className='gap-2.5 lap:col-[1/5]'>
        <Text as={TAG.SPAN} className='mono muted'>
          ENGINEERING NOTE
        </Text>
        <Heading
          level={HEADING.H2}
          className='text-d4 leading-[1.35] tracking-[-0.005em]'
          data-reveal-item='title'
        >
          {note.title}
        </Heading>
      </Column>
      <Column className='@container gap-3 lap:col-[1/-1] lap:min-w-0'>
        <SequenceView nodes={note.flow} links={note.links} label={note.title} />
        <Text className='text-small leading-[1.6] text-dark-sub'>
          {note.footnote}
        </Text>
      </Column>
      {showFields ? (
        <Box
          as={TAG.DL}
          className='m-0 flex flex-col gap-3.5 border-t border-t-dark-rule pt-4 lap:col-[1/-1] lap:grid lap:grid-cols-3 lap:gap-(--gutter)'
        >
          {note.fields.map((f) => (
            <Column key={f.label} className='gap-1'>
              <Text as={TAG.DT} className='text-[14.5px] font-medium'>
                {f.label}
              </Text>
              {f.body.map((b) => (
                <Text
                  as={TAG.DD}
                  key={b}
                  className='m-0 text-[15px] leading-[1.6] text-dark-sub'
                >
                  {b}
                </Text>
              ))}
            </Column>
          ))}
        </Box>
      ) : null}
    </Grid>
  );
}
