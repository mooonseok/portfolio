import { Anchor } from '@/components/atoms/anchor';
import { Box } from '@/components/atoms/box';
import { TAG } from '@/constants/tag';

export function JumpLink({ href, label }: { href: string; label: string }) {
  return (
    <Anchor
      href={href}
      className='group/jump inline-flex min-h-11 items-center gap-2.5 self-start border-b border-b-current font-mono text-(length:--fs-meta) tracking-[0.06em] [transition:border-color_150ms_var(--ease)] hover:border-b-signal focus-visible:border-b-signal focus-visible:outline-offset-6 lap:min-h-8'
    >
      {label}{' '}
      <Box
        as={TAG.SPAN}
        className='inline-block [transition:transform_150ms_var(--ease)] motion-safe:group-hover/jump:[transform:translateY(2px)]'
        aria-hidden='true'
      >
        ↓
      </Box>
    </Anchor>
  );
}
