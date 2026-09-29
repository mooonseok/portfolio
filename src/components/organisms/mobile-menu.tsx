'use client';

import { MobileMenuView } from './mobile-menu-view';
import { useMobileMenu } from '@/hooks/use-mobile-menu';
import type { MobileMenuEntry, MobileMenuProps } from '@/dto/chrome.dto';

export function MobileMenu({ items, current, contact }: MobileMenuProps) {
  const menu = useMobileMenu();
  const entries: MobileMenuEntry[] = items.map((item, n) => ({
    item,
    label: item.label.charAt(0) + item.label.slice(1).toLowerCase(),
    index: String(n + 1).padStart(2, '0'),
    current: current === item.id,
  }));
  return (
    <MobileMenuView
      {...menu}
      entries={entries}
      contact={contact}
      hasContact={!!(contact.email || contact.github)}
    />
  );
}
