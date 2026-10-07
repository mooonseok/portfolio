import { EDITOR } from '@/constants/emosave-editor';
import type {
  EditorHit,
  EditorPointer,
  EditorSession,
  EditorState,
} from '@/dto/emosave-editor.dto';

export function createEditorPointer(session: EditorSession) {
  let active: {
    event: EditorPointer;
    hit: EditorHit;
    saved: EditorState;
    moved: boolean;
    dragging: boolean;
  } | null = null;
  const cancel = () => {
    const previous = active;
    active = null;
    if (previous?.dragging) session.restore(previous.saved);
  };
  return {
    cancel,
    down(event: EditorPointer, hit: EditorHit | null) {
      if (active) {
        if (event.pointerId !== active.event.pointerId) cancel();
        return false;
      }
      if (
        !event.isPrimary ||
        event.button !== 0 ||
        !hit ||
        (!hit.item && !hit.inside)
      )
        return false;
      active = {
        event,
        hit,
        saved: session.get(),
        moved: false,
        dragging: false,
      };
      return true;
    },
    move(event: EditorPointer, hit: EditorHit | null) {
      if (!active || active.event.pointerId !== event.pointerId) return;
      active.moved ||=
        Math.hypot(
          event.clientX - active.event.clientX,
          event.clientY - active.event.clientY
        ) > EDITOR.DRAG_THRESHOLD;
      if (
        !active.moved ||
        active.event.pointerType !== 'mouse' ||
        !active.hit.item ||
        !hit
      )
        return;
      if (!active.dragging) {
        active.dragging = true;
        session.select(true);
      }
      session.place(
        {
          x: active.saved.x + hit.point.x - active.hit.point.x,
          z: active.saved.z + hit.point.z - active.hit.point.z,
        },
        true
      );
    },
    up(event: EditorPointer, hit: EditorHit | null) {
      if (!active || active.event.pointerId !== event.pointerId) return;
      const previous = active;
      active = null;
      if (previous.dragging) {
        if (hit?.inside) session.finish();
        else session.restore(previous.saved);
      } else if (!previous.moved && hit) {
        if (previous.hit.item && hit.item) session.select(true);
        else if (!previous.hit.item && hit.inside) session.place(hit.point);
      }
    },
  };
}
