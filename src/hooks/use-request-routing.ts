'use client';

import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { MEDIA } from '@/constants/breakpoint';
import type { RoutingPhase, RoutingRequest } from '@/dto/request-routing.dto';
import { routingFrame } from '@/lib/request-routing';
import { useMediaQuery } from './use-media-query';

type PaintFrame = (phase: RoutingPhase, fraction: number) => void;

export function useRequestRouting(requests: RoutingRequest[]) {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<RoutingPhase>('request');
  const reduced = useMediaQuery(MEDIA.REDUCED_MOTION);
  const request = requests[index];
  const paintRef = useRef<PaintFrame | null>(null);
  const nextRequest = useCallback(() => {
    setIndex((current) => (current + 1) % requests.length);
    setPhase('request');
  }, [requests.length]);

  useLayoutEffect(() => {
    if (reduced || window.matchMedia(MEDIA.REDUCED_MOTION).matches) {
      paintRef.current?.('work', 1);
      return;
    }
    let elapsed = 0;
    let last: number | null = null;
    let previousPhase: RoutingPhase = 'request';
    let frame = 0;
    setPhase('request');
    paintRef.current?.('request', 0);
    function tick(now: number) {
      if (last !== null) elapsed += now - last;
      last = now;
      const current = routingFrame(request, elapsed);
      if (!current) {
        nextRequest();
        return;
      }
      if (previousPhase !== current.phase) {
        previousPhase = current.phase;
        setPhase(current.phase);
      }
      paintRef.current?.(current.phase, current.fraction);
      frame = requestAnimationFrame(tick);
    }
    function visibility() {
      cancelAnimationFrame(frame);
      last = null;
      if (!document.hidden) frame = requestAnimationFrame(tick);
    }
    visibility();
    document.addEventListener('visibilitychange', visibility);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener('visibilitychange', visibility);
    };
  }, [request, reduced, nextRequest]);

  return {
    request,
    phase: reduced ? ('work' as const) : phase,
    reduced,
    paintRef,
    nextRequest,
  };
}
