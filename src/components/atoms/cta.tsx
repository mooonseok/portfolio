import { Box } from '@/components/atoms/box';
import { NavLink } from '@/components/atoms/nav-link';
import { TAG } from '@/constants/tag';

export function Cta({ href, label }: { href: string; label: string }) {
  return (
    <NavLink
      href={href}
      className='group/cta inline-flex min-h-11 min-w-11 items-center gap-2.5 self-start border-b border-b-current font-mono text-(length:--fs-meta) tracking-[0.06em] [transition:border-color_150ms_var(--ease)] hover:border-b-signal focus-visible:border-b-signal focus-visible:outline-offset-6 active:border-b-signal lap:min-h-8'
    >
      {label}{' '}
      <Box
        as={TAG.SPAN}
        className='inline-block [transition:transform_150ms_var(--ease)] motion-safe:group-hover/cta:[transform:translateX(4px)] motion-safe:group-focus-visible/cta:[transform:translateX(4px)]'
        aria-hidden='true'
      >
        →
      </Box>
    </NavLink>
  );
}
