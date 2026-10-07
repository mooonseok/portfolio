import { Button } from '@/components/atoms/button';
import type { EditorViewProps } from '@/dto/emosave-editor-view.dto';
import styles from './editor-handles.module.css';

export function EditorHandlesView(props: EditorViewProps) {
  const item = props.snapshot.items.find(
    (entry) => entry.id === props.snapshot.selectedId
  );
  const radians = ((item?.angle ?? 0) * Math.PI) / 180;
  const offset =
    0.1 *
      (item?.scale ?? 1) *
      (Math.abs(Math.cos(radians)) + Math.abs(Math.sin(radians))) +
    0.065;
  const position = (x: number, y: number) => ({
    left: `${Math.max(0.07, Math.min(0.93, (item?.x ?? 0.5) + offset * x)) * 100}%`,
    top: `${Math.max(0.07, Math.min(0.93, (item?.y ?? 0.5) + offset * y)) * 100}%`,
  });
  return (
    <>
      <Button
        data-editor-rotate
        data-editor-overlay='rotate'
        className={styles.handle}
        hidden={!item || props.failed}
        style={position(1, -1)}
        aria-label='회전 손잡이'
        aria-describedby='editor-handle-help editor-placement'
        title='드래그해 회전 · 누르면 15° 회전'
        onClick={(event) => {
          if (event.detail === 0) props.onRotate(1);
        }}
        onKeyDown={(event) => {
          if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault();
            event.stopPropagation();
            props.onRotate(event.key === 'ArrowLeft' ? -1 : 1);
          }
        }}
      >
        <svg
          width='20'
          height='20'
          viewBox='0 0 24 24'
          fill='none'
          aria-hidden='true'
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
      <Button
        data-editor-resize
        data-editor-overlay='resize'
        className={styles.handle}
        hidden={!item || props.failed}
        style={position(-1, 1)}
        aria-label='크기 조절 손잡이'
        aria-describedby='editor-handle-help editor-placement'
        title='드래그해 크기 조절 · 누르면 크게'
        onClick={(event) => {
          if (event.detail === 0) props.onResize(1);
        }}
        onKeyDown={(event) => {
          if (
            ['ArrowLeft', 'ArrowDown', 'ArrowRight', 'ArrowUp'].includes(
              event.key
            )
          ) {
            event.preventDefault();
            event.stopPropagation();
            props.onResize(
              event.key === 'ArrowLeft' || event.key === 'ArrowDown' ? -1 : 1
            );
          }
        }}
      >
        <svg
          width='20'
          height='20'
          viewBox='0 0 24 24'
          fill='none'
          aria-hidden='true'
        >
          <path
            d='M5 19 19 5M5 13v6h6m2-14h6v6'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </Button>
      <Button
        data-editor-delete
        data-editor-overlay='delete'
        className={styles.handle}
        hidden={!item || props.failed}
        style={position(-1, -1)}
        aria-label='선택한 캐릭터 삭제'
        title='선택한 캐릭터 삭제'
        onClick={props.onDelete}
      >
        <svg
          width='20'
          height='20'
          viewBox='0 0 24 24'
          fill='none'
          aria-hidden='true'
        >
          <path
            d='M5 7h14M9 7V4h6v3M7 7l1 13h8l1-13m-7 4v5m4-5v5'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </Button>
    </>
  );
}
