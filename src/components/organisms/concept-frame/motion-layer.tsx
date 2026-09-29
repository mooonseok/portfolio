'use client';

import type { ReactNode } from 'react';
import { MotionLayerView } from './motion-layer-view';
import { PARALLAX_DEFAULT } from '@/constants/motion-layer';
import { useMotionLayer } from '@/hooks/use-motion-layer';

export function MotionLayer({
  children,
  parallax = PARALLAX_DEFAULT,
  pointer = true,
}: {
  children: ReactNode;
  parallax?: number;
  pointer?: boolean;
}) {
  const { ref, live, overscan } = useMotionLayer(parallax, pointer);
  return (
    <MotionLayerView layerRef={ref} live={live} overscan={overscan}>
      {children}
    </MotionLayerView>
  );
}
