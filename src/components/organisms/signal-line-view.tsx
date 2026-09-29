import type { RefObject } from 'react';
import { Box } from '@/components/atoms/box';
import { TAG } from '@/constants/tag';
import type { Marker } from '@/dto/signal-line.dto';

export function SignalLineView({
  rootRef,
  lineRef,
  markers,
}: {
  rootRef: RefObject<HTMLDivElement | null>;
  lineRef: RefObject<HTMLSpanElement | null>;
  markers: Marker[];
}) {
  return (
    <Box
      ref={rootRef}
      className='pointer-events-none absolute inset-0 z-2'
      aria-hidden='true'
    >
      <Box className='relative mx-auto h-full max-w-[1440px]'>
        <Box
          as={TAG.SPAN}
          ref={lineRef}
          className='absolute top-[var(--signal-top,560px)] bottom-[var(--signal-bottom,0px)] left-(--rail-x) w-px bg-graphite'
        >
          <Box
            as={TAG.SPAN}
            className='absolute inset-0 [background:var(--fill-bg,var(--ink))] [clip-path:inset(0_0_calc((1_-_var(--fill,0))_*_100%)_0)]'
          />
        </Box>
        {markers.map((m) => (
          <Box
            as={TAG.SPAN}
            key={m.id}
            className='absolute left-[calc(var(--rail-x)_-_4px)] z-1 size-[9px] rounded-[50%] border-[1.25px] border-ink bg-paper [transition:background-color_150ms_var(--ease),border-color_150ms_var(--ease)] data-current:border-signal data-current:bg-signal data-dark:not-data-current:border-paper data-dark:not-data-current:bg-dark'
            data-marker={m.id}
            data-dark={m.dark || undefined}
            style={{ top: `${m.y - 4.5}px` }}
          />
        ))}
      </Box>
    </Box>
  );
}
