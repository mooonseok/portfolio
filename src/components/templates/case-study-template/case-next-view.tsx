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
      className='container mt-12 border-t border-t-ink tab:mt-16 lap:mt-20'
    >
      <NavLink
        href={next.href}
        className='group/next grid min-h-11 grid-cols-[minmax(0,1fr)_auto] items-center gap-x-6 gap-y-1 py-5 tab:grid-cols-[auto_minmax(0,1fr)_auto] tab:py-6'
      >
        <Text as={TAG.SPAN} className='col-start-1 row-start-1 mono muted'>
          NEXT
        </Text>
        <Text
          as={TAG.SPAN}
          className='col-start-1 row-start-2 text-[20px] leading-[1.3] font-medium wrap-anywhere underline decoration-1 underline-offset-4 group-focus-visible/next:decoration-signal group-active/next:decoration-signal tab:col-start-2 tab:row-start-1 tab:text-[24px] fine:group-hover/next:decoration-signal'
        >
          {next.title}
        </Text>
        <Text
          as={TAG.SPAN}
          aria-hidden='true'
          className='col-start-2 row-span-2 row-start-1 text-body tab:col-start-3 tab:row-span-1'
        >
          →
        </Text>
      </NavLink>
    </Box>
  );
}
