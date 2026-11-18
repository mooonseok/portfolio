'use client';

import { useCallback, useMemo, useState } from 'react';
import { Button } from '@/components/atoms/button';
import { Box } from '@/components/atoms/box';
import { RequestRoutingBoard } from '@/components/atoms/request-routing-board';
import { TAG } from '@/constants/tag';
import { designFlow } from '@/content/design-routing';
import { developmentFlow } from '@/content/request-routing';
import type { RoutingLane, RoutingRequest } from '@/dto/request-routing.dto';
import { useRequestRouting } from '@/hooks/use-request-routing';
import { useRequestRoutingBoard } from '@/hooks/use-request-routing-board';
import styles from './ai-request-routing.module.css';

function RequestTranscript({ request }: { request: RoutingRequest }) {
  const issue = request.issue;
  return (
    <Box as={TAG.DETAILS} open>
      <Box as={TAG.SUMMARY}>{request.label}</Box>
      <Box as={TAG.OL}>
        <Box as={TAG.LI}>
          {request.reason}. {request.decision}
        </Box>
        <Box as={TAG.LI}>{request.prepare}</Box>
        <Box as={TAG.LI}>
          {Object.values(request.jobs).map((job) => (
            <Box key={job.label}>
              {job.label} · {job.action} → {job.finish}
            </Box>
          ))}
        </Box>
        <Box as={TAG.LI}>{request.gather}</Box>
        <Box as={TAG.LI}>{request.proof}</Box>
        <Box as={TAG.LI}>{request.review}</Box>
        <Box as={TAG.LI}>{request.decisionTest}</Box>
        {issue && (
          <Box as={TAG.LI}>
            {issue.finding} → {request.jobs[issue.owner]?.label}의 ‘
            {request.jobs[issue.owner]?.finish}’ 단계로 돌아가 수정한 뒤 다시
            검토해.
          </Box>
        )}
        <Box as={TAG.LI}>
          {request.planIssue} → {request.prepare}
        </Box>
        <Box as={TAG.LI}>
          {request.finish}. {request.handoff}
        </Box>
      </Box>
    </Box>
  );
}

const outcomes = ['pass', 'repair', 'plan'] as const;

function RoutingPlayer({
  base,
  parallel,
}: {
  base: RoutingRequest;
  parallel: boolean;
}) {
  const [round, setRound] = useState(0);
  const outcome = outcomes[round];
  const nextRound = useCallback(
    () => setRound((index) => (index + 1) % outcomes.length),
    []
  );
  const request = useMemo(
    (): RoutingRequest => ({
      ...base,
      jobs:
        parallel || !base.jobs.support
          ? base.jobs
          : { primary: base.jobs.primary! },
      issue:
        outcome === 'pass' || !base.issue
          ? undefined
          : outcome === 'plan'
            ? { ...base.issue, finding: base.planIssue, scope: 'plan' }
            : base.issue,
    }),
    [base, parallel, outcome]
  );
  const { phase, reduced, paintRef, viewportRef } = useRequestRouting(
    request,
    nextRound
  );
  const board = useRequestRoutingBoard(request, reduced, paintRef);
  return (
    <Box ref={viewportRef}>
      <RequestRoutingBoard
        {...board}
        request={request}
        workIssue={base.issue}
        phase={phase}
        reduced={reduced}
      />
    </Box>
  );
}

export function AiRequestRouting({ lane }: { lane: RoutingLane }) {
  const base = lane === 'design' ? designFlow : developmentFlow;
  const [parallel, setParallel] = useState(true);
  return (
    <Box className={styles.panel} data-lane={lane}>
      <Box className={styles.player}>
        {base.jobs.support && (
          <Box className={styles.controls}>
            <Button
              className={styles.switch}
              role='switch'
              aria-checked={parallel}
              onClick={() => setParallel((value) => !value)}
            >
              독립 작업 있음
            </Button>
          </Box>
        )}
        <RoutingPlayer key={String(parallel)} base={base} parallel={parallel} />
      </Box>
      <Box className={styles.transcript}>
        {[developmentFlow, designFlow].map((item) => (
          <RequestTranscript key={item.id} request={item} />
        ))}
      </Box>
    </Box>
  );
}
