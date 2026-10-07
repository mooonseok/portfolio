import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { KeyboardEvent, MouseEvent } from 'react';
import type { ProjectSlug } from '@/constants/project';
import { DIORAMA } from '@/constants/diorama';

export function useDioramaStage() {
  const hostRef = useRef<HTMLDivElement>(null);
  const labelRefs = useRef<
    Partial<Record<ProjectSlug, HTMLButtonElement | null>>
  >({});
  const anchor = useRef<{ element: HTMLElement; top: number } | null>(null);
  const restoreFocus = useRef(false);
  const lastSelected = useRef<ProjectSlug | null>(null);
  const stageRef = useRef<ReturnType<
    typeof import('@/lib/diorama/create-stage').createStage
  > | null>(null);
  const userPreference = useRef<boolean | null>(null);
  const selectedRef = useRef<ProjectSlug | null>(null);
  const reducedRef = useRef(true);
  const [selected, setSelected] = useState<ProjectSlug | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [wide, setWide] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [reduced, setReduced] = useState(true);

  useEffect(() => {
    const media = window.matchMedia(DIORAMA.REDUCED);
    const desktop = window.matchMedia(DIORAMA.DESKTOP);
    const updateViewport = () => {
      restoreFocus.current = !!document.activeElement?.closest(
        `#${DIORAMA.PANEL_ID}`
      );
      setWide(desktop.matches);
      if (userPreference.current === null) setEnabled(desktop.matches);
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
    if (!enabled || !host) return;
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
  }, [enabled]);

  useLayoutEffect(() => {
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
    enabled,
    wide,
    ready: enabled && ready && !failed,
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
    onToggle: () => {
      setReady(false);
      setFailed(false);
      userPreference.current = !enabled;
      setEnabled(userPreference.current);
    },
    onKeyDown: (event: KeyboardEvent) => {
      if (event.key === DIORAMA.ESCAPE && selectedRef.current) {
        event.preventDefault();
        onClose();
      }
    },
  };
}
