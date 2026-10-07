import { EDITOR } from '@/constants/emosave-editor';
import type { EditorItem, EditorPoint } from '@/dto/emosave-editor.dto';

export function isInsideDome(point: EditorPoint): boolean {
  if (
    !Number.isFinite(point.x) ||
    !Number.isFinite(point.y) ||
    point.x < EDITOR.DOME_LEFT ||
    point.x > EDITOR.DOME_RIGHT ||
    point.y > EDITOR.DOME_BOTTOM
  )
    return false;
  if (point.y >= EDITOR.ARCH_Y) return true;
  const x = (point.x - EDITOR.ARCH_X) / EDITOR.ARCH_RADIUS_X;
  const y = (point.y - EDITOR.ARCH_Y) / EDITOR.ARCH_RADIUS_Y;
  return x * x + y * y <= 1;
}

export function isEditorItemInside(item: EditorItem): boolean {
  if (
    !Number.isFinite(item.angle) ||
    !Number.isFinite(item.scale) ||
    item.scale < EDITOR.MIN_SCALE ||
    item.scale > EDITOR.MAX_SCALE
  )
    return false;
  const radians = (item.angle * Math.PI) / 180;
  const cos = Math.cos(radians);
  const sin = Math.sin(radians);
  return [-1, 1].every((horizontal) =>
    [-1, 1].every((vertical) => {
      const x = (horizontal * EDITOR.ITEM_WIDTH * item.scale) / 2;
      const y = (vertical * EDITOR.ITEM_HEIGHT * item.scale) / 2;
      return isInsideDome({
        x: item.x + x * cos - y * sin,
        y: item.y + x * sin + y * cos,
      });
    })
  );
}

export function boundEditorPoint(
  point: EditorPoint,
  item: EditorItem
): EditorPoint {
  if (!Number.isFinite(point.x) || !Number.isFinite(point.y))
    return { x: item.x, y: item.y };
  const target = {
    x: Math.max(0, Math.min(1, point.x)),
    y: Math.max(0, Math.min(1, point.y)),
  };
  if (isEditorItemInside({ ...item, ...target })) return target;
  let low = 0;
  let high = 1;
  const at = (ratio: number) => ({
    x: item.x + (target.x - item.x) * ratio,
    y: item.y + (target.y - item.y) * ratio,
  });
  for (let iteration = 0; iteration < 40; iteration++) {
    const middle = (low + high) / 2;
    if (isEditorItemInside({ ...item, ...at(middle) })) low = middle;
    else high = middle;
  }
  return at(low);
}
