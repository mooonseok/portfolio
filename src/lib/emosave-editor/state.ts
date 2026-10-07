import {
  EDITOR,
  EDITOR_CHARACTERS,
  EDITOR_GESTURE,
  EDITOR_INITIAL_ITEMS,
} from '@/constants/emosave-editor';
import type {
  EditorPoint,
  EditorSession,
  EditorState,
} from '@/dto/emosave-editor.dto';
import { boundEditorPoint, isEditorItemInside } from './bounds';

export const initialEditorState = (): EditorState => ({
  items: EDITOR_INITIAL_ITEMS.map((item) => ({ ...item })),
  selectedId: null,
});

const clone = (value: EditorState): EditorState => ({
  items: value.items.map((item) => ({ ...item })),
  selectedId: value.selectedId,
});

export function createEditorSession(
  changed: (value: EditorState, message?: string) => void
): EditorSession {
  let value = initialEditorState();
  const notify = (message?: string) => changed(clone(value), message);
  const selected = () =>
    value.items.find((item) => item.id === value.selectedId);
  const name = () =>
    EDITOR_CHARACTERS.find((item) => item.id === value.selectedId)?.name;
  const place = (point: EditorPoint, transient = false) => {
    const item = selected();
    if (!item || !Number.isFinite(point.x) || !Number.isFinite(point.y)) return;
    const next = boundEditorPoint(point, item);
    const moved = Math.hypot(next.x - item.x, next.y - item.y) > 1e-10;
    value.items = value.items.map((entry) =>
      entry.id === item.id ? { ...item, ...next } : entry
    );
    notify(
      transient
        ? undefined
        : moved
          ? `${name()} 위치를 옮겼습니다.`
          : '돔의 가장자리입니다.'
    );
  };
  const rotateTo = (degrees: number, transient = false) => {
    const item = selected();
    if (!item || !Number.isFinite(degrees)) return;
    const angle = ((degrees % 360) + 360) % 360;
    if (!isEditorItemInside({ ...item, angle })) {
      if (!transient)
        notify('가장자리라 회전할 수 없습니다. 안쪽으로 옮겨 주세요.');
      return;
    }
    value.items = value.items.map((entry) =>
      entry.id === item.id ? { ...item, angle } : entry
    );
    notify(transient ? undefined : `${name()} 기울기를 바꿨습니다.`);
  };
  const resizeTo = (size: number, transient = false) => {
    const item = selected();
    if (!item || !Number.isFinite(size)) return;
    let scale = Math.max(EDITOR.MIN_SCALE, Math.min(EDITOR.MAX_SCALE, size));
    if (!isEditorItemInside({ ...item, scale })) {
      let low = item.scale;
      let high = scale;
      for (let iteration = 0; iteration < 40; iteration++) {
        const middle = (low + high) / 2;
        if (isEditorItemInside({ ...item, scale: middle })) low = middle;
        else high = middle;
      }
      scale = low;
    }
    value.items = value.items.map((entry) =>
      entry.id === item.id ? { ...item, scale } : entry
    );
    notify(
      transient
        ? undefined
        : Math.abs(scale - item.scale) > 1e-10
          ? `${name()} 크기를 바꿨습니다.`
          : '돔의 경계 또는 크기 제한에 도달했습니다.'
    );
  };
  return {
    get: () => clone(value),
    select: (id) => {
      if (id !== null && !value.items.some((item) => item.id === id)) return;
      if (value.selectedId === id) return;
      value.selectedId = id;
      notify(
        id
          ? `${name()} 선택. 끌어서 이동하거나 회전할 수 있습니다.`
          : '선택을 해제했습니다.'
      );
    },
    place,
    move: (x, y) => {
      const item = selected();
      if (item)
        place({ x: item.x + x * EDITOR.STEP, y: item.y + y * EDITOR.STEP });
    },
    rotateTo,
    resizeTo,
    resize: (direction) => {
      const item = selected();
      if (item && (direction === 1 || direction === -1))
        resizeTo(
          Math.round((item.scale + direction * EDITOR.SCALE_STEP) * 1000) / 1000
        );
    },
    rotate: (direction) => {
      const item = selected();
      if (item && (direction === 1 || direction === -1))
        rotateTo(item.angle + direction * EDITOR.ROTATION_STEP);
    },
    remove: () => {
      const item = selected();
      if (!item) return;
      const label = name();
      value.items = value.items.filter((entry) => entry.id !== item.id);
      value.selectedId = null;
      notify(`${label} 삭제했습니다. 처음 배치로 복원할 수 있습니다.`);
    },
    reset: () => {
      value = initialEditorState();
      notify('처음 배치로 돌아왔습니다. 선택을 해제했습니다.');
    },
    restore: (saved) => {
      if (
        new Set(saved.items.map((item) => item.id)).size !==
          saved.items.length ||
        !saved.items.every(
          (item) =>
            value.items.some((entry) => entry.id === item.id) &&
            item.angle >= 0 &&
            item.angle < 360 &&
            isEditorItemInside(item)
        ) ||
        (saved.selectedId !== null &&
          !saved.items.some((item) => item.id === saved.selectedId))
      )
        return;
      value = clone(saved);
      notify('편집을 취소했습니다.');
    },
    finish: (kind = EDITOR_GESTURE.MOVE) => {
      if (selected())
        notify(
          kind === EDITOR_GESTURE.ROTATE
            ? `${name()} 기울기를 바꿨습니다.`
            : kind === EDITOR_GESTURE.RESIZE
              ? `${name()} 크기를 바꿨습니다.`
              : `${name()} 위치를 옮겼습니다.`
        );
    },
  };
}
