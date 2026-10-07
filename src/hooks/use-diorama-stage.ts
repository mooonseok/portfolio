import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { KeyboardEvent, MouseEvent } from 'react';
import { PROJECT_SLUG, type ProjectSlug } from '@/constants/project';
import { readDioramaHistory, withDioramaHistory } from '@/lib/diorama-history';
import type { DioramaHistory } from '@/dto/diorama-history.dto';
import { DIORAMA } from '@/constants/diorama';

export function useDioramaStage() {
  const hostRef = useRef<HTMLDivElement>(null);
  const labelRefs = useRef<
    Partial<Record<ProjectSlug, HTMLButtonElement | null>>
  >({});
  const pendingHistory = useRef<DioramaHistory | null>(null);
  const anchor = useRef<{ element: HTMLElement; top: number } | null>(null);
  const restoreFocus = useRef(false);
  const lastSelected = useRef<ProjectSlug | null>(null);
  const stageRef = useRef<ReturnType<
    typeof import('@/lib/diorama/create-stage').createStage
  > | null>(null);
  const selectedRef = useRef<ProjectSlug | null>(null);
  const reducedRef = useRef(true);
  const [selected, setSelected] = useState<ProjectSlug | null>(null);
  const [wide, setWide] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [reduced, setReduced] = useState(true);

  useLayoutEffect(() => {
    const saved = readDioramaHistory(
      history.state,
      Object.values(PROJECT_SLUG)
    );
    if (saved) {
      pendingHistory.current = saved;
      selectedRef.current = saved.selected;
      lastSelected.current = saved.selected;
      setSelected(saved.selected);
      setWide(window.matchMedia(DIORAMA.DESKTOP).matches);
    }
    const save = () => {
      try {
        history.replaceState(
          withDioramaHistory(history.state, {
            selected: selectedRef.current,
            scrollY: window.scrollY,
          }),
          ''
        );
      } catch {}
    };
    window.addEventListener('pagehide', save);
    return () => window.removeEventListener('pagehide', save);
  }, []);

  useEffect(() => {
    const media = window.matchMedia(DIORAMA.REDUCED);
    const desktop = window.matchMedia(DIORAMA.DESKTOP);
    const updateViewport = () => {
      restoreFocus.current = !!document.activeElement?.closest(
        `#${DIORAMA.PANEL_ID}`
      );
      setWide(desktop.matches);
    };
    const update = () => {
      reducedRef.current = media.matches;
      setReduced(media.matches);
      stageRef.current?.setReducedMotion(media.matches);
    };
    update();
    updateViewport();
    media.addEventListener('change', update);
    desktop.addEventListener('change', updateViewport);
    return () => {
      media.removeEventListener('change', update);
      desktop.removeEventListener('change', updateViewport);
    };
  }, []);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let cancelled = false;
    let errored = false;
    let stage: typeof stageRef.current = null;
    const fail = () => {
      if (!cancelled) {
        errored = true;
        if (stageRef.current === stage) stageRef.current = null;
        setFailed(true);
        setReady(false);
      }
    };
    setFailed(false);
    setReady(false);
    void import('@/lib/diorama/create-stage')
      .then(({ createStage }) => {
        if (cancelled) return;
        stage = createStage(host, {
          onSelect: (slug) => {
            lastSelected.current = slug;
            selectedRef.current = selectedRef.current === slug ? null : slug;
            setSelected(selectedRef.current);
            stageRef.current?.setSelected(
              selectedRef.current,
              reducedRef.current
            );
          },
          onError: fail,
          reducedMotion: reducedRef.current,
        });
        if (cancelled || errored) {
          stage.dispose();
          return;
        }
        stageRef.current = stage;
        stage.setSelected(selectedRef.current, true);
        setReady(true);
      })
      .catch(fail);
    return () => {
      cancelled = true;
      stage?.dispose();
      if (stageRef.current === stage) stageRef.current = null;
    };
  }, []);

  useLayoutEffect(() => {
    const saved = pendingHistory.current;
    if (
      saved &&
      selected === saved.selected &&
      wide === window.matchMedia(DIORAMA.DESKTOP).matches
    ) {
      pendingHistory.current = null;
      window.scrollTo({ top: saved.scrollY, behavior: 'instant' });
    }
    const current = anchor.current;
    anchor.current = null;
    if (current?.element.isConnected) {
      const delta = current.element.getBoundingClientRect().top - current.top;
      if (Math.abs(delta) > 1)
        window.scrollBy({ top: delta, behavior: 'instant' });
    }
    if (restoreFocus.current) {
      restoreFocus.current = false;
      if (lastSelected.current)
        labelRefs.current[lastSelected.current]?.focus({ preventScroll: true });
    }
  }, [selected, wide]);

  function select(value: ProjectSlug | null, immediate: boolean) {
    if (value) lastSelected.current = value;
    selectedRef.current = value;
    setSelected(value);
    stageRef.current?.setSelected(value, immediate || reducedRef.current);
  }

  function onClose() {
    select(null, true);
    if (lastSelected.current)
      labelRefs.current[lastSelected.current]?.focus({ preventScroll: true });
  }

  return {
    hostRef,
    labelRefs,
    selected,
    wide,
    ready: ready && !failed,
    failed,
    reduced,
    onSelect: (slug: ProjectSlug, event: MouseEvent<HTMLButtonElement>) => {
      if (!wide)
        anchor.current = {
          element: event.currentTarget,
          top: event.currentTarget.getBoundingClientRect().top,
        };
      select(selectedRef.current === slug ? null : slug, event.detail === 0);
    },
    onClose,
    onKeyDown: (event: KeyboardEvent) => {
      if (event.key === DIORAMA.ESCAPE && selectedRef.current) {
        event.preventDefault();
        onClose();
      }
    },
  };
}
