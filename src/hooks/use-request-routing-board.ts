import { useLayoutEffect, useRef, useState, type RefObject } from 'react';
import type { WorkflowOwner } from '@/dto/ai-workflow.dto';
import type { RoutingPhase, RoutingRequest } from '@/dto/request-routing.dto';

type Paint = (phase: RoutingPhase, fraction: number) => void;

function routePacket(
  phase: RoutingPhase,
  fraction: number,
  owner: WorkflowOwner,
  request: RoutingRequest,
  first: boolean,
  reduced: boolean
): [string, number] | undefined {
  const assigned = Boolean(request.jobs[owner]);
  if (reduced) return assigned ? [`in-${owner}`, 1] : undefined;
  switch (phase) {
    case 'request':
      return first ? ['entry', fraction] : undefined;
    case 'judge':
      return first ? ['entry', 1] : undefined;
    case 'outlet':
      return first ? ['rim', fraction] : undefined;
    case 'route':
      return assigned ? [`in-${owner}`, fraction] : undefined;
    case 'work':
      return assigned ? [`in-${owner}`, 1] : undefined;
    case 'join':
      return assigned ? [`out-${owner}`, fraction] : undefined;
    case 'issue':
    case 'done':
      return first ? [`out-${owner}`, 1] : undefined;
    case 'back':
    case 'fix':
    case 'retry':
      if (request.issue?.owner !== owner) return;
      return [
        `out-${owner}`,
        phase === 'back' ? 1 - fraction : phase === 'fix' ? 0 : fraction,
      ];
  }
}

export function useRequestRoutingBoard(
  request: RoutingRequest,
  reduced: boolean,
  paintRef: RefObject<Paint | null>
) {
  const boardRef = useRef<SVGSVGElement>(null);
  const [width, setWidth] = useState(336);
  const last = useRef({
    request,
    phase: 'request' as RoutingPhase,
    fraction: 0,
  });

  useLayoutEffect(() => {
    const board = boardRef.current;
    if (!board) return;
    const resize = () => {
      if (board.clientWidth) setWidth(board.clientWidth);
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(board);
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    const board = boardRef.current;
    if (!board) return;
    const edges = new Map(
      Array.from(
        board.querySelectorAll<SVGPathElement>('path[data-edge]'),
        (el) => [el.dataset.edge, { el, length: el.getTotalLength() }] as const
      )
    );
    const dots = Array.from(
      board.querySelectorAll<SVGGElement>('g[data-packet]')
    );
    function paint(phase: RoutingPhase, fraction: number) {
      last.current = { request, phase, fraction };
      dots.forEach((dot, index) => {
        const owner = dot.dataset.packet as WorkflowOwner;
        const location = routePacket(
          phase,
          fraction,
          owner,
          request,
          index === 0,
          reduced
        );
        if (!location) {
          if (!dot.hasAttribute('display')) dot.setAttribute('display', 'none');
          return;
        }
        const edge = edges.get(location[0]);
        if (!edge) return;
        const position = edge.el.getPointAtLength(edge.length * location[1]);
        dot.setAttribute('transform', `translate(${position.x} ${position.y})`);
        dot.removeAttribute('display');
      });
    }
    paintRef.current = paint;
    if (last.current.request === request)
      paint(last.current.phase, last.current.fraction);
    else paint('request', 0);
    return () => {
      paintRef.current = null;
    };
  }, [paintRef, reduced, request, width]);

  return { boardRef, width };
}
