import type { KeyboardEvent } from 'react';
import { Box } from '@/components/atoms/box';
import { Button } from '@/components/atoms/button';
import { Column } from '@/components/atoms/column';
import { Grid } from '@/components/atoms/grid';
import { Text } from '@/components/atoms/text';
import { StateSketch } from '@/components/molecules/state-sketch';
import type { StateExample, StateExampleItem } from '@/dto/state-example.dto';
import { TAG } from '@/constants/tag';

const tabId = (id: string) => `state-${id}-tab`;
const PANEL_ID = 'state-example-panel';

export function StateExampleView({
  example,
  current,
  onSelect,
  onKeyDown,
  tabRef,
}: {
  example: StateExample;
  current: StateExampleItem;
  onSelect: (id: string) => void;
  onKeyDown: (e: KeyboardEvent<HTMLButtonElement>) => void;
  tabRef: (id: string) => (el: HTMLButtonElement | null) => void;
}) {
  return (
    <Column className='gap-4'>
      <Grid
        role='tablist'
        aria-label={example.label}
        className='grid-cols-3 border border-ink'
      >
        {example.states.map((s, i) => {
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
              className='flex min-h-11 cursor-pointer items-center justify-center gap-2 border-l border-l-ink bg-transparent px-2 py-2.5 text-[15px] decoration-1 underline-offset-4 [transition:background-color_150ms_var(--ease),color_150ms_var(--ease)] first:[border-left:0] focus-visible:outline-offset-[-4px] data-selected:bg-ink data-selected:font-medium data-selected:text-paper fine:hover:underline'
            >
              <Text as={TAG.SPAN} className='mono'>
                0{i + 1}
              </Text>
              {s.label}
            </Button>
          );
        })}
      </Grid>
      <Column as={TAG.FIGURE} className='gap-2.5'>
        <Box className='max-w-[260px] tab:max-w-[420px]'>
          <StateSketch
            state={current.id}
            slotLabel={example.slotLabel}
            trayLabel={example.trayLabel}
          />
        </Box>
        <Text
          as={TAG.FIGCAPTION}
          className='text-small leading-[1.5] text-subtle'
        >
          {example.caption}
        </Text>
      </Column>
      <Column
        key={current.id}
        id={PANEL_ID}
        role='tabpanel'
        aria-labelledby={tabId(current.id)}
        className='gap-1.5 border-t border-t-ink pt-3.5 motion-safe:animate-[fade-in_150ms_var(--ease)]'
      >
        <Text as={TAG.SPAN} className='mono'>
          {current.code}
        </Text>
        <Text className='text-[19px] leading-[1.35] font-medium'>
          {current.title}
        </Text>
        <Text className='text-body leading-[1.65]'>{current.body}</Text>
      </Column>
    </Column>
  );
}
