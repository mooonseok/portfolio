'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { MEDIA } from '@/constants/breakpoint';

const forwardMs = 830;
const returnMs = 1650;
const arrivalMs = 740;

function initialPlayback(route: number[], reduced: boolean) {
  return { route, reduced, index: 0, playing: !reduced, finished: false };
}

function createTrack() {
  let path: SVGPathElement | null = null;
  let dot: SVGGElement | null = null;
  let observer: MutationObserver | undefined;
  let length = 0;
  let progress = 0;

  function position() {
    if (!path || !dot || !length) return;
    const { x, y } = path.getPointAtLength(length * progress);
    dot.setAttribute('transform', `translate(${x} ${y})`);
  }

  return {
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
      position();
    },
    draw(fraction: number) {
      progress = fraction;
      position();
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
  const { index, playing, finished } = playback;
  const lastIndex = route.length - 1;
  const travelMs = route[index] < route[index - 1] ? returnMs : forwardMs;
  const elapsed = useRef(0);
  const progress = useRef(0);
  const [tracks] = useState(() => [
    createTrack(),
    createTrack(),
    createTrack(),
  ]);

  useLayoutEffect(() => {
    elapsed.current = 0;
    progress.current = reduced ? 1 : 0;
    tracks.forEach((track) => track.draw(progress.current));
  }, [tracks, index, reduced, route]);

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
        tracks.forEach((track) => track.draw(fraction));
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
  }, [tracks, index, lastIndex, playing, reduced, route, travelMs]);

  function toggle() {
    setSnapshot((current) => {
      if (current.finished) return initialPlayback(route, reduced);
      if (!reduced) return { ...current, playing: !current.playing };
      const next = Math.min(lastIndex, current.index + 1);
      return { ...current, index: next, finished: next === lastIndex };
    });
  }

  return { index, playing, finished, toggle, tracks };
}
