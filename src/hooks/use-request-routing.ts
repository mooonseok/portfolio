'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { MEDIA } from '@/constants/breakpoint';
import type { RoutingPhase, RoutingRequest } from '@/dto/request-routing.dto';
import {
  advanceRoutingTime,
  routingFrame,
  routingTimeline,
} from '@/lib/request-routing';
import { useMediaQuery } from './use-media-query';

type PaintFrame = (phase: RoutingPhase, fraction: number) => void;

export function useRequestRouting(request: RoutingRequest) {
  const [phase, setPhase] = useState<RoutingPhase>('request');
  const reduced = useMediaQuery(MEDIA.REDUCED_MOTION);
  const paintRef = useRef<PaintFrame | null>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const target = viewportRef.current;
    if (!target) return;
    if (reduced || window.matchMedia(MEDIA.REDUCED_MOTION).matches) {
      setPhase('done');
      paintRef.current?.('done', 1);
      return;
    }

    const timeline = routingTimeline(request);
    let elapsed = 0;
    let last: number | null = null;
    let currentPhase: RoutingPhase = 'request';
    let inView = false;
    let frame = 0;
    setPhase('request');
    paintRef.current?.('request', 0);

    function tick(now: number) {
      if (last !== null) elapsed = advanceRoutingTime(elapsed, now - last);
      last = now;
      const current = routingFrame(timeline, elapsed);
      if (currentPhase !== current.phase) {
        currentPhase = current.phase;
        setPhase(current.phase);
      }
      paintRef.current?.(current.phase, current.fraction);
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
