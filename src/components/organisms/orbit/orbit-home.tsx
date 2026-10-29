'use client';

import type { OrbitHomeProps } from '@/dto/orbit.dto';
import { useOrbitStage } from '@/hooks/use-orbit-stage';
import { OrbitView } from './orbit-view';

export function OrbitHome(props: OrbitHomeProps) {
  const stage = useOrbitStage(props.bodies);
  return <OrbitView {...props} {...stage} />;
}
