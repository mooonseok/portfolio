'use client';

import { useMemo, useState } from 'react';
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

type Outcome = 'pass' | 'repair' | 'plan';

function RoutingPlayer({ request }: { request: RoutingRequest }) {
  const { phase, reduced, paintRef, viewportRef } = useRequestRouting(request);
  const board = useRequestRoutingBoard(request, reduced, paintRef);
  return (
    <Box ref={viewportRef}>
      <RequestRoutingBoard
        {...board}
        request={request}
        phase={phase}
        reduced={reduced}
      />
    </Box>
  );
}

export function AiRequestRouting({ lane }: { lane: RoutingLane }) {
  const base = lane === 'design' ? designFlow : developmentFlow;
  const [parallel, setParallel] = useState(true);
  const [outcome, setOutcome] = useState<Outcome>('repair');
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
  return (
    <Box className={styles.panel} data-lane={lane}>
      <Box className={styles.player}>
        <Box className={styles.controls}>
          {base.jobs.support && (
            <Button
              className={styles.switch}
              role='switch'
              aria-checked={parallel}
              onClick={() => setParallel((value) => !value)}
            >
              독립 작업 있음
            </Button>
          )}
          <Box className={styles.options} role='group' aria-label='검토 결과'>
            <Box as={TAG.SPAN} className={styles.caption}>
              검토 결과
            </Box>
            {(['pass', 'repair', 'plan'] as const).map((value) => (
              <Button
                key={value}
                className={styles.option}
                aria-pressed={outcome === value}
                onClick={() => setOutcome(value)}
              >
                {value === 'pass'
                  ? '통과'
                  : value === 'repair'
                    ? '담당 보완'
                    : lane === 'design'
                      ? '방향 변경'
                      : '합의 변경'}
              </Button>
            ))}
          </Box>
        </Box>
        <RoutingPlayer key={String(parallel) + outcome} request={request} />
      </Box>
      <Box className={styles.transcript}>
        {[developmentFlow, designFlow].map((item) => (
          <RequestTranscript key={item.id} request={item} />
        ))}
      </Box>
    </Box>
  );
}
