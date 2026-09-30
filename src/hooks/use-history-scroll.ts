'use client';

import { useEffect } from 'react';
import {
  pendingFrom,
  popDecision,
  settleClick,
  shouldCopyState,
  type PendingHash,
} from '@/lib/history';

export function useHistoryScroll() {
  useEffect(() => {
    const root = document.documentElement;
    let pending: PendingHash | null = null;
    const resume = () => {
      if (!('smoothScroll' in root.dataset)) root.dataset.smoothScroll = '';
    };
    const pause = () => {
      delete root.dataset.smoothScroll;
    };
    const onClick = (e: MouseEvent) => {
      const link =
        e.target instanceof Element ? e.target.closest('a[href]') : null;
      pending =
        link instanceof HTMLAnchorElement
          ? pendingFrom(
              {
                href: link.href,
                button: e.button,
                modified: e.metaKey || e.ctrlKey || e.shiftKey || e.altKey,
                target: link.target,
                download: link.hasAttribute('download'),
              },
              location.href,
              history.state
            )
          : null;
    };
    const onClickEnd = (e: MouseEvent) => {
      pending = settleClick(pending, e.defaultPrevented);
      const same = pending?.same ? pending : null;
      if (same)
        requestAnimationFrame(() => {
          if (pending === same) pending = null;
        });
    };
    const onPop = () => {
      const next = popDecision(pending, location.hash);
      pending = next.pending;
      if (next.pause) pause();
    };
    const onHash = () => {
      if (pending && shouldCopyState(pending, history.state, location.hash))
        history.replaceState(pending.state, '', location.href);
      pending = null;
    };
    const input = { capture: true, passive: true };
    window.addEventListener('pointerdown', resume, input);
    window.addEventListener('keydown', resume, input);
    window.addEventListener('popstate', onPop);
    window.addEventListener('hashchange', onHash);
    window.addEventListener('click', onClickEnd);
    document.addEventListener('click', onClick, true);
    return () => {
      window.removeEventListener('pointerdown', resume, input);
      window.removeEventListener('keydown', resume, input);
      window.removeEventListener('popstate', onPop);
      window.removeEventListener('hashchange', onHash);
      window.removeEventListener('click', onClickEnd);
      document.removeEventListener('click', onClick, true);
      pause();
    };
  }, []);
}
