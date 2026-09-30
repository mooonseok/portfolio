'use client';

import { useEffect } from 'react';
import { useSelection } from '@/hooks/use-selection';

export function useHashSelection(ids: readonly string[]) {
  const { selected, select } = useSelection(ids);
  const key = ids.join(' ');

  useEffect(() => {
    const list = key.split(' ');
    const fromHash = () => {
      const h = decodeURIComponent(window.location.hash.slice(1));
      if (list.includes(h)) select(h);
    };
    fromHash();
    window.addEventListener('hashchange', fromHash);
    return () => window.removeEventListener('hashchange', fromHash);
  }, [key, select]);

  return { selected, select };
}
