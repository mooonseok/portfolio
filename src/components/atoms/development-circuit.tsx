import type { WorkflowRequest } from '@/dto/ai-workflow.dto';
import type { WorkflowCircuitProps } from './workflow-circuit';
import { WorkflowCircuitIcon } from './workflow-circuit-icons';
import { developmentPaths } from './development-circuit-paths';
import { DevelopmentWorker } from './development-worker';
import styles from './development-circuit.module.css';

interface Props extends WorkflowCircuitProps {
  request: WorkflowRequest;
  width: number;
}

export function DevelopmentCircuit({
  request,
  width,
  active,
  repair,
  owner,
  source,
  returning,
  pathRef,
  dotRef,
  extraTracks,
}: Props) {
  const workers = request.workers ?? [];
  const tracks = [{ pathRef, dotRef }, ...extraTracks];
  const branchStage = active === 3 || active === 4;
  const packets = branchStage
    ? workers.filter((worker) => !repair || worker.id === owner)
    : [];
  const plainStages = request.stages
    .map((stage, i) => ({ ...stage, i }))
    .filter(({ i }) => i > 0 && i !== 3);
  const ownerIndex = workers.findIndex((worker) => worker.id === owner);
  const paths = developmentPaths(width, ownerIndex, source);
  const { center, compact, rows, radius, half, workerWidth, workerHeight } =
    paths;
  const showReturn = ownerIndex >= 0 && (active === source || repair);
  return (
    <svg
      className={styles.chart}
      viewBox={`0 0 ${width} ${rows[7] + radius + 10}`}
      height={rows[7] + radius + 10}
      role='img'
      aria-labelledby='development-title development-description'
      textAnchor='middle'
      data-circuit
      data-lane={request.id}
      data-active-stage={active}
      data-repair={repair}
    >
      <title id='development-title'>개발 요청의 분담과 합류</title>
      <desc id='development-description'>
        화면, 데이터, 모션 담당이 동시에 작업합니다. 세 결과를 모아 검사하고,
        문제가 나오면 해당 담당만 수정해 다시 합류합니다.
      </desc>
      {plainStages.map(({ i, label }) => {
        if (i === 4) return null;
        return (
          <path
            key={label}
            data-edge='forward'
            className={styles.track}
            data-current={active === i}
            ref={active === i ? pathRef : undefined}
            d={paths.forward(i)}
          />
        );
      })}
      {workers.map((worker, index) => {
        const arm = paths.arm(index);
        const selected = !repair || worker.id === owner;
        const splitting = active === 3 && !returning && selected;
        const joining = active === 4 && selected;
        const ref = repair ? pathRef : tracks[index].pathRef;
        return (
          <g key={worker.id} className={styles.track}>
            <path
              data-edge='split'
              data-owner={worker.id}
              data-current={splitting}
              ref={splitting ? ref : undefined}
              d={arm.split}
            />
            <path
              data-edge='join'
              data-owner={worker.id}
              data-current={joining}
              ref={joining ? ref : undefined}
              d={arm.join}
            />
          </g>
        );
      })}
      {showReturn && (
        <path
          data-return
          data-edge='return'
          data-owner={owner}
          data-current={returning}
          className={styles.feedback}
          d={paths.feedback}
          ref={returning ? pathRef : undefined}
        />
      )}
      <text x={center} y={rows[0] - 15} className={styles.originText}>
        {request.stages[0].label}
      </text>
      <circle cx={center} cy={rows[0]} r='4' className={styles.origin} />
      {plainStages.map(({ i, label }) => (
        <g
          key={label}
          transform={`translate(${center} ${rows[i]})`}
          data-stage={i}
          data-active={active === i}
          className={styles.stage}
        >
          <rect
            data-rim
            x={-half}
            y={-radius}
            width={half * 2}
            height={radius * 2}
            rx='5'
          />
          <g
            className={styles.icon}
            transform={`translate(${-half + (compact ? 18 : 24)} 0) scale(${compact ? 0.65 : 0.78})`}
          >
            <WorkflowCircuitIcon design={false} index={i - 1} />
          </g>
          <text x={compact ? 11 : 14} dy='.35em'>
            {label}
          </text>
        </g>
      ))}
      {workers.map((worker, i) => (
        <DevelopmentWorker
          key={worker.id}
          id={worker.id}
          label={worker.label}
          x={paths.xFor(i)}
          y={rows[3]}
          width={workerWidth}
          height={workerHeight * 2}
          active={active}
          repair={repair}
          owner={owner}
        />
      ))}
      {(packets.length ? packets : [undefined]).map((worker, i) => (
        <g
          key={worker?.id ?? 'main'}
          data-packet
          data-owner={worker?.id}
          className={styles.packet}
          data-returning={returning}
          ref={tracks[i].dotRef}
          transform={`translate(${center} ${rows[0]})`}
        >
          <circle r='7' opacity='.2' />
          <circle r='3.5' />
        </g>
      ))}
    </svg>
  );
}
