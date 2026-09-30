import type { CSSProperties } from 'react';
import { WorkAreaLinksView } from './work-area-links-view';
import { Box } from '@/components/atoms/box';
import { Button } from '@/components/atoms/button';
import { ChoiceDot } from '@/components/atoms/choice-dot';
import { Column } from '@/components/atoms/column';
import { Grid } from '@/components/atoms/grid';
import { Heading } from '@/components/atoms/heading';
import { Row } from '@/components/atoms/row';
import { Text } from '@/components/atoms/text';
import type { WorkAreasViewProps } from '@/dto/explorer.dto';
import { HEADING, TAG } from '@/constants/tag';

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
        className='grid-cols-[repeat(var(--n),minmax(0,1fr))] border-t border-b border-t-ink border-b-hairline'
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
              className='group/area -mb-px flex min-h-11 cursor-pointer flex-col items-start gap-2 bg-transparent px-4 pt-4 pb-3.5 text-left text-subtle [box-shadow:inset_0_-2px_0_transparent] [border:0] [transition:background-color_150ms_var(--ease),box-shadow_150ms_var(--ease),color_150ms_var(--ease)] focus-visible:outline-offset-[-2px] data-selected:bg-tint data-selected:text-ink data-selected:[box-shadow:inset_0_-2px_0_var(--ink)] fine:hover:text-ink'
            >
              <Row as={TAG.SPAN} className='items-center gap-2.5 mono'>
                <ChoiceDot on={on} />
                <Text as={TAG.SPAN}>
                  {a.num} · {a.label}
                </Text>
              </Row>
              <Text
                as={TAG.SPAN}
                className='text-[19px] leading-[1.3] tracking-[-0.01em] decoration-1 underline-offset-[5px] group-data-selected/area:font-medium lap:text-[21px] fine:group-hover/area:underline'
              >
                {a.sub}
              </Text>
            </Button>
          );
        })}
      </Grid>
      <Grid className='mt-7 lap:mt-8'>
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
              className='invisible col-start-1 row-start-1 grid-cols-[minmax(0,1fr)] gap-5 opacity-0 data-selected:visible data-selected:opacity-100 data-selected:[transition:opacity_150ms_var(--ease)] lap:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lap:gap-x-12'
            >
              <Column className='gap-2.5'>
                <Text as={TAG.SPAN} className='mono text-subtle'>
                  이 영역의 초점
                </Text>
                <Heading
                  level={HEADING.H4}
                  className='text-d3 leading-[1.25] font-medium tracking-[-0.012em]'
                >
                  {a.title}
                </Heading>
              </Column>
              <Column className='gap-5'>
                <Text className='max-w-[40em] text-body leading-[1.65]'>
                  {a.body}
                </Text>
                <WorkAreaLinksView area={a} />
              </Column>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
