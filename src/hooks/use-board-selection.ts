'use client';

import { useLayoutEffect, useRef, useState } from 'react';

export function useBoardSelection() {
  const [selected, setSelected] = useState<string | null>(null);
  const [animate, setAnimate] = useState(false);
  const anchor = useRef<{ el: HTMLElement; top: number } | null>(null);
  useLayoutEffect(() => {
    const a = anchor.current;
    anchor.current = null;
    if (!a) return;
    const delta = a.el.getBoundingClientRect().top - a.top;
    if (Math.abs(delta) > 1)
      window.scrollBy({ top: delta, behavior: 'instant' });
  }, [selected]);
  const select = (slug: string, pointer: boolean, target: HTMLElement) => {
    anchor.current = { el: target, top: target.getBoundingClientRect().top };
    setAnimate(pointer && selected === null);
    setSelected((current) => (current === slug ? null : slug));
  };
  return { selected, animate, select };
}
