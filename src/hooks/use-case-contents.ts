'use client';

import { useEffect, useRef, useState } from 'react';
import type { ContentsGroup } from '@/dto/navigation.dto';
import { lastPassed } from '@/lib/scroll-position';

export function useCaseContents(groups: ContentsGroup[]) {
  const [current, setCurrent] = useState(0);
  const [stuck, setStuck] = useState(false);
  const listRef = useRef<HTMLElement>(null);
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const close = () => detailsRef.current?.removeAttribute('open');

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const positions = groups.map(
        (g) =>
          document.getElementById(g.id)?.getBoundingClientRect().top ?? Infinity
      );
      const bottom =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 2;
      setCurrent(lastPassed(positions, bottom ? window.innerHeight : 80));
      const passed =
        (listRef.current?.getBoundingClientRect().bottom ?? Infinity) <= 0;
      setStuck(passed);
      if (!passed) close();
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const outside = (e: PointerEvent) => {
      if (e.target instanceof Node && !detailsRef.current?.contains(e.target))
        close();
    };
    const escape = (e: KeyboardEvent) => {
      if (e.key !== 'Escape' || !detailsRef.current?.open) return;
      const inside = detailsRef.current.contains(document.activeElement);
      close();
      if (inside) detailsRef.current.querySelector('summary')?.focus();
    };
    const events = ['scroll', 'resize', 'hashchange', 'pageshow', 'load'];
    events.forEach((event) =>
      window.addEventListener(event, schedule, { passive: true })
    );
    document.addEventListener('pointerdown', outside);
    document.addEventListener('keydown', escape);
    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);
    update();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      events.forEach((event) => window.removeEventListener(event, schedule));
      document.removeEventListener('pointerdown', outside);
      document.removeEventListener('keydown', escape);
    };
  }, [groups]);

  return { current, stuck, listRef, detailsRef, close };
}
