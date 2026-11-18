import { Box } from '@/components/atoms/box';
import { Heading } from '@/components/atoms/heading';
import { List, ListItem } from '@/components/atoms/list';
import { Text } from '@/components/atoms/text';
import { HEADING, LIST_TAG, TAG } from '@/constants/tag';
import { AI_LOOP_TITLE_ID } from '@/constants/ai-practice';
import type { AiCheckFlow } from '@/dto/ai-practice.dto';

export function AiCheckLoop({ flow }: { flow: AiCheckFlow }) {
  return (
    <Box as={TAG.SECTION} id='work' aria-labelledby={AI_LOOP_TITLE_ID}>
      <Heading level={HEADING.H2} id={AI_LOOP_TITLE_ID} className='sr-only'>
        {flow.title}
      </Heading>
      <List
        as={LIST_TAG.OL}
        className='m-0 grid list-none gap-4 p-0 tab:grid-cols-3'
      >
        {flow.stages.map((stage, i) => (
          <ListItem
            key={stage.id}
            className='min-w-0 rounded-[22px] border border-hairline bg-dark-2 p-[clamp(20px,3vw,40px)]'
          >
            <Text
              as={TAG.SPAN}
              aria-hidden
              className='font-mono text-base text-[var(--marker-green)]'
            >
              {String(i + 1).padStart(2, '0')}
            </Text>
            <Heading level={HEADING.H3} className='mt-4 text-2xl font-medium'>
              {stage.label}
            </Heading>
            <Text className='mt-3 leading-relaxed text-subtle'>
              {stage.body}
            </Text>
            {stage.evidence.length > 0 && (
              <List className='mt-4 grid list-none gap-2 border-t border-hairline pt-3 text-sm text-subtle'>
                {stage.evidence.map((item) => (
                  <ListItem key={item}>{item}</ListItem>
                ))}
              </List>
            )}
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
