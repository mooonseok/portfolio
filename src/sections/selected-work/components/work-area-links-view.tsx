import { Cta } from '@/components/atoms/cta';
import { List, ListItem } from '@/components/atoms/list';
import { Row } from '@/components/atoms/row';
import { Text } from '@/components/atoms/text';
import type { WorkAreaItem } from '@/dto/explorer.dto';
import { TAG } from '@/constants/tag';

export function WorkAreaLinksView({ area: a }: { area: WorkAreaItem }) {
  return (
    <>
      {a.hasRelated ? (
        <Row className='flex-wrap items-center gap-x-2.5 gap-y-2'>
          <Text as={TAG.SPAN} className='mr-1 mono text-subtle'>
            연결 영역
          </Text>
          <List className='contents'>
            {a.related.map((r) => (
              <ListItem
                key={r}
                className='rounded-full border border-hairline px-2.5 py-0.5 text-small leading-[1.5]'
              >
                {r}
              </ListItem>
            ))}
          </List>
        </Row>
      ) : null}
      <Cta href={a.href} label={`케이스스터디 · ${a.to.label}`} />
    </>
  );
}
