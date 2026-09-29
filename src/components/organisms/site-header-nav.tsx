'use client';

import { SiteHeaderNavView } from './site-header-nav-view';
import { useSiteHeaderNav } from '@/hooks/use-site-header-nav';
import { ARIA_CURRENT } from '@/constants/aria';
import type { SiteHeaderNavProps } from '@/dto/chrome.dto';

export function SiteHeaderNav({
  items,
  current,
  spy = false,
}: SiteHeaderNavProps) {
  const active = useSiteHeaderNav(spy, current);
  return (
    <SiteHeaderNavView
      items={items}
      activeId={spy ? active : current}
      activeAria={spy ? ARIA_CURRENT.LOCATION : ARIA_CURRENT.TRUE}
    />
  );
}
