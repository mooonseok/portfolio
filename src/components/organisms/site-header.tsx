import { SiteHeaderNavView } from './site-header-nav-view';
import { SiteHeaderView } from './site-header-view';
import { site } from '@/content/site';
import { getNavItems } from '@/lib/navigation';
import { NAV_ID } from '@/constants/navigation';
import { ARIA_CURRENT } from '@/constants/aria';
import type { SiteHeaderProps } from '@/dto/chrome.dto';

export function SiteHeader({ current }: SiteHeaderProps) {
  return (
    <SiteHeaderView
      handle={site.handle}
      github={site.contact.github}
      nav={
        <SiteHeaderNavView
          items={getNavItems()}
          activeId={current === NAV_ID.WORK ? NAV_ID.HISTORY : current}
          activeAria={ARIA_CURRENT.TRUE}
        />
      }
    />
  );
}
