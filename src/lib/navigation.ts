import { NAV_ID, NAV_LABEL, ROUTE, type NavId } from '@/constants/navigation';
import type { NavItem } from '@/dto/navigation.dto';

const item = (id: NavId, href: string): NavItem => ({
  id,
  label: NAV_LABEL[id],
  href,
});

export function getNavItems(): NavItem[] {
  return [
    item(NAV_ID.ACTIVITY, ROUTE.HOME),
    item(NAV_ID.HISTORY, ROUTE.HISTORY),
    item(NAV_ID.AI, ROUTE.AI_PRACTICE),
  ];
}
