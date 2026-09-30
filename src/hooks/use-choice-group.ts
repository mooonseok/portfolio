'use client';

import { type RefObject, useEffect, useLayoutEffect, useRef } from 'react';
import { MEDIA } from '@/constants/breakpoint';
import { useChoice } from '@/hooks/use-choice';
import { useTabKeys } from '@/hooks/use-tabs';

const hiddenFocus = (root: HTMLElement) => {
  const a = document.activeElement;
  if (!a || a === document.body) return true;
  return root.contains(a) && a.getClientRects().length === 0;
};

export function useChoiceGroup(ids: readonly string[], cols?: number) {
  const { shown, open, pick, toggle } = useChoice(ids);
  const { onKeyDown, tabRef, refs: tabs } = useTabKeys(ids, shown, pick, cols);
  const rootRef = useRef<HTMLDivElement>(null);
  const toggles = useRef(new Map<string, HTMLButtonElement>());
  const current = useRef(shown);
  const within = useRef(false);
  const anchor = useRef<{ id: string; top: number } | null>(null);

  useEffect(() => {
    current.current = shown;
  }, [shown]);

  useLayoutEffect(() => {
    const a = anchor.current;
    anchor.current = null;
    const el = a && toggles.current.get(a.id);
    if (!a || !el) return;
    const d = el.getBoundingClientRect().top - a.top;
    if (d) window.scrollBy({ top: d, behavior: 'instant' });
  }, [open]);

  const onToggle = (id: string) => {
    const el = toggles.current.get(id);
    anchor.current = el ? { id, top: el.getBoundingClientRect().top } : null;
    toggle(id);
  };

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const mq = window.matchMedia(MEDIA.TABLET_UP);
    const onIn = () => {
      within.current = true;
    };
    const onOut = (e: FocusEvent) => {
      const to = e.relatedTarget as Node | null;
      if (to && !root.contains(to)) within.current = false;
    };
    const onDown = (e: PointerEvent) => {
      if (!root.contains(e.target as Node)) within.current = false;
    };
    const onChange = () =>
      requestAnimationFrame(() => {
        if (!within.current || !hiddenFocus(root) || !current.current) return;
        const map = mq.matches ? tabs.current : toggles.current;
        map.get(current.current)?.focus({ preventScroll: true });
      });
    root.addEventListener('focusin', onIn);
    root.addEventListener('focusout', onOut);
    document.addEventListener('pointerdown', onDown);
    mq.addEventListener('change', onChange);
    return () => {
      root.removeEventListener('focusin', onIn);
      root.removeEventListener('focusout', onOut);
      document.removeEventListener('pointerdown', onDown);
      mq.removeEventListener('change', onChange);
    };
  }, [tabs]);

  const toggleRef =
    (map: RefObject<Map<string, HTMLButtonElement>>) =>
    (id: string) =>
    (el: HTMLButtonElement | null) => {
      if (el) map.current.set(id, el);
      else map.current.delete(id);
    };

  return {
    selected: shown,
    open,
    onSelect: pick,
    onToggle,
    onTabKeyDown: onKeyDown,
    tabRef,
    toggleRef: toggleRef(toggles),
    rootRef,
  };
}
