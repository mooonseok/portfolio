import { NAV_ID, NAV_LABEL, ROUTE, type NavId } from '@/constants/navigation';
import type { NavItem } from '@/dto/navigation.dto';
import { hasContact } from '@/lib/content';

const item = (id: NavId, href: string): NavItem => ({
  id,
  label: NAV_LABEL[id],
  href,
});

export function getNavItems(): NavItem[] {
  const items = [
    item(NAV_ID.ACTIVITY, ROUTE.HOME),
    item(NAV_ID.HISTORY, ROUTE.HISTORY),
    item(NAV_ID.WORK, `${ROUTE.HISTORY}#${NAV_ID.WORK}`),
    item(NAV_ID.AI, ROUTE.AI_PRACTICE),
  ];
  if (hasContact()) items.push(item(NAV_ID.CONTACT, `#${NAV_ID.CONTACT}`));
  return items;
}
