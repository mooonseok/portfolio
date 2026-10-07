import { useEffect, useMemo, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { EDITOR_KEYS } from '@/constants/emosave-editor';
import type { EditorItemId } from '@/dto/emosave-editor.dto';
import { createEditorDomStage } from '@/lib/emosave-editor/create-dom-stage';
import {
  createEditorSession,
  initialEditorState,
} from '@/lib/emosave-editor/state';
import { useEditorBubbles } from './use-editor-bubbles';

export function useEmosaveEditor() {
  const hostRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<ReturnType<typeof createEditorDomStage> | null>(null);
  const mounted = useRef(false);
  const [snapshot, setSnapshot] = useState(initialEditorState);
  const [failed, setFailed] = useState(false);
  const [notice, setNotice] = useState('캐릭터를 선택해 자리를 바꿔 보세요.');
  const session = useMemo(
    () =>
      createEditorSession((value, message) => {
        stageRef.current?.paint(value);
        if (message && mounted.current) {
          setSnapshot(value);
          setNotice(message);
        }
      }),
    []
  );
  const bubbles = useEditorBubbles(hostRef, snapshot, failed);
  const selected = snapshot.items.find(
    (item) => item.id === snapshot.selectedId
  );

  useEffect(() => {
    const host = hostRef.current;
    if (!host || failed) return;
    mounted.current = true;
    const stage = createEditorDomStage(host, session);
    stageRef.current = stage;
    const dismiss = (event: MouseEvent) => {
      if (
        event.target instanceof Element &&
        !event.target.closest('[data-editor-interactive]')
      ) {
        stage.cancel();
        session.select(null);
      }
    };
    document.addEventListener('click', dismiss);
    return () => {
      mounted.current = false;
      stage.dispose();
      document.removeEventListener('click', dismiss);
      if (stageRef.current === stage) stageRef.current = null;
    };
  }, [session, failed]);

  const onMove = (x: number, y: number) => {
    if (failed) return;
    stageRef.current?.cancel();
    session.move(x, y);
  };
  const onSelect = (id: EditorItemId | null) => {
    if (failed) return;
    stageRef.current?.cancel();
    session.select(id);
  };
  const onDelete = () => {
    if (failed || !session.get().selectedId) return;
    stageRef.current?.cancel();
    session.remove();
    hostRef.current
      ?.closest('main')
      ?.querySelector<HTMLButtonElement>('[data-editor-reset]')
      ?.focus({ preventScroll: true });
  };
  return {
    hostRef,
    snapshot,
    failed,
    notice,
    placementDescription: selected
      ? `돔의 왼쪽에서 ${Math.round(selected.x * 100)}%, 위쪽에서 ${Math.round(selected.y * 100)}%, 회전 ${Math.round(selected.angle)}도, 크기 ${Math.round(selected.scale * 100)}%.`
      : '',
    ...bubbles,
    onSelect,
    onDelete,
    onResize: (direction: number) => {
      if (failed) return;
      stageRef.current?.cancel();
      session.resize(direction);
    },
    onAssetError: () => {
      stageRef.current?.cancel();
      setFailed(true);
    },
    onRotate: (direction: number) => {
      if (failed) return;
      stageRef.current?.cancel();
      session.rotate(direction);
    },
    onReset: () => {
      if (failed) return;
      stageRef.current?.cancel();
      session.reset();
    },
    onKeyDown: (event: KeyboardEvent) => {
      if (failed || event.defaultPrevented) return;
      if (event.key === 'Delete' && session.get().selectedId) {
        event.preventDefault();
        onDelete();
        return;
      }
      if (event.key === 'Escape') {
        const id = session.get().selectedId;
        event.preventDefault();
        event.stopPropagation();
        stageRef.current?.cancel();
        session.select(null);
        if (id)
          hostRef.current
            ?.closest('main')
            ?.querySelector<HTMLButtonElement>(`[data-editor-choice="${id}"]`)
            ?.focus({ preventScroll: true });
        return;
      }
      const move = EDITOR_KEYS[event.key];
      if (
        move &&
        session.get().selectedId &&
        !event.altKey &&
        !event.metaKey &&
        !event.ctrlKey
      ) {
        event.preventDefault();
        onMove(...move);
      }
    },
  };
}
