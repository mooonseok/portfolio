import { Anchor } from '@/components/atoms/anchor';
import { Box } from '@/components/atoms/box';
import { Heading } from '@/components/atoms/heading';
import { Text } from '@/components/atoms/text';
import { HEADING, TAG } from '@/constants/tag';
import type { EditorViewProps } from '@/dto/emosave-editor-view.dto';
import { EditorControlsView } from './editor-controls-view';
import { EditorSceneView } from './editor-scene-view';
import styles from './emosave-editor.module.css';

export function EmosaveEditorView(props: EditorViewProps) {
  return (
    <Box
      as={TAG.MAIN}
      id='main-content'
      tabIndex={-1}
      className='container min-h-screen pt-4 pb-12'
    >
      <Anchor href='/' className={styles.link}>
        작업실로 돌아가기
      </Anchor>
      <Box className={styles.editor}>
        <Heading level={HEADING.H1} className={styles.title}>
          Emosave · 마을 편집
        </Heading>
        <Text className='mt-2 text-sm text-subtle'>
          배치 편집 개념 예시 · 실제 앱 화면 아님
        </Text>
        <Box as={TAG.FIGURE} className='m-0 mt-4'>
          <EditorSceneView {...props} />
          <Text
            as={TAG.FIGCAPTION}
            id='editor-help'
            className='mt-2 text-sm leading-relaxed'
          >
            <Text as={TAG.SPAN} className={styles.fineHelp}>
              캐릭터를 끌어 이동하고, 모서리 손잡이로 회전과 크기를 조절하세요.
            </Text>
            <Text as={TAG.SPAN} className={styles.touchHelp}>
              캐릭터를 먼저 선택한 뒤 끌어 보세요. 빈 곳을 누르면 선택이
              해제됩니다.
            </Text>
          </Text>
        </Box>
        <EditorControlsView {...props} />
        <Text
          className={styles.notice}
          role='status'
          aria-live='polite'
          aria-atomic='true'
        >
          {props.notice}
          <Text as={TAG.SPAN} id='editor-placement' className='sr-only'>
            {props.placementDescription}
          </Text>
        </Text>
        <Text id='editor-handle-help' className='sr-only'>
          회전 손잡이는 좌우 키로 회전합니다. 크기 손잡이는 왼쪽·아래 키로 작게,
          오른쪽·위 키로 크게 조절합니다. 아래 버튼으로도 조작할 수 있습니다.
        </Text>
        <Text
          id='editor-keyboard-help'
          className='text-sm leading-relaxed text-subtle'
        >
          방향키로 이동, 회전 손잡이에서 좌우 키로 회전할 수 있습니다. 빈 곳이나
          Esc로 선택 해제, Delete로 삭제하세요.
        </Text>
        <Anchor
          href='/work/emosave#editor-state'
          className={`${styles.link} mt-5`}
        >
          실제 담당한 편집 기능과 상태 처리 보기
        </Anchor>
        <Text className='mt-2 text-xs leading-relaxed text-subtle'>
          캐릭터와 대사는 설명을 위해 새로 구성했습니다.
        </Text>
      </Box>
    </Box>
  );
}
