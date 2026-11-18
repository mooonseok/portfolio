import type { RefObject } from 'react';
import type {
  RoutingLane,
  RoutingPhase,
  RoutingRequest,
} from '@/dto/request-routing.dto';
import { RequestRoutingNode } from './request-routing-node';
import styles from './request-routing-board.module.css';

interface Props {
  lane: RoutingLane;
  request: RoutingRequest;
  phase: RoutingPhase;
  reduced: boolean;
  width: number;
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

function rightRim(x: number, y: number, width: number, height: number) {
  return `M${x} ${y}h${width / 2 - 7}q7 0 7 7v${height - 14}q0 7 -7 7H${x}`;
}

export function RequestRoutingBoard({
  lane,
  request,
  phase,
  reduced,
  width,
  boardRef,
}: Props) {
  const design = lane === 'design';
  const workers = targets[lane];
  const center = width / 2;
  const gap = Math.min((width - 16) / 3, 170);
  const tile = Math.min(gap - 6, 130);
  const decisionWidth = Math.min(width - 22, 280);
  const judged = reduced || phase !== 'request';
  const assigned = reduced || !['request', 'judge', 'outlet'].includes(phase);
  const joined =
    reduced ||
    ['join', 'issue', 'back', 'fix', 'retry', 'done'].includes(phase);
  const repairing = !reduced && ['back', 'fix', 'retry'].includes(phase);
  const reviewIssue = !reduced && (phase === 'issue' || repairing);
  const done = phase === 'done' && !reduced;
  const pendingLabel = design ? '판단 전' : '배정 전';
  const skippedLabel = design ? '유지' : '이번 요청 제외';
  const branches = workers.map(({ id, name }, index) => {
    const x = center + (index - 1) * gap;
    const job = request.jobs[id];
    return {
      id,
      name,
      x,
      job,
      active: Boolean(job) && assigned,
      fix: repairing && request.issue?.owner === id,
      incoming: `M${center} 88C${center} 119 ${x} 112 ${x} 147`,
      outgoing:
        rightRim(x, 147, tile, 58) + `C${x} 252 ${center} 248 ${center} 295`,
    };
  });
  return (
    <svg
      ref={boardRef}
      className={styles.board}
      viewBox={`0 0 ${width} 367`}
      height='367'
      role='img'
      aria-labelledby='routing-board-title'
      aria-describedby='routing-board-summary'
      textAnchor='middle'
      data-circuit
      data-phase={phase}
    >
      <title id='routing-board-title'>
        {design
          ? '요청을 읽고 바꿀 디자인을 정하는 과정'
          : '요청에서 담당을 정하고 검토하는 과정'}
      </title>
      <desc id='routing-board-summary'>
        {request.decision}{' '}
        {branches
          .filter(({ job }) => job)
          .map(
            ({ name, job }) => name + (design ? ' 단계에서 ' : ' 담당은 ') + job
          )
          .join(', ')}
        .{request.issue && ' ' + request.issue.back}
      </desc>
      <g className={styles.wires}>
        <path data-edge='entry' d={`M${center} 1V32`} />
        <path
          data-edge='rim'
          visibility='hidden'
          d={rightRim(center, 32, decisionWidth, 56)}
        />
        {branches.map(({ id, incoming, outgoing, active, fix }) => (
          <g key={id}>
            <path data-edge={`in-${id}`} data-active={active} d={incoming} />
            <path
              data-edge={`out-${id}`}
              data-active={active && joined}
              data-repair={fix}
              d={outgoing}
            />
          </g>
        ))}
      </g>
      <RequestRoutingNode
        x={center}
        y={32}
        width={decisionWidth}
        title='무엇을 바꿔야 할까?'
        detail={judged ? request.reason : '요청 읽기'}
        active={judged}
      />
      {branches.map(({ id, name, x, job, active, fix }) => (
        <RequestRoutingNode
          key={id}
          worker={id}
          x={x}
          y={147}
          width={tile}
          title={name}
          detail={
            fix && request.issue
              ? request.issue.fix
              : judged
                ? (job ?? skippedLabel)
                : pendingLabel
          }
          active={active}
          repair={fix}
        />
      ))}
      <RequestRoutingNode
        x={center}
        y={295}
        width={Math.min(width - 22, 174)}
        title={design ? '시안 검토' : '검토'}
        detail={
          done
            ? '확인 완료'
            : reviewIssue && request.issue
              ? request.issue.label
              : '결과 확인'
        }
        active={done || reduced}
        repair={reviewIssue}
      />
      <g className={styles.dots} aria-hidden='true' data-repair={reviewIssue}>
        {workers.map(({ id }) => (
          <g key={id} data-packet={id} display='none'>
            <circle r='8' opacity='0.16' />
            <circle r='3.8' />
          </g>
        ))}
      </g>
    </svg>
  );
}
