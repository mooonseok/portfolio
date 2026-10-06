'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { MEDIA } from '@/constants/breakpoint';

const NOTE_GAP = 24;

function revealNote(slug: string) {
  const note = document.getElementById(`board-note-${slug}`);
  if (!note) return;
  const rect = note.getBoundingClientRect();
  const overflow =
    rect.top + Math.min(rect.height, 240) + NOTE_GAP - innerHeight;
  if (overflow <= 0) return;
  const smooth = !window.matchMedia(MEDIA.REDUCED_MOTION).matches;
  window.scrollBy({ top: overflow, behavior: smooth ? 'smooth' : 'instant' });
}

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
    if (selected) revealNote(selected);
  }, [selected]);
  const select = (slug: string, pointer: boolean, target: HTMLElement) => {
    anchor.current = { el: target, top: target.getBoundingClientRect().top };
    setAnimate(pointer && selected === null);
    setSelected((current) => (current === slug ? null : slug));
  };
  return { selected, animate, select };
}
