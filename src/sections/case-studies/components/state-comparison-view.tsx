import { Box } from '@/components/atoms/box';
import { Column } from '@/components/atoms/column';
import { Heading } from '@/components/atoms/heading';
import { Text } from '@/components/atoms/text';
import { StateSketch } from '@/components/molecules/state-sketch';
import { VisualsNote } from '@/components/organisms/visuals-note';
import type { StateExample } from '@/dto/state-example.dto';
import { HEADING } from '@/constants/tag';

export function StateComparisonView({ example }: { example: StateExample }) {
  return (
    <Column className='gap-6'>
      <Text className='text-body leading-[1.7]'>{example.intro}</Text>
      <Box className='grid grid-cols-1 gap-7 tab:grid-cols-3 tab:gap-5'>
        {example.states.map((state) => (
          <Column key={state.id} className='gap-4'>
            <Heading level={HEADING.H3} className='text-[18px] font-medium'>
              {state.label}
            </Heading>
            <StateSketch
              state={state.id}
              slotLabel={example.slotLabel}
              trayLabel={example.trayLabel}
            />
            <Text className='text-small leading-[1.7]'>{state.body}</Text>
          </Column>
        ))}
      </Box>
      <Text className='text-small text-subtle'>{example.caption}</Text>
      <VisualsNote />
    </Column>
  );
}
