'use client';

import { useMemo, useState } from 'react';
import { MEDIA } from '@/constants/breakpoint';
import {
  circuitCopy,
  developmentExamples,
  workflows,
} from '@/content/ai-workflow';
import type { WorkflowRequest } from '@/dto/ai-workflow.dto';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useWorkflowCircuit } from '@/hooks/use-workflow-circuit';
import { workflowRoute } from '@/lib/ai-workflow';
import { AiCheckFlowView } from './ai-check-flow-view';

export function AiCheckLoop() {
  const reduced = useMediaQuery(MEDIA.REDUCED_MOTION);
  const [lane, setLane] = useState(workflows[0].id);
  const [development, setDevelopment] = useState(developmentExamples[0]);
  const [result, setResult] = useState(0);
  const lanes = [workflows[0], development];
  const request = lane === development.id ? development : workflows[0];
  const issue = request.issues[result];
  const route = useMemo(
    () => workflowRoute(request, issue).slice(1),
    [request, issue]
  );
  const { index, tracks, onNext } = useWorkflowCircuit(route, reduced);
  const active = route[index];
  const returning = active < route[index - 1];
  const repair = Boolean(issue && index > route.indexOf(issue.source));
  const worker = request.workers?.find((item) => item.id === issue?.owner);
  const fixing = returning && worker;
  const note =
    returning && issue
      ? issue.label + ' 발견 · ' + issue.reason
      : repair &&
          worker &&
          issue &&
          active === issue.target + 1 &&
          (request.workers?.length ?? 0) > 1
        ? `${worker.label} 담당의 수정본을 합칩니다. 다른 두 담당의 작업은 완료된 상태로 이어집니다.`
        : issue && active === issue.source && index > route.indexOf(active)
          ? circuitCopy.review
          : request.stages[active].body;
  function selectRequest(next: WorkflowRequest) {
    if (next === request) return;
    const sameIssue = next.issues.findIndex((item) => item.id === issue?.id);
    const fallback = issue && next.id !== lane ? 0 : next.issues.length;
    setResult(sameIssue >= 0 ? sameIssue : fallback);
    if (next.id === development.id) setDevelopment(next);
    setLane(next.id);
  }
  return (
    <AiCheckFlowView
      lanes={lanes}
      examples={developmentExamples}
      request={request}
      result={result}
      onRequest={selectRequest}
      onResult={setResult}
      onNext={onNext}
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
        pathRef: tracks[0].pathRef,
        dotRef: tracks[0].dotRef,
        extraTracks: tracks.slice(1),
      }}
    />
  );
}
