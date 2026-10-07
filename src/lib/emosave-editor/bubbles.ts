import { EDITOR, EDITOR_CHARACTERS } from '@/constants/emosave-editor';
import type {
  EditorBubbleOptions,
  EditorBubbleState,
  EditorBubbles,
  EditorItemId,
} from '@/dto/emosave-editor.dto';

export function createEditorBubbles(
  changed: (value: EditorBubbleState) => void,
  options: EditorBubbleOptions = {}
): EditorBubbles {
  const clock = options.clock ?? {
    schedule: (callback: () => void, delay: number) =>
      window.setTimeout(callback, delay),
    clear: (id: number) => window.clearTimeout(id),
  };
  let paused = options.reducedMotion ?? false;
  let visible = options.visible ?? true;
  let editing = options.editing ?? false;
  let index = (visible && !editing) || paused ? 0 : -1;
  let showing = index >= 0;
  let timer: number | null = null;
  let generation = 0;
  let disposed = false;
  let ids: readonly EditorItemId[] = EDITOR_CHARACTERS.map((item) => item.id);
  const get = (): EditorBubbleState => ({
    itemId:
      !disposed && visible && !editing && showing ? (ids[index] ?? null) : null,
    paused,
  });
  const notify = () => changed(get());
  const clear = () => {
    generation++;
    if (timer !== null) clock.clear(timer);
    timer = null;
  };
  const schedule = () => {
    clear();
    if (disposed || paused || !visible || editing || !ids.length) return;
    const current = generation;
    timer = clock.schedule(
      () => {
        if (disposed || current !== generation) return;
        timer = null;
        if (!showing) index = (index + 1) % ids.length;
        showing = !showing;
        notify();
        schedule();
      },
      showing ? EDITOR.BUBBLE_DURATION : EDITOR.BUBBLE_GAP
    );
  };
  const syncVisibility = () => {
    if (!paused) showing = false;
    notify();
    schedule();
  };
  notify();
  schedule();
  return {
    get,
    setItems(value) {
      if (disposed || value.join(',') === ids.join(',')) return;
      const current = ids[index];
      ids = [...value];
      index = current ? ids.indexOf(current) : -1;
      if (index < 0) showing = false;
      notify();
      schedule();
    },
    setEditing(value) {
      if (disposed || editing === value) return;
      editing = value;
      syncVisibility();
    },
    setVisible(value) {
      if (disposed || visible === value) return;
      visible = value;
      syncVisibility();
    },
    setPaused(value) {
      if (disposed || paused === value) return;
      paused = value;
      notify();
      schedule();
    },
    dispose() {
      if (disposed) return;
      disposed = true;
      clear();
    },
  };
}
