'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { Box } from '@/components/atoms/box';
import {
  WorkflowCircuit,
  type WorkflowCircuitProps,
} from '@/components/atoms/workflow-circuit';

export function AiCircuitCanvas(props: WorkflowCircuitProps) {
  const surface = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(336);

  useLayoutEffect(() => {
    const element = surface.current;
    if (!element) return;
    const measure = () => {
      const pixels = Math.round(element.clientWidth);
      if (pixels > 0) setWidth(pixels);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <Box ref={surface} className='mx-auto w-full max-w-[780px]'>
      <WorkflowCircuit {...props} width={width} />
    </Box>
  );
}
