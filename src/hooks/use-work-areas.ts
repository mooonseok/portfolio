'use client';

import {
  type KeyboardEvent,
  type RefObject,
  useEffect,
  useLayoutEffect,
  useRef,
} from 'react';
import { SELECT_KEY } from '@/constants/aria';
import { MEDIA } from '@/constants/breakpoint';
import { useSelection } from '@/hooks/use-selection';
import { shiftSelection } from '@/lib/selection';

const hiddenFocus = (root: HTMLElement) => {
  const a = document.activeElement;
  if (!a || a === document.body) return true;
  return root.contains(a) && a.getClientRects().length === 0;
};

export function useWorkAreas(ids: readonly string[]) {
  const { selected, select } = useSelection(ids);
  const rootRef = useRef<HTMLDivElement>(null);
  const tabs = useRef(new Map<string, HTMLButtonElement>());
  const toggles = useRef(new Map<string, HTMLButtonElement>());
  const current = useRef(selected);
  const within = useRef(false);
  const anchor = useRef<{ id: string; top: number } | null>(null);

  useEffect(() => {
    current.current = selected;
  }, [selected]);

  useLayoutEffect(() => {
    const a = anchor.current;
    anchor.current = null;
    const el = a && toggles.current.get(a.id);
    if (!a || !el) return;
    const d = el.getBoundingClientRect().top - a.top;
    if (d) window.scrollBy({ top: d, behavior: 'instant' });
  }, [selected]);

  const onToggle = (id: string) => {
    const el = toggles.current.get(id);
    anchor.current = el ? { id, top: el.getBoundingClientRect().top } : null;
    select(id);
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
  }, []);

  const onTabKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const next =
      e.key === SELECT_KEY.NEXT
        ? shiftSelection(ids, selected, 1)
        : e.key === SELECT_KEY.PREV
          ? shiftSelection(ids, selected, -1)
          : e.key === SELECT_KEY.FIRST
            ? ids[0]
            : e.key === SELECT_KEY.LAST
              ? ids[ids.length - 1]
              : undefined;
    if (!next) return;
    e.preventDefault();
    select(next);
    tabs.current.get(next)?.focus();
  };

  const refIn =
    (map: RefObject<Map<string, HTMLButtonElement>>) =>
    (id: string) =>
    (el: HTMLButtonElement | null) => {
      if (el) map.current.set(id, el);
      else map.current.delete(id);
    };

  return {
    selected,
    onSelect: select,
    onToggle,
    onTabKeyDown,
    tabRef: refIn(tabs),
    toggleRef: refIn(toggles),
    rootRef,
  };
}
