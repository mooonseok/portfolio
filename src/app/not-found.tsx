import type { Metadata } from 'next';
import { Box } from '@/components/atoms/box';
import { Heading } from '@/components/atoms/heading';
import { NavLink } from '@/components/atoms/nav-link';
import { Text } from '@/components/atoms/text';
import { HEADING, TAG } from '@/constants/tag';

export const metadata: Metadata = {
  title: '404 — 페이지를 찾을 수 없습니다 · Park Moonseok',
};

export default function NotFound() {
  return (
    <Box
      as={TAG.MAIN}
      id='main-content'
      tabIndex={-1}
      className='container flex min-h-svh items-center py-12'
    >
      <Box className='board w-full'>
        <Box className='board-surface flex flex-col items-start gap-6 p-6 tab:p-12'>
          <Text as={TAG.SPAN} className='mono text-signal'>
            404
          </Text>
          <Heading
            level={HEADING.H1}
            className='text-[32px] leading-[1.25] font-medium tab:text-[48px]'
          >
            페이지를 찾을 수 없습니다.
          </Heading>
          <Text className='text-body leading-[1.7] text-subtle'>
            주소가 바뀌었거나 삭제된 페이지입니다. 홈에서 프로젝트를 다시
            찾아보세요.
          </Text>
          <NavLink
            href='/'
            className='inline-flex min-h-11 items-center border-b border-current'
          >
            ← 프로젝트 보드로 돌아가기
          </NavLink>
        </Box>
      </Box>
    </Box>
  );
}
