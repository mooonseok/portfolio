'use client';

import { useMemo, useState } from 'react';
import { MEDIA } from '@/constants/breakpoint';
import { circuitCopy, workflows } from '@/content/ai-workflow';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useWorkflowCircuit } from '@/hooks/use-workflow-circuit';
import { workflowRoute } from '@/lib/ai-workflow';
import { AiCheckFlowView } from './ai-check-flow-view';

export function AiCheckLoop() {
  const reduced = useMediaQuery(MEDIA.REDUCED_MOTION);
  const [selection, setSelection] = useState({
    request: workflows[0],
    result: 0,
  });
  const { request, result } = selection;
  const issue = request.issues[result];
  const route = useMemo(
    () =>
      workflowRoute(selection.request.issues[selection.result]?.target).slice(
        1
      ),
    [selection]
  );
  const { index, playing, finished, toggle, pathRef, dotRef } =
    useWorkflowCircuit(route, reduced);
  const active = route[index];
  const returning = active < route[index - 1];
  const note =
    returning && issue
      ? issue.label + ' 발견 · ' + issue.reason
      : active === 3 && index > 2
        ? circuitCopy.review
        : request.stages[active].body;
  const playLabel = finished
    ? circuitCopy.replay
    : reduced
      ? circuitCopy.next
      : playing
        ? circuitCopy.pause
        : circuitCopy.resume;

  return (
    <AiCheckFlowView
      lanes={workflows}
      request={request}
      result={result}
      onRequest={(next) => setSelection({ request: next, result })}
      onResult={(next) => setSelection({ request, result: next })}
      onPlay={toggle}
      {...{
        copy: circuitCopy,
        note,
        active,
        returning,
        target: issue?.target,
        playLabel,
        pathRef,
        dotRef,
      }}
    />
  );
}
