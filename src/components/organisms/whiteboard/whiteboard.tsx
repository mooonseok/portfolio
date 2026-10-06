'use client';

import { WhiteboardView } from './whiteboard-view';
import { useBoardSelection } from '@/hooks/use-board-selection';
import type { WhiteboardProps } from '@/dto/board.dto';

export function Whiteboard(props: WhiteboardProps) {
  const { selected, animate, select } = useBoardSelection();
  return (
    <WhiteboardView
      {...props}
      selected={selected}
      animate={animate}
      onSelect={select}
    />
  );
}
