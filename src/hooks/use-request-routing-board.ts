import { useLayoutEffect, useRef, type RefObject } from 'react';
import type { RoutingPhase, RoutingRequest } from '@/dto/request-routing.dto';
import { routingPacket, routingPacketOpacity } from '@/lib/request-routing';

type Paint = (phase: RoutingPhase, fraction: number) => void;

interface Anchor {
  x: number;
  top: number;
  bottom: number;
}

function bridge(from: Anchor, to: Anchor) {
  const middle = (from.bottom + to.top) / 2;
  return `C${from.x} ${middle} ${to.x} ${middle} ${to.x} ${to.top}`;
}

export function useRequestRoutingBoard(
  request: RoutingRequest,
  reduced: boolean,
  paintRef: RefObject<Paint | null>
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
    const lengths = new Map<string, number>();
    let lastPhase: RoutingPhase =
      board.dataset.phase === 'done' ? 'done' : 'request';
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
        dot.setAttribute(
          'opacity',
          String(routingPacketOpacity(phase, fraction, Boolean(request.issue)))
        );
        dot.removeAttribute('display');
      });
    }

    function setPath(id: string, d: string) {
      const path = paths.get(id);
      if (!path) return;
      path.setAttribute('d', d);
      lengths.set(id, path.getTotalLength());
    }

    function measure() {
      const origin = svg!.getBoundingClientRect();
      const anchors = new Map<string, Anchor>();
      for (const node of nodes) {
        const box = node.getBoundingClientRect();
        anchors.set(node.dataset.node!, {
          x: box.left - origin.left + box.width / 2,
          top: box.top - origin.top,
          bottom: box.bottom - origin.top,
        });
      }
      const judge = anchors.get('judge')!;
      const review = anchors.get('review')!;
      const result = anchors.get('result')!;
      setPath('entry', `M${judge.x} 0V${judge.top}`);
      for (const id of Object.keys(request.jobs)) {
        const node = anchors.get(id)!;
        setPath(
          `in-${id}`,
          `M${judge.x} ${judge.bottom}` + bridge(judge, node)
        );
        setPath(
          `join-${id}`,
          `M${node.x} ${node.bottom}` + bridge(node, review)
        );
      }
      setPath('exit', `M${review.x} ${review.bottom}` + bridge(review, result));
      paint(lastPhase, lastFraction);
    }

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(board);
    nodes.forEach((node) => observer.observe(node));
    paintRef.current = paint;
    return () => {
      paintRef.current = null;
      observer.disconnect();
    };
  }, [paintRef, reduced, request]);
  return { boardRef };
}
