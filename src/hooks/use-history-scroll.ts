'use client';

import { useEffect } from 'react';
import { isSameDocumentHash, shouldCopyState } from '@/lib/history';

export function useHistoryScroll() {
  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;
    let saved: { hash: string; state: unknown } | null = null;
    const pause = () => {
      delete root.dataset.smoothScroll;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        frame = requestAnimationFrame(() => {
          root.dataset.smoothScroll = '';
        });
      });
    };
    const onClick = (e: MouseEvent) => {
      const link =
        e.target instanceof Element ? e.target.closest('a[href]') : null;
      saved =
        link instanceof HTMLAnchorElement &&
        isSameDocumentHash(link.href, location.href)
          ? { hash: link.hash, state: history.state }
          : null;
    };
    const onPop = () => {
      if (saved?.hash !== location.hash) pause();
    };
    const onHash = () => {
      if (saved && shouldCopyState(saved, history.state, location.hash))
        history.replaceState(saved.state, '', location.href);
      saved = null;
    };
    if (document.readyState === 'complete') pause();
    else window.addEventListener('load', pause, { once: true });
    window.addEventListener('popstate', onPop);
    window.addEventListener('hashchange', onHash);
    document.addEventListener('click', onClick, true);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('load', pause);
      window.removeEventListener('popstate', onPop);
      window.removeEventListener('hashchange', onHash);
      document.removeEventListener('click', onClick, true);
      delete root.dataset.smoothScroll;
    };
  }, []);
}
