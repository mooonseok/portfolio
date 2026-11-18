import { Anchor } from '@/components/atoms/anchor';
import { Box } from '@/components/atoms/box';
import { NavLink } from '@/components/atoms/nav-link';
import type { SiteHeaderViewProps } from '@/dto/chrome.dto';
import { TAG } from '@/constants/tag';

export function SiteHeaderView({ handle, nav, github }: SiteHeaderViewProps) {
  return (
    <Box as={TAG.HEADER} className='site-masthead'>
      <NavLink href='/' className='site-signature' aria-label={`${handle} 홈`}>
        {handle}
      </NavLink>
      {nav}
      <Anchor href={github} className='site-profile'>
        GitHub ↗
      </Anchor>
    </Box>
  );
}
