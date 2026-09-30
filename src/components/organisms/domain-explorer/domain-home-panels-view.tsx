import { DomainHeadView } from './domain-head-view';
import { DomainStepsView } from './domain-steps-view';
import { Box } from '@/components/atoms/box';
import { Column } from '@/components/atoms/column';
import { Cta } from '@/components/atoms/cta';
import { Grid } from '@/components/atoms/grid';
import type { DomainItem } from '@/dto/domain.dto';
import { HEADING } from '@/constants/tag';

export function DomainHomePanelsView({
  items,
  selected,
}: {
  items: DomainItem[];
  selected: string;
}) {
  return (
    <Grid className='pt-6 tab:pt-8'>
      {items.map((d) => {
        const on = d.id === selected;
        return (
          <Grid
            key={d.id}
            id={d.panelId}
            role='tabpanel'
            aria-labelledby={d.tabId}
            tabIndex={on ? 0 : -1}
            data-selected={on || undefined}
            className='invisible col-start-1 row-start-1 grid-cols-[minmax(0,1fr)] [align-content:start] gap-y-7 opacity-0 data-selected:visible data-selected:opacity-100 data-selected:[transition:opacity_150ms_var(--ease)] lap:grid-cols-[minmax(0,4fr)_minmax(0,6fr)] lap:grid-rows-[auto_1fr] lap:gap-x-12'
          >
            <Box className='lap:col-[1] lap:row-[1]'>
              <DomainHeadView domain={d} level={HEADING.H4} />
            </Box>
            <Column className='lap:col-[2] lap:row-[1/3]'>
              <DomainStepsView steps={d.steps} label={d.title} />
            </Column>
            <Box className='lap:col-[1] lap:row-[2]'>
              <Cta href={d.noteHref} label={d.linkLabel} />
            </Box>
          </Grid>
        );
      })}
    </Grid>
  );
}
