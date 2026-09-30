import { ControlDiagramView } from './control-diagram-view';
import { ControlPanelView } from './control-panel-view';
import { Box } from '@/components/atoms/box';
import { Button } from '@/components/atoms/button';
import { Column } from '@/components/atoms/column';
import { Grid } from '@/components/atoms/grid';
import { Text } from '@/components/atoms/text';
import type { ControlCondition, ControlExperiment } from '@/dto/experiment.dto';
import { TAG } from '@/constants/tag';

export function ControlConditionsView({
  c,
  current,
  onSelect,
}: {
  c: ControlExperiment;
  current: ControlCondition;
  onSelect: (id: string) => void;
}) {
  const panelId = 'control-condition-panel';
  return (
    <Column className='gap-5 border-t border-t-hairline pt-6 tab:gap-6 tab:pt-8'>
      <Text as={TAG.SPAN} className='mono text-subtle'>
        {c.hint}
      </Text>
      <Box role='group' aria-label={c.hint} className='flex flex-wrap gap-2'>
        {c.conditions.map((x) => {
          const on = x.id === current.id;
          return (
            <Button
              key={x.id}
              id={x.id}
              aria-pressed={on}
              aria-controls={panelId}
              data-selected={on || undefined}
              onClick={() => onSelect(x.id)}
              className='min-h-11 cursor-pointer border border-ink bg-transparent px-3.5 py-2 text-[15px] leading-[1.35] decoration-1 underline-offset-4 [transition:background-color_150ms_var(--ease),color_150ms_var(--ease)] data-selected:bg-ink data-selected:font-medium data-selected:text-paper fine:hover:underline'
            >
              {x.label}
            </Button>
          );
        })}
      </Box>
      <Grid className='grid-cols-[minmax(0,1fr)] gap-y-8 lap:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lap:gap-x-12'>
        <ControlPanelView
          panelId={panelId}
          current={current}
          className='lap:col-[2] lap:row-[1]'
        />
        <ControlDiagramView
          c={c}
          zone={current.zone}
          className='lap:col-[1] lap:row-[1]'
        />
      </Grid>
    </Column>
  );
}
