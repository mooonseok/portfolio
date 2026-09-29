import type { CSSProperties, ReactNode, RefObject } from 'react';
import { Box } from '@/components/atoms/box';

export function MotionLayerView({
  layerRef,
  live,
  overscan,
  children,
}: {
  layerRef: RefObject<HTMLDivElement | null>;
  live: boolean;
  overscan: number;
  children: ReactNode;
}) {
  return (
    <Box
      ref={layerRef}
      className='group/layer absolute inset-0 data-live:inset-[calc(-1_*_var(--overscan,0px))] data-live:[transform:translate3d(0,var(--py,0px),0)] data-live:will-change-transform'
      data-live={live || undefined}
      style={{ '--overscan': `${overscan}px` } as CSSProperties}
    >
      <Box className='absolute inset-0 group-data-live/layer:[transform:translate3d(var(--mx,0px),var(--my,0px),0)] group-data-live/layer:[transition:transform_300ms_var(--ease)]'>
        {children}
      </Box>
    </Box>
  );
}
