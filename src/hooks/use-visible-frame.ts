'use client';

import { useEffect, useRef } from 'react';

export function useVisibleFrame<T extends Element>(
  ref: React.RefObject<T | null>,
  onFrame: (el: T) => void,
  enabled = true
) {
  const cb = useRef(onFrame);
  useEffect(() => {
    cb.current = onFrame;
  });

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;
    let raf = 0;
    let live = false;
    const tick = () => {
      raf = 0;
      cb.current(el);
    };
    const queue = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const start = () => {
      if (live) return;
      live = true;
      window.addEventListener('scroll', queue, { passive: true });
      window.addEventListener('resize', queue, { passive: true });
      queue();
    };
    const stop = () => {
      if (!live) return;
      live = false;
      window.removeEventListener('scroll', queue);
      window.removeEventListener('resize', queue);
      cancelAnimationFrame(raf);
      raf = 0;
      cb.current(el);
    };
    if (!('IntersectionObserver' in window)) {
      start();
      return stop;
    }
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) (e.isIntersecting ? start : stop)();
    });
    io.observe(el);
    return () => {
      io.disconnect();
      stop();
    };
  }, [ref, enabled]);
}
