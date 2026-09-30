import { Column } from '@/components/atoms/column';
import { List, ListItem } from '@/components/atoms/list';
import { Text } from '@/components/atoms/text';
import { StateSketch } from '@/components/molecules/state-sketch';
import type { StateExample } from '@/dto/state-example.dto';
import { LIST_TAG, TAG } from '@/constants/tag';

export function EmosaveStatesView({ example }: { example: StateExample }) {
  return (
    <Column as={TAG.FIGURE} className='gap-2.5'>
      <List
        as={LIST_TAG.OL}
        aria-label={example.states.map((s) => s.code).join(' → ')}
        className='grid grid-cols-3 gap-2 tab:gap-3'
      >
        {example.states.map((s, i) => (
          <ListItem key={s.id} className='flex min-w-0 flex-col gap-2'>
            <StateSketch state={s.id} compact />
            <Text as={TAG.SPAN} className='mono [overflow-wrap:anywhere]'>
              0{i + 1} {s.code}
            </Text>
          </ListItem>
        ))}
      </List>
      <Text as={TAG.FIGCAPTION} className='text-small text-subtle'>
        {example.homeCaption}
      </Text>
    </Column>
  );
}
