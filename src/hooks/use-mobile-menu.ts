'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { MEDIA } from '@/constants/breakpoint';
import type { MobileMenuState } from '@/dto/chrome.dto';

const FOCUSABLE = 'a[href], button:not([disabled])';

export function useMobileMenu(): MobileMenuState {
  const [open, setOpen] = useState(false);
  const id = useId();
  const panelId = `menu-${id}`;
  const btnRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const scrollY = useRef(0);

  const close = useCallback(() => setOpen(false), []);
  const openMenu = useCallback(() => setOpen(true), []);

  useEffect(() => {
    const body = document.body;
    if (open) {
      scrollY.current = window.scrollY;
      body.dataset.scrollLocked = '';
      body.style.position = 'fixed';
      body.style.top = `-${scrollY.current}px`;
      body.style.width = '100%';
      closeRef.current?.focus();
    } else if ('scrollLocked' in body.dataset) {
      delete body.dataset.scrollLocked;
      body.style.position = '';
      body.style.top = '';
      body.style.width = '';
      window.scrollTo(0, scrollY.current);
      btnRef.current?.focus({ preventScroll: true });
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== 'Tab' || !panelRef.current) return;
      const f = panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (!f.length) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    const mq = window.matchMedia(MEDIA.TABLET_UP);
    const onMq = () => mq.matches && close();
    document.addEventListener('keydown', onKey);
    mq.addEventListener('change', onMq);
    return () => {
      document.removeEventListener('keydown', onKey);
      mq.removeEventListener('change', onMq);
    };
  }, [open, close]);

  return { open, panelId, openMenu, close, btnRef, closeRef, panelRef };
}
