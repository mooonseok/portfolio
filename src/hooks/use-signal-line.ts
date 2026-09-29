'use client';

import { useEffect, useRef, useState } from 'react';
import { MEDIA } from '@/constants/breakpoint';
import { FIRST_LINE, READ_LINE } from '@/constants/signal-line';
import { TONE } from '@/constants/tone';
import type { Marker, SignalGeometry } from '@/dto/signal-line.dto';

const rendered = (el: Element) => el.getClientRects().length > 0;
const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

export function useSignalLine() {
  const root = useRef<HTMLDivElement>(null);
  const line = useRef<HTMLSpanElement>(null);
  const [markers, setMarkers] = useState<Marker[]>([]);
  const geo = useRef<SignalGeometry>({
    top: 0,
    height: 0,
    markers: [],
    branches: [],
    current: '',
  });
  const frameRef = useRef<() => void>(() => {});

  useEffect(() => {
    const el = root.current;
    const ln = line.current;
    const wrap = el?.parentElement;
    if (!el || !ln || !wrap) return;
    const reducedMq = window.matchMedia(MEDIA.REDUCED_MOTION);
    const branchMq = window.matchMedia(MEDIA.TABLET_UP);

    const frame = () => {
      const g = geo.current;
      const readY =
        window.innerHeight * READ_LINE - wrap.getBoundingClientRect().top;
      const reduced = reducedMq.matches;
      el.style.setProperty(
        '--fill',
        reduced
          ? '1'
          : clamp01(g.height ? (readY - g.top) / g.height : 0).toFixed(4)
      );

      let current = '';
      for (const m of g.markers) if (m.y <= readY) current = m.id;
      if (current !== g.current) {
        g.current = current;
        for (const node of el.querySelectorAll<HTMLElement>('[data-marker]')) {
          node.toggleAttribute('data-current', node.dataset.marker === current);
        }
      }

      const branches = branchMq.matches;
      for (const b of g.branches)
        b.el.toggleAttribute(
          'data-passed',
          branches && (reduced || b.y <= readY)
        );
    };

    const measure = () => {
      const w = wrap.getBoundingClientRect();
      const rel = (r: DOMRect) => r.top - w.top;
      const top = ln.offsetTop;
      const end = wrap.querySelector<HTMLElement>('[data-signal-end]');
      const endRect = end && rendered(end) ? end.getBoundingClientRect() : null;
      if (!endRect) ln.style.removeProperty('height');
      const bottom = endRect
        ? rel(endRect) + endRect.height / 2
        : ln.offsetTop + ln.offsetHeight;
      const height = Math.max(0, bottom - top);
      if (endRect) ln.style.height = `${height}px`;

      const next: Marker[] = [];
      for (const a of wrap.querySelectorAll<HTMLElement>(
        '[data-signal-anchor]'
      )) {
        if (!rendered(a)) continue;
        const r = a.getBoundingClientRect();
        const y = Math.round(rel(r) + Math.min(r.height / 2, FIRST_LINE));
        if (y < top || y > bottom) continue;
        next.push({
          id: a.dataset.signalAnchor || String(next.length),
          y,
          dark:
            a.dataset.signalTone === TONE.DARK || !!a.closest('.surface-dark'),
        });
      }

      const stops: string[] = [];
      for (const d of wrap.querySelectorAll<HTMLElement>('.surface-dark')) {
        if (d.parentElement?.closest('.surface-dark') || !rendered(d)) continue;
        const r = d.getBoundingClientRect();
        const a = Math.max(0, rel(r) - top);
        const b = Math.min(height, rel(r) + r.height - top);
        if (b <= a) continue;
        stops.push(
          `var(--ink) ${a}px`,
          `var(--paper) ${a}px`,
          `var(--paper) ${b}px`,
          `var(--ink) ${b}px`
        );
      }
      el.style.setProperty(
        '--fill-bg',
        stops.length
          ? `linear-gradient(to bottom, var(--ink) 0, ${stops.join(', ')}, var(--ink) 100%)`
          : 'var(--ink)'
      );

      const g = geo.current;
      g.top = top;
      g.height = height;
      g.branches = Array.from(
        wrap.querySelectorAll<HTMLElement>('[data-signal-branch]')
      ).map((b) => {
        const r = b.getBoundingClientRect();
        return { el: b, y: rel(r) + r.height / 2 };
      });
      const same =
        next.length === g.markers.length &&
        next.every((m, i) => {
          const o = g.markers[i];
          return o.id === m.id && o.y === m.y && o.dark === m.dark;
        });
      if (!same) {
        g.markers = next;
        setMarkers(next);
      }
      frame();
    };
    frameRef.current = frame;

    let raf = 0;
    const onScroll = () => {
      if (!raf)
        raf = requestAnimationFrame(() => {
          raf = 0;
          frame();
        });
    };
    let mraf = 0;
    const queueMeasure = () => {
      if (!mraf)
        mraf = requestAnimationFrame(() => {
          mraf = 0;
          measure();
        });
    };

    measure();
    const ro = new ResizeObserver(queueMeasure);
    ro.observe(wrap);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('load', queueMeasure);
    document.fonts?.ready.then(queueMeasure).catch(() => {});
    reducedMq.addEventListener('change', onScroll);
    branchMq.addEventListener('change', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(mraf);
      ro.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('load', queueMeasure);
      reducedMq.removeEventListener('change', onScroll);
      branchMq.removeEventListener('change', onScroll);
      for (const b of geo.current.branches) b.el.removeAttribute('data-passed');
    };
  }, []);

  useEffect(() => {
    geo.current.current = '\u0000';
    frameRef.current();
  }, [markers]);

  return { root, line, markers };
}
