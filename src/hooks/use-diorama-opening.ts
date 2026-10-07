import { useCallback, useEffect, useRef, useState } from 'react';
import { DIORAMA } from '@/constants/diorama';
import { DIORAMA_OPENING } from '@/constants/diorama-opening';
import { canPlayOpening } from '@/lib/diorama-opening';

export function useDioramaOpening() {
  const [active, setActive] = useState(false);
  const decided = useRef(false);
  const wasActive = useRef(false);
  const replaying = useRef(false);
  const previousFocus = useRef<HTMLElement | null>(null);
  const finish = useCallback(() => setActive(false), []);

  useEffect(() => {
    if (decided.current) return;
    decided.current = true;
    const navigation = performance.getEntriesByType('navigation')[0] as
      PerformanceNavigationTiming | undefined;
    try {
      if (
        canPlayOpening({
          seen: localStorage.getItem(DIORAMA_OPENING.KEY),
          navigationType: navigation?.type ?? '',
          hash: location.hash,
          scrollY: window.scrollY,
          reduced: window.matchMedia(DIORAMA.REDUCED).matches,
        }) &&
        !document.hidden
      ) {
        localStorage.setItem(DIORAMA_OPENING.KEY, DIORAMA_OPENING.SEEN);
        previousFocus.current = document.activeElement as HTMLElement | null;
        setActive(true);
      }
    } catch {
      setActive(false);
    }
  }, []);

  useEffect(() => {
    if (!active) return;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const timer = window.setTimeout(finish, DIORAMA_OPENING.DURATION);
    const media = window.matchMedia(DIORAMA.REDUCED);
    const visibility = () => {
      if (document.hidden) finish();
    };
    const keydown = (event: globalThis.KeyboardEvent) => {
      if (event.key === DIORAMA.ESCAPE) {
        event.preventDefault();
        finish();
      }
      if (event.key === 'Tab') {
        event.preventDefault();
        document
          .querySelector<HTMLButtonElement>('[data-opening-skip]')
          ?.focus();
      }
    };
    document.addEventListener('keydown', keydown);
    document.addEventListener('visibilitychange', visibility);
    media.addEventListener('change', finish);
    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = overflow;
      document.removeEventListener('keydown', keydown);
      document.removeEventListener('visibilitychange', visibility);
      media.removeEventListener('change', finish);
    };
  }, [active, finish]);

  useEffect(() => {
    if (active) {
      wasActive.current = true;
      return;
    }
    if (!wasActive.current) return;
    wasActive.current = false;
    if (replaying.current) {
      replaying.current = false;
      document
        .querySelector<HTMLButtonElement>('[data-opening-replay]')
        ?.focus({ preventScroll: true });
      previousFocus.current = null;
    } else if (
      previousFocus.current?.isConnected &&
      previousFocus.current !== document.body
    ) {
      previousFocus.current.focus({ preventScroll: true });
      previousFocus.current = null;
    } else if (decided.current) {
      const focus = document.activeElement;
      if (!focus || focus === document.body)
        document.getElementById('main-content')?.focus({ preventScroll: true });
    }
  }, [active]);

  return {
    active,
    onSkip: finish,
    onReplay: () => {
      replaying.current = true;
      previousFocus.current = document.activeElement as HTMLElement | null;
      setActive(true);
    },
  };
}
