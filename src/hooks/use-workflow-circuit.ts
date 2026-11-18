'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { MEDIA } from '@/constants/breakpoint';
import { workflowFrame, workflowTravelMs } from '@/lib/workflow-timing';

function initialPlayback(route: number[], reduced: boolean) {
  return { route, reduced, index: 0 };
}

function createTrack() {
  let path: SVGPathElement | null = null;
  let dot: SVGGElement | null = null;
  let observer: MutationObserver | undefined;
  let length = 0;
  let progress = 0;
  let opacity = 1;

  function position() {
    if (!path || !dot || !length) return;
    const { x, y } = path.getPointAtLength(length * progress);
    dot.setAttribute('transform', `translate(${x} ${y})`);
  }

  return {
    get length() {
      return path ? length : 0;
    },
    pathRef(node: SVGPathElement | null) {
      observer?.disconnect();
      path = node;
      if (!node) return;
      const measure = () => {
        length = node.getTotalLength();
        position();
      };
      measure();
      observer = new MutationObserver(measure);
      observer.observe(node, { attributes: true, attributeFilter: ['d'] });
    },
    dotRef(node: SVGGElement | null) {
      dot = node;
      dot?.setAttribute('opacity', String(opacity));
      position();
    },
    draw(fraction: number, alpha: number) {
      if (progress !== fraction) {
        progress = fraction;
        position();
      }
      if (opacity !== alpha) {
        opacity = alpha;
        dot?.setAttribute('opacity', String(alpha));
      }
    },
  };
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
  const { index } = playback;
  const lastIndex = route.length - 1;
  const elapsed = useRef(0);
  const previous = useRef<number | null>(null);
  const travelMs = useRef(0);
  const [tracks] = useState(() => [
    createTrack(),
    createTrack(),
    createTrack(),
  ]);

  useLayoutEffect(() => {
    elapsed.current = 0;
    previous.current = null;
  }, [route, reduced]);

  useLayoutEffect(() => {
    travelMs.current = workflowTravelMs(
      Math.max(...tracks.map((track) => track.length))
    );
  }, [tracks, index, route]);

  useLayoutEffect(() => {
    function paint() {
      const { progress, opacity, remaining } = workflowFrame(
        elapsed.current,
        travelMs.current,
        index === 0,
        index === lastIndex
      );
      for (const track of tracks) {
        track.draw(reduced ? 1 : progress, reduced ? 1 : opacity);
      }
      return remaining;
    }
    paint();
    if (reduced || window.matchMedia(MEDIA.REDUCED_MOTION).matches) {
      previous.current = null;
      return;
    }
    let frame = 0;
    function tick(now: number) {
      if (previous.current !== null) elapsed.current += now - previous.current;
      previous.current = now;
      const remaining = paint();
      if (remaining === null) {
        frame = requestAnimationFrame(tick);
        return;
      }
      elapsed.current = remaining;
      setSnapshot((current) => {
        if (
          current.route !== route ||
          current.index !== index ||
          current.reduced
        )
          return current;
        return { ...current, index: (index + 1) % route.length };
      });
    }
    function visibility() {
      cancelAnimationFrame(frame);
      previous.current = null;
      if (!document.hidden) frame = requestAnimationFrame(tick);
    }
    if (!document.hidden) frame = requestAnimationFrame(tick);
    document.addEventListener('visibilitychange', visibility);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener('visibilitychange', visibility);
    };
  }, [tracks, index, lastIndex, reduced, route]);

  function nextStage() {
    setSnapshot((current) => ({
      ...current,
      index: (current.index + 1) % current.route.length,
    }));
  }

  return { index, tracks, onNext: reduced ? nextStage : undefined };
}
