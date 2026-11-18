'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import { AiCheckFlowView } from './ai-check-flow-view';
import { MEDIA } from '@/constants/breakpoint';
import type { AiCheckFlow } from '@/dto/ai-practice.dto';
import { useMediaQuery } from '@/hooks/use-media-query';

const subscribeHydration = () => () => {};
const browserReady = () => true;
const serverReady = () => false;

export function AiCheckLoop({ flow }: { flow: AiCheckFlow }) {
  const enhanced = useSyncExternalStore(
    subscribeHydration,
    browserReady,
    serverReady
  );
  const reduced = useMediaQuery(MEDIA.REDUCED_MOTION);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const end = flow.stages.length - 1;

  useEffect(() => {
    if (!playing || reduced) return;
    const timer = window.setTimeout(() => {
      const next = Math.min(active + 1, end);
      setActive(next);
      if (next === end) setPlaying(false);
    }, 3000);
    return () => window.clearTimeout(timer);
  }, [active, end, playing, reduced]);

  useEffect(() => {
    const media = window.matchMedia(MEDIA.REDUCED_MOTION);
    const stop = () => {
      if (media.matches) setPlaying(false);
    };
    media.addEventListener('change', stop);
    return () => media.removeEventListener('change', stop);
  }, []);

  function select(index: number) {
    setActive(index);
    setPlaying(false);
  }

  function replay() {
    setActive(0);
    setPlaying(!reduced);
  }

  return (
    <AiCheckFlowView
      flow={flow}
      active={active}
      enhanced={enhanced}
      playing={playing}
      reduced={reduced}
      onSelect={select}
      onReplay={replay}
      onPlay={() => setPlaying(!playing)}
    />
  );
}
