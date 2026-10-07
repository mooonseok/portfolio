import { EDITOR, EDITOR_GESTURE } from '@/constants/emosave-editor';
import type {
  EditorItem,
  EditorPoint,
  EditorSession,
  EditorState,
} from '@/dto/emosave-editor.dto';
import { bindEditorInput } from './bind-input';
import { isInsideDome } from './bounds';

function contains(item: EditorItem, point: EditorPoint) {
  const angle = (-item.angle * Math.PI) / 180;
  const x = point.x - item.x;
  const y = point.y - item.y;
  return (
    Math.abs(x * Math.cos(angle) - y * Math.sin(angle)) <=
      (EDITOR.ITEM_WIDTH * item.scale) / 2 &&
    Math.abs(x * Math.sin(angle) + y * Math.cos(angle)) <=
      (EDITOR.ITEM_HEIGHT * item.scale) / 2
  );
}

export function createEditorDomStage(
  host: HTMLElement,
  session: EditorSession
) {
  const paint = (value: EditorState) => {
    for (const node of host.querySelectorAll<HTMLElement>(
      '[data-editor-item]'
    )) {
      const index = value.items.findIndex(
        (item) => item.id === node.dataset.editorItem
      );
      const item = value.items[index];
      node.hidden = !item;
      if (!item) continue;
      const selected = value.selectedId === item.id;
      node.style.left = `${item.x * 100}%`;
      node.style.top = `${item.y * 100}%`;
      node.style.transform = `translate(-50%, -50%) rotate(${item.angle}deg) scale(${item.scale})`;
      node.style.zIndex = String(selected ? 10 : index + 1);
      node.setAttribute('aria-pressed', String(selected));
    }
    const selected = value.items.find((item) => item.id === value.selectedId);
    for (const node of host.querySelectorAll<HTMLElement>(
      '[data-editor-overlay]'
    )) {
      node.hidden = !selected;
      if (!selected) continue;
      const radians = (selected.angle * Math.PI) / 180;
      const offset =
        0.1 *
          selected.scale *
          (Math.abs(Math.cos(radians)) + Math.abs(Math.sin(radians))) +
        0.065;
      const x =
        node.dataset.editorOverlay === EDITOR_GESTURE.ROTATE ? offset : -offset;
      const y =
        node.dataset.editorOverlay === EDITOR_GESTURE.RESIZE ? offset : -offset;
      node.style.left = `${Math.max(0.07, Math.min(0.93, selected.x + x)) * 100}%`;
      node.style.top = `${Math.max(0.07, Math.min(0.93, selected.y + y)) * 100}%`;
    }
  };
  const input = bindEditorInput(host, session, (event) => {
    const rect = host.getBoundingClientRect();
    if (!rect.width || !rect.height) return null;
    const point = {
      x: (event.clientX - rect.left) / rect.width,
      y: (event.clientY - rect.top) / rect.height,
    };
    const value = session.get();
    const ordered = [...value.items].reverse();
    const selected = value.items.find((item) => item.id === value.selectedId);
    if (selected) ordered.unshift(selected);
    const target = event.target as Element | null;
    const rotating = Boolean(target?.closest?.('[data-editor-rotate]'));
    const resizing = Boolean(target?.closest?.('[data-editor-resize]'));
    return {
      point,
      item:
        rotating || resizing
          ? (selected?.id ?? null)
          : (ordered.find((item) => contains(item, point))?.id ?? null),
      mode: rotating
        ? EDITOR_GESTURE.ROTATE
        : resizing
          ? EDITOR_GESTURE.RESIZE
          : EDITOR_GESTURE.MOVE,
      inside: isInsideDome(point),
      withinStage: point.x >= 0 && point.x <= 1 && point.y >= 0 && point.y <= 1,
    };
  });
  paint(session.get());
  return { ...input, paint };
}
