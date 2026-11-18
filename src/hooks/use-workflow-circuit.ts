'use client';

import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { MEDIA } from '@/constants/breakpoint';

const forwardMs = 830;
const returnMs = 1650;
const arrivalMs = 740;

function initialPlayback(route: number[], reduced: boolean) {
  return { route, reduced, index: 0, playing: !reduced, finished: false };
}

export function useWorkflowCircuit(route: number[], reduced: boolean) {
  const [snapshot, setSnapshot] = useState(() =>
    initialPlayback(route, reduced)
  );
  let playback = snapshot;
  if (snapshot.route !== route || snapshot.reduced !== reduced) {
    playback = initialPlayback(route, reduced);
    setSnapshot(playback);
  }
  const { index, playing, finished } = playback;
  const lastIndex = route.length - 1;
  const travelMs = route[index] < route[index - 1] ? returnMs : forwardMs;
  const elapsed = useRef(0);
  const progress = useRef(0);
  const path = useRef<SVGPathElement | null>(null);
  const length = useRef(0);
  const dot = useRef<SVGGElement | null>(null);
  const observer = useRef<MutationObserver | null>(null);

  const draw = useCallback(() => {
    if (!path.current || !dot.current || !length.current) return;
    const { x, y } = path.current.getPointAtLength(
      length.current * progress.current
    );
    dot.current.setAttribute('transform', `translate(${x} ${y})`);
  }, []);

  const pathRef = useCallback(
    (node: SVGPathElement | null) => {
      observer.current?.disconnect();
      path.current = node;
      if (!node) return;
      const measure = () => {
        length.current = node.getTotalLength();
        draw();
      };
      measure();
      observer.current = new MutationObserver(measure);
      observer.current.observe(node, {
        attributes: true,
        attributeFilter: ['d'],
      });
    },
    [draw]
  );

  const dotRef = useCallback(
    (node: SVGGElement | null) => {
      dot.current = node;
      draw();
    },
    [draw]
  );

  useLayoutEffect(() => {
    elapsed.current = 0;
    progress.current = reduced ? 1 : 0;
    draw();
  }, [draw, index, reduced, route]);

  useLayoutEffect(() => {
    if (!playing || reduced || window.matchMedia(MEDIA.REDUCED_MOTION).matches)
      return;
    let frame = 0;
    let previous: number | null = null;
    function tick(now: number) {
      if (previous !== null) elapsed.current += now - previous;
      previous = now;
      const fraction = Math.min(1, elapsed.current / travelMs);
      if (progress.current !== fraction) {
        progress.current = fraction;
        draw();
      }
      if (elapsed.current < travelMs + arrivalMs) {
        frame = requestAnimationFrame(tick);
      } else {
        setSnapshot((current) => {
          if (
            current.route !== route ||
            current.index !== index ||
            !current.playing
          )
            return current;
          if (index === lastIndex)
            return { ...current, playing: false, finished: true };
          return { ...current, index: index + 1 };
        });
      }
    }
    function visibility() {
      cancelAnimationFrame(frame);
      previous = null;
      if (!document.hidden) frame = requestAnimationFrame(tick);
    }
    visibility();
    document.addEventListener('visibilitychange', visibility);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener('visibilitychange', visibility);
    };
  }, [draw, index, lastIndex, playing, reduced, route, travelMs]);

  function toggle() {
    setSnapshot((current) => {
      if (current.finished) return initialPlayback(route, reduced);
      if (!reduced) return { ...current, playing: !current.playing };
      const next = Math.min(lastIndex, current.index + 1);
      return { ...current, index: next, finished: next === lastIndex };
    });
  }

  return { index, playing, finished, toggle, pathRef, dotRef };
}
