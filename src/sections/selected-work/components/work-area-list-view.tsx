import { WorkAreaLinksView } from './work-area-links-view';
import { Button } from '@/components/atoms/button';
import { ChoiceDot } from '@/components/atoms/choice-dot';
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
  open,
  onToggle,
  toggleRef,
}: WorkAreasViewProps) {
  return (
    <List
      aria-labelledby={labelId}
      className='border-t border-b border-t-ink border-b-hairline tab:hidden'
    >
      {items.map((a) => {
        const on = a.id === open;
        return (
          <ListItem
            key={a.id}
            className='border-t border-t-hairline first:[border-top:0]'
          >
            <Heading level={HEADING.H4} className='m-0 [font:inherit]'>
              <Button
                ref={toggleRef(a.id)}
                id={a.toggleId}
                aria-expanded={on}
                aria-controls={a.regionId}
                data-selected={on || undefined}
                onClick={() => onToggle(a.id)}
                className='group/area flex min-h-15 w-full cursor-pointer items-center justify-between gap-3 bg-transparent px-2 py-2.5 text-left [border:0] [transition:background-color_150ms_var(--ease)] focus-visible:outline-offset-[-2px] data-selected:bg-tint'
              >
                <Row as={TAG.SPAN} className='min-w-0 items-center gap-3'>
                  <ChoiceDot on={on} />
                  <Text
                    as={TAG.SPAN}
                    className='text-[18px] leading-[1.3] group-data-selected/area:font-medium'
                  >
                    {a.sub}
                  </Text>
                  <Text
                    as={TAG.SPAN}
                    className='mono [overflow-wrap:anywhere] text-subtle'
                  >
                    {a.label}
                  </Text>
                </Row>
                <Text
                  as={TAG.SPAN}
                  aria-hidden='true'
                  className='w-5 flex-none text-center text-[20px] leading-none'
                >
                  {on ? '−' : '+'}
                </Text>
              </Button>
            </Heading>
            <Column
              id={a.regionId}
              role='region'
              aria-labelledby={a.toggleId}
              hidden={!on}
              className='gap-3 pt-1.5 pr-2 pb-6 pl-[29px] [&[hidden]]:hidden'
            >
              <Text className='text-[19px] leading-[1.35] font-medium tracking-[-0.01em]'>
                {a.title}
              </Text>
              <Text className='text-body leading-[1.65]'>{a.body}</Text>
              <WorkAreaLinksView area={a} />
            </Column>
          </ListItem>
        );
      })}
    </List>
  );
}
