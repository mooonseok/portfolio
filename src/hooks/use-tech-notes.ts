'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import type { TechNote } from '@/dto/field.dto';
import { MEDIA } from '@/constants/breakpoint';
import { useAnchorTarget } from '@/hooks/use-anchor-target';

const HEIGHT_MS = 220;
const animates = () =>
  window.matchMedia(MEDIA.MOBILE).matches &&
  !window.matchMedia(MEDIA.REDUCED_MOTION).matches;

export function useTechNotes(notes: TechNote[]) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<Set<string>>(
    () => new Set(notes[0] ? [notes[0].id] : [])
  );
  const panels = useRef(new Map<string, HTMLDivElement>());
  const animations = useRef(new Map<string, Animation>());
  const reveal = useCallback((id: string) => {
    const animation = animations.current.get(id);
    if (animation) {
      animation.onfinish = null;
      animation.cancel();
      animations.current.delete(id);
    }
    setOpen((o) => new Set(o).add(id));
  }, []);
  useAnchorTarget(
    notes.map((n) => n.id),
    reveal
  );

  useEffect(() => {
    const running = animations.current;
    return () =>
      running.forEach((animation) => {
        animation.onfinish = null;
        animation.cancel();
      });
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const mq = window.matchMedia(MEDIA.TABLET_UP);
    let keyboard = false;
    let focused: HTMLElement | null = null;
    let frame = 0;
    const onKey = () => {
      keyboard = true;
      const active = document.activeElement;
      if (active instanceof HTMLElement && root.contains(active))
        focused = active;
    };
    const onPointer = () => {
      keyboard = false;
      focused = null;
    };
    const onFocus = (event: FocusEvent) => {
      const target = event.target;
      if (target instanceof HTMLElement && root.contains(target)) {
        focused = keyboard ? target : null;
      } else if (target !== document.body) focused = null;
    };
    const onChange = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const active = document.activeElement;
        if (!focused || !keyboard || focused.getClientRects().length) return;
        if (active !== document.body && active !== focused) return;
        const note = focused.closest('[data-tech-note]');
        const selector = mq.matches
          ? '[data-tech-heading]'
          : '[data-tech-toggle]';
        note
          ?.querySelector<HTMLElement>(selector)
          ?.focus({ preventScroll: true });
      });
    };
    document.addEventListener('keydown', onKey, true);
    document.addEventListener('pointerdown', onPointer, true);
    document.addEventListener('focusin', onFocus);
    mq.addEventListener('change', onChange);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener('keydown', onKey, true);
      document.removeEventListener('pointerdown', onPointer, true);
      document.removeEventListener('focusin', onFocus);
      mq.removeEventListener('change', onChange);
    };
  }, []);

  const toggle = (id: string) => {
    const el = panels.current.get(id);
    const expanding = !open.has(id);
    const previous = animations.current.get(id);
    if (previous) {
      previous.onfinish = null;
      previous.cancel();
      animations.current.delete(id);
    }
    const finish = () =>
      setOpen((old) => {
        const next = new Set(old);
        if (expanding) next.add(id);
        else next.delete(id);
        return next;
      });
    if (!el || !expanding || !animates()) {
      finish();
      return;
    }
    flushSync(finish);
    const animation = el.animate(
      [{ height: '0px' }, { height: `${el.scrollHeight}px` }],
      { duration: HEIGHT_MS, easing: 'cubic-bezier(0.23, 1, 0.32, 1)' }
    );
    animations.current.set(id, animation);
    animation.onfinish = () => {
      if (animations.current.get(id) === animation)
        animations.current.delete(id);
    };
  };
  const panelRef = (id: string) => (el: HTMLDivElement | null) => {
    if (el) panels.current.set(id, el);
    else panels.current.delete(id);
  };
  return { isOpen: (id: string) => open.has(id), toggle, panelRef, rootRef };
}
