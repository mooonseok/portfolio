import { Box } from '@/components/atoms/box';
import { NavLink } from '@/components/atoms/nav-link';
import { Text } from '@/components/atoms/text';
import type { SiteHeaderViewProps } from '@/dto/chrome.dto';
import { TAG } from '@/constants/tag';

export function SiteHeaderView({
  dark,
  back,
  name,
  nav,
  menu,
}: SiteHeaderViewProps) {
  return (
    <Box
      as={TAG.HEADER}
      className='relative z-5 container flex min-h-14 items-center justify-between pt-[calc(12px_+_env(safe-area-inset-top))] data-dark:text-paper tab:pt-7'
      data-dark={dark || undefined}
    >
      {back ? (
        <NavLink href='/#work' className='flex min-h-11 items-center mono'>
          <Text as={TAG.SPAN} className='inline tab:hidden'>
            ← WORK
          </Text>
          <Text as={TAG.SPAN} className='hidden tab:inline'>
            {name}
          </Text>
        </NavLink>
      ) : (
        <NavLink href='/' className='flex min-h-11 items-center mono'>
          {name}
        </NavLink>
      )}
      {nav}
      {menu}
    </Box>
  );
}
