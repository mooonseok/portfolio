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
    { id: 'screen', name: '화면' },
    { id: 'data', name: '데이터' },
    { id: 'motion', name: '모션' },
  ],
  design: [
    { id: 'hierarchy', name: '정보 위계' },
    { id: 'layout', name: '화면 배치' },
    { id: 'copy', name: '안내 문구' },
  ],
} as const;

export function RequestRoutingBoard({
  lane,
  request,
  phase,
  reduced,
  boardRef,
}: Props) {
  const branches = targets[lane].filter(({ id }) => request.jobs[id]);
  const judged = phase !== 'request';
  const working = phase === 'route' || phase === 'work';
  const correcting = phase === 'back' || phase === 'fix';
  const review = phase === 'join' || phase === 'issue' || phase === 'retry';
  const done = phase === 'done' || reduced;
  const returned = Boolean(
    request.issue && (correcting || phase === 'retry' || done)
  );
  const checked = returned || phase === 'issue';
  const changedCopy =
    !['request', 'judge', 'outlet', 'route'].includes(phase) || reduced;
  const drawn = !['request', 'judge', 'outlet'].includes(phase) || reduced;
  const showResult = done ? request.finish : undefined;
  return (
    <div className={styles.board} data-circuit data-phase={phase}>
      <RequestRoutingWires
        boardRef={boardRef}
        branches={branches}
        drawn={drawn}
        done={done}
        repairing={correcting || phase === 'issue'}
        issueOwner={request.issue?.owner}
      />
      <ol className={styles.rows} aria-label='요청 판단부터 결과까지'>
        <RequestRoutingRow
          label='판단'
          status={
            !reduced && (phase === 'judge' || phase === 'outlet')
              ? '판단 중'
              : undefined
          }
        >
          <RequestRoutingNode
            id='judge'
            heading={judged || reduced ? request.reason : '바꿀 부분 찾기'}
          >
            {(judged || reduced) && request.decision}
          </RequestRoutingNode>
        </RequestRoutingRow>
        <RequestRoutingRow
          label='작업'
          status={correcting ? '수정 중' : working ? '작업 중' : undefined}
          correction={correcting}
        >
          <div className={styles.workSlot}>
            {!drawn && <span className={styles.pending}>작업 배정 대기</span>}
            <div
              className={styles.workers}
              data-count={branches.length}
              aria-hidden={!drawn}
            >
              {branches.map(({ id, name }) => {
                const affected = request.issue?.owner === id;
                return (
                  <RequestRoutingNode
                    key={id}
                    id={id}
                    heading={name}
                    correction={affected && correcting}
                    status={
                      checked && !affected
                        ? '✓ 검토 통과'
                        : affected && returned
                          ? request.issue?.fix
                          : undefined
                    }
                  >
                    {request.sample ? (
                      <span className={styles.sample}>
                        {changedCopy && <del>{request.sample.before}</del>}
                        {changedCopy
                          ? request.sample.after
                          : request.sample.before}
                      </span>
                    ) : (
                      request.jobs[id]
                    )}
                  </RequestRoutingNode>
                );
              })}
            </div>
          </div>
        </RequestRoutingRow>
        <RequestRoutingRow
          label='검토'
          status={
            review
              ? phase === 'retry'
                ? '다시 검토 중'
                : '검토 중'
              : undefined
          }
          correction={phase === 'issue'}
        >
          <RequestRoutingNode id='review' heading={request.proof}>
            {request.sample && (
              <span className={styles.input}>{request.sample.input}</span>
            )}
            {request.sample && (review || done) && request.sample.after}
            {request.issue && checked && (
              <span className={styles.finding}>
                발견 · {request.issue.label}
              </span>
            )}
            {request.issue && (phase === 'retry' || done) && (
              <span>{request.issue.retry}</span>
            )}
          </RequestRoutingNode>
        </RequestRoutingRow>
        <RequestRoutingRow
          label='결과'
          status={
            done ? (lane === 'design' ? '확인 대기' : '검증 완료') : undefined
          }
        >
          <RequestRoutingNode
            id='result'
            heading={
              lane === 'design' ? '시안 전달 · 요청자 확인 대기' : '동작 확인'
            }
          >
            {showResult}
          </RequestRoutingNode>
        </RequestRoutingRow>
      </ol>
    </div>
  );
}
