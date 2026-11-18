import type { Metadata } from 'next';
import { Box } from '@/components/atoms/box';
import { Heading } from '@/components/atoms/heading';
import { NavLink } from '@/components/atoms/nav-link';
import { SiteHeader } from '@/components/organisms/site-header';
import { SiteFooter } from '@/components/organisms/site-footer';
import { HEADING, TAG } from '@/constants/tag';

export const metadata: Metadata = {
  title: '404 — 페이지를 찾을 수 없습니다 · Park Moonseok',
};

export default function NotFound() {
  return (
    <>
      <SiteHeader spy={false} />
      <Box
        as={TAG.MAIN}
        id='main-content'
        tabIndex={-1}
        className='mx-auto min-h-[65svh] w-[92%] max-w-[1220px] pt-14 tab:pt-20'
      >
        <Heading
          level={HEADING.H1}
          className='text-[clamp(44px,6vw,84px)] leading-[1.1] font-medium tracking-[-.05em]'
        >
          페이지를 찾을 수 없습니다
        </Heading>
        <NavLink
          href='/'
          className='mt-8 inline-flex min-h-11 items-center rounded-full bg-action px-5 text-ink'
        >
          작업으로 돌아가기
        </NavLink>
      </Box>
      <SiteFooter />
    </>
  );
}
