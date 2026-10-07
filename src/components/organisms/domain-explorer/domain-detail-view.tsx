import { Column } from '@/components/atoms/column';
import { List, ListItem } from '@/components/atoms/list';
import { Row } from '@/components/atoms/row';
import { Text } from '@/components/atoms/text';
import type { DomainItem } from '@/dto/domain.dto';
import { TAG } from '@/constants/tag';

export function DomainDetailView({ domain: d }: { domain: DomainItem }) {
  return (
    <>
      {d.aside ? (
        <Column className='gap-1 px-3.5 py-3 [border:1px_dashed_var(--subtle)]'>
          <Text as={TAG.SPAN} className='mono text-subtle'>
            {d.aside.label}
          </Text>
          <Text className='text-[15px] leading-[1.6]'>{d.aside.body}</Text>
        </Column>
      ) : null}
      {d.checks ? (
        <Column className='gap-2.5'>
          <Text as={TAG.SPAN} className='mono text-subtle'>
            {d.checks.label}
          </Text>
          <List className='flex flex-wrap gap-2'>
            {d.checks.items.map((c) => (
              <ListItem
                key={c}
                className='border border-hairline px-3 py-1.5 text-small leading-[1.5]'
              >
                {c}
              </ListItem>
            ))}
          </List>
        </Column>
      ) : null}
      <Column className='gap-2.5 border-t border-t-hairline pt-4'>
        <Text as={TAG.SPAN} className='mono text-subtle'>
          {d.implLabel}
        </Text>
        <List className='flex flex-col gap-1.5'>
          {d.impl.map((m) => (
            <Row
              as={TAG.LI}
              key={m}
              className='gap-2.5 text-[15px] leading-[1.6]'
            >
              <Text as={TAG.SPAN} aria-hidden='true' className='text-subtle'>
                –
              </Text>
              <Text as={TAG.SPAN}>{m}</Text>
            </Row>
          ))}
        </List>
      </Column>
    </>
  );
}
