import type {
  EditorHit,
  EditorInput,
  EditorSession,
} from '@/dto/emosave-editor.dto';
import { createEditorPointer } from './pointer-controller';

export function bindEditorInput(
  element: HTMLElement,
  session: EditorSession,
  hit: (event: PointerEvent) => EditorHit | null
): EditorInput {
  const pointer = createEditorPointer(session);
  let captured: number | null = null;
  let disposed = false;
  const release = () => {
    const id = captured;
    captured = null;
    if (id !== null && element.hasPointerCapture(id))
      element.releasePointerCapture(id);
  };
  const cancel = () => {
    pointer.cancel();
    release();
  };
  const down = (event: PointerEvent) => {
    const target = event.target as Element | null;
    if (target?.closest?.('[data-editor-delete]')) {
      cancel();
      return;
    }
    if (captured !== null && captured !== event.pointerId) {
      cancel();
      return;
    }
    if (pointer.down(event, hit(event))) {
      captured = event.pointerId;
      try {
        element.setPointerCapture(event.pointerId);
      } catch {
        cancel();
      }
    } else if (!event.isPrimary) cancel();
  };
  const move = (event: PointerEvent) => {
    const target = hit(event);
    element.style.cursor = target?.item ? 'grab' : 'default';
    pointer.move(event, target);
  };
  const up = (event: PointerEvent) => {
    const target = hit(event);
    pointer.move(event, target);
    pointer.up(event, target);
    if (captured === event.pointerId) release();
  };
  const lost = (event: PointerEvent) => {
    if (captured === event.pointerId) cancel();
  };
  const visibility = () => {
    if (document.hidden) cancel();
  };
  const key = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && captured !== null) {
      event.preventDefault();
      cancel();
    }
  };
  element.addEventListener('pointerdown', down);
  element.addEventListener('pointermove', move);
  element.addEventListener('pointerup', up);
  element.addEventListener('pointercancel', lost);
  element.addEventListener('lostpointercapture', lost);
  window.addEventListener('blur', cancel);
  window.addEventListener('keydown', key);
  window.addEventListener('scroll', cancel, true);
  document.addEventListener('visibilitychange', visibility);
  return {
    cancel,
    dispose() {
      if (disposed) return;
      disposed = true;
      cancel();
      element.style.cursor = '';
      element.removeEventListener('pointerdown', down);
      element.removeEventListener('pointermove', move);
      element.removeEventListener('pointerup', up);
      element.removeEventListener('pointercancel', lost);
      element.removeEventListener('lostpointercapture', lost);
      window.removeEventListener('blur', cancel);
      window.removeEventListener('keydown', key);
      window.removeEventListener('scroll', cancel, true);
      document.removeEventListener('visibilitychange', visibility);
    },
  };
}
