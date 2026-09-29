'use client';

import { useEffect, useRef, useState } from 'react';
import type { ContentsGroup } from '@/dto/navigation.dto';

export function useCaseContents(groups: ContentsGroup[]) {
  const [current, setCurrent] = useState(0);
  const [stuck, setStuck] = useState(false);
  const listRef = useRef<HTMLElement>(null);
  const detailsRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const els = groups
      .map((g) => document.getElementById(g.id))
      .filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const i = els.indexOf(e.target as HTMLElement);
            if (i >= 0) setCurrent(i);
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    els.forEach((el) => io.observe(el));
    const list = listRef.current;
    const io2 = new IntersectionObserver(([e]) =>
      setStuck(!e.isIntersecting && e.boundingClientRect.top < 0)
    );
    if (list) io2.observe(list);
    return () => {
      io.disconnect();
      io2.disconnect();
    };
  }, [groups]);

  const close = () => detailsRef.current?.removeAttribute('open');

  return { current, stuck, listRef, detailsRef, close };
}
