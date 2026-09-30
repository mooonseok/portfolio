'use client';

import { useEffect, useState } from 'react';
import { NAV_SPY, type NavId } from '@/constants/navigation';

export function useSiteHeaderNav(spy: boolean, current?: NavId) {
  const [active, setActive] = useState<NavId | undefined>(current);

  useEffect(() => {
    if (!spy) return;
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
    let frame = 0;
    const schedule = () => {
      if (!frame)
        frame = requestAnimationFrame(() => {
          frame = 0;
          pick();
        });
    };
    const events = ['scroll', 'resize', 'hashchange', 'pageshow', 'load'];
    events.forEach((event) =>
      window.addEventListener(event, schedule, { passive: true })
    );
    const ro = new ResizeObserver(schedule);
    ro.observe(document.body);
    pick();
    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      events.forEach((event) => window.removeEventListener(event, schedule));
    };
  }, [spy]);

  return active;
}
