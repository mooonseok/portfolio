import Image from 'next/image';
import { Box } from '@/components/atoms/box';
import { Button } from '@/components/atoms/button';
import { Text } from '@/components/atoms/text';
import { EDITOR_MOVE } from '@/constants/emosave-editor';
import type { EditorViewProps } from '@/dto/emosave-editor-view.dto';
import styles from './emosave-editor.module.css';

export function EditorControlsView(props: EditorViewProps) {
  const disabled = props.failed || !props.snapshot.selectedId;
  return (
    <Box
      data-editor-interactive
      onKeyDown={props.onKeyDown}
      aria-describedby='editor-keyboard-help'
    >
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
        <Box className={styles.moves} role='group' aria-label='캐릭터 이동'>
          {EDITOR_MOVE.map((move) => (
            <Button
              key={move.label}
              className={styles.control}
              aria-label={`캐릭터 이동: ${move.label}`}
              title={`캐릭터 이동: ${move.label}`}
              disabled={disabled}
              onClick={() => props.onMove(move.x, move.y)}
            >
              <svg
                width='20'
                height='20'
                viewBox='0 0 24 24'
                fill='none'
                aria-hidden='true'
                style={{ transform: `rotate(${move.angle}deg)` }}
              >
                <path
                  d='M4 12h15m-6-6 6 6-6 6'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </Button>
          ))}
        </Box>
        <Box className={styles.moves} role='group' aria-label='캐릭터 회전'>
          {[-1, 1].map((direction) => (
            <Button
              key={direction}
              className={styles.control}
              disabled={disabled}
              aria-label={
                direction < 0 ? '왼쪽으로 15° 회전' : '오른쪽으로 15° 회전'
              }
              title={
                direction < 0 ? '왼쪽으로 15° 회전' : '오른쪽으로 15° 회전'
              }
              onClick={() => props.onRotate(direction)}
            >
              <svg
                width='20'
                height='20'
                viewBox='0 0 24 24'
                fill='none'
                aria-hidden='true'
                style={{ transform: direction < 0 ? 'scaleX(-1)' : undefined }}
              >
                <path
                  d='M6 18a8 8 0 1 1 13-9m0-5v5h-5'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </Button>
          ))}
        </Box>
        <Box className={styles.moves} role='group' aria-label='캐릭터 크기'>
          <Button
            className={styles.control}
            aria-label='캐릭터 작게'
            title='캐릭터 작게'
            disabled={disabled}
            onClick={() => props.onResize(-1)}
          >
            −
          </Button>
          <Button
            className={styles.control}
            aria-label='캐릭터 크게'
            title='캐릭터 크게'
            disabled={disabled}
            onClick={() => props.onResize(1)}
          >
            +
          </Button>
        </Box>
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
      <Text id='editor-bubble-help' className={styles.bubbleHelp}>
        {props.snapshot.selectedId && !props.paused
          ? '선택을 해제하면 말풍선이 다시 재생됩니다.'
          : ''}
      </Text>
    </Box>
  );
}
