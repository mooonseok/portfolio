import { useCallback, useEffect, useRef, useState } from 'react';
import type { PointerEvent } from 'react';
import { ORBIT } from '@/constants/orbit';
import type { OrbitBody } from '@/dto/orbit.dto';
import { readStageLoadEnv } from '@/lib/diorama-load';
import type { OrbitStage } from '@/lib/orbit/create-orbit-stage';
import { readMode } from '@/lib/orbit/read-mode';
import { createMemory, writeFrame } from '@/lib/orbit/write-frame';

const MODE = { PHONE: 'phone', LAND: 'land', WIDE: 'wide' } as const;

function readSafeBottom() {
  const probe = document.createElement('div');
  probe.style.cssText =
    'position:fixed;bottom:0;height:env(safe-area-inset-bottom,0px);visibility:hidden';
  document.body.append(probe);
  const value = probe.offsetHeight;
  probe.remove();
  return value;
}

export function useOrbitStage(bodies: OrbitBody[]) {
  const root = useRef<HTMLDivElement>(null);
  const host = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLElement>(null);
  const history = useRef<HTMLAnchorElement>(null);
  const ticks = useRef<SVGPathElement>(null);
  const reticle = useRef<SVGPathElement>(null);
  const labels = useRef<(HTMLDivElement | null)[]>([]);
  const names = useRef<(HTMLSpanElement | null)[]>([]);
  const stage = useRef<OrbitStage | null>(null);
  const activeRef = useRef(0);
  const lastMove = useRef(-1e9);
  const dragX = useRef<number | null>(null);
  const bodiesRef = useRef(bodies);
  const [active, setActiveState] = useState(0);
  const key = JSON.stringify(bodies);

  const setActive = useCallback((index: number) => {
    activeRef.current = index;
    setActiveState(index);
    stage.current?.setActive(index);
  }, []);

  useEffect(() => {
    const rootEl = root.current;
    const hostEl = host.current;
    if (!rootEl || !hostEl) return;
    const env = readStageLoadEnv(window, ORBIT.REDUCED);
    if (!env.webgl || env.saveData) return;
    let cancelled = false;
    let reduced = env.reducedMotion;
    let last = performance.now();
    const memory = bodiesRef.current.map(createMemory);
    const fit = () => {
      const current = stage.current;
      const panelEl = panel.current;
      if (!current || !panelEl) return;
      const rect = rootEl.getBoundingClientRect();
      const box = {
        width: rect.width,
        height: rect.height,
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight,
        panelLeft: 0,
        panelHeight: 0,
        safeBottom: readSafeBottom(),
      };
      const mode = readMode(box);
      rootEl.dataset.mode = mode.phone
        ? MODE.PHONE
        : mode.land
          ? MODE.LAND
          : MODE.WIDE;
      panelEl.style.top = '';
      box.panelLeft = panelEl.getBoundingClientRect().left - rect.left;
      box.panelHeight = panelEl.offsetHeight;
      const result = current.fit(box);
      if (result.panelTop !== null) panelEl.style.top = `${result.panelTop}px`;
      memory.forEach((item) => {
        item.width = 0;
        item.candidate = null;
      });
      current.redraw();
    };
    const media = window.matchMedia(ORBIT.REDUCED);
    const onMedia = () => {
      reduced = media.matches;
      stage.current?.setReduced(reduced);
    };
    const onMove = () => {
      lastMove.current = performance.now();
    };
    const observer = new ResizeObserver(fit);
    import('@/lib/orbit/create-orbit-stage')
      .then(({ createOrbitStage }) => {
        if (cancelled) return;
        const created = createOrbitStage(hostEl, bodiesRef.current, reduced);
        stage.current = created;
        created.setActive(activeRef.current);
        created.onFrame((frame) => {
          const now = performance.now();
          writeFrame(
            frame,
            {
              root: rootEl,
              labels: labels.current,
              names: names.current,
              blocks: [
                panel.current,
                history.current,
                document.querySelector('header'),
              ],
              ticks: ticks.current,
              reticle: reticle.current,
            },
            memory,
            activeRef.current,
            (now - last) / 1000,
            reduced
          );
          last = now;
        });
        fit();
        rootEl.dataset.ready = '';
        observer.observe(rootEl);
        if (panel.current) observer.observe(panel.current);
      })
      .catch(() => {});
    media.addEventListener('change', onMedia);
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      cancelled = true;
      observer.disconnect();
      media.removeEventListener('change', onMedia);
      window.removeEventListener('pointermove', onMove);
      stage.current?.dispose();
      stage.current = null;
      delete rootEl.dataset.ready;
    };
  }, [key]);

  const hold = (on: boolean) => stage.current?.setHold(on);
  const handlers = {
    select: setActive,
    enter: (index: number) => (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;
      if (performance.now() - lastMove.current > 120) return;
      setActive(index);
      stage.current?.setLift(index);
      hold(true);
    },
    leave: () => {
      stage.current?.setLift(-1);
      hold(false);
    },
    focus: (index: number) => {
      setActive(index);
      hold(true);
    },
    blur: () => hold(false),
    press: (event: PointerEvent) => {
      dragX.current = event.clientX;
      event.currentTarget.setPointerCapture(event.pointerId);
      hold(true);
    },
    drag: (event: PointerEvent) => {
      if (dragX.current === null) return;
      stage.current?.nudge(-(event.clientX - dragX.current) * 0.006);
      dragX.current = event.clientX;
    },
    release: () => {
      dragX.current = null;
      hold(false);
    },
    pick: (index: number) => () => setActive(index),
  };
  const refs = {
    root,
    host,
    panel,
    history,
    ticks,
    reticle,
    label: (index: number) => (element: HTMLDivElement | null) => {
      labels.current[index] = element;
    },
    name: (index: number) => (element: HTMLSpanElement | null) => {
      names.current[index] = element;
    },
  };
  return { active, handlers, refs };
}
