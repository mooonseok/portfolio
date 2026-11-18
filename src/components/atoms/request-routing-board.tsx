import type { RefObject } from 'react';
import type { RoutingPhase, RoutingRequest } from '@/dto/request-routing.dto';
import { RequestRoutingNode, RequestRoutingRow } from './request-routing-node';
import { RequestRoutingWires } from './request-routing-wires';
import styles from './request-routing-board.module.css';

interface Props {
  request: RoutingRequest;
  phase: RoutingPhase;
  reduced: boolean;
  boardRef: RefObject<SVGSVGElement | null>;
}

export function RequestRoutingBoard({
  request,
  phase,
  reduced,
  boardRef,
}: Props) {
  const branches = Object.entries(request.jobs).map(([id, job]) => ({
    id,
    ...job,
  }));
  const active = reduced ? undefined : phase;
  const issue = request.issue;
  const issueOwner = issue && request.jobs[issue.owner];
  const fixing = active === 'fix';
  const plan = issue?.scope === 'plan';
  return (
    <div className={styles.board} data-circuit data-phase={phase}>
      <RequestRoutingWires
        boardRef={boardRef}
        branches={branches}
        done={active === 'done' || active === 'restart'}
        returning={active === 'back'}
        repairActive={active === 'issue' || active === 'back' || fixing}
        returningToPlan={plan}
        issueOwner={issue?.owner}
      />
      <ol className={styles.rows} aria-label='판단부터 결과까지'>
        <RequestRoutingRow
          label='판단'
          status={active === 'judge' ? '범위 결정' : undefined}
        >
          <RequestRoutingNode id='judge' heading={request.reason}>
            {request.decision}
          </RequestRoutingNode>
        </RequestRoutingRow>
        <RequestRoutingRow
          label='준비'
          status={
            active === 'prepare' || (fixing && plan)
              ? fixing
                ? '재합의'
                : '진행 중'
              : undefined
          }
          correction={fixing && plan}
        >
          <RequestRoutingNode
            id='prepare'
            heading={request.prepare}
            correction={fixing && plan}
          />
        </RequestRoutingRow>
        {(['action', 'finish'] as const).map((step) => {
          const first = step === 'action';
          const repair = !first && fixing && !plan;
          const working = active === (first ? 'work' : 'implement');
          return (
            <RequestRoutingRow
              key={step}
              label={first ? '작업' : ''}
              status={repair ? '수정 중' : working ? '작업 중' : undefined}
              correction={repair}
            >
              <div className={styles.workers} data-count={branches.length}>
                {branches.map(({ id, label, ...job }) => (
                  <RequestRoutingNode
                    key={id}
                    id={first ? id : 'finish-' + id}
                    eyebrow={first ? label : undefined}
                    heading={job[step]}
                    correction={repair && issue?.owner === id}
                  />
                ))}
              </div>
            </RequestRoutingRow>
          );
        })}
        <RequestRoutingRow
          label={request.lane === 'design' ? '측정' : '통합'}
          status={
            active === 'gather' || active === 'regather' ? '확인 중' : undefined
          }
        >
          <RequestRoutingNode id='gather' heading={request.gather} />
        </RequestRoutingRow>
        <RequestRoutingRow
          label='검토'
          anchor='engineering'
          status={
            active === 'review'
              ? '확인 중'
              : active === 'recheck'
                ? '재확인'
                : undefined
          }
        >
          <RequestRoutingNode id='review' heading={request.proof} />
        </RequestRoutingRow>
        <RequestRoutingRow
          status={
            active === 'inspect'
              ? '확인 중'
              : active === 'reinspect'
                ? '재확인'
                : undefined
          }
        >
          <RequestRoutingNode id='inspect' heading={request.review} />
        </RequestRoutingRow>
        <RequestRoutingRow
          status={
            active === 'issue'
              ? '수정 요청'
              : active === 'decide'
                ? '판정'
                : active === 'passed'
                  ? '통과'
                  : undefined
          }
          correction={active === 'issue'}
        >
          <RequestRoutingNode
            id='decision'
            heading={request.decisionTest}
            correction={active === 'issue'}
          >
            {issue && issueOwner && (
              <span className={styles.returnNote}>
                {issue.finding} →{' '}
                {plan
                  ? request.lane === 'design'
                    ? '방향 선택'
                    : '규칙 합의'
                  : issueOwner.label}
              </span>
            )}
          </RequestRoutingNode>
        </RequestRoutingRow>
        <RequestRoutingRow
          label='결과'
          status={active === 'done' ? '완료' : undefined}
        >
          <RequestRoutingNode
            id='result'
            heading={request.finish}
            incoming='통과'
          >
            {request.handoff}
          </RequestRoutingNode>
        </RequestRoutingRow>
      </ol>
    </div>
  );
}
