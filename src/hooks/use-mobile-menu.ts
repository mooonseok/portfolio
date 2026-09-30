'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import type { MouseEvent } from 'react';
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
  const destination = useRef<URL | null>(null);
  const resized = useRef(false);
  const close = useCallback(() => setOpen(false), []);
  const openMenu = useCallback(() => {
    destination.current = null;
    resized.current = false;
    setOpen(true);
  }, []);
  const navigate = (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0)
      return;
    destination.current = new URL(e.currentTarget.href);
    const url = destination.current;
    if (url.pathname === location.pathname && url.hash) e.preventDefault();
    close();
  };

  useEffect(() => {
    if (!open || !panelRef.current) return;
    const panel = panelRef.current;
    const button = btnRef.current;
    const body = document.body;
    const y = window.scrollY;
    const saved = {
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
    };
    const inert = new Map<HTMLElement, boolean>();
    let branch: HTMLElement = panel;
    while (branch.parentElement) {
      for (const sibling of branch.parentElement.children) {
        if (sibling !== branch && sibling instanceof HTMLElement) {
          inert.set(sibling, sibling.inert);
          sibling.inert = true;
        }
      }
      branch = branch.parentElement;
      if (branch === body) break;
    }
    body.dataset.scrollLocked = '';
    body.style.position = 'fixed';
    body.style.top = `-${y}px`;
    body.style.width = '100%';
    closeRef.current?.focus({ preventScroll: true });
    const onFocus = (e: FocusEvent) => {
      if (e.target instanceof Node && !panel.contains(e.target))
        closeRef.current?.focus();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== 'Tab') return;
      const f = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE));
      const first = f[0];
      const last = f[f.length - 1];
      const index = f.indexOf(document.activeElement as HTMLElement);
      if (
        index < 0 ||
        (e.shiftKey && index === 0) ||
        (!e.shiftKey && index === f.length - 1)
      ) {
        e.preventDefault();
        (e.shiftKey ? last : first)?.focus();
      }
    };
    const mq = window.matchMedia(MEDIA.TABLET_UP);
    const onMq = () => {
      if (mq.matches) {
        resized.current = true;
        close();
      }
    };
    document.addEventListener('focusin', onFocus);
    document.addEventListener('keydown', onKey);
    mq.addEventListener('change', onMq);
    return () => {
      document.removeEventListener('focusin', onFocus);
      document.removeEventListener('keydown', onKey);
      mq.removeEventListener('change', onMq);
      inert.forEach((value, el) => {
        el.inert = value;
      });
      delete body.dataset.scrollLocked;
      Object.assign(body.style, saved);
      window.scrollTo({ top: y, behavior: 'instant' });
      const url = destination.current;
      if (url) {
        if (url.pathname !== location.pathname || !url.hash) return;
        const target = document.getElementById(
          decodeURIComponent(url.hash.slice(1))
        );
        if (target) {
          if (!target.hasAttribute('tabindex')) target.tabIndex = -1;
          if (location.hash !== url.hash) history.pushState(null, '', url.hash);
          window.dispatchEvent(new HashChangeEvent('hashchange'));
          target.scrollIntoView();
          target.focus({ preventScroll: true });
        }
      } else if (resized.current) {
        document
          .querySelector<HTMLElement>(
            'nav[aria-label="Primary"] a[aria-current], nav[aria-label="Primary"] a'
          )
          ?.focus({ preventScroll: true });
      } else button?.focus({ preventScroll: true });
    };
  }, [open, close]);

  return {
    open,
    panelId,
    openMenu,
    close,
    navigate,
    btnRef,
    closeRef,
    panelRef,
  };
}
