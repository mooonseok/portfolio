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
      workflowRoute(
        selection.request,
        selection.request.issues[selection.result]
      ).slice(1),
    [selection]
  );
  const { index, playing, toggle, tracks } = useWorkflowCircuit(route, reduced);
  const active = route[index];
  const returning = active < route[index - 1];
  const repair = Boolean(issue && index > route.indexOf(issue.source));
  const worker = request.workers?.find((item) => item.id === issue?.owner);
  const fixing = returning && worker;
  const note =
    returning && issue
      ? issue.label + ' 발견 · ' + issue.reason
      : repair && worker && issue && active === issue.target + 1
        ? `${worker.label} 담당의 수정본을 합칩니다. 다른 두 담당의 작업은 완료된 상태로 이어집니다.`
        : issue && active === issue.source && index > route.indexOf(active)
          ? circuitCopy.review
          : request.stages[active].body;
  const playLabel = reduced
    ? circuitCopy.next
    : playing
      ? circuitCopy.pause
      : circuitCopy.resume;

  return (
    <AiCheckFlowView
      lanes={workflows}
      request={request}
      result={result}
      onRequest={(next) =>
        setSelection({
          request: next,
          result: issue
            ? Math.min(result, next.issues.length - 1)
            : next.issues.length,
        })
      }
      onResult={(next) => setSelection({ request, result: next })}
      onPlay={toggle}
      {...{
        copy: circuitCopy,
        note,
        active,
        returning,
        statusTitle: fixing ? issue?.label : undefined,
        statusOwner: fixing ? `${worker.label} 담당 수정 중` : undefined,
        owner: issue?.owner,
        repair,
        source: issue?.source,
        target: issue?.target,
        playLabel,
        playing,
        pathRef: tracks[0].pathRef,
        dotRef: tracks[0].dotRef,
        extraTracks: tracks.slice(1),
      }}
    />
  );
}
