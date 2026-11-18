import type { WorkflowRequest } from '@/dto/ai-workflow.dto';
import type { WorkflowCircuitProps } from './workflow-circuit';
import { WorkflowCircuitIcon } from './workflow-circuit-icons';
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
  const compact = width < 440;
  const center = width / 2;
  const rows = compact
    ? [30, 69, 123, 208, 292, 349, 406, 463]
    : [34, 79, 141, 245, 347, 413, 479, 545];
  const radius = compact ? 16 : 19;
  const half = compact ? 56 : 69;
  const workerHeight = compact ? 24 : 29;
  const spread = Math.min(194, (width - 20) / 3);
  const workerWidth = Math.min(spread - 12, 138);
  const tracks = [{ pathRef, dotRef }, ...extraTracks];
  const branchStage = active === 3 || active === 4;
  const packets = branchStage
    ? workers.filter((worker) => !repair || worker.id === owner)
    : [];
  const plainStages = request.stages
    .map((stage, i) => ({ ...stage, i }))
    .filter(({ i }) => i > 0 && i !== 3);
  const xFor = (index: number) => center + (index - 1) * spread;
  const workersTop = rows[3] - workerHeight;
  const workersBottom = rows[3] + workerHeight;
  const ownerIndex = workers.findIndex((worker) => worker.id === owner);
  const side = ownerIndex === 0 ? -1 : 1;
  const rail =
    center + side * Math.min(width / 2 - 6, spread + workerWidth / 2 + 14);
  const targetX = xFor(ownerIndex);
  const reviewY = rows[source ?? 5];
  const fromReview = `M${center + side * half} ${reviewY}H${rail}`;
  const feedback =
    ownerIndex === 1
      ? `${fromReview}V${workersBottom + 15}H${targetX + workerWidth / 3}V${workersBottom}`
      : `${fromReview}V${rows[3]}H${targetX + (side * workerWidth) / 2}`;
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
        const start = i === 1 ? rows[0] : rows[i - 1] + radius;
        return (
          <path
            key={label}
            data-edge='forward'
            className={styles.track}
            data-current={active === i}
            ref={active === i ? pathRef : undefined}
            d={`M${center} ${start}V${rows[i] - radius}`}
          />
        );
      })}
      {workers.map((worker, index) => {
        const x = xFor(index);
        const starts = rows[2] + radius;
        const ends = rows[4] - radius;
        const splitY = (starts + workersTop) / 2;
        const joinY = (workersBottom + ends) / 2;
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
              d={`M${center} ${starts}C${center} ${splitY} ${x} ${splitY} ${x} ${workersTop}`}
            />
            <path
              data-edge='join'
              data-owner={worker.id}
              data-current={joining}
              ref={joining ? ref : undefined}
              d={`M${x} ${workersBottom}C${x} ${joinY} ${center} ${joinY} ${center} ${ends}`}
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
          d={feedback}
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
          x={xFor(i)}
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
