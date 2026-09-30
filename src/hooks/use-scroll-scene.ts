'use client';

import { useEffect, useRef } from 'react';
import { MEDIA } from '@/constants/breakpoint';
import { FLOW_ROLE, type FlowRole } from '@/constants/flow';
import type { FlowState, Scene } from '@/dto/scroll-scene.dto';
import { useVisibleFrame } from '@/hooks/use-visible-frame';

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

const ownedBy = (scene: HTMLElement, node: Element) =>
  node.parentElement?.closest('[data-scene]') === scene;

const rendered = (node: Element) => node.getClientRects().length > 0;

function collect(scene: HTMLElement, prev: Scene | null): Scene {
  const flows = (kind: FlowRole) =>
    Array.from(scene.querySelectorAll<HTMLElement>(`[data-flow="${kind}"]`))
      .filter((f) => ownedBy(scene, f))
      .map<FlowState>((f) => ({
        steps: Array.from(
          f.querySelectorAll<HTMLElement>('[data-step]')
        ).filter(
          (st) => st.parentElement?.closest('[data-flow]') === f && rendered(st)
        ),
        index: -1,
      }));
  const linked = Array.from(
    scene.querySelectorAll<HTMLElement>('[data-node], [data-link]')
  ).filter(
    (n) =>
      ownedBy(scene, n) &&
      (n.hasAttribute('data-link') || !n.closest('[data-flow]'))
  );
  if (prev) {
    for (const f of [...prev.primary, ...prev.secondary])
      for (const st of f.steps) st.removeAttribute('data-active');
    for (const n of prev.linked) n.removeAttribute('data-active');
  }
  return {
    primary: flows(FLOW_ROLE.PRIMARY),
    secondary: flows(FLOW_ROLE.SECONDARY),
    linked,
    labels: '\u0000',
  };
}

function setIndex(flow: FlowState, index: number) {
  if (flow.index === index) return;
  flow.steps[flow.index]?.removeAttribute('data-active');
  flow.steps[index]?.setAttribute('data-active', '');
  flow.index = index;
}

const stepAt = (t: number, n: number) =>
  n ? Math.min(n - 1, Math.floor(t * n)) : -1;

export function useScrollScene(steps: boolean) {
  const ref = useRef<HTMLElement | null>(null);
  const scene = useRef<Scene | null>(null);

  const frame = (el: HTMLElement) => {
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight;

    if (
      !el.dataset.inview &&
      Math.min(r.bottom, vh) - Math.max(r.top, 0) >=
        0.3 * Math.min(r.height, vh)
    ) {
      el.dataset.inview = 'true';
    }

    const sc = scene.current;
    if (!sc) return;
    const reduced = window.matchMedia(MEDIA.REDUCED_MOTION).matches;
    const sp = (vh * 0.75 - r.top) / Math.max(r.height, vh * 0.7);
    const hasSecondary = sc.secondary.some((f) => f.steps.length);
    const tp = reduced ? 0 : clamp01(sp / (hasSecondary ? 0.6 : 0.85));
    for (const f of sc.primary) setIndex(f, stepAt(tp, f.steps.length));
    const ts = reduced || sp < 0.5 ? -1 : clamp01((sp - 0.5) / 0.35);
    for (const f of sc.secondary)
      setIndex(f, ts < 0 ? -1 : stepAt(ts, f.steps.length));

    const active = [...sc.primary, ...sc.secondary]
      .map((f) => f.steps[f.index]?.dataset.node)
      .filter(Boolean) as string[];
    const labels = active.join('\u0000');
    if (labels === sc.labels) return;
    sc.labels = labels;
    for (const n of sc.linked) {
      const on = active.includes((n.dataset.link ?? n.dataset.node) as string);
      n.toggleAttribute('data-active', on);
    }
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    frame(el);
    el.dataset.ready = '';
    if (!steps)
      return () => {
        delete el.dataset.ready;
      };
    const refresh = () => {
      scene.current = collect(el, scene.current);
      frame(el);
    };
    refresh();
    let width = el.getBoundingClientRect().width;
    const ro = new ResizeObserver(() => {
      const w = el.getBoundingClientRect().width;
      if (w === width) return;
      width = w;
      refresh();
    });
    ro.observe(el);
    return () => {
      delete el.dataset.ready;
      ro.disconnect();
      scene.current = null;
    };
  }, [steps]);

  useVisibleFrame(ref, frame);

  return ref;
}
