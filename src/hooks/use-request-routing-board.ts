import { useLayoutEffect, useRef, type RefObject } from 'react';
import type {
  RoutingPainter,
  RoutingPhase,
  RoutingRequest,
} from '@/dto/request-routing.dto';
import { routingPacket } from '@/lib/request-routing';
import {
  routingTrackPaths,
  type RoutingAnchor,
} from '@/lib/request-routing-geometry';

export function useRequestRoutingBoard(
  request: RoutingRequest,
  reduced: boolean,
  paintRef: RefObject<RoutingPainter | null>
) {
  const boardRef = useRef<SVGSVGElement>(null);
  useLayoutEffect(() => {
    const svg = boardRef.current;
    const board = svg?.parentElement;
    if (!svg || !board) return;
    const nodes = Array.from(
      board.querySelectorAll<HTMLElement>('[data-node]')
    );
    const dots = Array.from(
      svg.querySelectorAll<SVGGElement>('g[data-packet]')
    );
    const paths = new Map(
      Array.from(
        svg.querySelectorAll<SVGPathElement>('path[data-edge]'),
        (path) => [path.dataset.edge, path] as const
      )
    );
    let lengths = new Map<string, number>();
    let lastPhase: RoutingPhase =
      board.dataset.phase === 'done' ? 'done' : 'judge';
    let lastFraction = lastPhase === 'done' ? 1 : 0;

    function paint(phase: RoutingPhase, fraction: number) {
      lastPhase = phase;
      lastFraction = fraction;
      dots.forEach((dot, index) => {
        const location =
          !reduced &&
          routingPacket(
            phase,
            fraction,
            dot.dataset.packet!,
            index === 0,
            request.issue?.owner
          );
        if (!location) {
          if (!dot.hasAttribute('display')) dot.setAttribute('display', 'none');
          return;
        }
        const [name, at] = location;
        const path = paths.get(name);
        const length = lengths.get(name);
        if (!path || !length) return;
        const point = path.getPointAtLength(length * at);
        dot.setAttribute('transform', `translate(${point.x} ${point.y})`);
        dot.removeAttribute('display');
      });
    }

    function measure() {
      const origin = svg!.getBoundingClientRect();
      const anchors = new Map<string, RoutingAnchor>();
      for (const node of nodes) {
        const box = node.getBoundingClientRect();
        anchors.set(node.dataset.node!, {
          x: box.left + box.width / 2 - origin.left,
          halfWidth: (box.width - 1) / 2,
          top: box.top - origin.top + 0.5,
          bottom: box.bottom - origin.top - 0.5,
        });
      }
      const geometry = routingTrackPaths(
        anchors,
        Object.keys(request.jobs),
        origin.width,
        origin.height
      );
      lengths = new Map();
      for (const [id, d] of geometry) {
        const path = paths.get(id);
        if (!path) continue;
        path.setAttribute('d', d);
        lengths.set(id, path.getTotalLength());
      }
      paintRef.current = { lengths, paint };
      paint(lastPhase, lastFraction);
    }

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(board);
    nodes.forEach((node) => observer.observe(node));
    return () => {
      paintRef.current = null;
      observer.disconnect();
    };
  }, [paintRef, reduced, request]);
  return { boardRef };
}
