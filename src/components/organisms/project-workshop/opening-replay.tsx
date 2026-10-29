'use client';

import { createContext, useContext } from 'react';
import { OpeningReplayView } from './diorama-opening-view';

export const OpeningReplayContext = createContext<(() => void) | null>(null);

export function OpeningReplay() {
  const onReplay = useContext(OpeningReplayContext);
  if (!onReplay) return null;
  return <OpeningReplayView onReplay={onReplay} />;
}
