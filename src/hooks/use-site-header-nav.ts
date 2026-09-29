'use client';

import { useEffect, useState } from 'react';
import { NAV_SPY, type NavId } from '@/constants/navigation';

export function useSiteHeaderNav(spy: boolean, current?: NavId) {
  const [active, setActive] = useState<NavId | undefined>(current);

  useEffect(() => {
    if (!spy || !('IntersectionObserver' in window)) return;
    const targets = NAV_SPY.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => !!el
    );
    if (!targets.length) return;
    const pick = () => {
      const line = window.innerHeight * 0.45;
      let next: NavId | undefined;
      for (const el of targets)
        if (el.getBoundingClientRect().top <= line) next = el.id as NavId;
      setActive(next);
    };
    const io = new IntersectionObserver(pick, {
      rootMargin: '-45% 0px -54% 0px',
    });
    targets.forEach((el) => io.observe(el));
    pick();
    return () => io.disconnect();
  }, [spy]);

  return active;
}
