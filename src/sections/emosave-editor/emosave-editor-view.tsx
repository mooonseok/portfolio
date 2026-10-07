import { Anchor } from '@/components/atoms/anchor';
import { Box } from '@/components/atoms/box';
import { Heading } from '@/components/atoms/heading';
import { EmosaveEditor } from '@/components/organisms/emosave-editor/emosave-editor';
import { HEADING, TAG } from '@/constants/tag';

export function EmosaveEditorView() {
  return (
    <Box
      as={TAG.MAIN}
      id='main-content'
      tabIndex={-1}
      className='container min-h-screen pt-4 pb-12'
    >
      <Anchor
        href='/'
        className='inline-flex min-h-11 items-center text-sm underline underline-offset-4'
      >
        작업실로 돌아가기
      </Anchor>
      <Box className='mx-auto mt-3 max-w-[560px]'>
        <Heading
          level={HEADING.H1}
          className='text-2xl leading-[1.3] font-medium tab:text-[28px]'
        >
          Emosave · 마을 편집
        </Heading>
        <EmosaveEditor />
      </Box>
    </Box>
  );
}
