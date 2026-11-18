'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { MEDIA } from '@/constants/breakpoint';
import type {
  RoutingPainter,
  RoutingPhase,
  RoutingRequest,
} from '@/dto/request-routing.dto';
import { advanceRoutingFrame, routingTrack } from '@/lib/request-routing';
import { useMediaQuery } from './use-media-query';

export function useRequestRouting(request: RoutingRequest) {
  const [phase, setPhase] = useState<RoutingPhase>('judge');
  const reduced = useMediaQuery(MEDIA.REDUCED_MOTION);
  const paintRef = useRef<RoutingPainter | null>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const target = viewportRef.current;
    if (!target) return;
    if (reduced || window.matchMedia(MEDIA.REDUCED_MOTION).matches) {
      setPhase('done');
      paintRef.current?.paint('done', 1);
      return;
    }

    let lengths: RoutingPainter['lengths'] | undefined;
    let track: ReturnType<typeof routingTrack>;
    let current = { phase: 'judge' as RoutingPhase, fraction: 0 };
    let last: number | null = null;
    let inView = false;
    let frame = 0;
    setPhase('judge');
    paintRef.current?.paint('judge', 0);

    function tick(now: number) {
      const painter = paintRef.current;
      if (painter && painter.lengths !== lengths) {
        lengths = painter.lengths;
        track = routingTrack(request, lengths);
      }
      if (painter && track) {
        const elapsed = last === null ? 0 : now - last;
        const next = advanceRoutingFrame(track, current, elapsed);
        if (current.phase !== next.phase) flushSync(() => setPhase(next.phase));
        current = next;
        painter.paint(current.phase, current.fraction);
      }
      last = now;
      frame = requestAnimationFrame(tick);
    }

    function refresh() {
      cancelAnimationFrame(frame);
      last = null;
      if (inView && !document.hidden) frame = requestAnimationFrame(tick);
    }

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      refresh();
    });
    observer.observe(target);
    document.addEventListener('visibilitychange', refresh);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', refresh);
      cancelAnimationFrame(frame);
    };
  }, [request, reduced]);

  return {
    phase: reduced ? ('done' as const) : phase,
    reduced,
    paintRef,
    viewportRef,
  };
}
