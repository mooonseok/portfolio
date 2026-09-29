'use client';

import { ScrollSceneView } from './scroll-scene-view';
import type { ScrollSceneProps } from '@/dto/scroll-scene.dto';
import { useScrollScene } from '@/hooks/use-scroll-scene';

export function ScrollScene({ steps = true, ...rest }: ScrollSceneProps) {
  const ref = useScrollScene(steps);
  return <ScrollSceneView sceneRef={ref} {...rest} />;
}
