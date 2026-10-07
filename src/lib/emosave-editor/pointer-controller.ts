import { EDITOR, EDITOR_GESTURE } from '@/constants/emosave-editor';
import type {
  EditorHit,
  EditorPoint,
  EditorPointer,
  EditorSession,
  EditorState,
} from '@/dto/emosave-editor.dto';

const bearing = (point: EditorPoint, center: EditorPoint) =>
  (Math.atan2(point.y - center.y, point.x - center.x) * 180) / Math.PI;
const withinStage = (hit: EditorHit) => hit.withinStage ?? hit.inside;

export function createEditorPointer(session: EditorSession) {
  let active: {
    event: EditorPointer;
    hit: EditorHit;
    saved: EditorState;
    moved: boolean;
    dragging: boolean;
    bearing: number;
    angle: number;
    distance: number;
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
        !withinStage(hit) ||
        !Number.isFinite(hit.point.x) ||
        !Number.isFinite(hit.point.y)
      )
        return false;
      const saved = session.get();
      const item = saved.items.find((entry) => entry.id === hit.item);
      if (hit.item && !item) return false;
      if (
        (hit.mode === EDITOR_GESTURE.ROTATE ||
          hit.mode === EDITOR_GESTURE.RESIZE) &&
        (!item || saved.selectedId !== item.id)
      )
        return false;
      active = {
        event: {
          pointerId: event.pointerId,
          pointerType: event.pointerType,
          button: event.button,
          clientX: event.clientX,
          clientY: event.clientY,
          isPrimary: event.isPrimary,
        },
        hit: { ...hit, point: { ...hit.point } },
        saved,
        moved: false,
        dragging: false,
        bearing: item ? bearing(hit.point, item) : 0,
        angle: item?.angle ?? 0,
        distance: item
          ? Math.hypot(hit.point.x - item.x, hit.point.y - item.y)
          : 0,
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
        !active.hit.item ||
        !hit ||
        !Number.isFinite(hit.point.x) ||
        !Number.isFinite(hit.point.y)
      )
        return;
      const item = active.saved.items.find(
        (entry) => entry.id === active?.hit.item
      );
      if (!item) return;
      const rotating = active.hit.mode === EDITOR_GESTURE.ROTATE;
      const resizing = active.hit.mode === EDITOR_GESTURE.RESIZE;
      if (
        !rotating &&
        !resizing &&
        active.event.pointerType !== 'mouse' &&
        active.saved.selectedId !== item.id
      )
        return;
      if (!active.dragging) {
        active.dragging = true;
        session.select(item.id);
      }
      if (resizing) {
        if (active.distance < 1e-4) return;
        session.resizeTo(
          (item.scale *
            Math.hypot(hit.point.x - item.x, hit.point.y - item.y)) /
            active.distance,
          true
        );
      } else if (rotating) {
        if (Math.hypot(hit.point.x - item.x, hit.point.y - item.y) < 1e-4)
          return;
        const next = bearing(hit.point, item);
        active.angle += ((next - active.bearing + 540) % 360) - 180;
        active.bearing = next;
        session.rotateTo(active.angle, true);
      } else {
        session.place(
          {
            x: item.x + hit.point.x - active.hit.point.x,
            y: item.y + hit.point.y - active.hit.point.y,
          },
          true
        );
      }
    },
    up(event: EditorPointer, hit: EditorHit | null) {
      if (!active || active.event.pointerId !== event.pointerId) return;
      const previous = active;
      active = null;
      const rotating = previous.hit.mode === EDITOR_GESTURE.ROTATE;
      const resizing = previous.hit.mode === EDITOR_GESTURE.RESIZE;
      if (previous.dragging) {
        if (hit && (rotating || resizing ? withinStage(hit) : hit.inside))
          session.finish(
            rotating
              ? EDITOR_GESTURE.ROTATE
              : resizing
                ? EDITOR_GESTURE.RESIZE
                : EDITOR_GESTURE.MOVE
          );
        else session.restore(previous.saved);
      } else if (!previous.moved && hit && withinStage(hit)) {
        if (rotating) session.rotate(1);
        else if (resizing) session.resize(1);
        else if (previous.hit.item && previous.hit.item === hit.item)
          session.select(hit.item);
        else if (!previous.hit.item && !hit.item) session.select(null);
      }
    },
  };
}
