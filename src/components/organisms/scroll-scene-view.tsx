import type { Ref, RefObject } from 'react';
import { Box } from '@/components/atoms/box';
import { TAG } from '@/constants/tag';
import type { ScrollSceneProps } from '@/dto/scroll-scene.dto';

export function ScrollSceneView({
  as = TAG.DIV,
  sceneRef,
  children,
  ...rest
}: Omit<ScrollSceneProps, 'steps'> & {
  sceneRef: RefObject<HTMLElement | null>;
}) {
  return (
    <Box
      as={as}
      ref={sceneRef as Ref<HTMLDivElement>}
      data-reveal=''
      data-scene=''
      {...rest}
    >
      {children}
    </Box>
  );
}
