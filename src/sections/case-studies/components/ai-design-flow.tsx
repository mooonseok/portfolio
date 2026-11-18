'use client';

import { useMemo, useState } from 'react';
import { MEDIA } from '@/constants/breakpoint';
import { circuitCopy, workflows } from '@/content/ai-workflow';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useWorkflowCircuit } from '@/hooks/use-workflow-circuit';
import { workflowRoute } from '@/lib/ai-workflow';
import { AiCheckFlowView } from './ai-check-flow-view';

export function AiDesignFlow() {
  const request = workflows[0];
  const [result, setResult] = useState(0);
  const issue = request.issues[result];
  const route = useMemo(
    () => workflowRoute(request, issue).slice(1),
    [request, issue]
  );
  const reduced = useMediaQuery(MEDIA.REDUCED_MOTION);
  const { index, track, onNext } = useWorkflowCircuit(route, reduced);
  const active = route[index];
  const returning = active < route[index - 1];
  const note =
    returning && issue
      ? issue.label + ' 발견 · ' + issue.reason
      : issue && active === issue.source && index > route.indexOf(active)
        ? circuitCopy.review
        : request.stages[active].body;
  return (
    <AiCheckFlowView
      request={request}
      copy={circuitCopy}
      result={result}
      onResult={setResult}
      onNext={onNext}
      active={active}
      returning={returning}
      note={note}
      source={issue?.source}
      target={issue?.target}
      {...track}
    />
  );
}
