import { MobileMenu } from './mobile-menu';
import { SiteHeaderNav } from './site-header-nav';
import { SiteHeaderView } from './site-header-view';
import { site } from '@/content/site';
import { getNavItems } from '@/lib/navigation';
import type { SiteHeaderProps } from '@/dto/chrome.dto';

export function SiteHeader({
  dark = false,
  back,
  current,
  spy = !back && current === undefined,
}: SiteHeaderProps) {
  const items = getNavItems();
  return (
    <SiteHeaderView
      dark={dark}
      back={back}
      name={site.name}
      nav={<SiteHeaderNav items={items} current={current} spy={spy} />}
      menu={
        <MobileMenu items={items} current={current} contact={site.contact} />
      }
    />
  );
}
