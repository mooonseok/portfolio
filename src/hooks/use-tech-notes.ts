'use client';

import { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import type { TechNote } from '@/dto/field.dto';
import { MEDIA } from '@/constants/breakpoint';

const HEIGHT_MS = 200;

const animates = () =>
  window.matchMedia(MEDIA.MOBILE).matches &&
  !window.matchMedia(MEDIA.REDUCED_MOTION).matches;

export function useTechNotes(notes: TechNote[]) {
  const [open, setOpen] = useState<Set<string>>(
    () => new Set(notes[0] ? [notes[0].id] : [])
  );
  const panels = useRef(new Map<string, HTMLDivElement>());

  useEffect(() => {
    const openFromHash = () => {
      const h = decodeURIComponent(window.location.hash.slice(1));
      if (notes.some((n) => n.id === h)) setOpen((o) => new Set(o).add(h));
    };
    openFromHash();
    window.addEventListener('hashchange', openFromHash);
    return () => window.removeEventListener('hashchange', openFromHash);
  }, [notes]);

  const pendingOpen = useRef<string | null>(null);

  useEffect(() => {
    const id = pendingOpen.current;
    pendingOpen.current = null;
    const el = id ? panels.current.get(id) : undefined;
    if (el)
      el.animate([{ height: '0px' }, { height: `${el.scrollHeight}px` }], {
        duration: HEIGHT_MS,
        easing: 'ease-out',
      });
  }, [open]);

  const toggle = (id: string) => {
    const el = panels.current.get(id);
    if (!open.has(id)) {
      if (el && animates()) pendingOpen.current = id;
      setOpen((o) => new Set(o).add(id));
      return;
    }
    const close = () =>
      setOpen((o) => {
        const n = new Set(o);
        n.delete(id);
        return n;
      });
    if (el && animates()) {
      const a = el.animate(
        [{ height: `${el.scrollHeight}px` }, { height: '0px' }],
        { duration: HEIGHT_MS, easing: 'ease-out', fill: 'forwards' }
      );
      a.onfinish = () => {
        flushSync(close);
        a.cancel();
      };
    } else close();
  };

  const panelRef = (id: string) => (el: HTMLDivElement | null) => {
    if (el) panels.current.set(id, el);
    else panels.current.delete(id);
  };

  return { isOpen: (id: string) => open.has(id), toggle, panelRef };
}
