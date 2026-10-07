import { useEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';
import { MEDIA } from '@/constants/breakpoint';
import type {
  EditorBubbles,
  EditorBubbleState,
  EditorState,
} from '@/dto/emosave-editor.dto';
import { createEditorBubbles } from '@/lib/emosave-editor/bubbles';

export function useEditorBubbles(
  hostRef: RefObject<HTMLDivElement | null>,
  editor: EditorState,
  failed: boolean
) {
  const player = useRef<EditorBubbles | null>(null);
  const [snapshot, setSnapshot] = useState<EditorBubbleState>({
    itemId: null,
    paused: true,
  });
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const media = window.matchMedia(MEDIA.REDUCED_MOTION);
    const rect = host.getBoundingClientRect();
    let inView = rect.bottom > 0 && rect.top < window.innerHeight;
    const bubbles = createEditorBubbles(setSnapshot, {
      reducedMotion: media.matches,
      visible: inView && !document.hidden,
    });
    player.current = bubbles;
    const visibility = () => bubbles.setVisible(inView && !document.hidden);
    const motion = () => {
      if (media.matches) bubbles.setPaused(true);
    };
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      visibility();
    });
    observer.observe(host);
    document.addEventListener('visibilitychange', visibility);
    media.addEventListener('change', motion);
    return () => {
      bubbles.dispose();
      player.current = null;
      observer.disconnect();
      document.removeEventListener('visibilitychange', visibility);
      media.removeEventListener('change', motion);
    };
  }, [hostRef]);
  useEffect(() => {
    player.current?.setItems(editor.items.map((item) => item.id));
    player.current?.setEditing(Boolean(editor.selectedId) || failed);
  }, [editor, failed]);
  return {
    bubbleId: snapshot.itemId,
    paused: snapshot.paused,
    onToggleBubbles: () => {
      const bubbles = player.current;
      if (bubbles) bubbles.setPaused(!bubbles.get().paused);
    },
  };
}
