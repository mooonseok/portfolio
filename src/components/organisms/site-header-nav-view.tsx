import { Box } from '@/components/atoms/box';
import { NavLink } from '@/components/atoms/nav-link';
import type { SiteHeaderNavViewProps } from '@/dto/chrome.dto';
import { TAG } from '@/constants/tag';

export function SiteHeaderNavView({
  items,
  activeId,
  activeAria,
}: SiteHeaderNavViewProps) {
  return (
    <Box as={TAG.NAV} aria-label='주 메뉴' className='site-routes'>
      {items.map((item) => (
        <NavLink
          key={item.id}
          href={item.href}
          aria-current={item.id === activeId ? activeAria : undefined}
        >
          {item.label}
        </NavLink>
      ))}
    </Box>
  );
}
