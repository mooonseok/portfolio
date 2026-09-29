'use client';

import { useEffect, useRef } from 'react';
import { MEDIA } from '@/constants/breakpoint';
import { POINTER_MAX } from '@/constants/motion-layer';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useVisibleFrame } from '@/hooks/use-visible-frame';

export function useMotionLayer(parallax: number, pointer: boolean) {
  const ref = useRef<HTMLDivElement>(null);
  const live = useMediaQuery(MEDIA.FINE_MOTION);

  useVisibleFrame(
    ref,
    (el) => {
      const frame = el.parentElement;
      if (!frame) return;
      const r = frame.getBoundingClientRect();
      const vh = window.innerHeight;
      const t = (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2);
      el.style.setProperty(
        '--py',
        `${(Math.max(-1, Math.min(1, t)) * -parallax).toFixed(2)}px`
      );
    },
    live && parallax > 0
  );

  useEffect(() => {
    const el = ref.current;
    const frame = el?.parentElement;
    if (!el || !frame || !live || !pointer) return;
    const onMove = (e: PointerEvent) => {
      const r = frame.getBoundingClientRect();
      el.style.setProperty(
        '--mx',
        `${(((e.clientX - r.left) / r.width - 0.5) * 2 * POINTER_MAX).toFixed(2)}px`
      );
      el.style.setProperty(
        '--my',
        `${(((e.clientY - r.top) / r.height - 0.5) * 2 * POINTER_MAX).toFixed(2)}px`
      );
    };
    const onLeave = () => {
      el.style.setProperty('--mx', '0px');
      el.style.setProperty('--my', '0px');
    };
    frame.addEventListener('pointermove', onMove, { passive: true });
    frame.addEventListener('pointerleave', onLeave);
    return () => {
      frame.removeEventListener('pointermove', onMove);
      frame.removeEventListener('pointerleave', onLeave);
      onLeave();
    };
  }, [live, pointer]);

  useEffect(() => {
    if (!live) ref.current?.style.removeProperty('--py');
  }, [live]);

  const overscan = (parallax > 0 ? parallax : 0) + (pointer ? POINTER_MAX : 0);
  return { ref, live, overscan };
}
