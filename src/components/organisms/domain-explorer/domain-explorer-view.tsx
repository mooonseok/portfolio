import { DomainDetailView } from './domain-detail-view';
import { DomainStepsView } from './domain-steps-view';
import { Box } from '@/components/atoms/box';
import { Button } from '@/components/atoms/button';
import { ChoiceDot } from '@/components/atoms/choice-dot';
import { Column } from '@/components/atoms/column';
import { Cta } from '@/components/atoms/cta';
import { Grid } from '@/components/atoms/grid';
import { Heading } from '@/components/atoms/heading';
import { JumpLink } from '@/components/atoms/jump-link';
import { Row } from '@/components/atoms/row';
import { Text } from '@/components/atoms/text';
import type { DomainExplorerViewProps } from '@/dto/domain.dto';
import { EXPLORER_MODE } from '@/constants/explorer';
import { HEADING, TAG } from '@/constants/tag';

export function DomainExplorerView({
  label,
  items,
  mode,
  selected,
  onSelect,
  onKeyDown,
  tabRef,
}: DomainExplorerViewProps) {
  const detail = mode === EXPLORER_MODE.DETAIL;
  const d = items.find((x) => x.id === selected) ?? items[0];
  return (
    <Column>
      <Grid
        role='tablist'
        aria-label={label}
        className='grid-cols-3 border-t border-b border-t-paper border-b-dark-rule'
      >
        {items.map((x) => {
          const on = x.id === selected;
          return (
            <Button
              key={x.id}
              ref={tabRef(x.id)}
              id={x.tabId}
              role='tab'
              aria-selected={on}
              aria-controls={x.panelId}
              tabIndex={on ? 0 : -1}
              data-selected={on || undefined}
              onClick={() => onSelect(x.id)}
              onKeyDown={onKeyDown}
              className='group/tab -mb-px flex min-h-14 cursor-pointer flex-col items-start gap-1.5 bg-transparent px-2.5 pt-3 pb-2.5 text-left text-dark-sub [box-shadow:inset_0_-2px_0_transparent] [border:0] [transition:background-color_150ms_var(--ease),box-shadow_150ms_var(--ease),color_150ms_var(--ease)] focus-visible:outline-offset-[-2px] data-selected:bg-dark-tint data-selected:text-paper data-selected:[box-shadow:inset_0_-2px_0_var(--paper)] tab:px-4 tab:pt-3.5 tab:pb-3 fine:hover:text-paper'
            >
              <Row as={TAG.SPAN} className='items-center gap-2 mono'>
                <ChoiceDot on={on} />
                <Text as={TAG.SPAN}>{x.code}</Text>
              </Row>
              <Text
                as={TAG.SPAN}
                className='text-[15px] leading-[1.3] decoration-1 underline-offset-[5px] group-data-selected/tab:font-medium tab:text-[19px] fine:group-hover/tab:underline'
              >
                {x.label}
              </Text>
            </Button>
          );
        })}
      </Grid>
      <Grid
        key={d.id}
        id={d.panelId}
        role='tabpanel'
        aria-labelledby={d.tabId}
        className='grid-cols-[minmax(0,1fr)] gap-y-7 pt-6 motion-safe:animate-[fade-in_150ms_var(--ease)] tab:pt-8 lap:grid-cols-[minmax(0,4fr)_minmax(0,6fr)] lap:grid-rows-[auto_1fr] lap:gap-x-12'
      >
        <Column className='gap-3.5 lap:col-[1] lap:row-[1]'>
          <Heading
            level={detail ? HEADING.H3 : HEADING.H4}
            className='text-[22px] leading-[1.25] font-medium tracking-[-0.012em] tab:text-d3'
          >
            {d.title}
          </Heading>
          <Text className='text-[15.5px] leading-[1.65] text-dark-sub tab:text-body'>
            {d.lead}
          </Text>
        </Column>
        <Column className='gap-6 lap:col-[2] lap:row-[1/3]'>
          <DomainStepsView steps={d.steps} label={d.title} />
          {detail ? <DomainDetailView domain={d} /> : null}
          {detail ? <JumpLink href={d.noteHref} label={d.linkLabel} /> : null}
        </Column>
        {detail ? null : (
          <Box className='lap:col-[1] lap:row-[2]'>
            <Cta href={d.noteHref} label={d.linkLabel} />
          </Box>
        )}
      </Grid>
    </Column>
  );
}
