import { Anchor } from '@/components/atoms/anchor';
import { Box } from '@/components/atoms/box';
import { Heading } from '@/components/atoms/heading';
import { Text } from '@/components/atoms/text';
import { HEADING, TAG } from '@/constants/tag';
import type { EditorViewProps } from '@/dto/emosave-editor.dto';
import { EditorControlsView } from './editor-controls-view';
import styles from './emosave-editor.module.css';

export function EmosaveEditorView(props: EditorViewProps) {
  return (
    <Box
      as={TAG.MAIN}
      id='main-content'
      tabIndex={-1}
      className='container min-h-screen pt-6 pb-16'
    >
      <Anchor
        href='/'
        className='inline-flex min-h-11 items-center text-sm underline underline-offset-4'
      >
        작업실로 돌아가기
      </Anchor>
      <Box className={styles.editor}>
        <Heading
          level={HEADING.H1}
          className='text-[28px] leading-tight font-medium tab:text-[32px]'
        >
          Emosave · 마을 편집
        </Heading>
        <Text className='mt-3 text-sm text-subtle'>
          배치 편집 개념 예시 · 실제 앱 화면 아님
        </Text>
        <Box
          as={TAG.FIGURE}
          aria-label='집 한 채를 놓는 배치 영역'
          className='m-0 mt-6'
        >
          <Box className={styles.stage}>
            <Box ref={props.hostRef} className='absolute inset-0' />
            {!props.ready && (
              <Text
                role='status'
                className='absolute inset-0 m-auto h-fit max-w-[24em] px-6 text-center text-sm leading-relaxed text-subtle'
              >
                {props.failed
                  ? '3D를 불러오지 못했습니다. 아래 구현 사례에서 편집 기능 설명을 확인할 수 있습니다.'
                  : '배치 영역을 준비하고 있습니다.'}
              </Text>
            )}
            {props.ready && (
              <Text className={styles.selection} aria-hidden>
                {props.selected
                  ? `집 선택됨 · 앞면: ${props.front}`
                  : '집을 눌러 선택'}
              </Text>
            )}
          </Box>
          <Text
            as={TAG.FIGCAPTION}
            id='editor-help'
            className='mt-4 text-sm leading-relaxed'
          >
            <Text as={TAG.SPAN} className={styles.fineHelp}>
              집을 끌거나, 선택한 뒤 놓을 위치를 누르세요.
            </Text>
            <Text as={TAG.SPAN} className={styles.touchHelp}>
              집을 선택한 뒤 놓을 위치를 누르세요.
            </Text>
          </Text>
        </Box>
        <EditorControlsView {...props} />
        <Text className='mt-3 text-sm leading-relaxed text-subtle'>
          방향 버튼으로도 이동할 수 있습니다. 조작 버튼에 포커스가 있을 때
          방향키로 이동하고 Esc로 선택을 해제하세요.
        </Text>
        <Text
          role='status'
          aria-live='polite'
          aria-atomic='true'
          className='sr-only'
        >
          {props.notice}
        </Text>
        <Anchor
          href='/work/emosave#editor-state'
          className='mt-8 inline-flex min-h-11 items-center text-sm underline underline-offset-4'
        >
          실제 담당한 편집 기능과 상태 처리 보기
        </Anchor>
      </Box>
    </Box>
  );
}
