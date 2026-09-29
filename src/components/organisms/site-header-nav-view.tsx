import { Box } from '@/components/atoms/box';
import { NavLink } from '@/components/atoms/nav-link';
import { Text } from '@/components/atoms/text';
import type { SiteHeaderNavViewProps } from '@/dto/chrome.dto';
import { TAG } from '@/constants/tag';

export function SiteHeaderNavView({
  items,
  activeId,
  activeAria,
}: SiteHeaderNavViewProps) {
  return (
    <Box
      as={TAG.NAV}
      aria-label='Primary'
      className='hidden tab:flex tab:gap-7 lap:gap-8'
    >
      {items.map((i) => {
        const on = activeId === i.id;
        return (
          <NavLink
            key={i.id}
            href={i.href}
            className='group inline-flex min-h-11 items-center gap-2 mono'
            aria-current={on ? activeAria : undefined}
          >
            {on ? (
              <Text
                as={TAG.SPAN}
                className='h-[7px] w-[7px] rounded-[50%] bg-signal'
                aria-hidden='true'
              />
            ) : null}
            <Text
              as={TAG.SPAN}
              className='border-b border-b-transparent pb-0.5 [transition:border-color_150ms_var(--ease)] group-hover:border-b-current'
            >
              {i.label}
            </Text>
          </NavLink>
        );
      })}
    </Box>
  );
}
