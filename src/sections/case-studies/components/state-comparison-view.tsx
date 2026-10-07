import { Column } from '@/components/atoms/column';
import { Heading } from '@/components/atoms/heading';
import { List, ListItem } from '@/components/atoms/list';
import { Text } from '@/components/atoms/text';
import { VisualsNote } from '@/components/organisms/visuals-note';
import type { StateExample } from '@/dto/state-example.dto';
import { HEADING, LIST_TAG, TAG } from '@/constants/tag';
import { EmosavePlacementView } from './emosave-placement-view';
import styles from './emosave-placement.module.css';

export function StateComparisonView({ example }: { example: StateExample }) {
  return (
    <Column className='gap-6'>
      <Text className='text-body leading-[1.7]'>{example.intro}</Text>
      <List as={LIST_TAG.OL} className={styles.steps}>
        {example.states.map((state, index) => (
          <ListItem key={state.id} className={styles.step}>
            <Heading level={HEADING.H3} className={styles.title}>
              <Text as={TAG.SPAN} aria-hidden='true' className={styles.number}>
                {index + 1}
              </Text>
              {state.title}
            </Heading>
            <EmosavePlacementView state={state.id} />
            <Text className='text-small leading-[1.7]'>{state.body}</Text>
          </ListItem>
        ))}
      </List>
      <Text className='text-small text-subtle'>{example.caption}</Text>
      <VisualsNote />
    </Column>
  );
}
