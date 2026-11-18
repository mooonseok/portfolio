'use client';

import { useEffect } from 'react';
import type { OrbitHomeProps } from '@/dto/orbit.dto';
import { useOrbitStage } from '@/hooks/use-orbit-stage';
import { OrbitView } from './orbit-view';

export function OrbitHome(props: OrbitHomeProps) {
  const stage = useOrbitStage(props.bodies);
  const { active, refs } = stage;
  const panel = refs.panel;
  useEffect(() => {
    panel.current?.scrollTo({ top: 0, behavior: 'instant' });
  }, [active, panel]);
  return <OrbitView {...props} {...stage} />;
}
