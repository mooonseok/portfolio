import Image from 'next/image';
import { Box } from '@/components/atoms/box';
import { Button } from '@/components/atoms/button';
import { Text } from '@/components/atoms/text';
import type { EditorViewProps } from '@/dto/emosave-editor-view.dto';
import styles from './emosave-editor.module.css';

export function EditorControlsView(props: EditorViewProps) {
  return (
    <Box
      data-editor-interactive
      onKeyDown={props.onKeyDown}
      aria-describedby='editor-keyboard-help'
    >
      <Box className={styles.toolbar}>
        <Box className={styles.choices} role='group' aria-label='캐릭터 선택'>
          {props.characters
            .filter((character) =>
              props.snapshot.items.some((item) => item.id === character.id)
            )
            .map((character) => (
              <Button
                key={character.id}
                data-editor-choice={character.id}
                className={styles.choice}
                aria-pressed={props.snapshot.selectedId === character.id}
                disabled={props.failed}
                onClick={() =>
                  props.onSelect(
                    props.snapshot.selectedId === character.id
                      ? null
                      : character.id
                  )
                }
              >
                <Image src={character.image} alt='' width={32} height={32} />
                {character.name}
              </Button>
            ))}
        </Box>
        <Box className={styles.controls} role='group' aria-label='캐릭터 편집'>
          <Button
            data-editor-reset
            className={styles.control}
            onClick={props.onReset}
            disabled={props.failed}
          >
            처음으로
          </Button>
          <Button
            className={styles.bubbleControl}
            onClick={props.onToggleBubbles}
            disabled={props.failed}
            aria-pressed={!props.paused}
            aria-describedby={
              props.snapshot.selectedId && !props.paused
                ? 'editor-bubble-help'
                : undefined
            }
          >
            {props.paused ? '말풍선 재생' : '말풍선 정지'}
          </Button>
        </Box>
      </Box>
      <Text id='editor-bubble-help' className={styles.bubbleHelp}>
        {props.snapshot.selectedId && !props.paused
          ? '선택을 해제하면 말풍선이 다시 재생됩니다.'
          : ''}
      </Text>
    </Box>
  );
}
