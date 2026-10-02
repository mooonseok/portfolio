import type { KeyboardEvent } from 'react';
import { HabitMapView } from './habit-map-view';
import { Button } from '@/components/atoms/button';
import { ChoiceDot } from '@/components/atoms/choice-dot';
import { Column } from '@/components/atoms/column';
import { Grid } from '@/components/atoms/grid';
import { Heading } from '@/components/atoms/heading';
import { Row } from '@/components/atoms/row';
import { Text } from '@/components/atoms/text';
import type { Feature, FeatureStep } from '@/dto/feature.dto';
import type { Orientation } from '@/constants/aria';
import { HEADING, TAG } from '@/constants/tag';

const tabId = (id: string) => `habit-${id}-tab`;
const PANEL_ID = 'habit-panel';

export function HabitExplorerView({
  feature,
  labelId,
  current,
  orientation,
  onSelect,
  onKeyDown,
  tabRef,
}: {
  feature: Feature;
  labelId: string;
  current: FeatureStep;
  orientation?: Orientation;
  onSelect: (id: string) => void;
  onKeyDown: (e: KeyboardEvent<HTMLButtonElement>) => void;
  tabRef: (id: string) => (el: HTMLButtonElement | null) => void;
}) {
  return (
    <Column className='gap-5 tab:gap-6'>
      <Text as={TAG.SPAN} className='mono text-subtle'>
        {feature.hint}
      </Text>
      <Grid className='grid-cols-[minmax(0,1fr)] gap-y-8 lap:grid-cols-[minmax(0,4fr)_minmax(0,6fr)] lap:[align-items:start] lap:gap-x-10'>
        <Grid
          role='tablist'
          aria-labelledby={labelId}
          aria-orientation={orientation}
          className='grid-cols-1 gap-2'
        >
          {feature.steps.map((s) => {
            const on = s.id === current.id;
            return (
              <Button
                key={s.id}
                ref={tabRef(s.id)}
                id={tabId(s.id)}
                role='tab'
                aria-selected={on}
                aria-controls={PANEL_ID}
                tabIndex={on ? 0 : -1}
                data-selected={on || undefined}
                onClick={() => onSelect(s.id)}
                onKeyDown={onKeyDown}
                className='group/tab flex min-h-15 cursor-pointer flex-col items-start justify-center gap-1 border border-graphite bg-transparent px-3.5 py-2.5 text-left text-subtle [transition:background-color_150ms_var(--ease),border-color_150ms_var(--ease),color_150ms_var(--ease)] data-selected:border-ink data-selected:bg-tint data-selected:text-ink data-selected:[box-shadow:inset_0_0_0_0.5px_var(--ink)] fine:hover:border-ink fine:hover:text-ink'
              >
                <Row as={TAG.SPAN} className='items-center gap-2 mono'>
                  <ChoiceDot on={on} />
                  <Text as={TAG.SPAN}>{s.surface}</Text>
                </Row>
                <Text
                  as={TAG.SPAN}
                  className='text-[16px] leading-[1.35] decoration-1 underline-offset-4 group-data-selected/tab:font-medium tab:text-[17px] fine:group-hover/tab:underline'
                >
                  {s.label}
                </Text>
              </Button>
            );
          })}
        </Grid>
        <Column className='gap-6'>
          <HabitMapView feature={feature} current={current} />
          <Column
            key={current.id}
            id={PANEL_ID}
            role='tabpanel'
            tabIndex={0}
            aria-labelledby={tabId(current.id)}
            className='gap-3 border-t border-t-ink pt-4 motion-safe:animate-[fade-in_150ms_var(--ease)]'
          >
            <Text as={TAG.SPAN} className='mono'>
              관련 시스템 · {current.systems.join(' · ')}
            </Text>
            <Heading
              level={HEADING.H3}
              className='text-d3 leading-[1.25] font-medium tracking-[-0.012em]'
            >
              {current.label}
            </Heading>
            <Text className='max-w-[40em] text-body leading-[1.65]'>
              {current.body}
            </Text>
          </Column>
          <Text as={TAG.SPAN} className='text-small text-subtle'>
            {feature.note}
          </Text>
        </Column>
      </Grid>
    </Column>
  );
}
