import { Box } from '@/components/atoms/box';
import { Button } from '@/components/atoms/button';
import { EDITOR_MOVE } from '@/constants/emosave-editor';
import type { EditorViewProps } from '@/dto/emosave-editor.dto';
import styles from './emosave-editor.module.css';

export function EditorControlsView(props: EditorViewProps) {
  return (
    <Box
      className={styles.controls}
      role='group'
      aria-label='집 편집'
      onKeyDown={props.onKeyDown}
    >
      <Button
        className={styles.control}
        disabled={!props.ready}
        aria-pressed={props.selected}
        onClick={props.onSelect}
      >
        집 선택
      </Button>
      <Box className={styles.moves} role='group' aria-label='집 이동'>
        {EDITOR_MOVE.map((move) => (
          <Button
            key={move.label}
            className={styles.control}
            aria-label={`집 이동: ${move.label}`}
            title={`집 이동: ${move.label}`}
            disabled={!props.ready || !props.selected}
            onClick={() => props.onMove(move.x, move.z)}
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
      <Button
        className={styles.control}
        disabled={!props.ready || !props.selected}
        onClick={props.onRotate}
      >
        90° 회전
      </Button>
      <Button
        className={styles.control}
        disabled={!props.ready}
        onClick={props.onReset}
      >
        처음으로
      </Button>
    </Box>
  );
}
