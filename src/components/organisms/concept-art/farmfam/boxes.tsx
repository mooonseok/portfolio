import { tone } from '../art-svg';
import { IsoBox } from '../iso';
import { ink, produce, tray } from './palette';

export function ProduceTray({
  x,
  y,
  a,
  b,
}: {
  x: number;
  y: number;
  a: number;
  b: number;
}) {
  const cols = Math.max(2, Math.round(a / 20));
  const rows = Math.max(2, Math.round(b / 20));
  const cells = Array.from({ length: cols * rows }, (_, i) => [
    (i % cols) + 0.5,
    Math.floor(i / cols) + 0.5,
  ]);
  return (
    <IsoBox
      x={x}
      y={y}
      a={a}
      b={b}
      h={12}
      tones={tray}
      top={cells.map(([c, r]) => (
        <circle
          key={`${c}-${r}`}
          cx={(c * a) / cols}
          cy={(r * b) / rows}
          r={Math.min(a / cols, b / rows) * 0.36}
          fill={produce}
        />
      ))}
    />
  );
}

export function RewardBox({ x, y, s }: { x: number; y: number; s: number }) {
  return (
    <IsoBox
      x={x}
      y={y}
      a={s}
      b={s}
      h={s * 0.8}
      tones={{
        top: tone.label,
        left: '#EEECE5',
        right: '#DCD9D0',
        line: tone.hairline,
      }}
      top={
        <>
          <line x1={s / 2} x2={s / 2} y1={0} y2={s} {...ink} />
          <line x1={0} x2={s} y1={s / 2} y2={s / 2} {...ink} />
        </>
      }
      left={<line x1={s / 2} x2={s / 2} y1={0} y2={s * 0.8} {...ink} />}
      right={<line x1={s / 2} x2={s / 2} y1={0} y2={s * 0.8} {...ink} />}
    />
  );
}
