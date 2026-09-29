import { Box } from '@/components/atoms/box';
import { Button } from '@/components/atoms/button';
import { Column } from '@/components/atoms/column';
import { Heading } from '@/components/atoms/heading';
import { List, ListItem } from '@/components/atoms/list';
import { Row } from '@/components/atoms/row';
import { Text } from '@/components/atoms/text';
import type { WorkAreasViewProps } from '@/dto/explorer.dto';
import { HEADING, TAG } from '@/constants/tag';

export function WorkAreaListView({
  labelId,
  items,
  selected,
  onToggle,
  toggleRef,
}: WorkAreasViewProps) {
  return (
    <List
      aria-labelledby={labelId}
      className='border-b border-b-hairline tab:hidden'
    >
      {items.map((a) => {
        const on = a.id === selected;
        return (
          <ListItem key={a.id} className='border-t border-t-hairline'>
            <Heading level={HEADING.H4} className='m-0 [font:inherit]'>
              <Button
                ref={toggleRef(a.id)}
                id={a.toggleId}
                aria-expanded={on}
                aria-controls={a.regionId}
                aria-disabled={on || undefined}
                data-selected={on || undefined}
                onClick={() => onToggle(a.id)}
                className='group/area grid min-h-13 w-full cursor-pointer grid-cols-[7px_auto_minmax(0,1fr)_auto] items-center gap-x-3 border-0 bg-transparent px-0 py-3 text-left aria-disabled:cursor-default'
              >
                <Box
                  as={TAG.SPAN}
                  aria-hidden='true'
                  className='size-[7px] rounded-[50%] border-[1.25px] border-graphite bg-paper group-data-selected/area:border-signal group-data-selected/area:bg-signal'
                />
                <Text as={TAG.SPAN} className='mono muted'>
                  {a.num}
                </Text>
                <Column as={TAG.SPAN} className='min-w-0 gap-0.5'>
                  <Text as={TAG.SPAN} className='mono [overflow-wrap:anywhere]'>
                    {a.label}
                  </Text>
                  <Text as={TAG.SPAN} className='text-small text-graphite'>
                    {a.sub}
                  </Text>
                </Column>
                <Text
                  as={TAG.SPAN}
                  aria-hidden='true'
                  className='text-[18px] leading-none group-data-selected/area:invisible'
                >
                  +
                </Text>
              </Button>
            </Heading>
            <Column
              id={a.regionId}
              role='region'
              aria-labelledby={a.toggleId}
              hidden={!on}
              className='gap-3 pb-6 [&[hidden]]:hidden'
            >
              <Text className='text-[19px] leading-[1.35] font-medium tracking-[-0.01em]'>
                {a.title}
              </Text>
              <Text className='text-body leading-[1.65]'>{a.body}</Text>
              {a.hasRelated ? (
                <Row className='flex-wrap items-baseline gap-x-3 gap-y-1'>
                  <Text as={TAG.SPAN} className='text-small text-graphite'>
                    연결 영역
                  </Text>
                  <Text as={TAG.SPAN} className='text-small'>
                    {a.relatedText}
                  </Text>
                </Row>
              ) : null}
            </Column>
          </ListItem>
        );
      })}
    </List>
  );
}
