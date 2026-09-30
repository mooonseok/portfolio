import { Column } from '@/components/atoms/column';
import { List, ListItem } from '@/components/atoms/list';
import { Row } from '@/components/atoms/row';
import { Text } from '@/components/atoms/text';
import type { StateScope } from '@/dto/explorer.dto';
import { TAG } from '@/constants/tag';

export function StateScopeView({ scope }: { scope: StateScope }) {
  return (
    <Column className='gap-3'>
      <Row className='flex-wrap items-baseline gap-x-2 gap-y-1 mono'>
        <Text as={TAG.SPAN}>{scope.label}</Text>
        <Text as={TAG.SPAN} className='text-subtle'>
          · {scope.note}
        </Text>
      </Row>
      <List className='flex flex-wrap gap-2'>
        {scope.items.map((i) => (
          <ListItem
            key={i}
            className='border border-hairline px-3 py-1.5 text-small leading-[1.5]'
          >
            {i}
          </ListItem>
        ))}
      </List>
    </Column>
  );
}
