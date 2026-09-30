'use client';

import { useEffect } from 'react';
import { isSameDocumentHash, shouldCopyState } from '@/lib/history';

export function useHistoryScroll() {
  useEffect(() => {
    let saved: { hash: string; state: unknown } | null = null;
    const onClick = (e: MouseEvent) => {
      const link =
        e.target instanceof Element ? e.target.closest('a[href]') : null;
      saved =
        link instanceof HTMLAnchorElement &&
        isSameDocumentHash(link.href, location.href)
          ? { hash: link.hash, state: history.state }
          : null;
    };
    const onHash = () => {
      if (saved && shouldCopyState(saved, history.state, location.hash))
        history.replaceState(saved.state, '', location.href);
      saved = null;
    };
    window.addEventListener('hashchange', onHash);
    document.addEventListener('click', onClick, true);
    return () => {
      window.removeEventListener('hashchange', onHash);
      document.removeEventListener('click', onClick, true);
    };
  }, []);
}
