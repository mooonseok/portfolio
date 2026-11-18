import type { RefObject } from 'react';
import type {
  RoutingLane,
  RoutingPhase,
  RoutingRequest,
} from '@/dto/request-routing.dto';
import { RequestRoutingNode, RequestRoutingRow } from './request-routing-node';
import { RequestRoutingWires } from './request-routing-wires';
import styles from './request-routing-board.module.css';

interface Props {
  lane: RoutingLane;
  request: RoutingRequest;
  phase: RoutingPhase;
  reduced: boolean;
  boardRef: RefObject<SVGSVGElement | null>;
}

const targets = {
  development: [
    { id: 'primary', name: '기능 구현' },
    { id: 'support', name: '병렬 작업 · 필요 시' },
  ],
  design: [{ id: 'primary', name: '시안 제작' }],
} as const;

const activity: Partial<Record<RoutingPhase, readonly [string, string]>> = {
  judge: ['판단', '판단 중'],
  route: ['판단', '작업 전달'],
  work: ['작업', '작업 중'],
  join: ['작업', '검토로 전달'],
  review: ['검토', '검토 중'],
  issue: ['검토', '보완 필요'],
  back: ['검토', '수정 요청'],
  fix: ['작업', '수정 중'],
  retry: ['작업', '재검토로 전달'],
  recheck: ['검토', '다시 검토 중'],
  exit: ['검토', '결과 전달'],
};

export function RequestRoutingBoard({
  lane,
  request,
  phase,
  reduced,
  boardRef,
}: Props) {
  const branches = targets[lane].filter(({ id }) => request.jobs[id]);
  const done = phase === 'done' || phase === 'restart' || reduced;
  const judged = done || !['request', 'entry'].includes(phase);
  const assigned = judged && phase !== 'judge';
  const working = assigned && phase !== 'route';
  const reviewed = working && !['work', 'join'].includes(phase);
  const issue = request.issue;
  const found = Boolean(issue && reviewed && phase !== 'review');
  const fixed = found && !['issue', 'back'].includes(phase);
  const rechecked = fixed && !['fix', 'retry'].includes(phase);
  const state = activity[phase];
  const status = (stage: string) =>
    state?.[0] === stage ? state[1] : undefined;
  const resultStatus =
    phase === 'restart'
      ? '다음 요청으로'
      : lane === 'design'
        ? '확인 대기'
        : '검증 완료';
  const destination = lane === 'design' ? '시안 확인' : '결과 전달';
  return (
    <div className={styles.board} data-circuit data-phase={phase}>
      <RequestRoutingWires
        boardRef={boardRef}
        branches={branches}
        drawn={assigned}
        done={done}
        returning={phase === 'back'}
        issueOwner={issue?.owner}
      />
      <ol className={styles.rows} aria-label='요청 판단부터 결과까지'>
        <RequestRoutingRow label='판단' status={status('판단')}>
          <RequestRoutingNode
            id='judge'
            heading={request.reason}
            standby={judged ? undefined : '변경 범위 판단'}
          >
            {request.decision}
          </RequestRoutingNode>
        </RequestRoutingRow>
        <RequestRoutingRow
          label='작업'
          status={status('작업')}
          correction={phase === 'fix' || phase === 'retry'}
        >
          <div className={styles.workSlot}>
            {!assigned && (
              <span className={styles.pending}>작업 배정 대기</span>
            )}
            <div
              className={styles.workers}
              data-count={branches.length}
              aria-hidden={!assigned}
            >
              {branches.map(({ id, name }) => {
                const affected = issue?.owner === id;
                return (
                  <RequestRoutingNode
                    key={id}
                    id={id}
                    heading={name}
                    correction={
                      affected && (phase === 'fix' || phase === 'retry')
                    }
                    status={
                      issue ? (affected ? issue.fix : '✓ 검토 통과') : undefined
                    }
                    showStatus={affected ? fixed : found}
                  >
                    <span className={styles.line} aria-hidden={!working}>
                      {request.jobs[id]}
                    </span>
                  </RequestRoutingNode>
                );
              })}
            </div>
          </div>
        </RequestRoutingRow>
        <RequestRoutingRow
          label='검토'
          anchor='engineering'
          status={status('검토')}
          correction={phase === 'issue' || phase === 'back'}
        >
          <RequestRoutingNode
            id='review'
            heading={request.proof}
            standby={reviewed ? undefined : '결과 검토'}
          >
            <div className={styles.layers}>
              <span aria-hidden={found}>{request.review}</span>
              {issue && (
                <span aria-hidden={!found}>
                  <span className={styles.finding}>{issue.label}</span>
                  <span className={styles.line} aria-hidden={!rechecked}>
                    {issue.retry}
                  </span>
                </span>
              )}
            </div>
          </RequestRoutingNode>
        </RequestRoutingRow>
        <RequestRoutingRow
          label='결과'
          status={done ? resultStatus : undefined}
        >
          <RequestRoutingNode
            id='result'
            heading={destination}
            standby={done ? undefined : destination}
          >
            {request.finish}
          </RequestRoutingNode>
        </RequestRoutingRow>
      </ol>
    </div>
  );
}
