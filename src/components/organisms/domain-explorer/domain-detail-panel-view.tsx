import { DomainDetailView } from './domain-detail-view';
import { DomainHeadView } from './domain-head-view';
import { DomainStepsView } from './domain-steps-view';
import { Column } from '@/components/atoms/column';
import { Grid } from '@/components/atoms/grid';
import { JumpLink } from '@/components/atoms/jump-link';
import type { DomainItem } from '@/dto/domain.dto';
import { HEADING } from '@/constants/tag';

const layer = 'col-start-1 row-start-1 [&:not([data-selected])]:invisible';

export function DomainDetailPanelView({
  items,
  current,
}: {
  items: DomainItem[];
  current: DomainItem;
}) {
  const sel = (d: DomainItem) => d.id === current.id || undefined;
  const hide = (d: DomainItem) => (d.id === current.id ? undefined : 'true');
  return (
    <Grid
      id={items[0].panelId}
      tabIndex={0}
      role='tabpanel'
      aria-labelledby={current.tabId}
      className='grid-cols-[minmax(0,1fr)] gap-y-7 pt-6 tab:pt-8 lap:grid-cols-[minmax(0,4fr)_minmax(0,6fr)] lap:gap-x-12'
    >
      <Grid className='[align-content:start]'>
        {items.map((d) => (
          <Column
            key={d.id}
            aria-hidden={hide(d)}
            data-selected={sel(d)}
            className={layer}
          >
            <DomainHeadView domain={d} level={HEADING.H3} />
          </Column>
        ))}
      </Grid>
      <Column className='gap-6'>
        <Grid>
          {items.map((d) => (
            <Column
              key={d.id}
              aria-hidden={hide(d)}
              data-selected={sel(d)}
              className={layer}
            >
              <DomainStepsView steps={d.steps} label={d.title} />
            </Column>
          ))}
        </Grid>
        <Grid>
          {items.map((d) => (
            <Column
              key={d.id}
              aria-hidden={hide(d)}
              inert={d.id !== current.id}
              data-selected={sel(d)}
              className={`${layer} gap-6`}
            >
              <DomainDetailView domain={d} />
              <JumpLink href={d.noteHref} label={d.linkLabel} />
            </Column>
          ))}
        </Grid>
      </Column>
    </Grid>
  );
}
