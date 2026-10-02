import { Box } from '@/components/atoms/box';
import { NavLink } from '@/components/atoms/nav-link';
import { Text } from '@/components/atoms/text';
import type { CaseNextLink } from '@/dto/case-template.dto';
import { TAG } from '@/constants/tag';

export function CaseNextView({ next }: { next: CaseNextLink }) {
  return (
    <Box
      as={TAG.NAV}
      aria-label='Next project'
      className='container mt-30 border-t border-t-ink pt-5 pb-[calc(28px+env(safe-area-inset-bottom))] tab:mt-(--section) tab:pt-8 tab:pb-16'
    >
      <Box className='flex flex-col gap-3 tab:grid tab:grid-cols-[repeat(var(--cols),minmax(0,1fr))] tab:gap-x-(--gutter)'>
        <Text as={TAG.SPAN} className='mono muted tab:col-[1/3] tab:pt-3'>
          NEXT
        </Text>
        <NavLink
          href={next.href}
          className='group/next flex min-h-11 flex-wrap items-baseline justify-between gap-2 tab:col-[3/-1]'
        >
          <Text
            as={TAG.SPAN}
            className='text-[length:clamp(28px,9vw,36px)] leading-[1.05] font-medium tracking-[-0.012em] group-hover/next:underline group-hover/next:decoration-signal group-hover/next:decoration-1 group-hover/next:underline-offset-8 tab:text-[length:clamp(44px,5.6vw,56px)] tab:leading-none tab:tracking-[-0.018em] lap:text-[length:clamp(56px,4.45vw,64px)]'
          >
            {next.title}
          </Text>
          <Text as={TAG.SPAN} className='mono'>
            {next.num} →
          </Text>
        </NavLink>
      </Box>
    </Box>
  );
}
