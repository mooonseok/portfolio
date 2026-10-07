import { useEffect, useMemo, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { EDITOR_FRONT, EDITOR_KEYS } from '@/constants/emosave-editor';
import type { EditorStage } from '@/dto/emosave-editor.dto';
import {
  createEditorSession,
  initialEditorState,
} from '@/lib/emosave-editor/state';

export function useEmosaveEditor() {
  const hostRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<EditorStage | null>(null);
  const mounted = useRef(false);
  const [snapshot, setSnapshot] = useState(initialEditorState);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [notice, setNotice] = useState('집을 선택해 편집을 시작하세요.');
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

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    mounted.current = true;
    let cancelled = false;
    let stage: EditorStage | null = null;
    const fail = () => {
      if (cancelled) return;
      stageRef.current = null;
      setFailed(true);
      setReady(false);
    };
    void import('@/lib/emosave-editor/create-stage')
      .then(({ createEditorStage }) => {
        if (cancelled) return;
        stage = createEditorStage(host, session, fail);
        stageRef.current = stage;
        stage.paint(session.get());
        setReady(true);
      })
      .catch(fail);
    return () => {
      cancelled = true;
      mounted.current = false;
      stage?.dispose();
      if (stageRef.current === stage) stageRef.current = null;
    };
  }, [session]);

  const onMove = (x: number, z: number) => {
    stageRef.current?.cancel();
    session.move(x, z);
  };
  return {
    hostRef,
    ready,
    failed,
    notice,
    front: EDITOR_FRONT[snapshot.turn],
    selected: snapshot.selected,
    onMove,
    onSelect: () => {
      stageRef.current?.cancel();
      session.select(!session.get().selected);
    },
    onRotate: () => {
      stageRef.current?.cancel();
      session.rotate();
    },
    onReset: () => {
      stageRef.current?.cancel();
      session.reset();
    },
    onKeyDown: (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        stageRef.current?.cancel();
        session.select(false);
        event.currentTarget
          .querySelector<HTMLButtonElement>('button[aria-pressed]')
          ?.focus({ preventScroll: true });
      }
      const move = EDITOR_KEYS[event.key];
      if (
        move &&
        session.get().selected &&
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
