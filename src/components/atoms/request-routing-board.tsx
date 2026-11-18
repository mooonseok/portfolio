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
    { id: 'support', name: '병렬 작업' },
  ],
  design: [{ id: 'primary', name: '시안 제작' }],
} as const;

const activity: Record<RoutingPhase, readonly [string, string]> = {
  judge: ['판단', '범위 결정'],
  route: ['판단', '작업 전달'],
  work: ['작업', '진행 중'],
  join: ['작업', '검토로'],
  review: ['검토', '확인 중'],
  issue: ['검토', '보완 필요'],
  back: ['검토', '담당 복귀'],
  fix: ['작업', '수정 중'],
  retry: ['작업', '재검토로'],
  recheck: ['검토', '재확인'],
  exit: ['검토', '확인 완료'],
  done: ['결과', '도착'],
  restart: ['결과', '처음으로'],
};

export function RequestRoutingBoard({
  lane,
  request,
  phase,
  reduced,
  boardRef,
}: Props) {
  const branches = targets[lane].filter(({ id }) => request.jobs[id]);
  const [stage, status] = activity[phase];
  const current = (label: string) =>
    !reduced && stage === label ? status : undefined;
  const fixing = phase === 'fix' || phase === 'retry';
  return (
    <div className={styles.board} data-circuit data-phase={phase}>
      <RequestRoutingWires
        boardRef={boardRef}
        branches={branches}
        done={phase === 'done' || phase === 'restart'}
        returning={phase === 'back'}
        issueOwner={request.issue?.owner}
      />
      <ol className={styles.rows} aria-label='판단부터 결과까지'>
        <RequestRoutingRow label='판단' status={current('판단')}>
          <RequestRoutingNode id='judge' heading={request.reason}>
            {request.decision}
          </RequestRoutingNode>
        </RequestRoutingRow>
        <RequestRoutingRow
          label='작업'
          status={current('작업')}
          correction={fixing}
        >
          <div className={styles.workers} data-count={branches.length}>
            {branches.map(({ id, name }) => (
              <RequestRoutingNode
                key={id}
                id={id}
                heading={name}
                correction={fixing && request.issue?.owner === id}
              >
                {request.jobs[id]}
              </RequestRoutingNode>
            ))}
          </div>
        </RequestRoutingRow>
        <RequestRoutingRow
          label='검토'
          anchor='engineering'
          status={current('검토')}
          correction={phase === 'issue' || phase === 'back'}
        >
          <RequestRoutingNode id='review' heading={request.proof}>
            {request.review}
            {request.issue && <div>{request.issue.back}</div>}
          </RequestRoutingNode>
        </RequestRoutingRow>
        <RequestRoutingRow label='결과' status={current('결과')}>
          <RequestRoutingNode
            id='result'
            heading={lane === 'design' ? '시안 확정' : '결과 전달'}
          >
            {request.finish}
          </RequestRoutingNode>
        </RequestRoutingRow>
      </ol>
    </div>
  );
}
