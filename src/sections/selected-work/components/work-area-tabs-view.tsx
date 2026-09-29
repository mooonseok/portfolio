import type { CSSProperties } from 'react';
import { Box } from '@/components/atoms/box';
import { Button } from '@/components/atoms/button';
import { Column } from '@/components/atoms/column';
import { Grid } from '@/components/atoms/grid';
import { Heading } from '@/components/atoms/heading';
import { Row } from '@/components/atoms/row';
import { Text } from '@/components/atoms/text';
import type { WorkAreasViewProps } from '@/dto/explorer.dto';
import { HEADING, TAG } from '@/constants/tag';

const dot =
  'size-[7px] flex-none rounded-[50%] border-[1.25px] border-graphite bg-paper [transition:background-color_150ms_var(--ease),border-color_150ms_var(--ease)] group-data-selected/area:border-signal group-data-selected/area:bg-signal';

export function WorkAreaTabsView({
  labelId,
  items,
  selected,
  onSelect,
  onTabKeyDown,
  tabRef,
}: WorkAreasViewProps) {
  return (
    <Box className='hidden tab:block'>
      <Grid
        role='tablist'
        aria-labelledby={labelId}
        className='grid-cols-[repeat(var(--n),minmax(0,1fr))] gap-x-(--gutter)'
        style={{ '--n': items.length } as CSSProperties}
      >
        {items.map((a) => {
          const on = a.id === selected;
          return (
            <Button
              key={a.id}
              ref={tabRef(a.id)}
              id={a.tabId}
              role='tab'
              aria-selected={on}
              aria-controls={a.panelId}
              tabIndex={on ? 0 : -1}
              data-selected={on || undefined}
              onClick={() => onSelect(a.id)}
              onKeyDown={onTabKeyDown}
              className='group/area flex min-h-11 cursor-pointer flex-col items-start gap-1.5 border-0 bg-transparent p-0 pb-4 text-left [box-shadow:inset_0_-1px_0_var(--hairline)] [transition:box-shadow_150ms_var(--ease)] data-selected:[box-shadow:inset_0_-2px_0_var(--ink)] fine:hover:[box-shadow:inset_0_-1px_0_var(--ink)] fine:data-selected:hover:[box-shadow:inset_0_-2px_0_var(--ink)]'
            >
              <Row as={TAG.SPAN} className='items-center gap-2 mono muted'>
                <Box as={TAG.SPAN} className={dot} aria-hidden='true' />
                <Text as={TAG.SPAN}>{a.num}</Text>
              </Row>
              <Text
                as={TAG.SPAN}
                className='mono text-graphite [transition:color_150ms_var(--ease)] group-data-selected/area:text-ink fine:group-hover/area:text-ink'
              >
                {a.label}
              </Text>
              <Text as={TAG.SPAN} className='text-small text-graphite'>
                {a.sub}
              </Text>
            </Button>
          );
        })}
      </Grid>
      <Grid className='mt-8 lap:mt-10'>
        {items.map((a) => {
          const on = a.id === selected;
          return (
            <Grid
              key={a.id}
              id={a.panelId}
              role='tabpanel'
              aria-labelledby={a.tabId}
              tabIndex={on ? 0 : -1}
              data-selected={on || undefined}
              className='invisible col-start-1 row-start-1 grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-x-(--gutter) opacity-0 data-selected:visible data-selected:opacity-100 data-selected:[transition:opacity_150ms_var(--ease)]'
            >
              <Column className='gap-3'>
                <Text as={TAG.SPAN} className='mono muted'>
                  {a.num} / {a.label}
                </Text>
                <Heading
                  level={HEADING.H4}
                  className='text-d3 leading-[1.3] font-medium tracking-[-0.01em]'
                >
                  {a.title}
                </Heading>
              </Column>
              <Column className='gap-5 tab:pt-[34px]'>
                <Text className='text-body leading-[1.65]'>{a.body}</Text>
                {a.hasRelated ? (
                  <Row className='flex-wrap items-baseline gap-x-4 gap-y-1'>
                    <Text as={TAG.SPAN} className='text-small text-graphite'>
                      연결 영역
                    </Text>
                    <Text as={TAG.SPAN} className='text-small'>
                      {a.relatedText}
                    </Text>
                  </Row>
                ) : null}
              </Column>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
