import type { EditorHit, EditorSession } from '@/dto/emosave-editor.dto';
import { createEditorPointer } from './pointer-controller';

export function bindEditorInput(
  canvas: HTMLCanvasElement,
  session: EditorSession,
  hit: (event: PointerEvent) => EditorHit | null
) {
  const pointer = createEditorPointer(session);
  let captured: number | null = null;
  const release = () => {
    const id = captured;
    captured = null;
    if (id !== null && canvas.hasPointerCapture(id))
      canvas.releasePointerCapture(id);
  };
  const cancel = () => {
    pointer.cancel();
    release();
  };
  const down = (event: PointerEvent) => {
    if (pointer.down(event, hit(event))) {
      captured = event.pointerId;
      canvas.setPointerCapture(event.pointerId);
    } else if (!event.isPrimary) cancel();
  };
  const move = (event: PointerEvent) => {
    const target = hit(event);
    canvas.style.cursor = target?.item
      ? 'grab'
      : session.get().selected && target?.inside
        ? 'crosshair'
        : 'default';
    pointer.move(event, target);
  };
  const up = (event: PointerEvent) => {
    pointer.move(event, hit(event));
    pointer.up(event, hit(event));
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
  canvas.addEventListener('pointerdown', down);
  canvas.addEventListener('pointermove', move);
  canvas.addEventListener('pointerup', up);
  canvas.addEventListener('pointercancel', lost);
  canvas.addEventListener('lostpointercapture', lost);
  window.addEventListener('blur', cancel);
  window.addEventListener('keydown', key);
  window.addEventListener('scroll', cancel, true);
  document.addEventListener('visibilitychange', visibility);
  return {
    cancel,
    dispose() {
      cancel();
      canvas.removeEventListener('pointerdown', down);
      canvas.removeEventListener('pointermove', move);
      canvas.removeEventListener('pointerup', up);
      canvas.removeEventListener('pointercancel', lost);
      canvas.removeEventListener('lostpointercapture', lost);
      window.removeEventListener('blur', cancel);
      window.removeEventListener('keydown', key);
      window.removeEventListener('scroll', cancel, true);
      document.removeEventListener('visibilitychange', visibility);
    },
  };
}
