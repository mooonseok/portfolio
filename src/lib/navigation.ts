import { NAV_ID, NAV_LABEL, type NavId } from '@/constants/navigation';
import type { NavItem } from '@/dto/navigation.dto';
import { hasContact } from '@/lib/content';

const item = (id: NavId, base: string): NavItem => ({
  id,
  label: NAV_LABEL[id],
  href: `${base}/#${id}`,
});

export function getNavItems(base = ''): NavItem[] {
  const items = [NAV_ID.WORK, NAV_ID.ABOUT].map((id) => item(id, base));
  if (hasContact()) items.push(item(NAV_ID.CONTACT, base));
  return items;
}
