'use client';

import { useEffect } from 'react';

export function useAnchorTarget(
  ids: readonly string[],
  select: (id: string) => void
) {
  const key = ids.join(' ');
  useEffect(() => {
    let frame = 0;
    const reveal = (hash: string) => {
      let id: string;
      try {
        id = decodeURIComponent(hash.slice(1));
      } catch {
        return;
      }
      if (!key.split(' ').includes(id)) return;
      select(id);
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() =>
        document.getElementById(id)?.scrollIntoView()
      );
    };
    const fromHash = () => reveal(location.hash);
    const fromLink = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.altKey || e.shiftKey)
        return;
      const anchor =
        e.target instanceof Element
          ? (e.target.closest('a[href]') as HTMLAnchorElement | null)
          : null;
      if (!anchor) return;
      const url = new URL(anchor.href);
      if (url.origin === location.origin && url.pathname === location.pathname)
        reveal(url.hash);
    };
    fromHash();
    window.addEventListener('hashchange', fromHash);
    document.addEventListener('click', fromLink);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('hashchange', fromHash);
      document.removeEventListener('click', fromLink);
    };
  }, [key, select]);
}
