import { EDITOR, EDITOR_FRONT } from '@/constants/emosave-editor';
import type {
  EditorPoint,
  EditorSession,
  EditorState,
} from '@/dto/emosave-editor.dto';

export const initialEditorState = (): EditorState => ({
  x: 0,
  z: 0,
  turn: 0,
  selected: false,
});

export function boundEditorPoint(point: EditorPoint): EditorPoint {
  const clamp = (value: number) =>
    Math.max(-EDITOR.LIMIT, Math.min(EDITOR.LIMIT, value));
  return { x: clamp(point.x), z: clamp(point.z) };
}

export function createEditorSession(
  changed: (value: EditorState, message?: string) => void
): EditorSession {
  let value = initialEditorState();
  const notify = (message?: string) => changed({ ...value }, message);
  const place = (point: EditorPoint, transient = false) => {
    if (
      !value.selected ||
      !Number.isFinite(point.x) ||
      !Number.isFinite(point.z)
    )
      return;
    const next = boundEditorPoint(point);
    const moved = next.x !== value.x || next.z !== value.z;
    value = { ...value, ...next };
    notify(
      transient
        ? undefined
        : moved
          ? '집을 이동했습니다.'
          : '배치 영역의 가장자리입니다.'
    );
  };
  return {
    get: () => ({ ...value }),
    select: (selected) => {
      value = { ...value, selected };
      notify(
        selected
          ? '집을 선택했습니다. 방향 버튼으로 이동할 수 있습니다.'
          : '선택을 해제했습니다.'
      );
    },
    place,
    move: (x, z) =>
      place({ x: value.x + x * EDITOR.STEP, z: value.z + z * EDITOR.STEP }),
    rotate: () => {
      if (!value.selected) return;
      value = { ...value, turn: (value.turn + 1) % 4 };
      notify(`집을 회전했습니다. 문이 ${EDITOR_FRONT[value.turn]}를 향합니다.`);
    },
    reset: () => {
      value = initialEditorState();
      notify('처음 배치로 돌아왔습니다. 선택을 해제했습니다.');
    },
    restore: (saved) => {
      value = { ...saved };
      notify('이동을 취소했습니다.');
    },
    finish: () => notify('집을 이동했습니다.'),
  };
}
